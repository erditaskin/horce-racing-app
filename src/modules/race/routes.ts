import type { RouteRecordRaw } from 'vue-router';
import { RACE_LIST_BASE_PATH } from './constants';

const routes: RouteRecordRaw[] = [
  {
    path: RACE_LIST_BASE_PATH + '/board',
    component: () => import('./views/RaceBoard.vue'),
  },
]

export default routes;