import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import { resetLoginInfo } from './loginReducer';
import { setTimedNotification } from './notificationReducer';

const initialState = {
  activeUser: null,
  allUsers: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setActiveUser(state, action) {
      return { ...state, activeUser: action.payload };
    },
    setUsers(state, action) {
      return { ...state, allUsers: action.payload };
    },
  },
});

const { setActiveUser, setUsers } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('bloglistUser', JSON.stringify(user));

      dispatch(setActiveUser(user));
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
    dispatch(setActiveUser(null));
  };
};

export const loadUserFromStorage = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('bloglistUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setActiveUser(user));
    }
  };
};

export default userSlice.reducer;
