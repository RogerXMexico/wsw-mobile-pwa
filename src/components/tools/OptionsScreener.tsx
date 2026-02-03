import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, Loader2, RefreshCw, ChevronDown, ChevronUp,
  Zap, TrendingUp, Clock, DollarSign, Eye, Plus, X, Key, Settings,
  Star, AlertTriangle, Info, Calendar
} from 'lucide-react';
import {
  getApiKey, setApiKey, fetchQuote, fetchExpirations, fetchOptionsChain,
  calculateDTE, findNearestExpiration, findNearestStrike,
  recordIVReading, getSymbolIVHistory, calculateIVRank,
  type OptionData, type StockQuote
} from '../../services/tradierApi';

// ─── Types ──────────────────────────────────────────────

type ScreenerTab = 'screener' | 'chain' | 'watchlist';
type ChainView = 'calls' | 'puts' | 'both';
type PresetKey = 'high-iv-puts' | 'covered-calls' | 'leaps' | 'weekly-income';

interface PresetDef {
  key: PresetKey;
  label: string;
  icon: typeof Zap;
  desc: string;
  filter: (opt: OptionData, dte: number) => boolean;
  expirationFilter?: (dte: number) => boolean;
}

interface ScreenerResult extends OptionData {
  stockPrice: number;
  dte: number;
  midPrice: number;
}

interface IVWatchlistItem {
  symbol: string;
  addedAt: number;
  lastIV: number | null;
  lastPrice: number | null;
  lastChecked: number | null;
  ivRankEstimate: number | null;
}

interface OptionDetailModal {
  option: OptionData;
  stockPrice: number;
  dte: number;
}

// ─── Presets ────────────────────────────────────────────

const PRESETS: PresetDef[] = [
  {
    key: 'high-iv-puts',
    label: 'High IV Puts',
    icon: Zap,
    desc: 'IV > 40%, delta -0.2 to -0.4',
    filter: (opt, _dte) =>
      opt.type === 'put' &&
      opt.iv > 40 &&
      opt.delta >= -0.4 &&
      opt.delta <= -0.2 &&
      opt.bid > 0,
  },
  {
    key: 'covered-calls',
    label: 'Covered Calls',
    icon: TrendingUp,
    desc: '30-45 DTE, delta 0.2-0.4',
    filter: (opt, dte) =>
      opt.type === 'call' &&
      dte >= 30 && dte <= 45 &&
      opt.delta >= 0.2 && opt.delta <= 0.4 &&
      opt.bid > 0,
    expirationFilter: (dte) => dte >= 30 && dte <= 45,
  },
  {
    key: 'leaps',
    label: 'LEAPS',
    icon: Calendar,
    desc: '180+ DTE, long-term plays',
    filter: (opt, dte) =>
      dte >= 180 && opt.bid > 0,
    expirationFilter: (dte) => dte >= 180,
  },
  {
    key: 'weekly-income',
    label: 'Weekly Income',
    icon: DollarSign,
    desc: '≤7 DTE, high premium',
    filter: (opt, dte) =>
      dte <= 7 && dte >= 0 &&
      opt.bid > 0 &&
      ((opt.bid + opt.ask) / 2) >= 0.10,
    expirationFilter: (dte) => dte <= 7,
  },
];

// ─── localStorage keys ─────────────────────────────────

const IV_WATCHLIST_KEY = 'screener_iv_watchlist';

function loadWatchlist(): IVWatchlistItem[] {
  try {
    const raw = localStorage.getItem(IV_WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveWatchlist(items: IVWatchlistItem[]) {
  localStorage.setItem(IV_WATCHLIST_KEY, JSON.stringify(items));
}

// ─── Helpers ────────────────────────────────────────────

function fmt(n: number, decimals = 2): string {
  return n.toFixed(decimals);
}

function fmtVol(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

function getIVColor(iv: number): string {
  if (iv >= 60) return 'text-red-400';
  if (iv >= 40) return 'text-amber-400';
  if (iv >= 25) return 'text-[#39ff14]';
  return 'text-zinc-400';
}

function getDeltaColor(delta: number): string {
  const abs = Math.abs(delta);
  if (abs >= 0.7) return 'text-white';
  if (abs >= 0.4) return 'text-zinc-300';
  return 'text-zinc-500';
}

// ═══════════════════════════════════════════════════════════
// ─── COMPONENT ────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════

export default function OptionsScreener() {
  const navigate = useNavigate();
  const hasApiKey = !!getApiKey();

  // ─── Global state ─────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ScreenerTab>('screener');
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  // ─── Screener state ───────────────────────────────────
  const [symbol, setSymbol] = useState('');
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [expirations, setExpirations] = useState<string[]>([]);
  const [selectedExpiration, setSelectedExpiration] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<PresetKey | null>(null);
  const [screenerResults, setScreenerResults] = useState<ScreenerResult[]>([]);
  const [screenerLoading, setScreenerLoading] = useState(false);
  const [screenerError, setScreenerError] = useState<string | null>(null);

  // ─── Chain state ──────────────────────────────────────
  const [chainSymbol, setChainSymbol] = useState('');
  const [chainQuote, setChainQuote] = useState<StockQuote | null>(null);
  const [chainExpirations, setChainExpirations] = useState<string[]>([]);
  const [chainSelectedExp, setChainSelectedExp] = useState<string | null>(null);
  const [chainCalls, setChainCalls] = useState<OptionData[]>([]);
  const [chainPuts, setChainPuts] = useState<OptionData[]>([]);
  const [chainView, setChainView] = useState<ChainView>('calls');
  const [chainLoading, setChainLoading] = useState(false);
  const [chainError, setChainError] = useState<string | null>(null);
  const [showExpDropdown, setShowExpDropdown] = useState(false);

  // ─── Detail modal ─────────────────────────────────────
  const [detailModal, setDetailModal] = useState<OptionDetailModal | null>(null);

  // ─── IV Watchlist state ───────────────────────────────
  const [watchlist, setWatchlist] = useState<IVWatchlistItem[]>(loadWatchlist);
  const [watchlistInput, setWatchlistInput] = useState('');
  const [watchlistRefreshing, setWatchlistRefreshing] = useState(false);

  // ─── Manual mode state (no API key) ──────────────────
  const [manualStrike, setManualStrike] = useState('');
  const [manualBid, setManualBid] = useState('');
  const [manualAsk, setManualAsk] = useState('');
  const [manualIV, setManualIV] = useState('');
  const [manualDelta, setManualDelta] = useState('');
  const [manualType, setManualType] = useState<'call' | 'put'>('call');

  // ─── Persist watchlist ────────────────────────────────
  useEffect(() => { saveWatchlist(watchlist); }, [watchlist]);

  // ════════════════════════════════════════════════════════
  // ─── SCREENER LOGIC ─────────────────────────────────────
  // ════════════════════════════════════════════════════════

  const handleSymbolSearch = useCallback(async (sym: string, preset?: PresetKey) => {
    const trimmed = sym.trim().toUpperCase();
    if (!trimmed || !getApiKey()) return;

    setScreenerLoading(true);
    setScreenerError(null);
    setScreenerResults([]);

    try {
      const [q, exps] = await Promise.all([
        fetchQuote(trimmed),
        fetchExpirations(trimmed),
      ]);
      setQuote(q);
      setExpirations(exps);

      if (exps.length === 0) {
        setScreenerError('No options available for this symbol');
        setScreenerLoading(false);
        return;
      }

      const usedPreset = preset ?? activePreset;
      const presetDef = usedPreset ? PRESETS.find(p => p.key === usedPreset) : null;

      // Pick expirations to scan
      let targetExps = exps;
      if (presetDef?.expirationFilter) {
        targetExps = exps.filter(e => presetDef.expirationFilter!(calculateDTE(e)));
        if (targetExps.length === 0) targetExps = exps.slice(0, 3);
      } else {
        targetExps = exps.slice(0, 4); // Scan first 4 expirations
      }

      setSelectedExpiration(targetExps[0]);

      const allResults: ScreenerResult[] = [];

      for (const exp of targetExps) {
        const dte = calculateDTE(exp);
        const chain = await fetchOptionsChain(trimmed, exp);
        const allOpts = [...chain.calls, ...chain.puts];

        for (const opt of allOpts) {
          const passes = presetDef ? presetDef.filter(opt, dte) : opt.bid > 0;
          if (passes) {
            allResults.push({
              ...opt,
              stockPrice: q.price,
              dte,
              midPrice: (opt.bid + opt.ask) / 2,
            });
          }
        }
      }

      // Sort by premium descending
      allResults.sort((a, b) => b.midPrice - a.midPrice);
      setScreenerResults(allResults);

    } catch (err) {
      setScreenerError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setScreenerLoading(false);
    }
  }, [activePreset]);

  const handlePresetTap = (key: PresetKey) => {
    setActivePreset(key);
    if (symbol.trim()) {
      handleSymbolSearch(symbol, key);
    }
  };

  // ════════════════════════════════════════════════════════
  // ─── CHAIN LOGIC ────────────────────────────────────────
  // ════════════════════════════════════════════════════════

  const handleChainSearch = useCallback(async (sym: string) => {
    const trimmed = sym.trim().toUpperCase();
    if (!trimmed || !getApiKey()) return;

    setChainLoading(true);
    setChainError(null);
    setChainCalls([]);
    setChainPuts([]);

    try {
      const [q, exps] = await Promise.all([
        fetchQuote(trimmed),
        fetchExpirations(trimmed),
      ]);
      setChainQuote(q);
      setChainExpirations(exps);
      setChainSymbol(trimmed);

      if (exps.length > 0) {
        setChainSelectedExp(exps[0]);
        const chain = await fetchOptionsChain(trimmed, exps[0]);
        setChainCalls(chain.calls);
        setChainPuts(chain.puts);
      }
    } catch (err) {
      setChainError(err instanceof Error ? err.message : 'Failed to fetch chain');
    } finally {
      setChainLoading(false);
    }
  }, []);

  const handleExpirationChange = useCallback(async (exp: string) => {
    if (!chainSymbol || !getApiKey()) return;
    setChainSelectedExp(exp);
    setShowExpDropdown(false);
    setChainLoading(true);
    setChainError(null);

    try {
      const chain = await fetchOptionsChain(chainSymbol, exp);
      setChainCalls(chain.calls);
      setChainPuts(chain.puts);
    } catch (err) {
      setChainError(err instanceof Error ? err.message : 'Failed to fetch chain');
    } finally {
      setChainLoading(false);
    }
  }, [chainSymbol]);

  // Chain display data
  const chainOptions = useMemo(() => {
    if (chainView === 'calls') return chainCalls;
    if (chainView === 'puts') return chainPuts;
    // "Both" - interleave by strike
    const allStrikes = new Set([...chainCalls.map(c => c.strike), ...chainPuts.map(p => p.strike)]);
    const sorted = Array.from(allStrikes).sort((a, b) => a - b);
    const merged: (OptionData & { _paired?: OptionData })[] = [];
    for (const strike of sorted) {
      const call = chainCalls.find(c => c.strike === strike);
      const put = chainPuts.find(p => p.strike === strike);
      if (call) merged.push({ ...call, _paired: put });
      else if (put) merged.push(put);
    }
    return merged;
  }, [chainCalls, chainPuts, chainView]);

  const atmStrike = useMemo(() => {
    if (!chainQuote || chainOptions.length === 0) return null;
    const nearest = findNearestStrike(chainOptions, chainQuote.price);
    return nearest?.strike ?? null;
  }, [chainQuote, chainOptions]);

  // ════════════════════════════════════════════════════════
  // ─── WATCHLIST LOGIC ────────────────────────────────────
  // ════════════════════════════════════════════════════════

  const addToWatchlist = (sym: string) => {
    const upper = sym.trim().toUpperCase();
    if (!upper || watchlist.some(w => w.symbol === upper)) return;
    setWatchlist(prev => [...prev, {
      symbol: upper,
      addedAt: Date.now(),
      lastIV: null,
      lastPrice: null,
      lastChecked: null,
      ivRankEstimate: null,
    }]);
    setWatchlistInput('');
  };

  const removeFromWatchlist = (sym: string) => {
    setWatchlist(prev => prev.filter(w => w.symbol !== sym));
  };

  const refreshWatchlist = useCallback(async () => {
    if (!getApiKey() || watchlist.length === 0) return;
    setWatchlistRefreshing(true);

    const updated = [...watchlist];
    for (let i = 0; i < updated.length; i++) {
      try {
        const q = await fetchQuote(updated[i].symbol);
        const exps = await fetchExpirations(updated[i].symbol);
        if (exps.length === 0) continue;

        const nearExp = findNearestExpiration(exps, 25) || exps[0];
        const chain = await fetchOptionsChain(updated[i].symbol, nearExp);

        // Find ATM IV
        const allOpts = [...chain.calls, ...chain.puts];
        const atm = findNearestStrike(allOpts, q.price);
        const currentIV = atm?.iv ?? null;

        if (currentIV && currentIV > 0) {
          recordIVReading(updated[i].symbol, currentIV);
        }

        // Calculate IV rank from stored history
        const history = getSymbolIVHistory(updated[i].symbol);
        const histIVs = history.map(h => h.iv);
        let ivRank: number | null = null;
        if (histIVs.length >= 5 && currentIV) {
          ivRank = calculateIVRank(currentIV, histIVs);
        } else if (currentIV) {
          // Rough estimate if not enough history
          ivRank = Math.max(0, Math.min(100, ((currentIV - 15) / 45) * 100));
        }

        updated[i] = {
          ...updated[i],
          lastIV: currentIV,
          lastPrice: q.price,
          lastChecked: Date.now(),
          ivRankEstimate: ivRank !== null ? Math.round(ivRank) : null,
        };

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 300));
      } catch (err) {
        console.error(`Failed to refresh ${updated[i].symbol}:`, err);
      }
    }

    setWatchlist(updated);
    setWatchlistRefreshing(false);
  }, [watchlist]);

  // ════════════════════════════════════════════════════════
  // ─── API KEY SETUP MODAL ────────────────────────────────
  // ════════════════════════════════════════════════════════

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setShowApiSetup(false);
      setApiKeyInput('');
    }
  };

  // ════════════════════════════════════════════════════════
  // ─── RENDER ─────────────────────────────────────────────
  // ════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-black pb-28">
      {/* ─── Header ──────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 bg-black/95 backdrop-blur-md border-b border-[#39ff14]/10 px-4 pb-3"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/tools')}
              className="text-[#39ff14] p-1 -ml-1 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-[0.98]"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">Options Screener</h1>
              <p className="text-xs text-zinc-500">Find trades with live data</p>
            </div>
          </div>
          <button
            onClick={() => setShowApiSetup(true)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-500 active:scale-[0.98]"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* ─── Tab Bar ───────────────────────────────── */}
        <div className="flex gap-1 bg-[#0a0a0a] rounded-xl p-1">
          {([
            { key: 'screener' as ScreenerTab, label: 'Screener', icon: Search },
            { key: 'chain' as ScreenerTab, label: 'Chain', icon: Eye },
            { key: 'watchlist' as ScreenerTab, label: 'IV Watch', icon: Star },
          ]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all min-h-[44px] active:scale-[0.98] ${
                activeTab === tab.key
                  ? 'bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/30'
                  : 'text-zinc-500'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── API Key Setup Modal ─────────────────────── */}
      {showApiSetup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-5 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <Key size={20} className="text-[#39ff14]" />
              <h2 className="text-lg font-bold text-white">Tradier API Key</h2>
            </div>
            <p className="text-zinc-400 text-sm mb-4">
              Get a free sandbox key from{' '}
              <a
                href="https://developer.tradier.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39ff14] underline"
              >
                developer.tradier.com
              </a>
            </p>
            <ol className="text-xs text-zinc-500 space-y-1 mb-4 list-decimal list-inside">
              <li>Sign up for a free account</li>
              <li>Create a sandbox application</li>
              <li>Copy your Access Token</li>
              <li>Paste it below</li>
            </ol>
            <input
              type="text"
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              placeholder="Paste your API key..."
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm font-mono mb-4 focus:outline-none focus:border-[#39ff14]/50"
            />
            {getApiKey() && (
              <p className="text-xs text-[#39ff14]/60 mb-3">✓ Key already configured</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowApiSetup(false); setApiKeyInput(''); }}
                className="flex-1 py-3 bg-black border border-zinc-700 rounded-xl text-zinc-400 text-sm font-medium min-h-[44px] active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="flex-1 py-3 bg-[#39ff14]/15 border border-[#39ff14]/30 rounded-xl text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Option Detail Modal ─────────────────────── */}
      {detailModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setDetailModal(null)}>
          <div
            className="bg-[#0a0a0a] border-t border-[#39ff14]/20 rounded-t-2xl p-5 w-full max-w-lg animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  detailModal.option.type === 'call'
                    ? 'bg-[#39ff14]/15 text-[#39ff14]'
                    : 'bg-red-500/15 text-red-400'
                }`}>
                  {detailModal.option.type.toUpperCase()}
                </span>
                <h3 className="text-white font-bold text-lg mt-1">
                  ${fmt(detailModal.option.strike)} Strike
                </h3>
                <p className="text-zinc-500 text-xs">
                  Exp: {detailModal.option.expiration} · {detailModal.dte} DTE
                </p>
              </div>
              <div className="text-right">
                <p className="text-zinc-400 text-xs">Stock</p>
                <p className="text-white font-mono font-bold">${fmt(detailModal.stockPrice)}</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Bid', value: `$${fmt(detailModal.option.bid)}`, color: 'text-[#39ff14]' },
                { label: 'Ask', value: `$${fmt(detailModal.option.ask)}`, color: 'text-red-400' },
                { label: 'Last', value: `$${fmt(detailModal.option.last)}`, color: 'text-white' },
              ].map(item => (
                <div key={item.label} className="bg-black rounded-xl p-3 text-center border border-zinc-800">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{item.label}</p>
                  <p className={`font-mono font-bold text-sm ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Greeks */}
            <p className="text-zinc-500 text-xs font-medium mb-2 uppercase tracking-wider">Greeks</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Delta (Δ)', value: fmt(detailModal.option.delta, 4), desc: 'Price sensitivity' },
                { label: 'Gamma (Γ)', value: fmt(detailModal.option.gamma, 4), desc: 'Delta change rate' },
                { label: 'Theta (Θ)', value: fmt(detailModal.option.theta, 4), desc: 'Time decay/day' },
                { label: 'Vega (ν)', value: fmt(detailModal.option.vega, 4), desc: 'IV sensitivity' },
              ].map(g => (
                <div key={g.label} className="bg-black rounded-xl p-3 border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 text-[10px]">{g.label}</span>
                    <span className="font-mono text-white text-sm font-bold">{g.value}</span>
                  </div>
                  <p className="text-zinc-600 text-[9px] mt-0.5">{g.desc}</p>
                </div>
              ))}
            </div>

            {/* Volume & OI */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'IV', value: `${fmt(detailModal.option.iv, 1)}%` },
                { label: 'Volume', value: fmtVol(detailModal.option.volume) },
                { label: 'Open Int', value: fmtVol(detailModal.option.openInterest) },
              ].map(item => (
                <div key={item.label} className="bg-black rounded-xl p-3 text-center border border-zinc-800">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{item.label}</p>
                  <p className="font-mono text-white text-sm font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setDetailModal(null)}
              className="w-full py-3 bg-[#39ff14]/10 border border-[#39ff14]/20 rounded-xl text-[#39ff14] font-medium text-sm min-h-[44px] active:scale-[0.98]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* ─── SCREENER TAB ─────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════ */}
      {activeTab === 'screener' && (
        <div className="px-4 pt-4">
          {/* Symbol Search */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                value={symbol}
                onChange={e => setSymbol(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleSymbolSearch(symbol)}
                placeholder="Enter ticker (e.g. AAPL)"
                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#39ff14]/30 min-h-[44px]"
              />
            </div>
            <button
              onClick={() => handleSymbolSearch(symbol)}
              disabled={screenerLoading || !symbol.trim()}
              className="px-5 bg-[#39ff14]/15 border border-[#39ff14]/30 rounded-xl text-[#39ff14] font-medium text-sm min-h-[44px] min-w-[44px] active:scale-[0.98] disabled:opacity-40"
            >
              {screenerLoading ? <Loader2 size={18} className="animate-spin" /> : 'Go'}
            </button>
          </div>

          {/* Quote Bar */}
          {quote && (
            <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-white font-bold text-sm">{quote.symbol}</span>
                <span className="text-zinc-500 text-xs ml-2">Stock</span>
              </div>
              <div className="text-right">
                <span className="text-white font-mono font-bold">${fmt(quote.price)}</span>
                <span className={`text-xs font-mono ml-2 ${quote.change >= 0 ? 'text-[#39ff14]' : 'text-red-400'}`}>
                  {quote.change >= 0 ? '+' : ''}{fmt(quote.change)} ({fmt(quote.changePercent, 1)}%)
                </span>
              </div>
            </div>
          )}

          {/* Preset Buttons */}
          <div className="mb-4">
            <p className="text-zinc-500 text-xs font-medium mb-2 uppercase tracking-wider">Presets</p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map(preset => {
                const Icon = preset.icon;
                const isActive = activePreset === preset.key;
                return (
                  <button
                    key={preset.key}
                    onClick={() => handlePresetTap(preset.key)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left min-h-[44px] active:scale-[0.98] transition-all ${
                      isActive
                        ? 'bg-[#39ff14]/10 border-[#39ff14]/40 shadow-[0_0_15px_rgba(57,255,20,0.1)]'
                        : 'bg-[#0a0a0a] border-zinc-800'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-[#39ff14] mt-0.5' : 'text-zinc-500 mt-0.5'} />
                    <div>
                      <p className={`text-xs font-medium ${isActive ? 'text-[#39ff14]' : 'text-zinc-300'}`}>
                        {preset.label}
                      </p>
                      <p className="text-[10px] text-zinc-600 mt-0.5">{preset.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error */}
          {screenerError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-xs">{screenerError}</p>
            </div>
          )}

          {/* Loading */}
          {screenerLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={32} className="text-[#39ff14] animate-spin mb-3" />
              <p className="text-zinc-500 text-sm">Scanning options chain...</p>
            </div>
          )}

          {/* Results */}
          {!screenerLoading && screenerResults.length > 0 && (
            <div>
              <p className="text-zinc-500 text-xs mb-2">
                Found <span className="text-[#39ff14] font-bold">{screenerResults.length}</span> matches
              </p>
              <div className="space-y-2">
                {screenerResults.map((r, idx) => (
                  <button
                    key={`${r.symbol}-${idx}`}
                    onClick={() => setDetailModal({ option: r, stockPrice: r.stockPrice, dte: r.dte })}
                    className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl p-3 text-left active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          r.type === 'call'
                            ? 'bg-[#39ff14]/15 text-[#39ff14]'
                            : 'bg-red-500/15 text-red-400'
                        }`}>
                          {r.type.toUpperCase()}
                        </span>
                        <span className="text-white font-mono text-sm font-bold">${fmt(r.strike)}</span>
                      </div>
                      <span className="text-zinc-500 text-xs font-mono">{r.dte}d</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <p className="text-zinc-600 text-[9px] uppercase">Bid/Ask</p>
                        <p className="text-zinc-300 font-mono text-xs">{fmt(r.bid)}/{fmt(r.ask)}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px] uppercase">IV</p>
                        <p className={`font-mono text-xs ${getIVColor(r.iv)}`}>{fmt(r.iv, 1)}%</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px] uppercase">Delta</p>
                        <p className={`font-mono text-xs ${getDeltaColor(r.delta)}`}>{fmt(r.delta, 3)}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px] uppercase">Vol/OI</p>
                        <p className="text-zinc-300 font-mono text-xs">{fmtVol(r.volume)}/{fmtVol(r.openInterest)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!screenerLoading && screenerResults.length === 0 && !screenerError && (
            <div className="flex flex-col items-center justify-center py-16">
              <Search size={40} className="text-zinc-800 mb-3" />
              <p className="text-zinc-500 text-sm mb-1">Enter a symbol & select a preset</p>
              <p className="text-zinc-600 text-xs">to find options opportunities</p>
            </div>
          )}

          {/* Manual Mode (no API key) */}
          {!hasApiKey && (
            <div className="mt-6">
              <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Key size={16} className="text-[#39ff14]" />
                  <p className="text-[#39ff14] text-sm font-medium">API Key Required for Live Data</p>
                </div>
                <p className="text-zinc-400 text-xs mb-3">
                  Tap the ⚙️ icon to configure your free Tradier API key, or use manual mode below.
                </p>
              </div>

              <p className="text-zinc-400 text-xs font-medium mb-3 uppercase tracking-wider">
                📝 Manual Mode — Enter data from your broker
              </p>

              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 space-y-3">
                <div className="flex gap-2">
                  {(['call', 'put'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setManualType(t)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-medium min-h-[44px] active:scale-[0.98] ${
                        manualType === t
                          ? t === 'call'
                            ? 'bg-[#39ff14]/15 border border-[#39ff14]/30 text-[#39ff14]'
                            : 'bg-red-500/15 border border-red-500/30 text-red-400'
                          : 'bg-black border border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Strike', value: manualStrike, set: setManualStrike, ph: '100.00' },
                    { label: 'Bid', value: manualBid, set: setManualBid, ph: '2.50' },
                    { label: 'Ask', value: manualAsk, set: setManualAsk, ph: '2.75' },
                    { label: 'IV %', value: manualIV, set: setManualIV, ph: '35.0' },
                    { label: 'Delta', value: manualDelta, set: setManualDelta, ph: '0.30' },
                  ].map(field => (
                    <div key={field.label}>
                      <p className="text-zinc-600 text-[10px] uppercase tracking-wider mb-1">{field.label}</p>
                      <input
                        type="number"
                        value={field.value}
                        onChange={e => field.set(e.target.value)}
                        placeholder={field.ph}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-[#39ff14]/30 min-h-[44px]"
                        step="any"
                      />
                    </div>
                  ))}
                </div>

                {manualStrike && manualBid && (
                  <div className="bg-black border border-zinc-800 rounded-xl p-3 mt-3">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-2">Analysis</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-zinc-600 text-[9px]">Mid Price</p>
                        <p className="text-white font-mono text-sm">
                          ${fmt(((parseFloat(manualBid) || 0) + (parseFloat(manualAsk) || 0)) / 2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px]">Premium/Contract</p>
                        <p className="text-[#39ff14] font-mono text-sm">
                          ${fmt(((parseFloat(manualBid) || 0) + (parseFloat(manualAsk) || 0)) / 2 * 100)}
                        </p>
                      </div>
                      {manualDelta && (
                        <div>
                          <p className="text-zinc-600 text-[9px]">Est. POP</p>
                          <p className="text-white font-mono text-sm">
                            {Math.round((1 - Math.abs(parseFloat(manualDelta) || 0)) * 100)}%
                          </p>
                        </div>
                      )}
                      {manualIV && (
                        <div>
                          <p className="text-zinc-600 text-[9px]">IV Level</p>
                          <p className={`font-mono text-sm ${getIVColor(parseFloat(manualIV) || 0)}`}>
                            {manualIV}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* ─── CHAIN TAB ─────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════ */}
      {activeTab === 'chain' && (
        <div className="px-4 pt-4">
          {/* Symbol Search */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                value={chainSymbol || ''}
                onChange={e => setChainSymbol(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleChainSearch(chainSymbol)}
                placeholder="Ticker (e.g. SPY)"
                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#39ff14]/30 min-h-[44px]"
              />
            </div>
            <button
              onClick={() => handleChainSearch(chainSymbol)}
              disabled={chainLoading || !chainSymbol.trim()}
              className="px-5 bg-[#39ff14]/15 border border-[#39ff14]/30 rounded-xl text-[#39ff14] font-medium text-sm min-h-[44px] active:scale-[0.98] disabled:opacity-40"
            >
              {chainLoading ? <Loader2 size={18} className="animate-spin" /> : 'Go'}
            </button>
          </div>

          {/* Quote + Expiration Selector */}
          {chainQuote && (
            <>
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-3 mb-3 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold">{chainQuote.symbol}</span>
                  <span className={`text-xs font-mono ml-2 ${chainQuote.change >= 0 ? 'text-[#39ff14]' : 'text-red-400'}`}>
                    {chainQuote.change >= 0 ? '+' : ''}{fmt(chainQuote.change)}
                  </span>
                </div>
                <span className="text-white font-mono font-bold">${fmt(chainQuote.price)}</span>
              </div>

              {/* Expiration Dropdown */}
              {chainExpirations.length > 0 && (
                <div className="relative mb-3">
                  <button
                    onClick={() => setShowExpDropdown(!showExpDropdown)}
                    className="w-full flex items-center justify-between bg-[#0a0a0a] border border-zinc-800 rounded-xl px-4 py-3 min-h-[44px] active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-zinc-500" />
                      <span className="text-white text-sm font-mono">
                        {chainSelectedExp || 'Select expiration'}
                      </span>
                      {chainSelectedExp && (
                        <span className="text-[#39ff14] text-xs font-mono">
                          ({calculateDTE(chainSelectedExp)} DTE)
                        </span>
                      )}
                    </div>
                    <ChevronDown size={16} className={`text-zinc-500 transition-transform ${showExpDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showExpDropdown && (
                    <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl overflow-hidden max-h-64 overflow-y-auto shadow-2xl">
                      {chainExpirations.map(exp => {
                        const dte = calculateDTE(exp);
                        return (
                          <button
                            key={exp}
                            onClick={() => handleExpirationChange(exp)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left min-h-[44px] active:bg-[#39ff14]/10 ${
                              chainSelectedExp === exp ? 'bg-[#39ff14]/10' : ''
                            }`}
                          >
                            <span className={`text-sm font-mono ${chainSelectedExp === exp ? 'text-[#39ff14]' : 'text-white'}`}>
                              {exp}
                            </span>
                            <span className={`text-xs font-mono ${dte <= 7 ? 'text-amber-400' : 'text-zinc-500'}`}>
                              {dte}d
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* View Tabs: Calls | Puts | Both */}
          <div className="flex gap-1 bg-[#0a0a0a] rounded-xl p-1 mb-3">
            {(['calls', 'puts', 'both'] as ChainView[]).map(view => (
              <button
                key={view}
                onClick={() => setChainView(view)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-medium min-h-[44px] active:scale-[0.98] transition-all ${
                  chainView === view
                    ? view === 'calls'
                      ? 'bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/30'
                      : view === 'puts'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                        : 'bg-zinc-700/30 text-white border border-zinc-600'
                    : 'text-zinc-500'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>

          {/* Chain Error */}
          {chainError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-xs">{chainError}</p>
            </div>
          )}

          {/* Chain Loading */}
          {chainLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={32} className="text-[#39ff14] animate-spin mb-3" />
              <p className="text-zinc-500 text-sm">Loading chain...</p>
            </div>
          )}

          {/* Chain Data */}
          {!chainLoading && chainOptions.length > 0 && (
            <div className="overflow-x-auto -mx-4 px-4">
              {/* Column Headers */}
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-1 mb-1 px-2">
                <span className="text-zinc-600 text-[9px] uppercase tracking-wider">Strike</span>
                <span className="text-zinc-600 text-[9px] uppercase tracking-wider w-14 text-right">Bid</span>
                <span className="text-zinc-600 text-[9px] uppercase tracking-wider w-14 text-right">Ask</span>
                <span className="text-zinc-600 text-[9px] uppercase tracking-wider w-12 text-right">IV</span>
                <span className="text-zinc-600 text-[9px] uppercase tracking-wider w-14 text-right">Delta</span>
                <span className="text-zinc-600 text-[9px] uppercase tracking-wider w-12 text-right">Vol</span>
              </div>

              <div className="space-y-0.5">
                {chainOptions.map((opt, idx) => {
                  const isATM = opt.strike === atmStrike;
                  return (
                    <button
                      key={`${opt.symbol}-${idx}`}
                      onClick={() => setDetailModal({
                        option: opt,
                        stockPrice: chainQuote?.price ?? 0,
                        dte: chainSelectedExp ? calculateDTE(chainSelectedExp) : 0,
                      })}
                      className={`w-full grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-1 items-center px-2 py-2.5 rounded-lg min-h-[44px] active:scale-[0.98] transition-all ${
                        isATM
                          ? 'bg-[#39ff14]/10 border border-[#39ff14]/30'
                          : 'bg-[#0a0a0a] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {isATM && <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14]" />}
                        <span className={`font-mono text-sm font-bold ${isATM ? 'text-[#39ff14]' : 'text-white'}`}>
                          {fmt(opt.strike)}
                        </span>
                        <span className={`text-[9px] font-mono px-1 rounded ${
                          opt.type === 'call'
                            ? 'text-[#39ff14]/70'
                            : 'text-red-400/70'
                        }`}>
                          {opt.type === 'call' ? 'C' : 'P'}
                        </span>
                      </div>
                      <span className="text-[#39ff14] font-mono text-xs w-14 text-right">{fmt(opt.bid)}</span>
                      <span className="text-red-400 font-mono text-xs w-14 text-right">{fmt(opt.ask)}</span>
                      <span className={`font-mono text-xs w-12 text-right ${getIVColor(opt.iv)}`}>{fmt(opt.iv, 0)}%</span>
                      <span className={`font-mono text-xs w-14 text-right ${getDeltaColor(opt.delta)}`}>{fmt(opt.delta, 2)}</span>
                      <span className="text-zinc-500 font-mono text-xs w-12 text-right">{fmtVol(opt.volume)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty Chain State */}
          {!chainLoading && chainOptions.length === 0 && !chainError && (
            <div className="flex flex-col items-center justify-center py-16">
              <Eye size={40} className="text-zinc-800 mb-3" />
              <p className="text-zinc-500 text-sm mb-1">Enter a symbol to view its chain</p>
              <p className="text-zinc-600 text-xs">Tap any row for full Greeks</p>
            </div>
          )}

          {/* No API Key message for chain tab */}
          {!hasApiKey && (
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Key size={16} className="text-[#39ff14]" />
                <p className="text-[#39ff14] text-sm font-medium">API Key Required</p>
              </div>
              <p className="text-zinc-400 text-xs">
                Configure your Tradier API key in ⚙️ settings to view live options chains.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* ─── IV WATCHLIST TAB ──────────────────────────── */}
      {/* ═══════════════════════════════════════════════════ */}
      {activeTab === 'watchlist' && (
        <div className="px-4 pt-4">
          {/* Add Symbol */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Plus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                value={watchlistInput}
                onChange={e => setWatchlistInput(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && addToWatchlist(watchlistInput)}
                placeholder="Add symbol to watchlist"
                className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-[#39ff14]/30 min-h-[44px]"
              />
            </div>
            <button
              onClick={() => addToWatchlist(watchlistInput)}
              disabled={!watchlistInput.trim()}
              className="px-4 bg-[#39ff14]/15 border border-[#39ff14]/30 rounded-xl text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98] disabled:opacity-40"
            >
              Add
            </button>
          </div>

          {/* Refresh Button */}
          {watchlist.length > 0 && hasApiKey && (
            <button
              onClick={refreshWatchlist}
              disabled={watchlistRefreshing}
              className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl py-3 mb-4 min-h-[44px] active:scale-[0.98] disabled:opacity-50"
            >
              <RefreshCw size={16} className={`text-[#39ff14] ${watchlistRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-[#39ff14] text-sm font-medium">
                {watchlistRefreshing ? 'Refreshing...' : 'Refresh All'}
              </span>
            </button>
          )}

          {/* Watchlist Items */}
          {watchlist.length > 0 ? (
            <div className="space-y-2">
              {watchlist.map(item => (
                <div
                  key={item.symbol}
                  className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{item.symbol}</span>
                      {item.lastPrice !== null && (
                        <span className="text-zinc-500 font-mono text-xs">${fmt(item.lastPrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromWatchlist(item.symbol)}
                      className="text-zinc-600 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-[0.98]"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-black rounded-lg p-2 text-center">
                      <p className="text-zinc-600 text-[9px] uppercase">Current IV</p>
                      <p className={`font-mono text-sm font-bold ${item.lastIV !== null ? getIVColor(item.lastIV) : 'text-zinc-600'}`}>
                        {item.lastIV !== null ? `${fmt(item.lastIV, 1)}%` : '—'}
                      </p>
                    </div>
                    <div className="bg-black rounded-lg p-2 text-center">
                      <p className="text-zinc-600 text-[9px] uppercase">IV Rank</p>
                      <p className={`font-mono text-sm font-bold ${
                        item.ivRankEstimate !== null
                          ? item.ivRankEstimate >= 60 ? 'text-red-400'
                            : item.ivRankEstimate >= 40 ? 'text-amber-400'
                            : 'text-[#39ff14]'
                          : 'text-zinc-600'
                      }`}>
                        {item.ivRankEstimate !== null ? `${item.ivRankEstimate}%` : '—'}
                      </p>
                    </div>
                    <div className="bg-black rounded-lg p-2 text-center">
                      <p className="text-zinc-600 text-[9px] uppercase">Checked</p>
                      <p className="text-zinc-400 text-xs font-mono">
                        {item.lastChecked
                          ? new Date(item.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : '—'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Star size={40} className="text-zinc-800 mb-3" />
              <p className="text-zinc-500 text-sm mb-1">No symbols tracked</p>
              <p className="text-zinc-600 text-xs">Add tickers to monitor their IV over time</p>
            </div>
          )}

          {/* No API Key message */}
          {!hasApiKey && watchlist.length > 0 && (
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-[#39ff14]" />
                <p className="text-[#39ff14] text-sm font-medium">Refresh requires API Key</p>
              </div>
              <p className="text-zinc-400 text-xs">
                Add your Tradier API key in ⚙️ settings to auto-refresh IV data.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
