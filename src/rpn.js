import OPERATORS from './operators'
import Token from './token'

const rpnExecutor = (tokens) => {
  const stack = []

  tokens.forEach((token) => {
    if (token.isNumber()) {
      stack.push(token)
    } else {
      const second = stack.pop()
      const first = stack.pop()

      stack.push(new Token('number', OPERATORS[token.value].fn(first.value, second.value)))
    }
  })

  if (stack.length > 1) {
    console.log("invalid rpn expression")
  }

  return stack.pop()
}

const rpnConverter = (tokens) => {
  const output = []
  const stack = []

  tokens.forEach((token) => {
    if (token.isNumber()) {
      output.push(token)
    } else if (token.type == 'operator') {
      const lastStackElement = stack[stack.length - 1]
      const currOp = OPERATORS[token.value]
      let lastOp = lastStackElement && OPERATORS[lastStackElement.value]
      
      while (lastOp && ((currOp.associativity === 'left' && currOp.precedence <= lastOp.precedence) || (currOp.associativity === 'right' && currOp.precedence < lastOp.precedence))) {
        output.push(stack.pop())
        lastOp = stack[stack.length - 1]
      }
      stack.push(token)
    } else if (token.isLeft()) {
      stack.push(token)
    } else if (token.isRight()) {
      let stack_token = stack.pop()
      while (!stack_token.isLeft()) {
        output.push(stack_token)
        stack_token = stack.pop()
      }
    } else {
      console.log("something wrong")
    }
  })

  while (stack.length > 0) {
    output.push(stack.pop())
  }

  return output
}

export { rpnExecutor, rpnConverter }
