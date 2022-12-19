import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setTimedNotification } from './notificationReducer';

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
    removeBlog(state, action) {
      return state.filter((b) => b !== action.payload);
    },
    updateBlog(state, action) {
      const changedBlog = action.payload;
      const id = changedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlogEntry = (blogObject) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createNew(blogObject);
    dispatch(appendBlog(createdBlog));

    dispatch(
      setTimedNotification({
        message: `A new blog post titled "${createdBlog.title}" by ${createdBlog.author} added`,
        isError: false,
      })
    );
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog);
    dispatch(removeBlog(blog));
  };
};

export const addLikeFor = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog);
    dispatch(updateBlog(updatedBlog));
  };
};

export default blogSlice.reducer;
