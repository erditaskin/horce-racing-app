// API-related types for the Horse Racing Game

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
  timestamp: Date
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: Date
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
  lastUpdated?: Date
} 