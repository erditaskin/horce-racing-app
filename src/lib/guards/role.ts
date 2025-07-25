import { reservedRoutes } from '@/lib/router'
import { useAuthStore } from '@/lib/stores/auth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

/**
 * Role-based access guard - checks if user has required permissions
 */
export const roleGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> => {
  const authStore = useAuthStore()
  
  // Skip role check if no permissions required
  const permissions = to.meta?.permissions as string[] | undefined
  if (!permissions || permissions.length === 0) {
    next()
    return
  }
  
  // Check if user has required permissions
  const userRoles = authStore.user?.roleGroups?.flatMap((group: { roles: string[] }) => group.roles) ?? []
  const hasRequiredPermission = permissions.some((permission: string) => userRoles.includes(permission))
  
  if (hasRequiredPermission) {
    next()
    return
  }
  
  // User doesn't have required permission - redirect to discovered unauthorized route
  next({ path: reservedRoutes.unauthorized })
} 