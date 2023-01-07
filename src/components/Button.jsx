import { useState, useEffect } from 'react'

function Button({ data, onNumber, onOperator, onOption }) {
  const { value, isOption, isNumber, isOperator } = data
  const spanTwo = value === '0' ? 'col-span-2 w-full' : ''
  const [bg, setBg] = useState('bg-white/20')
  const [color, setColor] = useState('text-white')

  useEffect(() => {
    if (isOperator) return setBg('bg-[#faa307]')

    if (isOption) {
      setBg('bg-gray-300')
      setColor('text-black')
    }
  }, [])

  const onClick = (isNumber, isOperator, isOption, value) => {
    onNumber(isNumber, value)
    onOperator(isOperator, value)
    onOption(isOption, value)
  }

  return (
    <button
      className={`button ${spanTwo} ${bg} ${color}`}
      onClick={() => onClick(isNumber, isOperator, isOption, value)}
    >
      {value}
    </button>
  )
}

export { Button }
