import type { AppUser } from '@/lib/types'
import type { AuthResponse } from '@/lib/types/api'

/**
 * Core authentication service
 * Handles core auth operations: getActiveUser, setToken, refreshToken, logout
 */
export class AuthCoreService {
  private static readonly USER_STORAGE_KEY = 'user'
  private static readonly TOKEN_STORAGE_KEY = 'auth_token'
  private static readonly TOKEN_EXPIRES_KEY = 'token_expires_at'

  /**
   * Get active user from localStorage
   */
  static getActiveUser(): AppUser | null {
    try {
      const userData = localStorage.getItem(this.USER_STORAGE_KEY)
      if (userData) {
        return JSON.parse(userData) as AppUser
      }
    } catch (error) {
      console.error('Failed to get active user from localStorage:', error)
    }
    return null
  }

  /**
   * Set authentication token
   */
  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token)
  }

  /**
   * Get authentication token
   */
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY)
  }

  /**
   * Set token expiration
   */
  static setTokenExpiration(expiresAt: string): void {
    localStorage.setItem(this.TOKEN_EXPIRES_KEY, expiresAt)
  }

  /**
   * Get token expiration
   */
  static getTokenExpiration(): string | null {
    return localStorage.getItem(this.TOKEN_EXPIRES_KEY)
  }

  /**
   * Save user to localStorage
   */
  static saveUser(user: AppUser): void {
    try {
      localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user))
    } catch (error) {
      console.error('Failed to save user to localStorage:', error)
    }
  }

  /**
   * Check if user is authenticated (has valid token and user data)
   */
  static isAuthenticated(): boolean {
    const token = this.getToken()
    const user = this.getActiveUser()
    const expiresAt = this.getTokenExpiration()

    if (!token || !user || !expiresAt) {
      return false
    }

    // Check if token is expired
    try {
      const expirationDate = new Date(expiresAt)
      return expirationDate > new Date()
    } catch (error) {
      console.error('Failed to check token expiration:', error)
      return false
    }
  }

  /**
   * Convert AuthResponse to AppUser and save to localStorage
   */
  static saveAuthResponse(authResponse: AuthResponse): AppUser {
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

    // Save user data
    this.saveUser(appUser)
    this.setToken(authResponse.token)
    this.setTokenExpiration(authResponse.expiresAt)

    return appUser
  }

  /**
   * Clear all authentication data from localStorage
   */
  static clearAuthData(): void {
    localStorage.removeItem(this.USER_STORAGE_KEY)
    localStorage.removeItem(this.TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.TOKEN_EXPIRES_KEY)
  }

  /**
   * Refresh authentication token
   * Mock implementation that simulates token refresh
   */
  static async refreshToken(): Promise<{ token: string; expiresAt: string }> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock token refresh response
      return {
        token: 'mock-jwt-token-refreshed-' + Date.now(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Token refresh failed'
      throw new Error(errorMessage)
    }
  }

  /**
   * Logout user
   * Mock implementation that simulates API call
   */
  static async logout(): Promise<void> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simulate API call (in real app, this would be: return Api.post('/auth/logout'))
      console.log('User logged out successfully')
    } catch {
      // Don't throw error for logout as we want to clear local state anyway
    }
  }
}
