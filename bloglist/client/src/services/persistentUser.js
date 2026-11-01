import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  getUser: () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      set({ user })
    }
  },
  saveUser: (user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    set({ user })
  },
  removeUser: () => {
    window.localStorage.clear()
    set({ user: null })
  }
}))

export const useUser = () => useUserStore((state) => state.user)
export const getUser = () => useUserStore.getState().getUser()
export const saveUser = (user) => useUserStore.getState().saveUser(user)
export const removeUser = () => useUserStore.getState().removeUser()
