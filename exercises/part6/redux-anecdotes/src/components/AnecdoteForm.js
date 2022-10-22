import {createAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";
import {connect} from "react-redux";

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`You added the anecdote '${anecdote}'`)
  }

  return (
    <div>
      <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote"/>
          <button type="submit">create</button>
        </form>
      </>
    </div>
  );
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)