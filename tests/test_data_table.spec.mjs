import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));

test('Test table assign no units', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('11');
  await page.keyboard.press('Enter');
  await page.keyboard.type('22');
  await page.keyboard.press('Enter');
  await page.keyboard.type('0');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11 \\ 22 \\ 0 \end{bmatrix}`);

  // add row and make sure the result updates
  await page.locator("#data-table-input-1-2-0").click();
  await page.keyboard.press('Enter');
  await page.keyboard.type('33');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11 \\ 22 \\ 0 \\ 33 \end{bmatrix}`);
});

test('Test table assign with units', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('11');
  await page.keyboard.press('Enter');
  await page.keyboard.type('22');
  await page.keyboard.press('Enter');
  await page.keyboard.type('0');

  await page.locator('#parameter-units-1-0 >> math-field').type('[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11\left\lbrack m\right\rbrack  \\ 22\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \end{bmatrix}`);

  // add row and make sure the result updates
  await page.locator("#data-table-input-1-2-0").click();
  await page.keyboard.press('Enter');
  await page.keyboard.type('33');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 11\left\lbrack m\right\rbrack  \\ 22\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 33\left\lbrack m\right\rbrack  \end{bmatrix}`);
});

test('Test computed column with and without units and adding/deleting rows/cols', async () => {
  await page.setLatex(0, String.raw`Col3=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('11');
  await page.keyboard.press('Tab');
  await page.keyboard.type('44');
  await page.keyboard.press('Tab');
  await page.keyboard.type('22');
  await page.keyboard.press('Tab');
  await page.keyboard.type('55');
  await page.keyboard.press('Enter');
  await page.keyboard.type('0');

  await page.locator('#add-col-1').click();

  await page.setLatex(1, String.raw`Col1+Col2=`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(content).toBe('Col_{3}');

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(55, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(77, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(content.trim()).toBe('');

  // switch to an assign instead of a query
  await page.setLatex(1, String.raw`Col3=2\cdot\left(Col1+Col2\right)`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 110 \\ 154 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(110, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(154, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(content.trim()).toBe('');

  // switch to an assign plus query
  await page.setLatex(1, String.raw`Col3=3\cdot\left(Col1+Col2\right)=`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165 \\ 231 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(content.trim()).toBe('');

  // add value to last row of second column
  await page.locator("#data-table-input-1-2-1").type('10');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165 \\ 231 \\ 30 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30, precision);

  // add units to only first column (should cause dimension error)
  await page.locator('#parameter-units-1-0 >> math-field').type('[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();
  await expect(page.locator('#parameter-name-1-2 >> text=Dimension Error')).toBeAttached();

  // add units to second column to fix dimension error
  await page.locator('#parameter-units-1-1 >> math-field').type('[m]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165\left\lbrack m\right\rbrack  \\ 231\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30, precision);

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack m\\right\\rbrack')).toBeAttached();

  // specify custom output units for calculated column
  await page.setLatex(1, String.raw`Col3=3\cdot\left(Col1+Col2\right)=\left\lbrack mm\right\rbrack`, 2);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165\left\lbrack m\right\rbrack  \\ 231\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165000, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(231000, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // update one data table value and make sure results update
  await page.locator('#data-table-input-1-1-1').click({clickCount: 3});
  await page.locator('#data-table-input-1-1-1').type('3');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 165\left\lbrack m\right\rbrack  \\ 75\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(165000, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(75000, precision);

  content = await page.textContent('#grid-cell-1-2-2');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // delete first row
  await page.locator('#delete-row-1-0').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 75\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-2');
  expect(parseFloat(content)).toBeCloseTo(75000, precision);

  content = await page.textContent('#grid-cell-1-1-2');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await expect(page.locator('#grid-cell-1-2-0')).toBeHidden();

  await page.locator('#parameter-units-1-2 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-2 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // delete first col
  await page.locator('#delete-col-1-0').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#parameter-name-1-1 >> text=Some results do not evaluate to a finite real value, which cannot be displayed in a data table')).toBeAttached();

  // update calculated column equation to no longer reference missing column
  await page.setLatex(1, String.raw`Col3=3\cdot Col2=\left\lbrack mm\right\rbrack`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack m\right\rbrack  \\ 30\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-1');
  expect(parseFloat(content)).toBeCloseTo(9000, precision);

  content = await page.textContent('#grid-cell-1-1-1');
  expect(parseFloat(content)).toBeCloseTo(30000, precision);

  await expect(page.locator('#grid-cell-1-0-2')).toBeHidden();

  await page.locator('#parameter-units-1-1 >> math-field').click({clickCount: 3});
  await expect(page.locator('#parameter-units-1-1 >> text=\\left\\lbrack mm\\right\\rbrack')).toBeAttached();

  // add text to first column first row data table input to force the vector to be zero size
  await page.locator('#data-table-input-1-0-0').type('a');

  await expect(page.locator('#grid-cell-1-0-0 >> text=Data table must contain numeric values')).toBeAttached();
  await expect(page.locator('text=Attempt to use empty column "Col2" in a data table calculation')).toBeAttached();

  // update calculation to not use empty column
  await page.setLatex(1, String.raw`Col3=Col4`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#parameter-name-1-1 >> text=Some results do not evaluate to a finite real value, which cannot be displayed in a data table')).toBeAttached();

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`Col_{4}`);

  // add new column and make sure parameter id list updates to include new column
  await page.locator('#add-col-1').click();

  await expect(page.locator('text=Attempt to use empty column "Col4" in a data table calculation')).toBeAttached();

  // add value to first entry of new column and make sure everything updates
  await page.locator('#data-table-input-1-0-2').type('7');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`\begin{bmatrix} 7 \end{bmatrix}`);

  content = await page.textContent('#grid-cell-1-0-1');
  expect(parseFloat(content)).toBeCloseTo(7, precision);

  content = await page.textContent('#grid-cell-1-1-1');
  expect(content.trim()).toBe('');
});

test('Test auto grow with range output', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeAttached();

  await expect(page.locator('#data-table-input-1-9-1')).toBeHidden();

  await page.setLatex(1, String.raw`Col1=\mathrm{range}\left(10\right)`, 0);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \\ 10 \end{bmatrix}`);

  await expect(page.locator('#data-table-input-1-9-1')).toBeAttached();

  content = await page.textContent('#grid-cell-1-0-0');
  expect(parseFloat(content)).toBeCloseTo(1, precision);

  content = await page.textContent('#grid-cell-1-1-0');
  expect(parseFloat(content)).toBeCloseTo(2, precision);

  content = await page.textContent('#grid-cell-1-2-0');
  expect(parseFloat(content)).toBeCloseTo(3, precision);

  content = await page.textContent('#grid-cell-1-3-0');
  expect(parseFloat(content)).toBeCloseTo(4, precision);

  content = await page.textContent('#grid-cell-1-4-0');
  expect(parseFloat(content)).toBeCloseTo(5, precision);

  content = await page.textContent('#grid-cell-1-5-0');
  expect(parseFloat(content)).toBeCloseTo(6, precision);

  content = await page.textContent('#grid-cell-1-6-0');
  expect(parseFloat(content)).toBeCloseTo(7, precision);

  content = await page.textContent('#grid-cell-1-7-0');
  expect(parseFloat(content)).toBeCloseTo(8, precision);

  content = await page.textContent('#grid-cell-1-8-0');
  expect(parseFloat(content)).toBeCloseTo(9, precision);

  content = await page.textContent('#grid-cell-1-9-0');
  expect(parseFloat(content)).toBeCloseTo(10, precision);
});

test('Test table assign with base temperature units', async () => {
  await page.setLatex(0, String.raw`Col1=`);

  await page.locator('#add-data-table-cell').click();

  await expect(page.locator('#data-table-input-1-0-0')).toBeFocused();

  await page.keyboard.type('0');
  await page.keyboard.press('Enter');
  await page.keyboard.type('-40');
  await page.keyboard.press('Enter');
  await page.keyboard.type('100');

  await page.locator('#parameter-units-1-0 >> math-field').type('[degC]');

  await page.setLatex(1, String.raw`Col1=\left\lbrack degF\right\rbrack`, 1);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#grid-cell-1-0-1');
  expect(parseFloat(content)).toBeCloseTo(32, 12);

  content = await page.textContent('#grid-cell-1-1-1');
  expect(parseFloat(content)).toBeCloseTo(-40, precision);

  content = await page.textContent('#grid-cell-1-2-1');
  expect(parseFloat(content)).toBeCloseTo(212, 12);
});

test('Test linear interpolation', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-data-table-cell').click();

  await page.locator('#add-col-1').click();

  await page.locator('#data-table-input-1-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('10');
  await page.keyboard.press('Enter');

  await page.keyboard.type('2');
  await page.keyboard.press('Tab');
  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('6');
  await page.keyboard.press('Enter');

  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('16');
  await page.keyboard.press('Tab');
  await page.keyboard.type('-6');

  await page.getByRole('button', { name: 'Add Interpolation Function' }).click();
  await page.getByLabel('Copy function name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(1)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change output and make sure result changes
  await page.locator('#output-radio-1-0-2').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change input and make sure result updates
  await page.locator('#input-radio-1-0-1').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(9, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // add units to inputs and outputs
  await page.locator('#parameter-units-1-1 >> math-field').type('[m]');
  await page.locator('#parameter-units-1-2 >> math-field').type('[s]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();

  // update query to fix dimension error
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(2[m])=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s');

  // make sure extrapolation generates an error
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(17[m])=');

  await expect(page.locator('text=Attempt to extrapolate with an interpolation function')).toBeAttached();

});

test('Test polyfit (quadratic and linear)', async () => {
  const modifierKey = (await page.evaluate('window.modifierKey') )=== "metaKey" ? "Meta" : "Control";

  await page.locator('#add-data-table-cell').click();

  await page.locator('#add-col-1').click();

  await page.locator('#data-table-input-1-0-0').click();

  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('0');
  await page.keyboard.press('Tab');
  await page.keyboard.type('10');
  await page.keyboard.press('Enter');

  await page.keyboard.type('2');
  await page.keyboard.press('Tab');
  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('6');
  await page.keyboard.press('Enter');

  await page.keyboard.type('4');
  await page.keyboard.press('Tab');
  await page.keyboard.type('16');
  await page.keyboard.press('Tab');
  await page.keyboard.type('-6');

  await page.getByRole('button', { name: 'Add Polyfit Function' }).click();
  await page.getByLabel('Order:').fill('2');
  await page.getByLabel('Copy function name to').click();

  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(1.1)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(1.21, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change output and make sure result changes
  await page.locator('#output-radio-1-0-2').click();

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8.79, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');

  // change input and order
  await page.getByLabel('Order:').fill('1');
  await page.locator('#input-radio-1-0-1').click();

  // add units to inputs and outputs
  await page.locator('#parameter-units-1-1 >> math-field').type('[m]');
  await page.locator('#parameter-units-1-2 >> math-field').type('[s]');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  await expect(page.locator('#cell-0 >> text=Dimension Error')).toBeAttached();

  // update query to fix dimension error
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(2[m])=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(8, precision);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('s');

  // query symbolic version of polyfit
  await page.locator('#cell-0 >> math-field.editable').click({clickCount: 3});
  await page.locator('#cell-0 >> math-field.editable').press(modifierKey+'+v');
  await page.locator('#cell-0 >> math-field.editable').type('(x)=');

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  content = await page.textContent('#result-value-0');
  expect(content).toBe(String.raw`10.0 - 1.0 x`);
  content = await page.textContent('#result-units-0');
  expect(content).toBe('');
});

test('Test excel file import with headers and no units', async () => {
  await page.setLatex(0, String.raw`col1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\alpha_1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\sigma_{initial}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`col3=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_no_units.xlsx');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet File' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1 \\ 0 \\ 3 \\ 1 \\ -20.3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9 \\ 8 \\ 7 \\ 0 \\ -1 \\ -2 \\ -3 \\ -3.4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0 \\ 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4 \\ 5 \\ 6 \\ 7 \end{bmatrix}`);

});

test('Test excel file import with headers and units', async () => {
  await page.setLatex(0, String.raw`col1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\alpha_1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\sigma_{initial}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`col3=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_and_units.xlsx');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet File' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 3\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  \\ -20.3\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 7\left\lbrack s\right\rbrack  \\ 0\left\lbrack s\right\rbrack  \\ -1\left\lbrack s\right\rbrack  \\ -2\left\lbrack s\right\rbrack  \\ -3\left\lbrack s\right\rbrack  \\ -3.4\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\right\rbrack  \\ 1000\left\lbrack m\right\rbrack  \\ 2000\left\lbrack m\right\rbrack  \\ 3000\left\lbrack m\right\rbrack  \\ 4000\left\lbrack m\right\rbrack  \\ 5000\left\lbrack m\right\rbrack  \\ 6000\left\lbrack m\right\rbrack  \\ 7000\left\lbrack m\right\rbrack  \\ 8000\left\lbrack m\right\rbrack  \\ 9000\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack K\right\rbrack  \\ 5\left\lbrack K\right\rbrack  \\ 6\left\lbrack K\right\rbrack  \\ 7\left\lbrack K\right\rbrack  \end{bmatrix}`);

});

test('Test excel file without headers', async () => {
  await page.setLatex(0, String.raw`A=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`C=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`D=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`F=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/no_headers.xlsx');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet File' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1 \\ 0 \\ 3 \\ 1 \\ -20.3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9 \\ 8 \\ 7 \\ 0 \\ -1 \\ -2 \\ -3 \\ -3.4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0 \\ 1 \\ 2 \\ 3 \\ 4 \\ 5 \\ 6 \\ 7 \\ 8 \\ 9 \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4 \\ 5 \\ 6 \\ 7 \end{bmatrix}`);

});

test('Test csv file import with headers and units', async () => {
  await page.setLatex(0, String.raw`col1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(1, String.raw`B=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(2, String.raw`\alpha_1=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(3, String.raw`\sigma_{initial}=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(4, String.raw`col3=`);

  await page.locator('#add-math-cell').click();
  await page.setLatex(5, String.raw`G=`);

  await page.locator('#add-data-table-cell').click();

  page.once('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('./tests/spreadsheets/headers_and_units.csv');
  });

  await page.getByRole('button', { name: 'Import Spreadsheet File' }).click();

  await page.waitForSelector('text=Importing spreadsheet from file', {state: 'detached'});
  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent(`#result-value-0`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4.1\left\lbrack m\right\rbrack  \\ 0\left\lbrack m\right\rbrack  \\ 3\left\lbrack m\right\rbrack  \\ 1\left\lbrack m\right\rbrack  \\ -20.3\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-1`);
  expect(content).toBe(String.raw`\begin{bmatrix} 9\left\lbrack s\right\rbrack  \\ 8\left\lbrack s\right\rbrack  \\ 7\left\lbrack s\right\rbrack  \\ 0\left\lbrack s\right\rbrack  \\ -1\left\lbrack s\right\rbrack  \\ -2\left\lbrack s\right\rbrack  \\ -3\left\lbrack s\right\rbrack  \\ -3.4\left\lbrack s\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-2`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1.1\times 10^{30} \\ -1.2\times 10^{-30} \\ 0 \\ 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}`);

  content = await page.textContent(`#result-value-3`);
  expect(content).toBe(String.raw`\begin{bmatrix} 0\left\lbrack m\right\rbrack  \\ 1000\left\lbrack m\right\rbrack  \\ 2000\left\lbrack m\right\rbrack  \\ 3000\left\lbrack m\right\rbrack  \\ 4000\left\lbrack m\right\rbrack  \\ 5000\left\lbrack m\right\rbrack  \\ 6000\left\lbrack m\right\rbrack  \\ 7000\left\lbrack m\right\rbrack  \\ 8000\left\lbrack m\right\rbrack  \\ 9000\left\lbrack m\right\rbrack  \end{bmatrix}`);

  content = await page.textContent(`#result-value-4`);
  expect(content).toBe(String.raw`\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}`);

  content = await page.textContent(`#result-value-5`);
  expect(content).toBe(String.raw`\begin{bmatrix} 4\left\lbrack K\right\rbrack  \\ 5\left\lbrack K\right\rbrack  \\ 6\left\lbrack K\right\rbrack  \\ 7\left\lbrack K\right\rbrack  \end{bmatrix}`);

});
