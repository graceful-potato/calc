import Token from '../src/token'
import parser from '../src/parser'

describe("rpnExecutor", function() {
  const testData = {
    '20.1 + 30': [
      new Token('number', 20.1),
      new Token('operator', '+'),
      new Token('number', 30)
    ],
    '-30': [
      new Token('unaryOperator', 'unaryMinus'),
      new Token('number', 30)
    ],
    '+10': [
      new Token('unaryOperator', 'unaryPlus'),
      new Token('number', 10)
    ],
    '12.32 - 0.32': [
      new Token('number', 12.32),
      new Token('operator', '-'),
      new Token('number', 0.32)
    ],
    '-5 + 5': [
      new Token('unaryOperator', 'unaryMinus'),
      new Token('number', 5),
      new Token('operator', '+'),
      new Token('number', 5)
    ],
    '2.5 * 20': [
      new Token('number', 2.5),
      new Token('operator', '*'),
      new Token('number', 20)
    ],
    '16 / 3.3': [
      new Token('number', 16),
      new Token('operator', '/'),
      new Token('number', 3.3)
    ],
    '(1 + 3) * 2': [
      new Token('parenthesis', '('),
      new Token('number', 1),
      new Token('operator', '+'),
      new Token('number', 3),
      new Token('parenthesis', ')'),
      new Token('operator', '*'),
      new Token('number', 2)
    ]
  }

  it("returns correct result", function() {
    for (const expression in testData) {
      expect(parser(expression)).toEqual(testData[expression])
    }
  });
});
