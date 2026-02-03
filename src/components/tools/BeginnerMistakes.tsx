import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Lightbulb,
  Target,
} from 'lucide-react';

/* ── types ── */
interface Mistake {
  id: number;
  emoji: string;
  title: string;
  tagline: string;
  scenario: string;
  tempting?: string;
  reality: string;
  fix: string;
  fixLink?: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

/* ── data ── */
const MISTAKES: Mistake[] = [
  {
    id: 1,
    emoji: '🎰',
    title: 'Lottery Tickets',
    tagline: 'Buying cheap far-OTM options',
    scenario:
      'You find a call for $0.05 that\'s 50% OTM expiring in 3 days.',
    tempting: "It's only $5! Huge upside!",
    reality:
      'These options have <1% chance of paying off. That $500 on 100 contracts is going to zero.',
    fix: 'Buy options with delta ≥ 0.30, minimum 30 DTE.',
  },
  {
    id: 2,
    emoji: '⏰',
    title: 'Ignoring Theta',
    tagline: 'Not understanding time decay',
    scenario:
      "You bought a call 45 DTE, now it's 14 DTE and slightly profitable.",
    reality:
      'Theta accelerates dramatically under 21 DTE — your option loses value exponentially.',
    fix: 'Close long options at 50% profit or before 21 DTE. Sell options to benefit from theta.',
  },
  {
    id: 3,
    emoji: '📐',
    title: 'Position Sizing',
    tagline: 'Risking too much on one trade',
    scenario: 'YOLO — putting 50% of account on one trade.',
    reality:
      "One bad trade shouldn't end your career. Even the best traders have 40% losers.",
    fix: 'Risk max 2-5% per trade. Use the Position Sizer tool.',
    fixLink: '/tools/position-size',
  },
  {
    id: 4,
    emoji: '📅',
    title: 'Earnings Surprise',
    tagline: 'Trading through earnings unaware',
    scenario:
      "Stock announces earnings next week, you didn't check.",
    reality:
      'IV crush after earnings destroys option value even if direction is right.',
    fix: 'Always check the earnings calendar before entering.',
    fixLink: '/tools/earnings-calendar',
  },
  {
    id: 5,
    emoji: '💰',
    title: 'Dividend Risk',
    tagline: 'Ignoring ex-dividend dates',
    scenario:
      'Short call gets assigned day before ex-dividend.',
    reality:
      'Deep ITM calls before ex-dividend are prime early assignment targets.',
    fix: 'Check ex-dividend dates. Close or roll short calls before ex-div.',
  },
  {
    id: 6,
    emoji: '💧',
    title: 'Liquidity Traps',
    tagline: 'Trading illiquid options',
    scenario: 'Bid $2.00, Ask $2.50 — the spread is $0.50.',
    reality:
      'Wide spread = $50/contract slippage on entry AND exit.',
    fix: 'Stick to options with bid-ask spread < $0.10. Check volume > 100.',
  },
  {
    id: 7,
    emoji: '📋',
    title: 'No Trading Plan',
    tagline: 'Entering without exit criteria',
    scenario:
      "\"I'll figure it out when I'm in the trade.\"",
    reality:
      'Emotions take over — you hold losers too long, cut winners too short.',
    fix: 'Before every trade: define entry, profit target (50% gain), stop loss (50% loss), and time exit.',
  },
  {
    id: 8,
    emoji: '📉',
    title: 'Averaging Down',
    tagline: 'Doubling down on losers',
    scenario:
      "My option is down 40%, I'll buy more to lower my average.",
    reality:
      'Options have time decay — averaging down often compounds losses.',
    fix: 'Reassess the thesis. If it changed, exit. Never automatically average down on options.',
  },
  {
    id: 9,
    emoji: '🔍',
    title: 'Skipping Due Diligence',
    tagline: 'Not doing homework',
    scenario: 'Reddit says buy XYZ calls, must be good!',
    reality:
      'By the time you see it on social media, the smart money has already moved.',
    fix: 'Check IV rank, earnings date, support/resistance, and your own thesis before every trade.',
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question:
      "You find a call for $0.05 that's 50% OTM expiring in 3 days. What should you do?",
    options: [
      'Buy 100 contracts — it\'s only $500!',
      'Skip it — lottery tickets rarely pay',
      'Buy 10 contracts as a "lotto play"',
    ],
    correctIdx: 1,
    explanation:
      "Cheap OTM options are cheap for a reason. The math doesn't favor lottery tickets.",
  },
  {
    question:
      "You bought a call 45 DTE. It's now 14 DTE and slightly profitable. Smart move?",
    options: [
      'Hold to expiration for maximum profit',
      'Consider taking profits — theta accelerates soon',
      'Buy more to double down on the winner',
    ],
    correctIdx: 1,
    explanation:
      'Theta decay accelerates dramatically under 21 DTE.',
  },
  {
    question:
      "A stock you own options on announces earnings next week. You didn't know. What went wrong?",
    options: [
      "Nothing — earnings don't affect options much",
      'You should have sold the day before',
      'Should have checked the earnings calendar before trading',
    ],
    correctIdx: 2,
    explanation:
      'Always check earnings dates before entering a position. IV crush can destroy value overnight.',
  },
  {
    question:
      'The bid-ask spread on an option is $0.50 wide. What\'s the concern?',
    options: [
      "It doesn't matter if the trade is profitable",
      "You'll lose $50 per contract immediately on entry",
      'Wide spreads mean higher profit potential',
    ],
    correctIdx: 1,
    explanation:
      "A wide bid-ask spread means you lose on entry AND exit. That's $100/contract round trip in slippage.",
  },
  {
    question:
      'Your put is down 40%. You believe the stock will still drop. Best approach?',
    options: [
      'Buy more to lower your average cost',
      'Hold no matter what — conviction!',
      'Assess if the original thesis is still valid, then decide',
    ],
    correctIdx: 2,
    explanation:
      "Averaging down on options is dangerous due to time decay. Re-evaluate the thesis objectively — don't let emotions drive the decision.",
  },
];

/* ── mistake card component ── */
function MistakeCard({
  mistake,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  mistake: Mistake;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isExpanded
          ? 'bg-[#0a0a0a] border-[#39ff14]/30'
          : 'bg-[#0a0a0a] border-[#39ff14]/10'
      }`}
    >
      {/* Card header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 min-h-[56px] active:scale-[0.98] transition-transform"
      >
        <span className="text-2xl flex-shrink-0">{mistake.emoji}</span>
        <div className="flex-1 text-left">
          <p className="text-zinc-100 text-sm font-semibold">
            {mistake.title}
          </p>
          <p className="text-zinc-500 text-xs mt-0.5">{mistake.tagline}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-[#39ff14] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-600 flex-shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Scenario */}
          <div className="rounded-lg bg-zinc-900/50 p-3">
            <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold mb-1">
              📋 Scenario
            </p>
            <p className="text-zinc-300 text-xs leading-relaxed">
              {mistake.scenario}
            </p>
          </div>

          {/* Why it's tempting (optional) */}
          {mistake.tempting && (
            <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
              <p className="text-amber-400 text-[10px] uppercase tracking-wider font-bold mb-1">
                🪤 Why it&apos;s tempting
              </p>
              <p className="text-amber-300/80 text-xs leading-relaxed">
                {mistake.tempting}
              </p>
            </div>
          )}

          {/* Reality — danger */}
          <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <p className="text-red-400 text-[10px] uppercase tracking-wider font-bold">
                Reality
              </p>
            </div>
            <p className="text-red-300/80 text-xs leading-relaxed">
              {mistake.reality}
            </p>
          </div>

          {/* Fix — solution */}
          <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <p className="text-emerald-400 text-[10px] uppercase tracking-wider font-bold">
                The Fix
              </p>
            </div>
            <p className="text-emerald-300/80 text-xs leading-relaxed">
              {mistake.fix}
            </p>
            {mistake.fixLink && (
              <button
                onClick={() => onNavigate(mistake.fixLink!)}
                className="mt-2 inline-flex items-center gap-1 text-[#39ff14] text-xs font-medium active:scale-[0.98] transition-transform"
              >
                <Target className="w-3 h-3" />
                Open Tool →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── quiz component ── */
function Quiz({ onReset }: { onReset: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUIZ_QUESTIONS.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);

  const answeredAll = answers.every((a) => a !== null);
  const score = submitted
    ? answers.reduce<number>(
        (acc, a, i) => acc + (a === QUIZ_QUESTIONS[i].correctIdx ? 1 : 0),
        0,
      )
    : 0;
  const passed = score >= 4;

  const selectAnswer = (qIdx: number, aIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = aIdx;
      return next;
    });
  };

  const handleReset = () => {
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setSubmitted(false);
    onReset();
  };

  return (
    <div className="space-y-5">
      {/* Quiz header */}
      <div className="text-center space-y-1">
        <p className="text-lg font-bold text-zinc-100">🧠 Knowledge Check</p>
        <p className="text-zinc-500 text-xs">
          {QUIZ_QUESTIONS.length} questions — can you pass?
        </p>
      </div>

      {/* Questions */}
      {QUIZ_QUESTIONS.map((q, qIdx) => {
        const selected = answers[qIdx];
        const isRevealed = submitted;
        const isCorrect = selected === q.correctIdx;

        return (
          <div
            key={qIdx}
            className="rounded-xl border border-[#39ff14]/10 bg-[#0a0a0a] p-4"
          >
            <p className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold mb-2">
              Question {qIdx + 1} of {QUIZ_QUESTIONS.length}
            </p>
            <p className="text-zinc-200 text-sm mb-3 leading-relaxed">
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                let style =
                  'bg-zinc-900/50 border-zinc-800 text-zinc-300';
                if (isRevealed) {
                  if (oIdx === q.correctIdx) {
                    style =
                      'bg-emerald-500/15 border-emerald-500/40 text-emerald-400';
                  } else if (selected === oIdx) {
                    style =
                      'bg-red-500/15 border-red-500/40 text-red-400';
                  } else {
                    style =
                      'bg-zinc-900/20 border-zinc-800/50 text-zinc-600';
                  }
                } else if (selected === oIdx) {
                  style =
                    'bg-[#39ff14]/10 border-[#39ff14]/30 text-[#39ff14]';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => selectAnswer(qIdx, oIdx)}
                    disabled={submitted}
                    className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs min-h-[44px] active:scale-[0.98] transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {isRevealed && (
              <div
                className={`mt-3 flex items-start gap-2 text-xs ${
                  isCorrect ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                )}
                <p className="leading-relaxed">
                  {isCorrect ? 'Correct! ' : 'Not quite. '}
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Submit / Result */}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!answeredAll}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm min-h-[48px] active:scale-[0.98] transition-all ${
            answeredAll
              ? 'bg-[#39ff14] text-black'
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
          }`}
        >
          Submit Answers
        </button>
      ) : (
        <div className="space-y-3">
          {/* Score card */}
          <div
            className={`rounded-xl border p-5 text-center ${
              passed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <Trophy
              className={`w-8 h-8 mx-auto mb-2 ${
                passed ? 'text-emerald-400' : 'text-amber-400'
              }`}
            />
            <p className="text-2xl font-bold font-mono text-zinc-100">
              {score}/{QUIZ_QUESTIONS.length}
            </p>
            <p
              className={`text-sm mt-1 ${
                passed ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {passed
                ? '🎉 Great job! You know your stuff.'
                : '📚 Review the mistakes above and try again.'}
            </p>
          </div>

          {/* Retry */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#39ff14]/20 text-[#39ff14] text-sm font-semibold min-h-[48px] active:scale-[0.98] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

/* ── main component ── */
export default function BeginnerMistakes() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const toggle = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* ── sticky header ── */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)] px-4 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-[0.95] transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold text-zinc-100 truncate">
                Beginner Mistakes
              </h1>
              <p className="text-zinc-500 text-xs">
                9 costly errors every trader must avoid
              </p>
            </div>
            <Lightbulb className="w-5 h-5 text-[#39ff14]/40 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-6">
        {/* ── intro card ── */}
        <div className="rounded-xl bg-[#39ff14]/5 border border-[#39ff14]/20 p-4">
          <p className="text-zinc-300 text-xs leading-relaxed">
            <span className="text-[#39ff14] font-bold">90% of beginners</span>{' '}
            lose money on options — often from the same avoidable mistakes. Tap
            each card below to learn what goes wrong and how to fix it.
          </p>
        </div>

        {/* ── mistake cards ── */}
        <div className="space-y-2">
          {MISTAKES.map((m) => (
            <MistakeCard
              key={m.id}
              mistake={m}
              isExpanded={expandedId === m.id}
              onToggle={() => toggle(m.id)}
              onNavigate={(path) => navigate(path)}
            />
          ))}
        </div>

        {/* ── quiz section ── */}
        {!showQuiz ? (
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full py-4 rounded-xl bg-[#39ff14] text-black font-bold text-sm min-h-[52px] active:scale-[0.98] transition-transform"
          >
            🧠 Take the Quiz
          </button>
        ) : (
          <Quiz onReset={() => setShowQuiz(false)} />
        )}

        {/* ── bottom spacer ── */}
        <div className="h-4" />
      </div>
    </div>
  );
}
