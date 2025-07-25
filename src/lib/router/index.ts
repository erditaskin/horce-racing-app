import { authGuard } from '@/lib/guards/auth'
import { roleGuard } from '@/lib/guards/role'
import type { AppRoute } from '@/lib/types'
import modules from '@/modules'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { fetchReservedRoutes } from '../utils/route'

// Collect all module routes
const moduleRoutes = Object.values(modules).flatMap((module) => module.routes) as AppRoute[]

// Get reserved routes
const reservedRoutes = fetchReservedRoutes(moduleRoutes)

// Create routes array
const routes: RouteRecordRaw[] = []

// Add root path redirect to default route
routes.push({
  path: '/',
  redirect: reservedRoutes.default,
} as RouteRecordRaw)

// Add all module routes
routes.push(...(moduleRoutes as RouteRecordRaw[]))

// Add catch-all route for 404
routes.push({
  path: '/:pathMatch(.*)*',
  redirect: reservedRoutes.notFound,
} as RouteRecordRaw)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Add global guards
router.beforeEach(authGuard)
router.beforeEach(roleGuard)

export { reservedRoutes }
export default router
