import type { AppRoute } from '@/lib/types';
import { RACE_ROUTE_RACE_BOARD } from './constants';

const routes: AppRoute[] = [
  {
    path: RACE_ROUTE_RACE_BOARD,
    component: () => import('./views/RaceBoard.vue'),
    meta: {
      title: 'Race Board'
    }
  },
]

export default routes;