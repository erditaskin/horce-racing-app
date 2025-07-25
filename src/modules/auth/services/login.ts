import type { ApiResponse, AuthResponse, LoginRequest } from '@/lib/types/api'

/**
 * Authentication service for authentication flows
 * Handles login, register, forgotPassword operations
 */
export class AuthService {
  /**
   * Login user with email and password
   * Mock implementation that simulates API response
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

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
                roles: ['horse-list-view', 'horse-edit'],
              },
              {
                key: 'race-operator',
                roles: ['race-view', 'race-manage'],
              },
            ],
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        },
        success: true,
        message: 'Login successful',
        timestamp: new Date(),
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
      await new Promise((resolve) => setTimeout(resolve, 500))

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
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Mock current user response
      return {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        roleGroups: [
          {
            key: 'horse-operator',
            roles: ['horse-list-view', 'horse-edit'],
          },
          {
            key: 'race-operator',
            roles: ['race-view', 'race-manage'],
          },
        ],
      }
    } catch {
      throw new Error('Failed to get current user')
    }
  }

  /**
   * Register new user
   * Mock implementation that simulates API response
   */
  static async register(credentials: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (
        !credentials.email ||
        !credentials.password ||
        !credentials.firstName ||
        !credentials.lastName
      ) {
        throw new Error('All fields are required')
      }

      // Mock successful registration response
      const mockResponse: ApiResponse<AuthResponse> = {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: '2',
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            roleGroups: [
              {
                key: 'user',
                roles: ['basic-access'],
              },
            ],
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        },
        success: true,
        message: 'Registration successful',
        timestamp: new Date(),
      }

      // Simulate API call (in real app, this would be: return Api.post('/auth/register', credentials))
      return mockResponse.data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      throw new Error(errorMessage)
    }
  }

  /**
   * Forgot password
   * Mock implementation that simulates API response
   */
  static async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mock validation
      if (!email) {
        throw new Error('Email is required')
      }

      // Mock successful response
      return {
        message: 'Password reset email sent successfully',
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email'
      throw new Error(errorMessage)
    }
  }
}
