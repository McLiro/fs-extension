import { Link as RouterLink } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material'

const Home = ({ sortedBlogs }) => {
  return (
    <>
      <Typography variant="h4">Blogs</Typography>

      <List>
        {sortedBlogs.map(blog => (
          <ListItem key={blog.id} disablePadding>
            <ListItemButton component={RouterLink} to={`/blogs/${blog.id}`} sx={{ color: 'blue' }}>
              {`${blog.title} by ${blog.author}`}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Home
