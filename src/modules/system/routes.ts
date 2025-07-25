import { LAYOUT_BASE } from '@/lib/constants/layout'
import type { AppRoute } from '@/lib/types'
import { SYSTEM_ROUTE_NOT_FOUND, SYSTEM_ROUTE_UNAUTHORIZED } from './constants'

const routes: AppRoute[] = [
  {
    path: SYSTEM_ROUTE_UNAUTHORIZED,
    component: () => import('./views/Unauthorized.vue'),
    layout: LAYOUT_BASE,
    meta: {
      title: 'Unauthorized',
      isUnauthorized: true,
      requiresAuth: false,
      isPublic: true,
    },
  },
  {
    path: SYSTEM_ROUTE_NOT_FOUND,
    component: () => import('./views/NotFound.vue'),
    layout: LAYOUT_BASE,
    meta: {
      title: 'Page Not Found',
      isNotFound: true,
      requiresAuth: false,
      isPublic: true,
    },
  },
]

export default routes
