import { STRATEGIES } from '../data/strategies';

export interface LearningPath {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    startTier: number;
    tierSequence: number[]; // Recommended tier progression
    estimatedTime: string;
    color: string;
    icon: string;
}

export interface PathModule {
    id: string;
    name: string;
    tier: number;
    tierName: string;
    isQuiz?: boolean;
    isInteractive?: boolean;
}

export interface PathProgress {
    pathId: string;
    startedAt: string;
    completedModules: string[];
    currentTier: number;
    percentComplete: number;
    nextRecommendedModule: string | null;
}

// Learning path definitions
export const LEARNING_PATHS: LearningPath[] = [
    {
        id: 'beginner',
        title: 'Complete Beginner',
        subtitle: 'Never traded options before',
        description: 'Start from the absolute basics. Learn what options are, how they work, and execute your first trade with confidence.',
        startTier: 0,
        tierSequence: [0, 1, 2, 3],
        estimatedTime: '2-3 weeks',
        color: 'emerald',
        icon: 'BookOpen'
    },
    {
        id: 'express-lane',
        title: 'Express Lane',
        subtitle: '30-minute crash course',
        description: 'Get the essentials fast. A condensed overview of key concepts to get you trading quickly. Perfect for experienced investors new to options.',
        startTier: 0.5,
        tierSequence: [0.5],
        estimatedTime: '30-60 minutes',
        color: 'yellow',
        icon: 'Zap'
    },
    {
        id: 'some-experience',
        title: 'Some Experience',
        subtitle: 'Bought/sold a few options',
        description: 'You know the basics but want to go deeper. Learn proper strategy selection, risk management, and how to manage positions.',
        startTier: 1,
        tierSequence: [1, 2, 3, 4],
        estimatedTime: '1-2 weeks',
        color: 'amber',
        icon: 'Activity'
    },
    {
        id: 'intermediate',
        title: 'Intermediate',
        subtitle: 'Comfortable with spreads',
        description: 'Master advanced strategies. Dive into volatility plays, ratio spreads, earnings trades, and exotic structures.',
        startTier: 4,
        tierSequence: [4, 5, 6],
        estimatedTime: '3-4 weeks',
        color: 'violet',
        icon: 'Trophy'
    },
    {
        id: 'advanced',
        title: 'Advanced',
        subtitle: 'Expert in complex strategies',
        description: 'Master the most sophisticated approaches. Deep dive into advanced volatility modeling, portfolio optimization, and professional-grade tactics.',
        startTier: 7,
        tierSequence: [7, 8, 9, 10],
        estimatedTime: '4-6 weeks',
        color: 'red',
        icon: 'Award'
    }
];

/**
 * Get all modules for a specific learning path
 */
export const getModulesForPath = (pathId: string): PathModule[] => {
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) return [];

    const modules: PathModule[] = [];

    // Get all modules from the recommended tier sequence
    path.tierSequence.forEach(tier => {
        const tierModules = STRATEGIES.filter(s => s.tier === tier)
            .map(s => ({
                id: s.id,
                name: s.name,
                tier: s.tier,
                tierName: s.tierName,
                isQuiz: s.id.includes('quiz'),
                isInteractive: s.id.includes('tutorial') || s.id.includes('simulator') || s.id.includes('calculator')
            }));

        modules.push(...tierModules);
    });

    return modules;
};

/**
 * Get the next recommended module for a student on a learning path
 */
export const getNextRecommendedModule = (
    pathId: string,
    completedModules: string[]
): PathModule | null => {
    const modules = getModulesForPath(pathId);

    // Find first incomplete module in sequence
    for (const module of modules) {
        if (!completedModules.includes(module.id)) {
            return module;
        }
    }

    // All modules complete
    return null;
};

/**
 * Calculate progress for a specific learning path
 */
export const calculatePathProgress = (
    pathId: string,
    completedModules: string[]
): PathProgress => {
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) {
        return {
            pathId,
            startedAt: new Date().toISOString(),
            completedModules: [],
            currentTier: 0,
            percentComplete: 0,
            nextRecommendedModule: null
        };
    }

    const allModules = getModulesForPath(pathId);
    const completedInPath = completedModules.filter(moduleId =>
        allModules.some(m => m.id === moduleId)
    );

    const nextModule = getNextRecommendedModule(pathId, completedModules);

    return {
        pathId,
        startedAt: localStorage.getItem('wsw-path-started-at') || new Date().toISOString(),
        completedModules: completedInPath,
        currentTier: nextModule?.tier || path.tierSequence[path.tierSequence.length - 1],
        percentComplete: Math.round((completedInPath.length / allModules.length) * 100),
        nextRecommendedModule: nextModule?.id || null
    };
};

/**
 * Get first module for a learning path (starting point)
 */
export const getPathStartModule = (pathId: string): PathModule | null => {
    const modules = getModulesForPath(pathId);
    return modules.length > 0 ? modules[0] : null;
};

/**
 * Check if a module is part of a learning path
 */
export const isModuleInPath = (pathId: string, moduleId: string): boolean => {
    const modules = getModulesForPath(pathId);
    return modules.some(m => m.id === moduleId);
};

/**
 * Get tier progress within a learning path
 */
export const getTierProgressInPath = (
    pathId: string,
    tier: number,
    completedModules: string[]
): { completed: number; total: number; percent: number } => {
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path || !path.tierSequence.includes(tier)) {
        return { completed: 0, total: 0, percent: 0 };
    }

    const tierModules = STRATEGIES.filter(s => s.tier === tier);
    const completed = tierModules.filter(m => completedModules.includes(m.id)).length;

    return {
        completed,
        total: tierModules.length,
        percent: tierModules.length > 0 ? Math.round((completed / tierModules.length) * 100) : 0
    };
};
