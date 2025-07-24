import type { RouteRecordRaw } from 'vue-router';
import { DASHBOARD_BASE_PATH } from './constants';

const routes: RouteRecordRaw[] = [
  {
    path: DASHBOARD_BASE_PATH + '/',
    component: () => import('./views/DashBoard.vue'),
  },
]

export default routes;  