import { Strategy } from '../types';
import { getTierInfo, getTierBadgeColor } from '../utils/curriculum';
import { ChevronRight, Check } from 'lucide-react';

interface StrategyCardProps {
  strategy: Strategy;
  completed?: boolean;
  onClick: () => void;
}

function getOutlookEmoji(outlook: string): string {
  const map: Record<string, string> = {
    Bullish: '🟢',
    Bearish: '🔴',
    Neutral: '⚪',
    Volatile: '🟣',
    Educational: '📚',
    Range: '🟡',
    Explosive: '💥',
  };
  return map[outlook] || '📘';
}

export default function StrategyCard({ strategy, completed, onClick }: StrategyCardProps) {
  const tierInfo = getTierInfo(strategy.tier);
  const badgeColor = getTierBadgeColor(strategy.tier);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 active:scale-[0.98] transition-transform text-left"
    >
      {/* Completion indicator */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        completed
          ? 'bg-emerald-600/20 border border-emerald-500/40'
          : 'bg-slate-800 border border-slate-700'
      }`}>
        {completed ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <span className="text-sm">{getOutlookEmoji(strategy.outlook)}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm truncate">{strategy.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badgeColor}`}>
            {tierInfo?.name || `Tier ${strategy.tier}`}
          </span>
          {strategy.objective && (
            <span className="text-[10px] text-slate-500 truncate">{strategy.objective}</span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
    </button>
  );
}
