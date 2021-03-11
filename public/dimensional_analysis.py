from json import loads, dumps

from sympy import Mul, latex

from sympy.parsing.sympy_parser import parse_expr

from sympy.physics.units.definitions.dimension_definitions import (
    mass,
    length,
    time,
    current,
    temperature,
    luminous_intensity,
    amount_of_substance,
    angle,
    information,
)

from sympy.physics.units.systems.si import dimsys_SI

from sympy.utilities.iterables import topological_sort

# maps from mathjs dimensions object to sympy dimensions
dim_map = {
    0: mass,
    1: length,
    2: time,
    3: current,
    4: temperature,
    5: luminous_intensity,
    6: amount_of_substance,
    7: angle,
    8: information,
}

inv_dim_map = {str(value.name): key for key, value in dim_map.items()}

# base units as defined by mathjs
base_units = {
    (0, 0, 0, 0, 0, 0, 0, 0, 0): "",
    (1, 0, 0, 0, 0, 0, 0, 0, 0): "kg",
    (0, 1, 0, 0, 0, 0, 0, 0, 0): "m",
    (0, 0, 1, 0, 0, 0, 0, 0, 0): "sec",
    (0, 0, 0, 1, 0, 0, 0, 0, 0): "ampere",
    (0, 0, 0, 0, 1, 0, 0, 0, 0): "kelvin",
    (0, 0, 0, 0, 0, 1, 0, 0, 0): "candela",
    (0, 0, 0, 0, 0, 0, 1, 0, 0): "mole",
    (1, 1, -2, 0, 0, 0, 0, 0, 0): "N",
    (0, 2, 0, 0, 0, 0, 0, 0, 0): "m^2",
    (0, 3, 0, 0, 0, 0, 0, 0, 0): "m^3",
    (1, 2, -2, 0, 0, 0, 0, 0, 0): "J",
    (1, 2, -3, 0, 0, 0, 0, 0, 0): "W",
    (1, -1, -2, 0, 0, 0, 0, 0, 0): "Pa",
    (0, 0, 1, 1, 0, 0, 0, 0, 0): "coulomb",
    (-1, -2, 4, 2, 0, 0, 0, 0, 0): "farad",
    (1, 2, -3, -1, 0, 0, 0, 0, 0): "V",
    (1, 2, -3, -2, 0, 0, 0, 0, 0): "ohm",
    (1, 2, -2, -2, 0, 0, 0, 0, 0): "henry",
    (-1, -2, 3, 2, 0, 0, 0, 0, 0): "siemens",
    (1, 2, -2, -1, 0, 0, 0, 0, 0): "weber",
    (1, 0, -2, -1, 0, 0, 0, 0, 0): "tesla",
    (0, 0, -1, 0, 0, 0, 0, 0, 0): "Hz",
    (0, 0, 0, 0, 0, 0, 0, 1, 0): "rad",
    (0, 0, 0, 0, 0, 0, 0, 0, 1): "bits",
}


# map the sympy dimensional dependences to mathjs dimensions
def get_mathjs_units(dimensional_dependencies):
    mathjs_dims = [0] * 9

    all_units_recognized = True
    for name, exp in dimensional_dependencies.items():
        dim_index = inv_dim_map.get(name)
        if dim_index is None:
            # this will hapen if the user references a parameter in an equation that has not been defined
            # will eventually want to allow the user to specify the untis for an undefined parameter
            all_units_recognized = False
            break
        mathjs_dims[dim_index] += exp

    if all_units_recognized:
        mathjs_unit_name = base_units.get(tuple(mathjs_dims))

        if mathjs_unit_name is None:
            mathjs_unit_name = ""
            for i, exp in enumerate(mathjs_dims):
                if exp != 0:
                    key = [0] * 9
                    key[i] = 1
                    name = base_units.get(tuple(key))
                    if mathjs_unit_name == "":
                        mathjs_unit_name = f"{name}^{exp}"
                    else:
                        mathjs_unit_name = f"{mathjs_unit_name}*{name}^{exp}"
    else:
        mathjs_unit_name = ""

    return mathjs_unit_name


def get_dims(dimensions):
    dims = Mul(
        1,
        *[
            dim_map[int(i)] ** value
            for i, value in enumerate(dimensions)
            if value != 0.0
        ],
    )
    return dims


def dimensional_analysis(parameters, expression):
    # sub parameter dimensions
    parameter_subs = {
        param["name"]: get_dims(param["dimensions"]) for param in parameters
    }
    # need to remove any subtractions or unary negative since this may
    # lead to unintentional cancellation during the parameter substituation process
    positive_only_expression = parse_expr(str(expression).replace('-', '+'))
    final_expression = positive_only_expression.subs(parameter_subs)

    try:
        result = get_mathjs_units(
            dimsys_SI.get_dimensional_dependencies(final_expression)
        )
    except TypeError:
        result = "Dimension Error"

    return result


class ParameterError(Exception):
    pass


class DuplicateAssignment(Exception):
    pass


class ReferenceCycle(Exception):
    pass


class ParsingError(Exception):
    pass


def get_sorted_statements(statements):
    defined_params = {}
    for i, statement in enumerate(statements):
        if statement["type"] == "assignment":
            if statement["name"] in defined_params:
                raise DuplicateAssignment(statement["name"])
            else:
                defined_params[statement["name"]] = i

    vertices = range(len(statements))
    edges = []

    for i, statement in enumerate(statements):
        for param in statement["params"]:
            ref_index = defined_params.get(param)
            if ref_index is not None:
                edges.append((ref_index, i))

    try:
        sort_order = topological_sort((vertices, edges))
    except ValueError:
        raise ReferenceCycle

    sorted_statements = []

    for i in sort_order:
        statement = statements[i]
        statement[
            "index"
        ] = i  # original index, needed to place results in original order
        sorted_statements.append(statement)

    return sorted_statements


def get_all_parameters(statements):
    parameters = []
    for statement in statements:
        parameters.extend(statement["implicitParams"])

    return parameters


def evaluate_statements(statements):

    parameters = get_all_parameters(statements)

    statements = get_sorted_statements(statements)

    for statement in statements:
        try:
            statement["expression"] = parse_expr(statement["sympy"])
        except SyntaxError:
            print(f"Parsing error for equation {statement['sympy']}")
            raise ParsingError

    combined_expressions = []
    for i in range(len(statements)):
        if statements[i]["type"] == "assignment":
            combined_expressions.append(None)
            continue
        temp_statements = statements[0 : i + 1]
        # sub equations into each other in topological order if there are more than one
        for j, statement in enumerate(reversed(temp_statements)):
            if j == 0:
                final_expression = statement["expression"]
            elif statement["type"] == "assignment":
                final_expression = final_expression.subs(
                    {statement["name"]: statement["expression"]}
                )

        combined_expressions.append(final_expression)

    # sub parameter values
    parameter_subs = {
        param["name"]: float(param["si_value"])
        for param in parameters
        if param["si_value"] is not None
    }
    if len(parameter_subs) < len(parameters):
        raise ParameterError

    results = []
    for expression in combined_expressions:
        if expression is None:
            results.append({"value": "", "units": ""})
        else:
            dim = dimensional_analysis(parameters, expression)
            evaluated_expression = expression.evalf(subs = parameter_subs)
            if not evaluated_expression.is_number:
                evaluated_expression = expression.subs(parameter_subs).evalf()
            if evaluated_expression.is_number:
                if evaluated_expression.is_real and evaluated_expression.is_finite:
                    results.append({"value": str(evaluated_expression), "numeric": True, "units": dim,
                                    "real": True, "finite": True})
                elif not evaluated_expression.is_finite:
                    results.append({"value": latex(evaluated_expression), "numeric": True, "units": dim,
                                    "real": evaluated_expression.is_real, "finite": False})
                else:
                    results.append({"value": str(evaluated_expression).replace('I', 'i').replace('*',''), 
                                    "numeric": True, "units": dim, "real": False})
            else:
                results.append({"value": latex(evaluated_expression), "numeric": False,
                                "units": "", "real": False})


    sorted_results = [None] * len(statements)

    for i, statement in enumerate(statements):
        sorted_results[statement["index"]] = results[i]

    return sorted_results


def get_query_values(statements):
    error = None

    try:
        results = evaluate_statements(loads(statements))
    except DuplicateAssignment as e:
        error = f"Duplicate assignment of variable {e}"
        results = None
    except ReferenceCycle as e:
        error = "Circular reference detected"
        results = None
    except (ParameterError, ParsingError) as e:
        error = e.__class__.__name__
        results = None
    except Exception as e:
        print(f"Unhandled exception: {e.__class__.__name__}")
        error = f"Unhandled exception: {e.__class__.__name__}"
        results = None

    return dumps({"error": error, "results": results})


class FuncContainer(object):
    pass


py_funcs = FuncContainer()
py_funcs.getQueryValues = get_query_values

# pyodide returns last statement as an object that is assessable from javascript
py_funcs
