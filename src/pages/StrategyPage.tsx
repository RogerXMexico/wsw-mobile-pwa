import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen, GraduationCap, Bookmark, ChevronDown, ChevronUp, Loader2, ArrowRight } from 'lucide-react';
import { getStrategyById, getStrategiesByTier } from '../data/strategies';
import { Strategy } from '../types';
import { OptionLeg } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { getTierInfo, getTierBadgeColor } from '../utils/curriculum';
import { blackScholes } from '../utils/blackScholes';
import PayoffChart from '../components/PayoffChart';
import StrategyQuiz from '../components/StrategyQuiz';
import { TIER_QUIZ_CONFIG, getQuestionsForTier } from '../data/quizData';
import { getApiKey, fetchQuote, fetchExpirations, fetchOptionsChain, calculateDTE, findNearestStrike, type StockQuote, type OptionData } from '../services/tradierApi';

// Entry conditions (must match PayoffChart constants)
const ENTRY_PRICE = 100;
const RISK_FREE_RATE = 0.05;

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

// Compute position value for Greeks via Black-Scholes
function positionBS(
  legs: OptionLeg[],
  S: number,
  T: number,
  v: number,
): number {
  let value = 0;
  legs.forEach((leg) => {
    const strike = ENTRY_PRICE + (leg.strikeOffset || 0);
    const quantity = leg.quantity || 1;
    const multiplier = leg.action === 'buy' ? 1 : -1;
    const t = Math.max(T / 365, 0.0001);
    const val = blackScholes(leg.type, S, strike, t, RISK_FREE_RATE, v);
    value += val * multiplier * quantity;
  });
  return value;
}

// Greeks via numerical differentiation
function computeGreeks(
  legs: OptionLeg[],
  S: number,
  days: number,
  vol: number,
): { delta: number; gamma: number; theta: number; vega: number } {
  if (days <= 0) {
    return { delta: 0, gamma: 0, theta: 0, vega: 0 };
  }

  const dS = 0.01;
  const delta = (positionBS(legs, S + dS, days, vol) - positionBS(legs, S - dS, days, vol)) / (2 * dS);

  const gamma =
    positionBS(legs, S + 1, days, vol) -
    2 * positionBS(legs, S, days, vol) +
    positionBS(legs, S - 1, days, vol);

  const theta =
    days > 1
      ? positionBS(legs, S, days - 1, vol) - positionBS(legs, S, days, vol)
      : positionBS(legs, S, 0, vol) - positionBS(legs, S, days, vol);

  const dV = 0.01;
  const vega = (positionBS(legs, S, days, vol + dV) - positionBS(legs, S, days, vol - dV)) / (2 * dV);

  return {
    delta: Math.round(delta * 1000) / 1000,
    gamma: Math.round(gamma * 1000) / 1000,
    theta: Math.round(theta * 100) / 100,
    vega: Math.round(vega * 100) / 100,
  };
}

// Bookmark hook — persists to localStorage
function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('wsw-bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const toggle = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      localStorage.setItem('wsw-bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return { toggle, isBookmarked };
}

export default function StrategyPage() {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const { isCompleted, toggleComplete } = useProgress();
  const { toggle: toggleBookmark, isBookmarked } = useBookmarks();

  const [showQuiz, setShowQuiz] = useState(false);
  
  // Strategy loading state (lazy load)
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [relatedStrategies, setRelatedStrategies] = useState<Strategy[]>([]);
  const [strategyLoading, setStrategyLoading] = useState(true);
  
  // Load strategy on mount or when ID changes
  useEffect(() => {
    if (!strategyId) return;
    
    setStrategyLoading(true);
    getStrategyById(strategyId).then(async (s) => {
      setStrategy(s || null);
      
      // Load related strategies from the same tier
      if (s) {
        const tierStrategies = await getStrategiesByTier(s.tier);
        setRelatedStrategies(tierStrategies.filter(rel => rel.id !== s.id).slice(0, 4));
      }
      
      setStrategyLoading(false);
    });
  }, [strategyId]);

  // Live Market Data state
  const [ticker, setTicker] = useState('SPY');
  const [liveQuote, setLiveQuote] = useState<StockQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [liveDataOpen, setLiveDataOpen] = useState(false);

  // Options Chain state
  const [chainOpen, setChainOpen] = useState(false);
  const [expirations, setExpirations] = useState<string[]>([]);
  const [selectedExpiration, setSelectedExpiration] = useState<string>('');
  const [chainCalls, setChainCalls] = useState<OptionData[]>([]);
  const [chainPuts, setChainPuts] = useState<OptionData[]>([]);
  const [chainLoading, setChainLoading] = useState(false);
  const [chainError, setChainError] = useState<string | null>(null);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const [chainTab, setChainTab] = useState<'calls' | 'puts'>('calls');

  // Simulator state
  const [simPrice, setSimPrice] = useState(100);
  const [simVol, setSimVol] = useState(0.30);
  const [simDays, setSimDays] = useState(45);
  const [currentPnL, setCurrentPnL] = useState(0);
  const [entryValue, setEntryValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  const handlePnLCalculated = useCallback(
    (pnl: number, entry: number, current: number) => {
      setCurrentPnL(pnl);
      setEntryValue(entry);
      setCurrentValue(current);
    },
    [],
  );

  // Fetch live quote
  const handleFetchQuote = async () => {
    if (!ticker.trim()) return;
    setQuoteLoading(true);
    setQuoteError(null);
    try {
      const quote = await fetchQuote(ticker.trim().toUpperCase());
      setLiveQuote(quote);
    } catch (err: unknown) {
      setQuoteError(err instanceof Error ? err.message : 'Failed to fetch quote');
      setLiveQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  };

  // Fetch expirations when chain section opens
  const handleChainOpen = async () => {
    const opening = !chainOpen;
    setChainOpen(opening);
    if (opening && expirations.length === 0 && ticker.trim()) {
      setChainLoading(true);
      setChainError(null);
      try {
        const exps = await fetchExpirations(ticker.trim().toUpperCase());
        setExpirations(exps);
        if (exps.length > 0) {
          setSelectedExpiration(exps[0]);
          await loadChain(ticker.trim().toUpperCase(), exps[0]);
        }
      } catch (err: unknown) {
        setChainError(err instanceof Error ? err.message : 'Failed to fetch expirations');
      } finally {
        setChainLoading(false);
      }
    }
  };

  // Load options chain for a specific expiration
  const loadChain = async (sym: string, exp: string) => {
    setChainLoading(true);
    setChainError(null);
    try {
      const data = await fetchOptionsChain(sym, exp);
      setChainCalls(data.calls);
      setChainPuts(data.puts);
    } catch (err: unknown) {
      setChainError(err instanceof Error ? err.message : 'Failed to fetch chain');
    } finally {
      setChainLoading(false);
    }
  };

  // Handle expiration change
  const handleExpirationChange = (exp: string) => {
    setSelectedExpiration(exp);
    setExpandedOption(null);
    loadChain(ticker.trim().toUpperCase(), exp);
  };

  // Loading state
  if (strategyLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="w-8 h-8 text-[#39ff14] animate-spin" />
        <p className="text-zinc-400">Loading strategy...</p>
      </div>
    );
  }
  
  if (!strategy) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-zinc-400">Strategy not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl text-[#39ff14] font-medium active:scale-[0.98] transition-transform min-h-[44px]"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const tierInfo = getTierInfo(strategy.tier);
  const badgeColor = getTierBadgeColor(strategy.tier);
  const completed = isCompleted(strategy.id);
  const showSimulator = strategy.legs.length > 0 && !strategy.hideSimulator;

  const greeks = showSimulator
    ? computeGreeks(strategy.legs, simPrice, simDays, simVol)
    : { delta: 0, gamma: 0, theta: 0, vega: 0 };

  const resetSimulation = () => {
    setSimPrice(100);
    setSimVol(0.30);
    setSimDays(45);
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Sticky header — padded for iPhone notch/Dynamic Island */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[#39ff14] active:text-white transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
              <span className="text-sm">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(strategy.id)}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] active:scale-[0.98] transition-transform"
                aria-label={isBookmarked(strategy.id) ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Bookmark
                  className="w-5 h-5"
                  fill={isBookmarked(strategy.id) ? '#39ff14' : 'none'}
                  color={isBookmarked(strategy.id) ? '#39ff14' : '#71717a'}
                />
              </button>
              <button
                onClick={() => toggleComplete(strategy.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 min-h-[44px] ${
                  completed
                    ? 'bg-[#39ff14]/10 text-[#39ff14] border border-emerald-500/30'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                }`}
              >
                {completed ? <Check className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                {completed ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy header */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
            Tier {strategy.tier} — {tierInfo?.name}
          </span>
          <span className="text-[10px] text-zinc-500">{strategy.outlook}</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{strategy.name}</h1>
        {strategy.objective && (
          <p className="text-zinc-400 text-sm mt-1">{strategy.objective}</p>
        )}

        {/* Strategy mechanics */}
        {strategy.legs && strategy.legs.length > 0 && (
          <div className="mt-4 space-y-2">
            {/* Legs breakdown */}
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-[10px] text-zinc-500 uppercase mb-2">How to Build It</p>
              <div className="space-y-1.5">
                {strategy.legs.map((leg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                      leg.action === 'buy'
                        ? 'bg-emerald-900/40 text-[#39ff14]'
                        : 'bg-red-900/40 text-red-400'
                    }`}>
                      {leg.action === 'buy' ? 'BUY' : 'SELL'}
                    </span>
                    <span className="text-sm text-white">{describeLeg(leg)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">
                {describeAllLegs(strategy.legs)}
              </p>
            </div>

            {/* Quick stats row */}
            <div className="flex gap-2">
              {strategy.risk && strategy.risk !== 'None' && (
                <div className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-zinc-500 uppercase">Risk</p>
                  <p className="text-sm text-white font-medium">{strategy.risk}</p>
                </div>
              )}
              <div className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
                <p className="text-[10px] text-zinc-500 uppercase">Legs</p>
                <p className="text-sm text-white font-medium">{strategy.legs.length}</p>
              </div>
              <div className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
                <p className="text-[10px] text-zinc-500 uppercase">Outlook</p>
                <p className="text-sm text-white font-medium">{strategy.outlook}</p>
              </div>
            </div>
          </div>
        )}

        {/* For educational content without legs */}
        {(!strategy.legs || strategy.legs.length === 0) && strategy.risk && strategy.risk !== 'None' && (
          <div className="flex gap-3 mt-4">
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
              <p className="text-[10px] text-zinc-500 uppercase">Risk</p>
              <p className="text-sm text-white font-medium">{strategy.risk}</p>
            </div>
          </div>
        )}
      </div>

      {/* 📡 Live Market Data */}
      <div className="px-4 mb-6">
        <button
          onClick={() => setLiveDataOpen(!liveDataOpen)}
          className="w-full flex items-center justify-between bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 min-h-[44px] active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📡</span>
            <span className="text-sm font-bold text-[#39ff14]">Live Market Data</span>
          </div>
          {liveDataOpen ? (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          )}
        </button>

        {liveDataOpen && (
          <div className="mt-2 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 space-y-3">
            {!getApiKey() ? (
              <div className="text-center py-4">
                <p className="text-sm text-zinc-400 mb-2">API key required for live data</p>
                <button
                  onClick={() => navigate('/tools')}
                  className="text-xs text-[#39ff14] underline active:text-white min-h-[44px]"
                >
                  Set up API key in Tools →
                </button>
              </div>
            ) : (
              <>
                {/* Ticker input + Fetch */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    placeholder="Ticker"
                    className="flex-1 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono uppercase focus:border-[#39ff14]/50 focus:outline-none min-h-[44px]"
                    onKeyDown={(e) => e.key === 'Enter' && handleFetchQuote()}
                  />
                  <button
                    onClick={handleFetchQuote}
                    disabled={quoteLoading}
                    className="px-4 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-lg text-sm font-bold text-[#39ff14] active:scale-[0.98] transition-transform min-h-[44px] disabled:opacity-50"
                  >
                    {quoteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch'}
                  </button>
                </div>

                {/* Error */}
                {quoteError && (
                  <p className="text-xs text-red-400">{quoteError}</p>
                )}

                {/* Quote data */}
                {liveQuote && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-[9px] text-zinc-500 uppercase font-bold">Price</p>
                        <p className="text-lg font-mono font-bold text-white">
                          ${liveQuote.price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-500 uppercase font-bold">Change</p>
                        <p className={`text-sm font-mono font-bold ${liveQuote.change >= 0 ? 'text-[#39ff14]' : 'text-red-400'}`}>
                          {liveQuote.change >= 0 ? '+' : ''}{liveQuote.change.toFixed(2)} ({liveQuote.changePercent.toFixed(2)}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-500 uppercase font-bold">Volume</p>
                        <p className="text-sm font-mono text-zinc-300">
                          {liveQuote.volume >= 1000000
                            ? `${(liveQuote.volume / 1000000).toFixed(1)}M`
                            : liveQuote.volume >= 1000
                            ? `${(liveQuote.volume / 1000).toFixed(1)}K`
                            : liveQuote.volume.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Use in simulator button */}
                    {showSimulator && (
                      <button
                        onClick={() => setSimPrice(Math.round(liveQuote.price))}
                        className="w-full py-2 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-lg text-xs font-bold text-[#39ff14] active:scale-[0.98] transition-transform min-h-[44px]"
                      >
                        Use ${liveQuote.price.toFixed(2)} in simulator
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Interactive P&L Simulator */}
      {showSimulator && (
        <div className="px-4 mb-6 space-y-3">
          {/* Chart */}
          <PayoffChart
            strategy={strategy}
            stockPrice={simPrice}
            volatility={simVol}
            daysToExpiry={simDays}
            onPnLCalculated={handlePnLCalculated}
          />

          {/* P&L Readout */}
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">Entry</p>
                <p className="text-sm font-bold text-zinc-300">
                  ${Math.abs(entryValue).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">Current</p>
                <p className="text-sm font-bold text-white">
                  ${Math.abs(currentValue).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">P&L</p>
                <p
                  className={`text-lg font-black ${
                    currentPnL >= 0 ? 'text-[#39ff14]' : 'text-red-400'
                  }`}
                >
                  {currentPnL >= 0 ? '+' : ''}${currentPnL.toFixed(0)}
                </p>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold">Simulation Controls</p>
              <button
                onClick={resetSimulation}
                className="text-[10px] text-zinc-500 active:text-[#39ff14] transition-colors min-h-[44px] flex items-center"
              >
                Reset
              </button>
            </div>

            {/* Stock Price slider */}
            <div className="space-y-1">
              <label className="flex justify-between text-[10px] text-zinc-400 uppercase font-bold">
                <span>Stock Price</span>
                <span className="text-[#39ff14]">${simPrice}</span>
              </label>
              <input
                type="range"
                min="50"
                max="150"
                step="1"
                value={simPrice}
                onChange={(e) => setSimPrice(Number(e.target.value))}
                className="sim-slider w-full"
              />
            </div>

            {/* IV slider */}
            <div className="space-y-1">
              <label className="flex justify-between text-[10px] text-zinc-400 uppercase font-bold">
                <span>Implied Volatility</span>
                <span className="text-purple-400">{(simVol * 100).toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min="0.10"
                max="1.0"
                step="0.05"
                value={simVol}
                onChange={(e) => setSimVol(Number(e.target.value))}
                className="sim-slider sim-slider-purple w-full"
              />
            </div>

            {/* DTE slider */}
            <div className="space-y-1">
              <label className="flex justify-between text-[10px] text-zinc-400 uppercase font-bold">
                <span>Days to Expiry</span>
                <span className="text-cyan-400">{simDays}d</span>
              </label>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={simDays}
                onChange={(e) => setSimDays(Number(e.target.value))}
                className="sim-slider sim-slider-cyan w-full"
              />
            </div>
          </div>

          {/* Greeks */}
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-2">Position Greeks</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-[9px] text-zinc-500">Delta</p>
                <p className="text-sm font-mono text-zinc-300">{greeks.delta.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500">Gamma</p>
                <p className="text-sm font-mono text-zinc-300">{greeks.gamma.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500">Theta</p>
                <p className={`text-sm font-mono ${greeks.theta >= 0 ? 'text-[#39ff14]' : 'text-red-400'}`}>
                  {greeks.theta.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500">Vega</p>
                <p className="text-sm font-mono text-zinc-300">{greeks.vega.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⛓️ Options Chain */}
      {getApiKey() && (
        <div className="px-4 mb-6">
          <button
            onClick={handleChainOpen}
            className="w-full flex items-center justify-between bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 min-h-[44px] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⛓️</span>
              <span className="text-sm font-bold text-[#39ff14]">Options Chain</span>
            </div>
            {chainOpen ? (
              <ChevronUp className="w-4 h-4 text-zinc-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {chainOpen && (
            <div className="mt-2 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 space-y-3">
              {chainLoading && expirations.length === 0 ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-5 h-5 text-[#39ff14] animate-spin" />
                  <span className="ml-2 text-sm text-zinc-400">Loading expirations...</span>
                </div>
              ) : chainError && expirations.length === 0 ? (
                <p className="text-xs text-red-400 text-center py-4">{chainError}</p>
              ) : (
                <>
                  {/* Expiration dropdown */}
                  {expirations.length > 0 && (
                    <div className="space-y-1">
                      <label className="text-[9px] text-zinc-500 uppercase font-bold">Expiration</label>
                      <select
                        value={selectedExpiration}
                        onChange={(e) => handleExpirationChange(e.target.value)}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-[#39ff14]/50 focus:outline-none min-h-[44px] appearance-none"
                      >
                        {expirations.map((exp) => (
                          <option key={exp} value={exp}>
                            {exp} ({calculateDTE(exp)} DTE)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Calls/Puts toggle */}
                  <div className="flex gap-1 bg-black rounded-lg p-1">
                    <button
                      onClick={() => setChainTab('calls')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors min-h-[44px] ${
                        chainTab === 'calls'
                          ? 'bg-[#39ff14]/10 text-[#39ff14]'
                          : 'text-zinc-500'
                      }`}
                    >
                      Calls
                    </button>
                    <button
                      onClick={() => setChainTab('puts')}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors min-h-[44px] ${
                        chainTab === 'puts'
                          ? 'bg-red-500/10 text-red-400'
                          : 'text-zinc-500'
                      }`}
                    >
                      Puts
                    </button>
                  </div>

                  {/* Chain table */}
                  {chainLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="w-5 h-5 text-[#39ff14] animate-spin" />
                    </div>
                  ) : chainError ? (
                    <p className="text-xs text-red-400">{chainError}</p>
                  ) : (
                    <div className="overflow-x-auto -mx-3">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-zinc-500 uppercase">
                            <th className="text-left px-3 py-1 font-bold">Strike</th>
                            <th className="text-right px-2 py-1 font-bold">Bid</th>
                            <th className="text-right px-2 py-1 font-bold">Ask</th>
                            <th className="text-right px-2 py-1 font-bold">IV</th>
                            <th className="text-right px-3 py-1 font-bold">Delta</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(chainTab === 'calls' ? chainCalls : chainPuts).map((opt) => {
                            const activeChain = chainTab === 'calls' ? chainCalls : chainPuts;
                            const nearest = liveQuote
                              ? findNearestStrike(activeChain, liveQuote.price)
                              : null;
                            const isATM = nearest?.strike === opt.strike;
                            const isExpanded = expandedOption === opt.symbol;

                            return (
                              <React.Fragment key={opt.symbol}>
                                <tr
                                  onClick={() => setExpandedOption(isExpanded ? null : opt.symbol)}
                                  className={`border-t border-zinc-800/50 active:bg-zinc-800/30 cursor-pointer ${
                                    isATM ? 'bg-[#39ff14]/5' : ''
                                  }`}
                                >
                                  <td className={`px-3 py-2 font-mono font-bold ${
                                    isATM ? 'text-[#39ff14]' : 'text-white'
                                  }`}>
                                    {opt.strike.toFixed(0)}
                                    {isATM && <span className="ml-1 text-[8px] text-[#39ff14]">ATM</span>}
                                  </td>
                                  <td className="text-right px-2 py-2 font-mono text-zinc-300">{opt.bid.toFixed(2)}</td>
                                  <td className="text-right px-2 py-2 font-mono text-zinc-300">{opt.ask.toFixed(2)}</td>
                                  <td className="text-right px-2 py-2 font-mono text-purple-400">{opt.iv.toFixed(1)}%</td>
                                  <td className="text-right px-3 py-2 font-mono text-zinc-300">{opt.delta.toFixed(3)}</td>
                                </tr>
                                {isExpanded && (
                                  <tr>
                                    <td colSpan={5} className="px-3 py-2 bg-zinc-900/50">
                                      <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                                        <div>
                                          <p className="text-zinc-500 uppercase">Gamma</p>
                                          <p className="font-mono text-zinc-300">{opt.gamma.toFixed(4)}</p>
                                        </div>
                                        <div>
                                          <p className="text-zinc-500 uppercase">Theta</p>
                                          <p className={`font-mono ${opt.theta >= 0 ? 'text-[#39ff14]' : 'text-red-400'}`}>{opt.theta.toFixed(4)}</p>
                                        </div>
                                        <div>
                                          <p className="text-zinc-500 uppercase">Vega</p>
                                          <p className="font-mono text-zinc-300">{opt.vega.toFixed(4)}</p>
                                        </div>
                                        <div>
                                          <p className="text-zinc-500 uppercase">OI</p>
                                          <p className="font-mono text-zinc-300">{opt.openInterest.toLocaleString()}</p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                      {(chainTab === 'calls' ? chainCalls : chainPuts).length === 0 && (
                        <p className="text-center text-xs text-zinc-500 py-4">No options data available</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Analogy — WSW animal story */}
      {strategy.analogy && (
        <div className="px-4 mb-6">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌴</span>
              <h3 className="text-sm font-bold text-[#39ff14]">Jungle Analogy</h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">{strategy.analogy}</p>
          </div>
        </div>
      )}

      {/* Analysis content (HTML from desktop) */}
      {strategy.analysis && (
        <div className="px-4 mb-6">
          <div
            className="strategy-content prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: strategy.analysis }}
          />
        </div>
      )}

      {/* Nuance — deeper insights */}
      {strategy.nuance && (
        <div className="px-4 mb-6">
          <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔍</span>
              <h3 className="text-sm font-bold text-amber-400">The Nuance</h3>
            </div>
            <div
              className="strategy-content prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: strategy.nuance }}
            />
          </div>
        </div>
      )}

      {/* Example — worked through */}
      {strategy.example && (
        <div className="px-4 mb-6">
          <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📝</span>
              <h3 className="text-sm font-bold text-cyan-400">Worked Example</h3>
            </div>
            <div
              className="strategy-content prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: strategy.example }}
            />
          </div>
        </div>
      )}

      {/* Related Strategies */}
      {relatedStrategies.length > 0 && (
        <div className="px-4 mb-6">
          <h3 className="text-sm font-bold text-zinc-400 uppercase mb-3">Related Strategies</h3>
          <div className="space-y-2">
            {relatedStrategies.map((rel) => (
              <button
                key={rel.id}
                onClick={() => navigate(`/strategy/${rel.id}`)}
                className="w-full flex items-center justify-between bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 min-h-[44px] active:scale-[0.98] transition-transform text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{rel.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-zinc-500">{rel.outlook}</span>
                    {rel.risk && rel.risk !== 'None' && (
                      <span className="text-[10px] text-zinc-600">• {rel.risk}</span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#39ff14] flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz button — only for tiers with quiz questions */}
      {(() => {
        const tierConfig = TIER_QUIZ_CONFIG[strategy.tier];
        const hasQuestions = tierConfig?.enabled && getQuestionsForTier(strategy.tier).length > 0;
        if (!hasQuestions) return null;
        return (
          <div className="px-4 mb-8">
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-4 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-3 min-h-[44px]"
            >
              <GraduationCap className="w-5 h-5 text-[#39ff14]" />
              <span className="text-[#39ff14] font-bold text-sm">
                Take the Tier {strategy.tier} Quiz
              </span>
            </button>
          </div>
        );
      })()}

      {/* Quiz overlay */}
      {showQuiz && (
        <StrategyQuiz
          tier={strategy.tier}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
