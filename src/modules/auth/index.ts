import type { AppModule } from '@/lib/types'
import { AUTH_MODULE_NAME } from './constants'
import routes from './routes'

const authModule: AppModule = {
  name: AUTH_MODULE_NAME,
  path: '/auth',
  isActive: true,
  routes,
}

export default authModule
