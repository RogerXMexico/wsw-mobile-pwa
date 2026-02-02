import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { X, ChevronRight, Trophy, RefreshCw, AlertTriangle, Check, GraduationCap } from 'lucide-react';
import { getQuestionsForTier, shuffleArray, TIER_QUIZ_CONFIG, QuizQuestion } from '../data/quizData';
import { useJungle } from '../contexts/JungleContext';

interface StrategyQuizProps {
  tier: number;
  onClose: () => void;
}

export default function StrategyQuiz({ tier, onClose }: StrategyQuizProps) {
  const tierConfig = TIER_QUIZ_CONFIG[tier];
  const tierName = tierConfig?.name || `Tier ${tier}`;
  const { recordQuizScore } = useJungle();

  // Get and shuffle questions once
  const questions = useMemo(() => {
    const tierQuestions = getQuestionsForTier(tier);
    return shuffleArray(tierQuestions);
  }, [tier]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  // Prevent body scroll when quiz is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Save score on completion
  useEffect(() => {
    if (isComplete && !scoreSaved && questions.length > 0) {
      const score = answers.reduce(
        (acc, answer, idx) => acc + (answer === questions[idx].correctIndex ? 1 : 0),
        0
      );
      const quizId = `tier-${tier}`;
      recordQuizScore(quizId, score, questions.length);
      setScoreSaved(true);
    }
  }, [isComplete, scoreSaved, answers, questions, tier, recordQuizScore]);

  const handleSelectAnswer = useCallback((answerIndex: number) => {
    if (showExplanation) return; // Already answered
    setAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = answerIndex;
      return updated;
    });
    setShowExplanation(true);
  }, [showExplanation, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, questions.length]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setShowExplanation(false);
    setIsComplete(false);
    setScoreSaved(false);
  }, []);

  // No questions available
  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-8 text-center max-w-sm">
          <p className="text-zinc-400">No questions available for this tier yet.</p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-3 bg-[#39ff14] text-black font-bold rounded-xl active:scale-[0.98] transition-transform min-h-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion: QuizQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex] ?? null;

  // Calculate score for results
  const correctCount = answers.reduce(
    (count, answer, index) => count + (answer === questions[index].correctIndex ? 1 : 0),
    0
  );
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  const passed = scorePercent >= 70;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Safe area top padding */}
      <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-[#39ff14]/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-[#39ff14]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              {tierName} Quiz
            </h2>
            <p className="text-[10px] text-zinc-500">
              {isComplete ? 'Results' : `Question ${currentIndex + 1} of ${questions.length}`}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 active:bg-zinc-800 transition-colors min-h-[44px] min-w-[44px]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      {!isComplete && (
        <div className="h-1 bg-zinc-900 shrink-0">
          <div
            className="h-full bg-[#39ff14] transition-all duration-300"
            style={{ width: `${((currentIndex + (showExplanation ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {isComplete ? (
          <ResultsView
            questions={questions}
            answers={answers}
            correctCount={correctCount}
            scorePercent={scorePercent}
            passed={passed}
            tier={tier}
            onRetry={handleRetry}
            onClose={onClose}
          />
        ) : (
          <QuestionView
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showExplanation={showExplanation}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            isLast={currentIndex === questions.length - 1}
          />
        )}
      </div>

      {/* Safe area bottom padding */}
      <div className="pb-[env(safe-area-inset-bottom)]" />
    </div>
  );
}

// ============ Question View ============

interface QuestionViewProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showExplanation: boolean;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  isLast: boolean;
}

function QuestionView({
  question,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  onNext,
  isLast,
}: QuestionViewProps) {
  return (
    <div className="space-y-5">
      {/* Question */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4">
        <p className="text-base text-white font-medium leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correctIndex;
          const showResult = showExplanation;

          let optionClasses =
            'w-full text-left p-4 rounded-xl border transition-all min-h-[44px] active:scale-[0.98]';

          if (showResult) {
            if (isCorrect) {
              optionClasses += ' bg-emerald-900/30 border-emerald-500/50';
            } else if (isSelected && !isCorrect) {
              optionClasses += ' bg-red-900/30 border-red-500/50';
            } else {
              optionClasses += ' bg-[#0a0a0a] border-zinc-800/50 opacity-50';
            }
          } else if (isSelected) {
            optionClasses += ' bg-[#39ff14]/10 border-[#39ff14]/40';
          } else {
            optionClasses += ' bg-[#0a0a0a] border-zinc-800 active:border-[#39ff14]/30';
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectAnswer(idx)}
              disabled={showExplanation}
              className={optionClasses}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    showResult && isCorrect
                      ? 'bg-emerald-500/30 text-emerald-400'
                      : showResult && isSelected && !isCorrect
                        ? 'bg-red-500/30 text-red-400'
                        : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {showResult && isCorrect ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : showResult && isSelected && !isCorrect ? (
                    <X className="w-3.5 h-3.5" />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    showResult && isCorrect
                      ? 'text-emerald-300'
                      : showResult && isSelected && !isCorrect
                        ? 'text-red-300'
                        : 'text-zinc-300'
                  }`}
                >
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4">
          <p className="text-[10px] text-[#39ff14] uppercase tracking-wider font-bold mb-2">
            Explanation
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {showExplanation && (
        <button
          onClick={onNext}
          className="w-full py-4 bg-[#39ff14] text-black font-bold rounded-xl text-base active:scale-[0.98] transition-transform flex items-center justify-center gap-2 min-h-[44px]"
        >
          {isLast ? 'See Results' : 'Next Question'}
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// ============ Results View ============

interface ResultsViewProps {
  questions: QuizQuestion[];
  answers: number[];
  correctCount: number;
  scorePercent: number;
  passed: boolean;
  tier: number;
  onRetry: () => void;
  onClose: () => void;
}

function ResultsView({
  questions,
  answers,
  correctCount,
  scorePercent,
  passed,
  tier,
  onRetry,
  onClose,
}: ResultsViewProps) {
  return (
    <div className="space-y-6">
      {/* Score circle */}
      <div className="text-center py-4">
        <div className="relative w-36 h-36 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full border-[6px] border-zinc-800" />
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke={passed ? '#10b981' : '#ef4444'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(scorePercent / 100) * 415} 415`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div
              className={`text-4xl font-black ${passed ? 'text-emerald-400' : 'text-red-400'}`}
            >
              {scorePercent}%
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Score</div>
          </div>
        </div>

        {/* Pass/Fail badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
            passed
              ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-900/30 text-red-400 border border-red-500/30'
          }`}
        >
          {passed ? (
            <>
              <Trophy className="w-4 h-4" />
              Tier {tier} Mastered!
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4" />
              Review & Retry (70% to pass)
            </>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">{correctCount}</div>
          <div className="text-[10px] text-zinc-500 uppercase">Correct</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{questions.length - correctCount}</div>
          <div className="text-[10px] text-zinc-500 uppercase">Wrong</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-zinc-300">{questions.length}</div>
          <div className="text-[10px] text-zinc-500 uppercase">Total</div>
        </div>
      </div>

      {/* Question review */}
      <div>
        <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-3">
          Question Review
        </h4>
        <div className="space-y-2">
          {questions.map((q, index) => {
            const isCorrect = answers[index] === q.correctIndex;
            return (
              <div
                key={q.id}
                className={`p-3 rounded-xl border ${
                  isCorrect
                    ? 'bg-emerald-900/10 border-emerald-500/20'
                    : 'bg-red-900/10 border-red-500/20'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    }`}
                  >
                    {isCorrect ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <X className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-300 line-clamp-2">{q.question}</p>
                    {!isCorrect && (
                      <p className="text-[10px] text-emerald-400 mt-1">
                        ✓ {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2 pb-4">
        <button
          onClick={onRetry}
          className="flex-1 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 min-h-[44px]"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-4 bg-[#39ff14] text-black font-bold rounded-xl active:scale-[0.98] transition-transform min-h-[44px]"
        >
          {passed ? 'Continue' : 'Close'}
        </button>
      </div>
    </div>
  );
}
