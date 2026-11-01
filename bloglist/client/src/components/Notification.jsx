import { Alert } from '@mui/material'
import { useNotification } from '../stores/useNotificationStore'

const Notification = () => {
  const { message, type } = useNotification()

  if (!message) {
    return null
  }

  return (
    <Alert
      severity={type === 'error' ? 'error' : 'success'}
      variant="filled"
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  )
}

export default Notification
