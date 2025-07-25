import { AuthCoreService } from '@/lib/services/auth'
import type { AppUser } from '@/lib/types'
import { AuthService } from '@/modules/auth/services/login'
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
      // Use AuthService for login
      const authResponse = await AuthService.login({ email, password })

      // Use AuthCoreService to save auth response and get user
      const appUser = AuthCoreService.saveAuthResponse(authResponse)

      // Update store state
      user.value = appUser
      token.value = authResponse.token
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const clearAuthState = (): void => {
    // Clear local state only
    user.value = null
    token.value = null
    AuthCoreService.clearAuthData()
  }

  const refreshToken = async (): Promise<void> => {
    try {
      const refreshResponse = await AuthCoreService.refreshToken()
      token.value = refreshResponse.token
      AuthCoreService.setToken(refreshResponse.token)
      AuthCoreService.setTokenExpiration(refreshResponse.expiresAt)
    } catch (error) {
      console.error('Token refresh failed:', error)
      // If refresh fails, clear auth state
      clearAuthState()
      throw error
    }
  }

  const initializeAuth = async (): Promise<void> => {
    // Check if user is authenticated using AuthCoreService
    if (AuthCoreService.isAuthenticated()) {
      try {
        // Get stored token and user
        const storedToken = AuthCoreService.getToken()
        const storedUser = AuthCoreService.getActiveUser()

        if (storedToken && storedUser) {
          // Set store state
          token.value = storedToken
          user.value = storedUser

          // Update store state and localStorage
          user.value = storedUser
          AuthCoreService.saveUser(storedUser)

          console.log('Authentication initialized successfully')
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error)
        clearAuthState()
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
    clearAuthState,
    refreshToken,
    initializeAuth,
  }
})
