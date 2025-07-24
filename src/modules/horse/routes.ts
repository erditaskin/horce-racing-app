import type { AppRoute } from '@/lib/types';
import { HORSE_ROLE_HORSE_LIST_PAGE_VIEW, HORSE_ROUTE_HORSE_LIST } from './constants';

const routes: AppRoute[] = [
  {
    path: HORSE_ROUTE_HORSE_LIST,
    component: () => import('./views/HorseList.vue'),
    roles: [HORSE_ROLE_HORSE_LIST_PAGE_VIEW],
    meta: {
      title: 'Horse List',
      permissions: [HORSE_ROLE_HORSE_LIST_PAGE_VIEW]
    }
  },
]

export default routes;