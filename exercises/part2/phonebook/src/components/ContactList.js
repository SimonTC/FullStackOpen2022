const Contact = ({contact}) => {
  return(
    <li>
      {contact.name} {contact.number}
    </li>
  )
}

const ContactList = ({contacts}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {contacts.map(p =>
          <Contact key={p.name} contact={p}/>
        )}
      </ul>
    </div>
  )
}

export default ContactList