import type { Race, RaceRoundResult } from '../types/'

/**
 * Animation Service for Race Animations
 * Handles all animation-related logic for race execution
 */
export class AnimationService {
  /**
   * Animate a round with horse progress updates
   */
  static async animateRound(
    race: Race,
    roundResults: RaceRoundResult[],
    shouldCancel?: () => boolean,
  ): Promise<void> {
    // Animation duration in milliseconds (2 seconds per round for faster testing)
    const animationDuration = 2000

    // Calculate animation steps (60fps = 50ms per step)
    const steps = animationDuration / 50 // 40 steps over 2 seconds

    for (let step = 0; step <= steps; step++) {
      // Check for cancellation during animation
      if (shouldCancel && shouldCancel()) {
        return
      }

      const progress = step / steps // 0 to 1

      // Update each horse's progress based on their performance
      for (const result of roundResults) {
        const raceHorse = race.selectedHorses.find((h) => h.horseId === result.horseId)
        if (raceHorse) {
          // Calculate when this horse should finish (0 to 1)
          const maxTime = Math.max(...roundResults.map((r) => r.finishTime))
          const normalizedTime = result.finishTime / maxTime

          // Horse moves continuously until it reaches its finish time
          if (progress >= normalizedTime) {
            raceHorse.progress = 100 // Horse has finished
          } else {
            // Horse is still running - calculate current progress
            // For continuous racing, horses start from 0 for each round but maintain relative timing
            const currentRoundProgress = (progress / normalizedTime) * 100
            raceHorse.progress = currentRoundProgress

            // Ensure progress is never negative and horses are always visible
            raceHorse.progress = Math.max(0, Math.min(100, raceHorse.progress))
          }

          raceHorse.speed = result.speed
          raceHorse.position = result.position
        }
      }

      // Wait for next animation frame
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
}
