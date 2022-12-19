import { useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import { CreateNewBlogForm } from './components/CreateNewBlogForm';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, updateUsername } from './reducers/loginReducer';
import { loadUserFromStorage, login, logOut } from './reducers/userReducer';
import { addBlogEntry, loadAllBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    } else {
      blogService.removeToken();
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const handleLogOut = async (event) => {
    dispatch(logOut());
    window.location.reload();
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(updateUsername(target.value))}
            data-cy="login-username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => dispatch(updatePassword(target.value))}
            data-cy="login-password"
          />
        </div>
        <button type="submit" data-cy="login-submit">
          login
        </button>
      </form>
    </div>
  );

  const createNewBlog = () => (
    <Togglable buttonLabel="New blog">
      <CreateNewBlogForm
        handleBlogCreation={async (blogObject) => {
          dispatch(addBlogEntry(blogObject));
        }}
      />
    </Togglable>
  );

  const notesListAndEditing = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogOut()}>Log out</button>
      {createNewBlog()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  useEffect(() => {
    if (user) {
      dispatch(loadAllBlogs());
    }
  }, [user]);

  return (
    <div>
      {notification && <Notification {...notification} />}
      {user === null ? loginForm() : notesListAndEditing()}
    </div>
  );
};

export default App;
