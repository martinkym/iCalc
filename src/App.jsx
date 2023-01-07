import { useState } from 'react'
import { CalcScreen } from './components/CalcScreen'
import { Button } from './components/Button'
import { Frame } from './components/Frame'
import { calculate, int, string } from './utils/calculate'
import data from './data/data.json'

function App() {
  const [calcData] = useState(data)
  const [operand, setOperand] = useState('')
  const [result, setResult] = useState('0')
  const [operator, setOperator] = useState('')
  const [isComma, setIsComma] = useState(false)

  const onNumber = (isNumber, value) => {
    if (!isNumber) return
    if (result.length >= 9) return

    setResult((prev) => {
      if (prev === '0' && value === '0') return '0'

      if (prev === '0') return value

      if (operator === '=') {
        setOperator('')
        if (value === '0') return '0'
        return value
      }

      return prev + value
    })
  }

  const onOperator = (isOperator, value) => {
    if (!isOperator) return

    setIsComma(false)
    setOperator(value)

    if (value !== '=') {
      if (!operand) {
        setOperand(result)
        setResult('0')
        return
      }

      setOperand(calculate(operand, result, operator))
      setResult('0')
    } else {
      if (!operand) return
      setOperand('')

      const res = calculate(operand, result, operator)
      if (string(res).length < 10) {
        setResult(string(res))
      } else {
        setResult(res.toPrecision(2))
      }
    }
  }

  const onOption = (isOption, value) => {
    if (!isOption) return

    if (value === 'AC') {
      setIsComma(false)
      setOperator('')
      setOperand('')
      setResult('0')
      return
    }

    if (value === '+|-') {
      setOperator('')
      setResult((prev) => string(int(prev) * -1))
      return
    }

    if (value === '%') {
      return setResult((prev) => string(int(prev) / 100))
    }

    if (value === ',') {
      if (isComma) return
      setResult((prev) => prev + '.')
      setIsComma(true)
    }
  }

  const onClear = () => {
    if (result === 0) return

    let res = ''
    let arr = [...result]
    arr.pop()

    if (arr.length === 0) {
      return setResult('0')
    }

    for (let x of arr) {
      res += x
    }

    setResult(res)
  }

  const toScreen = { operand, result, onClear }

  return (
    <Frame>
      <CalcScreen {...toScreen} />

      {calcData.map((data) => {
        const toButton = {
          data,
          onNumber,
          onOperator,
          onOption,
        }
        return <Button key={data._id} {...toButton} />
      })}
    </Frame>
  )
}

export { App }
