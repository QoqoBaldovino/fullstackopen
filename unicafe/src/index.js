import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBad = () => {
    setBad(bad + 1);
  }

  const handleMeh = () => {
    setNeutral(neutral + 1);
  }

  const handleGood = () => {
    setGood(good + 1);
  }

  const Feedback = (props) => {
    const {handleBad, handleMeh, handleGood} = props;

    return(<>
      <h1>Give Feedback</h1>
      <div>
        <button onClick={handleBad}>Bad</button>
        <button onClick={handleMeh}>Meh</button>
        <button onClick={handleGood}>Good</button>
      </div>
    </>)
  }

  const Statistics = (props) => {
    const {bad, neutral, good} = props;
    const total = good + neutral + bad;

    return (<>
      <p><b>Bad: </b>{bad}</p>
      <p><b>Neutral: </b>{neutral}</p>
      <p><b>Good: </b>{good}</p>
      <p><b>All: </b>{total}</p>
      <p><b>Average: </b>{(total / 3).toFixed(1)}</p>
      <p><b>Positive: </b>{Math.round((good * 100) / total)}%</p>
    </>)
  }

  return (
    <div>
      <Feedback 
        handleBad = {handleBad} 
        handleGood = {handleGood} 
        handleMeh = {handleMeh}/>

      <Statistics 
        bad = {bad}
        neutral = {neutral}
        good = {good}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)