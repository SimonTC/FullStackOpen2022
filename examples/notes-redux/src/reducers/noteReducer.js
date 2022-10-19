export const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE'){
    state.push(action.data)
    return state
    // return state.concat(action.data)
  }

  return state
}