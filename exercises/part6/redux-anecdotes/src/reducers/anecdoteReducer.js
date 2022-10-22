import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const sorted = anecdotes => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes )
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action){
      return sorted(action.payload)
    },
    appendAnecdote(state,action){
      return sorted ([...state, action.payload])
    },
    updateAnecdote(state, action){
      const changedAnecdote = action.payload
      const id = changedAnecdote.id
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote);
      return sorted(newState)
    }
  }
})

export const {setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

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

export const increaseVoteFor = anecdote => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer