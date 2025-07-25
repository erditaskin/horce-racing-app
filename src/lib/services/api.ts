import axios from 'axios'

// Configuration
const config = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
}

// Create axios instance
export const apiRequestInstance = axios.create(config)

// Export as Api for convenience
export const Api = apiRequestInstance

// Export default instance
export default apiRequestInstance
