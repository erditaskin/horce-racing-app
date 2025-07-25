
// Route constants for the Horse Racing Game

// Route meta defaults
export const ROUTE_META_DEFAULTS = {
  requiresAuth: true,
  layout: 'main',
  isPublic: false
} as const

export const ROUTE_META_AUTH = {
  requiresAuth: false,
  layout: 'base',
  isPublic: true
} as const

// System routes (for reference only - these are handled by containers)
export const ROUTE_UNAUTHORIZED = '/unauthorized'
export const ROUTE_NOT_FOUND = '/404'