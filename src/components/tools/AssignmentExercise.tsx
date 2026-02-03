import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  DollarSign,
  Calendar,
  Users,
  Zap,
  Shield,
  BookOpen,
  RotateCcw,
} from 'lucide-react';

/* ── types ── */
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

/* ── quiz data ── */
const QUIZ: QuizQuestion[] = [
  {
    question: 'Who has the RIGHT to exercise an option?',
    options: ['The option seller', 'The option buyer', 'The broker', 'The market maker'],
    correct: 1,
    explanation:
      'The option buyer pays a premium for the RIGHT to exercise. The seller has the OBLIGATION to fulfill if the buyer exercises.',
  },
  {
    question: 'When can American-style options be exercised?',
    options: [
      'Only at expiration',
      'Only on Fridays',
      'Any time before expiration',
      'Only when ITM by 5%+',
    ],
    correct: 2,
    explanation:
      'American-style options (most stock options) can be exercised any trading day before expiration. European-style can only be exercised at expiration.',
  },
  {
    question: 'Which scenario makes early assignment MORE likely?',
    options: [
      'OTM option with 60 DTE',
      'ATM option mid-cycle',
      'Deep ITM call before ex-dividend date',
      'Slightly ITM put with 30 DTE',
    ],
    correct: 2,
    explanation:
      'Deep ITM calls before the ex-dividend date are prime targets for early exercise — the buyer exercises to capture the dividend, causing assignment.',
  },
  {
    question: 'If assigned on a short put at $50 strike, what happens?',
    options: [
      'You sell 100 shares at $50 each',
      'You must buy 100 shares at $50 each',
      'You receive $5,000 in cash',
      'Nothing — puts can\'t be assigned',
    ],
    correct: 1,
    explanation:
      'Short put assignment means you must buy 100 shares at the strike price ($50 × 100 = $5,000). You become a stock owner at your chosen price.',
  },
  {
    question: 'What % of options expire worthless (approximately)?',
    options: ['20-30%', '40-50%', '60-70%', '90%+'],
    correct: 2,
    explanation:
      'Roughly 60-70% of options expire worthless. This is why option sellers have a statistical edge — most contracts are never exercised.',
  },
];

/* ── interactive reveal component ── */
function MathReveal({
  title,
  steps,
  resultColor,
}: {
  title: string;
  steps: { label: string; value: string; color?: string }[];
  resultColor: string;
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const allRevealed = revealedCount >= steps.length;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 mt-3">
      <p className="text-zinc-400 text-xs font-bold uppercase mb-3">{title}</p>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center justify-between text-sm transition-all duration-300 ${
              i < revealedCount ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
            }`}
          >
            <span className="text-zinc-400 text-xs">{step.label}</span>
            <span className={`font-mono text-xs font-bold ${step.color ?? resultColor}`}>
              {step.value}
            </span>
          </div>
        ))}
      </div>
      {!allRevealed ? (
        <button
          onClick={() => setRevealedCount((c) => c + 1)}
          className="mt-3 w-full py-2.5 rounded-lg border border-[#39ff14]/30 bg-[#39ff14]/10 text-[#39ff14] text-xs font-bold min-h-[44px] active:scale-[0.98] transition-transform flex items-center justify-center gap-1"
        >
          <ArrowRight size={14} /> Reveal Next Step
        </button>
      ) : (
        <div className="mt-3 py-2 rounded-lg bg-[#39ff14]/10 border border-[#39ff14]/20 text-center">
          <p className="text-[#39ff14] text-xs font-bold">✓ All steps revealed</p>
        </div>
      )}
    </div>
  );
}

/* ── section data ── */
interface Section {
  id: string;
  title: string;
  emoji: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: 'intro',
    title: 'What Are Exercise & Assignment?',
    emoji: '📖',
    icon: <BookOpen size={16} />,
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          Every options contract has two sides — a <span className="text-emerald-400 font-bold">buyer</span> and a{' '}
          <span className="text-amber-400 font-bold">seller</span>. Understanding exercise and assignment is about
          knowing what happens when someone acts on their contract.
        </p>

        {/* core definitions */}
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-emerald-400" />
              <p className="text-emerald-400 font-bold text-sm">Exercise</p>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              The buyer&apos;s <span className="text-emerald-400 font-bold">RIGHT</span> to act on the contract.
              The buyer paid a premium for this privilege and can choose whether or not to use it.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-400" />
              <p className="text-amber-400 font-bold text-sm">Assignment</p>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              The seller&apos;s <span className="text-amber-400 font-bold">OBLIGATION</span> when the buyer exercises.
              The seller collected premium upfront but must fulfill the contract if called upon.
            </p>
          </div>
        </div>

        {/* key concept banner */}
        <div className="rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 p-4 text-center">
          <p className="text-[#39ff14] font-bold text-sm mb-1">🔑 Key Concept</p>
          <p className="text-white text-sm font-semibold">&quot;Buyers have rights, sellers have obligations&quot;</p>
        </div>

        {/* visual flow diagram */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-500 text-xs font-bold uppercase mb-3">How It Works</p>
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 text-center">
              <Users size={14} className="text-emerald-400 mx-auto mb-1" />
              <p className="text-emerald-400 text-xs font-bold">Buyer</p>
              <p className="text-zinc-500 text-[10px]">Has rights</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#39ff14] text-[10px] mb-0.5">exercises</p>
              <ArrowRight size={20} className="text-[#39ff14]" />
            </div>
            <div className="rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-center">
              <DollarSign size={14} className="text-zinc-400 mx-auto mb-1" />
              <p className="text-zinc-400 text-xs font-bold">Contract</p>
              <p className="text-zinc-500 text-[10px]">100 shares</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-amber-400 text-[10px] mb-0.5">assigned</p>
              <ArrowRight size={20} className="text-amber-400" />
            </div>
            <div className="rounded-lg bg-amber-500/20 border border-amber-500/30 px-3 py-2 text-center">
              <Users size={14} className="text-amber-400 mx-auto mb-1" />
              <p className="text-amber-400 text-xs font-bold">Seller</p>
              <p className="text-zinc-500 text-[10px]">Has obligations</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'exercise-explained',
    title: 'Exercise Explained',
    emoji: '💪',
    icon: <Zap size={16} />,
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          When you <span className="text-emerald-400 font-bold">exercise</span> an option, you&apos;re using your
          right to buy or sell shares at the strike price — regardless of where the stock is trading now.
        </p>

        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-emerald-400 font-bold text-xs mb-2">📈 Call Exercise</p>
            <p className="text-zinc-300 text-xs">
              Buy <span className="font-mono text-white">100 shares</span> at the strike price. You do this when
              the stock is trading <span className="text-emerald-400 font-semibold">above</span> your strike.
            </p>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-red-400 font-bold text-xs mb-2">📉 Put Exercise</p>
            <p className="text-zinc-300 text-xs">
              Sell <span className="font-mono text-white">100 shares</span> at the strike price. You do this when
              the stock is trading <span className="text-red-400 font-semibold">below</span> your strike.
            </p>
          </div>
        </div>

        {/* when it makes sense */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-zinc-300 text-xs">
              <span className="text-emerald-400 font-semibold">Deep ITM</span> — option has significant intrinsic
              value
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-zinc-300 text-xs">
              <span className="text-emerald-400 font-semibold">You want the shares</span> — actually want to own
              the stock long-term
            </p>
          </div>
          <div className="flex items-start gap-2">
            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-zinc-300 text-xs">
              <span className="text-red-400 font-semibold">Usually better to just sell</span> — selling the option
              back captures remaining time value too
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-400 font-bold text-xs mb-1">💡 Pro Tip</p>
          <p className="text-zinc-300 text-xs">
            Most traders <span className="text-amber-400 font-bold">never exercise</span> — they sell the option
            back for a profit instead. Exercising forfeits any remaining time value.
          </p>
        </div>

        <MathReveal
          title="📊 Example: Call Exercise"
          steps={[
            { label: 'You hold:', value: '$100 Call', color: 'text-emerald-400' },
            { label: 'Stock price now:', value: '$115.00', color: 'text-white' },
            { label: 'Exercise: Buy 100 × $100', value: '$10,000', color: 'text-amber-400' },
            { label: 'Sell 100 × $115', value: '$11,500', color: 'text-emerald-400' },
            { label: 'Gross profit:', value: '$1,500', color: 'text-[#39ff14]' },
            { label: 'Minus premium paid:', value: '- $300', color: 'text-red-400' },
            { label: 'Net profit:', value: '$1,200', color: 'text-[#39ff14]' },
          ]}
          resultColor="text-emerald-400"
        />
      </div>
    ),
  },
  {
    id: 'assignment-explained',
    title: 'Assignment Explained',
    emoji: '⚠️',
    icon: <AlertTriangle size={16} />,
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          <span className="text-amber-400 font-bold">Assignment</span> is the other side of the coin. When a buyer
          exercises, a seller somewhere gets assigned — and must fulfill the contract.
        </p>

        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-amber-400 font-bold text-xs mb-2">📞 Short Call Assignment</p>
            <p className="text-zinc-300 text-xs">
              You must <span className="text-amber-400 font-bold">SELL 100 shares</span> at the strike price. If you
              don&apos;t own them, you buy at market price and sell at strike — potentially a big loss.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-amber-400 font-bold text-xs mb-2">📱 Short Put Assignment</p>
            <p className="text-zinc-300 text-xs">
              You must <span className="text-amber-400 font-bold">BUY 100 shares</span> at the strike price. Even if
              the stock has tanked, you pay the strike price.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={14} className="text-red-400" />
            <p className="text-red-400 font-bold text-xs">Cash Requirement</p>
          </div>
          <p className="text-zinc-300 text-xs">
            Short put at <span className="font-mono text-white">$50</span> strike = need{' '}
            <span className="font-mono text-red-400">$5,000</span> to buy the shares.
            Make sure you have the capital before selling puts!
          </p>
        </div>

        <MathReveal
          title="📊 Example: Put Assignment (Loss)"
          steps={[
            { label: 'You sold:', value: '$50 Put', color: 'text-amber-400' },
            { label: 'Stock drops to:', value: '$40.00', color: 'text-red-400' },
            { label: 'Assignment: Buy 100 × $50', value: '$5,000', color: 'text-amber-400' },
            { label: 'Shares now worth:', value: '$4,000', color: 'text-red-400' },
            { label: 'Paper loss:', value: '-$1,000', color: 'text-red-400' },
            { label: 'Premium received:', value: '+$200', color: 'text-emerald-400' },
            { label: 'Net loss:', value: '-$800', color: 'text-red-400' },
          ]}
          resultColor="text-amber-400"
        />

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-400 text-xs">
            <span className="text-[#39ff14] font-bold">Remember:</span> Assignment is random among all short
            holders. Your broker selects who gets assigned via a lottery system.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'american-vs-european',
    title: 'American vs European Style',
    emoji: '🌍',
    icon: <HelpCircle size={16} />,
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          Not all options work the same way. The <span className="text-[#39ff14] font-semibold">style</span> of an
          option determines <em>when</em> it can be exercised.
        </p>

        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
            <p className="text-cyan-400 font-bold text-xs mb-2">🇺🇸 American Style</p>
            <p className="text-zinc-300 text-xs">
              Can be exercised{' '}
              <span className="text-cyan-400 font-bold">any time before expiration</span>. Most stock options
              (AAPL, TSLA, SPY, etc.) are American-style.
            </p>
          </div>
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4">
            <p className="text-purple-400 font-bold text-xs mb-2">🇪🇺 European Style</p>
            <p className="text-zinc-300 text-xs">
              Can <span className="text-purple-400 font-bold">only</span> be exercised at expiration. Index options
              like SPX, NDX, and RUT are European-style.
            </p>
          </div>
        </div>

        {/* comparison table */}
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          <div className="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800">
            <p className="text-zinc-500 text-xs font-bold uppercase">Comparison</p>
          </div>
          <div className="divide-y divide-zinc-800">
            {[
              { feature: 'Exercise timing', american: 'Any time', european: 'Expiration only' },
              { feature: 'Common examples', american: 'AAPL, TSLA, SPY', european: 'SPX, NDX, RUT' },
              { feature: 'Early assignment risk', american: 'Yes ⚠️', european: 'No ✓' },
              { feature: 'Settlement', american: 'Stock delivery', european: 'Cash settled' },
              { feature: 'Seller risk', american: 'Higher', european: 'Lower' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 text-xs">
                <div className="px-3 py-2.5 text-zinc-500 font-medium">{row.feature}</div>
                <div className="px-3 py-2.5 text-cyan-400">{row.american}</div>
                <div className="px-3 py-2.5 text-purple-400">{row.european}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-400 font-bold text-xs mb-1">⚠️ Why This Matters for Sellers</p>
          <p className="text-zinc-300 text-xs">
            If you sell American-style options, you can be assigned{' '}
            <span className="text-amber-400 font-bold">at any time</span>. European-style sellers only face
            assignment at expiration — making them more predictable.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'early-assignment',
    title: 'Early Assignment Risk',
    emoji: '🎯',
    icon: <Calendar size={16} />,
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          Early assignment is when the buyer exercises <span className="text-amber-400 font-bold">before</span>{' '}
          expiration. It&apos;s relatively rare, but knowing when it&apos;s likely helps you avoid surprises.
        </p>

        {/* when it's most likely */}
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-red-400 font-bold text-xs mb-3">🚨 High-Risk Scenarios</p>
          <div className="space-y-2">
            {[
              { text: 'Deep ITM + near expiration (very little time value left)', icon: <AlertTriangle size={12} className="text-red-400" /> },
              { text: 'Before ex-dividend date on deep ITM calls', icon: <Calendar size={12} className="text-red-400" /> },
              { text: 'ITM by 5%+ with < 7 DTE', icon: <DollarSign size={12} className="text-red-400" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5">{item.icon}</span>
                <p className="text-zinc-300 text-xs">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* the dividend trap */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-400 font-bold text-xs mb-2">🪤 The Dividend Trap</p>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Deep ITM calls before the <span className="text-amber-400 font-bold">ex-dividend date</span> are prime
            targets for early exercise. The buyer exercises to own the shares and capture the dividend.
          </p>
          <div className="mt-3 rounded-lg bg-black/40 p-3">
            <p className="text-zinc-500 text-[10px] font-bold uppercase mb-2">Timeline</p>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-zinc-500">Today</span>
              <span className="text-zinc-600">→</span>
              <span className="text-red-400 font-bold">Ex-Div ⚠️</span>
              <span className="text-zinc-600">→</span>
              <span className="text-zinc-500">Expiration</span>
            </div>
            <p className="text-amber-400 text-[10px] mt-1">
              Call holder exercises the night before ex-div to get the dividend
            </p>
          </div>
        </div>

        {/* protection strategies */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-emerald-400 font-bold text-xs mb-3">🛡️ How to Protect Yourself</p>
          <div className="space-y-2">
            {[
              'Close or roll positions before ex-dividend date',
              'Monitor deep ITM positions closely (<7 DTE)',
              'Check if your short calls are near an ex-div date',
              'Keep an eye on time value — low time value = high risk',
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2">
                <Shield size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-zinc-300 text-xs">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* risk gauge */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-500 text-xs font-bold uppercase mb-3">Assignment Risk Gauge</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-16 text-right">
                <span className="text-emerald-400 text-xs font-mono">1-2%</span>
              </div>
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-1/5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-emerald-400 text-[10px]">Low risk</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 text-right">
                <span className="text-amber-400 text-xs font-mono">3-4%</span>
              </div>
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-3/5 rounded-full bg-amber-400" />
              </div>
              <span className="text-amber-400 text-[10px]">Moderate</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 text-right">
                <span className="text-red-400 text-xs font-mono">5%+</span>
              </div>
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-full rounded-full bg-red-400" />
              </div>
              <span className="text-red-400 text-[10px]">High risk</span>
            </div>
          </div>
          <p className="text-zinc-500 text-[10px] mt-2 text-center">% ITM — deeper = more likely to be assigned</p>
        </div>
      </div>
    ),
  },
  {
    id: 'overcoming-fear',
    title: 'Overcoming Assignment Fear',
    emoji: '🧘',
    icon: <Shield size={16} />,
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/5 p-4 text-center">
          <p className="text-[#39ff14] font-bold text-sm">
            &quot;Assignment isn&apos;t the end of the world&quot;
          </p>
          <p className="text-zinc-400 text-xs mt-1">
            In most cases, assignment is a manageable outcome — not a disaster.
          </p>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed">
          Many new traders fear assignment like a monster in the closet. But if you&apos;ve traded responsibly,
          assignment is often just… buying or selling stock at a price you already agreed to.
        </p>

        {/* positive scenarios */}
        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-emerald-400 font-bold text-xs mb-2">✅ Cash-Secured Puts</p>
            <p className="text-zinc-300 text-xs">
              You sold a put at a price you&apos;d happily buy the stock. Assignment means{' '}
              <span className="text-emerald-400 font-semibold">you got the stock at your target price</span> AND kept
              the premium. Win-win.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-emerald-400 font-bold text-xs mb-2">✅ Covered Calls</p>
            <p className="text-zinc-300 text-xs">
              You sold a call against shares you own. Assignment means{' '}
              <span className="text-emerald-400 font-semibold">you sold shares at your target price</span> AND kept the
              premium. Also a win.
            </p>
          </div>
        </div>

        {/* the real danger */}
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-red-400" />
            <p className="text-red-400 font-bold text-xs">The REAL Danger</p>
          </div>
          <p className="text-zinc-300 text-xs leading-relaxed">
            <span className="text-red-400 font-bold">Naked/uncovered positions</span> without enough capital. Selling
            calls without owning shares or selling puts without the cash to buy shares — that&apos;s where
            assignment can become catastrophic.
          </p>
        </div>

        {/* mindset shift */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-500 text-xs font-bold uppercase mb-3">Mindset Shift</p>
          <div className="space-y-3">
            {[
              { wrong: '"I got assigned — I lost!"', right: '"I bought the stock at my chosen price + premium"' },
              { wrong: '"Assignment is scary"', right: '"Assignment is just the contract fulfilling its purpose"' },
              { wrong: '"I should avoid selling options"', right: '"I should sell options at prices I\'m comfortable with"' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-start gap-2">
                  <XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-400 text-xs line-through">{item.wrong}</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-emerald-400 text-xs font-medium">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

/* ── main component ── */
export default function AssignmentExercise() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [visitedSections, setVisitedSections] = useState<Set<number>>(new Set([0]));

  // quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const section = SECTIONS[currentIdx];
  const totalPages = SECTIONS.length + 1; // sections + quiz
  const currentPage = showQuiz ? totalPages : currentIdx + 1;
  const progress = (currentPage / totalPages) * 100;

  const goToSection = (idx: number) => {
    setCurrentIdx(idx);
    setVisitedSections((prev) => new Set(prev).add(idx));
  };

  const handleAnswer = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === QUIZ[quizIdx].correct) setScore((s) => s + 1);
  };

  const nextQ = () => {
    if (quizIdx < QUIZ.length - 1) {
      setQuizIdx((q) => q + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setQuizDone(false);
  };

  /* ── quiz results view ── */
  if (showQuiz && quizDone) {
    const pct = Math.round((score / QUIZ.length) * 100);
    return (
      <div
        className="min-h-screen bg-black px-4 pb-24"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        <button
          onClick={() => setShowQuiz(false)}
          className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]"
        >
          <ArrowLeft size={18} /> Back to Lesson
        </button>
        <div className="mt-8 text-center">
          <p
            className={`text-5xl font-black ${
              pct >= 80 ? 'text-[#39ff14]' : pct >= 60 ? 'text-amber-400' : 'text-red-400'
            }`}
          >
            {pct}%
          </p>
          <p className="text-zinc-400 text-sm mt-2">
            {score} of {QUIZ.length} correct
          </p>
          <p className="text-zinc-500 text-xs mt-4">
            {pct >= 80
              ? '🎉 Excellent! You understand assignment & exercise.'
              : pct >= 60
                ? '📖 Good effort! Review the sections you missed.'
                : '📖 Review the material and try again!'}
          </p>
          <div className="flex gap-3 mt-6 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/10 text-[#39ff14] font-bold text-sm min-h-[44px] active:scale-[0.98]"
            >
              <RotateCcw size={14} className="inline mr-1" /> Retake Quiz
            </button>
            <button
              onClick={() => {
                setShowQuiz(false);
                goToSection(0);
              }}
              className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-400 font-medium text-sm min-h-[44px] active:scale-[0.98]"
            >
              <BookOpen size={14} className="inline mr-1" /> Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── quiz question view ── */
  if (showQuiz) {
    const q = QUIZ[quizIdx];
    return (
      <div
        className="min-h-screen bg-black px-4 pb-24"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
      >
        {/* sticky header */}
        <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg pb-3 -mx-4 px-4" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}>
          <button
            onClick={() => setShowQuiz(false)}
            className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft size={18} /> Back to Lesson
          </button>

          {/* progress dots */}
          <div className="flex gap-1.5 mt-2 justify-center">
            {QUIZ.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i < quizIdx
                    ? 'w-6 bg-[#39ff14]'
                    : i === quizIdx
                      ? 'w-6 bg-[#39ff14]/60'
                      : 'w-3 bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-zinc-500 text-xs mb-2 text-center mt-2">
          Question {quizIdx + 1} of {QUIZ.length}
        </p>
        <p className="text-white font-bold text-sm mb-6">{q.question}</p>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={revealed}
              className={`w-full text-left p-4 rounded-xl border text-sm min-h-[44px] active:scale-[0.98] transition-all ${
                revealed
                  ? i === q.correct
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : selected === i
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-zinc-900/30 border-zinc-800 text-zinc-600'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
              }`}
            >
              <span className="font-mono mr-2 text-xs">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>

        {revealed && (
          <div
            className={`mt-4 p-4 rounded-xl border text-sm ${
              selected === q.correct
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <p
              className={`font-bold text-xs mb-1 ${
                selected === q.correct ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {selected === q.correct ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-zinc-300 text-xs">{q.explanation}</p>
          </div>
        )}

        {revealed && (
          <button
            onClick={nextQ}
            className="mt-4 w-full py-3 rounded-xl bg-[#39ff14] text-black font-bold text-sm min-h-[44px] active:scale-[0.98]"
          >
            {quizIdx < QUIZ.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    );
  }

  /* ── main lesson view ── */
  return (
    <div
      className="min-h-screen bg-black px-4 pb-24"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
    >
      {/* sticky header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg pb-3 -mx-4 px-4" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-xl font-black text-white mt-2 mb-1">📋 Assignment & Exercise</h1>
        <p className="text-zinc-500 text-xs mb-3">
          Understand what happens when options contracts are acted upon
        </p>

        {/* progress bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-zinc-500 text-[10px] font-mono">
              Section {currentIdx + 1}/{SECTIONS.length}
            </span>
            <span className="text-[#39ff14] text-[10px] font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#39ff14] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* section pills (scrollable) */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 mt-2 -mx-4 px-4 scrollbar-none">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSection(i)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium min-h-[36px] active:scale-[0.98] transition-all flex items-center gap-1.5 ${
              i === currentIdx
                ? 'bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/30'
                : visitedSections.has(i)
                  ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
            }`}
          >
            <span>{s.emoji}</span> {s.title}
          </button>
        ))}
        <button
          onClick={() => {
            resetQuiz();
            setShowQuiz(true);
          }}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium min-h-[36px] active:scale-[0.98] transition-all flex items-center gap-1.5 ${
            'bg-zinc-900 text-zinc-600 border border-zinc-800'
          }`}
        >
          🧠 Quiz
        </button>
      </div>

      {/* content card */}
      <div className="rounded-2xl border border-[#39ff14]/20 bg-[#0a0a0a] p-5 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-[#39ff14]">{section.icon}</span>
          <span>{section.emoji}</span> {section.title}
        </h2>
        {section.content}
      </div>

      {/* nav buttons */}
      <div className="flex gap-3">
        {currentIdx > 0 && (
          <button
            onClick={() => goToSection(currentIdx - 1)}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl border border-zinc-700 text-zinc-400 font-medium text-sm min-h-[44px] active:scale-[0.98]"
          >
            <ChevronLeft size={16} /> Previous
          </button>
        )}
        {currentIdx < SECTIONS.length - 1 ? (
          <button
            onClick={() => goToSection(currentIdx + 1)}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] font-bold text-sm min-h-[44px] active:scale-[0.98]"
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => {
              resetQuiz();
              setShowQuiz(true);
            }}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-[#39ff14] text-black font-bold text-sm min-h-[44px] active:scale-[0.98]"
          >
            Take the Quiz 🧠
          </button>
        )}
      </div>
    </div>
  );
}
