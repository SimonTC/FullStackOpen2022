import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import {CreateNewBlogForm} from "./components/CreateNewBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

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

  const addBlogEntry = async (blogObject) => {
    const createdBlog = await blogService.createNew(blogObject)
    setBlogs(blogs.concat(createdBlog))

    setTimedNotification({message: `A new blog post titled "${createdBlog.title}" by ${createdBlog.author} added`, isError: false})
  }

  const handleLogOut = async (event) => {
    window.localStorage.removeItem('bloglistUser')
    blogService.removeToken()
    window.location.reload()
  }

  const handleBlogDeletion = async (blog) => {
    await blogService.deleteBlog(blog)
    setBlogs(blogs.filter(b => b !== blog))
  }

  const addLikeFor = async (blog) => {
    const updatedBlog = await blogService.update(blog)
    const newBlogs = blogs.map(b => {
      if (b.id === blog.id){
        return updatedBlog
      }
      return b
    })
    setBlogs(newBlogs)
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
    <Togglable buttonLabel="New blog">
      <CreateNewBlogForm handleBlogCreation={addBlogEntry}/>
    </Togglable>
  )

  const compareBlogs = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) return 1
    if (blog1.likes > blog2.likes) return -1
    return 0
  }

  const notesListAndEditing = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={() => handleLogOut()}>Log out</button>
      {createNewBlog()}
      {blogs.sort(compareBlogs).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeIncrease={addLikeFor}
          currentUser={user}
          handleBlogDeletion={handleBlogDeletion}
        />
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
