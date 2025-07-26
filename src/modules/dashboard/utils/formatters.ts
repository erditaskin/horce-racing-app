/**
 * Shared utility functions for dashboard widgets
 */

/**
 * Format time in seconds to display format
 */
export const formatTime = (time: number): string => {
  return `${time.toFixed(2)}s`
}

/**
 * Get status text for race status
 */
export const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'running':
      return 'Running'
    case 'completed':
      return 'Finished'
    default:
      return status
  }
}

/**
 * Get medal icon for top performers
 */
export const getMedalIcon = (index: number): string => {
  switch (index) {
    case 0:
      return '🥇'
    case 1:
      return '🥈'
    case 2:
      return '🥉'
    default:
      return ''
  }
}
