import type { AppUser } from '@/lib/types/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<AppUser | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  // Getters
  const isAuthorized = computed(() => !!token.value && !!user.value?.isAuthorized)
  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })

  // Actions
          const login = async (email: string, password: string): Promise<void> => {
    isLoading.value = true
    try {
      console.log('Login called', password)
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const mockUser: AppUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email,
        isAuthorized: true,
        roleGroups: [
          {
            key: 'horse-operator',
            roles: ['horse-list-view', 'horse-edit']
          },
          {
            key: 'race-operator', 
            roles: ['race-view', 'race-manage']
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      user.value = mockUser
      token.value = 'mock-jwt-token-' + Date.now()
      
      // Store in localStorage
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user', JSON.stringify(mockUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = (): void => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  const initializeAuth = (): void => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Failed to restore auth state:', error)
        logout()
      }
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    
    // Getters
    isAuthorized,
    fullName,
    
    // Actions
    login,
    logout,
    initializeAuth
  }
})
