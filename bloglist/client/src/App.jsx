import { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  BrowserRouter as Router,
  Routes, Route, Link as RouterLink
} from 'react-router-dom'
import {
  AppBar,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
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
import { useUser, getUser, saveUser, removeUser } from './services/persistentUser'

const App = () => {
  const blogs = useBlogs()
  const { setBlogs, addBlog, updateBlog, deleteBlog } = useBlogsActions()
  const currentUser = useUser()
  const { notify } = useNotificationActions()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [setBlogs])

  useEffect(() => {
    getUser()
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      saveUser(user)
    } catch {
      notify('invalid credentials', 'error')
    }
  }

  const handleLogout = () => {
    removeUser()

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

  const handleComment = async (blog, comment) => {
    try {
      const updatedBlog = await blogService.comment(blog.id, comment)
      updateBlog(updatedBlog)
      return updatedBlog
    } catch {
      notify('failed to add comment', 'error')
      return null
    }
  }

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) return

    await blogService.remove(blog.id)
    deleteBlog(blog.id)
    notify(`removed ${blog.title}`)
  }

  return (
    <Router>
      <Container maxWidth="md">
        <AppBar position="static" elevation={0} sx={{ mb: 2, bgcolor: '#1976d2' }}>
          <Toolbar disableGutters>
            <Stack direction="row" spacing={2} alignitems="center">
              <Button component={RouterLink} to="/" sx={{ color: 'white', textTransform: 'none' }}>blogs</Button>
              <Button component={RouterLink} to="/users" sx={{ color: 'white', textTransform: 'none' }}>users</Button>
              { currentUser && <Button component={RouterLink} to="/create" sx={{ color: 'white', textTransform: 'none' }}>new blog</Button> }
              { currentUser ? <Button variant="text" onClick={handleLogout} sx={{ color: 'white', textTransform: 'none' }}>logout</Button> : <Button component={RouterLink} to="/login" sx={{ color: 'white', textTransform: 'none' }}>login</Button> }
            </Stack>
          </Toolbar>
        </AppBar>
      </Container>
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={ <Home sortedBlogs={blogs} /> } />
          <Route path='/users' element={ <Users /> } />
          <Route path='/users/:id' element={ <User /> } />
          <Route path='/login' element={ <Login handleLogin={handleLogin} /> } />
          <Route path='/create' element={ <Create handleNewBlog={handleNewBlog}/> } />
          <Route path='/blogs/:id' element={ <Blog blogs={blogs} user={currentUser} handleLike={handleLike} handleDelete={handleDelete} handleComment={handleComment} /> } />
          <Route path='*' element={ <Typography variant="h5">page not found</Typography> } />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default App
