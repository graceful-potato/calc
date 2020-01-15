import { rpnExecutor, rpnConverter } from './rpn'
import parser from './parser'

const calc = (query) => {
  return rpnExecutor(rpnConverter(parser(query))).value
}

export default calc
