import Token from '../src/token'
import { rpnExecutor, rpnConverter } from '../src/rpn'
import parser from '../src/parser'

describe("rpnExecutor", function() {
  const testData = new Map([
    // 1 2 +
    [[
      new Token('number', 1),
      new Token('number', 2),
      new Token('operator', '+')
    ], new Token('number', 3)],
    // 16 4 / 2 /
    [[
      new Token('number', 16),
      new Token('number', 4),
      new Token('operator', '/'),
      new Token('number', 2),
      new Token('operator', '/')
    ], new Token('number', 2)],
    // 1 2 3 * +
    [[
      new Token('number', 1),
      new Token('number', 2),
      new Token('number', 3),
      new Token('operator', '*'),
      new Token('operator', '+')
    ], new Token('number', 7)],
    // 1 2 + 3 *
    [[
      new Token('number', 1),
      new Token('number', 2),
      new Token('operator', '+'),
      new Token('number', 3),
      new Token('operator', '*')
    ], new Token('number', 9)],
    // 5 unaryMinus 5 +
    [[
      new Token('number', 5),
      new Token('unaryOperator', 'unaryMinus'),
      new Token('number', 5),
      new Token('operator', '+')
    ], new Token('number', 0)]
  ])

  it("returns correct result", function() {
    for (const expression in testData) {
      expect(rpnExecutor(parser(expression))).toEqual(testData[expression])
    }
  });
});

describe("rpnConverter", function() {
  const testData = {
    '1 + 2': [
      new Token('number', 1),
      new Token('number', 2),
      new Token('operator', '+')
    ],
    '3 + 2 - 1': [
      new Token('number', 3),
      new Token('number', 2),
      new Token('operator', '+'),
      new Token('number', 1),
      new Token('operator', '-')
    ],
    '1 + 2 * 3': [
      new Token('number', 1),
      new Token('number', 2),
      new Token('number', 3),
      new Token('operator', '*'),
      new Token('operator', '+')
    ],
    '(1 + 2) * 3': [
      new Token('number', 1),
      new Token('number', 2),
      new Token('operator', '+'),
      new Token('number', 3),
      new Token('operator', '*')
    ],
    '-5 + 5': [
      new Token('number', 5),
      new Token('unaryOperator', 'unaryMinus'),
      new Token('number', 5),
      new Token('operator', '+')
    ]
  }

  it("returns correct result", function() {
    for (const expression in testData) {
      expect(rpnConverter(parser(expression))).toEqual(testData[expression])
    }
  });
});
