import {useEffect, useState} from 'react'
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import contacts from "./services/contacts";
import Notification from "./components/Notification";

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
  const [notification, setNotification] = useState(null);

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

  const onDeleteContact = (contact) => {
    contacts
      .remove(contact.id)
      .then(() => {
        setAllContacts(allContacts.filter(c => c.id !== contact.id))
        showNotification(`Deleted ${contact.name}`, false)
      } )
  }

  const showNotification = (message, isError) => {
    setNotification({message: message, isError: isError})
    setTimeout(() =>setNotification(null), 5000)
  }

  function createNewContact(newContact) {
    contacts
      .create(newContact)
      .then(createdContact => {
        setAllContacts(allContacts.concat(createdContact))
        showNotification(`Added ${newContact.name}`, false)
      })
      .catch(error => {
        showNotification(error.response.data.error, true)
      })
    setNewName('')
    setNewPhoneNumber('')
  }

  function updateExistingContactIfAllowed(existingContact) {
    const question = `${existingContact.name} is already in the phonebook. Replace the old number with a new one?`
    if(window.confirm(question)){
      contacts
        .update(existingContact)
        .then(updatedContact => {
          setAllContacts(allContacts.map(c => c.id === updatedContact.id ? updatedContact : c))
          showNotification(`Updated ${updatedContact.name}`, false)
        })
        .catch((error) => {
          showNotification(error.response.data.error, true)
          setAllContacts(allContacts.filter(c => c.id !== existingContact.id))
        })
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
      <Notification notification={notification}/>
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