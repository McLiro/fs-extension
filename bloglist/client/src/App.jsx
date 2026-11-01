import { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog'
import Home from './components/Home'
import Login from './components/Login'
import Create from './components/Create'
import ErrorBoundary from './components/ErrorBoundary'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { useNotificationActions } from './stores/useNotificationStore'
import { useBlogs, useBlogsActions } from './stores/useBlogsStore'
import { useUser, useUserActions } from './stores/useUserStore'

const App = () => {
  const blogs = useBlogs()
  const { setBlogs, addBlog, updateBlog, deleteBlog } = useBlogsActions()
  const currentUser = useUser()
  const { setUser } = useUserActions()
  const { notify } = useNotificationActions()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [setBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      notify('invalid credentials', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    blogService.setToken(null)
  }

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      addBlog(newBlog)
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added.`)
    } catch {
      notify('failed to create new blog', 'error')
    }
  }

  const handleLike = async (blog) => {
    const updated = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    })

    updateBlog(updated)
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return

    await blogService.remove(blog.id)
    deleteBlog(blog.id)
    notify(`removed ${blog.title}`)
  }

  return (
    <Router>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
        { currentUser && <Link to="/create">new blog</Link> }
        { currentUser ? <button onClick={handleLogout}>logout</button> : <Link to="/login">login</Link> }
      </div>
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={ <Home sortedBlogs={blogs} /> } />
          <Route path='/users' element={ <Users /> } />
          <Route path='/users/:id' element={ <User /> } />
          <Route path='/login' element={ <Login handleLogin={handleLogin} /> } />
          <Route path='/create' element={ <Create handleNewBlog={handleNewBlog}/> } />
          <Route path='/blogs/:id' element={ <Blog blogs={blogs} user={currentUser} handleLike={handleLike} handleDelete={handleDelete} /> } />
          <Route path='*' element={ <h2>404 Not Found</h2> } />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default App
