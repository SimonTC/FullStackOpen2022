import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      const changedBlog = action.payload;
      const id = changedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
  },
});

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions;

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
