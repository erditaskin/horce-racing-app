import type { RouteRecordRaw } from 'vue-router'

// Extended route meta with our custom properties
export interface AppRouteMeta {
  title?: string
  requiresAuth?: boolean
  permissions?: string[]
  layout?: 'base' | 'main' | 'none'
  isPublic?: boolean
  isDefault?: boolean
  isLogin?: boolean
  isUnauthorized?: boolean
  isNotFound?: boolean
}

// Extended route record that includes our custom properties
export interface AppRoute extends Omit<RouteRecordRaw, 'meta'> {
  meta?: AppRouteMeta
  layout?: 'base' | 'main' | 'none'
  isPublic?: boolean
  roles?: string[]
}

// Route guard result
export interface RouteGuardResult {
  canAccess: boolean
  redirectTo?: string
  reason?: string
}

// Layout types
export type LayoutType = 'base' | 'main' | 'none'
