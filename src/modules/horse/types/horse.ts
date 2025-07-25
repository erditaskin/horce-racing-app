// Horse-related types for the Horse Racing Game

export interface Horse {
  id: string
  name: string
  color: string
  condition: number // 0-100
  isSelected: boolean
}

export interface HorsePerformance {
  horseId: string
  speed: number
  stamina: number
  acceleration: number
  totalScore: number
}

export interface HorseStats {
  totalRaces: number
  wins: number
  averageFinishTime: number
  bestFinishTime: number
}
