import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'

const Blog = ({ blogs, user, handleLike, handleDelete, handleComment }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const [comment, setComment] = useState('')

  const navigate = useNavigate()
  const onDelete = async (blog) => {
    await handleDelete(blog)
    navigate('/')
  }

  const onComment = async (event) => {
    event.preventDefault()
    const text = comment.trim()
    if (!text) return

    const updatedBlog = await handleComment(blog, text)
    if (updatedBlog) setComment('')
  }

  if (!blog) return null

  const isOwner = user && blog.user && user.username === blog.user.username
  const comments = blog.comments || []

  return (
    <>
      <Typography variant="h5">{blog.author}: {blog.title}</Typography>
      <Typography>{blog.url}</Typography>
      <Box sx={{ display: 'flex', alignitems: 'center', gap: 1 }}>
        <Typography component="span">likes {blog.likes}</Typography>
        {user && <Button onClick={() => handleLike(blog)}>like</Button>}
      </Box>
      <Typography>Added by {blog.user.name}</Typography>
      {isOwner && <Button onClick={() => onDelete(blog)}>remove</Button>}
      <Typography variant="h6">comments</Typography>
      { user &&
        <Box component="form" onSubmit={onComment} sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            size="small"
          />
          <Button type="submit">add comment</Button>
        </Box>}
      <List>
        {comments.map((comment, index) => (
          <ListItem key={`${comment}-${index}`}>{comment}</ListItem>
        ))}
      </List>
    </>
  )
}

export default Blog
