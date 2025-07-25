import { LAYOUT_BASE } from '@/lib/constants/layout'
import { ROUTE_META_AUTH } from '@/lib/constants/route'
import type { AppRoute } from '@/lib/types'
import { AUTH_ROUTE_FORGOT_PASSWORD, AUTH_ROUTE_LOGIN, AUTH_ROUTE_REGISTER } from './constants'

const routes: AppRoute[] = [
  {
    path: AUTH_ROUTE_LOGIN,
    component: () => import('./views/Login.vue'),
    layout: LAYOUT_BASE,
    meta: {
      title: 'Login',
      isLogin: true,
      ...ROUTE_META_AUTH,
    },
  },
  {
    path: AUTH_ROUTE_REGISTER,
    component: () => import('./views/Register.vue'),
    layout: LAYOUT_BASE,
    meta: {
      title: 'Register',
      ...ROUTE_META_AUTH,
    },
  },
  {
    path: AUTH_ROUTE_FORGOT_PASSWORD,
    component: () => import('./views/ForgotPassword.vue'),
    layout: LAYOUT_BASE,
    meta: {
      title: 'Forgot Password',
      ...ROUTE_META_AUTH,
    },
  },
]

export default routes
