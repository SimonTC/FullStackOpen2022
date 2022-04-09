import {useEffect, useState} from 'react'
import PersonList from "./components/PersonList";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import contacts from "./services/contacts";

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
    contacts
      .getAll()
      .then(allContacts => setPersons(allContacts))
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
      contacts
        .create(newPerson)
        .then(createdContact => setPersons(persons.concat(createdContact)))
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