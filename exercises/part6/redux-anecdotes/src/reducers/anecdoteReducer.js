import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const sorted = anecdotes => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes )
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
      return sorted(action.payload)
    },
    appendAnecdote(state,action){
      return sorted ([...state, action.payload])
    }
  }
})

export const {increaseVoteFor, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer