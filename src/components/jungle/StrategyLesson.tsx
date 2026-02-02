import { useState } from 'react';
import {
  BookOpen, Target, AlertCircle, CheckCircle, Lightbulb, XCircle,
  TrendingUp, TrendingDown, DollarSign, ChevronRight, ArrowLeft,
} from 'lucide-react';
import { getStrategyById } from '../../data/jungleStrategies';
import { getQuizForStrategy } from '../../data/jungleQuizzes';
import { JUNGLE_ANIMALS } from '../../data/jungleAnimals';
import { useJungle } from '../../contexts/JungleContext';
import AnimalMentor from './AnimalMentor';

interface Props {
  strategyId: string;
}

export default function StrategyLesson({ strategyId }: Props) {
  const { completeStrategy, recordQuizScore, progress, setCurrentView, selectedAnimal } = useJungle();

  const [showQuiz, setShowQuiz] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const strategy = getStrategyById(strategyId);
  const quizQuestions = getQuizForStrategy(strategyId) || [];

  if (!strategy) return <div className="text-zinc-400 p-4">Strategy not found</div>;

  const animal = JUNGLE_ANIMALS[strategy.animalId];
  const isCompleted = progress.completedStrategies.includes(strategyId);
  const existingScore = progress.quizScores[strategyId];
  const currentQ = quizQuestions[qIdx];

  const goBack = () => {
    if (selectedAnimal) setCurrentView('animal-detail');
    else setCurrentView('hub');
  };

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctIndex) setCorrectAnswers(p => p + 1);
  };

  const handleNext = () => {
    if (qIdx < quizQuestions.length - 1) {
      setQIdx(p => p + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const final = correctAnswers + (selectedAnswer === currentQ?.correctIndex ? 1 : 0);
      recordQuizScore(strategyId, final, quizQuestions.length);
      if (final >= quizQuestions.length * 0.7) completeStrategy(strategyId);
      setQuizComplete(true);
    }
  };

  const retakeQuiz = () => {
    setQIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizComplete(false);
  };

  // ========== QUIZ RESULTS ==========
  if (showQuiz && quizComplete) {
    const passed = correctAnswers >= quizQuestions.length * 0.7;
    return (
      <div className="pb-6 text-center space-y-4">
        <div className="text-5xl mb-2">{passed ? '🎉' : '📚'}</div>
        <h2 className="text-lg font-bold text-zinc-100">{passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
        <p className="text-sm text-zinc-400">
          You scored {correctAnswers} out of {quizQuestions.length}
        </p>
        <div className={`inline-block px-4 py-2 rounded-full text-sm ${passed ? 'bg-[#39ff14]/20 text-[#39ff14]' : 'bg-amber-500/20 text-amber-400'}`}>
          {passed ? 'Quiz Passed! Strategy Completed!' : 'Score 70%+ to complete'}
        </div>
        {passed && <AnimalMentor animal={animal} messageType="strategyComplete" />}
        <div className="space-y-2 pt-2">
          {!passed && (
            <button onClick={retakeQuiz} className="w-full bg-[#39ff14] text-black font-semibold py-3 rounded-xl active:scale-[0.97] transition-transform">
              Try Again
            </button>
          )}
          <button onClick={goBack} className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 text-zinc-300 py-3 rounded-xl text-sm active:scale-[0.97] transition-transform">
            {passed ? 'Continue Learning' : 'Review Lesson'}
          </button>
        </div>
      </div>
    );
  }

  // ========== QUIZ QUESTIONS ==========
  if (showQuiz && currentQ) {
    return (
      <div className="pb-6 space-y-4">
        <button onClick={() => setShowQuiz(false)} className="flex items-center gap-1 text-zinc-400 text-sm">
          <ArrowLeft className="w-4 h-4 text-[#39ff14]" /> Back to Lesson
        </button>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
            <span>Question {qIdx + 1} / {quizQuestions.length}</span>
            <span>{correctAnswers} correct</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <div className="h-1.5 rounded-full transition-all" style={{ width: `${((qIdx + 1) / quizQuestions.length) * 100}%`, backgroundColor: animal.colors.primary }} />
          </div>
        </div>

        <h3 className="text-sm font-semibold text-zinc-200 leading-relaxed">{currentQ.question}</h3>

        <div className="space-y-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let classes = 'border-zinc-800 bg-[#0a0a0a] text-zinc-400';
            if (showExplanation) {
              if (isCorrect) classes = 'border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14]';
              else if (isSelected) classes = 'border-red-500 bg-red-500/10 text-red-400';
            } else if (isSelected) {
              classes = 'border-[#39ff14] bg-[#39ff14]/10 text-zinc-200';
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showExplanation}
                className={`w-full p-3 rounded-xl text-left text-sm border transition-all ${classes}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    showExplanation && isCorrect ? 'border-[#39ff14] bg-[#39ff14]' :
                    showExplanation && isSelected ? 'border-red-500 bg-red-500' :
                    isSelected ? 'border-[#39ff14]' : 'border-zinc-600'
                  }`}>
                    {showExplanation && isCorrect && <CheckCircle className="w-3 h-3 text-black" />}
                    {showExplanation && isSelected && !isCorrect && <XCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span>{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-[#39ff14] shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400">{currentQ.explanation}</p>
            </div>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full bg-[#39ff14] text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-1 active:scale-[0.97] transition-transform"
          >
            {qIdx < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // ========== LESSON VIEW ==========
  return (
    <div className="pb-6 space-y-4">
      {/* Back */}
      <button onClick={goBack} className="flex items-center gap-1 text-[#39ff14] text-sm active:text-white">
        <ArrowLeft className="w-4 h-4 text-[#39ff14]" /> Back
      </button>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: animal.colors.bg }}>
          {animal.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px]" style={{ color: animal.colors.primary }}>{animal.characterName}'s Strategy</div>
          <h1 className="text-lg font-bold text-zinc-100 truncate">{strategy.name}</h1>
        </div>
        {isCompleted && <CheckCircle className="w-5 h-5 text-[#39ff14] shrink-0" />}
      </div>

      <p className="text-xs text-zinc-400">{strategy.description}</p>

      {/* Mentor */}
      <AnimalMentor animal={animal} messageType="greeting" customMessage={`Let me teach you about the ${strategy.name}. ${strategy.overview.split('.')[0]}.`} />

      {/* Overview */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-zinc-200 mb-2 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" style={{ color: animal.colors.primary }} /> Overview
        </h2>
        <p className="text-xs text-zinc-400 whitespace-pre-line leading-relaxed">{strategy.overview}</p>
      </div>

      {/* Key Points */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-zinc-200 mb-2 flex items-center gap-1.5">
          <Target className="w-4 h-4" style={{ color: animal.colors.primary }} /> Key Points
        </h2>
        <ul className="space-y-2">
          {strategy.keyPoints.map((pt, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#39ff14] shrink-0 mt-0.5" />
              <span className="text-xs text-zinc-400">{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risk / Reward */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3">
          <h3 className="text-xs font-semibold text-[#39ff14] mb-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Max Profit
          </h3>
          <p className="text-[11px] text-zinc-400">{strategy.maxProfit}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3">
          <h3 className="text-xs font-semibold text-red-400 mb-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> Max Loss
          </h3>
          <p className="text-[11px] text-zinc-400">{strategy.maxLoss}</p>
        </div>
      </div>

      {/* Best For / Avoid */}
      <div className="space-y-2">
        <div className="bg-[#0a0a0a] border-l-2 border-[#39ff14] rounded-r-xl p-3">
          <h3 className="text-xs font-semibold text-[#39ff14] mb-1">Best For</h3>
          <p className="text-[11px] text-zinc-400">{strategy.bestFor}</p>
        </div>
        <div className="bg-[#0a0a0a] border-l-2 border-red-500 rounded-r-xl p-3">
          <h3 className="text-xs font-semibold text-red-400 mb-1">Avoid When</h3>
          <p className="text-[11px] text-zinc-400">{strategy.avoidWhen}</p>
        </div>
      </div>

      {/* Example */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4" style={{ color: animal.colors.primary }} /> Example
        </h2>
        <div className="space-y-2 text-xs text-zinc-400">
          <div><span className="font-medium text-zinc-300">Scenario:</span> {strategy.example.scenario}</div>
          <div><span className="font-medium text-zinc-300">Setup:</span> {strategy.example.setup}</div>
          <div><span className="font-medium text-zinc-300">Outcome:</span> {strategy.example.outcome}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 bg-zinc-900 rounded-lg p-2">
          <div className="text-center">
            <div className="text-[10px] text-zinc-500">Stock</div>
            <div className="text-sm font-bold text-zinc-200">${strategy.example.numbers.stockPrice}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-zinc-500">Strike</div>
            <div className="text-sm font-bold text-zinc-200">${strategy.example.numbers.strikePrice}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-zinc-500">Premium</div>
            <div className="text-sm font-bold text-zinc-200">${strategy.example.numbers.premium}</div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <span className="text-[10px] text-zinc-500">Result: </span>
          <span className="text-xs font-bold text-[#39ff14]">{strategy.example.numbers.result}</span>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-zinc-200 mb-2 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-400" /> Pro Tips
        </h2>
        <ul className="space-y-2">
          {strategy.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
              <span className="text-xs text-zinc-400">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Common Mistakes */}
      <div className="bg-[#0a0a0a] border-l-2 border-amber-500 rounded-r-xl p-4">
        <h2 className="text-sm font-semibold text-zinc-200 mb-2 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-400" /> Common Mistakes
        </h2>
        <ul className="space-y-2">
          {strategy.commonMistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-xs text-zinc-400">{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quiz CTA */}
      {quizQuestions.length > 0 && (
        <div className="text-center space-y-2 pt-2">
          <h3 className="text-sm font-semibold text-zinc-200">Test Your Knowledge</h3>
          {existingScore && (
            <p className="text-xs text-zinc-500">Best: {existingScore.bestScore}/{existingScore.total}</p>
          )}
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full bg-[#39ff14] text-black font-semibold py-3 rounded-xl active:scale-[0.97] transition-transform"
          >
            {existingScore ? 'Retake Quiz' : 'Start Quiz'}
          </button>
        </div>
      )}

      {/* Mark Complete (no quiz) */}
      {quizQuestions.length === 0 && !isCompleted && (
        <button
          onClick={() => completeStrategy(strategyId)}
          className="w-full bg-[#39ff14] text-black font-semibold py-3 rounded-xl active:scale-[0.97] transition-transform"
        >
          Mark as Complete
        </button>
      )}
    </div>
  );
}
