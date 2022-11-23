import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    login: loginReducer,
  },
});

export default store;
