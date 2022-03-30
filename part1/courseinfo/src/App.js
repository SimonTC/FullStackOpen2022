function Header(props) {
  return <h1>{props.course}</h1>;
}

function Total(props) {
  return <p>Number of exercises {props.totalNumberOfExercises}</p>
}

function Part(props) {
  return <p> {props.name} {props.numExercises} </p>;
}

function Content(props) {
  return (
    <>
      <Part name={props.part1} numExercises={props.exercises1}/>
      <Part name={props.part2} numExercises={props.exercises2}/>
      <Part name={props.part3} numExercises={props.exercises3}/>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content part1 = {part1} exercises1 = {exercises1} part2 = {part2} exercises2 = {exercises2} part3 = {part3} exercises3 = {exercises3}/>
      <Total totalNumberOfExercises = {exercises1 + exercises2 + exercises3}/>
    </>
  )
}

export default App