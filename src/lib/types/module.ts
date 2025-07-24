// Module-related types for the Horse Racing Game
import type { AppRoute } from './route'

// Base module interface
export interface AppModule {
  name: string
  path: string
  isActive: boolean
  permissions?: string[]
  routes: AppRoute[]
}

// Module configuration
export interface AppModuleConfig {
  name: string
  routes: string[]
  store?: string
  components?: string[]
  permissions?: string[]
}