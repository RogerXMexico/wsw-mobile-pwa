import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Trash2, RefreshCw, TrendingUp, TrendingDown,
  Settings, ChevronDown, ChevronUp, Clock, Eye, Search, X, Key
} from 'lucide-react';
import {
  getApiKey, setApiKey, fetchQuote, fetchExpirations, fetchOptionsChain,
  findNearestStrike, findNearestExpiration,
  calculateIVRank, calculateIVPercentile,
  getSymbolIVHistory, recordIVReading,
  type StockQuote, type OptionData
} from '../../services/tradierApi';

// ─── Constants ──────────────────────────────────────────

const WATCHLIST_KEY = 'wsw-watchlist';
const MAX_SYMBOLS = 20;
const AUTO_REFRESH_MS = 60_000;

// ─── Types ──────────────────────────────────────────────

interface WatchlistQuote extends StockQuote {
  iv?: number;
  ivDirection?: 'up' | 'down' | 'flat';
  week52High?: number;
  week52Low?: number;
}

interface ExpandedData {
  ivRank: number;
  ivPercentile: number;
  loading: boolean;
}

// ─── Helpers ────────────────────────────────────────────

function loadWatchlist(): string[] {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.map((s: string) => s.toUpperCase()).slice(0, MAX_SYMBOLS);
  } catch { /* ignore */ }
  return [];
}

function saveWatchlist(symbols: string[]) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(symbols));
}

function formatVolume(vol: number): string {
  if (vol >= 1_000_000_000) return (vol / 1_000_000_000).toFixed(1) + 'B';
  if (vol >= 1_000_000) return (vol / 1_000_000).toFixed(1) + 'M';
  if (vol >= 1_000) return (vol / 1_000).toFixed(1) + 'K';
  return vol.toString();
}

function getIVColor(iv: number): string {
  if (iv < 25) return 'text-[#39ff14]';
  if (iv < 50) return 'text-yellow-400';
  if (iv < 75) return 'text-orange-400';
  return 'text-red-400';
}

function isMarketOpen(): boolean {
  const now = new Date();
  const day = now.getUTCDay();
  if (day === 0 || day === 6) return false;
  // US market: 9:30–16:00 ET → 14:30–21:00 UTC
  const utcHour = now.getUTCHours();
  const utcMin = now.getUTCMinutes();
  const totalMin = utcHour * 60 + utcMin;
  return totalMin >= 14 * 60 + 30 && totalMin < 21 * 60;
}

// ─── Component ──────────────────────────────────────────

export default function Watchlist() {
  const navigate = useNavigate();

  // Core state
  const [symbols, setSymbols] = useState<string[]>(loadWatchlist);
  const [inputValue, setInputValue] = useState('');
  const [quotes, setQuotes] = useState<Record<string, WatchlistQuote>>({});
  const [manualPrices, setManualPrices] = useState<Record<string, string>>({});
  const [expandedSymbol, setExpandedSymbol] = useState<string | null>(null);
  const [expandedData, setExpandedData] = useState<Record<string, ExpandedData>>({});

  // UI state
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [swipedSymbol, setSwipedSymbol] = useState<string | null>(null);

  // Refs
  const autoRefreshRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; symbol: string } | null>(null);

  const hasApiKey = !!getApiKey();

  // ─── Persist watchlist ────────────────────────────────
  useEffect(() => {
    saveWatchlist(symbols);
  }, [symbols]);

  // ─── Auto-refresh ─────────────────────────────────────
  useEffect(() => {
    if (autoRefresh && hasApiKey) {
      autoRefreshRef.current = setInterval(() => {
        refreshAll();
      }, AUTO_REFRESH_MS);
    }
    return () => {
      if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    };
  }, [autoRefresh, hasApiKey, symbols]);

  // ─── Add symbol ───────────────────────────────────────
  const addSymbol = useCallback(() => {
    const sym = inputValue.trim().toUpperCase();
    if (!sym) return;
    if (symbols.includes(sym)) {
      setInputValue('');
      return;
    }
    if (symbols.length >= MAX_SYMBOLS) return;
    setSymbols(prev => [...prev, sym]);
    setInputValue('');
  }, [inputValue, symbols]);

  // ─── Remove symbol ────────────────────────────────────
  const removeSymbol = useCallback((sym: string) => {
    setSymbols(prev => prev.filter(s => s !== sym));
    setQuotes(prev => {
      const next = { ...prev };
      delete next[sym];
      return next;
    });
    setExpandedSymbol(prev => prev === sym ? null : prev);
    setSwipedSymbol(null);
  }, []);

  // ─── Fetch single IV ─────────────────────────────────
  const fetchIV = useCallback(async (symbol: string, price: number): Promise<{ iv: number; direction: 'up' | 'down' | 'flat' } | null> => {
    try {
      const expirations = await fetchExpirations(symbol);
      const nearestExp = findNearestExpiration(expirations, 7);
      if (!nearestExp) return null;

      const chain = await fetchOptionsChain(symbol, nearestExp);
      const atmCall = findNearestStrike(chain.calls, price);
      if (!atmCall || !atmCall.iv) return null;

      const iv = atmCall.iv;

      // Get previous reading for direction
      const history = getSymbolIVHistory(symbol);
      let direction: 'up' | 'down' | 'flat' = 'flat';
      if (history.length > 0) {
        const lastReading = history[history.length - 1].iv;
        if (iv > lastReading + 0.5) direction = 'up';
        else if (iv < lastReading - 0.5) direction = 'down';
      }

      // Record this reading
      recordIVReading(symbol, iv);

      return { iv, direction };
    } catch {
      return null;
    }
  }, []);

  // ─── Refresh all quotes ───────────────────────────────
  const refreshAll = useCallback(async () => {
    if (!hasApiKey || symbols.length === 0) return;
    setLoading(true);

    try {
      const results = await Promise.allSettled(
        symbols.map(async (sym) => {
          const quote = await fetchQuote(sym);
          const ivData = await fetchIV(sym, quote.price);
          const wq: WatchlistQuote = {
            ...quote,
            iv: ivData?.iv,
            ivDirection: ivData?.direction,
          };
          return { symbol: sym, data: wq };
        })
      );

      const newQuotes: Record<string, WatchlistQuote> = { ...quotes };
      for (const r of results) {
        if (r.status === 'fulfilled') {
          newQuotes[r.value.symbol] = r.value.data;
        }
      }
      setQuotes(newQuotes);
      setLastRefresh(new Date());
    } catch {
      // Individual failures handled by allSettled
    } finally {
      setLoading(false);
    }
  }, [hasApiKey, symbols, quotes, fetchIV]);

  // ─── Fetch expanded data ──────────────────────────────
  const fetchExpandedData = useCallback(async (sym: string) => {
    if (expandedData[sym] && !expandedData[sym].loading) return;

    setExpandedData(prev => ({ ...prev, [sym]: { ivRank: -1, ivPercentile: -1, loading: true } }));

    try {
      const currentIV = quotes[sym]?.iv;
      const history = getSymbolIVHistory(sym);
      const historicalIVs = history.map(h => h.iv);

      let ivRank = -1;
      let ivPercentile = -1;
      if (currentIV !== undefined && historicalIVs.length >= 5) {
        ivRank = calculateIVRank(currentIV, historicalIVs);
        ivPercentile = calculateIVPercentile(currentIV, historicalIVs);
      }

      setExpandedData(prev => ({ ...prev, [sym]: { ivRank, ivPercentile, loading: false } }));
    } catch {
      setExpandedData(prev => ({ ...prev, [sym]: { ivRank: -1, ivPercentile: -1, loading: false } }));
    }
  }, [expandedData, quotes]);

  // ─── Toggle expand ────────────────────────────────────
  const toggleExpand = useCallback((sym: string) => {
    if (expandedSymbol === sym) {
      setExpandedSymbol(null);
    } else {
      setExpandedSymbol(sym);
      fetchExpandedData(sym);
    }
  }, [expandedSymbol, fetchExpandedData]);

  // ─── Swipe handling ───────────────────────────────────
  const handleTouchStart = (sym: string, e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      symbol: sym,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartRef.current.y);
    if (dx < -60 && dy < 40) {
      setSwipedSymbol(touchStartRef.current.symbol);
    } else if (dx > 30) {
      setSwipedSymbol(null);
    }
    touchStartRef.current = null;
  };

  // ─── Save API key ────────────────────────────────────
  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setApiKeyInput('');
      setShowSettings(false);
    }
  };

  // ─── Summary bar ──────────────────────────────────────
  const marketOpen = isMarketOpen();
  const upCount = symbols.filter(s => (quotes[s]?.change ?? 0) > 0).length;
  const downCount = symbols.filter(s => (quotes[s]?.change ?? 0) < 0).length;

  // ─── Render ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white pt-[calc(env(safe-area-inset-top,0px)+8px)] pb-24">
      {/* ── Sticky Header ─────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/20 px-4 pb-3">
        {/* Top Row: Back + Title + Settings */}
        <div className="flex items-center justify-between min-h-[44px] mb-2">
          <button
            onClick={() => navigate('/tools')}
            className="flex items-center gap-1 text-[#39ff14] active:scale-[0.98] min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Tools</span>
          </button>
          <h1 className="text-lg font-bold text-white">Watchlist</h1>
          <button
            onClick={() => setShowSettings(true)}
            className="text-[#39ff14] active:scale-[0.98] min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Summary Bar */}
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-2">
            <Eye size={12} className="text-[#39ff14]" />
            <span className="text-gray-400">{symbols.length} symbols</span>
            <span className={marketOpen ? 'text-[#39ff14]' : 'text-red-400'}>
              {marketOpen ? '● Market Open' : '○ Market Closed'}
            </span>
          </div>
          {/* Heat map dots */}
          {symbols.length > 0 && (
            <div className="flex items-center gap-0.5">
              {symbols.map(s => {
                const change = quotes[s]?.change;
                const color = change === undefined
                  ? 'bg-gray-600'
                  : change > 0
                    ? 'bg-[#39ff14]'
                    : change < 0
                      ? 'bg-red-400'
                      : 'bg-gray-500';
                return <div key={s} className={`w-2 h-2 rounded-full ${color}`} title={s} />;
              })}
            </div>
          )}
        </div>

        {/* Add Symbol Input */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 flex items-center bg-[#0a0a0a] border border-[#39ff14]/20 rounded-lg px-3">
            <Search size={14} className="text-gray-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Add symbol (e.g. AAPL)"
              value={inputValue}
              onChange={e => setInputValue(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && addSymbol()}
              className="flex-1 bg-transparent text-white text-sm py-2.5 outline-none placeholder:text-gray-600 min-h-[44px]"
              maxLength={10}
            />
          </div>
          <button
            onClick={addSymbol}
            disabled={!inputValue.trim() || symbols.length >= MAX_SYMBOLS}
            className="bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] rounded-lg px-3 min-h-[44px] active:scale-[0.98] disabled:opacity-30 flex items-center gap-1"
          >
            <Plus size={16} />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>

        {/* Refresh Row */}
        {hasApiKey && symbols.length > 0 && (
          <div className="flex items-center justify-between">
            <button
              onClick={refreshAll}
              disabled={loading}
              className="flex items-center gap-1.5 text-[#39ff14] text-xs active:scale-[0.98] min-h-[36px] disabled:opacity-40"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Refreshing...' : 'Refresh All'}</span>
            </button>
            <div className="flex items-center gap-3">
              {lastRefresh && (
                <span className="text-gray-500 text-[10px] flex items-center gap-1">
                  <Clock size={10} />
                  {lastRefresh.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={() => setAutoRefresh(p => !p)}
                className={`text-[10px] px-2 py-1 rounded border ${
                  autoRefresh
                    ? 'border-[#39ff14]/40 text-[#39ff14] bg-[#39ff14]/10'
                    : 'border-gray-700 text-gray-500'
                }`}
              >
                Auto {autoRefresh ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="px-4 mt-3 space-y-2">
        {/* Empty state */}
        {symbols.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Eye size={48} className="mb-4 text-gray-700" />
            <p className="text-lg font-medium text-gray-400">No symbols yet</p>
            <p className="text-sm mt-1">Add tickers above to start tracking</p>
          </div>
        )}

        {/* No API key prompt */}
        {!hasApiKey && symbols.length > 0 && (
          <div className="bg-[#0a0a0a] border border-yellow-500/30 rounded-lg p-3 mb-2">
            <div className="flex items-center gap-2 text-yellow-400 text-sm mb-1">
              <Key size={14} />
              <span className="font-medium">Manual Mode</span>
            </div>
            <p className="text-gray-400 text-xs">
              No API key set. Enter prices manually or{' '}
              <button onClick={() => setShowSettings(true)} className="text-[#39ff14] underline">
                add your Tradier API key
              </button>{' '}
              for live data.
            </p>
          </div>
        )}

        {/* Symbol Cards */}
        {symbols.map(sym => {
          const q = quotes[sym];
          const isSwiped = swipedSymbol === sym;
          const isExpanded = expandedSymbol === sym;
          const ed = expandedData[sym];

          return (
            <div key={sym} className="relative overflow-hidden rounded-lg">
              {/* Swipe-to-delete background */}
              {isSwiped && (
                <div className="absolute inset-0 flex items-center justify-end bg-red-500/20 rounded-lg z-10">
                  <button
                    onClick={() => removeSymbol(sym)}
                    className="flex items-center gap-1 text-red-400 bg-red-500/20 px-4 py-3 mr-1 rounded-lg active:scale-[0.98] min-h-[44px]"
                  >
                    <Trash2 size={16} />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              )}

              {/* Card */}
              <div
                className={`bg-[#0a0a0a] border border-[#39ff14]/20 rounded-lg transition-transform duration-200 ${
                  isSwiped ? '-translate-x-28' : ''
                }`}
                onTouchStart={e => handleTouchStart(sym, e)}
                onTouchEnd={handleTouchEnd}
              >
                {/* Main Row */}
                <button
                  onClick={() => {
                    if (isSwiped) {
                      setSwipedSymbol(null);
                    } else {
                      toggleExpand(sym);
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-3 min-h-[64px] active:scale-[0.98]"
                >
                  {/* Left: Symbol + Change */}
                  <div className="flex flex-col items-start">
                    <span className="text-white font-bold text-base">{sym}</span>
                    {q ? (
                      <span className="text-gray-500 text-[10px]">
                        Vol: {formatVolume(q.volume)}
                      </span>
                    ) : !hasApiKey ? (
                      <span className="text-gray-600 text-[10px]">manual</span>
                    ) : null}
                  </div>

                  {/* Center: Price + Change */}
                  <div className="flex flex-col items-end mr-3">
                    {q ? (
                      <>
                        <span className="text-white font-mono text-lg font-semibold">
                          ${q.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          {q.change >= 0 ? (
                            <TrendingUp size={10} className="text-[#39ff14]" />
                          ) : (
                            <TrendingDown size={10} className="text-red-400" />
                          )}
                          <span
                            className={`font-mono text-xs ${
                              q.change >= 0 ? 'text-[#39ff14]' : 'text-red-400'
                            }`}
                          >
                            {q.change >= 0 ? '+' : ''}
                            {q.change.toFixed(2)} ({q.changePercent >= 0 ? '+' : ''}
                            {q.changePercent.toFixed(2)}%)
                          </span>
                        </div>
                      </>
                    ) : !hasApiKey ? (
                      <input
                        type="number"
                        placeholder="Price"
                        value={manualPrices[sym] || ''}
                        onChange={e => setManualPrices(prev => ({ ...prev, [sym]: e.target.value }))}
                        onClick={e => e.stopPropagation()}
                        className="bg-black/50 border border-[#39ff14]/20 rounded px-2 py-1 text-white font-mono text-sm w-24 outline-none text-right"
                      />
                    ) : (
                      <span className="text-gray-600 text-xs font-mono">—</span>
                    )}
                  </div>

                  {/* Right: IV + Expand indicator */}
                  <div className="flex items-center gap-2">
                    {q?.iv !== undefined && (
                      <div className="flex flex-col items-end">
                        <span className={`font-mono text-xs font-semibold ${getIVColor(q.iv)}`}>
                          {q.iv.toFixed(1)}%
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {q.ivDirection === 'up' && '↑'}
                          {q.ivDirection === 'down' && '↓'}
                          {q.ivDirection === 'flat' && '→'}
                          {' IV'}
                        </span>
                      </div>
                    )}
                    {isExpanded ? (
                      <ChevronUp size={14} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={14} className="text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-[#39ff14]/10 px-3 py-3 space-y-2">
                    {/* 52-week range */}
                    {q?.week52High !== undefined && q?.week52Low !== undefined && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">52W Range</span>
                        <span className="font-mono text-gray-300">
                          ${q.week52Low.toFixed(2)} – ${q.week52High.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* IV Rank & Percentile */}
                    {ed?.loading ? (
                      <div className="text-gray-500 text-xs">Loading IV data...</div>
                    ) : ed ? (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">IV Rank</span>
                          <span className={`font-mono ${ed.ivRank >= 0 ? 'text-white' : 'text-gray-600'}`}>
                            {ed.ivRank >= 0 ? `${ed.ivRank.toFixed(1)}%` : 'Insufficient data'}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">IV Percentile</span>
                          <span className={`font-mono ${ed.ivPercentile >= 0 ? 'text-white' : 'text-gray-600'}`}>
                            {ed.ivPercentile >= 0 ? `${ed.ivPercentile.toFixed(1)}%` : 'Insufficient data'}
                          </span>
                        </div>
                      </>
                    ) : null}

                    {/* Quick Action Links */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/tools/screener');
                        }}
                        className="flex-1 bg-[#39ff14]/10 border border-[#39ff14]/20 text-[#39ff14] text-xs font-medium rounded-lg py-2 active:scale-[0.98] min-h-[36px]"
                      >
                        View Chain
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/tools/paper-trading');
                        }}
                        className="flex-1 bg-[#39ff14]/10 border border-[#39ff14]/20 text-[#39ff14] text-xs font-medium rounded-lg py-2 active:scale-[0.98] min-h-[36px]"
                      >
                        Paper Trade
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSymbol(sym);
                        }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-lg px-3 py-2 active:scale-[0.98] min-h-[36px]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Up/Down summary at bottom */}
        {symbols.length > 0 && Object.keys(quotes).length > 0 && (
          <div className="flex items-center justify-center gap-4 py-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <TrendingUp size={12} className="text-[#39ff14]" />
              <span className="text-[#39ff14]">{upCount} up</span>
            </span>
            <span className="flex items-center gap-1">
              <TrendingDown size={12} className="text-red-400" />
              <span className="text-red-400">{downCount} down</span>
            </span>
            <span>{symbols.length - upCount - downCount} flat</span>
          </div>
        )}
      </div>

      {/* ── Settings Modal ────────────────────────────── */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl w-full max-w-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 active:scale-[0.98] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* API Key */}
            <div className="mb-4">
              <label className="text-gray-400 text-xs block mb-1">Tradier API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder={hasApiKey ? '••••••••' : 'Paste your API key'}
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  className="flex-1 bg-black border border-[#39ff14]/20 rounded-lg px-3 py-2 text-white text-sm outline-none min-h-[44px] placeholder:text-gray-600"
                />
                <button
                  onClick={handleSaveApiKey}
                  disabled={!apiKeyInput.trim()}
                  className="bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] px-4 rounded-lg active:scale-[0.98] min-h-[44px] text-sm font-medium disabled:opacity-30"
                >
                  Save
                </button>
              </div>
              <p className="text-gray-600 text-[10px] mt-1">
                Get a free key at developer.tradier.com (sandbox)
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between text-sm py-2">
              <span className="text-gray-400">API Status</span>
              <span className={hasApiKey ? 'text-[#39ff14]' : 'text-red-400'}>
                {hasApiKey ? '● Connected' : '○ Not Set'}
              </span>
            </div>

            {/* Auto-refresh toggle */}
            <div className="flex items-center justify-between text-sm py-2 border-t border-[#39ff14]/10">
              <span className="text-gray-400">Auto-refresh (60s)</span>
              <button
                onClick={() => setAutoRefresh(p => !p)}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  autoRefresh
                    ? 'border-[#39ff14]/40 text-[#39ff14] bg-[#39ff14]/10'
                    : 'border-gray-700 text-gray-500'
                }`}
              >
                {autoRefresh ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Clear watchlist */}
            <div className="flex items-center justify-between text-sm py-2 border-t border-[#39ff14]/10">
              <span className="text-gray-400">Clear Watchlist</span>
              <button
                onClick={() => {
                  setSymbols([]);
                  setQuotes({});
                  setExpandedSymbol(null);
                  setShowSettings(false);
                }}
                className="px-3 py-1 rounded-full text-xs font-medium border border-red-500/30 text-red-400 active:scale-[0.98]"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
