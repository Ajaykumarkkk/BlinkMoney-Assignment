export interface Milestone {
  id: string;
  dayRequired: number;
  name: string;
  badgeName: string;
  rewardText: string;
  xpReward: number;
  description: string;
  icon: string; // Icon name from MaterialCommunityIcons
}

export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    dayRequired: 3,
    name: 'First Step',
    badgeName: 'Novice Saver',
    rewardText: '+20 XP & Badge',
    xpReward: 20,
    description: 'Complete a 3-day saving streak to establish your momentum.',
    icon: 'sprout',
  },
  {
    id: 'm2',
    dayRequired: 7,
    name: 'Consistent Saver',
    badgeName: 'Habit Builder',
    rewardText: '+50 XP & Badge',
    xpReward: 50,
    description: 'Maintain a 7-day savings streak and make saving a daily routine.',
    icon: 'leaf',
  },
  {
    id: 'm3',
    dayRequired: 15,
    name: 'Bronze Saver',
    badgeName: 'Bronze Tier',
    rewardText: '+100 XP & Badge',
    xpReward: 100,
    description: 'Reach a 15-day savings streak. You are halfway to a full month!',
    icon: 'trophy-outline',
  },
  {
    id: 'm4',
    dayRequired: 20,
    name: 'Smart Saver',
    badgeName: 'Silver Tier',
    rewardText: '+150 XP & Badge',
    xpReward: 150,
    description: 'Keep the habit strong for 20 days. Your wealth pool is compounding.',
    icon: 'medal-outline',
  },
  {
    id: 'm5',
    dayRequired: 30,
    name: 'Wealth Builder',
    badgeName: 'Gold Tier',
    rewardText: '+250 XP & Badge',
    xpReward: 250,
    description: 'An incredible 30-day savings habit. You have laid a rock-solid foundation.',
    icon: 'crown-outline',
  },
  {
    id: 'm6',
    dayRequired: 50,
    name: 'Wealth Champion',
    badgeName: 'Diamond Legend',
    rewardText: '+500 XP & Badge',
    xpReward: 500,
    description: '50 days of unwavering financial discipline. You are in the top 1%!',
    icon: 'diamond-stone',
  },
];
