/**
 * URL manipulation utilities for dashboard
 */

/**
 * Get initial date from URL query string or return today's date
 */
export const getInitialDate = (): string => {
  const urlParams = new URLSearchParams(window.location.search)
  const dayParam = urlParams.get('day')

  if (dayParam && /^\d{4}-\d{2}-\d{2}$/.test(dayParam)) {
    return dayParam
  }

  return new Date().toISOString().split('T')[0]
}

/**
 * Update URL query string with new date
 */
export const updateQueryString = (date: string): void => {
  const url = new URL(window.location.href)
  url.searchParams.set('day', date)
  window.history.replaceState({}, '', url.toString())
}
