import { STRATEGIES } from './strategies';
import { Strategy } from '../types';

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedTime: string;
  color: string;
  icon: string;
  imagePath: string;
  tierSequence: number[];
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'express-lane',
    title: 'Express Lane',
    subtitle: '30-minute crash course',
    description:
      'Get the essentials fast. A condensed overview of key concepts to get you trading quickly. Perfect for experienced investors new to options.',
    estimatedTime: '30-60 minutes',
    color: 'yellow',
    icon: '⚡',
    imagePath: '/assets/Cheetah Day Trader.png',
    tierSequence: [0.5, 3, 4, 5],
  },
  {
    id: 'beginner',
    title: 'Complete Beginner',
    subtitle: 'Never traded options before',
    description:
      'Start from the absolute basics. Learn what options are, how they work, and execute your first trade with confidence.',
    estimatedTime: '2-3 weeks',
    color: 'emerald',
    icon: '🌱',
    imagePath: '/assets/Capybara_Foliage_Refined.png',
    tierSequence: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'some-experience',
    title: 'Some Experience',
    subtitle: 'Bought/sold a few options',
    description:
      'You know the basics but want to go deeper. Learn proper strategy selection, risk management, and how to manage positions.',
    estimatedTime: '1-2 weeks',
    color: 'amber',
    icon: '🦜',
    imagePath: '/assets/Tucan_Female_Closeup.png',
    tierSequence: [3, 4, 5, 6, 7],
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: 'Comfortable with spreads',
    description:
      'Master advanced strategies. Dive into volatility plays, ratio spreads, earnings trades, and exotic structures.',
    estimatedTime: '3-4 weeks',
    color: 'purple',
    icon: '🦧',
    imagePath: '/assets/orangutan_old_money.png',
    tierSequence: [5, 6, 7],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'Expert in complex strategies',
    description:
      'Master the most sophisticated approaches. Deep dive into advanced volatility modeling, portfolio optimization, and professional-grade tactics.',
    estimatedTime: '4-6 weeks',
    color: 'red',
    icon: '🐆',
    imagePath: '/assets/Panther.png',
    tierSequence: [7],
  },
];

/**
 * Get the ordered list of strategy IDs for a given learning path
 * based on its tierSequence.
 */
export function getPathModules(
  path: LearningPath,
  strategies: Strategy[] = STRATEGIES,
): Strategy[] {
  const ordered: Strategy[] = [];

  for (const tier of path.tierSequence) {
    const tierStrategies = strategies.filter((s) => s.tier === tier);
    ordered.push(...tierStrategies);
  }

  return ordered;
}
