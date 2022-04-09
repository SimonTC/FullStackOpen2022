const InputWithLabel = ({onChange: onNameChange, value, labelText}) => {
  return <div>
    {labelText}: <input value={value} onChange={onNameChange}/>
  </div>;
}

const NewEntry = ({newName, number, onAddContact, onNameChange, onPhoneNumberChange}) => {
  return (
    <div>
      <h2>Add new contact</h2>
      <form>
        <InputWithLabel labelText="name" value={newName} onChange={onNameChange}/>
        <InputWithLabel labelText="number" value={number} onChange={onPhoneNumberChange}/>
        <div>
          <button type="submit" onClick={onAddContact}>add</button>
        </div>
      </form>
    </div>
  );
}

export default NewEntry