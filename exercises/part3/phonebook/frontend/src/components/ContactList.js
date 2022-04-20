const requestContactDeletionOnConfirmation = (contact, onDeleteContact) => {
  const deleteContact = window.confirm(`Delete ${contact.name}?`)
  if (deleteContact){
    onDeleteContact(contact)
  }
}

const Contact = ({contact, onDeleteContact}) => {
  return(
    <li>
      {contact.name} {contact.number} <button onClick={() => requestContactDeletionOnConfirmation(contact, onDeleteContact)}>Delete</button>
    </li>
  )
}

const ContactList = ({contacts, onDeleteContact}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {contacts.map(p =>
          <Contact key={p.name} contact={p} onDeleteContact={onDeleteContact}/>
        )}
      </ul>
    </div>
  )
}

export default ContactList