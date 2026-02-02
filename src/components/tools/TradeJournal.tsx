import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Trash2,
  BarChart3,
  Zap,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
  Lightbulb,
  Award,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Trade {
  id: string;
  symbol: string;
  strategy: string;
  optionType: 'call' | 'put' | 'multi-leg';
  strike: number | null;
  entryDate: string;
  entryPrice: number;
  exitDate: string | null;
  exitPrice: number | null;
  contracts: number;
  status: 'open' | 'closed' | 'expired';
  pnl: number | null;
  notes: string;
}

interface Pattern {
  type: 'warning' | 'insight' | 'strength';
  icon: typeof AlertTriangle;
  title: string;
  description: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const STRATEGY_OPTIONS = [
  'Long Call',
  'Long Put',
  'Covered Call',
  'Cash-Secured Put',
  'Bull Call Spread',
  'Bear Put Spread',
  'Bull Put Spread',
  'Bear Call Spread',
  'Iron Condor',
  'Iron Butterfly',
  'Straddle',
  'Strangle',
  'Calendar Spread',
  'PMCC',
  'Custom',
];

const OPTION_TYPES: { value: Trade['optionType']; label: string }[] = [
  { value: 'call', label: 'Call' },
  { value: 'put', label: 'Put' },
  { value: 'multi-leg', label: 'Multi-Leg' },
];

const STORAGE_KEY = 'wsw_trade_journal';

// ─── Helpers ────────────────────────────────────────────────────────────────

function loadTrades(): Trade[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTrades(trades: Trade[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trades));
}

function fmt$(v: number): string {
  const neg = v < 0;
  return `${neg ? '-' : ''}$${Math.abs(v).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function daysBetween(a: string, b: string): number {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / 86400000
  );
}

// ─── Progress Ring (SVG) ────────────────────────────────────────────────────

function ProgressRing({
  pct,
  size = 100,
  stroke = 8,
}: {
  pct: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#27272a"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#39ff14"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function TradeJournal() {
  const navigate = useNavigate();
  const [trades, setTrades] = useState<Trade[]>(loadTrades);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [closingId, setClosingId] = useState<string | null>(null);
  const [closePrice, setClosePrice] = useState('');
  const [closeDate, setCloseDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [activeTab, setActiveTab] = useState<'trades' | 'analytics' | 'patterns'>('trades');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed' | 'expired'>('all');

  // Form state
  const [form, setForm] = useState({
    symbol: '',
    strategy: 'Covered Call',
    optionType: 'call' as Trade['optionType'],
    strike: '',
    entryDate: new Date().toISOString().split('T')[0],
    entryPrice: '',
    contracts: '1',
    notes: '',
  });

  // Persist trades
  useEffect(() => {
    saveTrades(trades);
  }, [trades]);

  // ── Form handlers ───────────────────────────────────────────────────────

  const resetForm = useCallback(() => {
    setForm({
      symbol: '',
      strategy: 'Covered Call',
      optionType: 'call',
      strike: '',
      entryDate: new Date().toISOString().split('T')[0],
      entryPrice: '',
      contracts: '1',
      notes: '',
    });
    setShowForm(false);
  }, []);

  const addTrade = useCallback(() => {
    if (!form.symbol || !form.entryPrice) return;
    const trade: Trade = {
      id: Date.now().toString(),
      symbol: form.symbol.toUpperCase(),
      strategy: form.strategy,
      optionType: form.optionType,
      strike: form.strike ? parseFloat(form.strike) : null,
      entryDate: form.entryDate,
      entryPrice: parseFloat(form.entryPrice),
      exitDate: null,
      exitPrice: null,
      contracts: parseInt(form.contracts) || 1,
      status: 'open',
      pnl: null,
      notes: form.notes,
    };
    setTrades((prev) => [trade, ...prev]);
    resetForm();
  }, [form, resetForm]);

  const closeTrade = useCallback(
    (id: string) => {
      const price = parseFloat(closePrice);
      if (isNaN(price)) return;
      setTrades((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const pnl = (price - t.entryPrice) * t.contracts * 100;
          return {
            ...t,
            exitPrice: price,
            exitDate: closeDate,
            status: 'closed' as const,
            pnl,
          };
        })
      );
      setClosingId(null);
      setClosePrice('');
    },
    [closePrice, closeDate]
  );

  const expireTrade = useCallback((id: string) => {
    setTrades((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: 'expired' as const, exitPrice: 0, exitDate: new Date().toISOString().split('T')[0], pnl: -t.entryPrice * t.contracts * 100 }
          : t
      )
    );
  }, []);

  const deleteTrade = useCallback((id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
    setExpandedId(null);
  }, []);

  // ── Filtered & sorted ──────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = trades;
    if (statusFilter !== 'all') list = list.filter((t) => t.status === statusFilter);
    return [...list].sort(
      (a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    );
  }, [trades, statusFilter]);

  // ── Analytics ─────────────────────────────────────────────────────────

  const analytics = useMemo(() => {
    const closed = trades.filter((t) => t.status === 'closed' && t.pnl !== null);
    const winners = closed.filter((t) => (t.pnl ?? 0) > 0);
    const losers = closed.filter((t) => (t.pnl ?? 0) < 0);

    const totalPnL = closed.reduce((s, t) => s + (t.pnl ?? 0), 0);
    const winRate = closed.length > 0 ? (winners.length / closed.length) * 100 : 0;
    const avgWin =
      winners.length > 0
        ? winners.reduce((s, t) => s + (t.pnl ?? 0), 0) / winners.length
        : 0;
    const avgLoss =
      losers.length > 0
        ? Math.abs(losers.reduce((s, t) => s + (t.pnl ?? 0), 0) / losers.length)
        : 0;

    // By strategy
    const byStrategy: Record<string, { pnl: number; count: number; wins: number }> = {};
    closed.forEach((t) => {
      if (!byStrategy[t.strategy])
        byStrategy[t.strategy] = { pnl: 0, count: 0, wins: 0 };
      byStrategy[t.strategy].pnl += t.pnl ?? 0;
      byStrategy[t.strategy].count++;
      if ((t.pnl ?? 0) > 0) byStrategy[t.strategy].wins++;
    });
    const strategyData = Object.entries(byStrategy)
      .map(([name, d]) => ({ name, pnl: d.pnl, count: d.count, wins: d.wins }))
      .sort((a, b) => b.pnl - a.pnl);

    // Equity curve
    const sorted = [...closed].sort(
      (a, b) =>
        new Date(a.exitDate!).getTime() - new Date(b.exitDate!).getTime()
    );
    let cum = 0;
    const equityCurve = sorted.map((t) => {
      cum += t.pnl ?? 0;
      return {
        date: t.exitDate!.slice(5), // MM-DD
        pnl: cum,
      };
    });

    // Average hold time
    const holdTimes = closed
      .filter((t) => t.exitDate)
      .map((t) => daysBetween(t.entryDate, t.exitDate!));
    const avgHold =
      holdTimes.length > 0
        ? holdTimes.reduce((s, d) => s + d, 0) / holdTimes.length
        : 0;

    // Best / worst
    const best = closed.length > 0 ? closed.reduce((a, b) => ((a.pnl ?? 0) > (b.pnl ?? 0) ? a : b)) : null;
    const worst = closed.length > 0 ? closed.reduce((a, b) => ((a.pnl ?? 0) < (b.pnl ?? 0) ? a : b)) : null;

    // Put vs Call breakdown
    const putTrades = closed.filter((t) => t.optionType === 'put');
    const callTrades = closed.filter((t) => t.optionType === 'call');
    const putPnL = putTrades.reduce((s, t) => s + (t.pnl ?? 0), 0);
    const callPnL = callTrades.reduce((s, t) => s + (t.pnl ?? 0), 0);

    // Avg hold for winners vs losers
    const winnerHolds = winners
      .filter((t) => t.exitDate)
      .map((t) => daysBetween(t.entryDate, t.exitDate!));
    const loserHolds = losers
      .filter((t) => t.exitDate)
      .map((t) => daysBetween(t.entryDate, t.exitDate!));
    const avgWinHold =
      winnerHolds.length > 0
        ? winnerHolds.reduce((s, d) => s + d, 0) / winnerHolds.length
        : 0;
    const avgLoseHold =
      loserHolds.length > 0
        ? loserHolds.reduce((s, d) => s + d, 0) / loserHolds.length
        : 0;

    return {
      totalPnL,
      winRate,
      avgWin,
      avgLoss,
      strategyData,
      equityCurve,
      avgHold,
      best,
      worst,
      closedCount: closed.length,
      openCount: trades.filter((t) => t.status === 'open').length,
      putPnL,
      callPnL,
      putCount: putTrades.length,
      callCount: callTrades.length,
      avgWinHold,
      avgLoseHold,
      byStrategy,
    };
  }, [trades]);

  // ── Patterns ──────────────────────────────────────────────────────────

  const patterns = useMemo((): Pattern[] => {
    const results: Pattern[] = [];
    const closed = trades.filter((t) => t.status === 'closed' && t.pnl !== null);

    if (closed.length < 3) {
      return [
        {
          type: 'insight',
          icon: Lightbulb,
          title: 'Need More Data',
          description:
            'Log at least 3 closed trades to unlock pattern recognition.',
        },
      ];
    }

    // Put vs Call
    if (analytics.putCount >= 2 && analytics.callCount >= 2) {
      const putAvg = analytics.putPnL / analytics.putCount;
      const callAvg = analytics.callPnL / analytics.callCount;
      if (Math.abs(putAvg - callAvg) > 20) {
        const better = putAvg > callAvg ? 'put' : 'call';
        const pct = Math.abs(((putAvg - callAvg) / Math.max(Math.abs(callAvg), 1)) * 100);
        results.push({
          type: 'insight',
          icon: Lightbulb,
          title: `${better === 'put' ? 'Put' : 'Call'} Strategies Outperform`,
          description: `Your ${better} strategies outperform ${better === 'put' ? 'calls' : 'puts'} by ${pct.toFixed(0)}%.`,
        });
      }
    }

    // Avg winner vs loser
    if (analytics.avgWin > 0 && analytics.avgLoss > 0) {
      results.push({
        type: 'insight',
        icon: DollarSign,
        title: 'Win/Loss Sizing',
        description: `Average winner: ${fmt$(analytics.avgWin)}, Average loser: ${fmt$(analytics.avgLoss)}.`,
      });
    }

    // Holding losers longer
    if (analytics.avgLoseHold > analytics.avgWinHold + 1 && analytics.avgLoseHold > 0) {
      results.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Holding Losers Too Long',
        description: `You hold losers ${analytics.avgLoseHold.toFixed(1)} days vs winners ${analytics.avgWinHold.toFixed(1)} days. Cut losers faster.`,
      });
    }

    // Win rate insight
    if (analytics.winRate >= 60) {
      results.push({
        type: 'strength',
        icon: Award,
        title: 'Strong Win Rate',
        description: `${analytics.winRate.toFixed(0)}% win rate — keep doing what works!`,
      });
    } else if (analytics.winRate < 40 && closed.length >= 5) {
      results.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Low Win Rate',
        description: `${analytics.winRate.toFixed(0)}% win rate. Consider tightening entry criteria.`,
      });
    }

    // Strategy-specific
    Object.entries(analytics.byStrategy).forEach(([strat, data]) => {
      if (data.count >= 3) {
        const wr = (data.wins / data.count) * 100;
        if (wr >= 70) {
          results.push({
            type: 'strength',
            icon: Award,
            title: `${strat} is Your Edge`,
            description: `${wr.toFixed(0)}% win rate on ${data.count} trades.`,
          });
        } else if (wr <= 30) {
          results.push({
            type: 'warning',
            icon: AlertTriangle,
            title: `${strat} Underperforming`,
            description: `Only ${wr.toFixed(0)}% win rate. Consider reducing or avoiding.`,
          });
        }
      }
    });

    if (results.length === 0) {
      results.push({
        type: 'insight',
        icon: Lightbulb,
        title: 'No Strong Patterns Yet',
        description: 'Keep logging trades — patterns will emerge.',
      });
    }

    return results;
  }, [trades, analytics]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div
        className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-zinc-800"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/tools')}
            className="flex items-center gap-1 text-[#39ff14] min-h-[44px] min-w-[44px] active:scale-[0.98]"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Tools</span>
          </button>
          <h1 className="text-lg font-bold">Trade Journal</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full bg-[#39ff14] text-black active:scale-[0.98]"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-zinc-800">
          {(['trades', 'analytics', 'patterns'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] ${
                activeTab === tab
                  ? 'text-[#39ff14] border-b-2 border-[#39ff14]'
                  : 'text-zinc-500'
              }`}
            >
              {tab === 'trades' && `Trades (${trades.length})`}
              {tab === 'analytics' && 'Analytics'}
              {tab === 'patterns' && 'Patterns'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-28">
        {/* ─── TRADES TAB ─────────────────────────────────────────────── */}
        {activeTab === 'trades' && (
          <div className="mt-4 space-y-3">
            {/* Status filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {(['all', 'open', 'closed', 'expired'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap min-h-[36px] transition-all active:scale-[0.98] ${
                    statusFilter === s
                      ? 'bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/40'
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}
                >
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-zinc-500 text-sm">No trades yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 text-[#39ff14] text-sm font-medium active:scale-[0.98]"
                >
                  + Add your first trade
                </button>
              </div>
            )}

            {filtered.map((trade) => {
              const expanded = expandedId === trade.id;
              const closing = closingId === trade.id;
              const profitable = (trade.pnl ?? 0) > 0;
              const isPnlKnown = trade.pnl !== null;

              return (
                <div
                  key={trade.id}
                  className={`rounded-xl border transition-all ${
                    trade.status === 'open'
                      ? 'border-zinc-700 bg-zinc-900/60'
                      : profitable
                      ? 'border-emerald-800/50 bg-emerald-950/20'
                      : 'border-red-900/50 bg-red-950/20'
                  }`}
                >
                  {/* Card header — tap to expand */}
                  <button
                    onClick={() =>
                      setExpandedId(expanded ? null : trade.id)
                    }
                    className="w-full flex items-center justify-between p-4 text-left min-h-[56px] active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold text-base">
                            {trade.symbol}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                              trade.status === 'open'
                                ? 'bg-blue-500/20 text-blue-400'
                                : trade.status === 'closed'
                                ? 'bg-zinc-700 text-zinc-300'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {trade.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-zinc-500 text-xs mt-0.5">
                          {trade.strategy} · {trade.optionType}{' '}
                          {trade.strike ? `$${trade.strike}` : ''} ·{' '}
                          {trade.contracts}x
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPnlKnown && (
                        <span
                          className={`font-bold text-sm ${
                            profitable ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {fmt$(trade.pnl!)}
                        </span>
                      )}
                      {!isPnlKnown && (
                        <span className="text-zinc-500 text-xs">
                          @{trade.entryPrice.toFixed(2)}
                        </span>
                      )}
                      {expanded ? (
                        <ChevronUp size={16} className="text-zinc-500" />
                      ) : (
                        <ChevronDown size={16} className="text-zinc-500" />
                      )}
                    </div>
                  </button>

                  {/* Expanded details */}
                  {expanded && (
                    <div className="px-4 pb-4 space-y-3 border-t border-zinc-800/50">
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <Detail label="Entry Date" value={trade.entryDate} />
                        <Detail
                          label="Entry Price"
                          value={`$${trade.entryPrice.toFixed(2)}`}
                        />
                        {trade.exitDate && (
                          <Detail label="Exit Date" value={trade.exitDate} />
                        )}
                        {trade.exitPrice !== null && (
                          <Detail
                            label="Exit Price"
                            value={`$${trade.exitPrice.toFixed(2)}`}
                          />
                        )}
                        <Detail label="Contracts" value={String(trade.contracts)} />
                        {trade.strike !== null && (
                          <Detail
                            label="Strike"
                            value={`$${trade.strike.toFixed(2)}`}
                          />
                        )}
                        {isPnlKnown && trade.exitDate && (
                          <Detail
                            label="Hold Time"
                            value={`${daysBetween(trade.entryDate, trade.exitDate)} days`}
                          />
                        )}
                      </div>

                      {trade.notes && (
                        <div>
                          <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                            Notes
                          </p>
                          <p className="text-zinc-300 text-xs leading-relaxed">
                            {trade.notes}
                          </p>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-1">
                        {trade.status === 'open' && !closing && (
                          <>
                            <button
                              onClick={() => setClosingId(trade.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#39ff14]/10 text-[#39ff14] text-xs font-semibold min-h-[44px] active:scale-[0.98]"
                            >
                              <DollarSign size={14} />
                              Close Trade
                            </button>
                            <button
                              onClick={() => expireTrade(trade.id)}
                              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold min-h-[44px] active:scale-[0.98]"
                            >
                              <Clock size={14} />
                              Expired
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteTrade(trade.id)}
                          className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-red-500/10 text-red-400 min-h-[44px] active:scale-[0.98]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Close trade inline form */}
                      {closing && (
                        <div className="p-3 rounded-lg bg-zinc-800/50 border border-[#39ff14]/20 space-y-3">
                          <p className="text-[#39ff14] text-xs font-semibold uppercase tracking-wider">
                            Close Trade
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-zinc-500 text-[10px] uppercase mb-1 block">
                                Exit Price
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                value={closePrice}
                                onChange={(e) => setClosePrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm min-h-[44px] focus:border-[#39ff14]/50 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-zinc-500 text-[10px] uppercase mb-1 block">
                                Exit Date
                              </label>
                              <input
                                type="date"
                                value={closeDate}
                                onChange={(e) => setCloseDate(e.target.value)}
                                className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm min-h-[44px] focus:border-[#39ff14]/50 focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => closeTrade(trade.id)}
                              className="flex-1 py-2.5 rounded-lg bg-[#39ff14] text-black text-xs font-bold min-h-[44px] active:scale-[0.98]"
                            >
                              Confirm Close
                            </button>
                            <button
                              onClick={() => {
                                setClosingId(null);
                                setClosePrice('');
                              }}
                              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-semibold min-h-[44px] active:scale-[0.98]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ─── ANALYTICS TAB ──────────────────────────────────────────── */}
        {activeTab === 'analytics' && (
          <div className="mt-4 space-y-4">
            {analytics.closedCount === 0 ? (
              <div className="text-center py-16">
                <BarChart3 size={32} className="mx-auto text-zinc-600 mb-3" />
                <p className="text-zinc-500 text-sm">
                  Close some trades to see analytics.
                </p>
              </div>
            ) : (
              <>
                {/* Total P&L hero */}
                <div className="text-center py-6">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                    Total P&L
                  </p>
                  <p
                    className={`text-4xl font-black ${
                      analytics.totalPnL >= 0
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {analytics.totalPnL >= 0 ? '+' : ''}
                    {fmt$(analytics.totalPnL)}
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">
                    {analytics.closedCount} closed · {analytics.openCount} open
                  </p>
                </div>

                {/* Win Rate + Stats row */}
                <div className="flex gap-3">
                  {/* Win Rate Ring */}
                  <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <div className="relative">
                      <ProgressRing pct={analytics.winRate} size={80} stroke={6} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#39ff14] text-lg font-bold">
                          {analytics.winRate.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-2">
                      Win Rate
                    </p>
                  </div>

                  {/* Stats stack */}
                  <div className="flex-1 space-y-2">
                    <StatCard
                      label="Avg Winner"
                      value={fmt$(analytics.avgWin)}
                      color="text-emerald-400"
                    />
                    <StatCard
                      label="Avg Loser"
                      value={fmt$(analytics.avgLoss)}
                      color="text-red-400"
                    />
                    <StatCard
                      label="Avg Hold"
                      value={`${analytics.avgHold.toFixed(1)}d`}
                      color="text-zinc-300"
                    />
                  </div>
                </div>

                {/* Best / Worst */}
                <div className="grid grid-cols-2 gap-3">
                  {analytics.best && (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/30">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <TrendingUp size={10} /> Best Trade
                      </p>
                      <p className="text-emerald-400 font-bold text-sm mt-1">
                        {analytics.best.symbol}
                      </p>
                      <p className="text-emerald-400/80 text-xs">
                        {fmt$(analytics.best.pnl!)}
                      </p>
                    </div>
                  )}
                  {analytics.worst && (
                    <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/30">
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <TrendingDown size={10} /> Worst Trade
                      </p>
                      <p className="text-red-400 font-bold text-sm mt-1">
                        {analytics.worst.symbol}
                      </p>
                      <p className="text-red-400/80 text-xs">
                        {fmt$(analytics.worst.pnl!)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Equity Curve */}
                {analytics.equityCurve.length >= 2 && (
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                      Equity Curve
                    </p>
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={analytics.equityCurve}>
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 10, fill: '#71717a' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: '#71717a' }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v: number) => `$${v}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #39ff14',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                          labelStyle={{ color: '#a1a1aa' }}
                          formatter={(value: number) => [fmt$(value), 'P&L']}
                        />
                        <Line
                          type="monotone"
                          dataKey="pnl"
                          stroke="#39ff14"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* P&L by Strategy */}
                {analytics.strategyData.length > 0 && (
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
                      P&L by Strategy
                    </p>
                    <ResponsiveContainer width="100%" height={Math.max(120, analytics.strategyData.length * 40)}>
                      <BarChart
                        data={analytics.strategyData}
                        layout="vertical"
                        margin={{ left: 0, right: 8, top: 0, bottom: 0 }}
                      >
                        <XAxis
                          type="number"
                          tick={{ fontSize: 10, fill: '#71717a' }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v: number) => `$${v}`}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ fontSize: 10, fill: '#a1a1aa' }}
                          axisLine={false}
                          tickLine={false}
                          width={90}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #39ff14',
                            borderRadius: '8px',
                            fontSize: '12px',
                          }}
                          formatter={(value: number) => [fmt$(value), 'P&L']}
                        />
                        <Bar dataKey="pnl" radius={[0, 4, 4, 0]}>
                          {analytics.strategyData.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={entry.pnl >= 0 ? '#39ff14' : '#ef4444'}
                              fillOpacity={0.8}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ─── PATTERNS TAB ───────────────────────────────────────────── */}
        {activeTab === 'patterns' && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-[#39ff14]" />
              <p className="text-zinc-400 text-xs">
                AI-style insights from your trading data
              </p>
            </div>
            {patterns.map((p, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  p.type === 'strength'
                    ? 'border-emerald-800/40 bg-emerald-950/20'
                    : p.type === 'warning'
                    ? 'border-red-800/40 bg-red-950/20'
                    : 'border-zinc-700 bg-zinc-900/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <p.icon
                    size={18}
                    className={
                      p.type === 'strength'
                        ? 'text-emerald-400 mt-0.5'
                        : p.type === 'warning'
                        ? 'text-red-400 mt-0.5'
                        : 'text-[#39ff14] mt-0.5'
                    }
                  />
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {p.title}
                    </p>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── ADD TRADE MODAL (full-screen slide-up) ───────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black">
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-zinc-800"
            style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
          >
            <button
              onClick={resetForm}
              className="text-zinc-400 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-[0.98]"
            >
              <X size={22} />
            </button>
            <h2 className="text-white font-bold">New Trade</h2>
            <button
              onClick={addTrade}
              disabled={!form.symbol || !form.entryPrice}
              className="text-[#39ff14] font-bold text-sm min-h-[44px] px-3 active:scale-[0.98] disabled:opacity-30"
            >
              Save
            </button>
          </div>

          <div className="px-4 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
            {/* Symbol */}
            <FormField label="Symbol *">
              <input
                type="text"
                value={form.symbol}
                onChange={(e) =>
                  setForm({ ...form, symbol: e.target.value.toUpperCase() })
                }
                placeholder="AAPL"
                autoFocus
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-base min-h-[48px] focus:border-[#39ff14]/50 focus:outline-none placeholder:text-zinc-600"
              />
            </FormField>

            {/* Strategy */}
            <FormField label="Strategy">
              <select
                value={form.strategy}
                onChange={(e) => setForm({ ...form, strategy: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm min-h-[48px] focus:border-[#39ff14]/50 focus:outline-none appearance-none"
              >
                {STRATEGY_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Option Type (segmented) */}
            <FormField label="Type">
              <div className="flex gap-2">
                {OPTION_TYPES.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setForm({ ...form, optionType: o.value })}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold min-h-[44px] transition-all active:scale-[0.98] ${
                      form.optionType === o.value
                        ? 'bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/40'
                        : 'bg-zinc-900 text-zinc-500 border border-zinc-700'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Strike */}
            <FormField label="Strike Price">
              <input
                type="number"
                step="0.5"
                value={form.strike}
                onChange={(e) => setForm({ ...form, strike: e.target.value })}
                placeholder="150.00"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-base min-h-[48px] focus:border-[#39ff14]/50 focus:outline-none placeholder:text-zinc-600"
              />
            </FormField>

            {/* Entry Date + Price */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Entry Date *">
                <input
                  type="date"
                  value={form.entryDate}
                  onChange={(e) =>
                    setForm({ ...form, entryDate: e.target.value })
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm min-h-[48px] focus:border-[#39ff14]/50 focus:outline-none"
                />
              </FormField>
              <FormField label="Entry Price *">
                <input
                  type="number"
                  step="0.01"
                  value={form.entryPrice}
                  onChange={(e) =>
                    setForm({ ...form, entryPrice: e.target.value })
                  }
                  placeholder="3.50"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-base min-h-[48px] focus:border-[#39ff14]/50 focus:outline-none placeholder:text-zinc-600"
                />
              </FormField>
            </div>

            {/* Contracts */}
            <FormField label="Contracts">
              <input
                type="number"
                min="1"
                value={form.contracts}
                onChange={(e) =>
                  setForm({ ...form, contracts: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-base min-h-[48px] focus:border-[#39ff14]/50 focus:outline-none"
              />
            </FormField>

            {/* Notes */}
            <FormField label="Notes">
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder="Trade thesis, observations..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm min-h-[80px] focus:border-[#39ff14]/50 focus:outline-none placeholder:text-zinc-600 resize-none"
              />
            </FormField>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-zinc-500 text-[10px] uppercase tracking-wider">
        {label}
      </p>
      <p className="text-zinc-200 text-sm font-medium">{value}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
      <p className="text-zinc-500 text-[10px] uppercase tracking-wider">
        {label}
      </p>
      <p className={`${color} font-bold text-sm`}>{value}</p>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-zinc-400 text-xs font-medium mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}
