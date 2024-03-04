import { test, expect } from '@playwright/test';
import { cot, pi, sqrt, tan, cos} from 'mathjs';

import { precision, loadPyodide, newSheet, parseLatexFloat } from './utility.mjs';

let page;

// loading pyodide takes a long time (especially in resource constrained CI environments)
// load page once and use for all tests in this file
test.beforeAll(async ({ browser }) => {page = await loadPyodide(browser, page);} );

// give each test a blank sheet to start with (this doesn't reload pyodide)
test.beforeEach(async () => newSheet(page));


test('test basic calculus', async () => {

  // test calculus
  await page.setLatex(0, String.raw`\int _{0}^{pi}\left(sin\left(t\right)\right)d\left(t\right)=`);  
  
  await page.click('#add-math-cell');
  await page.click('text=f(x)');
  await page.click(':nth-match(button:has-text("∫"), 2)');
  await page.type(':nth-match(math-field.editable, 2)', 'b');
  await page.press(':nth-match(math-field.editable, 2)', 'Tab');
  await page.type(':nth-match(math-field.editable, 2)', 'a');
  await page.press(':nth-match(math-field.editable, 2)', 'Tab');
  await page.type(':nth-match(math-field.editable, 2)', 's');
  await page.press(':nth-match(math-field.editable, 2)', 'Tab');
  await page.type(':nth-match(math-field.editable, 2)', 's');
  await page.press(':nth-match(math-field.editable, 2)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 2)', '=');

  await page.click('#add-math-cell');
  await page.setLatex(2, String.raw`\int _{-\frac{h}{2}}^{\frac{h}{2}}\left(\int _{-\frac{w}{2}}^{\frac{w}{2}}\left(y^{2}\right)\mathrm{d}\left(x\right)\right)\mathrm{d}\left(y\right)=\left[mm^{4}\right]`);
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 4)', 'h=30[mm]');
  await page.click('#add-math-cell');
  await page.type(':nth-match(math-field.editable, 5)', 'w=10[mm]');

  await page.click('#add-math-cell');
  await page.setLatex(5, String.raw`func=x^{3}\cdot y^{2}`);
  await page.click('#add-math-cell');
  await page.click('text=f(x)');
  await page.locator("span.ML__cmr >> text=′′").nth(0).click();
  await page.type(':nth-match(math-field.editable, 7)', 'x');
  await page.press(':nth-match(math-field.editable, 7)', 'Tab');
  await page.locator("span.ML__cmr >> text=′").nth(0).click();
  await page.type(':nth-match(math-field.editable, 7)', 'y');
  await page.press(':nth-match(math-field.editable, 7)', 'Tab');
  await page.type(':nth-match(math-field.editable, 7)', 'func');
  await page.press(':nth-match(math-field.editable, 7)', 'ArrowRight');
  await page.press(':nth-match(math-field.editable, 7)', 'ArrowRight');
  await page.type(':nth-match(math-field.editable, 7)', '=');

  await page.click('#add-math-cell');
  await page.setLatex(7, String.raw`\frac{d}{d\left(z\right)}\left(\frac{d^{2}}{d\left(r\right)^{2}}\left(3\cdot r^{2}\cdot z\right)\right)=`);
  
  await page.click('#add-math-cell');
  await page.setLatex(8, String.raw`position=20\left[\frac{m}{sec}\right]\cdot time`);

  await page.click('#add-math-cell');
  await page.setLatex(9, String.raw`velocity=\frac{\mathrm{d}}{\mathrm{d}\left(time\right)}\left(position\right)`);

  await page.click('#add-math-cell');
  await page.setLatex(10, String.raw`velocity=`);

  await page.click('#add-math-cell');
  await page.setLatex(11, String.raw`\int _{ }^{ }\left(1^{x}\right)\mathrm{d}\left(x\right)=`);

  await page.click('#add-math-cell');
  await page.setLatex(12, String.raw`\int _{-2}^{2}\left(x^{3}\cdot \cos\left(\frac{x}{2}\right)+\frac{1}{2}\cdot \sqrt{4-x^{2}}\right)\mathrm{d}\left(x\right)=`);

  await page.waitForSelector('text=Updating...', {state: 'detached'});

  let content = await page.textContent('#result-value-0');
  expect(parseLatexFloat(content)).toBeCloseTo(2, precision);
  content = await page.textContent('#result-value-1');
  expect(content).toBe(`- \\frac{a^{2}}{2} + \\frac{b^{2}}{2}`);
  content = await page.textContent('#result-value-2');
  expect(parseLatexFloat(content)).toBeCloseTo((10*30**3/12), precision);
  content = await page.textContent('#result-value-6');
  expect(content).toBe('12 x y');
  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(6, precision);
  content = await page.textContent('#result-value-10');
  expect(parseLatexFloat(content)).toBeCloseTo(20, precision);
  content = await page.textContent('#result-units-10');
  expect(content).toBe('m^1*s^-1');
  content = await page.textContent('#result-value-11');
  expect(content).toBe('x');
  content = await page.textContent('#result-value-12');
  expect(parseLatexFloat(content)).toBeCloseTo(pi, precision);
});


test('Test substitution of integration variable', async () => {

  await page.setLatex(0, String.raw`z_{1}=\int _{ }^{ }\left(x\right)\mathrm{d}\left(x\right)`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`z_{2}=\int _{0}^{x}\left(x\right)\mathrm{d}\left(x\right)`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`z_{3}=\int _{0}^{x}\left(x^{s+t}\right)\mathrm{d}\left(x\right)`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`s=2`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(4, String.raw`t=-1`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(5, String.raw`x=10`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(6, String.raw`z_{1}=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(7, String.raw`z_{2}=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(8, String.raw`z_{3}=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-6');
  expect(parseLatexFloat(content)).toBeCloseTo(50, precision);
  content = await page.textContent('#result-units-6');
  expect(content).toBe('');

  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(50, precision);
  content = await page.textContent('#result-units-7');
  expect(content).toBe('');

  content = await page.textContent('#result-value-8');
  expect(parseLatexFloat(content)).toBeCloseTo(50, precision);
  content = await page.textContent('#result-units-8');
  expect(content).toBe('');
});


test('Test substitution of differential variable', async () => {

  await page.setLatex(0, String.raw`z_{1}=\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(y^{2}\right)`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`y=x^{4}`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(2, String.raw`x=10`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(3, String.raw`z_{1}=`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(4, String.raw`z_{2}=\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(y^{s+t}\right)`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(5, String.raw`s=1`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(6, String.raw`t=1`);

  await page.keyboard.press('Shift+Enter');
  await page.setLatex(7, String.raw`z_{2}=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-3');
  expect(parseLatexFloat(content)).toBeCloseTo(80000000, precision);
  content = await page.textContent('#result-units-3');
  expect(content).toBe('');

  content = await page.textContent('#result-value-7');
  expect(parseLatexFloat(content)).toBeCloseTo(80000000, precision);
  content = await page.textContent('#result-units-7');
  expect(content).toBe('');
});


test('Test derivative substitution bug #156', async () => {

  await page.setLatex(0, String.raw`y=20\cdot x`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\frac{\mathrm{d}}{\mathrm{d}\left(x\right)}\left(x\cdot y\right)=`);

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(content).toBe('40 x');

});


test('Test integral substitution bug #244', async () => {

  await page.setLatex(0, String.raw`c=a\left(b=1\right)`);
  
  await page.keyboard.press('Shift+Enter');
  await page.setLatex(1, String.raw`\int_0^1\left(c\cdot x\right)\mathrm{d}\left(x\right)=`);

  await page.click('#add-piecewise-cell');

  await page.locator('#piecewise-parameter-2 math-field.editable').type('a');
  await page.locator('#piecewise-expression-2-0 math-field.editable').type('1');
  await page.locator('#piecewise-expression-2-1 math-field.editable').type('-1');
  await page.locator('#piecewise-condition-2-0 math-field.editable').type('b>=0');

  await page.waitForSelector('.status-footer', {state: 'detached'});

  let content = await page.textContent('#result-value-1');
  expect(parseLatexFloat(content)).toBeCloseTo(0.5, precision);

});