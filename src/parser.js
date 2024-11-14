import { StringScanner } from 'strscan';
import Token from './token'

const parser = (query) => {
  const NUMBER = /(\d+(\.\d+)?)/
  const OPERATOR = /[+\-*/^]/
  const PARENTHESIS = /[()]/
  const SEPARATOR = /\s/

  const tokens = []
  const str = new StringScanner(query)

  let value

  while (!str.hasTerminated()) {
    str.scan(SEPARATOR)

    if (value = str.scan(NUMBER)) {
      tokens.push(new Token('number', Number(value)))
    } else if (value = str.scan(OPERATOR)) {
      const lastToken = tokens[tokens.length - 1]

      if ((value == '+' || value == '-') && (!lastToken || (lastToken.value != ')' && lastToken.type != 'number'))) {
        const op = value == '-' ? "unaryMinus" : "unaryPlus"
        tokens.push(new Token('unaryOperator', op))
      } else {
        tokens.push(new Token('operator', value))
      }
    } else if (value = str.scan(PARENTHESIS)) {
      tokens.push(new Token('parenthesis', value))
    } else {
      throw('error')
    }
  }
  return tokens
}

export default parser
