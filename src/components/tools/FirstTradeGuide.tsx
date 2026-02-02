import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';

/* ── types ── */
interface StepData {
  num: number;
  title: string;
  emoji: string;
  explanation: string;
  tips: string[];
  mistakes: string[];
  interactive?: React.ReactNode;
}

/* ── interactive quiz widgets ── */
function MiniQuiz({
  question,
  options,
  correctIdx,
  explanation,
}: {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const revealed = selected !== null;

  return (
    <div className="rounded-xl border border-[#39ff14]/20 bg-[#39ff14]/5 p-4 mt-4">
      <p className="text-zinc-300 text-xs font-bold mb-3">🧠 Quick Check</p>
      <p className="text-zinc-200 text-sm mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !revealed && setSelected(i)}
            disabled={revealed}
            className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs min-h-[44px] active:scale-[0.98] transition-all ${
              revealed
                ? i === correctIdx
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : selected === i
                    ? 'bg-red-500/20 border-red-500/40 text-red-400'
                    : 'bg-zinc-900/30 border-zinc-800 text-zinc-600'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {revealed && (
        <p className={`mt-3 text-xs ${selected === correctIdx ? 'text-emerald-400' : 'text-amber-400'}`}>
          {selected === correctIdx ? '✓ Correct! ' : '✗ Not quite. '}
          {explanation}
        </p>
      )}
    </div>
  );
}

/* ── step data (extracted from desktop FirstTradeTutorial.tsx) ── */
const STEPS: StepData[] = [
  {
    num: 1,
    title: 'Choose a Stock',
    emoji: '🔍',
    explanation:
      "Start with a stock you know and follow. Large-cap, high-liquidity names like AAPL, MSFT, AMZN, or SPY are ideal for beginners. These have tight bid-ask spreads on options, making it easier to get good fills.",
    tips: [
      'Stick to stocks with options volume > 1,000 contracts/day',
      'Check the bid-ask spread — tighter is better',
      'Avoid meme stocks and penny stocks for your first trade',
    ],
    mistakes: [
      'Trading obscure, illiquid names with wide spreads',
      'Picking a stock just because "it moves a lot"',
      'Not checking if earnings are coming up',
    ],
    interactive: (
      <MiniQuiz
        question="Which stock would be BEST for a beginner's first option trade?"
        options={['A penny stock at $0.50', 'AAPL at $185 with 50,000+ daily option volume', 'A biotech awaiting FDA decision', 'A stock you\'ve never heard of that\'s up 40%']}
        correctIdx={1}
        explanation="AAPL has deep liquidity, tight spreads, and predictable behavior — ideal for learning."
      />
    ),
  },
  {
    num: 2,
    title: 'Pick a Direction',
    emoji: '🧭',
    explanation:
      "Decide if you think the stock will go UP (bullish → buy call) or DOWN (bearish → buy put). For your first trade, stick with buying calls or puts — selling options comes later.",
    tips: [
      'Buy a Call = bullish bet (stock goes up, you profit)',
      'Buy a Put = bearish bet (stock goes down, you profit)',
      'Max loss when buying = premium paid (defined risk)',
    ],
    mistakes: [
      'Trying to sell options before understanding buying',
      'Trading without a clear directional thesis',
      'Buying both a call and put hoping one wins (usually both lose)',
    ],
    interactive: (
      <MiniQuiz
        question="If AAPL is at $150 and you're bullish, which would you buy?"
        options={['A put option', 'A call option', 'Both call and put', 'Short shares']}
        correctIdx={1}
        explanation="Bullish = buy a call. You profit when the stock goes up above your strike + premium."
      />
    ),
  },
  {
    num: 3,
    title: 'Select Expiration',
    emoji: '📅',
    explanation:
      "Choose how much TIME your trade has to work. More time = more expensive, but higher probability. Less time = cheaper, but theta decay accelerates. For beginners, 30-60 DTE (days to expiration) is the sweet spot.",
    tips: [
      '30-60 DTE gives time for your thesis without overpaying for time',
      'Avoid 0-7 DTE — gamma risk is extreme',
      'Check for earnings within your expiration window',
    ],
    mistakes: [
      'Buying weekly options because they\'re cheap (they expire fast!)',
      'Ignoring earnings dates within the expiration window',
      'Buying 6-month options and tying up too much capital',
    ],
    interactive: (
      <MiniQuiz
        question="Which expiration is best for a beginner's first trade?"
        options={['0 DTE (expires today)', '7 DTE (1 week)', '45 DTE (6 weeks)', '365 DTE (1 year LEAP)']}
        correctIdx={2}
        explanation="45 DTE gives enough time for your thesis without excessive theta decay or capital commitment."
      />
    ),
  },
  {
    num: 4,
    title: 'Choose a Strike',
    emoji: '🎯',
    explanation:
      "The strike price determines your risk/reward. ITM (in the money) = higher cost, higher probability. ATM (at the money) = balanced. OTM (out of the money) = cheaper but lower probability.",
    tips: [
      'ATM strikes are best for beginners — balanced risk/reward',
      'ITM has higher probability but costs more',
      'OTM is cheap but most expire worthless',
    ],
    mistakes: [
      'Buying deep OTM options because they\'re "cheap" (low probability)',
      'Ignoring the delta (probability indicator)',
      'Not understanding that cheaper ≠ better value',
    ],
    interactive: (
      <MiniQuiz
        question="Stock is at $100. Which $105 call has the highest probability of profit?"
        options={['$105 call at 0.30 delta (30%)', '$100 call at 0.50 delta (50%)', '$95 call at 0.70 delta (70%)', 'They all have the same probability']}
        correctIdx={2}
        explanation="The $95 ITM call has ~70% probability of expiring in the money. Higher delta = higher probability."
      />
    ),
  },
  {
    num: 5,
    title: 'Check the Greeks',
    emoji: '🔬',
    explanation:
      "Before entering, check the key risk metrics. Delta tells you directional exposure and probability. Theta shows daily time decay. IV tells you if options are expensive or cheap.",
    tips: [
      'Delta ≈ probability of expiring ITM (0.50 delta ≈ 50%)',
      'Theta = daily cost of holding (negative for buyers)',
      'High IV = expensive options, low IV = cheap options',
      'Compare IV to IV Rank — is current IV high or low vs history?',
    ],
    mistakes: [
      'Buying options with very high IV (paying too much)',
      'Ignoring theta on short-dated options',
      'Not knowing your delta exposure (how much you move per $1)',
    ],
  },
  {
    num: 6,
    title: 'Set Position Size',
    emoji: '📐',
    explanation:
      "Size your position so the max loss is 1-2% of your account. For buying options, max loss = total premium paid. Start with 1 contract — the goal of your first trade is to LEARN, not to profit.",
    tips: [
      '1 contract = 100 shares of exposure',
      'Max loss = premium × 100 × number of contracts',
      'Never risk more than 1-2% of your account on one trade',
      'Start with 1 contract, always',
    ],
    mistakes: [
      'Sizing too big because "I\'m sure about this one"',
      'Not calculating total cost before clicking buy',
      'Buying 10 contracts when 1 would teach the same lesson',
    ],
    interactive: (
      <MiniQuiz
        question="You have a $10,000 account. What's the max you should risk on one trade?"
        options={['$5,000 (50%)', '$2,500 (25%)', '$200 (2%)', '$10,000 (all in!)']}
        correctIdx={2}
        explanation="The 1-2% rule means risking $100-$200 max. This keeps you in the game after inevitable losses."
      />
    ),
  },
  {
    num: 7,
    title: 'Place the Trade',
    emoji: '🚀',
    explanation:
      "Use a LIMIT order, not a market order. Start at the mid-price (between bid and ask). If not filled in a few minutes, adjust slightly toward the ask. Never use market orders on options — the slippage can be brutal.",
    tips: [
      'Always use LIMIT orders for options',
      'Start at the mid-price between bid and ask',
      'If not filled in 5 min, adjust toward the ask',
      'Double-check: symbol, strike, expiration, quantity',
    ],
    mistakes: [
      'Using market orders (can fill at terrible prices)',
      'Not double-checking the order before submitting',
      'Rushing into the trade without reviewing',
    ],
  },
  {
    num: 8,
    title: 'Manage the Position',
    emoji: '📋',
    explanation:
      "Set alerts at your profit target and stop loss. A common approach: take profits at 50% gain, cut losses at 50% loss. Don't stare at the screen all day. Journal the trade — record why you entered, your thesis, and the outcome.",
    tips: [
      'Set price alerts for profit target and stop loss',
      'Common exit: +50% profit, -50% loss',
      'Don\'t hold to expiration hoping for a miracle',
      'Journal every trade for future learning',
    ],
    mistakes: [
      'Staring at P&L all day (leads to emotional decisions)',
      'Moving stop losses further away when losing',
      'Taking profits too early / holding losers too long',
      'Not having an exit plan before entering',
    ],
  },
];

/* ── main component ── */
export default function FirstTradeGuide() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-black px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
      {/* header */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]">
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-xl font-black text-white mt-3 mb-1">🎓 Your First Options Trade</h1>
      <p className="text-zinc-500 text-xs mb-4">Step-by-step from idea to execution</p>

      {/* progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-zinc-500 text-[10px] font-mono">Step {currentStep + 1} of {STEPS.length}</span>
          <span className="text-[#39ff14] text-[10px] font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full rounded-full bg-[#39ff14] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* step indicators */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        {STEPS.map((s, i) => (
          <button
            key={s.num}
            onClick={() => setCurrentStep(i)}
            className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold min-w-[36px] min-h-[36px] active:scale-[0.98] transition-all border ${
              i < currentStep
                ? 'bg-[#39ff14] border-[#39ff14] text-black'
                : i === currentStep
                  ? 'bg-black border-[#39ff14] text-[#39ff14]'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-600'
            }`}
          >
            {i < currentStep ? '✓' : s.num}
          </button>
        ))}
      </div>

      {/* main content card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/20 flex items-center justify-center text-lg">
            {step.emoji}
          </div>
          <div>
            <p className="text-[#39ff14] text-[10px] font-mono">STEP {step.num}</p>
            <h2 className="text-white font-bold text-lg">{step.title}</h2>
          </div>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed mb-5">{step.explanation}</p>

        {/* tips */}
        <div className="mb-4">
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">💡 Key Tips</p>
          <div className="space-y-2">
            {step.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-[#39ff14] shrink-0 mt-0.5" />
                <p className="text-zinc-300 text-xs">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* common mistakes */}
        <div>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">⚠️ Common Mistakes</p>
          <div className="space-y-2">
            {step.mistakes.map((m, i) => (
              <div key={i} className="flex items-start gap-2">
                <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-zinc-400 text-xs">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* interactive element */}
        {step.interactive}
      </div>

      {/* golden rule box on step 1 */}
      {currentStep === 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-4">
          <p className="text-amber-400 font-bold text-xs mb-1">⚡ First Trade Rule</p>
          <p className="text-zinc-300 text-sm">
            Your first trade should be <span className="text-white font-bold">small</span>.
            The goal isn't to make money — it's to learn the mechanics. Trade 1 contract, not 10.
          </p>
        </div>
      )}

      {/* completion card on last step */}
      {currentStep === STEPS.length - 1 && (
        <div className="rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/10 p-5 mb-4 text-center">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-[#39ff14] font-bold text-sm mb-1">Congratulations!</p>
          <p className="text-zinc-400 text-xs">
            You've learned all 8 steps of placing your first options trade. Practice with a paper account before going live!
          </p>
          <button
            onClick={() => setCurrentStep(0)}
            className="mt-3 px-5 py-2 rounded-lg border border-[#39ff14]/30 text-[#39ff14] text-xs font-bold min-h-[44px] active:scale-[0.98]"
          >
            Start Over
          </button>
        </div>
      )}

      {/* nav buttons */}
      <div className="flex gap-3">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl border border-zinc-700 text-zinc-400 font-medium text-sm min-h-[44px] active:scale-[0.98]"
          >
            <ChevronLeft size={16} /> Previous
          </button>
        )}
        {currentStep < STEPS.length - 1 && (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] font-bold text-sm min-h-[44px] active:scale-[0.98]"
          >
            Next Step <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
