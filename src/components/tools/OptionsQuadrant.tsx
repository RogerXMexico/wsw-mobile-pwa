import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────

interface GreekProfile {
  delta: '+' | '-';
  gamma: '+' | '-';
  theta: '+' | '-';
  vega: '+' | '-';
}

interface QuadrantData {
  id: string;
  action: 'BUY' | 'SELL';
  type: 'Call' | 'Put';
  title: string;
  outlook: string;
  outlookShort: string;
  maxProfit: string;
  maxLoss: string;
  description: string;
  example: string;
  bestWhen: string;
  greeks: GreekProfile;
  strategyLink: string;
  strategyLabel: string;
  color: QuadrantColor;
  icon: typeof TrendingUp;
}

interface QuadrantColor {
  text: string;
  bg: string;
  border: string;
  borderActive: string;
  glow: string;
  badge: string;
  badgeText: string;
}

// ─── Quadrant Colors ─────────────────────────────────

const COLORS: Record<string, QuadrantColor> = {
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-400/5',
    border: 'border-emerald-400/30',
    borderActive: 'border-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]',
    badge: 'bg-emerald-400/15',
    badgeText: 'text-emerald-400',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-400/5',
    border: 'border-amber-400/30',
    borderActive: 'border-amber-400',
    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.15)]',
    badge: 'bg-amber-400/15',
    badgeText: 'text-amber-400',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-400/5',
    border: 'border-rose-400/30',
    borderActive: 'border-rose-400',
    glow: 'shadow-[0_0_20px_rgba(251,113,133,0.15)]',
    badge: 'bg-rose-400/15',
    badgeText: 'text-rose-400',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-400/5',
    border: 'border-cyan-400/30',
    borderActive: 'border-cyan-400',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]',
    badge: 'bg-cyan-400/15',
    badgeText: 'text-cyan-400',
  },
};

// ─── Quadrant Data ────────────────────────────────────

const QUADRANTS: QuadrantData[] = [
  {
    id: 'buy-call',
    action: 'BUY',
    type: 'Call',
    title: 'Buy a Call',
    outlook: 'Bullish',
    outlookShort: 'You think the stock will go UP',
    maxProfit: 'Unlimited',
    maxLoss: 'Premium Paid',
    description:
      'You pay a premium for the RIGHT to buy shares at the strike price. You profit when the stock goes UP significantly.',
    example:
      'Buy AAPL $185 Call for $3.50 → Break even at $188.50 → Profit above that',
    bestWhen:
      'Strong bullish conviction, want leveraged upside with defined risk',
    greeks: { delta: '+', gamma: '+', theta: '-', vega: '+' },
    strategyLink: '/strategy/long-call',
    strategyLabel: 'Long Call',
    color: COLORS.emerald,
    icon: TrendingUp,
  },
  {
    id: 'sell-call',
    action: 'SELL',
    type: 'Call',
    title: 'Sell a Call',
    outlook: 'Neutral / Bearish',
    outlookShort: 'You think the stock will stay flat or go DOWN',
    maxProfit: 'Premium Received',
    maxLoss: 'Unlimited*',
    description:
      'You receive premium and have the OBLIGATION to sell shares if assigned. *Risk is unlimited unless covered (covered call).',
    example:
      'Sell AAPL $190 Call for $1.40 → Keep premium if stock stays below $190',
    bestWhen:
      'High IV environment, collecting premium, covered call on existing shares',
    greeks: { delta: '-', gamma: '-', theta: '+', vega: '-' },
    strategyLink: '/strategy/covered-call',
    strategyLabel: 'Short Call / Covered Call',
    color: COLORS.amber,
    icon: DollarSign,
  },
  {
    id: 'buy-put',
    action: 'BUY',
    type: 'Put',
    title: 'Buy a Put',
    outlook: 'Bearish',
    outlookShort: 'You think the stock will go DOWN',
    maxProfit: 'Strike × 100 − Premium',
    maxLoss: 'Premium Paid',
    description:
      'You pay a premium for the RIGHT to sell shares at the strike price. You profit when the stock goes DOWN significantly.',
    example:
      'Buy AAPL $185 Put for $2.90 → Break even at $182.10 → Profit below that',
    bestWhen:
      'Bearish conviction, portfolio protection/hedge, want defined risk',
    greeks: { delta: '-', gamma: '+', theta: '-', vega: '+' },
    strategyLink: '/strategy/long-put',
    strategyLabel: 'Long Put',
    color: COLORS.rose,
    icon: TrendingDown,
  },
  {
    id: 'sell-put',
    action: 'SELL',
    type: 'Put',
    title: 'Sell a Put',
    outlook: 'Neutral / Bullish',
    outlookShort: 'You think the stock will stay flat or go UP',
    maxProfit: 'Premium Received',
    maxLoss: 'Strike × 100 − Premium',
    description:
      'You receive premium and have the OBLIGATION to buy shares if assigned. You want the stock to stay above the strike.',
    example:
      'Sell AAPL $180 Put for $1.20 → Keep premium if stock stays above $180',
    bestWhen:
      'Want to buy stock at lower price, collect premium while waiting, high IV',
    greeks: { delta: '+', gamma: '-', theta: '+', vega: '-' },
    strategyLink: '/strategy/cash-secured-put',
    strategyLabel: 'Cash-Secured Put',
    color: COLORS.cyan,
    icon: Shield,
  },
];

// ─── Quick Reference Table Data ───────────────────────

const TABLE_ROWS: { label: string; values: [string, string, string, string] }[] = [
  { label: 'Outlook', values: ['Bullish', 'Neutral/Bear', 'Bearish', 'Neutral/Bull'] },
  { label: 'Risk', values: ['Limited', 'Unlimited', 'Limited', 'High'] },
  { label: 'Reward', values: ['Unlimited', 'Limited', 'High', 'Limited'] },
  { label: 'Theta', values: ['Enemy', 'Friend', 'Enemy', 'Friend'] },
  { label: 'Vega', values: ['Friend', 'Enemy', 'Friend', 'Enemy'] },
];

const TABLE_COLORS = [
  'text-emerald-400',
  'text-amber-400',
  'text-rose-400',
  'text-cyan-400',
];

// ─── Greek Badge Component ────────────────────────────

function GreekBadge({ label, sign, color }: { label: string; sign: '+' | '-'; color: QuadrantColor }) {
  const isPositive = sign === '+';
  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 border ${
        isPositive
          ? 'bg-emerald-400/10 border-emerald-400/20'
          : 'bg-rose-400/10 border-rose-400/20'
      }`}
    >
      <span
        className={`font-mono text-xs font-bold ${
          isPositive ? 'text-emerald-400' : 'text-rose-400'
        }`}
      >
        {sign}
      </span>
      <span className="text-zinc-300 text-xs">{label}</span>
    </div>
  );
}

// ─── Detail Panel Component ───────────────────────────

function DetailPanel({ q, onClose }: { q: QuadrantData; onClose: () => void }) {
  const navigate = useNavigate();
  const c = q.color;

  return (
    <div className={`rounded-2xl border ${c.borderActive} ${c.bg} ${c.glow} p-4 space-y-4 animate-in fade-in duration-200`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <q.icon className={`w-5 h-5 ${c.text}`} />
          <h3 className={`text-lg font-bold ${c.text}`}>{q.title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-zinc-800/60 active:scale-[0.95] transition-transform min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      {/* Outlook */}
      <div className={`rounded-xl ${c.badge} px-3 py-2`}>
        <span className={`text-xs font-semibold ${c.badgeText}`}>{q.outlook}</span>
        <span className="text-zinc-400 text-xs ml-2">— {q.outlookShort}</span>
      </div>

      {/* Max Profit / Loss */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3">
          <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Max Profit</div>
          <div className="text-emerald-400 font-mono text-sm font-bold">{q.maxProfit}</div>
        </div>
        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3">
          <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Max Loss</div>
          <div className="text-rose-400 font-mono text-sm font-bold">{q.maxLoss}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-300 text-sm leading-relaxed">{q.description}</p>

      {/* Example */}
      <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-3">
        <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1.5">Example</div>
        <p className="text-zinc-200 text-xs font-mono leading-relaxed">{q.example}</p>
      </div>

      {/* Best When */}
      <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-3">
        <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1.5">Best When</div>
        <p className="text-zinc-300 text-xs leading-relaxed">{q.bestWhen}</p>
      </div>

      {/* Greeks Profile */}
      <div>
        <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-2">Greeks Profile</div>
        <div className="grid grid-cols-4 gap-2">
          <GreekBadge label="Delta" sign={q.greeks.delta} color={c} />
          <GreekBadge label="Gamma" sign={q.greeks.gamma} color={c} />
          <GreekBadge label="Theta" sign={q.greeks.theta} color={c} />
          <GreekBadge label="Vega" sign={q.greeks.vega} color={c} />
        </div>
      </div>

      {/* Strategy Link */}
      <button
        onClick={() => navigate(q.strategyLink)}
        className={`w-full rounded-xl border ${c.border} ${c.bg} px-4 py-3 flex items-center justify-between active:scale-[0.98] transition-transform min-h-[44px]`}
      >
        <span className={`text-sm font-semibold ${c.text}`}>
          Study {q.strategyLabel} →
        </span>
        <Zap className={`w-4 h-4 ${c.text}`} />
      </button>
    </div>
  );
}

// ─── Quadrant Card Component ──────────────────────────

function QuadrantCard({
  q,
  isActive,
  onTap,
}: {
  q: QuadrantData;
  isActive: boolean;
  onTap: () => void;
}) {
  const c = q.color;

  return (
    <button
      onClick={onTap}
      className={`relative rounded-2xl border p-3 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] min-h-[120px] ${
        isActive
          ? `${c.borderActive} ${c.bg} ${c.glow}`
          : `${c.border} bg-[#0a0a0a]`
      }`}
    >
      {/* Action badge */}
      <div
        className={`absolute top-2 left-2 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${c.badge} ${c.badgeText}`}
      >
        {q.action}
      </div>

      {/* Expand indicator */}
      <div className="absolute top-2 right-2">
        {isActive ? (
          <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
        )}
      </div>

      {/* Icon */}
      <q.icon className={`w-7 h-7 ${c.text} mt-2`} />

      {/* Title */}
      <div className={`text-sm font-bold ${c.text}`}>{q.title}</div>

      {/* Outlook */}
      <div className="text-zinc-500 text-[11px] text-center leading-tight px-1">
        {q.outlookShort}
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────

export default function OptionsQuadrant() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeQuadrant = QUADRANTS.find((q) => q.id === activeId) ?? null;

  const handleTap = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  // Grid layout: [buyCall, sellCall] top row, [buyPut, sellPut] bottom row
  const topRow = [QUADRANTS[0], QUADRANTS[1]]; // Buy Call, Sell Call
  const bottomRow = [QUADRANTS[2], QUADRANTS[3]]; // Buy Put, Sell Put

  return (
    <div className="min-h-screen bg-black pb-28">
      {/* ── Sticky Header ── */}
      <div
        className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-zinc-800/50 px-4 pb-3"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/tools')}
            className="p-2 -ml-2 active:scale-[0.95] transition-transform min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Options Quadrant</h1>
            <p className="text-xs text-zinc-500">The 4 fundamental positions</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* ── Axis Labels + Grid ── */}
        <div>
          {/* X-axis labels */}
          <div className="flex mb-2">
            {/* Spacer for Y-axis label */}
            <div className="w-[72px] shrink-0" />
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="text-center text-zinc-400 text-[11px] font-semibold uppercase tracking-wider">
                Calls
              </div>
              <div className="text-center text-zinc-400 text-[11px] font-semibold uppercase tracking-wider">
                Puts
              </div>
            </div>
          </div>

          {/* Top Row: BUY */}
          <div className="flex items-stretch gap-0 mb-3">
            {/* Y-axis label */}
            <div className="w-[72px] shrink-0 flex items-center justify-center">
              <div className="-rotate-90 whitespace-nowrap">
                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Buy
                </span>
                <span className="text-zinc-600 text-[9px] ml-1">(Pay)</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              {topRow.map((q) => (
                <QuadrantCard
                  key={q.id}
                  q={q}
                  isActive={activeId === q.id}
                  onTap={() => handleTap(q.id)}
                />
              ))}
            </div>
          </div>

          {/* Bottom Row: SELL */}
          <div className="flex items-stretch gap-0">
            {/* Y-axis label */}
            <div className="w-[72px] shrink-0 flex items-center justify-center">
              <div className="-rotate-90 whitespace-nowrap">
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Sell
                </span>
                <span className="text-zinc-600 text-[9px] ml-1">(Collect)</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              {bottomRow.map((q) => (
                <QuadrantCard
                  key={q.id}
                  q={q}
                  isActive={activeId === q.id}
                  onTap={() => handleTap(q.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Expanded Detail Panel ── */}
        {activeQuadrant && (
          <DetailPanel
            q={activeQuadrant}
            onClose={() => setActiveId(null)}
          />
        )}

        {/* ── Quick Reference Table ── */}
        <div className="rounded-2xl bg-[#0a0a0a] border border-zinc-800/50 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800/50">
            <h2 className="text-sm font-bold text-white">Quick Reference</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-zinc-800/50">
                  <th className="text-left text-zinc-500 font-medium px-3 py-2 w-[72px]" />
                  <th className={`text-center font-semibold px-2 py-2 ${TABLE_COLORS[0]}`}>
                    Buy Call
                  </th>
                  <th className={`text-center font-semibold px-2 py-2 ${TABLE_COLORS[1]}`}>
                    Sell Call
                  </th>
                  <th className={`text-center font-semibold px-2 py-2 ${TABLE_COLORS[2]}`}>
                    Buy Put
                  </th>
                  <th className={`text-center font-semibold px-2 py-2 ${TABLE_COLORS[3]}`}>
                    Sell Put
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i < TABLE_ROWS.length - 1 ? 'border-b border-zinc-800/30' : ''}
                  >
                    <td className="text-zinc-500 font-medium px-3 py-2">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td
                        key={j}
                        className={`text-center px-2 py-2 font-mono ${
                          val === 'Unlimited' || val === 'Friend'
                            ? 'text-emerald-400'
                            : val === 'Limited'
                              ? 'text-zinc-400'
                              : val === 'Enemy' || val === 'High'
                                ? 'text-rose-400'
                                : 'text-zinc-300'
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Key Insight Box ── */}
        <div className="rounded-2xl bg-[#0a0a0a] border border-[#39ff14]/20 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#39ff14]" />
            <h2 className="text-sm font-bold text-[#39ff14]">Key Insight</h2>
          </div>

          <div className="space-y-2.5">
            <div className="flex gap-2">
              <div className="w-1 rounded-full bg-emerald-400/40 shrink-0" />
              <p className="text-zinc-300 text-xs leading-relaxed">
                <span className="text-emerald-400 font-semibold">BUYERS</span> pay for potential
                — their risk is limited but time works against them.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-1 rounded-full bg-amber-400/40 shrink-0" />
              <p className="text-zinc-300 text-xs leading-relaxed">
                <span className="text-amber-400 font-semibold">SELLERS</span> collect premium
                — time works for them but their risk can be larger.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-1 rounded-full bg-[#39ff14]/40 shrink-0" />
              <p className="text-zinc-400 text-xs leading-relaxed italic">
                Understanding which quadrant you're in determines everything about managing the trade.
              </p>
            </div>
          </div>
        </div>

        {/* ── Strategy Quick Links ── */}
        <div className="rounded-2xl bg-[#0a0a0a] border border-zinc-800/50 p-4">
          <h2 className="text-sm font-bold text-white mb-3">Study Each Strategy</h2>
          <div className="grid grid-cols-2 gap-2">
            {QUADRANTS.map((q) => {
              const c = q.color;
              return (
                <button
                  key={q.id}
                  onClick={() => navigate(q.strategyLink)}
                  className={`rounded-xl border ${c.border} ${c.bg} px-3 py-2.5 flex items-center gap-2 active:scale-[0.98] transition-transform min-h-[44px]`}
                >
                  <q.icon className={`w-4 h-4 ${c.text} shrink-0`} />
                  <span className={`text-xs font-semibold ${c.text} truncate`}>
                    {q.strategyLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
