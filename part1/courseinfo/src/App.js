function Header(props) {
  return <h1>{props.course}</h1>;
}

function Total(props) {
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
}

function Part(props) {
  return <p> {props.name} {props.numExercises} </p>;
}

function Content(props) {
  return (
    <>
      <Part name={props.parts[0].name} numExercises={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} numExercises={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} numExercises={props.parts[2].exercises}/>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

export default App