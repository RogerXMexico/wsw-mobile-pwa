import { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Plus, X, Wallet, BarChart3, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blackScholes } from '../../utils/blackScholes';

// ─── Types ────────────────────────────────────────────

interface Trade {
  id: string;
  symbol: string;
  strategy: string;
  type: 'call' | 'put';
  direction: 'long' | 'short';
  strike: number;
  entryPrice: number;
  currentPrice: number;
  contracts: number;
  entryDate: string;
  closeDate?: string;
  closePrice?: number;
  status: 'open' | 'closed';
  notes: string;
  // For B-S simulation
  stockPriceAtEntry: number;
  iv: number;
  dte: number;
}

interface Portfolio {
  cash: number;
  trades: Trade[];
  startingCash: number;
}

const STORAGE_KEY = 'wsw_paper_trading';
const STARTING_CASH = 10000;

function loadPortfolio(): Portfolio {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { cash: STARTING_CASH, trades: [], startingCash: STARTING_CASH };
}

function savePortfolio(p: Portfolio) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

// ─── Component ────────────────────────────────────────

export default function PaperTrading() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio>(loadPortfolio);
  const [showNewTrade, setShowNewTrade] = useState(false);
  const [activeTab, setActiveTab] = useState<'positions' | 'history' | 'stats'>('positions');

  // New trade form
  const [form, setForm] = useState({
    symbol: '',
    strategy: 'Long Call',
    type: 'call' as 'call' | 'put',
    direction: 'long' as 'long' | 'short',
    strike: 100,
    entryPrice: 3.00,
    contracts: 1,
    stockPrice: 100,
    iv: 30,
    dte: 30,
    notes: '',
  });

  const save = useCallback((p: Portfolio) => {
    setPortfolio(p);
    savePortfolio(p);
  }, []);

  // ─── Open Trade ────────────────────────────────────

  const openTrade = useCallback(() => {
    const cost = form.entryPrice * form.contracts * 100;
    if (form.direction === 'long' && cost > portfolio.cash) return;

    const trade: Trade = {
      id: Date.now().toString(),
      symbol: form.symbol.toUpperCase() || 'SPY',
      strategy: form.strategy,
      type: form.type,
      direction: form.direction,
      strike: form.strike,
      entryPrice: form.entryPrice,
      currentPrice: form.entryPrice,
      contracts: form.contracts,
      entryDate: new Date().toISOString().split('T')[0],
      status: 'open',
      notes: form.notes,
      stockPriceAtEntry: form.stockPrice,
      iv: form.iv,
      dte: form.dte,
    };

    const newCash = form.direction === 'long'
      ? portfolio.cash - cost
      : portfolio.cash + cost; // credit for short

    save({
      ...portfolio,
      cash: newCash,
      trades: [trade, ...portfolio.trades],
    });

    setShowNewTrade(false);
    setForm(f => ({ ...f, symbol: '', notes: '' }));
  }, [form, portfolio, save]);

  // ─── Close Trade ───────────────────────────────────

  const closeTrade = useCallback((tradeId: string, closePrice: number) => {
    const updated = portfolio.trades.map(t => {
      if (t.id !== tradeId) return t;
      return {
        ...t,
        status: 'closed' as const,
        closeDate: new Date().toISOString().split('T')[0],
        closePrice,
      };
    });

    const trade = portfolio.trades.find(t => t.id === tradeId);
    if (!trade) return;

    let cashChange: number;
    if (trade.direction === 'long') {
      cashChange = closePrice * trade.contracts * 100; // sell to close
    } else {
      cashChange = -(closePrice * trade.contracts * 100); // buy to close
    }

    save({ ...portfolio, cash: portfolio.cash + cashChange, trades: updated });
  }, [portfolio, save]);

  // ─── Simulate Price Change ─────────────────────────

  const simulateMove = useCallback((tradeId: string, stockMove: number) => {
    const updated = portfolio.trades.map(t => {
      if (t.id !== tradeId || t.status === 'closed') return t;
      const newStockPrice = t.stockPriceAtEntry * (1 + stockMove / 100);
      const remainingDTE = Math.max(1, t.dte - 1);
      const newOptPrice = blackScholes(t.type, newStockPrice, t.strike, remainingDTE / 365, 0.045, t.iv / 100);
      return { ...t, currentPrice: Math.max(0.01, newOptPrice), dte: remainingDTE, stockPriceAtEntry: newStockPrice };
    });
    save({ ...portfolio, trades: updated });
  }, [portfolio, save]);

  // ─── Portfolio Stats ───────────────────────────────

  const stats = useMemo(() => {
    const openTrades = portfolio.trades.filter(t => t.status === 'open');
    const closedTrades = portfolio.trades.filter(t => t.status === 'closed');

    const openValue = openTrades.reduce((sum, t) => {
      const val = t.currentPrice * t.contracts * 100;
      return sum + (t.direction === 'long' ? val : -val);
    }, 0);

    const totalValue = portfolio.cash + openValue;
    const totalPL = totalValue - portfolio.startingCash;
    const totalPLPct = (totalPL / portfolio.startingCash) * 100;

    const closedPL = closedTrades.reduce((sum, t) => {
      const entry = t.entryPrice * t.contracts * 100;
      const exit = (t.closePrice || 0) * t.contracts * 100;
      return sum + (t.direction === 'long' ? exit - entry : entry - exit);
    }, 0);

    const winners = closedTrades.filter(t => {
      const entry = t.entryPrice * t.contracts * 100;
      const exit = (t.closePrice || 0) * t.contracts * 100;
      return t.direction === 'long' ? exit > entry : entry > exit;
    });

    const winRate = closedTrades.length > 0 ? (winners.length / closedTrades.length) * 100 : 0;

    return { openTrades, closedTrades, openValue, totalValue, totalPL, totalPLPct, closedPL, winRate };
  }, [portfolio]);

  // ─── Reset ─────────────────────────────────────────

  const resetPortfolio = useCallback(() => {
    if (confirm('Reset portfolio? This deletes all trades.')) {
      save({ cash: STARTING_CASH, trades: [], startingCash: STARTING_CASH });
    }
  }, [save]);

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
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">Paper Trading</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* ═══ PORTFOLIO SUMMARY ═══ */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#39ff14]" />
              <span className="text-xs text-zinc-400 uppercase font-bold">Virtual Portfolio</span>
            </div>
            <button onClick={resetPortfolio} className="text-[10px] text-zinc-500 px-2 py-1 border border-zinc-800 rounded-lg active:scale-95">
              Reset
            </button>
          </div>

          <div className="text-center mb-3">
            <p className="text-[10px] text-zinc-500 uppercase">Total Value</p>
            <p className="text-3xl font-black text-white font-mono">${stats.totalValue.toFixed(2)}</p>
            <p className={`text-sm font-bold ${stats.totalPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {stats.totalPL >= 0 ? '+' : ''}${stats.totalPL.toFixed(2)} ({stats.totalPLPct >= 0 ? '+' : ''}{stats.totalPLPct.toFixed(1)}%)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-black rounded-lg border border-zinc-800">
              <p className="text-[9px] text-zinc-500 uppercase">Cash</p>
              <p className="text-sm font-bold text-[#39ff14] font-mono">${portfolio.cash.toFixed(0)}</p>
            </div>
            <div className="text-center p-2 bg-black rounded-lg border border-zinc-800">
              <p className="text-[9px] text-zinc-500 uppercase">Open P&L</p>
              <p className={`text-sm font-bold font-mono ${stats.openValue >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${stats.openValue.toFixed(0)}
              </p>
            </div>
            <div className="text-center p-2 bg-black rounded-lg border border-zinc-800">
              <p className="text-[9px] text-zinc-500 uppercase">Win Rate</p>
              <p className={`text-sm font-bold font-mono ${stats.winRate >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {stats.winRate.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* ═══ NEW TRADE BUTTON ═══ */}
        <button
          onClick={() => setShowNewTrade(true)}
          className="w-full py-3 bg-[#39ff14]/10 border border-[#39ff14]/30 rounded-xl text-[#39ff14] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" /> New Trade
        </button>

        {/* ═══ TAB SELECTOR ═══ */}
        <div className="flex gap-1.5">
          {(['positions', 'history', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize active:scale-[0.97] ${
                activeTab === tab
                  ? 'bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14]'
                  : 'bg-[#0a0a0a] border border-zinc-800 text-zinc-500'
              }`}
            >
              {tab === 'positions' ? `Open (${stats.openTrades.length})` : tab === 'history' ? `Closed (${stats.closedTrades.length})` : 'Stats'}
            </button>
          ))}
        </div>

        {/* ═══ OPEN POSITIONS ═══ */}
        {activeTab === 'positions' && (
          <div className="space-y-3">
            {stats.openTrades.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                <DollarSign className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No open positions</p>
                <p className="text-xs">Tap "New Trade" to start</p>
              </div>
            )}
            {stats.openTrades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} onClose={closeTrade} onSimulate={simulateMove} />
            ))}
          </div>
        )}

        {/* ═══ TRADE HISTORY ═══ */}
        {activeTab === 'history' && (
          <div className="space-y-2">
            {stats.closedTrades.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No closed trades yet</p>
              </div>
            )}
            {stats.closedTrades.map((trade) => {
              const entry = trade.entryPrice * trade.contracts * 100;
              const exit = (trade.closePrice || 0) * trade.contracts * 100;
              const pl = trade.direction === 'long' ? exit - entry : entry - exit;
              return (
                <div key={trade.id} className={`bg-[#0a0a0a] border rounded-xl p-3 ${pl >= 0 ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-bold text-white">{trade.symbol}</span>
                      <span className="text-xs text-zinc-500 ml-2">{trade.strategy}</span>
                    </div>
                    <span className={`text-sm font-bold font-mono ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {pl >= 0 ? '+' : ''}${pl.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-[10px] text-zinc-500 mt-1">
                    <span>Entry: ${trade.entryPrice.toFixed(2)}</span>
                    <span>Exit: ${trade.closePrice?.toFixed(2)}</span>
                    <span>{trade.entryDate} → {trade.closeDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ STATS TAB ═══ */}
        {activeTab === 'stats' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Total Trades" value={portfolio.trades.length.toString()} />
              <StatCard label="Open Positions" value={stats.openTrades.length.toString()} />
              <StatCard label="Realized P&L" value={`$${stats.closedPL.toFixed(0)}`} color={stats.closedPL >= 0 ? '#22c55e' : '#ef4444'} />
              <StatCard label="Win Rate" value={`${stats.winRate.toFixed(0)}%`} color={stats.winRate >= 50 ? '#22c55e' : '#fbbf24'} />
              <StatCard label="Starting Cash" value={`$${portfolio.startingCash.toFixed(0)}`} />
              <StatCard label="Current Cash" value={`$${portfolio.cash.toFixed(0)}`} color="#39ff14" />
            </div>

            {stats.closedTrades.length > 0 && (
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
                <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3">Closed Trade P&L</h3>
                <EquityCurve trades={stats.closedTrades} startingCash={portfolio.startingCash} />
              </div>
            )}

            {/* Strategy breakdown */}
            {stats.closedTrades.length > 0 && (
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
                <h3 className="text-xs text-zinc-400 font-bold uppercase mb-3">P&L by Strategy</h3>
                <StrategyBreakdown trades={stats.closedTrades} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ NEW TRADE MODAL ═══ */}
      {showNewTrade && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-zinc-900 border-t border-zinc-700 rounded-t-2xl p-5 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#39ff14]" /> New Trade
              </h3>
              <button onClick={() => setShowNewTrade(false)}>
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Symbol */}
              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">Symbol</label>
                <input
                  type="text"
                  value={form.symbol}
                  onChange={(e) => setForm(f => ({ ...f, symbol: e.target.value.toUpperCase() }))}
                  placeholder="SPY, AAPL, TSLA..."
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2.5 text-white font-mono text-sm placeholder-zinc-600 focus:border-[#39ff14]/50 focus:outline-none"
                />
              </div>

              {/* Strategy */}
              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">Strategy</label>
                <select
                  value={form.strategy}
                  onChange={(e) => setForm(f => ({ ...f, strategy: e.target.value }))}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#39ff14]/50 focus:outline-none"
                >
                  {['Long Call', 'Long Put', 'Covered Call', 'Cash-Secured Put', 'Bull Call Spread', 'Bear Put Spread', 'Iron Condor', 'Straddle', 'Strangle', 'Butterfly', 'Calendar Spread', 'Other'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Type + Direction */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">Type</label>
                  <div className="flex gap-1">
                    {(['call', 'put'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setForm(f => ({ ...f, type: t }))}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                          form.type === t
                            ? t === 'call' ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' : 'bg-red-500/20 border border-red-500/50 text-red-400'
                            : 'bg-black border border-zinc-800 text-zinc-500'
                        }`}
                      >{t === 'call' ? 'Call' : 'Put'}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase block mb-1">Direction</label>
                  <div className="flex gap-1">
                    {(['long', 'short'] as const).map(d => (
                      <button
                        key={d}
                        onClick={() => setForm(f => ({ ...f, direction: d }))}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                          form.direction === d
                            ? 'bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14]'
                            : 'bg-black border border-zinc-800 text-zinc-500'
                        }`}
                      >{d === 'long' ? 'Buy' : 'Sell'}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-3">
                <FormInput label="Stock Price" value={form.stockPrice} onChange={(v) => setForm(f => ({ ...f, stockPrice: v }))} prefix="$" />
                <FormInput label="Strike" value={form.strike} onChange={(v) => setForm(f => ({ ...f, strike: v }))} prefix="$" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <FormInput label="Premium" value={form.entryPrice} onChange={(v) => setForm(f => ({ ...f, entryPrice: v }))} prefix="$" />
                <FormInput label="IV (%)" value={form.iv} onChange={(v) => setForm(f => ({ ...f, iv: v }))} />
                <FormInput label="DTE" value={form.dte} onChange={(v) => setForm(f => ({ ...f, dte: v }))} />
              </div>
              <FormInput label="Contracts" value={form.contracts} onChange={(v) => setForm(f => ({ ...f, contracts: Math.max(1, Math.round(v)) }))} />

              {/* Notes */}
              <div>
                <label className="text-[10px] text-zinc-500 uppercase block mb-1">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Trade rationale..."
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 resize-none h-16 focus:border-[#39ff14]/50 focus:outline-none"
                />
              </div>

              {/* Cost preview */}
              <div className="p-3 bg-black border border-zinc-800 rounded-lg">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Cost</span>
                  <span className="text-white font-mono font-bold">
                    ${(form.entryPrice * form.contracts * 100).toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-zinc-500">Available Cash</span>
                  <span className="text-[#39ff14] font-mono">${portfolio.cash.toFixed(0)}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={openTrade}
                disabled={form.direction === 'long' && form.entryPrice * form.contracts * 100 > portfolio.cash}
                className="w-full py-3.5 bg-[#39ff14] text-black font-bold rounded-xl active:scale-[0.98] disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {form.direction === 'long' ? 'Buy to Open' : 'Sell to Open'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────

function TradeCard({ trade, onClose, onSimulate }: {
  trade: Trade;
  onClose: (id: string, price: number) => void;
  onSimulate: (id: string, move: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const pl = trade.direction === 'long'
    ? (trade.currentPrice - trade.entryPrice) * trade.contracts * 100
    : (trade.entryPrice - trade.currentPrice) * trade.contracts * 100;
  const plPct = trade.entryPrice > 0 ? (pl / (trade.entryPrice * trade.contracts * 100)) * 100 : 0;

  return (
    <div className={`bg-[#0a0a0a] border rounded-2xl overflow-hidden ${pl >= 0 ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left active:bg-zinc-900/50"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{trade.symbol}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                trade.direction === 'long' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>{trade.direction === 'long' ? 'LONG' : 'SHORT'} {trade.type.toUpperCase()}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">{trade.strategy} · ${trade.strike} strike · {trade.dte} DTE</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-bold font-mono ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {pl >= 0 ? '+' : ''}${pl.toFixed(0)}
            </p>
            <p className={`text-[10px] ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {plPct >= 0 ? '+' : ''}{plPct.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex gap-4 mt-2 text-[10px] text-zinc-500">
          <span>Entry: ${trade.entryPrice.toFixed(2)}</span>
          <span>Current: ${trade.currentPrice.toFixed(2)}</span>
          <span>{trade.contracts} contract{trade.contracts > 1 ? 's' : ''}</span>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-zinc-800 pt-3">
          {/* Simulate stock moves */}
          <div>
            <p className="text-[10px] text-zinc-500 uppercase mb-2">Simulate Stock Move</p>
            <div className="flex gap-1.5 flex-wrap">
              {[-5, -3, -1, 1, 3, 5].map(pct => (
                <button
                  key={pct}
                  onClick={() => onSimulate(trade.id, pct)}
                  className={`px-3 py-2 rounded-lg text-[11px] font-bold active:scale-95 ${
                    pct > 0
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                >
                  {pct > 0 ? '+' : ''}{pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Close trade */}
          <button
            onClick={() => onClose(trade.id, trade.currentPrice)}
            className="w-full py-2.5 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold active:scale-[0.98]"
          >
            Close at ${trade.currentPrice.toFixed(2)} ({pl >= 0 ? '+' : ''}${pl.toFixed(0)})
          </button>

          {trade.notes && (
            <p className="text-[10px] text-zinc-500 italic">"{trade.notes}"</p>
          )}
        </div>
      )}
    </div>
  );
}

function FormInput({ label, value, onChange, prefix }: {
  label: string; value: number; onChange: (v: number) => void; prefix?: string;
}) {
  return (
    <div>
      <label className="text-[10px] text-zinc-500 uppercase block mb-1">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 text-sm text-white font-mono focus:border-[#39ff14]/50 focus:outline-none"
          style={{ paddingLeft: prefix ? '1.5rem' : '0.75rem' }}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-3 text-center">
      <p className="text-[9px] text-zinc-500 uppercase">{label}</p>
      <p className="text-lg font-bold font-mono" style={{ color: color || '#e4e4e7' }}>{value}</p>
    </div>
  );
}

function EquityCurve({ trades, startingCash }: { trades: Trade[]; startingCash: number }) {
  // Build equity curve from closed trades
  const sorted = [...trades].sort((a, b) => (a.closeDate || '').localeCompare(b.closeDate || ''));
  let equity = startingCash;
  const points = [{ x: 0, y: equity }];

  sorted.forEach((t, i) => {
    const entry = t.entryPrice * t.contracts * 100;
    const exit = (t.closePrice || 0) * t.contracts * 100;
    const pl = t.direction === 'long' ? exit - entry : entry - exit;
    equity += pl;
    points.push({ x: i + 1, y: equity });
  });

  if (points.length < 2) return null;

  const W = 300, H = 100, PAD = 20;
  const minY = Math.min(...points.map(p => p.y)) * 0.98;
  const maxY = Math.max(...points.map(p => p.y)) * 1.02;
  const maxX = points[points.length - 1].x;

  const toSX = (x: number) => PAD + (x / (maxX || 1)) * (W - PAD * 2);
  const toSY = (y: number) => H - PAD - ((y - minY) / ((maxY - minY) || 1)) * (H - PAD * 2);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toSX(p.x).toFixed(1)},${toSY(p.y).toFixed(1)}`).join(' ');
  const startingLine = toSY(startingCash);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 120 }}>
      {/* Starting cash line */}
      <line x1={PAD} y1={startingLine} x2={W - PAD} y2={startingLine} stroke="#39ff14" strokeWidth={0.5} strokeDasharray="4 4" opacity={0.3} />
      <path d={pathD} fill="none" stroke={equity >= startingCash ? '#22c55e' : '#ef4444'} strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={toSX(p.x)} cy={toSY(p.y)} r={2.5} fill={p.y >= startingCash ? '#22c55e' : '#ef4444'} />
      ))}
    </svg>
  );
}

function StrategyBreakdown({ trades }: { trades: Trade[] }) {
  const byStrategy: Record<string, number> = {};
  trades.forEach(t => {
    const entry = t.entryPrice * t.contracts * 100;
    const exit = (t.closePrice || 0) * t.contracts * 100;
    const pl = t.direction === 'long' ? exit - entry : entry - exit;
    byStrategy[t.strategy] = (byStrategy[t.strategy] || 0) + pl;
  });

  const entries = Object.entries(byStrategy).sort((a, b) => b[1] - a[1]);
  const maxAbs = Math.max(...entries.map(([, v]) => Math.abs(v)), 1);

  return (
    <div className="space-y-2">
      {entries.map(([strategy, pl]) => (
        <div key={strategy}>
          <div className="flex justify-between text-xs mb-0.5">
            <span className="text-zinc-400">{strategy}</span>
            <span className={`font-mono font-bold ${pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {pl >= 0 ? '+' : ''}${pl.toFixed(0)}
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${pl >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
              style={{ width: `${(Math.abs(pl) / maxAbs) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
