import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setTimedNotification } from './notificationReducer';

const sorted = (blogs) => {
  const compareBlogs = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) return 1;
    if (blog1.likes > blog2.likes) return -1;
    return 0;
  };

  return blogs.sort(compareBlogs);
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return sorted(action.payload);
    },
    appendBlog(state, action) {
      return sorted([...state, action.payload]);
    },
    removeBlog(state, action) {
      return sorted(state.filter((b) => b.id !== action.payload.id));
    },
    updateBlog(state, action) {
      const changedBlog = action.payload;
      const id = changedBlog.id;
      return sorted(state.map((blog) => (blog.id !== id ? blog : changedBlog)));
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const loadAllBlogs = () => {
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
