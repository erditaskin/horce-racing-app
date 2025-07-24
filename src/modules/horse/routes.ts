import type { RouteRecordRaw } from 'vue-router';
import { HORSE_LIST_BASE_PATH } from './constants';

const routes: RouteRecordRaw[] = [
  {
    path: HORSE_LIST_BASE_PATH + '/list',
    component: () => import('./views/HorseList.vue'),
  },
]

export default routes;