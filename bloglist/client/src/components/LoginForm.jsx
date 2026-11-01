import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Box>
      <Typography variant="h4">Login</Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        <TextField
          label="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">login</Button>
      </Box>
    </Box>
  )
}

export default LoginForm
