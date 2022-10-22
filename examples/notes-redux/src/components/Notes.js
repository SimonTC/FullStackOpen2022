import {connect, useDispatch, useSelector} from "react-redux";
import {toggleImportanceOf} from "../reducers/noteReducer";

const Note = ({note, handleClick}) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = (props) => {
  const dispatch = useDispatch()

  const notesToShow = () => {
    const filter = props.filter
    const notes = props.notes

    if (filter === 'ALL'){
      return notes
    }

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  }

  return(
    <ul>
      {notesToShow().map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return{
    notes: state.notes,
    filter: state.filter,
  }
}

const ConnectedNotes = connect(mapStateToProps)(Notes)

export default ConnectedNotes