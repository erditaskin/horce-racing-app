/**
 * Race Names for Horse Racing Game
 * 50 predefined race names for randomization
 */
export const RACE_NAMES = [
  'Windsor Stakes',
  'Newmarket Handicap',
  'Ascot Gold Cup',
  'Epsom Derby',
  'Cheltenham Cup',
  'Goodwood Stakes',
  'Doncaster Handicap',
  'York Stakes',
  'Chester Cup',
  'Kempton Stakes',
  'Sandown Handicap',
  'Haydock Cup',
  'Aintree Stakes',
  'Leicester Handicap',
  'Nottingham Cup',
  'Warwick Stakes',
  'Wolverhampton Handicap',
  'Lingfield Cup',
  'Southwell Stakes',
  'Catterick Handicap',
  'Ripon Cup',
  'Thirsk Stakes',
  'Redcar Handicap',
  'Pontefract Cup',
  'Beverley Stakes',
  'Carlisle Handicap',
  'Hamilton Cup',
  'Musselburgh Stakes',
  'Perth Handicap',
  'Ayr Cup',
  'Royal Stakes',
  'Classic Handicap',
  'Champion Cup',
  'Premier Stakes',
  'Elite Handicap',
  'Grand Cup',
  'Supreme Stakes',
  'Imperial Handicap',
  'Noble Cup',
  'Heritage Stakes',
  'Victoria Handicap',
  'Diamond Cup',
  'Platinum Stakes',
  'Golden Handicap',
  'Silver Cup',
  'Bronze Stakes',
  'Crown Handicap',
  'Jubilee Cup',
  'Coronation Stakes',
  'Commonwealth Handicap',
] as const

/**
 * Get a random race name
 */
export const getRandomRaceName = (): string => {
  const randomIndex = Math.floor(Math.random() * RACE_NAMES.length)
  return RACE_NAMES[randomIndex]
}

/**
 * Get multiple random race names (unique)
 */
export const getRandomRaceNames = (count: number): string[] => {
  const shuffled = [...RACE_NAMES].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
