// Jungle Trading Academy - Badges and Levels

import { JungleBadge, JungleLevel } from '../types/jungle';

// ============ LEVEL DEFINITIONS ============

export const JUNGLE_LEVELS: JungleLevel[] = [
  { level: 1, name: 'Jungle Newcomer', xpRequired: 0, xpToNext: 500, icon: '🌱', rewards: ['Access to Sloth strategies', 'Basic jungle avatar'] },
  { level: 2, name: 'Trail Scout', xpRequired: 500, xpToNext: 1000, icon: '🥾', rewards: ['Trail Scout badge frame'] },
  { level: 3, name: 'Vine Swinger', xpRequired: 1500, xpToNext: 1500, icon: '🌿', rewards: ['Badger strategies unlocked', 'Vine Swinger title'] },
  { level: 4, name: 'Canopy Explorer', xpRequired: 3000, xpToNext: 2000, icon: '🌳', rewards: ['Canopy Explorer badge frame'] },
  { level: 5, name: 'Jungle Navigator', xpRequired: 5000, xpToNext: 3000, icon: '🧭', rewards: ['Monkey strategies unlocked', 'Jungle Navigator title'] },
  { level: 6, name: 'Apex Apprentice', xpRequired: 8000, xpToNext: 4000, icon: '🦅', rewards: ['Apex Apprentice badge frame'] },
  { level: 7, name: 'Trading Predator', xpRequired: 12000, xpToNext: 6000, icon: '🐆', rewards: ['Cheetah strategies unlocked', 'Trading Predator title'] },
  { level: 8, name: 'Jungle Master', xpRequired: 18000, xpToNext: 7000, icon: '👑', rewards: ['Jungle Master badge frame'] },
  { level: 9, name: 'Legendary Trader', xpRequired: 25000, xpToNext: 10000, icon: '⭐', rewards: ['Legendary badge frame', 'Animated avatar border'] },
  { level: 10, name: 'King of the Jungle', xpRequired: 35000, xpToNext: 0, icon: '🦁', rewards: ['Golden jungle theme', 'King of the Jungle crown'] },
];

// ============ BADGE DEFINITIONS ============

export const JUNGLE_BADGES: JungleBadge[] = [
  // Mastery
  { id: 'sloth-whisperer', name: 'Sloth Whisperer', description: 'Complete all Sloth strategies', icon: '🦥', rarity: 'rare', category: 'mastery', requirement: { type: 'complete_animal', animalId: 'sloth' }, xpReward: 500 },
  { id: 'badger-burrow-master', name: 'Badger Burrow Master', description: 'Complete all Badger strategies', icon: '🦡', rarity: 'rare', category: 'mastery', requirement: { type: 'complete_animal', animalId: 'badger' }, xpReward: 500 },
  { id: 'monkey-business-pro', name: 'Monkey Business Pro', description: 'Complete all Monkey strategies', icon: '🐒', rarity: 'rare', category: 'mastery', requirement: { type: 'complete_animal', animalId: 'monkey' }, xpReward: 500 },
  { id: 'cheetahs-chosen', name: "Cheetah's Chosen", description: 'Complete all Cheetah strategies', icon: '🐆', rarity: 'epic', category: 'mastery', requirement: { type: 'complete_animal', animalId: 'cheetah' }, xpReward: 750 },
  { id: 'jungle-king', name: 'Jungle King', description: 'Complete ALL animal curricula', icon: '👑', rarity: 'legendary', category: 'mastery', requirement: { type: 'complete_all_animals' }, xpReward: 1000 },

  // Achievement
  { id: 'first-steps', name: 'First Steps', description: 'Complete your first lesson', icon: '👣', rarity: 'common', category: 'achievement', requirement: { type: 'lessons_completed', count: 1 }, xpReward: 25 },
  { id: 'sharp-shooter', name: 'Sharp Shooter', description: 'Score 100% on any quiz', icon: '🎯', rarity: 'uncommon', category: 'achievement', requirement: { type: 'quiz_perfect', count: 1 }, xpReward: 50 },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Score 100% on 5 quizzes', icon: '💯', rarity: 'rare', category: 'achievement', requirement: { type: 'quiz_perfect', count: 5 }, xpReward: 200 },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Pass 10 quizzes', icon: '📝', rarity: 'uncommon', category: 'achievement', requirement: { type: 'quiz_pass', count: 10 }, xpReward: 100 },
  { id: 'scholar', name: 'Scholar', description: 'Complete 10 lessons', icon: '📚', rarity: 'uncommon', category: 'achievement', requirement: { type: 'lessons_completed', count: 10 }, xpReward: 100 },
  { id: 'xp-hunter', name: 'XP Hunter', description: 'Earn 5,000 XP', icon: '💫', rarity: 'uncommon', category: 'achievement', requirement: { type: 'xp_earned', amount: 5000 }, xpReward: 100 },
  { id: 'xp-master', name: 'XP Master', description: 'Earn 25,000 XP', icon: '🌟', rarity: 'epic', category: 'achievement', requirement: { type: 'xp_earned', amount: 25000 }, xpReward: 250 },
  { id: 'level-5', name: 'Rising Star', description: 'Reach Level 5', icon: '⬆️', rarity: 'uncommon', category: 'achievement', requirement: { type: 'level_reached', level: 5 }, xpReward: 100 },
  { id: 'level-10', name: 'Maximum Level', description: 'Reach Level 10', icon: '🏆', rarity: 'legendary', category: 'achievement', requirement: { type: 'level_reached', level: 10 }, xpReward: 500 },
  { id: 'graduate', name: 'Graduate', description: 'Complete all lessons from all 4 animal curricula', icon: '🎓', rarity: 'epic', category: 'achievement', requirement: { type: 'complete_all_animals' }, xpReward: 500 },

  // Mission Badges
  { id: 'mission-starter', name: 'Mission Starter', description: 'Complete your first daily mission', icon: '🎯', rarity: 'common', category: 'achievement', requirement: { type: 'custom', check: 'first_mission' }, xpReward: 25 },
  { id: 'mission-master', name: 'Mission Master', description: 'Complete 50 missions', icon: '🏹', rarity: 'rare', category: 'achievement', requirement: { type: 'custom', check: 'missions_50' }, xpReward: 200 },
  { id: 'weekly-warrior', name: 'Weekly Warrior', description: 'Complete all weekly missions in a single week', icon: '⚔️', rarity: 'uncommon', category: 'achievement', requirement: { type: 'custom', check: 'all_weekly_missions' }, xpReward: 100 },

  // Social Badges
  { id: 'first-share', name: 'Opening Trade', description: 'Share your first trade to the community feed', icon: '📤', rarity: 'common', category: 'achievement', requirement: { type: 'custom', check: 'first_trade_shared' }, xpReward: 25 },
  { id: 'popular-trader', name: 'Popular Trader', description: 'Receive 50 likes on your shared trades', icon: '❤️', rarity: 'rare', category: 'achievement', requirement: { type: 'custom', check: 'likes_received_50' }, xpReward: 150 },
  { id: 'trade-of-week', name: 'Trade of the Week', description: 'Have your trade featured as Trade of the Week', icon: '🌟', rarity: 'epic', category: 'achievement', requirement: { type: 'custom', check: 'trade_of_week' }, xpReward: 250 },
  { id: 'supportive-trader', name: 'Supportive Trader', description: 'Like 25 trades from other community members', icon: '👏', rarity: 'uncommon', category: 'achievement', requirement: { type: 'custom', check: 'likes_given_25' }, xpReward: 50 },

  // Tribe Badges
  { id: 'tribe-member', name: 'Tribe Member', description: 'Join one of the jungle tribes', icon: '🏕️', rarity: 'common', category: 'achievement', requirement: { type: 'custom', check: 'joined_tribe' }, xpReward: 25 },
  { id: 'tribe-contributor', name: 'Tribe Contributor', description: 'Contribute 1,000 XP to your tribe', icon: '🤝', rarity: 'uncommon', category: 'achievement', requirement: { type: 'custom', check: 'tribe_xp_1000' }, xpReward: 75 },
  { id: 'tribe-champion', name: 'Tribe Champion', description: 'Be part of the winning tribe at season end', icon: '🏆', rarity: 'epic', category: 'achievement', requirement: { type: 'custom', check: 'tribe_season_winner' }, xpReward: 300 },
  { id: 'tribe-legend', name: 'Tribe Legend', description: 'Contribute 10,000 XP to your tribe', icon: '👑', rarity: 'legendary', category: 'achievement', requirement: { type: 'custom', check: 'tribe_xp_10000' }, xpReward: 500 },

  // Streak
  { id: 'on-fire', name: 'On Fire', description: '5-day login streak', icon: '🔥', rarity: 'common', category: 'streak', requirement: { type: 'streak', days: 5 }, xpReward: 50 },
  { id: 'dedicated', name: 'Dedicated Learner', description: '14-day login streak', icon: '💪', rarity: 'uncommon', category: 'streak', requirement: { type: 'streak', days: 14 }, xpReward: 100 },
  { id: 'unstoppable', name: 'Unstoppable', description: '30-day login streak', icon: '⚡', rarity: 'rare', category: 'streak', requirement: { type: 'streak', days: 30 }, xpReward: 300 },
  { id: 'legendary-streak', name: 'Legendary Consistency', description: '100-day login streak', icon: '🌈', rarity: 'legendary', category: 'streak', requirement: { type: 'streak', days: 100 }, xpReward: 1000 },

  // Special
  { id: 'night-owl', name: 'Night Owl', description: 'Complete a lesson after 10 PM', icon: '🦉', rarity: 'uncommon', category: 'special', requirement: { type: 'time_of_day', hour: 22, comparison: 'after' }, xpReward: 50 },
  { id: 'early-bird', name: 'Early Bird', description: 'Complete a lesson before 7 AM', icon: '🐦', rarity: 'uncommon', category: 'special', requirement: { type: 'time_of_day', hour: 7, comparison: 'before' }, xpReward: 50 },
  { id: 'risk-profiled', name: 'Know Thyself', description: 'Complete the risk assessment', icon: '🪞', rarity: 'common', category: 'special', requirement: { type: 'custom', check: 'assessment_completed' }, xpReward: 50 },

  // Hidden
  { id: 'speed-runner', name: 'Speed Runner', description: 'Complete an animal curriculum in one session', icon: '🏃', rarity: 'epic', category: 'hidden', requirement: { type: 'custom', check: 'speed_run' }, xpReward: 300 },
  { id: 'explorer', name: 'Jungle Explorer', description: 'Visit every section', icon: '🗺️', rarity: 'uncommon', category: 'hidden', requirement: { type: 'custom', check: 'visited_all_sections' }, xpReward: 75 },
  { id: 'lions-roar', name: "Lion's Roar", description: '???', icon: '🦁', rarity: 'legendary', category: 'hidden', requirement: { type: 'custom', check: 'secret_lion' }, xpReward: 500 },
  { id: 'comeback-kid', name: 'Comeback Kid', description: 'Pass a quiz after failing 3 times', icon: '💫', rarity: 'rare', category: 'hidden', requirement: { type: 'custom', check: 'comeback' }, xpReward: 150 },
  { id: 'all-badges', name: 'Badge Collector', description: 'Earn all other badges (excluding hidden)', icon: '🏅', rarity: 'legendary', category: 'hidden', requirement: { type: 'custom', check: 'all_badges' }, xpReward: 1000 },
  { id: 'mission-streak-5', name: 'Mission Streak', description: '5-day mission completion streak', icon: '🔥', rarity: 'uncommon', category: 'streak', requirement: { type: 'custom', check: 'mission_streak_5' }, xpReward: 75 },
];

// Helper functions
export const getLevelForXP = (xp: number): JungleLevel => {
  for (let i = JUNGLE_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= JUNGLE_LEVELS[i].xpRequired) {
      return JUNGLE_LEVELS[i];
    }
  }
  return JUNGLE_LEVELS[0];
};

export const getXPProgress = (xp: number): { current: number; needed: number; percentage: number } => {
  const level = getLevelForXP(xp);
  const nextLevelIndex = JUNGLE_LEVELS.findIndex(l => l.level === level.level) + 1;
  if (nextLevelIndex >= JUNGLE_LEVELS.length) {
    return { current: xp, needed: xp, percentage: 100 };
  }
  const nextLevel = JUNGLE_LEVELS[nextLevelIndex];
  const xpIntoLevel = xp - level.xpRequired;
  const xpNeededForNext = nextLevel.xpRequired - level.xpRequired;
  return {
    current: xpIntoLevel,
    needed: xpNeededForNext,
    percentage: Math.round((xpIntoLevel / xpNeededForNext) * 100),
  };
};

export const getBadgeById = (id: string): JungleBadge | undefined => JUNGLE_BADGES.find(b => b.id === id);
export const getBadgesByCategory = (category: string): JungleBadge[] => JUNGLE_BADGES.filter(b => b.category === category);
export const getBadgesByRarity = (rarity: string): JungleBadge[] => JUNGLE_BADGES.filter(b => b.rarity === rarity);
export const getVisibleBadges = (): JungleBadge[] => JUNGLE_BADGES.filter(b => b.category !== 'hidden');
export const getHiddenBadges = (): JungleBadge[] => JUNGLE_BADGES.filter(b => b.category === 'hidden');

export const RARITY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  common: { bg: 'bg-zinc-500/20', border: 'border-zinc-500', text: 'text-zinc-400' },
  uncommon: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400' },
  rare: { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400' },
  epic: { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400' },
  legendary: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400' },
};
