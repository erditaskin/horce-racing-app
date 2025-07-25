import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { apiRequestInstance } from '../services/api'
import { useAuthStore } from '../stores/auth'

/**
 * Setup axios interceptors for request and response handling
 * Adapted for Vue/Pinia architecture
 */
export const setupAxiosInterceptors = () => {
  // Request interceptor
  apiRequestInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get auth store
      const authStore = useAuthStore()
      const token = authStore.token

      // Set default headers
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }

      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      // Merge headers with existing config
      Object.assign(config.headers, headers)

      return config
    },
    (error: AxiosError) => {
      console.error('Request interceptor error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  apiRequestInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Handle pagination headers if present
      const headers = response.headers
      if (headers['x-total-count']) {
        response.data = {
          metaData: {
            totalCount: headers['x-total-count'],
          },
          data: response.data,
        }
      }
      
      return response
    },
    (error: AxiosError) => {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
      })

      // Handle specific error cases
      if (error.response?.status === 401) {
        // Unauthorized - clear token and redirect to login
        const authStore = useAuthStore()
        authStore.logout()
        // Note: Router redirect will be handled by auth guard
      }

      return Promise.reject(error)
    }
  )
}

/**
 * Initialize axios interceptors
 * Call this in main.ts or app initialization
 */
export const initializeAxios = () => {
  setupAxiosInterceptors()
} 