import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Strategy Metrics Database ────────────────────────

interface StrategyData {
  id: string;
  name: string;
  category: string;
  outlook: string;
  maxProfit: string;
  maxLoss: string;
  breakeven: string;
  capitalRequired: string;
  popEstimate: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  bestFor: string;
  deltaProfile: string;
  thetaProfile: string;
  vegaProfile: string;
  complexity: number;
}

const STRATEGY_DB: StrategyData[] = [
  {
    id: 'long-call', name: 'Long Call', category: 'Basic', outlook: 'Bullish',
    maxProfit: 'Unlimited', maxLoss: 'Premium paid', breakeven: 'Strike + Premium',
    capitalRequired: 'Low (premium only)', popEstimate: '30–50%', riskLevel: 'Low',
    bestFor: 'Strong bullish conviction, limited capital',
    deltaProfile: '+0.30 to +0.70', thetaProfile: 'Negative', vegaProfile: 'Positive', complexity: 1,
  },
  {
    id: 'long-put', name: 'Long Put', category: 'Basic', outlook: 'Bearish',
    maxProfit: 'Strike − Premium (to $0)', maxLoss: 'Premium paid', breakeven: 'Strike − Premium',
    capitalRequired: 'Low (premium only)', popEstimate: '30–50%', riskLevel: 'Low',
    bestFor: 'Bearish conviction or portfolio hedge',
    deltaProfile: '−0.30 to −0.70', thetaProfile: 'Negative', vegaProfile: 'Positive', complexity: 1,
  },
  {
    id: 'covered-call', name: 'Covered Call', category: 'Anchors', outlook: 'Mild Bull',
    maxProfit: 'Premium + (Strike − Cost)', maxLoss: 'Stock price − Premium', breakeven: 'Stock − Premium',
    capitalRequired: 'High (100 shares)', popEstimate: '60–70%', riskLevel: 'Moderate',
    bestFor: 'Income on existing stock positions',
    deltaProfile: '+0.30 to +0.70', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 2,
  },
  {
    id: 'cash-secured-put', name: 'Cash-Secured Put', category: 'Anchors', outlook: 'Mild Bull',
    maxProfit: 'Premium received', maxLoss: 'Strike − Premium', breakeven: 'Strike − Premium',
    capitalRequired: 'High (cash for 100 shares)', popEstimate: '60–80%', riskLevel: 'Moderate',
    bestFor: 'Acquiring stock at discount or income',
    deltaProfile: '+0.20 to +0.40', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 2,
  },
  {
    id: 'protective-put', name: 'Protective Put', category: 'Anchors', outlook: 'Bullish',
    maxProfit: 'Unlimited (stock upside)', maxLoss: 'Stock − Strike + Premium', breakeven: 'Stock + Premium',
    capitalRequired: 'High (stock + premium)', popEstimate: 'Insurance (not profit-focused)', riskLevel: 'Low',
    bestFor: 'Protecting unrealized gains',
    deltaProfile: '+0.50 to +0.80', thetaProfile: 'Negative', vegaProfile: 'Positive', complexity: 2,
  },
  {
    id: 'collar', name: 'Collar', category: 'Anchors', outlook: 'Neutral',
    maxProfit: 'Call Strike − Stock Price', maxLoss: 'Stock − Put Strike', breakeven: 'Stock Price (approx)',
    capitalRequired: 'High (stock)', popEstimate: 'High (range-bound)', riskLevel: 'Low',
    bestFor: 'Lock in gains, zero-cost protection',
    deltaProfile: '+0.30 to +0.60', thetaProfile: 'Neutral', vegaProfile: 'Neutral', complexity: 3,
  },
  {
    id: 'bull-call-spread', name: 'Bull Call Spread', category: 'Verticals', outlook: 'Bullish',
    maxProfit: 'Width − Net Debit', maxLoss: 'Net Debit', breakeven: 'Long Strike + Debit',
    capitalRequired: 'Moderate', popEstimate: '40–55%', riskLevel: 'Low',
    bestFor: 'Moderate bullish view, defined risk',
    deltaProfile: '+0.20 to +0.50', thetaProfile: 'Mixed', vegaProfile: 'Near neutral', complexity: 2,
  },
  {
    id: 'bear-put-spread', name: 'Bear Put Spread', category: 'Verticals', outlook: 'Bearish',
    maxProfit: 'Width − Net Debit', maxLoss: 'Net Debit', breakeven: 'Long Strike − Debit',
    capitalRequired: 'Moderate', popEstimate: '40–55%', riskLevel: 'Low',
    bestFor: 'Moderate bearish view, defined risk',
    deltaProfile: '−0.20 to −0.50', thetaProfile: 'Mixed', vegaProfile: 'Near neutral', complexity: 2,
  },
  {
    id: 'bull-put-spread', name: 'Bull Put Spread', category: 'Verticals', outlook: 'Mild Bull',
    maxProfit: 'Net Credit', maxLoss: 'Width − Credit', breakeven: 'Short Strike − Credit',
    capitalRequired: 'Moderate', popEstimate: '60–75%', riskLevel: 'Moderate',
    bestFor: 'High-probability income at support',
    deltaProfile: '+0.10 to +0.30', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 2,
  },
  {
    id: 'bear-call-spread', name: 'Bear Call Spread', category: 'Verticals', outlook: 'Mild Bear',
    maxProfit: 'Net Credit', maxLoss: 'Width − Credit', breakeven: 'Short Strike + Credit',
    capitalRequired: 'Moderate', popEstimate: '60–75%', riskLevel: 'Moderate',
    bestFor: 'High-probability income at resistance',
    deltaProfile: '−0.10 to −0.30', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 2,
  },
  {
    id: 'long-straddle', name: 'Long Straddle', category: 'Volatility', outlook: 'Volatile',
    maxProfit: 'Unlimited', maxLoss: 'Total Premium', breakeven: 'Strike ± Premium',
    capitalRequired: 'Moderate (2 premiums)', popEstimate: '30–40%', riskLevel: 'High',
    bestFor: 'Explosive move expected, direction unknown',
    deltaProfile: '~0 (neutral)', thetaProfile: 'Very Negative', vegaProfile: 'Very Positive', complexity: 3,
  },
  {
    id: 'long-strangle', name: 'Long Strangle', category: 'Volatility', outlook: 'Volatile',
    maxProfit: 'Unlimited', maxLoss: 'Total Premium', breakeven: 'Strikes ± Premium',
    capitalRequired: 'Low–Moderate (OTM)', popEstimate: '25–35%', riskLevel: 'High',
    bestFor: 'Cheap volatility bet before events',
    deltaProfile: '~0 (neutral)', thetaProfile: 'Negative', vegaProfile: 'Positive', complexity: 3,
  },
  {
    id: 'short-strangle', name: 'Short Strangle', category: 'Volatility', outlook: 'Neutral',
    maxProfit: 'Total Premium', maxLoss: 'Unlimited', breakeven: 'Strikes ± Premium',
    capitalRequired: 'Very High (margin)', popEstimate: '50–70%', riskLevel: 'Very High',
    bestFor: 'Range-bound markets, premium selling',
    deltaProfile: '~0 (neutral)', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 4,
  },
  {
    id: 'iron-condor', name: 'Iron Condor', category: 'Advanced', outlook: 'Neutral',
    maxProfit: 'Net Credit', maxLoss: 'Wing Width − Credit', breakeven: 'Short Strikes ± Credit',
    capitalRequired: 'Moderate (defined risk)', popEstimate: '50–70%', riskLevel: 'Moderate',
    bestFor: 'Range-bound markets, defined risk',
    deltaProfile: '~0 (neutral)', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 3,
  },
  {
    id: 'iron-butterfly', name: 'Iron Butterfly', category: 'Advanced', outlook: 'Neutral',
    maxProfit: 'Net Credit', maxLoss: 'Wing Width − Credit', breakeven: 'ATM Strike ± Credit',
    capitalRequired: 'Moderate (defined risk)', popEstimate: '30–40%', riskLevel: 'Moderate',
    bestFor: 'Pin at specific price, high credit',
    deltaProfile: '~0 (neutral)', thetaProfile: 'Very Positive', vegaProfile: 'Very Negative', complexity: 3,
  },
  {
    id: 'call-butterfly', name: 'Call Butterfly', category: 'Advanced', outlook: 'Neutral',
    maxProfit: 'Width − Debit', maxLoss: 'Net Debit', breakeven: 'Low Strike + Debit / High Strike − Debit',
    capitalRequired: 'Low', popEstimate: '25–35%', riskLevel: 'Low',
    bestFor: 'Pin at target price, cheap bet',
    deltaProfile: '~0 (neutral)', thetaProfile: 'Positive near center', vegaProfile: 'Negative', complexity: 3,
  },
  {
    id: 'calendar-spread', name: 'Calendar Spread', category: 'Advanced', outlook: 'Neutral',
    maxProfit: 'Limited (back month value)', maxLoss: 'Net Debit', breakeven: 'Complex (time-dependent)',
    capitalRequired: 'Moderate', popEstimate: '40–50%', riskLevel: 'Moderate',
    bestFor: 'Stock pins near strike short-term',
    deltaProfile: '~0 (neutral)', thetaProfile: 'Positive', vegaProfile: 'Positive', complexity: 4,
  },
  {
    id: 'ratio-spread', name: 'Ratio Spread', category: 'Exotic', outlook: 'Directional',
    maxProfit: 'Width × Ratio + Credit', maxLoss: 'Unlimited (past shorts)', breakeven: 'Complex',
    capitalRequired: 'High (naked exposure)', popEstimate: '55–65%', riskLevel: 'Very High',
    bestFor: 'Credit entry with directional bias',
    deltaProfile: 'Varies with ratio', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 5,
  },
  {
    id: 'broken-wing-butterfly', name: 'Broken Wing Butterfly', category: 'Exotic', outlook: 'Directional',
    maxProfit: 'Width + Credit', maxLoss: 'Skipped Width − Credit', breakeven: 'Complex (asymmetric)',
    capitalRequired: 'Moderate', popEstimate: '50–60%', riskLevel: 'Moderate',
    bestFor: 'Directional play with credit entry',
    deltaProfile: 'Directional bias', thetaProfile: 'Positive', vegaProfile: 'Negative', complexity: 5,
  },
];

// ─── Comparison Dimensions ────────────────────────────

interface Dimension {
  key: keyof StrategyData;
  label: string;
  emoji: string;
}

const DIMENSIONS: Dimension[] = [
  { key: 'maxProfit', label: 'Max Profit', emoji: '💰' },
  { key: 'maxLoss', label: 'Max Loss', emoji: '🛑' },
  { key: 'breakeven', label: 'Breakeven(s)', emoji: '⚖️' },
  { key: 'capitalRequired', label: 'Capital Required', emoji: '🏦' },
  { key: 'popEstimate', label: 'POP Estimate', emoji: '🎲' },
  { key: 'riskLevel', label: 'Risk Level', emoji: '⚠️' },
  { key: 'bestFor', label: 'Best For', emoji: '🎯' },
  { key: 'deltaProfile', label: 'Delta', emoji: 'Δ' },
  { key: 'thetaProfile', label: 'Theta', emoji: 'Θ' },
  { key: 'vegaProfile', label: 'Vega', emoji: 'ν' },
];

// ─── Component ────────────────────────────────────────

export default function StrategyComparison() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  const categories = ['All', ...new Set(STRATEGY_DB.map(s => s.category))];

  const filteredStrategies = useMemo(() => {
    return STRATEGY_DB.filter(s =>
      filterCategory === 'All' || s.category === filterCategory
    );
  }, [filterCategory]);

  const selected = useMemo(() => {
    return selectedIds.map(id => STRATEGY_DB.find(s => s.id === id)!).filter(Boolean);
  }, [selectedIds]);

  const addStrategy = (id: string) => {
    if (selectedIds.length >= 3 || selectedIds.includes(id)) return;
    setSelectedIds(prev => [...prev, id]);
    setShowPicker(false);
  };

  const removeStrategy = (id: string) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const riskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-400';
      case 'Moderate': return 'text-amber-400';
      case 'High': return 'text-orange-400';
      case 'Very High': return 'text-red-400';
      default: return 'text-zinc-400';
    }
  };

  const strategyColor = (idx: number) => {
    const colors = ['#39ff14', '#06b6d4', '#f59e0b'];
    return colors[idx] || '#39ff14';
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
            </button>
            <span className="text-xl">⚔️</span>
            <h1 className="text-lg font-bold text-white">Strategy Comparison</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Selected Strategies */}
        <div className="space-y-2">
          {selected.map((s, idx) => (
            <div
              key={s.id}
              className="flex items-center gap-3 bg-[#0a0a0a] border rounded-xl p-3"
              style={{ borderColor: `${strategyColor(idx)}40` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                style={{ backgroundColor: `${strategyColor(idx)}20`, color: strategyColor(idx) }}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">{s.name}</p>
                <p className="text-[10px] text-zinc-500">{s.outlook} • {s.category}</p>
              </div>
              <button
                onClick={() => removeStrategy(s.id)}
                className="p-2 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}

          {selectedIds.length < 3 && (
            <button
              onClick={() => setShowPicker(true)}
              className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] border border-[#39ff14]/20 border-dashed rounded-xl p-4 active:scale-[0.98] transition-transform min-h-[52px]"
            >
              <Plus className="w-5 h-5 text-[#39ff14]" />
              <span className="text-sm font-bold text-[#39ff14]">
                Add Strategy ({selectedIds.length}/3)
              </span>
            </button>
          )}
        </div>

        {/* Strategy Picker */}
        {showPicker && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-300">Pick a Strategy</span>
              <button
                onClick={() => setShowPicker(false)}
                className="p-2 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all active:scale-[0.98] min-h-[36px] ${
                    filterCategory === cat
                      ? 'bg-[#39ff14]/20 border border-[#39ff14]/40 text-[#39ff14]'
                      : 'bg-black border border-zinc-800 text-zinc-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Strategy List */}
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {filteredStrategies.map(s => {
                const isSelected = selectedIds.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => !isSelected && addStrategy(s.id)}
                    disabled={isSelected}
                    className={`w-full flex items-center gap-3 rounded-lg p-3 text-left transition-all active:scale-[0.98] min-h-[44px] ${
                      isSelected
                        ? 'bg-zinc-900/50 opacity-40'
                        : 'bg-black hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{s.name}</p>
                      <p className="text-[10px] text-zinc-500">{s.outlook} • {s.category}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: s.complexity }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      ))}
                      {Array.from({ length: 5 - s.complexity }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode Toggle */}
        {selected.length >= 2 && (
          <div className="flex gap-2">
            {(['cards', 'table'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-[0.98] min-h-[44px] ${
                  viewMode === mode
                    ? 'bg-[#39ff14]/20 border border-[#39ff14]/40 text-[#39ff14]'
                    : 'bg-black border border-zinc-800 text-zinc-500'
                }`}
              >
                {mode === 'cards' ? '📇 Cards' : '📊 Table'}
              </button>
            ))}
          </div>
        )}

        {/* ═══ COMPARISON VIEW ═══ */}
        {selected.length >= 2 && viewMode === 'cards' && (
          <div className="space-y-3">
            {DIMENSIONS.map(dim => (
              <div key={dim.key} className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                  <span>{dim.emoji}</span> {dim.label}
                </p>
                <div className="space-y-2">
                  {selected.map((s, idx) => (
                    <div key={s.id} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: strategyColor(idx) }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold mb-0.5" style={{ color: strategyColor(idx) }}>{s.name}</p>
                        <p className={`text-sm text-zinc-300 ${dim.key === 'riskLevel' ? riskColor(s[dim.key] as string) : ''}`}>
                          {String(s[dim.key])}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {selected.length >= 2 && viewMode === 'table' && (
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden">
            {/* Header Row */}
            <div className="grid border-b border-zinc-800" style={{ gridTemplateColumns: `120px repeat(${selected.length}, 1fr)` }}>
              <div className="p-3 bg-zinc-900/50" />
              {selected.map((s, idx) => (
                <div
                  key={s.id}
                  className="p-3 text-center border-l border-zinc-800"
                >
                  <p className="text-[10px] font-bold" style={{ color: strategyColor(idx) }}>{s.name}</p>
                </div>
              ))}
            </div>

            {/* Data Rows */}
            {DIMENSIONS.map((dim, rowIdx) => (
              <div
                key={dim.key}
                className={`grid ${rowIdx < DIMENSIONS.length - 1 ? 'border-b border-zinc-800/50' : ''}`}
                style={{ gridTemplateColumns: `120px repeat(${selected.length}, 1fr)` }}
              >
                <div className="p-3 bg-zinc-900/30 flex items-center gap-1.5">
                  <span className="text-[10px]">{dim.emoji}</span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">{dim.label}</span>
                </div>
                {selected.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`p-3 border-l border-zinc-800/50 ${dim.key === 'riskLevel' ? riskColor(s[dim.key] as string) : 'text-zinc-300'}`}
                  >
                    <p className="text-[11px] leading-relaxed">{String(s[dim.key])}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Quick Compare Suggestions */}
        {selected.length < 2 && (
          <div className="space-y-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Popular Comparisons</p>
            {[
              { name: 'Bull Call vs Bull Put', ids: ['bull-call-spread', 'bull-put-spread'] },
              { name: 'Iron Condor vs Strangle', ids: ['iron-condor', 'short-strangle'] },
              { name: 'Straddle vs Strangle', ids: ['long-straddle', 'long-strangle'] },
              { name: 'Covered Call vs CSP', ids: ['covered-call', 'cash-secured-put'] },
              { name: 'Iron Condor vs Butterfly', ids: ['iron-condor', 'iron-butterfly'] },
            ].map(suggestion => (
              <button
                key={suggestion.name}
                onClick={() => setSelectedIds(suggestion.ids)}
                className="w-full flex items-center gap-3 bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 active:scale-[0.98] transition-transform text-left min-h-[52px]"
              >
                <span className="text-lg">⚡</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{suggestion.name}</p>
                  <p className="text-[10px] text-zinc-500">Tap to load comparison</p>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-600 -rotate-90" />
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {selected.length === 0 && (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">⚔️</p>
            <p className="text-zinc-400 text-sm">Select 2–3 strategies to compare them side by side.</p>
          </div>
        )}

        {/* Single strategy hint */}
        {selected.length === 1 && (
          <div className="text-center py-4">
            <p className="text-zinc-500 text-xs">Add at least one more strategy to see the comparison.</p>
          </div>
        )}
      </div>
    </div>
  );
}
