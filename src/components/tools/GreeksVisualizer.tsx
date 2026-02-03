import { useState, useMemo, useCallback, useEffect } from 'react';
import { ArrowLeft, Activity, TrendingUp, Clock, Zap, Gauge, Search, Loader2, Wifi, WifiOff, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blackScholes, cumulativeDistribution } from '../../utils/blackScholes';
import {
  getApiKey, setApiKey as saveApiKey,
  fetchQuote, fetchExpirations, fetchOptionsChain,
  calculateDTE, findNearestExpiration,
  type OptionData,
} from '../../services/tradierApi';

// ─── Black-Scholes Greeks ─────────────────────────────

const normalPDF = (x: number): number => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);

function calcGreeks(
  S: number, K: number, T: number, r: number, sigma: number, isCall: boolean,
) {
  if (T <= 0 || sigma <= 0 || S <= 0 || K <= 0) return { delta: 0, gamma: 0, theta: 0, vega: 0, price: 0 };

  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;

  const delta = isCall ? cumulativeDistribution(d1) : cumulativeDistribution(d1) - 1;
  const gamma = normalPDF(d1) / (S * sigma * sqrtT);
  const thetaCall = (-(S * normalPDF(d1) * sigma) / (2 * sqrtT) - r * K * Math.exp(-r * T) * cumulativeDistribution(d2)) / 365;
  const thetaPut = (-(S * normalPDF(d1) * sigma) / (2 * sqrtT) + r * K * Math.exp(-r * T) * cumulativeDistribution(-d2)) / 365;
  const theta = isCall ? thetaCall : thetaPut;
  const vega = (S * sqrtT * normalPDF(d1)) / 100;
  const price = blackScholes(isCall ? 'call' : 'put', S, K, T, r, sigma);

  return { delta, gamma, theta, vega, price };
}

// ─── Types ────────────────────────────────────────────

interface GreekPoint { price: number; delta: number; gamma: number; theta: number; vega: number }
type GreekKey = 'delta' | 'gamma' | 'theta' | 'vega';

const GREEK_META: Record<GreekKey, { label: string; icon: typeof Activity; color: string; desc: string }> = {
  delta: { label: 'Delta', icon: TrendingUp, color: '#22c55e', desc: 'Price sensitivity — how much the option moves per $1 stock move' },
  gamma: { label: 'Gamma', icon: Gauge, color: '#f59e0b', desc: 'Acceleration — rate of change of Delta' },
  theta: { label: 'Theta', icon: Clock, color: '#ef4444', desc: 'Time decay — daily cost of holding the option' },
  vega:  { label: 'Vega',  icon: Zap,   color: '#a855f7', desc: 'Volatility sensitivity — per 1% IV change' },
};

// ─── Component ────────────────────────────────────────

export default function GreeksVisualizer() {
  const navigate = useNavigate();

  // Inputs
  const [stockPrice, setStockPrice] = useState(100);
  const [strike, setStrike] = useState(100);
  const [dte, setDte] = useState(30);
  const [iv, setIv] = useState(30);
  const [rfRate, setRfRate] = useState(4.5);
  const [isCall, setIsCall] = useState(true);

  // Active greek display
  const [activeGreek, setActiveGreek] = useState<GreekKey>('delta');

  // Live data
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveSymbol, setLiveSymbol] = useState('');
  const [expirations, setExpirations] = useState<string[]>([]);
  const [selectedExp, setSelectedExp] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiInput, setApiInput] = useState(getApiKey() || '');
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
      setStrike(Math.round(q.price / 5) * 5);
      setLiveSymbol(q.symbol);
      setExpirations(exps);

      const nearest = findNearestExpiration(exps, 14);
      if (nearest) {
        setSelectedExp(nearest);
        setDte(calculateDTE(nearest));
        const chain = await fetchOptionsChain(q.symbol, nearest);
        const opts = isCall ? chain.calls : chain.puts;
        const atm = opts.reduce((prev, curr) =>
          Math.abs(curr.strike - q.price) < Math.abs(prev.strike - q.price) ? curr : prev,
          opts[0]
        );
        if (atm) {
          setStrike(atm.strike);
          if (atm.iv > 0) setIv(Math.round(atm.iv));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [symbol, isCall]);

  // Refetch when expiration changes
  const handleExpChange = useCallback(async (exp: string) => {
    setSelectedExp(exp);
    setDte(calculateDTE(exp));
    if (!liveSymbol || !getApiKey()) return;
    setLoading(true);
    try {
      const chain = await fetchOptionsChain(liveSymbol, exp);
      const opts = isCall ? chain.calls : chain.puts;
      const atm = opts.reduce((prev, curr) =>
        Math.abs(curr.strike - stockPrice) < Math.abs(prev.strike - stockPrice) ? curr : prev,
        opts[0]
      );
      if (atm) {
        setStrike(atm.strike);
        if (atm.iv > 0) setIv(Math.round(atm.iv));
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [liveSymbol, isCall, stockPrice]);

  // ─── Greek Calculations ────────────────────────────

  const currentGreeks = useMemo(
    () => calcGreeks(stockPrice, strike, dte / 365, rfRate / 100, iv / 100, isCall),
    [stockPrice, strike, dte, iv, rfRate, isCall],
  );

  // Generate curve data for the active greek across a price range
  const curveData = useMemo(() => {
    const T = dte / 365;
    const r = rfRate / 100;
    const sigma = iv / 100;
    const range = stockPrice * 0.3; // ±30%
    const points: GreekPoint[] = [];

    for (let i = 0; i <= 60; i++) {
      const p = stockPrice - range + (range * 2 * i) / 60;
      const g = calcGreeks(p, strike, T, r, sigma, isCall);
      points.push({ price: p, delta: g.delta, gamma: g.gamma, theta: g.theta, vega: g.vega });
    }
    return points;
  }, [stockPrice, strike, dte, iv, rfRate, isCall]);

  // Theta decay curve (option value over DTE)
  const thetaCurve = useMemo(() => {
    const r = rfRate / 100;
    const sigma = iv / 100;
    const pts: { dte: number; value: number }[] = [];
    for (let d = dte; d >= 0; d--) {
      const T = d / 365;
      const price = blackScholes(isCall ? 'call' : 'put', stockPrice, strike, T, r, sigma);
      pts.push({ dte: d, value: price });
    }
    return pts;
  }, [stockPrice, strike, dte, iv, rfRate, isCall]);

  // ─── SVG Chart Rendering ──────────────────────────

  const meta = GREEK_META[activeGreek];

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-95">
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
            </button>
            <Activity className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">Greeks Visualizer</h1>
            <div className="ml-auto flex gap-2">
              {liveSymbol && <Wifi className="w-4 h-4 text-emerald-400" />}
              <button onClick={() => setShowApiModal(true)} className="p-1.5">
                <Settings className="w-4 h-4 text-zinc-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* ═══ LIVE DATA SEARCH ═══ */}
        {hasKey && (
          <div className="flex gap-2">
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && fetchLive()}
              placeholder="Symbol (e.g. AAPL)"
              className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-mono text-sm placeholder-zinc-600 focus:border-cyan-500/50 focus:outline-none"
            />
            <button
              onClick={fetchLive}
              disabled={loading}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-800 text-white rounded-xl text-sm font-bold active:scale-[0.98] flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Fetch
            </button>
          </div>
        )}

        {/* Expiration selector */}
        {expirations.length > 0 && (
          <select
            value={selectedExp}
            onChange={(e) => handleExpChange(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-cyan-400 font-mono text-sm"
          >
            {expirations.map(exp => (
              <option key={exp} value={exp}>
                {new Date(exp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ({calculateDTE(exp)} DTE)
              </option>
            ))}
          </select>
        )}

        {/* ═══ CALL/PUT TOGGLE ═══ */}
        <div className="flex gap-2">
          {([true, false] as const).map((c) => (
            <button
              key={String(c)}
              onClick={() => setIsCall(c)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold active:scale-[0.98] transition-all ${
                isCall === c
                  ? c ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                       : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  : 'bg-[#0a0a0a] border border-zinc-800 text-zinc-500'
              }`}
            >
              {c ? '📈 Call' : '📉 Put'}
            </button>
          ))}
        </div>

        {/* ═══ INPUT SLIDERS ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 space-y-3">
          <Slider label="Stock Price" value={stockPrice} onChange={setStockPrice} min={1} max={500} step={0.5} prefix="$" color="#22c55e" />
          <Slider label="Strike" value={strike} onChange={setStrike} min={1} max={500} step={0.5} prefix="$" color="#ffffff" />
          <Slider label="IV" value={iv} onChange={setIv} min={5} max={200} step={1} suffix="%" color="#a855f7" />
          <Slider label="DTE" value={dte} onChange={setDte} min={1} max={365} step={1} color="#fbbf24" />
        </div>

        {/* ═══ GREEK SELECTOR TABS ═══ */}
        <div className="flex gap-1.5">
          {(Object.keys(GREEK_META) as GreekKey[]).map((key) => {
            const m = GREEK_META[key];
            const Icon = m.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveGreek(key)}
                className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 active:scale-[0.97] transition-all ${
                  activeGreek === key
                    ? 'border-2'
                    : 'bg-[#0a0a0a] border border-zinc-800 text-zinc-500'
                }`}
                style={activeGreek === key ? {
                  backgroundColor: `${m.color}15`,
                  borderColor: `${m.color}60`,
                  color: m.color,
                } : undefined}
              >
                <Icon className="w-4 h-4" />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* ═══ CURRENT GREEKS DISPLAY ═══ */}
        <div className="grid grid-cols-2 gap-2">
          <GreekCard label="Delta" value={currentGreeks.delta} format={(v) => v.toFixed(4)} color="#22c55e" highlight={activeGreek === 'delta'} />
          <GreekCard label="Gamma" value={currentGreeks.gamma} format={(v) => v.toFixed(5)} color="#f59e0b" highlight={activeGreek === 'gamma'} />
          <GreekCard label="Theta" value={currentGreeks.theta} format={(v) => v.toFixed(4)} color="#ef4444" highlight={activeGreek === 'theta'} />
          <GreekCard label="Vega" value={currentGreeks.vega} format={(v) => v.toFixed(4)} color="#a855f7" highlight={activeGreek === 'vega'} />
        </div>

        {/* Option Price */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 text-center">
          <p className="text-[10px] text-zinc-500 uppercase">Option Price (B-S)</p>
          <p className="text-2xl font-black text-[#39ff14] font-mono">${currentGreeks.price.toFixed(2)}</p>
          <p className="text-[10px] text-zinc-500">Per contract: ${(currentGreeks.price * 100).toFixed(0)}</p>
        </div>

        {/* ═══ GREEK VS PRICE CHART ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
            {meta.label} vs Stock Price
          </h3>
          <GreekChart data={curveData} greekKey={activeGreek} color={meta.color} currentPrice={stockPrice} strike={strike} />
          <p className="text-[10px] text-zinc-600 mt-2 text-center">{meta.desc}</p>
        </div>

        {/* ═══ THETA DECAY CHART ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            Theta Decay (Option Value Over Time)
          </h3>
          <ThetaDecayChart data={thetaCurve} color="#ef4444" />
          <p className="text-[10px] text-zinc-600 mt-2 text-center">
            Time decay accelerates exponentially in the final 30 days
          </p>
        </div>

        {/* ═══ SENSITIVITY MATRIX ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3">
            Sensitivity Analysis
          </h3>
          <SensitivityTable
            stockPrice={stockPrice}
            strike={strike}
            dte={dte}
            iv={iv}
            rfRate={rfRate}
            isCall={isCall}
          />
        </div>

        {/* ═══ GREEK EXPLAINERS ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3">Quick Reference</h3>
          <div className="space-y-2">
            <ExplainerRow icon="Δ" label="Delta" text={isCall ? `${(currentGreeks.delta * 100).toFixed(0)}% chance of expiring ITM. Option moves $${Math.abs(currentGreeks.delta).toFixed(2)} per $1 stock move.` : `${(Math.abs(currentGreeks.delta) * 100).toFixed(0)}% chance of expiring ITM. Option moves $${Math.abs(currentGreeks.delta).toFixed(2)} per $1 stock move.`} color="#22c55e" />
            <ExplainerRow icon="Γ" label="Gamma" text={`Delta changes by ${currentGreeks.gamma.toFixed(4)} per $1 move. ${currentGreeks.gamma > 0.05 ? 'HIGH — near ATM, delta shifts fast.' : 'Low — deep ITM/OTM, delta is stable.'}`} color="#f59e0b" />
            <ExplainerRow icon="Θ" label="Theta" text={`Losing $${Math.abs(currentGreeks.theta).toFixed(2)}/day (${(Math.abs(currentGreeks.theta) / currentGreeks.price * 100).toFixed(1)}% of value). ${dte < 30 ? '⚠️ Decay accelerating!' : ''}`} color="#ef4444" />
            <ExplainerRow icon="ν" label="Vega" text={`Option moves $${currentGreeks.vega.toFixed(2)} per 1% IV change. ${iv > 50 ? 'HIGH IV — selling premium favored.' : iv < 20 ? 'LOW IV — buying options is cheaper.' : 'Moderate IV.'}`} color="#a855f7" />
          </div>
        </div>
      </div>

      {/* ═══ API KEY MODAL ═══ */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold flex items-center gap-2"><Settings className="w-4 h-4 text-cyan-400" /> Tradier API</h3>
              <button onClick={() => setShowApiModal(false)}><X className="w-5 h-5 text-zinc-400" /></button>
            </div>
            <input
              type="password"
              value={apiInput}
              onChange={(e) => setApiInput(e.target.value)}
              placeholder="Tradier API token..."
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-white font-mono text-sm mb-3 focus:border-cyan-500 focus:outline-none"
            />
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 mb-3">
              <p className="text-xs text-cyan-400 font-bold mb-1">Free sandbox data:</p>
              <p className="text-[10px] text-zinc-400">Sign up at developer.tradier.com → Create sandbox app → Copy Access Token</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowApiModal(false)} className="flex-1 py-2.5 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-bold active:scale-[0.98]">Cancel</button>
              <button
                onClick={() => { saveApiKey(apiInput); setShowApiModal(false); }}
                className="flex-1 py-2.5 bg-cyan-600 text-white rounded-lg text-sm font-bold active:scale-[0.98]"
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────

const SLIDER_VARIANT: Record<string, string> = {
  '#22c55e': 'sim-slider',
  '#ffffff': 'sim-slider',
  '#a855f7': 'sim-slider sim-slider-purple',
  '#fbbf24': 'sim-slider sim-slider-amber',
  '#22d3ee': 'sim-slider sim-slider-cyan',
};

function Slider({ label, value, onChange, min, max, step, prefix, suffix, color }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; prefix?: string; suffix?: string; color: string;
}) {
  const sliderClass = SLIDER_VARIANT[color] || 'sim-slider';
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-zinc-400">{label}</span>
        <span className="text-sm font-bold font-mono" style={{ color }}>
          {prefix}{value.toFixed(step < 1 ? 2 : 0)}{suffix}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full ${sliderClass}`}
      />
    </div>
  );
}

function GreekCard({ label, value, format, color, highlight }: {
  label: string; value: number; format: (v: number) => string; color: string; highlight: boolean;
}) {
  return (
    <div className={`bg-[#0a0a0a] rounded-xl p-3 text-center transition-all ${
      highlight ? 'border-2' : 'border border-zinc-800'
    }`} style={highlight ? { borderColor: `${color}60`, backgroundColor: `${color}08` } : undefined}>
      <p className="text-[10px] text-zinc-500 uppercase">{label}</p>
      <p className="text-xl font-black font-mono" style={{ color }}>{format(value)}</p>
    </div>
  );
}

function GreekChart({ data, greekKey, color, currentPrice, strike }: {
  data: GreekPoint[]; greekKey: GreekKey; color: string; currentPrice: number; strike: number;
}) {
  const W = 320, H = 160, PAD = 30;
  const values = data.map(d => d[greekKey]);
  const prices = data.map(d => d.price);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const rangeV = maxV - minV || 1;
  const rangeP = maxP - minP || 1;

  const toX = (p: number) => PAD + ((p - minP) / rangeP) * (W - PAD * 2);
  const toY = (v: number) => H - PAD - ((v - minV) / rangeV) * (H - PAD * 2);

  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(d.price).toFixed(1)},${toY(d[greekKey]).toFixed(1)}`).join(' ');

  const currentX = toX(currentPrice);
  const strikeX = toX(strike);
  const zeroY = minV <= 0 && maxV >= 0 ? toY(0) : null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 180 }}>
      {/* Zero line */}
      {zeroY !== null && (
        <line x1={PAD} y1={zeroY} x2={W - PAD} y2={zeroY} stroke="#333" strokeWidth={0.5} strokeDasharray="4 4" />
      )}
      {/* Strike line */}
      <line x1={strikeX} y1={PAD / 2} x2={strikeX} y2={H - PAD / 2} stroke="#555" strokeWidth={0.5} strokeDasharray="2 2" />
      <text x={strikeX} y={PAD / 2 - 2} fill="#666" fontSize={8} textAnchor="middle">Strike</text>
      {/* Current price line */}
      <line x1={currentX} y1={PAD / 2} x2={currentX} y2={H - PAD / 2} stroke="#39ff14" strokeWidth={0.5} strokeDasharray="3 3" />
      <text x={currentX} y={H - 2} fill="#39ff14" fontSize={8} textAnchor="middle">${currentPrice.toFixed(0)}</text>
      {/* The curve */}
      <path d={pathD} fill="none" stroke={color} strokeWidth={2} />
      {/* Current value dot */}
      {data.length > 0 && (() => {
        const closest = data.reduce((a, b) => Math.abs(a.price - currentPrice) < Math.abs(b.price - currentPrice) ? a : b);
        return <circle cx={toX(closest.price)} cy={toY(closest[greekKey])} r={4} fill={color} stroke="black" strokeWidth={1.5} />;
      })()}
      {/* Y-axis labels */}
      <text x={PAD - 4} y={PAD} fill="#666" fontSize={8} textAnchor="end">{maxV.toFixed(3)}</text>
      <text x={PAD - 4} y={H - PAD} fill="#666" fontSize={8} textAnchor="end">{minV.toFixed(3)}</text>
    </svg>
  );
}

function ThetaDecayChart({ data, color }: { data: { dte: number; value: number }[]; color: string }) {
  const W = 320, H = 140, PAD = 30;
  if (data.length === 0) return null;

  const values = data.map(d => d.value);
  const maxV = Math.max(...values);
  const maxDTE = data[0]?.dte || 30;

  const toX = (dte: number) => PAD + ((maxDTE - dte) / maxDTE) * (W - PAD * 2);
  const toY = (v: number) => H - PAD - (v / (maxV || 1)) * (H - PAD * 2);

  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(d.dte).toFixed(1)},${toY(d.value).toFixed(1)}`).join(' ');

  // Area fill
  const areaD = pathD + ` L${toX(0).toFixed(1)},${toY(0).toFixed(1)} L${toX(maxDTE).toFixed(1)},${toY(0).toFixed(1)} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 160 }}>
      <defs>
        <linearGradient id="thetaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#thetaFill)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth={2} />
      {/* X-axis labels */}
      <text x={toX(maxDTE)} y={H - 4} fill="#666" fontSize={8} textAnchor="start">{maxDTE}d</text>
      <text x={toX(Math.round(maxDTE / 2))} y={H - 4} fill="#666" fontSize={8} textAnchor="middle">{Math.round(maxDTE / 2)}d</text>
      <text x={toX(0)} y={H - 4} fill="#666" fontSize={8} textAnchor="end">0d</text>
      {/* Y-axis */}
      <text x={PAD - 4} y={PAD} fill="#666" fontSize={8} textAnchor="end">${maxV.toFixed(2)}</text>
      <text x={PAD - 4} y={H - PAD} fill="#666" fontSize={8} textAnchor="end">$0</text>
      {/* 30-day marker */}
      {maxDTE > 30 && (
        <>
          <line x1={toX(30)} y1={PAD} x2={toX(30)} y2={H - PAD} stroke="#fbbf24" strokeWidth={0.5} strokeDasharray="3 3" />
          <text x={toX(30)} y={PAD - 2} fill="#fbbf24" fontSize={7} textAnchor="middle">30d</text>
        </>
      )}
    </svg>
  );
}

function SensitivityTable({ stockPrice, strike, dte, iv, rfRate, isCall }: {
  stockPrice: number; strike: number; dte: number; iv: number; rfRate: number; isCall: boolean;
}) {
  // Show option price at various stock price / IV combinations
  const priceSteps = [-10, -5, 0, 5, 10];
  const ivSteps = [-10, -5, 0, 5, 10];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[10px]">
        <thead>
          <tr>
            <th className="text-left text-zinc-500 py-1 pr-2">Price↓ / IV→</th>
            {ivSteps.map(dIV => (
              <th key={dIV} className="text-center text-zinc-500 py-1 px-1">
                {iv + dIV}%
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {priceSteps.map(dP => (
            <tr key={dP} className="border-t border-zinc-800/50">
              <td className="py-1.5 pr-2 text-zinc-400 font-mono">
                ${(stockPrice + dP).toFixed(0)}
              </td>
              {ivSteps.map(dIV => {
                const price = blackScholes(
                  isCall ? 'call' : 'put',
                  stockPrice + dP,
                  strike,
                  dte / 365,
                  rfRate / 100,
                  (iv + dIV) / 100,
                );
                const isCurrent = dP === 0 && dIV === 0;
                return (
                  <td key={dIV} className={`text-center py-1.5 px-1 font-mono ${
                    isCurrent ? 'text-[#39ff14] font-bold' : 'text-zinc-300'
                  }`}>
                    ${price.toFixed(2)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[9px] text-zinc-600 mt-1">Option price at different stock prices and IV levels</p>
    </div>
  );
}

function ExplainerRow({ icon, label, text, color }: { icon: string; label: string; text: string; color: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-zinc-800/50 last:border-0">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-zinc-300">{label}</p>
        <p className="text-[10px] text-zinc-500 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
