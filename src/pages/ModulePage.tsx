import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { RULES_SECTIONS, STRATEGY_SECTIONS, TOOLS_SECTION, SOCIAL_SECTION, getStrategiesForSection, getTierInfo } from '../utils/curriculum';
import { useProgress } from '../contexts/ProgressContext';
import StrategyCard from '../components/StrategyCard';

// Combine all sections for lookup
const ALL_SECTIONS = [...RULES_SECTIONS, ...STRATEGY_SECTIONS, TOOLS_SECTION, SOCIAL_SECTION];

export default function SectionPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { isCompleted } = useProgress();

  const section = ALL_SECTIONS.find(s => s.id === moduleId);
  if (!section) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Section not found
      </div>
    );
  }

  const strategies = getStrategiesForSection(section);

  // Group by tier if section spans multiple tiers
  const tierGroups: Record<number, typeof strategies> = {};
  strategies.forEach(s => {
    if (!tierGroups[s.tier]) tierGroups[s.tier] = [];
    tierGroups[s.tier].push(s);
  });

  const sortedTiers = Object.keys(tierGroups).map(Number).sort((a, b) => a - b);
  const hasMultipleTiers = sortedTiers.length > 1;

  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#39ff14] mb-4 active:text-white transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{section.emoji}</span>
          <h1 className="text-xl font-bold text-white">{section.title}</h1>
        </div>
        <p className="text-zinc-400 text-sm">{section.description}</p>
        <p className="text-zinc-500 text-xs mt-1">
          {strategies.filter(s => isCompleted(s.id)).length}/{strategies.length} completed
        </p>
      </div>

      {/* Strategy list */}
      {hasMultipleTiers ? (
        // Grouped by tier
        sortedTiers.map(tier => {
          const tierInfo = getTierInfo(tier);
          const tierStrategies = tierGroups[tier];

          return (
            <div key={tier} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14]" />
                <h3 className="text-sm font-medium text-zinc-300">
                  {tierInfo?.name || `Tier ${tier}`}
                </h3>
                <span className="text-xs text-zinc-600">
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
        })
      ) : (
        // Flat list (single tier)
        <div className="space-y-2">
          {strategies.map(strategy => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              completed={isCompleted(strategy.id)}
              onClick={() => navigate(`/strategy/${strategy.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
