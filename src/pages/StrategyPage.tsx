import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen } from 'lucide-react';
import { STRATEGIES } from '../data/strategies';
import { OptionLeg } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { getTierInfo, getTierBadgeColor } from '../utils/curriculum';
import PayoffChart from '../components/PayoffChart';

function describeLeg(leg: OptionLeg): string {
  if (leg.type === 'stock') {
    return leg.action === 'buy' ? 'Buy Stock' : 'Short Stock';
  }
  const action = leg.action === 'buy' ? 'Buy' : 'Sell';
  const type = leg.type === 'call' ? 'Call' : 'Put';
  const qty = leg.quantity > 1 ? `${leg.quantity}x ` : '';
  const strike = leg.strikeOffset !== undefined && leg.strikeOffset !== 0
    ? ` (${leg.strikeOffset > 0 ? '+' : ''}${leg.strikeOffset})`
    : '';
  return `${qty}${action} ${type}${strike}`;
}

function describeAllLegs(legs: OptionLeg[]): string {
  return legs.map(describeLeg).join(' + ');
}

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
      {/* Sticky header — padded for iPhone notch/Dynamic Island */}
      <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50">
        <div className="pt-[env(safe-area-inset-top)]">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-slate-400 active:text-white transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
            <button
              onClick={() => toggleComplete(strategy.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 min-h-[44px] ${
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

        {/* Strategy mechanics */}
        {strategy.legs && strategy.legs.length > 0 && (
          <div className="mt-4 space-y-2">
            {/* Legs breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 uppercase mb-2">How to Build It</p>
              <div className="space-y-1.5">
                {strategy.legs.map((leg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                      leg.action === 'buy'
                        ? 'bg-emerald-900/40 text-emerald-400'
                        : 'bg-red-900/40 text-red-400'
                    }`}>
                      {leg.action === 'buy' ? 'BUY' : 'SELL'}
                    </span>
                    <span className="text-sm text-white">{describeLeg(leg)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                {describeAllLegs(strategy.legs)}
              </p>
            </div>

            {/* Quick stats row */}
            <div className="flex gap-2">
              {strategy.risk && strategy.risk !== 'None' && (
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-slate-500 uppercase">Risk</p>
                  <p className="text-sm text-white font-medium">{strategy.risk}</p>
                </div>
              )}
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                <p className="text-[10px] text-slate-500 uppercase">Legs</p>
                <p className="text-sm text-white font-medium">{strategy.legs.length}</p>
              </div>
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                <p className="text-[10px] text-slate-500 uppercase">Outlook</p>
                <p className="text-sm text-white font-medium">{strategy.outlook}</p>
              </div>
            </div>
          </div>
        )}

        {/* For educational content without legs, just show risk if present */}
        {(!strategy.legs || strategy.legs.length === 0) && strategy.risk && strategy.risk !== 'None' && (
          <div className="flex gap-3 mt-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
              <p className="text-[10px] text-slate-500 uppercase">Risk</p>
              <p className="text-sm text-white font-medium">{strategy.risk}</p>
            </div>
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
