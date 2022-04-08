import { useState } from 'react'

const InputWithLabel = ({onChange, value, labelText}) => {
  return <div>
    {labelText}: <input value={value} onChange={onChange}/>
  </div>;
}

const Person = ({person}) => {
  return(
    <li>
      {person.name} {person.phoneNumber}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const personsAreTheSame = (person1, person2) => {
    return person1.name === person2.name
  }

  const onAddPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, phoneNumber: newPhoneNumber}

    if (persons.some(p => personsAreTheSame(p, newPerson ))){
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <InputWithLabel labelText='name' value={newName} onChange={onNameChange}/>
        <InputWithLabel labelText='number' value={newPhoneNumber} onChange={onPhoneNumberChange}/>
        <div>
          <button type="submit" onClick={onAddPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p =>
          <Person key={p.name} person={p}/>
        )}
      </ul>
    </div>
  )
}

export default App