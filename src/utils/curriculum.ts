import { STRATEGIES } from '../data/strategies';
import { TIER_INFO } from '../data/tierInfo';

// Module definitions mapping tiers to curriculum modules
export interface Module {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tiers: number[];
}

export const MODULES: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    emoji: '🌱',
    description: 'What are options? Core vocabulary, mindset, and the rules of the jungle.',
    tiers: [0, 0.5, 2],
  },
  {
    id: 'market-structure',
    title: 'Market Structure',
    emoji: '🗺️',
    description: 'Time frames, support/resistance, AVWAP, and avoiding biases.',
    tiers: [1],
  },
  {
    id: 'core-strategies',
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
    id: 'time-skew',
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
  {
    id: 'event-horizons',
    title: 'Event Horizons',
    emoji: '🌀',
    description: 'Earnings plays, binary events, and how the pros trade them.',
    tiers: [8],
  },
  {
    id: 'tools',
    title: 'Strategy Tools',
    emoji: '🛠️',
    description: 'Calculators, screeners, journal — your trading toolkit.',
    tiers: [9],
  },
  {
    id: 'lets-play',
    title: "Let's Play",
    emoji: '🎮',
    description: 'Put it all together with simulated trades and challenges.',
    tiers: [10],
  },
];

export function getStrategiesForModule(moduleId: string) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return [];
  return STRATEGIES.filter(s => mod.tiers.includes(s.tier));
}

export function getStrategiesForTier(tier: number) {
  return STRATEGIES.filter(s => s.tier === tier);
}

export function getTierInfo(tier: number) {
  return TIER_INFO.find(t => t.tier === tier);
}

export function getTierColor(tier: number): string {
  const colors: Record<string, string> = {
    slate: 'text-slate-400 border-slate-600 bg-slate-900',
    amber: 'text-amber-400 border-amber-600 bg-amber-950',
    blue: 'text-blue-400 border-blue-600 bg-blue-950',
    emerald: 'text-emerald-400 border-emerald-600 bg-emerald-950',
    cyan: 'text-cyan-400 border-cyan-600 bg-cyan-950',
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
    blue: 'bg-blue-900/50 text-blue-400',
    emerald: 'bg-emerald-900/50 text-emerald-400',
    cyan: 'bg-cyan-900/50 text-cyan-400',
    purple: 'bg-purple-900/50 text-purple-400',
    pink: 'bg-pink-900/50 text-pink-400',
    orange: 'bg-orange-900/50 text-orange-400',
    violet: 'bg-violet-900/50 text-violet-400',
    rose: 'bg-rose-900/50 text-rose-400',
  };
  const info = getTierInfo(tier);
  return colors[info?.color || 'slate'] || colors.slate;
}
