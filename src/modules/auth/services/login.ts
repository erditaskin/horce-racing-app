import type { ApiResponse, AuthResponse, LoginRequest } from '@/lib/types/api'

/**
 * Authentication service for login operations
 */
export class AuthService {
  /**
   * Login user with email and password
   * Mock implementation that simulates API response
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock validation
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required')
      }

      // Mock successful login response
      const mockResponse: ApiResponse<AuthResponse> = {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: credentials.email,
            roleGroups: [
              {
                key: 'horse-operator',
                roles: ['horse-list-view', 'horse-edit']
              },
              {
                key: 'race-operator',
                roles: ['race-view', 'race-manage']
              }
            ]
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        },
        success: true,
        message: 'Login successful',
        timestamp: new Date()
      }

      // Simulate API call (in real app, this would be: return Api.post('/auth/login', credentials))
      return mockResponse.data
    } catch (error) {
      // Simulate API error response
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
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
      await new Promise(resolve => setTimeout(resolve, 500))

      // Simulate API call (in real app, this would be: return Api.post('/auth/logout'))
      console.log('User logged out successfully')
    } catch {
      // Don't throw error for logout as we want to clear local state anyway
    }
  }

  /**
   * Get current authenticated user
   * Mock implementation that simulates /auth/me endpoint
   */
  static async getCurrentUser(): Promise<AuthResponse['user']> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      // Mock current user response
      return {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        roleGroups: [
          {
            key: 'horse-operator',
            roles: ['horse-list-view', 'horse-edit']
          },
          {
            key: 'race-operator',
            roles: ['race-view', 'race-manage']
          }
        ]
      }
    } catch {
      throw new Error('Failed to get current user')
    }
  }

  /**
   * Refresh authentication token
   * Mock implementation that simulates token refresh
   */
  static async refreshToken(): Promise<{ token: string; expiresAt: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Mock token refresh response
      return {
        token: 'mock-jwt-token-refreshed-' + Date.now(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    } catch {
      throw new Error('Token refresh failed')
    }
  }
} 