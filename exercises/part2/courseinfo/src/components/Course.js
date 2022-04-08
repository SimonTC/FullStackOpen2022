
const CourseHeader = ({course}) => <h2>{course}</h2>

const Total = ({parts}) => {
  const sum = parts.map(part => part.exercises).reduce((total, i) => total + i)
  return <p>Total of {sum} exercises</p>
}

const Part = ({part}) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({parts}) =>
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </>

const Course = ({course}) => {
  return (
    <div>
      <CourseHeader course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course