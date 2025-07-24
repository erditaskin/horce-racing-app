import { createRouter, createWebHistory } from 'vue-router'
import { defineComponent, h } from 'vue'


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
    {
      path: '/about',
      name: 'about',
      component: defineComponent({
        render() {
          return h('div')
        }
      }),
    },
  ],
})

export default router
