const Person = ({person}) => {
  return(
    <li>
      {person.name} {person.number}
    </li>
  )
}

const PersonList = ({persons}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p =>
          <Person key={p.name} person={p}/>
        )}
      </ul>
    </div>
  )
}

export default PersonList