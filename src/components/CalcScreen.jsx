function CalcScreen({ operand, result, onClear }) {
  return (
    <div className="screen text-white" onDoubleClick={onClear}>
      <div className="operand">{operand}</div>
      <div className="result">{result}</div>
    </div>
  )
}

export { CalcScreen }
