// API-related types for the Horse Racing Game

// Base API response structure
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
  timestamp: Date
}

// API error structure
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
}

// Loading state for API operations
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Pagination metadata
export interface PaginationMeta {
  totalCount: number
  page: number
  limit: number
  totalPages: number
}

// Paginated response structure
export interface PaginatedResponse<T> {
  data: T[]
  metaData: PaginationMeta
}

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Request configuration
export interface ApiRequestConfig {
  method: HttpMethod
  url: string
  data?: Record<string, unknown>
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

// Authentication response
export interface AuthResponse {
  token: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    roleGroups: Array<{
      key: string
      roles: string[]
    }>
  }
  expiresAt: string
}

// Login request
export interface LoginRequest {
  email: string
  password: string
}

// Register request
export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
