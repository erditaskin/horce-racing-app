import type { DashboardHorsePoolStats } from '@/modules/dashboard/types'

export const mockHorsePoolStats: DashboardHorsePoolStats = {
  totalHorses: 20,
  averageCondition: 78.5,
  conditionDistribution: {
    excellent: 3,
    good: 8,
    fair: 6,
    poor: 3,
  },
  topHorses: [
    {
      horseId: 'horse-001',
      horseName: 'Turbo',
      horseColor: '#3b82f6',
      wins: 12,
      totalRaces: 18,
      averageTime: 142.3,
      winRate: 66.7,
      bestTime: 138.45,
    },
    {
      horseId: 'horse-002',
      horseName: 'Sergen',
      horseColor: '#f59e0b',
      wins: 10,
      totalRaces: 16,
      averageTime: 143.8,
      winRate: 62.5,
      bestTime: 139.12,
    },
    {
      horseId: 'horse-003',
      horseName: 'Haberbatur',
      horseColor: '#ef4444',
      wins: 8,
      totalRaces: 15,
      averageTime: 145.2,
      winRate: 53.3,
      bestTime: 141.78,
    },
  ],
}
