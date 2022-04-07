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

const StatisticLine = ({text, value, textAfterValue}) => {
  let valueCellText = value

  if(textAfterValue){
    valueCellText = value + ' ' + textAfterValue
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{valueCellText}</td>
    </tr>
  )
}

const Statistics = ({goodCount, neutralCount, badCount}) => {
  const totalScore = goodCount - badCount
  const totalVotes = goodCount + neutralCount + badCount;
  const avgScore = totalScore / totalVotes;
  const shareOfPositiveVotes = goodCount / totalVotes

  let statisticsBody

  if(totalVotes === 0){
    statisticsBody = <p>No feedback given</p>
  } else {
    statisticsBody = (
      <table>
        <StatisticLine text='good' value={goodCount}/>
        <StatisticLine text='neutral' value={neutralCount}/>
        <StatisticLine text='bad' value={badCount}/>
        <StatisticLine text='average' value={avgScore}/>
        <StatisticLine text='positive' value={shareOfPositiveVotes} textAfterValue='%'/>
      </table>
    )
  }

  return(
    <>
      <Header text='statistics'/>
      {statisticsBody}
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