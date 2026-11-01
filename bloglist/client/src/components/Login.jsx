import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = ({ handleLogin }) => {
  const navigate = useNavigate()

  const onLogin = async (credentials) => {
    await handleLogin(credentials)
    navigate('/')
  }

  return (
    <>
      <LoginForm handleLogin={onLogin} />
    </>
  )
}

export default Login
