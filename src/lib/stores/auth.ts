import type { AppUser } from '@/lib/types/user'
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
      // Use AuthService instead of direct mock
      const authResponse = await AuthService.login({ email, password })

      // Convert AuthResponse to AppUser
      const appUser: AppUser = {
        id: authResponse.user.id,
        firstName: authResponse.user.firstName,
        lastName: authResponse.user.lastName,
        email: authResponse.user.email,
        isAuthorized: true,
        roleGroups: authResponse.user.roleGroups,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Update store state
      user.value = appUser
      token.value = authResponse.token

      // Store in localStorage
      localStorage.setItem('auth_token', authResponse.token)
      localStorage.setItem('user', JSON.stringify(appUser))
      localStorage.setItem('token_expires_at', authResponse.expiresAt)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      // Call logout service
      await AuthService.logout()
    } catch (error) {
      console.error('Logout service error:', error)
      // Continue with local logout even if service fails
    } finally {
      // Clear local state
      user.value = null
      token.value = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      localStorage.removeItem('token_expires_at')
    }
  }

  const refreshToken = async (): Promise<void> => {
    try {
      const refreshResponse = await AuthService.refreshToken()
      token.value = refreshResponse.token
      localStorage.setItem('auth_token', refreshResponse.token)
      localStorage.setItem('token_expires_at', refreshResponse.expiresAt)
    } catch (error) {
      console.error('Token refresh failed:', error)
      // If refresh fails, logout user
      await logout()
      throw error
    }
  }

  const initializeAuth = async (): Promise<void> => {
    const storedToken = localStorage.getItem('auth_token')
    const tokenExpiresAt = localStorage.getItem('token_expires_at')

    if (storedToken && tokenExpiresAt) {
      try {
        // Check if token is expired
        const expiresAt = new Date(tokenExpiresAt)
        if (expiresAt > new Date()) {
          // Token is still valid, set it first
          token.value = storedToken

          // Fetch current user from /auth/me endpoint
          const currentUser = await AuthService.getCurrentUser()

          // Convert to AppUser
          const appUser: AppUser = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            isAuthorized: true,
            roleGroups: currentUser.roleGroups,
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          // Update store state
          user.value = appUser

          // Update localStorage with fresh user data
          localStorage.setItem('user', JSON.stringify(appUser))

          console.log('Authentication initialized successfully')
        } else {
          // Token expired, clear storage
          console.log('Token expired, clearing auth state')
          await logout()
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error)
        await logout()
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
    refreshToken,
    initializeAuth,
  }
})
