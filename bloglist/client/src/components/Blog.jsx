import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
      <h3>{blog.author}: {blog.title}</h3>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        {user && <button onClick={() => handleLike(blog)}>like</button>}
      </div>
      <div>Added by {blog.user.name}</div>
      {isOwner && <button onClick={() => onDelete(blog)}>remove</button>}
      <h4>comments</h4>
      { user &&
        <form onSubmit={onComment}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>}
      <ul>
        {comments.map((comment, index) => (
          <li key={`${comment}-${index}`}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Blog
