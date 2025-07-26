/**
 * Utility functions for dashboard services
 */

/**
 * Wraps a service call with consistent error handling
 */
export const withErrorHandling = async <T>(
  serviceCall: () => Promise<T>,
  errorMessage: string,
): Promise<T> => {
  try {
    return await serviceCall()
  } catch (error) {
    console.error(`Failed to ${errorMessage.toLowerCase()}:`, error)
    throw new Error(errorMessage)
  }
}
