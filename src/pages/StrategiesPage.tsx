import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { STRATEGIES } from '../data/strategies';
import { TIER_INFO } from '../data/tierInfo';
import { useProgress } from '../contexts/ProgressContext';
import StrategyCard from '../components/StrategyCard';

const OUTLOOK_FILTERS = ['All', 'Bullish', 'Bearish', 'Neutral', 'Volatile', 'Educational'];

export default function StrategiesPage() {
  const navigate = useNavigate();
  const { isCompleted } = useProgress();
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<number | null>(null);
  const [outlookFilter, setOutlookFilter] = useState('All');

  const filtered = useMemo(() => {
    return STRATEGIES.filter(s => {
      // Exclude hidden/tool strategies for cleaner browse
      if (s.hideSimulator && s.hideAnalyst && !s.analysis) return false;

      if (search) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q)) return false;
      }
      if (tierFilter !== null && s.tier !== tierFilter) return false;
      if (outlookFilter !== 'All' && s.outlook !== outlookFilter) return false;
      return true;
    });
  }, [search, tierFilter, outlookFilter]);

  return (
    <div className="px-4 pt-6 pb-24">
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

      {/* Outlook filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar">
        {OUTLOOK_FILTERS.map(o => (
          <button
            key={o}
            onClick={() => setOutlookFilter(o)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              outlookFilter === o
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      {/* Tier filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
        <button
          onClick={() => setTierFilter(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            tierFilter === null
              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          All Tiers
        </button>
        {TIER_INFO.map(t => (
          <button
            key={t.tier}
            onClick={() => setTierFilter(t.tier)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              tierFilter === t.tier
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-3">{filtered.length} strategies</p>

      {/* Strategy list */}
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
          <p className="text-lg mb-1">No strategies found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
