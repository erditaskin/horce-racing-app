import type { AppRoute } from '@/lib/types';
import { DASHBOARD_ROUTE_DASHBOARD } from './constants';

const routes: AppRoute[] = [
  {
    path: DASHBOARD_ROUTE_DASHBOARD,
    component: () => import('./views/DashBoard.vue'),
    meta: {
      title: 'Dashboard',
      isDefault: true
    }
  },
]

export default routes;  