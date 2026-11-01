import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Blog from './Blog'

const creator = {
  username: 'creator',
  name: 'Creator Name',
  id: '1'
}

const otherUser = {
  username: 'other',
  name: 'Other User',
  id: '2'
}

const blog = {
  id: '1',
  title: 'TestTitle',
  url: 'TestUrl',
  author: 'TestAuthor',
  likes: 15,
  user: creator
}

const renderBlog = (loggedInUser) => {
  const handleLike = vi.fn()
  const handleDelete = vi.fn()

  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={[blog]}
              user={loggedInUser}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )

  return { handleLike, handleDelete }
}

describe('when the user is the creator', () => {
  test('blog info and buttons are visible', () => {
    renderBlog(creator)

    expect(screen.queryByText('TestAuthor: TestTitle')).toBeVisible()
    expect(screen.queryByText('TestUrl')).toBeVisible()
    expect(screen.queryByText('likes 15')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'like' })).toBeVisible()
    expect(screen.queryByText('Added by Creator Name')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'remove' })).toBeVisible()
  })
})

describe('when the user is not the creator', () => {
  test('blog info, likes and like button are visible', () => {
    renderBlog(otherUser)

    expect(screen.queryByText('TestAuthor: TestTitle')).toBeVisible()
    expect(screen.queryByText('TestUrl')).toBeVisible()
    expect(screen.queryByText('likes 15')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'like' })).toBeVisible()
    expect(screen.queryByText('Added by Creator Name')).toBeVisible()
  })

  test('remove button is not visible', () => {
    renderBlog(otherUser)

    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
  })
})

describe('when no user is logged in', () => {
  test('blog info and likes are visible', () => {
    renderBlog(null)

    expect(screen.queryByText('TestAuthor: TestTitle')).toBeVisible()
    expect(screen.queryByText('TestUrl')).toBeVisible()
    expect(screen.queryByText('likes 15')).toBeVisible()
    expect(screen.queryByText('Added by Creator Name')).toBeVisible()
  })

  test('buttons are not visible', () => {
    renderBlog(null)

    expect(screen.queryByRole('button', { name: 'remove' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'like' })).toBeNull()
  })
})
