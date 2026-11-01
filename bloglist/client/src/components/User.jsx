import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

  if (loading) return <p>Loading user...</p>
  if (error) return <p>Failed to load user.</p>
  if (!user) return <p>User not found.</p>

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
