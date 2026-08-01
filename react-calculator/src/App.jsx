import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForNewValue) {
      setDisplay(String(digit))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setWaitingForNewValue(false)
  }

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '÷': return b === 0 ? NaN : a / b
      default: return b
    }
  }

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display)

    if (prevValue === null) {
      setPrevValue(inputValue)
    } else if (operator) {
      const result = calculate(prevValue, inputValue, operator)
      setDisplay(String(result))
      setPrevValue(result)
    }

    setWaitingForNewValue(true)
    setOperator(nextOperator)
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)
    if (prevValue !== null && operator) {
      const result = calculate(prevValue, inputValue, operator)
      setDisplay(String(result))
      setPrevValue(null)
      setOperator(null)
      setWaitingForNewValue(true)
    }
  }

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1))
  }

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const buttons = [
    { label: 'C', action: clear, className: 'function' },
    { label: '±', action: toggleSign, className: 'function' },
    { label: '%', action: percentage, className: 'function' },
    { label: '÷', action: () => performOperation('÷'), className: 'operator' },
    { label: '7', action: () => inputDigit(7), className: 'digit' },
    { label: '8', action: () => inputDigit(8), className: 'digit' },
    { label: '9', action: () => inputDigit(9), className: 'digit' },
    { label: '×', action: () => performOperation('×'), className: 'operator' },
    { label: '4', action: () => inputDigit(4), className: 'digit' },
    { label: '5', action: () => inputDigit(5), className: 'digit' },
    { label: '6', action: () => inputDigit(6), className: 'digit' },
    { label: '-', action: () => performOperation('-'), className: 'operator' },
    { label: '1', action: () => inputDigit(1), className: 'digit' },
    { label: '2', action: () => inputDigit(2), className: 'digit' },
    { label: '3', action: () => inputDigit(3), className: 'digit' },
    { label: '+', action: () => performOperation('+'), className: 'operator' },
    { label: '0', action: () => inputDigit(0), className: 'digit zero' },
    { label: '.', action: inputDecimal, className: 'digit' },
    { label: '=', action: handleEquals, className: 'operator' },
  ]

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            className={btn.className}
            onClick={btn.action}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
