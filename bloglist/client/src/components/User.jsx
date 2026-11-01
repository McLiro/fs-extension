import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { List, ListItem, Typography } from '@mui/material'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    userService.getAll()
      .then(users => setUser(users.find(user => user.id === id) || null))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Typography>Loading user...</Typography>
  if (error) return <Typography>Failed to load user.</Typography>
  if (!user) return <Typography>User not found.</Typography>

  return (
    <>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h5">added blogs</Typography>
      <List>
        {user.blogs.map(blog => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </>
  )
}

export default User
