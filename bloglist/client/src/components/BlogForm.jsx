import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleNewBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box>
      <Typography variant="h4">Create new</Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        <TextField
          label="title:"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="author:"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="url:"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit">Create</Button>
      </Box>
    </Box>
  )
}

export default BlogForm
