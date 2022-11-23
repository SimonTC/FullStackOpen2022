import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setPassword(state, action) {
      return { ...state, password: action.payload };
    },
    setUsername(state, action) {
      return { ...state, username: action.payload };
    },
    initialize(state, action) {
      return initialState;
    },
  },
});

const { setPassword, setUsername, initialize } = loginSlice.actions;

export const updateUsername = (username) => {
  return (dispatch) => {
    dispatch(setUsername(username));
  };
};

export const updatePassword = (password) => {
  return (dispatch) => {
    dispatch(setPassword(password));
  };
};

export const resetLoginInfo = () => {
  return (dispatch) => {
    dispatch(initialize());
  };
};

export default loginSlice.reducer;
