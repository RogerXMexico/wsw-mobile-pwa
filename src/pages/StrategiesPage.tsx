import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STRATEGY_SECTIONS, getStrategiesForSection, getAllTradingStrategies } from '../utils/curriculum';
import { useProgress } from '../contexts/ProgressContext';
import ProgressRing from '../components/ProgressRing';
import StrategyCard from '../components/StrategyCard';
import { Search, BookOpen } from 'lucide-react';

export default function StrategiesPage() {
  const navigate = useNavigate();
  const { isCompleted } = useProgress();
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [search, setSearch] = useState('');

  // Encyclopedia mode: show all trading strategies
  if (showEncyclopedia) {
    const all = getAllTradingStrategies();
    const filtered = search
      ? all.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
      : all;

    return (
      <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">📖 Options Encyclopedia</h1>
            <p className="text-slate-400 text-xs mt-0.5">{all.length} strategies</p>
          </div>
          <button
            onClick={() => setShowEncyclopedia(false)}
            className="text-sm text-emerald-500 font-medium"
          >
            Back
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search strategies..."
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm"
          />
        </div>

        <div className="space-y-2">
          {filtered.map(strategy => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              completed={isCompleted(strategy.id)}
              onClick={() => navigate(`/strategy/${strategy.id}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No strategies found for "{search}"</p>
          </div>
        )}
      </div>
    );
  }

  // Default: strategy sections
  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">⚔️ Strategies</h1>
        <p className="text-slate-400 text-sm mt-1">Master every options strategy</p>
      </div>

      {/* Strategy section cards */}
      <div className="space-y-3">
        {STRATEGY_SECTIONS.map((section) => {
          const strategies = getStrategiesForSection(section);
          const completedCount = strategies.filter(s => isCompleted(s.id)).length;
          const progress = strategies.length > 0 ? (completedCount / strategies.length) * 100 : 0;

          return (
            <button
              key={section.id}
              onClick={() => navigate(`/section/${section.id}`)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{section.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-base">{section.title}</h2>
                  <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{section.description}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {completedCount}/{strategies.length} strategies
                  </p>
                </div>
                <ProgressRing progress={progress} />
              </div>
            </button>
          );
        })}

        {/* Encyclopedia card */}
        <button
          onClick={() => setShowEncyclopedia(true)}
          className="w-full bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">📖</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-base">Options Encyclopedia</h2>
              <p className="text-slate-400 text-xs mt-0.5">All {getAllTradingStrategies().length} strategies with descriptions</p>
            </div>
            <BookOpen className="w-5 h-5 text-emerald-500" />
          </div>
        </button>
      </div>
    </div>
  );
}
