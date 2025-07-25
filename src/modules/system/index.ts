import type { AppModule } from '@/lib/types'
import { SYSTEM_MODULE_NAME } from './constants'
import routes from './routes'

const systemModule: AppModule = {
  name: SYSTEM_MODULE_NAME,
  path: '/system',
  isActive: true,
  routes,
}

export default systemModule
