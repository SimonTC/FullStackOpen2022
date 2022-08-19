const NoteForm = (props) => {
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={props.onSubmit}>
        <input
          value={props.value}
          onChange={props.handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm