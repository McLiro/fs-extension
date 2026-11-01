import { create } from 'zustand'

const sortByLikes = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)

const useBlogsStore = create((set) => ({
  blogs: [],
  actions: {
    setBlogs: (blogs) => set({ blogs: sortByLikes(blogs) }),
    addBlog: (blog) => set((state) => ({ blogs: sortByLikes([...state.blogs, blog]) })),
    updateBlog: (updatedBlog) => set((state) => ({
      blogs: sortByLikes(state.blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    })),
    deleteBlog: (id) => set((state) => ({
      blogs: state.blogs.filter(blog => blog.id !== id)
    }))
  }
}))

export const useBlogs = () => useBlogsStore(state => state.blogs)
export const useBlogsActions = () => useBlogsStore(state => state.actions)
