class Token {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  isNumber() {
    return this.type === 'number'
  }

  isLeft() {
    return this.value === '('
  }

  isRight() {
    return this.value === ')'
  }
}

export default Token
