import { DASHBOARD_MODULE_NAME } from './constants'
import routes from './routes'

export { useDashboardStore } from './stores/dashboard'
export * from './types'

export default {
  name: DASHBOARD_MODULE_NAME,
  routes,
}
