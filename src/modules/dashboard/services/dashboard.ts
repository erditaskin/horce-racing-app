import type {
  DashboardHorsePoolStats,
  DashboardRaceDaySummary,
  DashboardStats,
  TopPerformer,
} from '../types'
import { withErrorHandling } from '../utils/serviceHelpers'
import { MockDashboardService } from './mock'

export class DashboardService {
  static async getDashboardStats(date: string): Promise<DashboardStats> {
    return withErrorHandling(
      () => MockDashboardService.getDashboardStats(date),
      'Failed to load dashboard statistics',
    )
  }

  static async getTopPerformers(date: string): Promise<TopPerformer[]> {
    return withErrorHandling(
      () => MockDashboardService.getTopPerformers(date),
      'Failed to load top performers',
    )
  }

  static async getRaceDaySummary(date: string): Promise<DashboardRaceDaySummary> {
    return withErrorHandling(
      () => MockDashboardService.getRaceDaySummary(date),
      'Failed to load race day summary',
    )
  }

  static async getHorsePoolStats(date: string): Promise<DashboardHorsePoolStats> {
    return withErrorHandling(
      () => MockDashboardService.getHorsePoolStats(date),
      'Failed to load horse pool statistics',
    )
  }

  static async getAllDashboardData(date: string): Promise<{
    stats: DashboardStats
    topPerformers: TopPerformer[]
    raceDaySummary: DashboardRaceDaySummary
    horsePoolStats: DashboardHorsePoolStats
  }> {
    return withErrorHandling(
      () => MockDashboardService.getAllDashboardData(date),
      'Failed to load dashboard data',
    )
  }
}
