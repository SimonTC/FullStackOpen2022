import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import { resetLoginInfo } from './loginReducer';
import { setTimedNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('bloglistUser', JSON.stringify(user));

      dispatch(setUser(user));
      dispatch(resetLoginInfo());
    } catch (e) {
      dispatch(
        setTimedNotification({ message: 'Wrong credentials', isError: true })
      );
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem('bloglistUser');
    dispatch(setUser(null));
  };
};

export const loadUserFromStorage = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('bloglistUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setUser(user));
    }
  };
};

export default userSlice.reducer;
