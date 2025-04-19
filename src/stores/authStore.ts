import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: { email: string; name: string } | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Mock response
        set({
          user: { email, name: 'John Doe' },
          token: 'mock-jwt-token',
        })
      },
      logout: () => {
        set({ user: null, token: null })
      },
      register: async (email, password, name) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Mock response
        set({
          user: { email, name },
          token: 'mock-jwt-token',
        })
      },
    }),
    {
      name: 'auth-storage', // name for localStorage
    }
  )
)