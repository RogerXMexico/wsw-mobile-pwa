import { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, Plus, Trash2, Layers, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────

interface OptionLeg {
  id: string;
  type: 'call' | 'put';
  action: 'buy' | 'sell';
  strike: number;
  premium: number;
  quantity: number;
  iv: number;
  dte: number;
}

interface StrategyMetrics {
  maxProfit: number | 'unlimited';
  maxLoss: number | 'unlimited';
  breakevens: number[];
  netPremium: number;
  totalDelta: number;
  totalGamma: number;
  totalTheta: number;
  totalVega: number;
}

// ─── Black-Scholes Helpers (inline for reliability) ───

const normalCDF = (x: number): number => {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return 0.5 * (1.0 + sign * y);
};

const normalPDF = (x: number): number => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);

const bsPrice = (S: number, K: number, T: number, r: number, sigma: number, isCall: boolean): number => {
  if (T <= 0) return isCall ? Math.max(0, S - K) : Math.max(0, K - S);
  if (sigma <= 0 || S <= 0 || K <= 0) return 0;
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  return isCall
    ? S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2)
    : K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);
};

const bsGreeks = (S: number, K: number, T: number, r: number, sigma: number, isCall: boolean) => {
  if (T <= 0 || sigma <= 0 || S <= 0 || K <= 0)
    return { delta: isCall ? (S > K ? 1 : 0) : (S < K ? -1 : 0), gamma: 0, theta: 0, vega: 0 };
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const delta = isCall ? normalCDF(d1) : normalCDF(d1) - 1;
  const gamma = normalPDF(d1) / (S * sigma * sqrtT);
  const vega = S * normalPDF(d1) * sqrtT / 100;
  const thetaCall = (-S * normalPDF(d1) * sigma / (2 * sqrtT) - r * K * Math.exp(-r * T) * normalCDF(d2)) / 365;
  const thetaPut = (-S * normalPDF(d1) * sigma / (2 * sqrtT) + r * K * Math.exp(-r * T) * normalCDF(-d2)) / 365;
  return { delta, gamma, theta: isCall ? thetaCall : thetaPut, vega };
};

// ─── Strategy Recognition ─────────────────────────────

const recognizeStrategy = (legs: OptionLeg[]): string => {
  if (legs.length === 0) return 'No Position';
  if (legs.length === 1) {
    const l = legs[0];
    if (l.action === 'buy' && l.type === 'call') return 'Long Call';
    if (l.action === 'sell' && l.type === 'call') return 'Short Call (Covered)';
    if (l.action === 'buy' && l.type === 'put') return 'Long Put';
    if (l.action === 'sell' && l.type === 'put') return 'Short Put (Cash-Secured)';
  }
  const sorted = [...legs].sort((a, b) => a.strike - b.strike);
  const calls = sorted.filter(l => l.type === 'call');
  const puts = sorted.filter(l => l.type === 'put');
  const longCalls = calls.filter(l => l.action === 'buy');
  const shortCalls = calls.filter(l => l.action === 'sell');
  const longPuts = puts.filter(l => l.action === 'buy');
  const shortPuts = puts.filter(l => l.action === 'sell');

  if (legs.length === 2 && calls.length === 2) {
    if (longCalls.length === 1 && shortCalls.length === 1)
      return longCalls[0].strike < shortCalls[0].strike ? 'Bull Call Spread' : 'Bear Call Spread';
  }
  if (legs.length === 2 && puts.length === 2) {
    if (longPuts.length === 1 && shortPuts.length === 1)
      return longPuts[0].strike > shortPuts[0].strike ? 'Bear Put Spread' : 'Bull Put Spread';
  }
  if (legs.length === 2 && calls.length === 1 && puts.length === 1) {
    if (calls[0].strike === puts[0].strike) {
      if (calls[0].action === 'buy' && puts[0].action === 'buy') return 'Long Straddle';
      if (calls[0].action === 'sell' && puts[0].action === 'sell') return 'Short Straddle';
    } else {
      if (calls[0].action === 'buy' && puts[0].action === 'buy') return 'Long Strangle';
      if (calls[0].action === 'sell' && puts[0].action === 'sell') return 'Short Strangle';
    }
    if (puts[0].action === 'buy' && calls[0].action === 'sell') return 'Collar';
  }
  if (legs.length === 4 && calls.length === 2 && puts.length === 2) {
    if (longPuts.length === 1 && shortPuts.length === 1 && longCalls.length === 1 && shortCalls.length === 1) {
      if (shortCalls[0].strike === shortPuts[0].strike) return 'Iron Butterfly';
      const putStrikes = puts.map(p => p.strike).sort((a, b) => a - b);
      const callStrikes = calls.map(c => c.strike).sort((a, b) => a - b);
      if (putStrikes[1] < callStrikes[0]) return 'Iron Condor';
    }
  }
  if (legs.length === 3 && (calls.length === 3 || puts.length === 3)) {
    const same = calls.length === 3 ? calls : puts;
    const strikes = same.map(l => l.strike).sort((a, b) => a - b);
    const sells = same.filter(l => l.action === 'sell');
    if (sells.length === 1 && strikes[1] === sells[0].strike)
      return calls.length === 3 ? 'Call Butterfly' : 'Put Butterfly';
  }
  return 'Custom Strategy';
};

// ─── Preset Templates ─────────────────────────────────

interface Preset {
  name: string;
  category: string;
  legs: Omit<OptionLeg, 'id' | 'premium'>[];
}

const PRESETS: Preset[] = [
  { name: 'Long Call', category: 'Basic', legs: [{ type: 'call', action: 'buy', strike: 100, dte: 30, quantity: 1, iv: 30 }] },
  { name: 'Long Put', category: 'Basic', legs: [{ type: 'put', action: 'buy', strike: 100, dte: 30, quantity: 1, iv: 30 }] },
  { name: 'Covered Call', category: 'Anchors', legs: [{ type: 'call', action: 'sell', strike: 105, dte: 30, quantity: 1, iv: 30 }] },
  { name: 'Cash-Secured Put', category: 'Anchors', legs: [{ type: 'put', action: 'sell', strike: 95, dte: 30, quantity: 1, iv: 30 }] },
  { name: 'Bull Call Spread', category: 'Verticals', legs: [
    { type: 'call', action: 'buy', strike: 95, dte: 30, quantity: 1, iv: 30 },
    { type: 'call', action: 'sell', strike: 105, dte: 30, quantity: 1, iv: 30 },
  ]},
  { name: 'Bear Put Spread', category: 'Verticals', legs: [
    { type: 'put', action: 'buy', strike: 105, dte: 30, quantity: 1, iv: 30 },
    { type: 'put', action: 'sell', strike: 95, dte: 30, quantity: 1, iv: 30 },
  ]},
  { name: 'Bull Put Spread', category: 'Verticals', legs: [
    { type: 'put', action: 'sell', strike: 100, dte: 30, quantity: 1, iv: 30 },
    { type: 'put', action: 'buy', strike: 90, dte: 30, quantity: 1, iv: 30 },
  ]},
  { name: 'Bear Call Spread', category: 'Verticals', legs: [
    { type: 'call', action: 'sell', strike: 100, dte: 30, quantity: 1, iv: 30 },
    { type: 'call', action: 'buy', strike: 110, dte: 30, quantity: 1, iv: 30 },
  ]},
  { name: 'Long Straddle', category: 'Volatility', legs: [
    { type: 'call', action: 'buy', strike: 100, dte: 30, quantity: 1, iv: 30 },
    { type: 'put', action: 'buy', strike: 100, dte: 30, quantity: 1, iv: 30 },
  ]},
  { name: 'Long Strangle', category: 'Volatility', legs: [
    { type: 'put', action: 'buy', strike: 95, dte: 30, quantity: 1, iv: 30 },
    { type: 'call', action: 'buy', strike: 105, dte: 30, quantity: 1, iv: 30 },
  ]},
  { name: 'Short Strangle', category: 'Volatility', legs: [
    { type: 'put', action: 'sell', strike: 95, dte: 45, quantity: 1, iv: 30 },
    { type: 'call', action: 'sell', strike: 105, dte: 45, quantity: 1, iv: 30 },
  ]},
  { name: 'Iron Condor', category: 'Advanced', legs: [
    { type: 'put', action: 'buy', strike: 85, dte: 45, quantity: 1, iv: 30 },
    { type: 'put', action: 'sell', strike: 95, dte: 45, quantity: 1, iv: 30 },
    { type: 'call', action: 'sell', strike: 105, dte: 45, quantity: 1, iv: 30 },
    { type: 'call', action: 'buy', strike: 115, dte: 45, quantity: 1, iv: 30 },
  ]},
  { name: 'Iron Butterfly', category: 'Advanced', legs: [
    { type: 'put', action: 'buy', strike: 90, dte: 45, quantity: 1, iv: 30 },
    { type: 'put', action: 'sell', strike: 100, dte: 45, quantity: 1, iv: 30 },
    { type: 'call', action: 'sell', strike: 100, dte: 45, quantity: 1, iv: 30 },
    { type: 'call', action: 'buy', strike: 110, dte: 45, quantity: 1, iv: 30 },
  ]},
  { name: 'Call Butterfly', category: 'Advanced', legs: [
    { type: 'call', action: 'buy', strike: 95, dte: 30, quantity: 1, iv: 30 },
    { type: 'call', action: 'sell', strike: 100, dte: 30, quantity: 2, iv: 30 },
    { type: 'call', action: 'buy', strike: 105, dte: 30, quantity: 1, iv: 30 },
  ]},
];

// ─── Component ────────────────────────────────────────

export default function StrategyBuilder() {
  const navigate = useNavigate();
  const [underlyingPrice, setUnderlyingPrice] = useState(100);
  const [riskFreeRate] = useState(0.05);
  const [legs, setLegs] = useState<OptionLeg[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Basic');
  const [showGreeks, setShowGreeks] = useState(false);

  const genId = () => Math.random().toString(36).substr(2, 9);

  const calcPremium = useCallback((leg: Omit<OptionLeg, 'id' | 'premium'>): number => {
    return bsPrice(underlyingPrice, leg.strike, leg.dte / 365, riskFreeRate, leg.iv / 100, leg.type === 'call');
  }, [underlyingPrice, riskFreeRate]);

  // Add leg
  const addLeg = (preset?: Omit<OptionLeg, 'id' | 'premium'>) => {
    if (legs.length >= 4) return;
    const base = preset || { type: 'call' as const, action: 'buy' as const, strike: Math.round(underlyingPrice / 5) * 5, dte: 30, quantity: 1, iv: 30 };
    setLegs(prev => [...prev, { ...base, id: genId(), premium: calcPremium(base) }]);
  };

  // Remove leg
  const removeLeg = (id: string) => setLegs(prev => prev.filter(l => l.id !== id));

  // Update leg field
  const updateLeg = (id: string, field: keyof OptionLeg, value: string | number) => {
    setLegs(prev => prev.map(l => {
      if (l.id !== id) return l;
      const updated = { ...l, [field]: value };
      updated.premium = bsPrice(underlyingPrice, updated.strike, updated.dte / 365, riskFreeRate, updated.iv / 100, updated.type === 'call');
      return updated;
    }));
  };

  // Load template
  const loadPreset = (preset: Preset) => {
    const newLegs: OptionLeg[] = preset.legs.map(l => ({
      ...l,
      id: genId(),
      premium: calcPremium(l),
    }));
    setLegs(newLegs);
    setShowTemplates(false);
  };

  // Reset
  const reset = () => setLegs([]);

  // Strategy recognition
  const strategyName = useMemo(() => recognizeStrategy(legs), [legs]);

  // ─── Combined Metrics ───────────────────────────────

  const metrics: StrategyMetrics = useMemo(() => {
    if (legs.length === 0) return { maxProfit: 0, maxLoss: 0, breakevens: [], netPremium: 0, totalDelta: 0, totalGamma: 0, totalTheta: 0, totalVega: 0 };

    const S = underlyingPrice;
    const r = riskFreeRate;

    // Net premium (positive = credit, negative = debit)
    let netPremium = 0;
    let totalDelta = 0, totalGamma = 0, totalTheta = 0, totalVega = 0;

    legs.forEach(leg => {
      const mult = leg.action === 'sell' ? 1 : -1;
      netPremium += mult * leg.premium * leg.quantity * 100;
      const greeks = bsGreeks(S, leg.strike, leg.dte / 365, r, leg.iv / 100, leg.type === 'call');
      const sign = leg.action === 'buy' ? 1 : -1;
      totalDelta += greeks.delta * sign * leg.quantity;
      totalGamma += greeks.gamma * sign * leg.quantity;
      totalTheta += greeks.theta * sign * leg.quantity;
      totalVega += greeks.vega * sign * leg.quantity;
    });

    // Calculate P&L at many price points
    const strikes = legs.map(l => l.strike);
    const minStrike = Math.min(...strikes);
    const maxStrike = Math.max(...strikes);
    const range = Math.max(maxStrike - minStrike, 20);
    const lowPrice = minStrike - range * 0.5;
    const highPrice = maxStrike + range * 0.5;

    let maxPnL = -Infinity;
    let minPnL = Infinity;
    const breakevens: number[] = [];
    let prevPnL = 0;
    const step = (highPrice - lowPrice) / 500;

    for (let price = lowPrice; price <= highPrice; price += step) {
      let pnl = 0;
      legs.forEach(leg => {
        const intrinsic = leg.type === 'call'
          ? Math.max(0, price - leg.strike)
          : Math.max(0, leg.strike - price);
        const legPnL = leg.action === 'buy'
          ? (intrinsic - leg.premium) * leg.quantity * 100
          : (leg.premium - intrinsic) * leg.quantity * 100;
        pnl += legPnL;
      });

      if (price > lowPrice && ((prevPnL < 0 && pnl >= 0) || (prevPnL >= 0 && pnl < 0))) {
        breakevens.push(Math.round(price * 100) / 100);
      }
      prevPnL = pnl;
      if (pnl > maxPnL) maxPnL = pnl;
      if (pnl < minPnL) minPnL = pnl;
    }

    // Check for unlimited scenarios
    const hasNakedCall = legs.some(l => l.action === 'sell' && l.type === 'call') &&
      !legs.some(l => l.action === 'buy' && l.type === 'call' && l.strike >= legs.find(ll => ll.action === 'sell' && ll.type === 'call')!.strike);
    const hasNakedPut = legs.some(l => l.action === 'sell' && l.type === 'put') &&
      !legs.some(l => l.action === 'buy' && l.type === 'put' && l.strike <= legs.find(ll => ll.action === 'sell' && ll.type === 'put')!.strike);
    const hasLongCall = legs.some(l => l.action === 'buy' && l.type === 'call') &&
      !legs.some(l => l.action === 'sell' && l.type === 'call' && l.strike >= legs.find(ll => ll.action === 'buy' && ll.type === 'call')!.strike);

    return {
      maxProfit: hasLongCall ? 'unlimited' : Math.round(maxPnL),
      maxLoss: (hasNakedCall || hasNakedPut) ? 'unlimited' : Math.round(minPnL),
      breakevens,
      netPremium: Math.round(netPremium),
      totalDelta,
      totalGamma,
      totalTheta,
      totalVega,
    };
  }, [legs, underlyingPrice, riskFreeRate]);

  // Unique categories
  const categories = [...new Set(PRESETS.map(p => p.category))];

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
            </button>
            <Layers className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold text-white">Strategy Builder</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Underlying Price */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Underlying Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">$</span>
            <input
              type="number"
              inputMode="decimal"
              value={underlyingPrice}
              onChange={e => {
                const v = parseFloat(e.target.value) || 0;
                setUnderlyingPrice(v);
                // Recalc all premiums
                setLegs(prev => prev.map(l => ({
                  ...l,
                  premium: bsPrice(v, l.strike, l.dte / 365, riskFreeRate, l.iv / 100, l.type === 'call')
                })));
              }}
              className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 pl-6 pr-3 text-sm font-mono text-[#39ff14] focus:border-[#39ff14]/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Strategy Name Badge */}
        {legs.length > 0 && (
          <div className="flex items-center justify-center">
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <span className="text-sm font-bold text-purple-400">{strategyName}</span>
            </div>
          </div>
        )}

        {/* Template Toggle */}
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#39ff14]">📋 Strategy Templates</span>
            {showTemplates ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </div>
        </button>

        {/* Templates Panel */}
        {showTemplates && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 -mt-2 space-y-3">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all active:scale-[0.98] min-h-[36px] ${
                    activeCategory === cat
                      ? 'bg-[#39ff14]/20 border border-[#39ff14]/40 text-[#39ff14]'
                      : 'bg-black border border-zinc-800 text-zinc-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.filter(p => p.category === activeCategory).map(preset => (
                <button
                  key={preset.name}
                  onClick={() => loadPreset(preset)}
                  className="bg-black border border-zinc-800 rounded-xl p-3 text-left active:scale-[0.98] active:border-[#39ff14]/40 transition-all min-h-[44px]"
                >
                  <p className="text-xs font-bold text-white">{preset.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{preset.legs.length} leg{preset.legs.length > 1 ? 's' : ''}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ LEGS ═══ */}
        {legs.map((leg, idx) => (
          <div key={leg.id} className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 relative">
            {/* Leg Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px] font-bold text-purple-400">{idx + 1}</span>
                <span className="text-xs font-bold text-zinc-300">Leg {idx + 1}</span>
              </div>
              <button
                onClick={() => removeLeg(leg.id)}
                className="p-2 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>

            {/* Buy/Sell + Call/Put */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Action</label>
                <div className="flex gap-1">
                  {(['buy', 'sell'] as const).map(a => (
                    <button
                      key={a}
                      onClick={() => updateLeg(leg.id, 'action', a)}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-[0.98] min-h-[44px] ${
                        leg.action === a
                          ? a === 'buy'
                            ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                            : 'bg-red-500/20 border border-red-500/50 text-red-400'
                          : 'bg-black border border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {a === 'buy' ? '📈 BUY' : '📉 SELL'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Type</label>
                <div className="flex gap-1">
                  {(['call', 'put'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => updateLeg(leg.id, 'type', t)}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-[0.98] min-h-[44px] ${
                        leg.type === t
                          ? t === 'call'
                            ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                            : 'bg-orange-500/20 border border-orange-500/50 text-orange-400'
                          : 'bg-black border border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {t === 'call' ? 'CALL' : 'PUT'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Strike + Premium + Qty */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Strike</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={leg.strike}
                  onChange={e => updateLeg(leg.id, 'strike', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 px-3 text-sm font-mono text-white focus:border-[#39ff14]/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Premium</label>
                <div className="bg-black border border-zinc-800/50 rounded-lg py-2.5 px-3">
                  <span className="text-sm font-mono text-amber-400">${leg.premium.toFixed(2)}</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Qty</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={leg.quantity}
                  onChange={e => updateLeg(leg.id, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 px-3 text-sm font-mono text-white focus:border-[#39ff14]/50 focus:outline-none"
                />
              </div>
            </div>

            {/* IV + DTE */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">IV (%)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={leg.iv}
                  onChange={e => updateLeg(leg.id, 'iv', parseFloat(e.target.value) || 0)}
                  className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 px-3 text-sm font-mono text-cyan-400 focus:border-[#39ff14]/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">DTE</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={leg.dte}
                  onChange={e => updateLeg(leg.id, 'dte', Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 px-3 text-sm font-mono text-amber-400 focus:border-[#39ff14]/50 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Leg + Reset */}
        <div className="flex gap-2">
          {legs.length < 4 && (
            <button
              onClick={() => addLeg()}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0a0a0a] border border-[#39ff14]/30 rounded-2xl p-4 active:scale-[0.98] transition-transform min-h-[52px]"
            >
              <Plus className="w-5 h-5 text-[#39ff14]" />
              <span className="text-sm font-bold text-[#39ff14]">Add Leg</span>
            </button>
          )}
          {legs.length > 0 && (
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 bg-[#0a0a0a] border border-red-500/30 rounded-2xl px-6 py-4 active:scale-[0.98] transition-transform min-h-[52px]"
            >
              <RotateCcw className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-400">Reset</span>
            </button>
          )}
        </div>

        {/* ═══ P&L SUMMARY ═══ */}
        {legs.length > 0 && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4">
            <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-pulse" />
              Combined P&L
            </h2>

            {/* Net Premium */}
            <div className="text-center mb-4 pb-4 border-b border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Net Premium</p>
              <p className={`text-3xl font-black font-mono ${metrics.netPremium >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {metrics.netPremium >= 0 ? '+' : ''}${Math.abs(metrics.netPremium).toLocaleString()}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">{metrics.netPremium >= 0 ? 'Credit Received' : 'Debit Paid'}</p>
            </div>

            {/* Max Profit / Loss / Breakevens */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
                <p className="text-[10px] text-zinc-500 uppercase mb-1">Max Profit</p>
                <p className="text-lg font-black text-emerald-400 font-mono">
                  {metrics.maxProfit === 'unlimited' ? '∞' : `$${Math.abs(metrics.maxProfit as number).toLocaleString()}`}
                </p>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 text-center">
                <p className="text-[10px] text-zinc-500 uppercase mb-1">Max Loss</p>
                <p className="text-lg font-black text-red-400 font-mono">
                  {metrics.maxLoss === 'unlimited' ? '∞' : `$${Math.abs(metrics.maxLoss as number).toLocaleString()}`}
                </p>
              </div>
            </div>

            {/* Breakevens */}
            {metrics.breakevens.length > 0 && (
              <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 mb-4">
                <p className="text-[10px] text-zinc-500 uppercase mb-2">Breakeven{metrics.breakevens.length > 1 ? 's' : ''}</p>
                <div className="flex flex-wrap gap-2">
                  {metrics.breakevens.map((be, i) => (
                    <span key={i} className="px-3 py-1 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-lg text-sm font-mono text-[#39ff14]">
                      ${be.toFixed(2)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Greeks Toggle */}
            <button
              onClick={() => setShowGreeks(!showGreeks)}
              className="w-full flex items-center justify-between py-2 active:scale-[0.99] transition-transform"
            >
              <span className="text-xs font-bold text-zinc-400">Combined Greeks</span>
              {showGreeks ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
            </button>

            {showGreeks && (
              <div className="grid grid-cols-2 gap-3 mt-2">
                <GreekCard label="Delta (Δ)" value={metrics.totalDelta} precision={3} color="#22c55e" />
                <GreekCard label="Gamma (Γ)" value={metrics.totalGamma} precision={4} color="#06b6d4" />
                <GreekCard label="Theta (Θ)" value={metrics.totalTheta} precision={3} color="#f59e0b" />
                <GreekCard label="Vega (ν)" value={metrics.totalVega} precision={3} color="#a855f7" />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {legs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🧪</p>
            <p className="text-zinc-400 text-sm">Add legs or pick a template to begin building your strategy.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────

function GreekCard({ label, value, precision, color }: { label: string; value: number; precision: number; color: string }) {
  return (
    <div className="bg-black/50 border border-zinc-800 rounded-xl p-3 text-center">
      <p className="text-[10px] text-zinc-500 uppercase mb-1">{label}</p>
      <p className="text-lg font-bold font-mono" style={{ color }}>
        {value >= 0 ? '+' : ''}{value.toFixed(precision)}
      </p>
    </div>
  );
}
