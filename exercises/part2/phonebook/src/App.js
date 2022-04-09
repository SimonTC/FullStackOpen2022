import {useEffect, useState} from 'react'
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import contacts from "./services/contacts";

const stringContainsAll = (stringToCheck, characters) => {
  const stringAsLowerCase = stringToCheck.toLowerCase()
  return [...characters]
    .every(c => stringAsLowerCase.includes(c.toLowerCase()))
}

const App = () => {
  const [allContacts, setAllContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    contacts
      .getAll()
      .then(allContacts => setAllContacts(allContacts))
  }, []);

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const contactsAreTheSame = (contact1, contact2) => {
    return contact1.name === contact2.name
  }

  const onDeleteContact = (contactId) => {
    contacts
      .remove(contactId)
      .then(() => setAllContacts(allContacts.filter(c => c.id !== contactId)) )
  }

  const onAddContact = (event) => {
    event.preventDefault()
    const newContact = {name: newName, number: newPhoneNumber}

    if (allContacts.some(p => contactsAreTheSame(p, newContact))) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      contacts
        .create(newContact)
        .then(createdContact => setAllContacts(allContacts.concat(createdContact)))
      setNewName('')
      setNewPhoneNumber('')
    }
  }
  
  const onFilterUpdated = (event) => {
    setFilterValue(event.target.value)
  }

  const contactsToShow = filterValue === ''
    ? allContacts
    : allContacts.filter(p => stringContainsAll(p.name, filterValue))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterValue={filterValue} onFilterUpdated={onFilterUpdated}/>
      <NewEntry
        newName={newName}
        onNameChange={onNameChange}
        number={newPhoneNumber}
        onPhoneNumberChange={onPhoneNumberChange}
        onAddContact={onAddContact}
      />
      <ContactList contacts={contactsToShow} onDeleteContact={onDeleteContact}/>
    </div>
  )
}

export default App