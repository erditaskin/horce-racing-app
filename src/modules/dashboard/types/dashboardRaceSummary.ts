export interface DashboardRaceSummary {
  raceId: string
  raceNumber: number
  raceName: string
  startTime: string
  pistType: 'grass' | 'sand'
  status: 'pending' | 'running' | 'completed'
  horseCount: number
  winner?: {
    horseName: string
    horseColor: string
    finishTime: number
  }
}
