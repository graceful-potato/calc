import calc from '../src'

describe("rpnExecutor", function() {
  const testData = {
    '1 + 2': 3,
    '3 + 2 - 1': 4,
    '1 * 2': 2,
    '3 * 2 / 2': 3,
    '1 + 2 * 3': 7,
    '(1 + 2) * 3': 9,
    '9 - (1 + 2 + 3) * 4': -15,
    '2 ^ 2 ^ 2': 16
  }

  it("returns correct result", function() {
    for (const expression in testData) {
      expect(calc(expression)).toEqual(testData[expression])
    }
  });
});
