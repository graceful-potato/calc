import Token from '../src/token'
import { rpnExecutor, rpnConverter } from '../src/rpn'
import parser from '../src/parser'

describe("rpnExecutor", function() {
  const testData = {
    '1 2 +': new Token('number', 3),
    '4 10 +': new Token('number', 14),
    '1 2 3 + +': new Token('number', 6),
    '2 1 -': new Token('number', 1),
    '3 2 - 1 -': new Token('number', 0),
    '2 1 *': new Token('number', 2),
    '3 2 1 * *': new Token('number', 6),
    '4 2 /': new Token('number', 2),
    '16 4 / 2 /': new Token('number', 2),
    '1 2 3 * +': new Token('number', 7),
    '1 0 3 * +': new Token('number', 1),
    '2 10 ^': new Token('number', 1024)
  }

  it("returns correct result", function() {
    for (const expression in testData) {
      expect(rpnExecutor(parser(expression))).toEqual(testData[expression])
    }
  });
});

describe("rpnConverter", function() {
  const testData = {
    '1 + 2': parser('1 2 +'),
    '1 * 2': parser('1 2 *'),
    '3 + 2 - 1': parser('3 2 + 1 -'),
    '3 * 2 / 1': parser('3 2 * 1 /'),
    '1 + 2 * 3': parser('1 2 3 * +'),
    '(1 + 2) * 3': parser('1 2 + 3 *'),
    '9 - (1 + 2 + 3) * 4': parser('9 1 2 + 3 + 4 * -')
  }

  it("returns correct result", function() {
    for (const expression in testData) {
      expect(rpnConverter(parser(expression))).toEqual(testData[expression])
    }
  });
});
