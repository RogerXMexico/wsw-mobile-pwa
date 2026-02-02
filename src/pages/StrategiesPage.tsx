import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STRATEGY_SECTIONS, getStrategiesForSection, getAllTradingStrategies } from '../utils/curriculum';
import { useProgress } from '../contexts/ProgressContext';
import ProgressRing from '../components/ProgressRing';
import StrategyCard from '../components/StrategyCard';
import PayoffThumb from '../components/PayoffThumb';
import { Search, BookOpen, ChevronRight } from 'lucide-react';

const OUTLOOK_COLORS: Record<string, string> = {
  'Bullish': 'bg-emerald-900/50 text-[#39ff14]',
  'Bearish': 'bg-red-900/50 text-red-400',
  'Neutral': 'bg-zinc-900 text-zinc-300',
  'Neutral/Bull': 'bg-emerald-900/30 text-[#39ff14]',
  'Neutral/Bear': 'bg-red-900/30 text-red-400',
  'Volatile': 'bg-purple-900/50 text-purple-400',
  'Explosive': 'bg-orange-900/50 text-orange-400',
  'Volatile/Bull': 'bg-purple-900/40 text-purple-400',
  'Volatile/Bear': 'bg-purple-900/40 text-purple-400',
  'Mild Bull': 'bg-emerald-900/30 text-[#39ff14]',
  'Range/Bull': 'bg-cyan-900/40 text-cyan-400',
  'Directional': 'bg-blue-900/50 text-blue-400',
};

export default function StrategiesPage() {
  const navigate = useNavigate();
  const { isCompleted } = useProgress();
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [search, setSearch] = useState('');

  // Encyclopedia mode: show all trading strategies with payoff thumbnails
  if (showEncyclopedia) {
    const all = getAllTradingStrategies();
    const filtered = search
      ? all.filter(s =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.outlook.toLowerCase().includes(search.toLowerCase()) ||
          s.objective.toLowerCase().includes(search.toLowerCase()) ||
          (s.tierName || '').toLowerCase().includes(search.toLowerCase())
        )
      : all;

    // Group by tier
    const tierGroups: Record<string, typeof filtered> = {};
    filtered.forEach(s => {
      const key = s.tierName || `Tier ${s.tier}`;
      if (!tierGroups[key]) tierGroups[key] = [];
      tierGroups[key].push(s);
    });

    const tierOrder = ['The Anchors', 'Proper Mindset', 'Verticals', 'Volatility', 'Time/Skew', 'Advanced + Exotic'];
    const sortedTierNames = Object.keys(tierGroups).sort((a, b) => {
      const ai = tierOrder.indexOf(a);
      const bi = tierOrder.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

    return (
      <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">📖 Options Encyclopedia</h1>
            <p className="text-zinc-400 text-xs mt-0.5">{all.length} strategies</p>
          </div>
          <button
            onClick={() => { setShowEncyclopedia(false); setSearch(''); }}
            className="text-sm text-[#39ff14] font-medium"
          >
            Back
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, outlook, or category..."
            className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#39ff14]/30 text-sm"
          />
        </div>

        {/* Grouped strategy cards with payoff thumbnails */}
        {sortedTierNames.map(tierName => (
          <div key={tierName} className="mb-5">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1">
              {tierName} · {tierGroups[tierName].length}
            </h3>
            <div className="space-y-2">
              {tierGroups[tierName].map(strategy => (
                <button
                  key={strategy.id}
                  onClick={() => navigate(`/strategy/${strategy.id}`)}
                  className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 active:scale-[0.98] transition-transform text-left"
                >
                  <div className="flex items-center gap-3">
                    {/* Payoff thumbnail */}
                    <div className="flex-shrink-0 bg-black rounded-lg overflow-hidden border border-[#39ff14]/10">
                      <PayoffThumb strategy={strategy} width={72} height={40} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{strategy.name}</p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-md ${OUTLOOK_COLORS[strategy.outlook] || 'bg-zinc-900 text-zinc-400'}`}>
                          {strategy.outlook}
                        </span>
                        <span className="text-[10px] text-zinc-500">{strategy.objective}</span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
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
        <p className="text-zinc-400 text-sm mt-1">Master every options strategy</p>
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
              className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{section.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-base">{section.title}</h2>
                  <p className="text-zinc-400 text-xs mt-0.5 line-clamp-1">{section.description}</p>
                  <p className="text-zinc-500 text-xs mt-1">
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
          className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">📖</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-base">Options Encyclopedia</h2>
              <p className="text-zinc-400 text-xs mt-0.5">All {getAllTradingStrategies().length} strategies with descriptions</p>
            </div>
            <BookOpen className="w-5 h-5 text-[#39ff14]" />
          </div>
        </button>
      </div>
    </div>
  );
}
