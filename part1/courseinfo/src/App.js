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
      <Part name={props.part1.name} numExercises={props.part1.exercises}/>
      <Part name={props.part2.name} numExercises={props.part2.exercises}/>
      <Part name={props.part3.name} numExercises={props.part3.exercises}/>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course}/>
      <Content part1 = {part1} part2 = {part2} part3 = {part3}/>
      <Total totalNumberOfExercises = {part1.exercises + part2.exercises + part3.exercises}/>
    </>
  )
}

export default App