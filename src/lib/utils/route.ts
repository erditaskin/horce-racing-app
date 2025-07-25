import type { AppRoute } from '@/lib/types'

/**
 * Helper function to fetch reserved routes from module routes
 */
export const fetchReservedRoutes = (routes: AppRoute[]) => {
  const defaultRoute = routes.find((route) => route.meta?.isDefault)
  const loginRoute = routes.find((route) => route.meta?.isLogin)
  const unauthorizedRoute = routes.find((route) => route.meta?.isUnauthorized)
  const notFoundRoute = routes.find((route) => route.meta?.isNotFound)

  return {
    default: defaultRoute?.path ?? '/dashboard',
    login: loginRoute?.path ?? '/auth/login',
    unauthorized: unauthorizedRoute?.path ?? '/unauthorized',
    notFound: notFoundRoute?.path ?? '/404',
  }
}
