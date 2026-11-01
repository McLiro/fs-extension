import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Blog from './Blog'

const Home = ({ sortedBlogs }) => {
  return (
    <>
      <h2>Blogs</h2>

      <ul>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
