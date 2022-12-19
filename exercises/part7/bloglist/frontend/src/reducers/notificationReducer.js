import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const {setNotification, removeNotification} = notificationSlice.actions

export const setTimedNotification = (notification) => {
  return dispatch => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }
};

export default notificationSlice.reducer