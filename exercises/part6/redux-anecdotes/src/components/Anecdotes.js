import {useDispatch, useSelector} from "react-redux";
import {increaseVoteFor} from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVoteClick }) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVoteClick}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (id) => {
    dispatch(increaseVoteFor(id))
  }

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVoteClick={() => vote(anecdote.id)}/>
      )}
    </ul>
  )
}

export default AnecdoteList