
// Route constants for the Horse Racing Game

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