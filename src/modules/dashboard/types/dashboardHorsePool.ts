import type { TopPerformer } from './dashboardPerformer'

export interface DashboardHorsePoolStats {
  totalHorses: number
  averageCondition: number
  conditionDistribution: {
    excellent: number
    good: number
    fair: number
    poor: number
  }
  topHorses: TopPerformer[]
}
