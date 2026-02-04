import { getStrategiesForTiers, getAllTradingStrategiesLazy, getAllStrategiesLazy } from '../data/strategies';
import { TIER_INFO } from '../data/tierInfo';
import { Strategy } from '../types';

// Import all tiers eagerly for sync access (backwards compatibility)
import { TIER_0_STRATEGIES } from '../data/strategies/tier0';
import { TIER_0_5_STRATEGIES } from '../data/strategies/tier0_5';
import { TIER_1_STRATEGIES } from '../data/strategies/tier1';
import { TIER_2_STRATEGIES } from '../data/strategies/tier2';
import { TIER_3_STRATEGIES } from '../data/strategies/tier3';
import { TIER_3_5_STRATEGIES } from '../data/strategies/tier3_5';
import { TIER_4_STRATEGIES } from '../data/strategies/tier4';
import { TIER_5_STRATEGIES } from '../data/strategies/tier5';
import { TIER_6_STRATEGIES } from '../data/strategies/tier6';
import { TIER_7_STRATEGIES } from '../data/strategies/tier7';
import { TIER_9_STRATEGIES } from '../data/strategies/tier9';
import { TIER_10_STRATEGIES } from '../data/strategies/tier10';

// Eagerly populated cache for sync access
const _strategiesCache: Strategy[] = [
    ...TIER_0_STRATEGIES,
    ...TIER_0_5_STRATEGIES,
    ...TIER_1_STRATEGIES,
    ...TIER_2_STRATEGIES,
    ...TIER_3_STRATEGIES,
    ...TIER_3_5_STRATEGIES,
    ...TIER_4_STRATEGIES,
    ...TIER_5_STRATEGIES,
    ...TIER_6_STRATEGIES,
    ...TIER_7_STRATEGIES,
    ...TIER_9_STRATEGIES,
    ...TIER_10_STRATEGIES,
];

const getStrategiesCache = async (): Promise<Strategy[]> => {
    return _strategiesCache;
};

// ============ TAB 1: RULES OF THE JUNGLE ============
// Educational foundations — learn before you trade

export interface Section {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tiers: number[];
}

export const RULES_SECTIONS: Section[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    emoji: '🌱',
    description: 'What are options? Core vocabulary, mindset, and the rules.',
    tiers: [0],
  },
  {
    id: 'market-structure',
    title: 'Market Structure',
    emoji: '🗺️',
    description: 'Time frames, support/resistance, AVWAP, and avoiding biases.',
    tiers: [1],
  },
  {
    id: 'risk',
    title: 'Risk Management',
    emoji: '🛡️',
    description: 'The Greeks, pricing, IV, and position sizing fundamentals.',
    tiers: [2],
  },
  {
    id: 'express-lane',
    title: 'Express Lane',
    emoji: '🚀',
    description: 'Quick-start: the 4 essential strategies to get trading.',
    tiers: [0.5],
  },
];

// ============ TAB 2: STRATEGIES ============
// All trading strategies organized by complexity

export const STRATEGY_SECTIONS: Section[] = [
  {
    id: 'mindset',
    title: 'Proper Mindset',
    emoji: '🧠',
    description: 'Strike selection, exits, your first trade, and the art of patience.',
    tiers: [3.5],
  },
  {
    id: 'anchors',
    title: 'Core Strategies',
    emoji: '⚓',
    description: 'The anchor trades: Long Call, Covered Call, CSP, Protective Put, Collar.',
    tiers: [3],
  },
  {
    id: 'verticals',
    title: 'Verticals',
    emoji: '📐',
    description: 'Bull/Bear spreads — defined risk, directional trades.',
    tiers: [4],
  },
  {
    id: 'volatility',
    title: 'Volatility',
    emoji: '🌪️',
    description: 'Straddles, Strangles, Iron Condors, Iron Butterflies.',
    tiers: [5],
  },
  {
    id: 'time-diagonals',
    title: 'Time & Diagonals',
    emoji: '⏳',
    description: 'Calendar spreads, PMCC, Diagonals, Double Diagonals.',
    tiers: [6],
  },
  {
    id: 'advanced',
    title: 'Advanced & Exotic',
    emoji: '🔥',
    description: 'Ratio spreads, Butterflies, Jade Lizard, Synthetics, ZEBRA.',
    tiers: [7],
  },
];

// ============ TAB 3: TOOLS ============
// Tier 9 strategy tools

export const TOOLS_SECTION: Section = {
  id: 'tools',
  title: 'Strategy Tools',
  emoji: '🛠️',
  description: 'Calculators, screeners, journal — your trading toolkit.',
  tiers: [9],
};

// ============ TAB 4: SOCIAL ============
// Tier 10 social/gamification

export const SOCIAL_SECTION: Section = {
  id: 'social',
  title: 'The Arena',
  emoji: '🏟️',
  description: 'Live trades, competitions, tribes, and daily missions.',
  tiers: [10],
};

// ============ HELPERS ============

// Sync versions - work with eagerly populated cache
export function getStrategiesForSection(section: Section): Strategy[] {
  return _strategiesCache.filter(s => section.tiers.includes(s.tier));
}

export function getStrategiesForTier(tier: number): Strategy[] {
  return _strategiesCache.filter(s => s.tier === tier);
}

export function getAllTradingStrategies(): Strategy[] {
  return _strategiesCache.filter(s => [3, 4, 5, 6, 7].includes(s.tier));
}

export function getAllStrategies(): Strategy[] {
  return _strategiesCache;
}

export function getTierInfo(tier: number) {
  return TIER_INFO.find(t => t.tier === tier);
}

export function getTierColor(tier: number): string {
  const colors: Record<string, string> = {
    slate: 'text-slate-400 border-slate-600 bg-slate-900',
    amber: 'text-amber-400 border-amber-600 bg-amber-950',
    cyan: 'text-cyan-400 border-cyan-600 bg-cyan-950',
    emerald: 'text-emerald-400 border-emerald-600 bg-emerald-950',
    purple: 'text-purple-400 border-purple-600 bg-purple-950',
    pink: 'text-pink-400 border-pink-600 bg-pink-950',
    orange: 'text-orange-400 border-orange-600 bg-orange-950',
    violet: 'text-violet-400 border-violet-600 bg-violet-950',
    rose: 'text-rose-400 border-rose-600 bg-rose-950',
  };
  const info = getTierInfo(tier);
  return colors[info?.color || 'slate'] || colors.slate;
}

export function getTierBadgeColor(tier: number): string {
  const colors: Record<string, string> = {
    slate: 'bg-slate-800 text-slate-300',
    amber: 'bg-amber-900/50 text-amber-400',
    cyan: 'bg-cyan-900/50 text-cyan-400',
    emerald: 'bg-emerald-900/50 text-emerald-400',
    purple: 'bg-purple-900/50 text-purple-400',
    pink: 'bg-pink-900/50 text-pink-400',
    orange: 'bg-orange-900/50 text-orange-400',
    violet: 'bg-violet-900/50 text-violet-400',
    rose: 'bg-rose-900/50 text-rose-400',
  };
  const info = getTierInfo(tier);
  return colors[info?.color || 'slate'] || colors.slate;
}

// ============ LAZY LOADING VERSIONS ============

export async function getStrategiesForSectionLazy(section: Section): Promise<Strategy[]> {
  return getStrategiesForTiers(section.tiers);
}

export async function getAllTradingStrategiesLazyFromCurriculum(): Promise<Strategy[]> {
  return getAllTradingStrategiesLazy();
}
