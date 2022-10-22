import {createSlice} from "@reduxjs/toolkit";

const sorted = anecdotes => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes )
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      state.push(action.payload)
    },
    increaseVoteFor(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote);
      return sorted(newState)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {createAnecdote,increaseVoteFor, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer