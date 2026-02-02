import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, ArrowLeft } from 'lucide-react';
import { RISK_ASSESSMENT_QUESTIONS, calculateRiskProfile } from '../../data/jungleQuizzes';
import { JUNGLE_ANIMALS } from '../../data/jungleAnimals';
import { useJungle } from '../../contexts/JungleContext';
import { RiskProfile } from '../../types/jungle';

export default function RiskAssessmentQuiz() {
  const { setRiskProfile, setCurrentView, setSelectedAnimal } = useJungle();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateRiskProfile> | null>(null);

  const question = RISK_ASSESSMENT_QUESTIONS[currentQuestion];
  const totalQuestions = RISK_ASSESSMENT_QUESTIONS.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const r = calculateRiskProfile(answers);
      setResult(r);
      setShowResults(true);
      setRiskProfile(r.primary as RiskProfile, r.secondary as RiskProfile);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  // ============ RESULTS SCREEN ============
  if (showResults && result) {
    const primary = JUNGLE_ANIMALS[result.primary];
    const secondary = JUNGLE_ANIMALS[result.secondary];
    const confidence = Math.round(result.confidence * 100);

    return (
      <div className="pb-6 space-y-6">
        {/* Header */}
        <div className="text-center pt-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#39ff14]" />
            <h2 className="text-lg font-bold text-zinc-100">Your Spirit Animal</h2>
            <Sparkles className="w-5 h-5 text-[#39ff14]" />
          </div>

          {/* Primary Animal */}
          <div className="mb-4">
            {primary.avatarPath ? (
              <img
                src={primary.avatarPath}
                alt={primary.characterName}
                className="w-28 h-28 rounded-full object-cover border-4 mx-auto mb-3"
                style={{ borderColor: primary.colors.primary, boxShadow: `0 0 30px ${primary.colors.primary}40` }}
              />
            ) : (
              <div className="text-7xl mb-3">{primary.emoji}</div>
            )}
            <h3 className="text-xl font-bold" style={{ color: primary.colors.primary }}>
              {primary.name}
            </h3>
            <p className="text-sm text-zinc-400">
              {primary.characterName} — {primary.riskLevel.replace('-', ' ')} trader
            </p>
            <p className="text-xs text-zinc-500 italic mt-1">"{primary.catchphrase}"</p>
          </div>

          {/* Confidence */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39ff14]/10 text-[#39ff14] text-sm font-medium mb-4">
            ✓ {confidence}% Match
          </div>

          {/* Secondary */}
          <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 mb-4 mx-4">
            <p className="text-[10px] text-zinc-500 mb-1.5">Secondary match:</p>
            <div className="flex items-center justify-center gap-2">
              {secondary.avatarPath ? (
                <img src={secondary.avatarPath} alt={secondary.characterName} className="w-8 h-8 rounded-full object-cover border" style={{ borderColor: secondary.colors.primary }} />
              ) : (
                <span className="text-xl">{secondary.emoji}</span>
              )}
              <span className="text-sm" style={{ color: secondary.colors.primary }}>{secondary.name}</span>
            </div>
          </div>

          {/* Philosophy */}
          <div className="text-left mx-4 p-3 rounded-xl mb-4" style={{ backgroundColor: primary.colors.bg }}>
            <h4 className="text-xs font-semibold mb-1" style={{ color: primary.colors.primary }}>Your Trading Style</h4>
            <p className="text-xs text-zinc-400">{primary.philosophy}</p>
          </div>

          {/* Score breakdown - top 6 */}
          <div className="mx-4 mb-4">
            <h4 className="text-xs text-zinc-500 mb-2">Top Matches</h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(result.scores)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 6)
                .map(([animal, score]) => {
                  const a = JUNGLE_ANIMALS[animal];
                  if (!a) return null;
                  const maxScore = RISK_ASSESSMENT_QUESTIONS.length * 3;
                  const pct = Math.round((score / maxScore) * 100);
                  return (
                    <div key={animal} className="text-center bg-[#0a0a0a] rounded-lg p-2">
                      {a.avatarPath ? (
                        <img src={a.avatarPath} alt={a.characterName} className="w-8 h-8 rounded-full object-cover mx-auto mb-1 border" style={{ borderColor: a.colors.primary }} />
                      ) : (
                        <div className="text-lg mb-1">{a.emoji}</div>
                      )}
                      <div className="w-full bg-zinc-800 rounded-full h-1 mb-0.5">
                        <div className="h-1 rounded-full" style={{ width: `${pct}%`, backgroundColor: a.colors.primary }} />
                      </div>
                      <div className="text-[10px] text-zinc-500">{pct}%</div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 mx-4">
            <button
              onClick={() => {
                if (result) {
                  setSelectedAnimal(result.primary as RiskProfile);
                  setCurrentView('animal-detail');
                }
              }}
              className="w-full bg-[#39ff14] text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
            >
              Meet {primary.characterName} <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('hub')}
              className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 text-zinc-300 py-3 rounded-xl text-sm active:scale-[0.97] transition-transform"
            >
              Explore All Animals
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============ QUESTION SCREEN ============
  return (
    <div className="pb-6">
      {/* Back */}
      <button
        onClick={() => setCurrentView('hub')}
        className="flex items-center gap-1 text-[#39ff14] text-sm mb-4 active:text-white"
      >
        <ArrowLeft className="w-4 h-4 text-[#39ff14]" /> Back
      </button>

      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-base font-bold text-zinc-100">Spirit Animal Quiz</h2>
        <p className="text-xs text-zinc-500">{totalQuestions} questions</p>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
          <span>Question {currentQuestion + 1} / {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-1.5">
          <div className="h-1.5 rounded-full bg-[#39ff14] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-sm font-semibold text-zinc-200 mb-4 leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-2 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={`w-full p-3 rounded-xl text-left transition-all border text-sm ${
              answers[currentQuestion] === idx
                ? 'border-[#39ff14] bg-[#39ff14]/10 text-zinc-100'
                : 'border-zinc-800 bg-[#0a0a0a] text-zinc-400'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  answers[currentQuestion] === idx
                    ? 'border-[#39ff14] bg-[#39ff14]'
                    : 'border-zinc-600'
                }`}
              >
                {answers[currentQuestion] === idx && (
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                )}
              </div>
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-1 text-sm text-zinc-400 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
          className="bg-[#39ff14] text-black font-semibold px-5 py-2 rounded-xl text-sm flex items-center gap-1 disabled:opacity-30 active:scale-[0.97] transition-transform"
        >
          {currentQuestion === totalQuestions - 1 ? 'See Results' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
