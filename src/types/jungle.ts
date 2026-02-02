// Jungle Trading Academy - Type Definitions

export type RiskProfile =
  | 'turtle'
  | 'owl'
  | 'cheetah'
  | 'fox'
  | 'retriever'
  | 'sloth'
  | 'badger'
  | 'monkey'
  | 'bull'
  | 'octopus'
  | 'bear'
  | 'dolphin'
  | 'chameleon' // Event Horizons mentor
  | 'wolf'
  | 'kangaroo'
  | 'panda'
  | 'tiger';

export type RiskLevel = 'conservative' | 'moderate' | 'aggressive' | 'very-aggressive';

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type JungleViewMode =
  | 'hub'
  | 'assessment'
  | 'animal-detail'
  | 'strategy-lesson'
  | 'leaderboard'
  | 'badges'
  | 'mentors'
  | 'daily-missions'
  | 'jungle-tribes'
  | 'trading-feed'
  | 'challenge-paths'
  | 'profile';

// ============ Animal Definitions ============

export interface JungleAnimal {
  id: RiskProfile;
  name: string;
  characterName: string;
  emoji: string;
  riskLevel: RiskLevel;
  riskStars: 1 | 2 | 3 | 4 | 5;
  personality: string;
  catchphrase: string;
  teachingStyle: string;
  philosophy: string;
  avatarPath: string | null; // null if not yet uploaded
  colors: AnimalColors;
  dialogues: AnimalDialogues;
  favoriteStrategies: string[]; // Array of strategy IDs this animal teaches
  unlocked: boolean; // Tiger has warning but is unlocked
  warningMessage?: string; // For Tiger
  collaboratingMentors?: RiskProfile[]; // For bridge mentors like Chameleon
}

export interface AnimalColors {
  primary: string;
  accent: string;
  bg: string;
  glow: string;
}

export interface AnimalDialogues {
  greeting: string;
  encouragement: string;
  quizCorrect: string;
  quizIncorrect: string;
  lessonComplete: string;
  strategyComplete: string;
  allComplete: string;
}

// ============ Strategy Definitions ============

export interface JungleStrategy {
  id: string;
  name: string;
  animalId: RiskProfile;
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
  overview: string;
  keyPoints: string[];
  riskProfile: string;
  maxProfit: string;
  maxLoss: string;
  breakeven: string;
  bestFor: string;
  avoidWhen: string;
  example: StrategyExample;
  tips: string[];
  commonMistakes: string[];
  relatedStrategies: string[];
}

export interface StrategyExample {
  scenario: string;
  setup: string;
  outcome: string;
  numbers: {
    stockPrice: number;
    strikePrice: number;
    premium: number;
    expiration: string;
    result: string;
  };
}

// ============ Quiz Definitions ============

export interface JungleQuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'scenario';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
  difficulty: 1 | 2 | 3;
}

export interface RiskAssessmentQuestion {
  id: string;
  question: string;
  options: RiskAssessmentOption[];
}

export interface RiskAssessmentOption {
  text: string;
  scores: Partial<Record<RiskProfile, number>>;
}

export interface RiskAssessmentResult {
  primary: RiskProfile;
  secondary: RiskProfile;
  confidence: number;
  scores: Record<RiskProfile, number>;
  recommendation: string;
}

// ============ Progress & Gamification ============

export interface JungleProgress {
  xp: number;
  level: number;
  completedLessons: string[];
  completedStrategies: string[];
  quizScores: Record<string, JungleQuizScore>;
  earnedBadges: string[];
  unlockedItems: string[];
  streakDays: number;
  lastLoginDate: string;
  totalLoginDays: number;
  riskProfile: RiskProfile | null;
  secondaryProfile: RiskProfile | null;
  assessmentCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JungleQuizScore {
  score: number;
  total: number;
  passed: boolean;
  attempts: number;
  bestScore: number;
  completedAt: string;
}

export interface JungleLevel {
  level: number;
  name: string;
  xpRequired: number;
  xpToNext: number;
  icon: string;
  rewards: string[];
}

// ============ Badges & Achievements ============

export interface JungleBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  category: 'mastery' | 'achievement' | 'streak' | 'special' | 'hidden';
  requirement: BadgeRequirement;
  xpReward: number;
}

export type BadgeRequirement =
  | { type: 'complete_animal'; animalId: RiskProfile }
  | { type: 'complete_strategy'; strategyId: string }
  | { type: 'complete_all_animals' }
  | { type: 'quiz_perfect'; count: number }
  | { type: 'quiz_pass'; count: number }
  | { type: 'streak'; days: number }
  | { type: 'xp_earned'; amount: number }
  | { type: 'level_reached'; level: number }
  | { type: 'lessons_completed'; count: number }
  | { type: 'time_of_day'; hour: number; comparison: 'before' | 'after' }
  | { type: 'custom'; check: string };

// ============ Leaderboard ============

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  xp: number;
  level: number;
  badgeCount: number;
  primaryAnimal: RiskProfile | null;
  avatarUrl?: string;
  isCurrentUser?: boolean;
  updatedAt: string;
}

export interface LeaderboardCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  sortField: 'xp' | 'level' | 'badgeCount' | 'streakDays';
  timeframe: 'all_time' | 'weekly' | 'monthly';
}

// ============ XP Sources ============

export interface XPEvent {
  source: XPSource;
  amount: number;
  timestamp: string;
  details?: string;
}

export type XPSource =
  | 'lesson_complete'
  | 'quiz_pass_first'
  | 'quiz_pass_retry'
  | 'quiz_perfect'
  | 'strategy_complete'
  | 'animal_complete'
  | 'all_complete'
  | 'daily_login'
  | 'streak_bonus'
  | 'badge_earned'
  | 'mission_complete'
  | 'mission_streak_bonus'
  | 'trade_shared'
  | 'trade_liked'
  | 'tribe_bonus';

export const XP_VALUES: Record<XPSource, number> = {
  lesson_complete: 50,
  quiz_pass_first: 100,
  quiz_pass_retry: 50,
  quiz_perfect: 50, // bonus on top of pass
  strategy_complete: 75,
  animal_complete: 500,
  all_complete: 1000,
  daily_login: 25,
  streak_bonus: 10, // per day in streak
  badge_earned: 25,
  mission_complete: 50,
  mission_streak_bonus: 25,
  trade_shared: 25,
  trade_liked: 5,
  tribe_bonus: 10,
};

// ============ UI State ============

export interface JungleUIState {
  currentView: JungleViewMode;
  selectedAnimal: RiskProfile | null;
  selectedStrategy: string | null;
  showAchievementModal: boolean;
  pendingAchievement: JungleBadge | null;
  isLoading: boolean;
  error: string | null;
}

// ============ Supabase Types ============

export interface SupabaseJungleProgress {
  user_id: string;
  xp: number;
  level: number;
  completed_lessons: string[];
  completed_strategies: string[];
  quiz_scores: Record<string, JungleQuizScore>;
  earned_badges: string[];
  unlocked_items: string[];
  streak_days: number;
  last_login_date: string;
  total_login_days: number;
  risk_profile: RiskProfile | null;
  secondary_profile: RiskProfile | null;
  assessment_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupabaseLeaderboardEntry {
  user_id: string;
  display_name: string;
  xp: number;
  level: number;
  badge_count: number;
  primary_animal: RiskProfile | null;
  avatar_url: string | null;
  updated_at: string;
}
