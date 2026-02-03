import { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, TrendingDown, AlertTriangle, Zap, Search, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blackScholes, cumulativeDistribution } from '../../utils/blackScholes';
import {
  getApiKey, fetchQuote, fetchExpirations, fetchOptionsChain,
  findNearestExpiration, calculateDTE,
} from '../../services/tradierApi';

// ─── Component ────────────────────────────────────────

export default function IVCrushCalc() {
  const navigate = useNavigate();

  // Inputs
  const [stockPrice, setStockPrice] = useState(100);
  const [strike, setStrike] = useState(100);
  const [dte, setDte] = useState(7);
  const [currentIV, setCurrentIV] = useState(80);
  const [postIV, setPostIV] = useState(35);
  const [optionType, setOptionType] = useState<'call' | 'put'>('call');
  const [contracts, setContracts] = useState(1);
  const [rfRate] = useState(4.5);

  // Live data
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveSymbol, setLiveSymbol] = useState('');
  const [showEducation, setShowEducation] = useState(false);
  const hasKey = !!getApiKey();

  // ─── Live Data Fetch ───────────────────────────────

  const fetchLive = useCallback(async () => {
    if (!symbol.trim() || !getApiKey()) return;
    setLoading(true);
    try {
      const [q, exps] = await Promise.all([
        fetchQuote(symbol.toUpperCase()),
        fetchExpirations(symbol.toUpperCase()),
      ]);
      setStockPrice(q.price);
      setStrike(Math.round(q.price));
      setLiveSymbol(q.symbol);

      // Find nearest weekly expiration (earnings play = short DTE)
      const nearest = findNearestExpiration(exps, 3);
      if (nearest) {
        setDte(calculateDTE(nearest));
        const chain = await fetchOptionsChain(q.symbol, nearest);
        const opts = optionType === 'call' ? chain.calls : chain.puts;
        const atm = opts.reduce((prev, curr) =>
          Math.abs(curr.strike - q.price) < Math.abs(prev.strike - q.price) ? curr : prev,
          opts[0]
        );
        if (atm) {
          setStrike(atm.strike);
          if (atm.iv > 0) {
            setCurrentIV(Math.round(atm.iv));
            // Estimate post-earnings IV as ~40-60% of current
            setPostIV(Math.round(atm.iv * 0.45));
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [symbol, optionType]);

  // ─── Calculations ──────────────────────────────────

  const analysis = useMemo(() => {
    const T = dte / 365;
    const r = rfRate / 100;

    // Pre-earnings (high IV)
    const prePrice = blackScholes(optionType, stockPrice, strike, T, r, currentIV / 100);

    // Post-earnings (crushed IV) — same stock price
    const postPriceSame = blackScholes(optionType, stockPrice, strike, T > 1/365 ? T - 1/365 : T, r, postIV / 100);

    // Post-earnings with stock move scenarios
    const moves = [-10, -5, -3, -1, 0, 1, 3, 5, 10];
    const scenarios = moves.map(pct => {
      const newPrice = stockPrice * (1 + pct / 100);
      const postVal = blackScholes(optionType, newPrice, strike, T > 1/365 ? T - 1/365 : T, r, postIV / 100);
      const pl = (postVal - prePrice) * contracts * 100;
      const plPct = prePrice > 0 ? ((postVal - prePrice) / prePrice) * 100 : 0;
      return { movePct: pct, stockPrice: newPrice, optionPrice: postVal, pl, plPct };
    });

    // Key metrics
    const crushLoss = postPriceSame - prePrice;
    const crushLossPct = prePrice > 0 ? (crushLoss / prePrice) * 100 : 0;
    const crushLossTotal = crushLoss * contracts * 100;

    // Breakeven stock move needed
    let breakevenMove = 0;
    if (optionType === 'call') {
      // Binary search for breakeven
      for (let pct = 0; pct <= 30; pct += 0.1) {
        const newP = stockPrice * (1 + pct / 100);
        const val = blackScholes('call', newP, strike, T > 1/365 ? T - 1/365 : T, r, postIV / 100);
        if (val >= prePrice) { breakevenMove = pct; break; }
      }
    } else {
      for (let pct = 0; pct >= -30; pct -= 0.1) {
        const newP = stockPrice * (1 + pct / 100);
        const val = blackScholes('put', newP, strike, T > 1/365 ? T - 1/365 : T, r, postIV / 100);
        if (val >= prePrice) { breakevenMove = Math.abs(pct); break; }
      }
    }

    // Vega exposure
    const normalPDF = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    const sigma = currentIV / 100;
    const sqrtT = Math.sqrt(T);
    const d1 = T > 0 && sigma > 0 ? (Math.log(stockPrice / strike) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT) : 0;
    const vega = T > 0 ? (stockPrice * sqrtT * normalPDF(d1)) / 100 : 0;
    const ivDrop = currentIV - postIV;
    const vegaLoss = vega * ivDrop;

    return {
      prePrice,
      postPriceSame,
      crushLoss,
      crushLossPct,
      crushLossTotal,
      breakevenMove,
      vega,
      ivDrop,
      vegaLoss,
      scenarios,
    };
  }, [stockPrice, strike, dte, currentIV, postIV, optionType, contracts, rfRate]);

  // ─── Render ────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-95">
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
            </button>
            <Zap className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg font-bold text-white">IV Crush Simulator</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* Warning Banner */}
        <div className="flex items-start gap-3 bg-amber-900/20 border border-amber-500/30 rounded-xl p-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-400">IV Crush: The #1 Earnings Trap</p>
            <p className="text-[10px] text-zinc-400">Even if your direction is right, the IV crush can still lose you money.</p>
          </div>
        </div>

        {/* ═══ LIVE SEARCH ═══ */}
        {hasKey && (
          <div className="flex gap-2">
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && fetchLive()}
              placeholder="Symbol (e.g. TSLA)"
              className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-mono text-sm placeholder-zinc-600 focus:border-cyan-500/50 focus:outline-none"
            />
            <button
              onClick={fetchLive}
              disabled={loading}
              className="px-4 py-2.5 bg-cyan-600 disabled:bg-zinc-800 text-white rounded-xl text-sm font-bold active:scale-[0.98] flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* ═══ CALL/PUT ═══ */}
        <div className="flex gap-2">
          {(['call', 'put'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setOptionType(t)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold active:scale-[0.98] ${
                optionType === t
                  ? t === 'call' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                                  : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  : 'bg-[#0a0a0a] border border-zinc-800 text-zinc-500'
              }`}
            >
              {t === 'call' ? '📈 Call' : '📉 Put'}
            </button>
          ))}
        </div>

        {/* ═══ INPUTS ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <NumInput label="Stock Price" value={stockPrice} onChange={setStockPrice} prefix="$" color="#22c55e" />
            <NumInput label="Strike" value={strike} onChange={setStrike} prefix="$" color="#fff" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumInput label="DTE" value={dte} onChange={setDte} color="#fbbf24" />
            <NumInput label="Contracts" value={contracts} onChange={(v) => setContracts(Math.max(1, Math.round(v)))} color="#a855f7" />
          </div>

          {/* IV Sliders — the key inputs */}
          <div className="pt-2 border-t border-zinc-800">
            <IVSlider label="Current IV (Pre-Earnings)" value={currentIV} onChange={setCurrentIV} color="#ef4444" />
            <IVSlider label="Expected IV (Post-Earnings)" value={postIV} onChange={setPostIV} color="#22c55e" />
          </div>

          {/* IV Drop Visual */}
          <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <div className="flex-1">
              <p className="text-[10px] text-zinc-500 uppercase">IV Crush</p>
              <p className="text-lg font-black text-red-400">{currentIV}% → {postIV}%</p>
              <p className="text-xs text-zinc-500">Drop of {analysis.ivDrop} percentage points ({(analysis.ivDrop / currentIV * 100).toFixed(0)}% reduction)</p>
            </div>
          </div>
        </div>

        {/* ═══ IMPACT ANALYSIS ═══ */}
        <div className="bg-[#0a0a0a] border border-red-500/20 rounded-2xl p-4">
          <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3">IV Crush Impact (Stock Unchanged)</h3>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center p-3 bg-black rounded-xl border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase">Before</p>
              <p className="text-xl font-black text-white font-mono">${analysis.prePrice.toFixed(2)}</p>
              <p className="text-[10px] text-zinc-500">IV: {currentIV}%</p>
            </div>
            <div className="text-center p-3 bg-black rounded-xl border border-red-500/30">
              <p className="text-[10px] text-zinc-500 uppercase">After Crush</p>
              <p className="text-xl font-black text-red-400 font-mono">${analysis.postPriceSame.toFixed(2)}</p>
              <p className="text-[10px] text-zinc-500">IV: {postIV}%</p>
            </div>
          </div>

          {/* Big loss number */}
          <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-[10px] text-zinc-500 uppercase mb-1">Loss From IV Crush Alone</p>
            <p className="text-3xl font-black text-red-400">${Math.abs(analysis.crushLossTotal).toFixed(0)}</p>
            <p className="text-xs text-red-400">{analysis.crushLossPct.toFixed(0)}% of option value destroyed</p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="p-2.5 bg-black rounded-lg border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase">Vega Exposure</p>
              <p className="text-sm font-bold text-amber-400 font-mono">${analysis.vega.toFixed(2)}</p>
              <p className="text-[9px] text-zinc-600">per 1% IV change</p>
            </div>
            <div className="p-2.5 bg-black rounded-lg border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase">Breakeven Move</p>
              <p className="text-sm font-bold text-cyan-400 font-mono">{analysis.breakevenMove.toFixed(1)}%</p>
              <p className="text-[9px] text-zinc-600">stock must move {optionType === 'call' ? 'up' : 'down'}</p>
            </div>
          </div>
        </div>

        {/* ═══ SCENARIO TABLE ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3">Post-Earnings Scenarios</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-zinc-500 uppercase">
                  <th className="text-left py-1.5">Move</th>
                  <th className="text-right py-1.5">Stock</th>
                  <th className="text-right py-1.5">Option</th>
                  <th className="text-right py-1.5">P&L</th>
                </tr>
              </thead>
              <tbody>
                {analysis.scenarios.map((s) => (
                  <tr key={s.movePct} className={`border-t border-zinc-800/50 ${s.movePct === 0 ? 'bg-zinc-800/20' : ''}`}>
                    <td className={`py-2 font-mono font-bold ${s.movePct > 0 ? 'text-emerald-400' : s.movePct < 0 ? 'text-red-400' : 'text-zinc-300'}`}>
                      {s.movePct > 0 ? '+' : ''}{s.movePct}%
                    </td>
                    <td className="text-right font-mono text-zinc-300">${s.stockPrice.toFixed(2)}</td>
                    <td className="text-right font-mono text-zinc-300">${s.optionPrice.toFixed(2)}</td>
                    <td className={`text-right font-mono font-bold ${s.pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {s.pl >= 0 ? '+' : ''}${s.pl.toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[9px] text-zinc-600 mt-2">
            Assumes IV drops from {currentIV}% to {postIV}% and 1 day passes
          </p>
        </div>

        {/* ═══ IV CRUSH VISUAL BAR ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3">IV vs Option Value</h3>
          <IVBarChart
            stockPrice={stockPrice}
            strike={strike}
            dte={dte}
            rfRate={rfRate}
            optionType={optionType}
            currentIV={currentIV}
            postIV={postIV}
          />
        </div>

        {/* ═══ EDUCATION SECTION ═══ */}
        <button
          onClick={() => setShowEducation(!showEducation)}
          className="w-full bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-4 active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs text-amber-400 font-bold uppercase">📚 What is IV Crush?</h3>
            {showEducation ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </div>
        </button>

        {showEducation && (
          <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-4 -mt-2 space-y-3">
            <div>
              <p className="text-xs font-bold text-zinc-300 mb-1">The Setup</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Before earnings, uncertainty is high → IV inflates → options become expensive.
                After earnings, uncertainty resolves → IV collapses → options lose value rapidly.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-300 mb-1">The Trap</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                You buy a call before earnings. Stock goes up 3% — you were right!
                But IV drops from 80% to 35%. Your option is STILL worth less than you paid.
                The IV crush ate more value than the stock move added.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-300 mb-1">The Lesson</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                • Buying options before earnings means you need a HUGE move to profit{'\n'}
                • Selling premium (credit spreads) benefits FROM the crush{'\n'}
                • Check the "breakeven move" above — that's how far the stock must move{'\n'}
                • If the expected move is smaller than breakeven, buying is a losing bet
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────

function NumInput({ label, value, onChange, prefix, color }: {
  label: string; value: number; onChange: (v: number) => void; prefix?: string; color: string;
}) {
  return (
    <div>
      <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 text-sm font-mono focus:border-[#39ff14]/50 focus:outline-none"
          style={{ color, paddingLeft: prefix ? '1.5rem' : '0.75rem' }}
        />
      </div>
    </div>
  );
}

function IVSlider({ label, value, onChange, color }: {
  label: string; value: number; onChange: (v: number) => void; color: string;
}) {
  const variant = color.includes('a855f7') ? 'sim-slider sim-slider-purple'
    : color.includes('22d3ee') ? 'sim-slider sim-slider-cyan'
    : color.includes('f59e0b') || color.includes('fbbf24') ? 'sim-slider sim-slider-amber'
    : 'sim-slider';
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-sm font-bold font-mono" style={{ color }}>{value}%</span>
      </div>
      <input
        type="range" min={5} max={200} step={1} value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full ${variant}`}
      />
    </div>
  );
}

function IVBarChart({ stockPrice, strike, dte, rfRate, optionType, currentIV, postIV }: {
  stockPrice: number; strike: number; dte: number; rfRate: number;
  optionType: 'call' | 'put'; currentIV: number; postIV: number;
}) {
  // Show option value at different IV levels
  const steps = [];
  const minIV = Math.max(5, postIV - 10);
  const maxIV = currentIV + 10;
  for (let iv = minIV; iv <= maxIV; iv += 5) {
    steps.push(iv);
  }
  // Ensure both current and post are included
  if (!steps.includes(currentIV)) steps.push(currentIV);
  if (!steps.includes(postIV)) steps.push(postIV);
  steps.sort((a, b) => a - b);

  const values = steps.map(iv => ({
    iv,
    price: blackScholes(optionType, stockPrice, strike, dte / 365, rfRate / 100, iv / 100),
  }));
  const maxPrice = Math.max(...values.map(v => v.price));

  const W = 300, H = 120, PAD_L = 35, PAD_R = 10, PAD_T = 10, PAD_B = 25;
  const barW = Math.max(8, (W - PAD_L - PAD_R) / steps.length - 4);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
      {values.map((v, i) => {
        const x = PAD_L + i * ((W - PAD_L - PAD_R) / steps.length) + barW * 0.25;
        const barH = maxPrice > 0 ? (v.price / maxPrice) * (H - PAD_T - PAD_B) : 0;
        const y = H - PAD_B - barH;
        const isCurrent = v.iv === currentIV;
        const isPost = v.iv === postIV;
        const fill = isCurrent ? '#ef4444' : isPost ? '#22c55e' : '#3f3f46';

        return (
          <g key={v.iv}>
            <rect x={x} y={y} width={barW} height={barH} rx={2} fill={fill} opacity={0.8} />
            <text x={x + barW / 2} y={H - PAD_B + 12} fill="#71717a" fontSize={7} textAnchor="middle">{v.iv}%</text>
            <text x={x + barW / 2} y={y - 3} fill={fill} fontSize={7} textAnchor="middle" fontWeight="bold">
              ${v.price.toFixed(1)}
            </text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x={PAD_L} y={2} width={6} height={6} rx={1} fill="#ef4444" />
      <text x={PAD_L + 9} y={8} fill="#ef4444" fontSize={7}>Pre</text>
      <rect x={PAD_L + 30} y={2} width={6} height={6} rx={1} fill="#22c55e" />
      <text x={PAD_L + 39} y={8} fill="#22c55e" fontSize={7}>Post</text>
    </svg>
  );
}
