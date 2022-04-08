import {useEffect, useState} from 'react'
import axios from "axios";

const InputWithLabel = ({onChange: onNameChange, value, labelText}) => {
  return <div>
    {labelText}: <input value={value} onChange={onNameChange}/>
  </div>;
}

const Person = ({person}) => {
  return(
    <li>
      {person.name} {person.number}
    </li>
  )
}

const Filter = ({filterValue, onFilterUpdated}) => {
  return <div>Only show people with <input value={filterValue} onChange={onFilterUpdated}/> in their name</div>
}

const NewEntry = ({newName, number, onAddPerson, onNameChange, onPhoneNumberChange}) => {
  return (
    <div>
      <h2>Add new person</h2>
      <form>
        <InputWithLabel labelText="name" value={newName} onChange={onNameChange}/>
        <InputWithLabel labelText="number" value={number} onChange={onPhoneNumberChange}/>
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

const stringContainsAll = (stringToCheck, characters) => {
  const stringAsLowerCase = stringToCheck.toLowerCase()
  return [...characters]
    .every(c => stringAsLowerCase.includes(c.toLowerCase()))
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, []);

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
    const newPerson = {name: newName, number: newPhoneNumber}

    if (persons.some(p => personsAreTheSame(p, newPerson))) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhoneNumber('')
    }
  }
  
  const onFilterUpdated = (event) => {
    setFilterValue(event.target.value)
  }

  const personsToShow = filterValue === ''
    ? persons
    : persons.filter(p => stringContainsAll(p.name, filterValue))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterValue={filterValue} onFilterUpdated={onFilterUpdated}/>
      <NewEntry
        newName={newName}
        onNameChange={onNameChange}
        number={newPhoneNumber}
        onPhoneNumberChange={onPhoneNumberChange}
        onAddPerson={onAddPerson}
      />
      <PersonList persons={personsToShow}/>
    </div>
  )
}

export default App