import type { DashboardRaceSummary } from './dashboardRaceSummary'

export interface DashboardRaceDaySummary {
  date: string
  venue: {
    name: string
    location: string
    capacity: number
  }
  weather: string
  totalRaces: number
  completedRaces: number
  pendingRaces: number
  races: DashboardRaceSummary[]
}
