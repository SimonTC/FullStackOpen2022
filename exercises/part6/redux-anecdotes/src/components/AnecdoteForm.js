import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You added the anecdote '${anecdote}'`))
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

export default AnecdoteForm