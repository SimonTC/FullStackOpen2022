import {createSlice} from "@reduxjs/toolkit";

const initialNotification = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotification,
  reducers: {
    addNotification(state, action){
      return action.payload
    },
    removeNotification(state, action){
      return state === action.payload ? null : state
    }
  }
})

const {addNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (notification, timeout=5000) => (dispatch) => {
  dispatch(addNotification(notification))
  setTimeout(() => dispatch(removeNotification(notification)), timeout)
}