import type { DashboardHorsePoolStats } from './dashboardHorsePool'
import type { TopPerformer } from './dashboardPerformer'
import type { DashboardRaceDaySummary } from './dashboardRaceDay'
import type { DashboardStats } from './dashboardStats'

export interface DashboardData {
  selectedDate: string
  raceDaySummary: DashboardRaceDaySummary | null
  statistics: DashboardStats | null
  topPerformers: TopPerformer[]
  horsePoolStats: DashboardHorsePoolStats | null
}
