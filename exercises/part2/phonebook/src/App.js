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

  const onDeleteContact = (contactId) => {
    contacts
      .remove(contactId)
      .then(() => setAllContacts(allContacts.filter(c => c.id !== contactId)) )
  }

  function createNewContact(newContact) {
    contacts
      .create(newContact)
      .then(createdContact => setAllContacts(allContacts.concat(createdContact)))
    setNewName('')
    setNewPhoneNumber('')
  }

  function updateExistingContactIfAllowed(existingContact) {
    const question = `${existingContact.name} is already in the phonebook. Replace the old number with a new one?`
    if(window.confirm(question)){
      contacts
        .update(existingContact)
        .then(updatedContact => setAllContacts(allContacts.map(c => c.id === updatedContact.id ? updatedContact : c)) )
    }
  }

  const onAddContact = (event) => {
    event.preventDefault()
    const newContact = {name: newName, number: newPhoneNumber}
    const contactWithSameName = allContacts.find(c => c.name === newName)

    if (contactWithSameName) {
      updateExistingContactIfAllowed({... contactWithSameName, number: newPhoneNumber});
    } else {
      createNewContact(newContact);
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