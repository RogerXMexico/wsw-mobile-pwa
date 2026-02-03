import { Strategy } from '../../types';
import { TIER_0_STRATEGIES } from './tier0';
import { TIER_0_5_STRATEGIES } from './tier0_5';
import { TIER_1_STRATEGIES } from './tier1';
import { TIER_2_STRATEGIES } from './tier2';
import { TIER_3_STRATEGIES } from './tier3';
import { TIER_3_5_STRATEGIES } from './tier3_5';
import { TIER_4_STRATEGIES } from './tier4';
import { TIER_5_STRATEGIES } from './tier5';
import { TIER_6_STRATEGIES } from './tier6';
import { TIER_7_STRATEGIES } from './tier7';
import { TIER_9_STRATEGIES } from './tier9';
import { TIER_10_STRATEGIES } from './tier10';

// Full STRATEGIES array for backwards compatibility
// WARNING: This imports ALL strategies eagerly. For lazy loading, use getStrategiesByTier()
export const STRATEGIES: Strategy[] = [
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

// Lazy loading by tier - use this for code splitting
export const getStrategiesByTier = async (tier: number): Promise<Strategy[]> => {
    switch (tier) {
        case 0: return (await import('./tier0')).TIER_0_STRATEGIES;
        case 0.5: return (await import('./tier0_5')).TIER_0_5_STRATEGIES;
        case 1: return (await import('./tier1')).TIER_1_STRATEGIES;
        case 2: return (await import('./tier2')).TIER_2_STRATEGIES;
        case 3: return (await import('./tier3')).TIER_3_STRATEGIES;
        case 3.5: return (await import('./tier3_5')).TIER_3_5_STRATEGIES;
        case 4: return (await import('./tier4')).TIER_4_STRATEGIES;
        case 5: return (await import('./tier5')).TIER_5_STRATEGIES;
        case 6: return (await import('./tier6')).TIER_6_STRATEGIES;
        case 7: return (await import('./tier7')).TIER_7_STRATEGIES;
        case 9: return (await import('./tier9')).TIER_9_STRATEGIES;
        case 10: return (await import('./tier10')).TIER_10_STRATEGIES;
        default: return [];
    }
};

// Get all strategies for multiple tiers lazily  
export const getStrategiesForTiers = async (tiers: number[]): Promise<Strategy[]> => {
    const results = await Promise.all(tiers.map(t => getStrategiesByTier(t)));
    return results.flat();
};

// Re-export individual tier arrays
export { TIER_0_STRATEGIES } from './tier0';
export { TIER_0_5_STRATEGIES } from './tier0_5';
export { TIER_1_STRATEGIES } from './tier1';
export { TIER_2_STRATEGIES } from './tier2';
export { TIER_3_STRATEGIES } from './tier3';
export { TIER_3_5_STRATEGIES } from './tier3_5';
export { TIER_4_STRATEGIES } from './tier4';
export { TIER_5_STRATEGIES } from './tier5';
export { TIER_6_STRATEGIES } from './tier6';
export { TIER_7_STRATEGIES } from './tier7';
export { TIER_9_STRATEGIES } from './tier9';
export { TIER_10_STRATEGIES } from './tier10';
