import type { AppRoute } from '@/lib/types'
import modules from '@/modules'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// Collect all module routes
const moduleRoutes = Object.values(modules).flatMap(module => module.routes) as AppRoute[]

// Find the default route (marked with isDefault: true)
const defaultRoute = moduleRoutes.find(route => route.meta?.isDefault)

// Create routes array, placing default route at root path
const routes: RouteRecordRaw[] = []

if (defaultRoute) {
  // Add default route at root path
  routes.push({
    path: '/',
    redirect: defaultRoute.path
  } as RouteRecordRaw)
  
  // Add all module routes
  routes.push(...moduleRoutes as RouteRecordRaw[])
} else {
  // Fallback: add all module routes without default handling
  routes.push(...moduleRoutes as RouteRecordRaw[])
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
