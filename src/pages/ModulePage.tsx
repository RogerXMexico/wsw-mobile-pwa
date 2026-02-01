import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MODULES, getStrategiesForModule, getTierInfo } from '../utils/curriculum';
import { useProgress } from '../contexts/ProgressContext';
import StrategyCard from '../components/StrategyCard';

export default function ModulePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { isCompleted } = useProgress();

  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Module not found
      </div>
    );
  }

  const strategies = getStrategiesForModule(mod.id);

  // Group by tier
  const tierGroups: Record<number, typeof strategies> = {};
  strategies.forEach(s => {
    if (!tierGroups[s.tier]) tierGroups[s.tier] = [];
    tierGroups[s.tier].push(s);
  });

  const sortedTiers = Object.keys(tierGroups).map(Number).sort((a, b) => a - b);

  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
      {/* Header */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 mb-4 active:text-white transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{mod.emoji}</span>
          <h1 className="text-xl font-bold text-white">{mod.title}</h1>
        </div>
        <p className="text-slate-400 text-sm">{mod.description}</p>
      </div>

      {/* Strategy list grouped by tier */}
      {sortedTiers.map(tier => {
        const tierInfo = getTierInfo(tier);
        const tierStrategies = tierGroups[tier];

        return (
          <div key={tier} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-medium text-slate-300">
                Tier {tier} — {tierInfo?.name || 'Unknown'}
              </h3>
              <span className="text-xs text-slate-600">
                ({tierStrategies.filter(s => isCompleted(s.id)).length}/{tierStrategies.length})
              </span>
            </div>
            <div className="space-y-2">
              {tierStrategies.map(strategy => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  completed={isCompleted(strategy.id)}
                  onClick={() => navigate(`/strategy/${strategy.id}`)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
