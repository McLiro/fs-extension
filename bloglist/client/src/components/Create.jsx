import { useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm'

const Create = ({ handleNewBlog }) => {
  const navigate = useNavigate()
  const onSubmit = async ({ title, author, url }) => {
    await handleNewBlog({ title, author, url })
    navigate('/')
  }

  return (
    <>
      <BlogForm handleNewBlog={onSubmit}/>
    </>
  )
}

export default Create
