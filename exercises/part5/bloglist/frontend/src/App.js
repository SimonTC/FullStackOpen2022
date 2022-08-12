import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('bloglistUser')
    if (loggedInUserJSON){
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setTimedNotification = notification => {
    setNotification(notification)
    setTimeout(() =>{
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'bloglistUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setPassword('')
      setUsername('')
    } catch (e) {
      setTimedNotification({message: 'Wrong credentials', isError: true})
    }
  }

  const handleBlogDataChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const addBlogEntry = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const createdBlog = await blogService.createNew(blogObject)
    setBlogs(blogs.concat(createdBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

    setTimedNotification({message: `A new blog post titled "${createdBlog.title}" by ${createdBlog.author} added`, isError: false})
  }

  const handleLogOut = async (event) => {
    window.localStorage.removeItem('bloglistUser')
    blogService.removeToken()
    window.location.reload()
  }

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
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const createNewBlog = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlogEntry}>
        <div>
          Title:
          <input
            value={title}
            name="Title"
            onChange={handleBlogDataChange(setTitle)}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            name="Author"
            onChange={handleBlogDataChange(setAuthor)}
          />
        </div>
        <div>
          Url:
          <input
            value={url}
            name="Url"
            onChange={handleBlogDataChange(setUrl)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )

  const notesListAndEditing = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogOut()}>Log out</button>
      {createNewBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    if(user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

  return (
    <div>
      {notification && <Notification {...notification} />}
      {user === null
        ? loginForm()
        : notesListAndEditing()
      }
    </div>
  )
}

export default App
