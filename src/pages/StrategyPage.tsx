import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen } from 'lucide-react';
import { STRATEGIES } from '../data/strategies';
import { useProgress } from '../contexts/ProgressContext';
import { getTierInfo, getTierBadgeColor } from '../utils/curriculum';
import PayoffChart from '../components/PayoffChart';

export default function StrategyPage() {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const { isCompleted, toggleComplete } = useProgress();

  const strategy = STRATEGIES.find(s => s.id === strategyId);
  if (!strategy) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Strategy not found
      </div>
    );
  }

  const tierInfo = getTierInfo(strategy.tier);
  const badgeColor = getTierBadgeColor(strategy.tier);
  const completed = isCompleted(strategy.id);

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-slate-400 active:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <button
            onClick={() => toggleComplete(strategy.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
              completed
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {completed ? <Check className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
            {completed ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>

      {/* Strategy header */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
            Tier {strategy.tier} — {tierInfo?.name}
          </span>
          <span className="text-[10px] text-slate-500">{strategy.outlook}</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{strategy.name}</h1>
        {strategy.objective && (
          <p className="text-slate-400 text-sm mt-1">{strategy.objective}</p>
        )}

        {/* Quick stats */}
        {strategy.risk && strategy.risk !== 'None' && (
          <div className="flex gap-3 mt-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
              <p className="text-[10px] text-slate-500 uppercase">Risk</p>
              <p className="text-sm text-white font-medium">{strategy.risk}</p>
            </div>
            {strategy.legs && strategy.legs.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                <p className="text-[10px] text-slate-500 uppercase">Legs</p>
                <p className="text-sm text-white font-medium">{strategy.legs.length}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payoff chart */}
      {strategy.legs && strategy.legs.length > 0 && !strategy.hideSimulator && (
        <div className="px-4 mb-6">
          <PayoffChart strategy={strategy} />
        </div>
      )}

      {/* Analysis content (HTML from desktop) */}
      {strategy.analysis && (
        <div className="px-4">
          <div
            className="strategy-content prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: strategy.analysis }}
          />
        </div>
      )}
    </div>
  );
}
