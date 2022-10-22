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
      return null
    }
  }
})

const {addNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (notification) => (dispatch) => {
  dispatch(addNotification(notification))
  setTimeout(() => dispatch(removeNotification()), 5000)
}