import { useState } from 'react'

const Button = ({handleOnClick, text}) =>
  (
    <button onClick={handleOnClick}>
      {text}
    </button>
  )

const Header = ({text}) => <h1>{text}</h1>

const Feedback = ({handleGood, handleNeutral, handleBad}) => {

  return(
    <>
      <Header text='give feedback'/>
      <Button handleOnClick={handleGood} text='good'/>
      <Button handleOnClick={handleNeutral} text='neutral'/>
      <Button handleOnClick={handleBad} text='bad'/>
    </>
  )
}

const StatisticItem = ({text, value}) => (
  <>
    <p>{text} {value}</p>
  </>
)

const Statistics = ({goodCount, neutralCount, badCount}) => {
  return(
    <>
      <Header text='statistics'/>
      <StatisticItem text='good' value={goodCount}/>
      <StatisticItem text='neutral' value={neutralCount}/>
      <StatisticItem text='bad' value={badCount}/>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Feedback handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad}/>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad}/>
    </div>
  )
}

export default App