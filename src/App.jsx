import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [numberArray, setNumberArray] = useState('')
  const [singleNumber, setSingleNumber] = useState('')

  const parsedNumbers = numberArray
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((value) => Number(value))

  const handleSubmit = () => {
    window.alert(
      `Submitted array: ${parsedNumbers.length ? parsedNumbers.join(', ') : 'none'}\nSubmitted number: ${singleNumber || 'none'}`
    )
  }

  return (
    <>
      <section id="number-inputs">
        <div className="input-card">
          <h2>Number entry</h2>
          <p>Paste an array and enter a single value to preview them together.</p>

          <div className="form-row">
            <label htmlFor="array-input">Array of numbers</label>
            <textarea
              id="array-input"
              value={numberArray}
              onChange={(event) => setNumberArray(event.target.value)}
              placeholder="e.g. 3, 8, 15, 42"
              rows="4"
            />
          </div>

          <div className="form-row">
            <label htmlFor="single-input">Single number</label>
            <input
              id="single-input"
              type="number"
              value={singleNumber}
              onChange={(event) => setSingleNumber(event.target.value)}
              placeholder="e.g. 7"
            />
          </div>

          <div className="form-row button-row">
            <button type="button" className="submit-button" onClick={handleSubmit}>
              Submit data
            </button>
          </div>

          <div className="form-row summary">
            <strong>Parsed array:</strong>
            <span>{parsedNumbers.length ? parsedNumbers.join(', ') : 'No numbers entered yet'}</span>
          </div>

          <div className="form-row summary">
            <strong>Single value:</strong>
            <span>{singleNumber || 'No value entered yet'}</span>
          </div>
        </div>
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
