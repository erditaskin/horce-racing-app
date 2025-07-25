import type { Horse } from '../types/horse'

/**
 * Horse mock service for generating random horse data
 */
export class HorseMockService {
  private static horseNames = [
    'Thunder Bolt', 'Silver Arrow', 'Golden Star', 'Midnight Shadow', 'Red Lightning',
    'Blue Thunder', 'Green Lightning', 'Purple Storm', 'Orange Blaze', 'Pink Diamond',
    'White Lightning', 'Black Stallion', 'Fire Storm', 'Ice Wind', 'Desert Rose',
    'Mountain Peak', 'Ocean Wave', 'Forest Spirit', 'Sky Hawk', 'Earth Shaker',
    'Sun Ray', 'Moon Beam', 'Star Light', 'Cloud Runner', 'Rain Bow',
    'Snow Flake', 'Wind Rider', 'Storm Chaser', 'Lightning Strike', 'Thunder Cloud',
    'Silver Lining', 'Golden Hour', 'Diamond Edge', 'Ruby Heart', 'Emerald Eye',
    'Sapphire Sky', 'Pearl Harbor', 'Crystal Clear', 'Amber Alert', 'Jade Dragon',
    'Copper Head', 'Bronze Age', 'Iron Will', 'Steel Heart', 'Platinum Star',
    'Titanium Soul', 'Aluminum Foil', 'Zinc Oxide', 'Nickel Back', 'Copper Top',
    'Silver Spoon', 'Golden Ticket', 'Diamond Ring', 'Ruby Tuesday', 'Emerald City',
    'Sapphire Blue', 'Pearl Jam', 'Crystal Method', 'Amber Waves', 'Jade Empire',
    'Copper Mountain', 'Bronze Medal', 'Iron Man', 'Steel Magnolias', 'Platinum Blonde',
    'Titanium White', 'Aluminum Siding', 'Zinc Deficiency', 'Nickel and Dime', 'Copper Penny',
    'Silver Dollar', 'Golden Retriever', 'Diamond in the Rough', 'Ruby Slippers', 'Emerald Isle',
    'Sapphire Coast', 'Pearl Harbor', 'Crystal Palace', 'Amber Alert', 'Jade Garden',
    'Copper Canyon', 'Bronze Age', 'Iron Curtain', 'Steel Wool', 'Platinum Card',
    'Titanium Dioxide', 'Aluminum Can', 'Zinc Oxide', 'Nickel Plated', 'Copper Wire',
    'Silver Screen', 'Golden Gate', 'Diamond Head', 'Ruby Red', 'Emerald Green',
    'Sapphire Blue', 'Pearl Necklace', 'Crystal Ball', 'Amber Light', 'Jade Stone'
  ]

  private static horseColors = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#2C3E50', '#E74C3C',
    '#3498DB', '#2ECC71', '#9B59B6', '#E67E22', '#E91E63',
    '#F39C12', '#1ABC9C', '#34495E', '#95A5A6', '#D35400',
    '#8E44AD', '#16A085', '#C0392B', '#2980B9', '#27AE60',
    '#F1C40F', '#E67E22', '#E74C3C', '#9B59B6', '#3498DB',
    '#2ECC71', '#1ABC9C', '#F39C12', '#E67E22', '#D35400'
  ]

  /**
   * Generate a random horse with realistic data
   */
  private static generateRandomHorse(id: string): Horse {
    const randomName = this.horseNames[Math.floor(Math.random() * this.horseNames.length)]
    const randomColor = this.horseColors[Math.floor(Math.random() * this.horseColors.length)]
    const randomCondition = Math.floor(Math.random() * 40) + 60 // 60-100 condition

    return {
      id,
      name: randomName,
      color: randomColor,
      condition: randomCondition,
      isSelected: false
    }
  }

  /**
   * Generate 100 random horses
   */
  static generateHorses(count: number = 100): Horse[] {
    const horses: Horse[] = []
    
    for (let i = 1; i <= count; i++) {
      horses.push(this.generateRandomHorse(i.toString()))
    }
    
    return horses
  }

  /**
   * Generate a single random horse
   */
  static generateRandomHorseData(): Horse {
    return this.generateRandomHorse(Math.random().toString(36).substr(2, 9))
  }
} 