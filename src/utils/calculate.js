const int = (string) => {
  return parseFloat(string)
}

const string = (val) => {
  return val.toString()
}

const calculate = (first, second, operator) => {
  let f = int(first)
  let s = int(second)
  let result

  if (operator === '+') {
    result = f + s
  } else if (operator === '-') {
    result = f - s
  } else if (operator === 'x') {
    result = f * s
  } else if (operator === '/') {
    result = f / s
  }

  return result
}

export { calculate, int, string }
