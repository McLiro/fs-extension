import React from 'react'
import { Box, Button, Typography } from '@mui/material'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box>
          <Typography variant="h5">Something went wrong.</Typography>
          <Typography>{this.state.error.message}</Typography>
          <Button onClick={() => this.setState({ hasError: false, error: null })}>
            try again
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
