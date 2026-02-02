import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { RISK_ASSESSMENT_QUESTIONS } from '../data/jungleQuizzes';
import { JUNGLE_ANIMALS } from '../data/jungleAnimals';

type AnimalKey = 'sloth' | 'badger' | 'monkey' | 'cheetah';

const ANIMAL_MAP: Record<AnimalKey, string> = {
  sloth: 'turtle',    // Conservative → Turtle
  badger: 'owl',      // Analytical → Owl
  monkey: 'monkey',   // Balanced → Monkey
  cheetah: 'cheetah', // Aggressive → Cheetah
};

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<AnimalKey, number>>({ sloth: 0, badger: 0, monkey: 0, cheetah: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const questions = RISK_ASSESSMENT_QUESTIONS.slice(0, 7); // First 7 questions
  const question = questions[currentQ];

  const handleSelect = (optionIdx: number) => {
    setSelected(optionIdx);
    const option = question.options[optionIdx];

    // Add scores
    const newScores = { ...scores };
    (Object.entries(option.scores) as [AnimalKey, number][]).forEach(([key, val]) => {
      if (val !== undefined) newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);

    // Auto-advance after delay
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        // Find winner
        const winner = (Object.entries(newScores) as [AnimalKey, number][])
          .sort((a, b) => b[1] - a[1])[0][0];
        setResult(ANIMAL_MAP[winner]);
      }
    }, 600);
  };

  // Result screen
  if (result) {
    const animal = JUNGLE_ANIMALS[result];
    if (!animal) return null;

    return (
      <div className="min-h-screen bg-black px-6 py-12 flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">{animal.emoji}</div>
        <h2 className="text-2xl font-bold text-white mb-2">You're {animal.name}!</h2>
        <p className="text-[#39ff14] font-medium mb-4">{animal.characterName}</p>
        <p className="text-zinc-400 text-sm text-center mb-8 max-w-sm leading-relaxed">
          {animal.personality}
        </p>
        <p className="text-amber-400 text-sm italic mb-8">"{animal.catchphrase}"</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-[#39ff14] text-black text-white font-semibold rounded-xl active:scale-95 transition-transform"
        >
          <Sparkles className="w-4 h-4" />
          Start Learning
        </button>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen bg-black px-4 pb-8" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-[#39ff14] mb-6 active:text-white min-h-[44px]"
      >
        <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        <span className="text-sm">Back</span>
      </button>

      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= currentQ ? 'bg-[#39ff14]' : 'bg-zinc-900'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="mb-8">
        <p className="text-xs text-zinc-500 mb-2">Question {currentQ + 1} of {questions.length}</p>
        <h2 className="text-lg font-semibold text-white leading-relaxed">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selected === null ? handleSelect(i) : undefined}
            className={`w-full text-left p-4 rounded-xl border transition-all text-sm leading-relaxed ${
              selected === i
                ? 'bg-[#39ff14] text-black/20 border-emerald-500/40 text-emerald-300'
                : selected !== null
                ? 'bg-[#0a0a0a]/80 border-[#39ff14]/10 text-zinc-500'
                : 'bg-[#0a0a0a] border-[#39ff14]/20 text-zinc-300 active:border-emerald-500/30'
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
