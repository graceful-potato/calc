const OPERATORS = {
  "+": {
    fn: (x, y) => x + y,
    precedence: 2,
    associativity: "left"
  },
  "-": {
    fn: (x, y) => x - y,
    precedence: 2,
    associativity: "left"
  },
  "*": {
    fn: (x, y) => x * y,
    precedence: 3,
    associativity: "left"
  },
  "/": {
    fn: (x, y) => x / y,
    precedence: 3,
    associativity: "left"
  },
  "^": {
    fn: (x, y) => Math.pow(x, y),
    precedence: 4,
    associativity: "right"
  },
  "unaryMinus": {
    fn: (x) => x * -1,
    precedence: 5,
    associativity: "right"
  },
  "unaryPlus": {
    fn: (x) => x * 1,
    precedence: 5,
    associativity: "right"
  }
}

export default OPERATORS
