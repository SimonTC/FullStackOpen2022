import { useState } from 'react'
import * as PropTypes from "prop-types";

const InputWithLabel = ({onChange: onNameChange, value, labelText}) => {
  return <div>
    {labelText}: <input value={value} onChange={onNameChange}/>
  </div>;
}

const Person = ({person}) => {
  return(
    <li>
      {person.name} {person.phoneNumber}
    </li>
  )
}

const NewEntry = ({newName, newPhoneNumber, onAddPerson, onNameChange, onPhoneNumberChange}) => {
  return (
    <div>
      <h2>Add new person</h2>
      <form>
        <InputWithLabel labelText="name" value={newName} onChange={onNameChange}/>
        <InputWithLabel labelText="number" value={newPhoneNumber} onChange={onPhoneNumberChange}/>
        <div>
          <button type="submit" onClick={onAddPerson}>add</button>
        </div>
      </form>
    </div>
  );
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

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', phoneNumber: '040-1234567'}
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

    if (persons.some(p => personsAreTheSame(p, newPerson))) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <NewEntry
        newName={newName}
        onNameChange={onNameChange}
        newPhoneNumber={newPhoneNumber}
        onPhoneNumberChange={onPhoneNumberChange}
        onAddPerson={onAddPerson}
      />
      <PersonList persons={persons}/>
    </div>
  )
}

export default App