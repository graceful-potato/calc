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
      tokens.push(new Token('operator', value))
    } else if (value = str.scan(PARENTHESIS)) {
      tokens.push(new Token('parenthesis', value))
    } else {
      throw('error')
    }
  }
  return tokens
}

export default parser
