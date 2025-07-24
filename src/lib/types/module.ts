import type { RouteRecordRaw } from 'vue-router';

export interface AppModule {
  name: string;
  routes: RouteRecordRaw[];
}