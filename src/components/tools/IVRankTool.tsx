import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, Loader2, Settings, ChevronDown, ChevronUp,
  TrendingUp, TrendingDown, BarChart3, Activity, BookOpen, AlertCircle,
  X, Check,
} from 'lucide-react';
import {
  getApiKey, setApiKey, fetchQuote, fetchExpirations, fetchOptionsChain,
  findNearestStrike, findNearestExpiration,
  calculateIVRank, calculateIVPercentile,
  getSymbolIVHistory, recordIVReading, getIVHistoryDaysCount,
  type StockQuote, type OptionData,
} from '../../services/tradierApi';

// ─── Helpers ──────────────────────────────────────────

function ivColor(iv: number): string {
  if (iv < 20) return '#39ff14';   // low — green
  if (iv < 40) return '#facc15';   // mid — yellow
  if (iv < 60) return '#f97316';   // elevated — orange
  return '#ef4444';                 // high — red
}

function rankColor(rank: number): string {
  if (rank < 25) return '#39ff14';
  if (rank < 50) return '#facc15';
  if (rank < 75) return '#f97316';
  return '#ef4444';
}

function rankLabel(rank: number): string {
  if (rank < 0) return 'Insufficient data';
  if (rank < 25) return 'IV is historically low';
  if (rank < 50) return 'IV is moderate';
  if (rank < 75) return 'IV is historically high';
  return 'IV is extremely high';
}

function fmtPct(n: number, dec = 1): string {
  return n.toFixed(dec) + '%';
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

// ─── Component ────────────────────────────────────────

export default function IVRankTool() {
  const navigate = useNavigate();

  // Symbol lookup
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Live data
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [currentIV, setCurrentIV] = useState<number | null>(null);
  const [ivRank, setIvRank] = useState<number>(-1);
  const [ivPercentile, setIvPercentile] = useState<number>(-1);
  const [historyDays, setHistoryDays] = useState(0);
  const [ivHistory, setIvHistory] = useState<{ date: string; iv: number }[]>([]);

  // Manual mode
  const [manualIV, setManualIV] = useState('');
  const [manualHigh, setManualHigh] = useState('');
  const [manualLow, setManualLow] = useState('');

  // UI state
  const [showEducation, setShowEducation] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  const hasKey = !!getApiKey();

  // ─── Live Data Fetch ───────────────────────────────

  const analyze = useCallback(async () => {
    const sym = symbol.trim().toUpperCase();
    if (!sym) return;
    if (!getApiKey()) {
      setError('No API key configured. Use manual mode or tap ⚙️ to add one.');
      return;
    }

    setLoading(true);
    setError('');
    setQuote(null);
    setCurrentIV(null);
    setIvRank(-1);
    setIvPercentile(-1);

    try {
      // 1. Fetch quote
      const q = await fetchQuote(sym);
      setQuote(q);

      // 2. Get expirations + find nearest ~30 day
      const exps = await fetchExpirations(sym);
      if (exps.length === 0) throw new Error('No options expirations found.');

      const exp = findNearestExpiration(exps, 20) ?? exps[0];

      // 3. Get option chain → find ATM call IV
      const chain = await fetchOptionsChain(sym, exp);
      const atmCall = findNearestStrike(chain.calls, q.price);
      const atmPut = findNearestStrike(chain.puts, q.price);

      let iv = 0;
      if (atmCall && atmCall.iv > 0 && atmPut && atmPut.iv > 0) {
        iv = (atmCall.iv + atmPut.iv) / 2; // average call/put ATM IV
      } else if (atmCall && atmCall.iv > 0) {
        iv = atmCall.iv;
      } else if (atmPut && atmPut.iv > 0) {
        iv = atmPut.iv;
      }

      if (iv <= 0) throw new Error('Could not determine IV from options chain.');

      setCurrentIV(iv);

      // 4. Record IV reading for history
      recordIVReading(sym, iv);

      // 5. Calculate IV Rank / Percentile from stored history
      const history = getSymbolIVHistory(sym);
      setIvHistory(history);
      setHistoryDays(getIVHistoryDaysCount(sym));

      if (history.length >= 5) {
        const historicalIVs = history.map(h => h.iv);
        setIvRank(calculateIVRank(iv, historicalIVs));
        setIvPercentile(calculateIVPercentile(iv, historicalIVs));
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  // ─── Manual Calculations ───────────────────────────

  const manualResult = useMemo(() => {
    const iv = parseFloat(manualIV);
    const high = parseFloat(manualHigh);
    const low = parseFloat(manualLow);
    if (isNaN(iv) || isNaN(high) || isNaN(low)) return null;
    if (high <= low) return null;
    const rank = Math.max(0, Math.min(100, ((iv - low) / (high - low)) * 100));
    return { iv, rank };
  }, [manualIV, manualHigh, manualLow]);

  // ─── Save API key ─────────────────────────────────

  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setShowApiModal(false);
      setApiKeyInput('');
    }
  };

  // ─── Determine display values ─────────────────────

  const displayIV = currentIV ?? manualResult?.iv ?? null;
  const displayRank = currentIV ? ivRank : (manualResult?.rank ?? -1);

  // ─── Render ────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black pb-28">
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10 px-4 pb-3 flex items-center gap-3"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        <button
          onClick={() => navigate('/tools')}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-[#39ff14]/20 active:scale-[0.95] transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">📊 IV Rank Tool</h1>
          <p className="text-zinc-500 text-xs">Is volatility high or low?</p>
        </div>
        <button
          onClick={() => setShowApiModal(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-[#39ff14]/20 active:scale-[0.95] transition-transform"
        >
          <Settings className="w-5 h-5 text-[#39ff14]" />
        </button>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* ── Symbol Lookup ── */}
        <div className="flex gap-2">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
            placeholder="Ticker (e.g. SPY)"
            className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-mono text-sm placeholder-zinc-600 focus:border-[#39ff14]/50 focus:outline-none min-h-[44px]"
          />
          <button
            onClick={analyze}
            disabled={loading || !symbol.trim()}
            className="px-5 py-2.5 bg-[#39ff14] disabled:bg-zinc-800 text-black disabled:text-zinc-600 rounded-xl text-sm font-bold active:scale-[0.98] transition-transform flex items-center gap-1.5 min-h-[44px]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading ? 'Loading' : 'Analyze'}
          </button>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        {/* ── Quote Summary ── */}
        {quote && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[#39ff14] font-bold text-lg">{quote.symbol}</span>
              <span className="font-mono text-white text-2xl font-black">
                ${quote.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span
                className={`font-mono font-semibold ${
                  quote.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {quote.change >= 0 ? '+' : ''}
                {quote.change.toFixed(2)} ({quote.changePercent >= 0 ? '+' : ''}
                {fmtPct(quote.changePercent)})
              </span>
              <span className="text-zinc-500">
                Vol: <span className="text-zinc-400 font-mono">{fmtNum(quote.volume)}</span>
              </span>
            </div>
          </div>
        )}

        {/* ── Current IV Display ── */}
        {displayIV !== null && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-6 text-center">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
              Current Implied Volatility
            </p>
            <p
              className="text-5xl font-black font-mono"
              style={{ color: ivColor(displayIV), textShadow: `0 0 24px ${ivColor(displayIV)}44` }}
            >
              {fmtPct(displayIV)}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-zinc-400">
              <Activity className="w-3 h-3" />
              ATM {currentIV ? '30-day' : 'manual'} implied volatility
            </div>
          </div>
        )}

        {/* ── IV Rank Gauge ── */}
        {displayRank >= 0 && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-xs uppercase tracking-wider flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> IV Rank
              </span>
              {historyDays > 0 && (
                <span className="text-zinc-600 text-[10px]">{historyDays} day{historyDays !== 1 ? 's' : ''} of data</span>
              )}
            </div>

            {/* Semicircle Gauge */}
            <div className="flex justify-center mb-2">
              <svg viewBox="0 0 200 110" width="220" height="121">
                {/* Background arc */}
                <path
                  d="M 10 100 A 90 90 0 0 1 190 100"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                {/* Color zones */}
                {/* Green 0-25% */}
                <path
                  d="M 10 100 A 90 90 0 0 1 32.32 34.65"
                  fill="none"
                  stroke="#39ff14"
                  strokeWidth="16"
                  strokeLinecap="round"
                  opacity={0.3}
                />
                {/* Yellow 25-50% */}
                <path
                  d="M 32.32 34.65 A 90 90 0 0 1 100 10"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="16"
                  opacity={0.3}
                />
                {/* Orange 50-75% */}
                <path
                  d="M 100 10 A 90 90 0 0 1 167.68 34.65"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="16"
                  opacity={0.3}
                />
                {/* Red 75-100% */}
                <path
                  d="M 167.68 34.65 A 90 90 0 0 1 190 100"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="16"
                  strokeLinecap="round"
                  opacity={0.3}
                />
                {/* Needle */}
                {(() => {
                  const angle = Math.PI - (displayRank / 100) * Math.PI;
                  const nx = 100 + 70 * Math.cos(angle);
                  const ny = 100 - 70 * Math.sin(angle);
                  return (
                    <line
                      x1={100}
                      y1={100}
                      x2={nx}
                      y2={ny}
                      stroke={rankColor(displayRank)}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })()}
                {/* Center dot */}
                <circle cx={100} cy={100} r={5} fill={rankColor(displayRank)} />
                {/* Labels */}
                <text x={10} y={108} fontSize="8" fill="#666" textAnchor="middle">0</text>
                <text x={100} y={6} fontSize="8" fill="#666" textAnchor="middle">50</text>
                <text x={190} y={108} fontSize="8" fill="#666" textAnchor="middle">100</text>
              </svg>
            </div>

            <p className="text-center">
              <span
                className="text-3xl font-black font-mono"
                style={{ color: rankColor(displayRank) }}
              >
                {fmtPct(displayRank, 0)}
              </span>
            </p>
            <p
              className="text-center text-xs mt-1 font-medium"
              style={{ color: rankColor(displayRank) }}
            >
              {rankLabel(displayRank)}
            </p>
          </div>
        )}

        {/* ── IV Percentile ── */}
        {ivPercentile >= 0 && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-400 text-xs uppercase tracking-wider">IV Percentile</span>
              <span
                className="text-2xl font-black font-mono"
                style={{ color: rankColor(ivPercentile) }}
              >
                {fmtPct(ivPercentile, 0)}
              </span>
            </div>

            {/* Horizontal bar */}
            <div className="h-3 bg-zinc-900 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.max(2, ivPercentile)}%`,
                  background: `linear-gradient(90deg, #39ff14, ${rankColor(ivPercentile)})`,
                }}
              />
            </div>

            <div className="mt-3 space-y-1">
              <div className="flex items-start gap-2 text-[11px] text-zinc-500">
                <TrendingUp className="w-3 h-3 mt-0.5 shrink-0 text-zinc-600" />
                <span><b className="text-zinc-400">IV Rank</b> measures where current IV falls in the min–max range</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-zinc-500">
                <TrendingDown className="w-3 h-3 mt-0.5 shrink-0 text-zinc-600" />
                <span><b className="text-zinc-400">IV Percentile</b> measures what % of days had lower IV</span>
              </div>
            </div>
          </div>
        )}

        {/* ── IV History Chart ── */}
        {ivHistory.length >= 2 && currentIV !== null && (
          <IVHistoryChart history={ivHistory} currentIV={currentIV} />
        )}

        {/* ── Manual Mode ── */}
        {!hasKey && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-4 h-4 text-[#39ff14]" />
              <span className="text-white text-sm font-bold">Manual Mode</span>
            </div>
            <p className="text-zinc-500 text-xs">
              No API key detected. Enter IV values manually or tap ⚙️ to configure live data.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-zinc-500 text-[10px] uppercase tracking-wider">Current IV</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={manualIV}
                  onChange={(e) => setManualIV(e.target.value)}
                  placeholder="30"
                  className="w-full bg-black border border-zinc-800 rounded-lg px-2.5 py-2 text-white font-mono text-sm placeholder-zinc-700 focus:border-[#39ff14]/50 focus:outline-none min-h-[44px]"
                />
              </div>
              <div>
                <label className="text-zinc-500 text-[10px] uppercase tracking-wider">52w High</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={manualHigh}
                  onChange={(e) => setManualHigh(e.target.value)}
                  placeholder="60"
                  className="w-full bg-black border border-zinc-800 rounded-lg px-2.5 py-2 text-white font-mono text-sm placeholder-zinc-700 focus:border-[#39ff14]/50 focus:outline-none min-h-[44px]"
                />
              </div>
              <div>
                <label className="text-zinc-500 text-[10px] uppercase tracking-wider">52w Low</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={manualLow}
                  onChange={(e) => setManualLow(e.target.value)}
                  placeholder="15"
                  className="w-full bg-black border border-zinc-800 rounded-lg px-2.5 py-2 text-white font-mono text-sm placeholder-zinc-700 focus:border-[#39ff14]/50 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>
            {manualResult && (
              <div className="text-center pt-2">
                <span className="text-zinc-500 text-xs">IV Rank: </span>
                <span
                  className="text-xl font-black font-mono"
                  style={{ color: rankColor(manualResult.rank) }}
                >
                  {fmtPct(manualResult.rank, 0)}
                </span>
                <p className="text-xs mt-1" style={{ color: rankColor(manualResult.rank) }}>
                  {rankLabel(manualResult.rank)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Education Section ── */}
        <button
          onClick={() => setShowEducation(!showEducation)}
          className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-transform min-h-[44px]"
        >
          <span className="flex items-center gap-2 text-white text-sm font-semibold">
            <BookOpen className="w-4 h-4 text-[#39ff14]" />
            Learn: IV Rank & Percentile
          </span>
          {showEducation ? (
            <ChevronUp className="w-4 h-4 text-zinc-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          )}
        </button>

        {showEducation && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4 space-y-4 text-sm leading-relaxed">
            <div>
              <h3 className="text-[#39ff14] font-bold mb-1">What is IV Rank?</h3>
              <p className="text-zinc-400 text-xs">
                IV Rank compares the current implied volatility to its range over the past year.
                It answers: &ldquo;Where does today&rsquo;s IV sit between its 52-week high and low?&rdquo;
                A rank of 0% means IV is at its yearly low; 100% means it&rsquo;s at the high.
                The formula is: (Current IV − 52w Low) ÷ (52w High − 52w Low) × 100.
              </p>
            </div>
            <div>
              <h3 className="text-[#39ff14] font-bold mb-1">What is IV Percentile?</h3>
              <p className="text-zinc-400 text-xs">
                IV Percentile measures the percentage of trading days over the past year where
                implied volatility was lower than it is today. A percentile of 80% means IV was
                lower on 80% of days — today&rsquo;s IV is elevated relative to most of the year.
                Percentile is often considered more robust than Rank because it isn&rsquo;t skewed
                by a single extreme spike.
              </p>
            </div>
            <div>
              <h3 className="text-[#39ff14] font-bold mb-1">Trading Decisions</h3>
              <ul className="text-zinc-400 text-xs space-y-1.5 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">▸</span>
                  <span><b className="text-white">IV Rank {'>'} 50:</b> Consider <b className="text-yellow-300">selling premium</b> — iron condors, credit spreads, short strangles. High IV means inflated option prices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">▸</span>
                  <span><b className="text-white">IV Rank {'<'} 25:</b> Consider <b className="text-[#39ff14]">buying premium</b> — long calls/puts, debit spreads, calendars. Options are cheap relative to history.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold">▸</span>
                  <span><b className="text-white">IV Rank 25–50:</b> Neutral zone. Strategy selection depends more on directional bias than volatility edge.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-zinc-500 font-bold">▸</span>
                  <span>Always check <b className="text-white">both</b> IV Rank and IV Percentile. If they disagree significantly, dig deeper — a single spike may distort Rank.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ── API Key Modal ── */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/30 rounded-2xl p-5 w-full max-w-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold">Tradier API Key</h2>
              <button
                onClick={() => setShowApiModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 active:scale-[0.95] transition-transform"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
            <p className="text-zinc-500 text-xs">
              Get a free sandbox key at{' '}
              <span className="text-[#39ff14]">developer.tradier.com</span>. This enables live
              quotes and options data.
            </p>
            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Paste your access token"
              className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2.5 text-white font-mono text-sm placeholder-zinc-600 focus:border-[#39ff14]/50 focus:outline-none min-h-[44px]"
            />
            <button
              onClick={saveApiKey}
              disabled={!apiKeyInput.trim()}
              className="w-full py-3 bg-[#39ff14] disabled:bg-zinc-800 text-black disabled:text-zinc-600 rounded-xl font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Check className="w-4 h-4" /> Save Key
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── IV History Chart (sub-component) ─────────────────

function IVHistoryChart({
  history,
  currentIV,
}: {
  history: { date: string; iv: number }[];
  currentIV: number;
}) {
  const W = 320;
  const H = 140;
  const PAD_L = 38;
  const PAD_R = 8;
  const PAD_T = 12;
  const PAD_B = 24;

  const ivs = history.map((h) => h.iv);
  const minIV = Math.max(0, Math.min(...ivs, currentIV) - 2);
  const maxIV = Math.max(...ivs, currentIV) + 2;
  const rangeIV = maxIV - minIV || 1;

  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const x = (i: number) => PAD_L + (i / (history.length - 1)) * chartW;
  const y = (v: number) => PAD_T + chartH - ((v - minIV) / rangeIV) * chartH;

  const points = history.map((h, i) => `${x(i).toFixed(1)},${y(h.iv).toFixed(1)}`).join(' ');

  // Y-axis ticks
  const yTicks: number[] = [];
  const step = rangeIV > 30 ? 10 : rangeIV > 10 ? 5 : 2;
  for (let t = Math.ceil(minIV / step) * step; t <= maxIV; t += step) {
    yTicks.push(t);
  }

  // X-axis labels (first, mid, last)
  const xLabels: { idx: number; label: string }[] = [];
  if (history.length > 0) {
    const fmt = (d: string) => {
      const parts = d.split('-');
      return `${parts[1]}/${parts[2]}`;
    };
    xLabels.push({ idx: 0, label: fmt(history[0].date) });
    if (history.length > 2) {
      const mid = Math.floor(history.length / 2);
      xLabels.push({ idx: mid, label: fmt(history[mid].date) });
    }
    xLabels.push({ idx: history.length - 1, label: fmt(history[history.length - 1].date) });
  }

  const currentY = y(currentIV);

  return (
    <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
      <p className="text-zinc-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Activity className="w-3.5 h-3.5" /> IV History
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ maxHeight: 180 }}
      >
        {/* Grid lines */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(t)}
              y2={y(t)}
              stroke="#222"
              strokeWidth="0.5"
            />
            <text x={PAD_L - 4} y={y(t) + 3} fontSize="7" fill="#555" textAnchor="end">
              {t.toFixed(0)}%
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {xLabels.map(({ idx, label }) => (
          <text
            key={idx}
            x={x(idx)}
            y={H - 4}
            fontSize="7"
            fill="#555"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}

        {/* Current IV dashed line */}
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={currentY}
          y2={currentY}
          stroke={ivColor(currentIV)}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity={0.6}
        />
        <text
          x={W - PAD_R + 1}
          y={currentY + 3}
          fontSize="6"
          fill={ivColor(currentIV)}
          textAnchor="start"
        >
          Now
        </text>

        {/* IV line */}
        <polyline
          points={points}
          fill="none"
          stroke="#39ff14"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Area fill */}
        <polygon
          points={`${x(0).toFixed(1)},${(PAD_T + chartH).toFixed(1)} ${points} ${x(history.length - 1).toFixed(1)},${(PAD_T + chartH).toFixed(1)}`}
          fill="url(#ivGrad)"
          opacity={0.15}
        />

        <defs>
          <linearGradient id="ivGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#39ff14" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
