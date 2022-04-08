const InputWithLabel = ({onChange: onNameChange, value, labelText}) => {
  return <div>
    {labelText}: <input value={value} onChange={onNameChange}/>
  </div>;
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

export default NewEntry