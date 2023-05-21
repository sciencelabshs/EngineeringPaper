// Generated from LatexLexer.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class LatexLexer extends Lexer {
	public static readonly L_BRACKET = 1;
	public static readonly ALT_L_BRACKET = 2;
	public static readonly SEMICOLON = 3;
	public static readonly L_BRACE = 4;
	public static readonly R_BRACE = 5;
	public static readonly L_PAREN = 6;
	public static readonly R_PAREN = 7;
	public static readonly VBAR = 8;
	public static readonly UNDERSCORE = 9;
	public static readonly PI = 10;
	public static readonly CMD_INT = 11;
	public static readonly CMD_INT_UNDERSCORE = 12;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER = 13;
	public static readonly CMD_INT_UNDERSCORE_SINGLE_CHAR_ID = 14;
	public static readonly CMD_MATHRM = 15;
	public static readonly CMD_FRAC = 16;
	public static readonly CMD_FRAC_INTS = 17;
	public static readonly CMD_CDOT = 18;
	public static readonly CMD_SQRT = 19;
	public static readonly CMD_SQRT_INT = 20;
	public static readonly CMD_SIM = 21;
	public static readonly CMD_APPROX = 22;
	public static readonly BACK_SLASH = 23;
	public static readonly CMD_SIN = 24;
	public static readonly CMD_COS = 25;
	public static readonly CMD_TAN = 26;
	public static readonly CMD_COT = 27;
	public static readonly CMD_SEC = 28;
	public static readonly CMD_CSC = 29;
	public static readonly CMD_ARCSIN = 30;
	public static readonly CMD_ARCCOS = 31;
	public static readonly CMD_ARCTAN = 32;
	public static readonly CMD_SINH = 33;
	public static readonly CMD_COSH = 34;
	public static readonly CMD_TANH = 35;
	public static readonly CMD_COTH = 36;
	public static readonly CMD_LN = 37;
	public static readonly CMD_LOG = 38;
	public static readonly CMD_SLASH_LOG_UNDERSCORE = 39;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER = 40;
	public static readonly CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID = 41;
	public static readonly COMMENT = 42;
	public static readonly CMD_LEFT = 43;
	public static readonly CMD_RIGHT = 44;
	public static readonly DOUBLE_DOLLAR_SIGN = 45;
	public static readonly ADD = 46;
	public static readonly SUB = 47;
	public static readonly CARET = 48;
	public static readonly EQ = 49;
	public static readonly LT = 50;
	public static readonly GT = 51;
	public static readonly LTE = 52;
	public static readonly GTE = 53;
	public static readonly COMMA = 54;
	public static readonly CARET_SINGLE_CHAR_NUMBER = 55;
	public static readonly CARET_SINGLE_CHAR_ID = 56;
	public static readonly NUMBER = 57;
	public static readonly UNDERSCORE_SUBSCRIPT = 58;
	public static readonly CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT = 59;
	public static readonly ID = 60;
	public static readonly WS = 61;
	public static readonly SLASH_SPACE = 62;
	public static readonly SLASH_COLON = 63;
	public static readonly ERROR_CHAR = 64;
	public static readonly R_BRACKET = 65;
	public static readonly ALT_R_BRACKET = 66;
	public static readonly U_CMD_FRAC = 67;
	public static readonly U_CMD_FRAC_INTS = 68;
	public static readonly U_CMD_CDOT = 69;
	public static readonly U_CMD_SQRT = 70;
	public static readonly U_CARET = 71;
	public static readonly U_NAME = 72;
	public static readonly U_L_PAREN = 73;
	public static readonly U_R_PAREN = 74;
	public static readonly U_L_BRACE = 75;
	public static readonly U_R_BRACE = 76;
	public static readonly U_ONE = 77;
	public static readonly U_NUMBER = 78;
	public static readonly U_CMD_LEFT = 79;
	public static readonly U_CMD_RIGHT = 80;
	public static readonly U_WS = 81;
	public static readonly U_SLASH_SPACE = 82;
	public static readonly U_ERROR_CHAR = 83;
	public static readonly EOF = Token.EOF;
	public static readonly UNITS = 1;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: string[] = [ null, "'['", "'\\lbrack'", 
                                                   "';'", null, null, null, 
                                                   null, "'|'", "'_'", "'\\pi'", 
                                                   "'\\int'", null, null, 
                                                   null, "'\\mathrm'", null, 
                                                   null, null, null, null, 
                                                   "'\\sim'", "'\\approx'", 
                                                   "'\\'", "'sin'", "'cos'", 
                                                   "'tan'", "'cot'", "'sec'", 
                                                   "'csc'", "'arcsin'", 
                                                   "'arccos'", "'arctan'", 
                                                   "'sinh'", "'cosh'", "'tanh'", 
                                                   "'coth'", "'ln'", "'log'", 
                                                   null, null, null, null, 
                                                   null, null, "'$$'", "'+'", 
                                                   "'-'", null, "'='", "'<'", 
                                                   "'>'", "'\\le'", "'\\ge'", 
                                                   "','", null, null, null, 
                                                   null, null, null, null, 
                                                   null, "'\\:'", null, 
                                                   "']'", "'\\rbrack'", 
                                                   null, null, null, null, 
                                                   null, null, null, null, 
                                                   null, null, "'1'" ];
	public static readonly symbolicNames: string[] = [ null, "L_BRACKET", "ALT_L_BRACKET", 
                                                    "SEMICOLON", "L_BRACE", 
                                                    "R_BRACE", "L_PAREN", 
                                                    "R_PAREN", "VBAR", "UNDERSCORE", 
                                                    "PI", "CMD_INT", "CMD_INT_UNDERSCORE", 
                                                    "CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER", 
                                                    "CMD_INT_UNDERSCORE_SINGLE_CHAR_ID", 
                                                    "CMD_MATHRM", "CMD_FRAC", 
                                                    "CMD_FRAC_INTS", "CMD_CDOT", 
                                                    "CMD_SQRT", "CMD_SQRT_INT", 
                                                    "CMD_SIM", "CMD_APPROX", 
                                                    "BACK_SLASH", "CMD_SIN", 
                                                    "CMD_COS", "CMD_TAN", 
                                                    "CMD_COT", "CMD_SEC", 
                                                    "CMD_CSC", "CMD_ARCSIN", 
                                                    "CMD_ARCCOS", "CMD_ARCTAN", 
                                                    "CMD_SINH", "CMD_COSH", 
                                                    "CMD_TANH", "CMD_COTH", 
                                                    "CMD_LN", "CMD_LOG", 
                                                    "CMD_SLASH_LOG_UNDERSCORE", 
                                                    "CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER", 
                                                    "CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID", 
                                                    "COMMENT", "CMD_LEFT", 
                                                    "CMD_RIGHT", "DOUBLE_DOLLAR_SIGN", 
                                                    "ADD", "SUB", "CARET", 
                                                    "EQ", "LT", "GT", "LTE", 
                                                    "GTE", "COMMA", "CARET_SINGLE_CHAR_NUMBER", 
                                                    "CARET_SINGLE_CHAR_ID", 
                                                    "NUMBER", "UNDERSCORE_SUBSCRIPT", 
                                                    "CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT", 
                                                    "ID", "WS", "SLASH_SPACE", 
                                                    "SLASH_COLON", "ERROR_CHAR", 
                                                    "R_BRACKET", "ALT_R_BRACKET", 
                                                    "U_CMD_FRAC", "U_CMD_FRAC_INTS", 
                                                    "U_CMD_CDOT", "U_CMD_SQRT", 
                                                    "U_CARET", "U_NAME", 
                                                    "U_L_PAREN", "U_R_PAREN", 
                                                    "U_L_BRACE", "U_R_BRACE", 
                                                    "U_ONE", "U_NUMBER", 
                                                    "U_CMD_LEFT", "U_CMD_RIGHT", 
                                                    "U_WS", "U_SLASH_SPACE", 
                                                    "U_ERROR_CHAR" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", "UNITS", ];

	public static readonly ruleNames: string[] = [
		"L_BRACKET", "ALT_L_BRACKET", "SEMICOLON", "L_BRACE", "R_BRACE", "L_PAREN", 
		"R_PAREN", "VBAR", "UNDERSCORE", "PI", "CMD_INT", "CMD_INT_UNDERSCORE", 
		"CMD_INT_UNDERSCORE_SINGLE_CHAR_NUMBER", "CMD_INT_UNDERSCORE_SINGLE_CHAR_ID", 
		"CMD_MATHRM", "CMD_FRAC", "CMD_FRAC_INTS", "CMD_CDOT", "CMD_SQRT", "CMD_SQRT_INT", 
		"CMD_SIM", "CMD_APPROX", "BACK_SLASH", "CMD_SIN", "CMD_COS", "CMD_TAN", 
		"CMD_COT", "CMD_SEC", "CMD_CSC", "CMD_ARCSIN", "CMD_ARCCOS", "CMD_ARCTAN", 
		"CMD_SINH", "CMD_COSH", "CMD_TANH", "CMD_COTH", "CMD_LN", "CMD_LOG", "CMD_SLASH_LOG_UNDERSCORE", 
		"CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_NUMBER", "CMD_SLASH_LOG_UNDERSCORE_SINGLE_CHAR_ID", 
		"COMMENT", "CMD_LEFT", "CMD_RIGHT", "DOUBLE_DOLLAR_SIGN", "ADD", "SUB", 
		"CARET", "EQ", "LT", "GT", "LTE", "GTE", "COMMA", "CARET_SINGLE_CHAR_NUMBER", 
		"CARET_SINGLE_CHAR_ID", "NUMBER", "DIGIT", "IDENTIFIER", "EXP", "GREEK_CHAR", 
		"UNDERSCORE_SUBSCRIPT", "CARET_SINGLE_CHAR_ID_UNDERSCORE_SUBSCRIPT", "ID", 
		"WS", "SLASH_SPACE", "SLASH_COLON", "ERROR_CHAR", "R_BRACKET", "ALT_R_BRACKET", 
		"U_CMD_FRAC", "U_CMD_FRAC_INTS", "U_CMD_CDOT", "U_CMD_SQRT", "U_CARET", 
		"U_NAME", "U_L_PAREN", "U_R_PAREN", "U_L_BRACE", "U_R_BRACE", "U_ONE", 
		"U_NUMBER", "U_DIGIT", "U_CMD_LEFT", "U_CMD_RIGHT", "U_WS", "U_SLASH_SPACE", 
		"U_ERROR_CHAR",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, LatexLexer._ATN, LatexLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "LatexLexer.g4"; }

	public get literalNames(): (string | null)[] { return LatexLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return LatexLexer.symbolicNames; }
	public get ruleNames(): string[] { return LatexLexer.ruleNames; }

	public get serializedATN(): number[] { return LatexLexer._serializedATN; }

	public get channelNames(): string[] { return LatexLexer.channelNames; }

	public get modeNames(): string[] { return LatexLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,83,892,6,-1,6,-1,
	2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,
	2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,
	7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,
	23,2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,
	2,31,7,31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,
	38,7,38,2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,
	7,45,2,46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
	52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,
	2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,
	67,7,67,2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,
	7,74,2,75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,
	81,2,82,7,82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,2,87,7,87,1,0,1,0,
	1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,
	1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,
	1,11,1,11,1,11,1,11,1,11,1,11,5,11,222,8,11,10,11,12,11,225,9,11,1,11,1,
	11,1,12,1,12,1,12,1,12,1,12,1,12,5,12,235,8,12,10,12,12,12,238,9,12,1,12,
	1,12,1,12,1,13,1,13,1,13,1,13,1,13,1,13,5,13,249,8,13,10,13,12,13,252,9,
	13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,1,15,1,15,1,15,
	1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,16,1,16,5,16,278,8,16,10,16,12,
	16,281,9,16,1,16,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,
	1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,5,19,305,8,19,10,19,12,
	19,308,9,19,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,22,1,22,1,23,1,23,1,23,1,23,1,24,1,24,1,24,1,24,1,25,1,
	25,1,25,1,25,1,26,1,26,1,26,1,26,1,27,1,27,1,27,1,27,1,28,1,28,1,28,1,28,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,
	31,1,31,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,1,32,1,33,1,33,1,33,
	1,33,1,33,1,34,1,34,1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,
	36,1,37,1,37,1,37,1,37,1,38,1,38,1,38,1,38,1,38,1,38,5,38,405,8,38,10,38,
	12,38,408,9,38,1,38,1,38,1,39,1,39,1,39,1,39,1,39,1,39,5,39,418,8,39,10,
	39,12,39,421,9,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,1,40,1,40,5,40,432,
	8,40,10,40,12,40,435,9,40,1,40,1,40,1,40,1,41,1,41,1,41,1,41,1,41,1,41,
	1,41,1,41,5,41,448,8,41,10,41,12,41,451,9,41,1,41,1,41,1,41,1,41,1,42,1,
	42,1,42,1,42,1,42,1,42,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
	1,43,1,44,1,44,1,44,1,44,1,44,1,45,1,45,1,46,1,46,1,47,1,47,1,48,1,48,1,
	49,1,49,1,50,1,50,1,51,1,51,1,51,1,51,1,52,1,52,1,52,1,52,1,53,1,53,1,54,
	1,54,1,54,1,55,1,55,1,55,1,56,4,56,508,8,56,11,56,12,56,509,1,56,1,56,5,
	56,514,8,56,10,56,12,56,517,9,56,1,56,3,56,520,8,56,1,56,1,56,4,56,524,
	8,56,11,56,12,56,525,1,56,3,56,529,8,56,1,56,4,56,532,8,56,11,56,12,56,
	533,1,56,3,56,537,8,56,3,56,539,8,56,1,57,1,57,1,58,1,58,5,58,545,8,58,
	10,58,12,58,548,9,58,1,59,1,59,3,59,552,8,59,1,59,4,59,555,8,59,11,59,12,
	59,556,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,
	1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,
	60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,
	1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,
	60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,
	1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,
	60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,
	1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,
	60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,
	1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,1,60,3,60,699,8,60,1,
	61,5,61,702,8,61,10,61,12,61,705,9,61,1,61,1,61,1,61,1,61,1,61,4,61,712,
	8,61,11,61,12,61,713,3,61,716,8,61,1,61,1,61,1,61,5,61,721,8,61,10,61,12,
	61,724,9,61,1,61,1,61,3,61,728,8,61,1,62,1,62,1,62,1,62,1,63,1,63,3,63,
	736,8,63,1,63,3,63,739,8,63,1,64,4,64,742,8,64,11,64,12,64,743,1,64,1,64,
	1,65,1,65,1,65,1,65,1,65,1,66,1,66,1,66,1,66,1,66,1,67,1,67,1,68,1,68,1,
	68,1,68,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,69,1,70,1,70,1,70,
	1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,1,71,1,71,5,71,787,8,71,10,71,12,
	71,790,9,71,1,71,1,71,1,71,1,72,1,72,1,72,1,72,1,72,1,72,1,73,1,73,1,73,
	1,73,1,73,1,73,1,74,1,74,1,75,1,75,5,75,811,8,75,10,75,12,75,814,9,75,1,
	76,1,76,1,77,1,77,1,78,1,78,1,79,1,79,1,80,1,80,1,81,3,81,827,8,81,1,81,
	4,81,830,8,81,11,81,12,81,831,1,81,1,81,5,81,836,8,81,10,81,12,81,839,9,
	81,1,81,3,81,842,8,81,1,81,1,81,4,81,846,8,81,11,81,12,81,847,1,81,3,81,
	851,8,81,1,81,4,81,854,8,81,11,81,12,81,855,3,81,858,8,81,1,82,1,82,1,83,
	1,83,1,83,1,83,1,83,1,83,1,83,1,83,1,84,1,84,1,84,1,84,1,84,1,84,1,84,1,
	84,1,84,1,85,4,85,880,8,85,11,85,12,85,881,1,85,1,85,1,86,1,86,1,86,1,86,
	1,86,1,87,1,87,1,449,0,88,2,1,4,2,6,3,8,4,10,5,12,6,14,7,16,8,18,9,20,10,
	22,11,24,12,26,13,28,14,30,15,32,16,34,17,36,18,38,19,40,20,42,21,44,22,
	46,23,48,24,50,25,52,26,54,27,56,28,58,29,60,30,62,31,64,32,66,33,68,34,
	70,35,72,36,74,37,76,38,78,39,80,40,82,41,84,42,86,43,88,44,90,45,92,46,
	94,47,96,48,98,49,100,50,102,51,104,52,106,53,108,54,110,55,112,56,114,
	57,116,0,118,0,120,0,122,0,124,58,126,59,128,60,130,61,132,62,134,63,136,
	64,138,65,140,66,142,67,144,68,146,69,148,70,150,71,152,72,154,73,156,74,
	158,75,160,76,162,77,164,78,166,0,168,79,170,80,172,81,174,82,176,83,2,
	0,1,7,1,0,32,32,1,0,48,57,2,0,65,90,97,122,3,0,48,57,65,90,97,122,2,0,69,
	69,101,101,2,0,43,43,45,45,3,0,9,10,13,13,32,32,958,0,2,1,0,0,0,0,4,1,0,
	0,0,0,6,1,0,0,0,0,8,1,0,0,0,0,10,1,0,0,0,0,12,1,0,0,0,0,14,1,0,0,0,0,16,
	1,0,0,0,0,18,1,0,0,0,0,20,1,0,0,0,0,22,1,0,0,0,0,24,1,0,0,0,0,26,1,0,0,
	0,0,28,1,0,0,0,0,30,1,0,0,0,0,32,1,0,0,0,0,34,1,0,0,0,0,36,1,0,0,0,0,38,
	1,0,0,0,0,40,1,0,0,0,0,42,1,0,0,0,0,44,1,0,0,0,0,46,1,0,0,0,0,48,1,0,0,
	0,0,50,1,0,0,0,0,52,1,0,0,0,0,54,1,0,0,0,0,56,1,0,0,0,0,58,1,0,0,0,0,60,
	1,0,0,0,0,62,1,0,0,0,0,64,1,0,0,0,0,66,1,0,0,0,0,68,1,0,0,0,0,70,1,0,0,
	0,0,72,1,0,0,0,0,74,1,0,0,0,0,76,1,0,0,0,0,78,1,0,0,0,0,80,1,0,0,0,0,82,
	1,0,0,0,0,84,1,0,0,0,0,86,1,0,0,0,0,88,1,0,0,0,0,90,1,0,0,0,0,92,1,0,0,
	0,0,94,1,0,0,0,0,96,1,0,0,0,0,98,1,0,0,0,0,100,1,0,0,0,0,102,1,0,0,0,0,
	104,1,0,0,0,0,106,1,0,0,0,0,108,1,0,0,0,0,110,1,0,0,0,0,112,1,0,0,0,0,114,
	1,0,0,0,0,124,1,0,0,0,0,126,1,0,0,0,0,128,1,0,0,0,0,130,1,0,0,0,0,132,1,
	0,0,0,0,134,1,0,0,0,0,136,1,0,0,0,1,138,1,0,0,0,1,140,1,0,0,0,1,142,1,0,
	0,0,1,144,1,0,0,0,1,146,1,0,0,0,1,148,1,0,0,0,1,150,1,0,0,0,1,152,1,0,0,
	0,1,154,1,0,0,0,1,156,1,0,0,0,1,158,1,0,0,0,1,160,1,0,0,0,1,162,1,0,0,0,
	1,164,1,0,0,0,1,168,1,0,0,0,1,170,1,0,0,0,1,172,1,0,0,0,1,174,1,0,0,0,1,
	176,1,0,0,0,2,178,1,0,0,0,4,182,1,0,0,0,6,192,1,0,0,0,8,194,1,0,0,0,10,
	196,1,0,0,0,12,198,1,0,0,0,14,200,1,0,0,0,16,202,1,0,0,0,18,204,1,0,0,0,
	20,206,1,0,0,0,22,210,1,0,0,0,24,215,1,0,0,0,26,228,1,0,0,0,28,242,1,0,
	0,0,30,256,1,0,0,0,32,264,1,0,0,0,34,270,1,0,0,0,36,285,1,0,0,0,38,291,
	1,0,0,0,40,297,1,0,0,0,42,311,1,0,0,0,44,316,1,0,0,0,46,324,1,0,0,0,48,
	326,1,0,0,0,50,330,1,0,0,0,52,334,1,0,0,0,54,338,1,0,0,0,56,342,1,0,0,0,
	58,346,1,0,0,0,60,350,1,0,0,0,62,357,1,0,0,0,64,364,1,0,0,0,66,371,1,0,
	0,0,68,376,1,0,0,0,70,381,1,0,0,0,72,386,1,0,0,0,74,391,1,0,0,0,76,394,
	1,0,0,0,78,398,1,0,0,0,80,411,1,0,0,0,82,425,1,0,0,0,84,439,1,0,0,0,86,
	456,1,0,0,0,88,464,1,0,0,0,90,473,1,0,0,0,92,478,1,0,0,0,94,480,1,0,0,0,
	96,482,1,0,0,0,98,484,1,0,0,0,100,486,1,0,0,0,102,488,1,0,0,0,104,490,1,
	0,0,0,106,494,1,0,0,0,108,498,1,0,0,0,110,500,1,0,0,0,112,503,1,0,0,0,114,
	538,1,0,0,0,116,540,1,0,0,0,118,542,1,0,0,0,120,549,1,0,0,0,122,558,1,0,
	0,0,124,727,1,0,0,0,126,729,1,0,0,0,128,735,1,0,0,0,130,741,1,0,0,0,132,
	747,1,0,0,0,134,752,1,0,0,0,136,757,1,0,0,0,138,759,1,0,0,0,140,763,1,0,
	0,0,142,773,1,0,0,0,144,779,1,0,0,0,146,794,1,0,0,0,148,800,1,0,0,0,150,
	806,1,0,0,0,152,808,1,0,0,0,154,815,1,0,0,0,156,817,1,0,0,0,158,819,1,0,
	0,0,160,821,1,0,0,0,162,823,1,0,0,0,164,857,1,0,0,0,166,859,1,0,0,0,168,
	861,1,0,0,0,170,869,1,0,0,0,172,879,1,0,0,0,174,885,1,0,0,0,176,890,1,0,
	0,0,178,179,5,91,0,0,179,180,1,0,0,0,180,181,6,0,0,0,181,3,1,0,0,0,182,
	183,5,92,0,0,183,184,5,108,0,0,184,185,5,98,0,0,185,186,5,114,0,0,186,187,
	5,97,0,0,187,188,5,99,0,0,188,189,5,107,0,0,189,190,1,0,0,0,190,191,6,1,
	0,0,191,5,1,0,0,0,192,193,5,59,0,0,193,7,1,0,0,0,194,195,5,123,0,0,195,
	9,1,0,0,0,196,197,5,125,0,0,197,11,1,0,0,0,198,199,5,40,0,0,199,13,1,0,
	0,0,200,201,5,41,0,0,201,15,1,0,0,0,202,203,5,124,0,0,203,17,1,0,0,0,204,
	205,5,95,0,0,205,19,1,0,0,0,206,207,5,92,0,0,207,208,5,112,0,0,208,209,
	5,105,0,0,209,21,1,0,0,0,210,211,5,92,0,0,211,212,5,105,0,0,212,213,5,110,
	0,0,213,214,5,116,0,0,214,23,1,0,0,0,215,216,5,92,0,0,216,217,5,105,0,0,
	217,218,5,110,0,0,218,219,5,116,0,0,219,223,1,0,0,0,220,222,7,0,0,0,221,
	220,1,0,0,0,222,225,1,0,0,0,223,221,1,0,0,0,223,224,1,0,0,0,224,226,1,0,
	0,0,225,223,1,0,0,0,226,227,5,95,0,0,227,25,1,0,0,0,228,229,5,92,0,0,229,
	230,5,105,0,0,230,231,5,110,0,0,231,232,5,116,0,0,232,236,1,0,0,0,233,235,
	7,0,0,0,234,233,1,0,0,0,235,238,1,0,0,0,236,234,1,0,0,0,236,237,1,0,0,0,
	237,239,1,0,0,0,238,236,1,0,0,0,239,240,5,95,0,0,240,241,7,1,0,0,241,27,
	1,0,0,0,242,243,5,92,0,0,243,244,5,105,0,0,244,245,5,110,0,0,245,246,5,
	116,0,0,246,250,1,0,0,0,247,249,7,0,0,0,248,247,1,0,0,0,249,252,1,0,0,0,
	250,248,1,0,0,0,250,251,1,0,0,0,251,253,1,0,0,0,252,250,1,0,0,0,253,254,
	5,95,0,0,254,255,7,2,0,0,255,29,1,0,0,0,256,257,5,92,0,0,257,258,5,109,
	0,0,258,259,5,97,0,0,259,260,5,116,0,0,260,261,5,104,0,0,261,262,5,114,
	0,0,262,263,5,109,0,0,263,31,1,0,0,0,264,265,5,92,0,0,265,266,5,102,0,0,
	266,267,5,114,0,0,267,268,5,97,0,0,268,269,5,99,0,0,269,33,1,0,0,0,270,
	271,5,92,0,0,271,272,5,102,0,0,272,273,5,114,0,0,273,274,5,97,0,0,274,275,
	5,99,0,0,275,279,1,0,0,0,276,278,7,0,0,0,277,276,1,0,0,0,278,281,1,0,0,
	0,279,277,1,0,0,0,279,280,1,0,0,0,280,282,1,0,0,0,281,279,1,0,0,0,282,283,
	7,1,0,0,283,284,7,1,0,0,284,35,1,0,0,0,285,286,5,92,0,0,286,287,5,99,0,
	0,287,288,5,100,0,0,288,289,5,111,0,0,289,290,5,116,0,0,290,37,1,0,0,0,
	291,292,5,92,0,0,292,293,5,115,0,0,293,294,5,113,0,0,294,295,5,114,0,0,
	295,296,5,116,0,0,296,39,1,0,0,0,297,298,5,92,0,0,298,299,5,115,0,0,299,
	300,5,113,0,0,300,301,5,114,0,0,301,302,5,116,0,0,302,306,1,0,0,0,303,305,
	7,0,0,0,304,303,1,0,0,0,305,308,1,0,0,0,306,304,1,0,0,0,306,307,1,0,0,0,
	307,309,1,0,0,0,308,306,1,0,0,0,309,310,7,1,0,0,310,41,1,0,0,0,311,312,
	5,92,0,0,312,313,5,115,0,0,313,314,5,105,0,0,314,315,5,109,0,0,315,43,1,
	0,0,0,316,317,5,92,0,0,317,318,5,97,0,0,318,319,5,112,0,0,319,320,5,112,
	0,0,320,321,5,114,0,0,321,322,5,111,0,0,322,323,5,120,0,0,323,45,1,0,0,
	0,324,325,5,92,0,0,325,47,1,0,0,0,326,327,5,115,0,0,327,328,5,105,0,0,328,
	329,5,110,0,0,329,49,1,0,0,0,330,331,5,99,0,0,331,332,5,111,0,0,332,333,
	5,115,0,0,333,51,1,0,0,0,334,335,5,116,0,0,335,336,5,97,0,0,336,337,5,110,
	0,0,337,53,1,0,0,0,338,339,5,99,0,0,339,340,5,111,0,0,340,341,5,116,0,0,
	341,55,1,0,0,0,342,343,5,115,0,0,343,344,5,101,0,0,344,345,5,99,0,0,345,
	57,1,0,0,0,346,347,5,99,0,0,347,348,5,115,0,0,348,349,5,99,0,0,349,59,1,
	0,0,0,350,351,5,97,0,0,351,352,5,114,0,0,352,353,5,99,0,0,353,354,5,115,
	0,0,354,355,5,105,0,0,355,356,5,110,0,0,356,61,1,0,0,0,357,358,5,97,0,0,
	358,359,5,114,0,0,359,360,5,99,0,0,360,361,5,99,0,0,361,362,5,111,0,0,362,
	363,5,115,0,0,363,63,1,0,0,0,364,365,5,97,0,0,365,366,5,114,0,0,366,367,
	5,99,0,0,367,368,5,116,0,0,368,369,5,97,0,0,369,370,5,110,0,0,370,65,1,
	0,0,0,371,372,5,115,0,0,372,373,5,105,0,0,373,374,5,110,0,0,374,375,5,104,
	0,0,375,67,1,0,0,0,376,377,5,99,0,0,377,378,5,111,0,0,378,379,5,115,0,0,
	379,380,5,104,0,0,380,69,1,0,0,0,381,382,5,116,0,0,382,383,5,97,0,0,383,
	384,5,110,0,0,384,385,5,104,0,0,385,71,1,0,0,0,386,387,5,99,0,0,387,388,
	5,111,0,0,388,389,5,116,0,0,389,390,5,104,0,0,390,73,1,0,0,0,391,392,5,
	108,0,0,392,393,5,110,0,0,393,75,1,0,0,0,394,395,5,108,0,0,395,396,5,111,
	0,0,396,397,5,103,0,0,397,77,1,0,0,0,398,399,5,92,0,0,399,400,5,108,0,0,
	400,401,5,111,0,0,401,402,5,103,0,0,402,406,1,0,0,0,403,405,7,0,0,0,404,
	403,1,0,0,0,405,408,1,0,0,0,406,404,1,0,0,0,406,407,1,0,0,0,407,409,1,0,
	0,0,408,406,1,0,0,0,409,410,5,95,0,0,410,79,1,0,0,0,411,412,5,92,0,0,412,
	413,5,108,0,0,413,414,5,111,0,0,414,415,5,103,0,0,415,419,1,0,0,0,416,418,
	7,0,0,0,417,416,1,0,0,0,418,421,1,0,0,0,419,417,1,0,0,0,419,420,1,0,0,0,
	420,422,1,0,0,0,421,419,1,0,0,0,422,423,5,95,0,0,423,424,7,1,0,0,424,81,
	1,0,0,0,425,426,5,92,0,0,426,427,5,108,0,0,427,428,5,111,0,0,428,429,5,
	103,0,0,429,433,1,0,0,0,430,432,7,0,0,0,431,430,1,0,0,0,432,435,1,0,0,0,
	433,431,1,0,0,0,433,434,1,0,0,0,434,436,1,0,0,0,435,433,1,0,0,0,436,437,
	5,95,0,0,437,438,7,2,0,0,438,83,1,0,0,0,439,440,5,92,0,0,440,441,5,116,
	0,0,441,442,5,101,0,0,442,443,5,120,0,0,443,444,5,116,0,0,444,445,5,123,
	0,0,445,449,1,0,0,0,446,448,9,0,0,0,447,446,1,0,0,0,448,451,1,0,0,0,449,
	450,1,0,0,0,449,447,1,0,0,0,450,452,1,0,0,0,451,449,1,0,0,0,452,453,5,125,
	0,0,453,454,1,0,0,0,454,455,6,41,1,0,455,85,1,0,0,0,456,457,5,92,0,0,457,
	458,5,108,0,0,458,459,5,101,0,0,459,460,5,102,0,0,460,461,5,116,0,0,461,
	462,1,0,0,0,462,463,6,42,1,0,463,87,1,0,0,0,464,465,5,92,0,0,465,466,5,
	114,0,0,466,467,5,105,0,0,467,468,5,103,0,0,468,469,5,104,0,0,469,470,5,
	116,0,0,470,471,1,0,0,0,471,472,6,43,1,0,472,89,1,0,0,0,473,474,5,36,0,
	0,474,475,5,36,0,0,475,476,1,0,0,0,476,477,6,44,1,0,477,91,1,0,0,0,478,
	479,5,43,0,0,479,93,1,0,0,0,480,481,5,45,0,0,481,95,1,0,0,0,482,483,5,94,
	0,0,483,97,1,0,0,0,484,485,5,61,0,0,485,99,1,0,0,0,486,487,5,60,0,0,487,
	101,1,0,0,0,488,489,5,62,0,0,489,103,1,0,0,0,490,491,5,92,0,0,491,492,5,
	108,0,0,492,493,5,101,0,0,493,105,1,0,0,0,494,495,5,92,0,0,495,496,5,103,
	0,0,496,497,5,101,0,0,497,107,1,0,0,0,498,499,5,44,0,0,499,109,1,0,0,0,
	500,501,5,94,0,0,501,502,7,1,0,0,502,111,1,0,0,0,503,504,5,94,0,0,504,505,
	7,2,0,0,505,113,1,0,0,0,506,508,3,116,57,0,507,506,1,0,0,0,508,509,1,0,
	0,0,509,507,1,0,0,0,509,510,1,0,0,0,510,511,1,0,0,0,511,515,5,46,0,0,512,
	514,3,116,57,0,513,512,1,0,0,0,514,517,1,0,0,0,515,513,1,0,0,0,515,516,
	1,0,0,0,516,519,1,0,0,0,517,515,1,0,0,0,518,520,3,120,59,0,519,518,1,0,
	0,0,519,520,1,0,0,0,520,539,1,0,0,0,521,523,5,46,0,0,522,524,3,116,57,0,
	523,522,1,0,0,0,524,525,1,0,0,0,525,523,1,0,0,0,525,526,1,0,0,0,526,528,
	1,0,0,0,527,529,3,120,59,0,528,527,1,0,0,0,528,529,1,0,0,0,529,539,1,0,
	0,0,530,532,3,116,57,0,531,530,1,0,0,0,532,533,1,0,0,0,533,531,1,0,0,0,
	533,534,1,0,0,0,534,536,1,0,0,0,535,537,3,120,59,0,536,535,1,0,0,0,536,
	537,1,0,0,0,537,539,1,0,0,0,538,507,1,0,0,0,538,521,1,0,0,0,538,531,1,0,
	0,0,539,115,1,0,0,0,540,541,7,1,0,0,541,117,1,0,0,0,542,546,7,2,0,0,543,
	545,7,3,0,0,544,543,1,0,0,0,545,548,1,0,0,0,546,544,1,0,0,0,546,547,1,0,
	0,0,547,119,1,0,0,0,548,546,1,0,0,0,549,551,7,4,0,0,550,552,7,5,0,0,551,
	550,1,0,0,0,551,552,1,0,0,0,552,554,1,0,0,0,553,555,3,116,57,0,554,553,
	1,0,0,0,555,556,1,0,0,0,556,554,1,0,0,0,556,557,1,0,0,0,557,121,1,0,0,0,
	558,698,5,92,0,0,559,560,5,97,0,0,560,561,5,108,0,0,561,562,5,112,0,0,562,
	563,5,104,0,0,563,699,5,97,0,0,564,565,5,98,0,0,565,566,5,101,0,0,566,567,
	5,116,0,0,567,699,5,97,0,0,568,569,5,103,0,0,569,570,5,97,0,0,570,571,5,
	109,0,0,571,572,5,109,0,0,572,699,5,97,0,0,573,574,5,100,0,0,574,575,5,
	101,0,0,575,576,5,108,0,0,576,577,5,116,0,0,577,699,5,97,0,0,578,579,5,
	101,0,0,579,580,5,112,0,0,580,581,5,115,0,0,581,582,5,105,0,0,582,583,5,
	108,0,0,583,584,5,111,0,0,584,699,5,110,0,0,585,586,5,122,0,0,586,587,5,
	101,0,0,587,588,5,116,0,0,588,699,5,97,0,0,589,590,5,101,0,0,590,591,5,
	116,0,0,591,699,5,97,0,0,592,593,5,116,0,0,593,594,5,104,0,0,594,595,5,
	101,0,0,595,596,5,116,0,0,596,699,5,97,0,0,597,598,5,105,0,0,598,599,5,
	111,0,0,599,600,5,116,0,0,600,699,5,97,0,0,601,602,5,107,0,0,602,603,5,
	97,0,0,603,604,5,112,0,0,604,605,5,112,0,0,605,699,5,97,0,0,606,607,5,108,
	0,0,607,608,5,97,0,0,608,609,5,109,0,0,609,610,5,98,0,0,610,611,5,100,0,
	0,611,699,5,97,0,0,612,613,5,109,0,0,613,699,5,117,0,0,614,615,5,110,0,
	0,615,699,5,117,0,0,616,617,5,120,0,0,617,699,5,105,0,0,618,619,5,114,0,
	0,619,620,5,104,0,0,620,699,5,111,0,0,621,622,5,115,0,0,622,623,5,105,0,
	0,623,624,5,103,0,0,624,625,5,109,0,0,625,699,5,97,0,0,626,627,5,116,0,
	0,627,628,5,97,0,0,628,699,5,117,0,0,629,630,5,117,0,0,630,631,5,112,0,
	0,631,632,5,115,0,0,632,633,5,105,0,0,633,634,5,108,0,0,634,635,5,111,0,
	0,635,699,5,110,0,0,636,637,5,112,0,0,637,638,5,104,0,0,638,699,5,105,0,
	0,639,640,5,99,0,0,640,641,5,104,0,0,641,699,5,105,0,0,642,643,5,112,0,
	0,643,644,5,115,0,0,644,699,5,105,0,0,645,646,5,111,0,0,646,647,5,109,0,
	0,647,648,5,101,0,0,648,649,5,103,0,0,649,699,5,97,0,0,650,651,5,71,0,0,
	651,652,5,97,0,0,652,653,5,109,0,0,653,654,5,109,0,0,654,699,5,97,0,0,655,
	656,5,68,0,0,656,657,5,101,0,0,657,658,5,108,0,0,658,659,5,116,0,0,659,
	699,5,97,0,0,660,661,5,84,0,0,661,662,5,104,0,0,662,663,5,101,0,0,663,664,
	5,116,0,0,664,699,5,97,0,0,665,666,5,76,0,0,666,667,5,97,0,0,667,668,5,
	109,0,0,668,669,5,98,0,0,669,670,5,100,0,0,670,699,5,97,0,0,671,672,5,88,
	0,0,672,699,5,105,0,0,673,674,5,80,0,0,674,699,5,105,0,0,675,676,5,83,0,
	0,676,677,5,105,0,0,677,678,5,103,0,0,678,679,5,109,0,0,679,699,5,97,0,
	0,680,681,5,85,0,0,681,682,5,112,0,0,682,683,5,115,0,0,683,684,5,105,0,
	0,684,685,5,108,0,0,685,686,5,111,0,0,686,699,5,110,0,0,687,688,5,80,0,
	0,688,689,5,104,0,0,689,699,5,105,0,0,690,691,5,80,0,0,691,692,5,115,0,
	0,692,699,5,105,0,0,693,694,5,79,0,0,694,695,5,109,0,0,695,696,5,101,0,
	0,696,697,5,103,0,0,697,699,5,97,0,0,698,559,1,0,0,0,698,564,1,0,0,0,698,
	568,1,0,0,0,698,573,1,0,0,0,698,578,1,0,0,0,698,585,1,0,0,0,698,589,1,0,
	0,0,698,592,1,0,0,0,698,597,1,0,0,0,698,601,1,0,0,0,698,606,1,0,0,0,698,
	612,1,0,0,0,698,614,1,0,0,0,698,616,1,0,0,0,698,618,1,0,0,0,698,621,1,0,
	0,0,698,626,1,0,0,0,698,629,1,0,0,0,698,636,1,0,0,0,698,639,1,0,0,0,698,
	642,1,0,0,0,698,645,1,0,0,0,698,650,1,0,0,0,698,655,1,0,0,0,698,660,1,0,
	0,0,698,665,1,0,0,0,698,671,1,0,0,0,698,673,1,0,0,0,698,675,1,0,0,0,698,
	680,1,0,0,0,698,687,1,0,0,0,698,690,1,0,0,0,698,693,1,0,0,0,699,123,1,0,
	0,0,700,702,7,0,0,0,701,700,1,0,0,0,702,705,1,0,0,0,703,701,1,0,0,0,703,
	704,1,0,0,0,704,706,1,0,0,0,705,703,1,0,0,0,706,707,5,95,0,0,707,708,5,
	123,0,0,708,715,1,0,0,0,709,716,3,118,58,0,710,712,3,116,57,0,711,710,1,
	0,0,0,712,713,1,0,0,0,713,711,1,0,0,0,713,714,1,0,0,0,714,716,1,0,0,0,715,
	709,1,0,0,0,715,711,1,0,0,0,716,717,1,0,0,0,717,718,5,125,0,0,718,728,1,
	0,0,0,719,721,7,0,0,0,720,719,1,0,0,0,721,724,1,0,0,0,722,720,1,0,0,0,722,
	723,1,0,0,0,723,725,1,0,0,0,724,722,1,0,0,0,725,726,5,95,0,0,726,728,7,
	3,0,0,727,703,1,0,0,0,727,722,1,0,0,0,728,125,1,0,0,0,729,730,5,94,0,0,
	730,731,7,2,0,0,731,732,3,124,61,0,732,127,1,0,0,0,733,736,3,118,58,0,734,
	736,3,122,60,0,735,733,1,0,0,0,735,734,1,0,0,0,736,738,1,0,0,0,737,739,
	3,124,61,0,738,737,1,0,0,0,738,739,1,0,0,0,739,129,1,0,0,0,740,742,7,6,
	0,0,741,740,1,0,0,0,742,743,1,0,0,0,743,741,1,0,0,0,743,744,1,0,0,0,744,
	745,1,0,0,0,745,746,6,64,1,0,746,131,1,0,0,0,747,748,5,92,0,0,748,749,5,
	32,0,0,749,750,1,0,0,0,750,751,6,65,1,0,751,133,1,0,0,0,752,753,5,92,0,
	0,753,754,5,58,0,0,754,755,1,0,0,0,755,756,6,66,1,0,756,135,1,0,0,0,757,
	758,9,0,0,0,758,137,1,0,0,0,759,760,5,93,0,0,760,761,1,0,0,0,761,762,6,
	68,2,0,762,139,1,0,0,0,763,764,5,92,0,0,764,765,5,114,0,0,765,766,5,98,
	0,0,766,767,5,114,0,0,767,768,5,97,0,0,768,769,5,99,0,0,769,770,5,107,0,
	0,770,771,1,0,0,0,771,772,6,69,2,0,772,141,1,0,0,0,773,774,5,92,0,0,774,
	775,5,102,0,0,775,776,5,114,0,0,776,777,5,97,0,0,777,778,5,99,0,0,778,143,
	1,0,0,0,779,780,5,92,0,0,780,781,5,102,0,0,781,782,5,114,0,0,782,783,5,
	97,0,0,783,784,5,99,0,0,784,788,1,0,0,0,785,787,7,0,0,0,786,785,1,0,0,0,
	787,790,1,0,0,0,788,786,1,0,0,0,788,789,1,0,0,0,789,791,1,0,0,0,790,788,
	1,0,0,0,791,792,7,1,0,0,792,793,7,1,0,0,793,145,1,0,0,0,794,795,5,92,0,
	0,795,796,5,99,0,0,796,797,5,100,0,0,797,798,5,111,0,0,798,799,5,116,0,
	0,799,147,1,0,0,0,800,801,5,92,0,0,801,802,5,115,0,0,802,803,5,113,0,0,
	803,804,5,114,0,0,804,805,5,116,0,0,805,149,1,0,0,0,806,807,5,94,0,0,807,
	151,1,0,0,0,808,812,7,2,0,0,809,811,7,3,0,0,810,809,1,0,0,0,811,814,1,0,
	0,0,812,810,1,0,0,0,812,813,1,0,0,0,813,153,1,0,0,0,814,812,1,0,0,0,815,
	816,5,40,0,0,816,155,1,0,0,0,817,818,5,41,0,0,818,157,1,0,0,0,819,820,5,
	123,0,0,820,159,1,0,0,0,821,822,5,125,0,0,822,161,1,0,0,0,823,824,5,49,
	0,0,824,163,1,0,0,0,825,827,5,45,0,0,826,825,1,0,0,0,826,827,1,0,0,0,827,
	829,1,0,0,0,828,830,3,166,82,0,829,828,1,0,0,0,830,831,1,0,0,0,831,829,
	1,0,0,0,831,832,1,0,0,0,832,833,1,0,0,0,833,837,5,46,0,0,834,836,3,166,
	82,0,835,834,1,0,0,0,836,839,1,0,0,0,837,835,1,0,0,0,837,838,1,0,0,0,838,
	858,1,0,0,0,839,837,1,0,0,0,840,842,5,45,0,0,841,840,1,0,0,0,841,842,1,
	0,0,0,842,843,1,0,0,0,843,845,5,46,0,0,844,846,3,166,82,0,845,844,1,0,0,
	0,846,847,1,0,0,0,847,845,1,0,0,0,847,848,1,0,0,0,848,858,1,0,0,0,849,851,
	5,45,0,0,850,849,1,0,0,0,850,851,1,0,0,0,851,853,1,0,0,0,852,854,3,166,
	82,0,853,852,1,0,0,0,854,855,1,0,0,0,855,853,1,0,0,0,855,856,1,0,0,0,856,
	858,1,0,0,0,857,826,1,0,0,0,857,841,1,0,0,0,857,850,1,0,0,0,858,165,1,0,
	0,0,859,860,7,1,0,0,860,167,1,0,0,0,861,862,5,92,0,0,862,863,5,108,0,0,
	863,864,5,101,0,0,864,865,5,102,0,0,865,866,5,116,0,0,866,867,1,0,0,0,867,
	868,6,83,1,0,868,169,1,0,0,0,869,870,5,92,0,0,870,871,5,114,0,0,871,872,
	5,105,0,0,872,873,5,103,0,0,873,874,5,104,0,0,874,875,5,116,0,0,875,876,
	1,0,0,0,876,877,6,84,1,0,877,171,1,0,0,0,878,880,7,6,0,0,879,878,1,0,0,
	0,880,881,1,0,0,0,881,879,1,0,0,0,881,882,1,0,0,0,882,883,1,0,0,0,883,884,
	6,85,1,0,884,173,1,0,0,0,885,886,5,92,0,0,886,887,5,32,0,0,887,888,1,0,
	0,0,888,889,6,86,1,0,889,175,1,0,0,0,890,891,9,0,0,0,891,177,1,0,0,0,42,
	0,1,223,236,250,279,306,406,419,433,449,509,515,519,525,528,533,536,538,
	546,551,556,698,703,713,715,722,727,735,738,743,788,812,826,831,837,841,
	847,850,855,857,881,3,2,1,0,6,0,0,2,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LatexLexer.__ATN) {
			LatexLexer.__ATN = new ATNDeserializer().deserialize(LatexLexer._serializedATN);
		}

		return LatexLexer.__ATN;
	}


	static DecisionsToDFA = LatexLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}