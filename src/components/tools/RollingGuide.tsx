import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

/* ── quiz data (extracted from desktop RollingAdjusting.tsx) ── */
interface QuizQuestion { question: string; options: string[]; correct: number; explanation: string }

const QUIZ: QuizQuestion[] = [
  {
    question: "Your short put is being tested (stock near strike). You still believe in the stock long-term. What's often the best action?",
    options: ['Close for a loss immediately', 'Roll out and down for a credit', 'Double down with more puts', 'Convert to a straddle'],
    correct: 1,
    explanation: 'Rolling out (more time) and down (lower strike) for a credit lets you collect more premium, lower your breakeven, and give the stock more time to recover — while maintaining a bullish thesis.',
  },
  {
    question: 'When rolling a losing position, what should you always aim for?',
    options: ['Break even on the roll', 'A credit (receive money)', 'A debit (pay money)', 'Maximum time extension'],
    correct: 1,
    explanation: "Always try to roll for a credit. This means you're being paid to give yourself more time or a better strike. Rolling for a debit adds to your cost basis and increases your max loss.",
  },
  {
    question: "Your covered call is deep ITM with 7 DTE. You don't want to sell your shares. What's the best approach?",
    options: ['Let it expire and get assigned', 'Roll out and up for a credit if possible', 'Buy back the call at a loss', 'Sell more calls to average down'],
    correct: 1,
    explanation: 'Rolling out (more time) and up (higher strike) can help you avoid assignment while collecting more premium. The key is finding an expiration with enough time value to roll for a credit.',
  },
  {
    question: 'Which scenario is NOT a good reason to roll a position?',
    options: ['Your thesis has completely changed', 'You need more time for the trade to work', 'The position is being tested but thesis intact', 'You want to improve your strike price'],
    correct: 0,
    explanation: "If your thesis has changed (you no longer believe in the trade), don't roll — close it. Rolling is for when you still believe in the trade but need more time or a better strike.",
  },
  {
    question: "What does 'rolling for a credit' mean?",
    options: ['You pay money to adjust the position', 'You receive money when making the adjustment', 'You break even on the roll', 'You convert credits to debits'],
    correct: 1,
    explanation: "Rolling for a credit means the new position you're opening is worth more than the old one you're closing, so you receive the difference as a net credit to your account.",
  },
];

/* ── section data ── */
interface Section {
  id: string;
  title: string;
  emoji: string;
  content: React.ReactNode;
}

function BeforeAfter({ before, after, label, credit }: { before: React.ReactNode; after: React.ReactNode; label: string; credit?: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="text-xs font-bold text-zinc-500 px-4 py-2 bg-zinc-900/60 border-b border-zinc-800">{label}</div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="p-3 text-sm">{before}</div>
        <div className="text-[#39ff14] text-xl px-2">→</div>
        <div className="p-3 text-sm">{after}</div>
      </div>
      {credit && (
        <div className="px-4 py-2 bg-[#39ff14]/10 border-t border-[#39ff14]/20 text-[#39ff14] text-xs font-bold text-center">
          {credit}
        </div>
      )}
    </div>
  );
}

const SECTIONS: Section[] = [
  {
    id: 'what-is-rolling',
    title: 'What is Rolling?',
    emoji: '🔄',
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          <span className="text-[#39ff14] font-bold">Rolling</span> is closing your current option position and simultaneously opening a new one with different terms (strike, expiration, or both).
        </p>
        <p className="text-zinc-400 text-sm">It's a single trade that combines "buy to close" and "sell to open" (or vice versa) into one transaction.</p>

        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold shrink-0 mt-0.5">1</div>
            <p className="text-zinc-300 text-sm"><span className="text-red-400 font-semibold">Close</span> your existing position</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0 mt-0.5">2</div>
            <p className="text-zinc-300 text-sm"><span className="text-emerald-400 font-semibold">Open</span> a new position with better terms</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#39ff14]/20 flex items-center justify-center text-[#39ff14] text-xs font-bold shrink-0 mt-0.5">3</div>
            <p className="text-zinc-300 text-sm"><span className="text-[#39ff14] font-semibold">Net result:</span> Credit (you receive $) or Debit (you pay $)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
            <p className="text-emerald-400 font-bold text-xs mb-1">✓ Rolling for Credit</p>
            <p className="text-zinc-400 text-xs">New option worth MORE → you get paid</p>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-red-400 font-bold text-xs mb-1">✗ Rolling for Debit</p>
            <p className="text-zinc-400 text-xs">New option worth LESS → you pay</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'roll-out',
    title: 'Roll Out (Extend Time)',
    emoji: '⏰',
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          Move your position to a <span className="text-[#39ff14] font-semibold">later expiration</span> while keeping the same strike. You're buying more time for your thesis to work.
        </p>

        <BeforeAfter
          label="EXAMPLE: Rolling Out a Short Put"
          before={
            <div>
              <p className="text-amber-400 font-bold text-xs mb-1">BEFORE</p>
              <p className="text-zinc-300 text-xs">Short $100 Put</p>
              <p className="text-zinc-500 text-xs">Exp: Jan 20 (7 DTE)</p>
              <p className="text-zinc-500 text-xs">Value: $2.00</p>
            </div>
          }
          after={
            <div>
              <p className="text-[#39ff14] font-bold text-xs mb-1">AFTER</p>
              <p className="text-zinc-300 text-xs">Short $100 Put</p>
              <p className="text-zinc-500 text-xs">Exp: Feb 17 (35 DTE)</p>
              <p className="text-zinc-500 text-xs">Value: $3.50</p>
            </div>
          }
          credit="Net Credit: $1.50 ($150 per contract)"
        />

        <div className="space-y-2 mt-2">
          <p className="text-zinc-500 text-xs font-bold uppercase">When to Roll Out</p>
          {['Your thesis is still valid, just need more time', 'You can roll for a credit (or minimal debit)', 'Expiration approaching & position under pressure'].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-zinc-300 text-xs">{t}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'roll-up',
    title: 'Roll Up',
    emoji: '📈',
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          Move to a <span className="text-emerald-400 font-semibold">higher strike price</span>. Used when stock has moved up and you want to capture more upside or avoid assignment.
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-400 text-xs mb-1"><span className="text-white font-semibold">Use case:</span> Short call being tested, stock rallying</p>
          <p className="text-zinc-400 text-xs"><span className="text-white font-semibold">Effect:</span> Higher breakeven, more room for stock to run</p>
        </div>

        <BeforeAfter
          label="EXAMPLE: Rolling Up a Covered Call"
          before={
            <div>
              <p className="text-amber-400 font-bold text-xs mb-1">BEFORE</p>
              <p className="text-zinc-300 text-xs">Short $400 Call</p>
              <p className="text-zinc-500 text-xs">Stock now at $410</p>
              <p className="text-red-400 text-xs">Deep ITM ⚠️</p>
            </div>
          }
          after={
            <div>
              <p className="text-[#39ff14] font-bold text-xs mb-1">AFTER</p>
              <p className="text-zinc-300 text-xs">Short $415 Call</p>
              <p className="text-zinc-500 text-xs">Later expiration</p>
              <p className="text-emerald-400 text-xs">More room ✓</p>
            </div>
          }
          credit="Raised strike by $15 → $1,500 more potential profit"
        />
      </div>
    ),
  },
  {
    id: 'roll-down',
    title: 'Roll Down',
    emoji: '📉',
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          Move to a <span className="text-red-400 font-semibold">lower strike price</span>. Used when stock has dropped and you want a better entry point.
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-400 text-xs mb-1"><span className="text-white font-semibold">Use case:</span> Short put being tested, stock dropping</p>
          <p className="text-zinc-400 text-xs"><span className="text-white font-semibold">Effect:</span> Lower breakeven, willing to buy at lower price</p>
        </div>

        <BeforeAfter
          label="EXAMPLE: Rolling Down a Short Put"
          before={
            <div>
              <p className="text-amber-400 font-bold text-xs mb-1">BEFORE</p>
              <p className="text-zinc-300 text-xs">Short $100 Put</p>
              <p className="text-zinc-500 text-xs">Stock at $98</p>
              <p className="text-red-400 text-xs">Underwater ⚠️</p>
            </div>
          }
          after={
            <div>
              <p className="text-[#39ff14] font-bold text-xs mb-1">AFTER</p>
              <p className="text-zinc-300 text-xs">Short $95 Put</p>
              <p className="text-zinc-500 text-xs">Same or later exp</p>
              <p className="text-emerald-400 text-xs">More room ✓</p>
            </div>
          }
        />

        <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 mt-2">
          <p className="text-purple-400 font-bold text-xs mb-1">💡 Power Move: Roll Out AND Down</p>
          <p className="text-zinc-400 text-xs">Combining time extension with strike improvement often lets you roll for a credit even on a losing position.</p>
          <div className="mt-2 space-y-1 text-xs">
            <p className="text-red-400">Close: Jan $100P @ $4.00 (pay $400)</p>
            <p className="text-emerald-400">Open: Feb $95P @ $4.50 (receive $450)</p>
            <p className="text-[#39ff14] font-bold">Net Credit: $0.50 — improved strike AND got paid!</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'roll-up-out',
    title: 'Roll Up and Out',
    emoji: '🚀',
    content: (
      <div className="space-y-4">
        <p className="text-zinc-300 text-sm leading-relaxed">
          The <span className="text-[#39ff14] font-semibold">combination move</span> — move to a higher strike AND later expiration simultaneously. Maximum flexibility.
        </p>

        <BeforeAfter
          label="EXAMPLE: Defending a Covered Call"
          before={
            <div>
              <p className="text-amber-400 font-bold text-xs mb-1">BEFORE</p>
              <p className="text-zinc-300 text-xs">MSFT $400 Call</p>
              <p className="text-zinc-500 text-xs">Jan exp, stock at $410</p>
              <p className="text-zinc-500 text-xs">Worth $12.00</p>
            </div>
          }
          after={
            <div>
              <p className="text-[#39ff14] font-bold text-xs mb-1">AFTER</p>
              <p className="text-zinc-300 text-xs">MSFT $415 Call</p>
              <p className="text-zinc-500 text-xs">Feb exp</p>
              <p className="text-zinc-500 text-xs">Received $8.50</p>
            </div>
          }
          credit="Paid $350 debit to raise strike $15 ($1,500 more upside)"
        />

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-400 font-bold text-xs mb-1">⚠️ Trade-off</p>
          <p className="text-zinc-400 text-xs">
            You may have to pay a debit for the strike improvement. Worth it if you're very bullish on the stock continuing higher.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'when-to-roll',
    title: 'When to Roll',
    emoji: '✅',
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-emerald-400 font-bold text-xs mb-3">✅ Good Reasons to Roll</p>
          <ul className="space-y-2">
            {[
              'Your original thesis is still intact',
              'You can roll for a credit (or small debit)',
              'The stock is temporarily oversold/overbought',
              'More time will likely fix the position',
              "You'd open the same trade again at these levels",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span className="text-zinc-300 text-xs">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-amber-400 font-bold text-xs mb-2">🧪 The "Fresh Eyes" Test</p>
          <p className="text-zinc-300 text-sm italic">
            "If I had no position right now, would I open this trade at these levels?"
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-center">
              <p className="text-emerald-400 font-bold text-xs">YES → Roll</p>
            </div>
            <div className="rounded-lg bg-red-500/10 p-2 text-center">
              <p className="text-red-400 font-bold text-xs">NO → Close it</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-400 text-xs">
            <span className="text-[#39ff14] font-bold">Pro tip:</span> Set a maximum number of rolls per position (2-3 max). After that, accept the loss and move on.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'when-not-to-roll',
    title: 'When NOT to Roll',
    emoji: '🛑',
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-red-400 font-bold text-xs mb-3">🛑 Just Close the Position</p>
          <ul className="space-y-2">
            {[
              'Your thesis has fundamentally changed',
              'Rolling requires a large debit',
              'The stock broke a major support/resistance',
              'News changed the fundamental picture',
              "You wouldn't open this trade fresh today",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span className="text-zinc-300 text-xs">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-red-400 font-bold text-xs mb-2">❌ What NOT to Do</p>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li><span className="text-red-400 font-bold">Don't double down:</span> Adding to a loser compounds the loss</li>
            <li><span className="text-red-400 font-bold">Don't roll forever:</span> Set a limit and stick to it</li>
            <li><span className="text-red-400 font-bold">Don't add risk to reduce risk:</span> Adjustments should decrease exposure</li>
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-zinc-300 text-sm font-semibold mb-2">Other Adjustment Options:</p>
          <div className="space-y-2 text-xs text-zinc-400">
            <p>• <span className="text-blue-400 font-semibold">Close Partial:</span> Close some contracts, keep a few</p>
            <p>• <span className="text-purple-400 font-semibold">Convert to Spread:</span> Buy a protective option to cap risk</p>
            <p>• <span className="text-amber-400 font-semibold">Add a Hedge:</span> Buy opposite side to profit from vol</p>
            <p>• <span className="text-emerald-400 font-semibold">Take Assignment:</span> Accept shares, then sell covered calls</p>
          </div>
        </div>
      </div>
    ),
  },
];

/* ── main component ── */
export default function RollingGuide() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const section = SECTIONS[currentIdx];
  const progress = ((currentIdx + 1) / SECTIONS.length) * 100;

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

  /* ── quiz view ── */
  if (showQuiz) {
    if (quizDone) {
      const pct = Math.round((score / QUIZ.length) * 100);
      return (
        <div className="min-h-screen bg-black px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
          <button onClick={() => setShowQuiz(false)} className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]">
            <ArrowLeft size={18} /> Back to Lesson
          </button>
          <div className="mt-8 text-center">
            <p className={`text-5xl font-black ${pct >= 80 ? 'text-[#39ff14]' : pct >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{pct}%</p>
            <p className="text-zinc-400 text-sm mt-2">{score} of {QUIZ.length} correct</p>
            <p className="text-zinc-500 text-xs mt-4">
              {pct >= 80 ? '🎉 Excellent! You understand rolling.' : '📖 Review the material and try again!'}
            </p>
            <button onClick={resetQuiz} className="mt-6 px-6 py-3 rounded-xl border border-[#39ff14]/30 bg-[#39ff14]/10 text-[#39ff14] font-bold text-sm min-h-[44px] active:scale-[0.98]">
              <RotateCcw size={14} className="inline mr-1" /> Retake Quiz
            </button>
          </div>
        </div>
      );
    }

    const q = QUIZ[quizIdx];
    return (
      <div className="min-h-screen bg-black px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <button onClick={() => setShowQuiz(false)} className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]">
          <ArrowLeft size={18} /> Back to Lesson
        </button>

        {/* progress dots */}
        <div className="flex gap-1.5 mt-4 mb-6 justify-center">
          {QUIZ.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i < quizIdx ? 'w-6 bg-[#39ff14]' : i === quizIdx ? 'w-6 bg-[#39ff14]/60' : 'w-3 bg-zinc-700'}`} />
          ))}
        </div>

        <p className="text-zinc-500 text-xs mb-2 text-center">Question {quizIdx + 1} of {QUIZ.length}</p>
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
          <div className={`mt-4 p-4 rounded-xl border text-sm ${selected === q.correct ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
            <p className={`font-bold text-xs mb-1 ${selected === q.correct ? 'text-emerald-400' : 'text-amber-400'}`}>
              {selected === q.correct ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-zinc-300 text-xs">{q.explanation}</p>
          </div>
        )}

        {revealed && (
          <button onClick={nextQ} className="mt-4 w-full py-3 rounded-xl bg-[#39ff14] text-black font-bold text-sm min-h-[44px] active:scale-[0.98]">
            {quizIdx < QUIZ.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    );
  }

  /* ── lesson view ── */
  return (
    <div className="min-h-screen bg-black px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
      {/* header */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]">
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-xl font-black text-white mt-3 mb-1">🔄 Rolling & Adjusting</h1>
      <p className="text-zinc-500 text-xs mb-4">Learn when and how to roll positions to improve your odds</p>

      {/* progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-zinc-500 text-[10px] font-mono">Section {currentIdx + 1}/{SECTIONS.length}</span>
          <span className="text-[#39ff14] text-[10px] font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full rounded-full bg-[#39ff14] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* section pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 scrollbar-none">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentIdx(i)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium min-h-[36px] active:scale-[0.98] transition-all ${
              i === currentIdx
                ? 'bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/30'
                : i < currentIdx
                  ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
            }`}
          >
            {s.emoji} {s.title}
          </button>
        ))}
      </div>

      {/* content card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 mb-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>{section.emoji}</span> {section.title}
        </h2>
        {section.content}
      </div>

      {/* golden rule (shown on first section) */}
      {currentIdx === 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-6">
          <p className="text-amber-400 font-bold text-xs mb-1">⚠️ The Golden Rule of Rolling</p>
          <p className="text-zinc-300 text-sm">
            <span className="text-amber-400 font-bold">Always roll for a credit when possible.</span> If you can't roll for a credit, consider whether you should just close the position.
          </p>
        </div>
      )}

      {/* nav buttons */}
      <div className="flex gap-3">
        {currentIdx > 0 && (
          <button
            onClick={() => setCurrentIdx((i) => i - 1)}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl border border-zinc-700 text-zinc-400 font-medium text-sm min-h-[44px] active:scale-[0.98]"
          >
            <ChevronLeft size={16} /> Previous
          </button>
        )}
        {currentIdx < SECTIONS.length - 1 ? (
          <button
            onClick={() => setCurrentIdx((i) => i + 1)}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#39ff14] font-bold text-sm min-h-[44px] active:scale-[0.98]"
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => { resetQuiz(); setShowQuiz(true); }}
            className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-[#39ff14] text-black font-bold text-sm min-h-[44px] active:scale-[0.98]"
          >
            Take the Quiz 🧠
          </button>
        )}
      </div>
    </div>
  );
}
