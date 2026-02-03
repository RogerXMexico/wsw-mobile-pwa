import { Strategy } from '../../types';

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

// Get a single strategy by ID - loads only the necessary tier
export const getStrategyById = async (id: string): Promise<Strategy | undefined> => {
    // Map strategy ID prefixes to tiers for smarter loading
    const tierMap: Record<string, number> = {
        'foundations': 0, 'what-are-options': 0, 'calls-vs-puts': 0, 'why-trade-options': 0,
        'express': 0.5, 'long-call-express': 0.5, 'covered-call-express': 0.5,
        'market': 1, 'time-frames': 1, 'support-resistance': 1,
        'risk': 2, 'greeks': 2, 'position-sizing': 2,
        'strike': 3.5, 'exit': 3.5, 'first-trade': 3.5,
    };
    
    // Try to infer tier from prefix
    for (const [prefix, tier] of Object.entries(tierMap)) {
        if (id.startsWith(prefix)) {
            const strategies = await getStrategiesByTier(tier);
            const found = strategies.find(s => s.id === id);
            if (found) return found;
        }
    }
    
    // Fallback: search all tiers (still lazy, but sequential)
    const allTiers = [0, 0.5, 1, 2, 3, 3.5, 4, 5, 6, 7, 9, 10];
    for (const tier of allTiers) {
        const strategies = await getStrategiesByTier(tier);
        const found = strategies.find(s => s.id === id);
        if (found) return found;
    }
    return undefined;
};

// Get all trading strategies (tiers 3-7) lazily - for encyclopedia
export const getAllTradingStrategiesLazy = async (): Promise<Strategy[]> => {
    return getStrategiesForTiers([3, 4, 5, 6, 7]);
};

// Get ALL strategies lazily - use only when absolutely needed
export const getAllStrategiesLazy = async (): Promise<Strategy[]> => {
    return getStrategiesForTiers([0, 0.5, 1, 2, 3, 3.5, 4, 5, 6, 7, 9, 10]);
};

// DEPRECATED: Avoid using this - loads everything eagerly
// Kept for backwards compatibility during migration
// TODO: Remove once all consumers migrated to lazy functions
export const STRATEGIES: Strategy[] = [];
// This will be populated at runtime for backward compat if needed

// Sync fallback for components that haven't migrated yet
// This is a temporary shim that will log a warning
let _strategiesCache: Strategy[] | null = null;
export const getStrategiesSync = (): Strategy[] => {
    if (_strategiesCache) return _strategiesCache;
    console.warn('[DEPRECATED] getStrategiesSync used - migrate to async lazy loading');
    return [];
};

// Initialize the cache for legacy code (run this once at app startup if needed)
export const initStrategiesCache = async (): Promise<void> => {
    if (_strategiesCache) return;
    _strategiesCache = await getAllStrategiesLazy();
    // Also populate STRATEGIES for backwards compat
    (STRATEGIES as Strategy[]).push(..._strategiesCache);
};
