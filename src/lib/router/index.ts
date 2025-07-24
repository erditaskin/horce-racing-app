import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent, h } from 'vue'
import modules from '@/modules'

// Collect all module routes
const moduleRoutes = Object.values(modules).flatMap(module => module.routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: defineComponent({
        render() {
          return h('div')
        }
      }),
    },
    // Spread all module routes
    ...moduleRoutes,
  ],
})

export default router
