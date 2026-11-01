import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ blogs, user, handleLike, handleDelete }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const navigate = useNavigate()
  const onDelete = async (blog) => {
    await handleDelete(blog)
    navigate('/')
  }

  if (!blog) return null

  const isOwner = user && blog.user && user.username === blog.user.username

  return (
    <>
      <h3>{blog.author}: {blog.title}</h3>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        {user && <button onClick={() => handleLike(blog)}>like</button>}
      </div>
      <div>Added by {blog.user.name}</div>
      {isOwner && <button onClick={() => onDelete(blog)}>remove</button>}
    </>
  )
}

export default Blog
