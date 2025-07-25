import { reservedRoutes } from '@/lib/router'
import { useAuthStore } from '@/lib/stores/auth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

/**
 * Authentication guard - checks if user is authenticated
 * Redirects to login if not authenticated
 */
export const authGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> => {
  const authStore = useAuthStore()

  // Skip auth check for public routes
  if (to.meta?.isPublic) {
    next()
    return
  }

  // Check if user is authenticated
  if (authStore.isAuthorized) {
    next()
    return
  }

  // Not authenticated - redirect to discovered login route
  next({
    path: reservedRoutes.login,
    query: { redirect: to.fullPath },
  })
}

/**
 * Public route guard - redirects authenticated users to dashboard
 * Used for login/register pages
 */
export const requireGuest = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> => {
  const authStore = useAuthStore()

  // If user is authenticated, redirect to discovered default route
  if (authStore.isAuthorized) {
    next({ path: reservedRoutes.default })
    return
  }

  // Not authenticated - allow access to public route
  next()
}
