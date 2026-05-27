import { useState } from 'react'
import './App.css'

function App() {
  const [dataArrayStr, setDataArrayStr] = useState('')
  const [queryNumber, setQueryNumber] = useState('')

  const binary_search_path = '/api/searching/binary'

  const parsedNumbers = dataArrayStr
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((value) => Number(value))

  const getQueryIndexResponse = async (data) => {
    const response = await fetch(binary_search_path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch query index')
    }
    
    return response
  }

  const handleSubmit = () => {
    if (dataArrayStr.trim() === '') {
      window.alert('Please enter at least one number in the array.')
      return
    }

    if (queryNumber === '') {
      window.alert('Please enter a single number to search for.')
      return
    }

    const data = {
      data: dataArrayStr,
      query: parseInt(queryNumber)
    }

    getQueryIndexResponse(data)
      .then((response) => response.json())
      .then((queryIndexResponse) => {
        window.alert(
          `Server response for query index:\n\n${JSON.stringify(queryIndexResponse, null, 2)}`
        )
      })
      .catch((error) => {
        console.error('Error fetching query index:', error)
        window.alert('An error occurred while fetching the query index. Please check the console for details.')
      })
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
              value={dataArrayStr}
              onChange={(event) => setDataArrayStr(event.target.value)}
              placeholder="e.g. 3, 8, 15, 42"
              rows="4"
            />
          </div>

          <div className="form-row">
            <label htmlFor="single-input">Single number</label>
            <input
              id="single-input"
              type="number"
              value={queryNumber}
              onChange={(event) => setQueryNumber(event.target.value)}
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
            <span>{queryNumber || 'No value entered yet'}</span>
          </div>
        </div>
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
