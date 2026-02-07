import { useMemo } from 'react';
import { ArrowLeft, TrendingUp, CheckCircle, Lock, ChevronRight } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

// Maps step names to strategy IDs from JUNGLE_STRATEGIES
const STEP_TO_STRATEGY_ID: Record<string, string[]> = {
  // Income Generator path
  'Covered Calls': ['sloth-covered-call'],
  'Cash-Secured Puts': ['sloth-cash-secured-put'],
  'Iron Condors': ['badger-iron-condor'],
  'Jade Lizards': ['badger-jade-lizard'],
  'Short Strangles': ['badger-short-strangle'],
  // Directional Trader path
  'Long Calls/Puts': ['monkey-long-call', 'monkey-long-put'],
  'Vertical Spreads': ['badger-bull-put-spread', 'badger-bear-call-spread', 'monkey-debit-spread'],
  'Backspreads': ['cheetah-call-backspread', 'cheetah-put-backspread'],
  'Synthetic Futures': ['cheetah-synthetic-long', 'cheetah-synthetic-short'],
  'LEAPS': ['sloth-leaps-call', 'sloth-leaps-put'],
  // Volatility Hunter path
  'Straddles': ['monkey-long-straddle', 'badger-short-straddle'],
  'Strangles': ['monkey-long-strangle', 'badger-short-strangle'],
  'Butterflies': ['owl-long-butterfly', 'owl-iron-butterfly'],
  'Calendars': ['owl-calendar-spread'],
  'Diagonals': ['owl-diagonal-spread'],
  // Risk Manager path
  'Protective Puts': ['sloth-protective-put'],
  'Collars': ['sloth-collar'],
  'Put Spreads': ['badger-bear-put-spread'],
  'Ratio Hedges': ['cheetah-ratio-put-spread'],
  'Portfolio Insurance': ['cheetah-portfolio-insurance'],
};

// Check if a step is completed (ANY mapped strategy is done)
function isStepCompleted(stepName: string, completedStrategies: string[]): boolean {
  const strategyIds = STEP_TO_STRATEGY_ID[stepName] || [];
  return strategyIds.some(id => completedStrategies.includes(id));
}

// Count completed steps in a path
function countCompletedSteps(steps: string[], completedStrategies: string[]): number {
  return steps.filter(step => isStepCompleted(step, completedStrategies)).length;
}

const PATHS = [
  {
    id: 'income',
    name: 'Income Generator',
    emoji: '💰',
    color: '#22c55e',
    desc: 'Master premium-selling strategies',
    steps: ['Covered Calls', 'Cash-Secured Puts', 'Iron Condors', 'Jade Lizards', 'Short Strangles'],
  },
  {
    id: 'directional',
    name: 'Directional Trader',
    emoji: '🎯',
    color: '#22d3ee',
    desc: 'Learn to profit from big moves',
    steps: ['Long Calls/Puts', 'Vertical Spreads', 'Backspreads', 'Synthetic Futures', 'LEAPS'],
  },
  {
    id: 'volatility',
    name: 'Volatility Hunter',
    emoji: '🌪️',
    color: '#a855f7',
    desc: 'Trade volatility like a pro',
    steps: ['Straddles', 'Strangles', 'Butterflies', 'Calendars', 'Diagonals'],
  },
  {
    id: 'hedger',
    name: 'Risk Manager',
    emoji: '🛡️',
    color: '#f59e0b',
    desc: 'Protect your portfolio like a bear',
    steps: ['Protective Puts', 'Collars', 'Put Spreads', 'Ratio Hedges', 'Portfolio Insurance'],
  },
];

export default function ChallengePaths() {
  const { setCurrentView, progress } = useJungle();
  const { completedStrategies, quizScores, streakDays } = progress;

  // Compute paths with real progress data
  const pathsWithProgress = useMemo(() => {
    return PATHS.map(path => ({
      ...path,
      completed: countCompletedSteps(path.steps, completedStrategies),
    }));
  }, [completedStrategies]);

  // Performance summary stats
  const stats = useMemo(() => {
    const totalSteps = PATHS.reduce((sum, p) => sum + p.steps.length, 0);
    const completedStepsCount = pathsWithProgress.reduce((sum, p) => sum + p.completed, 0);
    const fullyCompletedPaths = pathsWithProgress.filter(p => p.completed === p.steps.length).length;
    
    // Calculate average quiz score (as percentage, using best scores)
    const quizEntries = Object.values(quizScores);
    const avgQuizScore = quizEntries.length > 0
      ? Math.round(quizEntries.reduce((sum, q) => sum + (q.bestScore / q.total) * 100, 0) / quizEntries.length)
      : null;

    return {
      pathsCompleted: fullyCompletedPaths,
      totalSteps: `${completedStepsCount}/${totalSteps}`,
      avgQuizScore: avgQuizScore !== null ? `${avgQuizScore}%` : '—',
      streak: streakDays > 0 ? `${streakDays} 🔥` : '—',
    };
  }, [pathsWithProgress, quizScores, streakDays]);

  return (
    <div className="pb-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentView('hub')} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-zinc-100">Challenge Paths</h1>
          <p className="text-xs text-zinc-500">Structured progression tracks</p>
        </div>
      </div>

      <div className="space-y-3">
        {pathsWithProgress.map((path) => (
          <div key={path.id} className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl border"
                style={{ borderColor: path.color + '40', backgroundColor: path.color + '10' }}
              >
                {path.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-zinc-200">{path.name}</h3>
                <p className="text-xs text-zinc-500">{path.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </div>

            {/* Progress bar */}
            <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2">
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${(path.completed / path.steps.length) * 100}%`, backgroundColor: path.color }}
              />
            </div>

            {/* Steps */}
            <div className="flex flex-wrap gap-1">
              {path.steps.map((step, i) => {
                const stepCompleted = isStepCompleted(step, completedStrategies);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border"
                    style={{
                      borderColor: stepCompleted ? path.color + '60' : '#3f3f4630',
                      color: stepCompleted ? path.color : '#71717a',
                      backgroundColor: stepCompleted ? path.color + '10' : 'transparent',
                    }}
                  >
                    {stepCompleted ? (
                      <CheckCircle className="w-2.5 h-2.5" />
                    ) : (
                      <Lock className="w-2.5 h-2.5" />
                    )}
                    {step}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-[#39ff14]" />
          <h3 className="text-sm font-bold text-zinc-200">Performance Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">{stats.pathsCompleted}</div>
            <div className="text-[10px] text-zinc-500">Paths Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">{stats.totalSteps}</div>
            <div className="text-[10px] text-zinc-500">Total Steps</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">{stats.avgQuizScore}</div>
            <div className="text-[10px] text-zinc-500">Avg Quiz Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">{stats.streak}</div>
            <div className="text-[10px] text-zinc-500">Current Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
}
