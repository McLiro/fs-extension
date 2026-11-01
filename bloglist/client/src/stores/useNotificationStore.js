import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: {
    message: null,
    type: null
  },
  actions: {
    notify: (message, type = 'success') => {
      set({ notification: { message, type } })
      setTimeout(() => {
        set({ notification: { message: null, type: null } })
      }, 3000)
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.notification)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
