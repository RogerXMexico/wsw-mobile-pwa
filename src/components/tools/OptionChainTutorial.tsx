import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  Table2,
  Sparkles,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   Mock Data — AAPL @ $185, 30 DTE
   ═══════════════════════════════════════════════════════ */

interface ChainRow {
  strike: number;
  callBid: number;
  callAsk: number;
  callVol: number;
  callOI: number;
  callDelta: number;
  callIV: number;
  putBid: number;
  putAsk: number;
  putVol: number;
  putOI: number;
  putDelta: number;
  putIV: number;
}

const UNDERLYING = 185;

const MOCK_CHAIN: ChainRow[] = [
  { strike: 175, callBid: 11.20, callAsk: 11.40, callVol: 2450,  callOI: 15234, callDelta: 0.82, callIV: 24.5, putBid: 0.45, putAsk: 0.50,  putVol: 890,   putOI: 8234,  putDelta: -0.18, putIV: 26.2 },
  { strike: 180, callBid: 6.80,  callAsk: 6.95,  callVol: 5670,  callOI: 28456, callDelta: 0.68, callIV: 23.8, putBid: 1.15, putAsk: 1.25,  putVol: 3420,  putOI: 19876, putDelta: -0.32, putIV: 25.1 },
  { strike: 185, callBid: 3.40,  callAsk: 3.50,  callVol: 12340, callOI: 45678, callDelta: 0.50, callIV: 23.2, putBid: 2.85, putAsk: 2.95,  putVol: 11200, putOI: 42345, putDelta: -0.50, putIV: 23.4 },
  { strike: 190, callBid: 1.35,  callAsk: 1.45,  callVol: 8900,  callOI: 34567, callDelta: 0.32, callIV: 24.1, putBid: 5.80, putAsk: 5.95,  putVol: 4560,  putOI: 21345, putDelta: -0.68, putIV: 24.8 },
  { strike: 195, callBid: 0.42,  callAsk: 0.48,  callVol: 3200,  callOI: 18234, callDelta: 0.15, callIV: 25.3, putBid: 9.90, putAsk: 10.15, putVol: 1230,  putOI: 9876,  putDelta: -0.85, putIV: 26.1 },
];

/* ═══════════════════════════════════════════════════════
   Column Highlight Types & Explainers
   ═══════════════════════════════════════════════════════ */

type ColumnKey = 'bidask' | 'volume' | 'oi' | 'delta' | 'iv' | 'strike';

interface ColumnInfo {
  label: string;
  emoji: string;
  explanation: string;
}

const COLUMN_INFO: Record<ColumnKey, ColumnInfo> = {
  bidask: {
    label: 'Bid/Ask',
    emoji: '💰',
    explanation:
      'The Bid is what you get when SELLING. The Ask is what you pay when BUYING. The difference (spread) is your immediate cost of entry. Tighter spread = more liquid = better. The $185 ATM strike has the tightest spread ($0.10).',
  },
  volume: {
    label: 'Volume',
    emoji: '📊',
    explanation:
      "Today's trading activity. Higher volume = easier to get filled at your price. ATM options typically have the most volume. The $185 call has 12,340 contracts traded today.",
  },
  oi: {
    label: 'OI',
    emoji: '📂',
    explanation:
      'Total number of existing open positions. High OI = established interest. When today\'s Volume > OI, new positions are being opened. This is a bullish/bearish signal.',
  },
  delta: {
    label: 'Delta',
    emoji: 'Δ',
    explanation:
      'How much the option price changes per $1 stock move. ATM options have ~0.50 delta. Deep ITM approaches 1.0. Far OTM approaches 0. Also roughly estimates probability of expiring ITM.',
  },
  iv: {
    label: 'IV',
    emoji: '🌊',
    explanation:
      "The market's expectation of future movement, baked into the option price. Higher IV = more expensive options. Put IV is typically slightly higher than call IV at the same strike (skew). Check if IV is high or low using IV Rank before trading.",
  },
  strike: {
    label: 'Strike',
    emoji: '🎯',
    explanation:
      'The price at which you can buy (call) or sell (put) the underlying. ATM = near current stock price ($185). ITM calls: strikes below $185. OTM calls: strikes above $185. Reversed for puts.',
  },
};

const COLUMN_KEYS: ColumnKey[] = ['bidask', 'volume', 'oi', 'delta', 'iv', 'strike'];

/* ═══════════════════════════════════════════════════════
   Quiz Data
   ═══════════════════════════════════════════════════════ */

interface QuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUIZ: QuizQuestion[] = [
  {
    question: 'You want to buy a call. Which strike has the best liquidity?',
    options: [
      '$175 — deep ITM, tightest delta',
      '$185 — spread: $0.10, highest volume',
      '$195 — cheapest premium',
      '$190 — middle of the road',
    ],
    correctIdx: 1,
    explanation:
      'The $185 ATM strike has the tightest bid-ask spread ($0.10) and the highest volume (12,340 contracts). This means you get the best fills with the least slippage.',
  },
  {
    question: 'Which metric tells you about NEW money entering a position?',
    options: [
      'Volume alone',
      'Open Interest alone',
      'Both Volume and OI together — compare them',
      'Implied Volatility',
    ],
    correctIdx: 2,
    explanation:
      "When today's Volume exceeds OI, new positions are being opened (new money). Volume shows today's activity, OI shows existing positions. You need both to see the full picture.",
  },
  {
    question: 'The $185 call has Delta 0.50. What does this mean?',
    options: [
      'The option costs $0.50',
      'The option gains ~$0.50 per $1 stock move AND has ~50% chance of expiring ITM',
      'The stock needs to move $0.50 to break even',
      'There\'s a $0.50 spread',
    ],
    correctIdx: 1,
    explanation:
      'Delta of 0.50 means two things: the option price changes ~$0.50 for every $1 move in the stock, and it has roughly a 50% probability of expiring in the money.',
  },
];

/* ═══════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════ */

const fmt = (n: number, d = 2) => n.toFixed(d);
const fmtK = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

function isCallITM(strike: number): boolean {
  return strike < UNDERLYING;
}
function isCallOTM(strike: number): boolean {
  return strike > UNDERLYING;
}
function isATM(strike: number): boolean {
  return strike === UNDERLYING;
}

/** Get row background class for call side */
function callRowBg(strike: number): string {
  if (isATM(strike)) return 'bg-[#39ff14]/10';
  if (isCallITM(strike)) return 'bg-emerald-500/5';
  return 'bg-zinc-900/30';
}

/** Get row background class for put side */
function putRowBg(strike: number): string {
  if (isATM(strike)) return 'bg-[#39ff14]/10';
  if (isCallOTM(strike)) return 'bg-emerald-500/5'; // OTM calls = ITM puts
  return 'bg-zinc-900/30';
}

/* ═══════════════════════════════════════════════════════
   Cell Tooltip Component
   ═══════════════════════════════════════════════════════ */

function CellTooltip({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center pb-24" onClick={onClose}>
      <div
        className="mx-4 max-w-sm rounded-xl border border-[#39ff14]/30 bg-[#0a0a0a] p-4 shadow-lg shadow-[#39ff14]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-[#39ff14] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-zinc-300 leading-relaxed">{text}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-3 text-[10px] text-zinc-500 underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Quiz Component
   ═══════════════════════════════════════════════════════ */

function QuizSection() {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [showQuiz, setShowQuiz] = useState(false);
  const score = answers.filter((a, i) => a === QUIZ[i].correctIdx).length;
  const allAnswered = answers.every((a) => a !== null);

  const select = (qi: number, ai: number) => {
    if (answers[qi] !== null) return;
    const next = [...answers];
    next[qi] = ai;
    setAnswers(next);
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setShowQuiz(!showQuiz)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#39ff14]/20 bg-[#0a0a0a] min-h-[44px] active:scale-[0.98] transition-transform"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#39ff14]">
          <Sparkles className="w-4 h-4" />
          Test Your Knowledge
        </span>
        {showQuiz ? (
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        )}
      </button>

      {showQuiz && (
        <div className="mt-3 space-y-5">
          {QUIZ.map((q, qi) => (
            <div key={qi} className="rounded-xl border border-zinc-800 bg-[#0a0a0a] p-4">
              <p className="text-xs font-bold text-zinc-400 mb-1">
                Question {qi + 1}/3
              </p>
              <p className="text-sm text-zinc-200 mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const revealed = answers[qi] !== null;
                  const isCorrect = oi === q.correctIdx;
                  const isSelected = answers[qi] === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={revealed}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs min-h-[44px] active:scale-[0.98] transition-all ${
                        revealed
                          ? isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : isSelected
                              ? 'bg-red-500/20 border-red-500/40 text-red-400'
                              : 'bg-zinc-900/30 border-zinc-800 text-zinc-600'
                          : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {answers[qi] !== null && (
                <div className="mt-3 flex items-start gap-2">
                  {answers[qi] === q.correctIdx ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-xs leading-relaxed ${
                      answers[qi] === q.correctIdx ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}

          {allAnswered && (
            <div className="rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 p-4 text-center">
              <p className="text-lg font-bold text-[#39ff14]">{score}/3 Correct</p>
              <p className="text-xs text-zinc-400 mt-1">
                {score === 3
                  ? "Perfect! You're ready to read real chains."
                  : score >= 2
                    ? 'Great job! Review the one you missed above.'
                    : 'Review the explanations above and try the column highlights again.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */

export default function OptionChainTutorial() {
  const navigate = useNavigate();
  const [activeCol, setActiveCol] = useState<ColumnKey | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  /* Toggle column highlight */
  const toggleCol = (key: ColumnKey) => {
    setActiveCol((prev) => (prev === key ? null : key));
  };

  /* Generate cell tooltip text */
  const cellTip = (row: ChainRow, field: string): string => {
    const moneyness = isATM(row.strike)
      ? 'ATM'
      : isCallITM(row.strike)
        ? 'ITM call / OTM put'
        : 'OTM call / ITM put';

    switch (field) {
      case 'callBid':
      case 'callAsk':
        return `Call ${field === 'callBid' ? 'Bid' : 'Ask'}: $${fmt(row[field])} | Spread: $${fmt(row.callAsk - row.callBid)} | ${moneyness}`;
      case 'putBid':
      case 'putAsk':
        return `Put ${field === 'putBid' ? 'Bid' : 'Ask'}: $${fmt(row[field])} | Spread: $${fmt(row.putAsk - row.putBid)} | ${moneyness}`;
      case 'callVol':
        return `Call Volume: ${row.callVol.toLocaleString()} contracts today | ${moneyness}`;
      case 'putVol':
        return `Put Volume: ${row.putVol.toLocaleString()} contracts today | ${moneyness}`;
      case 'callOI':
        return `Call OI: ${row.callOI.toLocaleString()} | Vol/OI: ${(row.callVol / row.callOI).toFixed(2)} | ${moneyness}`;
      case 'putOI':
        return `Put OI: ${row.putOI.toLocaleString()} | Vol/OI: ${(row.putVol / row.putOI).toFixed(2)} | ${moneyness}`;
      case 'callDelta':
        return `Call Δ: ${fmt(row.callDelta)} → ~${(row.callDelta * 100).toFixed(0)}% chance ITM | ${moneyness}`;
      case 'putDelta':
        return `Put Δ: ${fmt(row.putDelta)} → ~${(Math.abs(row.putDelta) * 100).toFixed(0)}% chance ITM | ${moneyness}`;
      case 'callIV':
        return `Call IV: ${fmt(row.callIV, 1)}% — option priced for ${fmt(row.callIV, 1)}% annualized move | ${moneyness}`;
      case 'putIV':
        return `Put IV: ${fmt(row.putIV, 1)}% — ${row.putIV > row.callIV ? 'higher than call IV (skew)' : 'similar to call IV'} | ${moneyness}`;
      case 'strike':
        return `Strike $${row.strike} | ${moneyness} | ${isATM(row.strike) ? 'At-the-money — highest liquidity' : isCallITM(row.strike) ? 'Below current price' : 'Above current price'}`;
      default:
        return '';
    }
  };

  /* Highlight class for a cell based on active column */
  const hlClass = (col: ColumnKey): string =>
    activeCol === col
      ? 'bg-[#39ff14]/15 text-[#39ff14]'
      : '';

  /* Tappable table cell */
  const Cell = ({
    value,
    col,
    field,
    row,
    align = 'right',
  }: {
    value: string;
    col: ColumnKey;
    field: string;
    row: ChainRow;
    align?: 'left' | 'right' | 'center';
  }) => (
    <td
      className={`px-2 py-2 font-mono text-[11px] whitespace-nowrap cursor-pointer transition-colors ${hlClass(col)} ${
        align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'
      }`}
      onClick={() => setTooltip(cellTip(row, field))}
    >
      {value}
    </td>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-[calc(env(safe-area-inset-top,0px)+8px)] pb-32">
      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-[0.98]"
          >
            <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
          </button>
          <div>
            <h1 className="text-base font-bold">Reading an Options Chain</h1>
            <p className="text-[10px] text-zinc-500">Interactive tutorial</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* ── Key Concepts Panel ── */}
        <div className="rounded-xl border border-[#39ff14]/20 bg-[#0a0a0a] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Table2 className="w-4 h-4 text-[#39ff14]" />
            <span className="text-xs font-bold text-[#39ff14]">AAPL at $185.00</span>
            <span className="text-[10px] text-zinc-500">|</span>
            <span className="text-[10px] text-zinc-400">30 DTE</span>
            <span className="text-[10px] text-zinc-500">|</span>
            <span className="text-[10px] text-zinc-400">Calls ↔ Puts</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/30 border border-emerald-500/50" />
              <span className="text-zinc-400">ITM</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#39ff14]/20 border border-[#39ff14]/60" />
              <span className="text-zinc-400">ATM</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-zinc-800 border border-zinc-700" />
              <span className="text-zinc-400">OTM</span>
            </span>
            <span className="text-zinc-600 ml-auto">Tap any cell for details</span>
          </div>
        </div>

        {/* ── Column Highlight Buttons ── */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {COLUMN_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => toggleCol(key)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg border text-xs font-medium min-h-[44px] active:scale-[0.98] transition-all ${
                activeCol === key
                  ? 'bg-[#39ff14]/15 border-[#39ff14]/50 text-[#39ff14]'
                  : 'bg-[#0a0a0a] border-zinc-800 text-zinc-400'
              }`}
            >
              <span className="mr-1">{COLUMN_INFO[key].emoji}</span>
              {COLUMN_INFO[key].label}
            </button>
          ))}
        </div>

        {/* ── Explainer Card ── */}
        {activeCol && (
          <div className="rounded-xl border border-[#39ff14]/20 bg-[#39ff14]/5 p-4 animate-in fade-in duration-200">
            <div className="flex items-start gap-2">
              <span className="text-base">{COLUMN_INFO[activeCol].emoji}</span>
              <div>
                <p className="text-xs font-bold text-[#39ff14] mb-1">
                  {COLUMN_INFO[activeCol].label}
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {COLUMN_INFO[activeCol].explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Options Chain Table ── */}
        <div
          ref={tableRef}
          className="rounded-xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden"
        >
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full min-w-[700px] border-collapse">
              {/* Header */}
              <thead>
                <tr className="border-b border-zinc-800">
                  <th
                    colSpan={6}
                    className="px-2 py-2 text-[10px] font-bold text-emerald-400 text-center bg-emerald-500/5 border-r border-zinc-800"
                  >
                    CALLS
                  </th>
                  <th className="px-2 py-2 text-[10px] font-bold text-[#39ff14] text-center border-r border-zinc-800">
                    STRIKE
                  </th>
                  <th
                    colSpan={6}
                    className="px-2 py-2 text-[10px] font-bold text-rose-400 text-center bg-rose-500/5"
                  >
                    PUTS
                  </th>
                </tr>
                <tr className="border-b border-zinc-800 text-[9px] text-zinc-500 uppercase tracking-wide">
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'iv' ? 'text-[#39ff14]' : ''}`}>IV</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'delta' ? 'text-[#39ff14]' : ''}`}>Δ</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'oi' ? 'text-[#39ff14]' : ''}`}>OI</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'volume' ? 'text-[#39ff14]' : ''}`}>Vol</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'bidask' ? 'text-[#39ff14]' : ''}`}>Bid</th>
                  <th className={`px-2 py-1.5 text-right font-medium border-r border-zinc-800 ${activeCol === 'bidask' ? 'text-[#39ff14]' : ''}`}>Ask</th>
                  <th className={`px-2 py-1.5 text-center font-medium border-r border-zinc-800 ${activeCol === 'strike' ? 'text-[#39ff14]' : ''}`}>Price</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'bidask' ? 'text-[#39ff14]' : ''}`}>Bid</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'bidask' ? 'text-[#39ff14]' : ''}`}>Ask</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'volume' ? 'text-[#39ff14]' : ''}`}>Vol</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'oi' ? 'text-[#39ff14]' : ''}`}>OI</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'delta' ? 'text-[#39ff14]' : ''}`}>Δ</th>
                  <th className={`px-2 py-1.5 text-right font-medium ${activeCol === 'iv' ? 'text-[#39ff14]' : ''}`}>IV</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {MOCK_CHAIN.map((row) => {
                  const atm = isATM(row.strike);
                  const callBg = callRowBg(row.strike);
                  const putBg_ = putRowBg(row.strike);

                  return (
                    <tr
                      key={row.strike}
                      className={`border-b border-zinc-800/50 last:border-b-0 ${
                        atm ? 'ring-1 ring-inset ring-[#39ff14]/40' : ''
                      }`}
                    >
                      {/* ── Call side ── */}
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${callBg} ${hlClass('iv')}`}
                        onClick={() => setTooltip(cellTip(row, 'callIV'))}
                      >
                        {fmt(row.callIV, 1)}%
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${callBg} ${hlClass('delta')}`}
                        onClick={() => setTooltip(cellTip(row, 'callDelta'))}
                      >
                        {fmt(row.callDelta)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${callBg} ${hlClass('oi')}`}
                        onClick={() => setTooltip(cellTip(row, 'callOI'))}
                      >
                        {fmtK(row.callOI)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${callBg} ${hlClass('volume')}`}
                        onClick={() => setTooltip(cellTip(row, 'callVol'))}
                      >
                        {fmtK(row.callVol)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${callBg} ${hlClass('bidask')}`}
                        onClick={() => setTooltip(cellTip(row, 'callBid'))}
                      >
                        {fmt(row.callBid)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors border-r border-zinc-800 ${callBg} ${hlClass('bidask')}`}
                        onClick={() => setTooltip(cellTip(row, 'callAsk'))}
                      >
                        {fmt(row.callAsk)}
                      </td>

                      {/* ── Strike ── */}
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-center font-bold whitespace-nowrap cursor-pointer transition-colors border-r border-zinc-800 ${
                          atm
                            ? 'text-[#39ff14] bg-[#39ff14]/10'
                            : 'text-zinc-300 bg-zinc-900/50'
                        } ${hlClass('strike')}`}
                        onClick={() => setTooltip(cellTip(row, 'strike'))}
                      >
                        ${row.strike}
                      </td>

                      {/* ── Put side ── */}
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${putBg_} ${hlClass('bidask')}`}
                        onClick={() => setTooltip(cellTip(row, 'putBid'))}
                      >
                        {fmt(row.putBid)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${putBg_} ${hlClass('bidask')}`}
                        onClick={() => setTooltip(cellTip(row, 'putAsk'))}
                      >
                        {fmt(row.putAsk)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${putBg_} ${hlClass('volume')}`}
                        onClick={() => setTooltip(cellTip(row, 'putVol'))}
                      >
                        {fmtK(row.putVol)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${putBg_} ${hlClass('oi')}`}
                        onClick={() => setTooltip(cellTip(row, 'putOI'))}
                      >
                        {fmtK(row.putOI)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${putBg_} ${hlClass('delta')}`}
                        onClick={() => setTooltip(cellTip(row, 'putDelta'))}
                      >
                        {fmt(row.putDelta)}
                      </td>
                      <td
                        className={`px-2 py-2 font-mono text-[11px] text-right whitespace-nowrap cursor-pointer transition-colors ${putBg_} ${hlClass('iv')}`}
                        onClick={() => setTooltip(cellTip(row, 'putIV'))}
                      >
                        {fmt(row.putIV, 1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-1 py-2 text-[9px] text-zinc-600 border-t border-zinc-800/50">
            <ArrowLeft className="w-3 h-3" />
            <span>Scroll to see all columns</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* ── Quick Tips ── */}
        <div className="rounded-xl border border-zinc-800 bg-[#0a0a0a] p-4">
          <p className="text-xs font-bold text-zinc-300 mb-2">💡 Reading Tips</p>
          <ul className="space-y-1.5 text-[11px] text-zinc-400 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-[#39ff14] mt-0.5">•</span>
              <span>
                <strong className="text-zinc-300">Calls on the left, Puts on the right</strong> — the strike price column sits in the center
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#39ff14] mt-0.5">•</span>
              <span>
                <strong className="text-zinc-300">Green rows = in-the-money</strong> — these have intrinsic value
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#39ff14] mt-0.5">•</span>
              <span>
                <strong className="text-zinc-300">ATM ($185) = highest liquidity</strong> — tightest spreads, most volume
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-[#39ff14] mt-0.5">•</span>
              <span>
                <strong className="text-zinc-300">Tap column buttons above</strong> to highlight and learn what each metric means
              </span>
            </li>
          </ul>
        </div>

        {/* ── Quiz Section ── */}
        <QuizSection />

        {/* ── Try It Real CTA ── */}
        <button
          onClick={() => navigate('/tools/screener')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] text-sm font-semibold min-h-[44px] active:scale-[0.98] transition-transform"
        >
          See a real options chain
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Cell Tooltip ── */}
      {tooltip && <CellTooltip text={tooltip} onClose={() => setTooltip(null)} />}
    </div>
  );
}
