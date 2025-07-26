import { mockHorsePoolStats } from '@/resources/mock/dashboard/horsePool'
import { mockRaceDaySummary } from '@/resources/mock/dashboard/raceDay'
import { mockDashboardStats, mockTopPerformers } from '@/resources/mock/dashboard/statistics'
import type {
  DashboardHorsePoolStats,
  DashboardRaceDaySummary,
  DashboardStats,
  TopPerformer,
} from '../types'

export class MockDashboardService {
  static async getDashboardStats(date: string): Promise<DashboardStats> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // In a real app, this would fetch from API with date parameter
    // For now, we'll use mock data but could filter by date if needed
    console.log(`Fetching dashboard stats for date: ${date}`)
    return mockDashboardStats
  }

  static async getTopPerformers(date: string): Promise<TopPerformer[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    // In a real app, this would fetch from API with date parameter
    console.log(`Fetching top performers for date: ${date}`)
    return mockTopPerformers
  }

  static async getRaceDaySummary(date: string): Promise<DashboardRaceDaySummary> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Return mock data with the requested date
    console.log(`Fetching race day summary for date: ${date}`)
    return {
      ...mockRaceDaySummary,
      date,
    }
  }

  static async getHorsePoolStats(date: string): Promise<DashboardHorsePoolStats> {
    await new Promise((resolve) => setTimeout(resolve, 250))

    // In a real app, this would fetch from API with date parameter
    console.log(`Fetching horse pool stats for date: ${date}`)
    return mockHorsePoolStats
  }

  static async getAllDashboardData(date: string): Promise<{
    stats: DashboardStats
    topPerformers: TopPerformer[]
    raceDaySummary: DashboardRaceDaySummary
    horsePoolStats: DashboardHorsePoolStats
  }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log(`Fetching all dashboard data for date: ${date}`)
    return {
      stats: mockDashboardStats,
      topPerformers: mockTopPerformers,
      raceDaySummary: {
        ...mockRaceDaySummary,
        date,
      },
      horsePoolStats: mockHorsePoolStats,
    }
  }
}
