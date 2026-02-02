import { Star, CheckCircle, Play, ArrowLeft, BookOpen, AlertTriangle } from 'lucide-react';
import { RiskProfile } from '../../types/jungle';
import { JUNGLE_ANIMALS } from '../../data/jungleAnimals';
import { getStrategiesByAnimal } from '../../data/jungleStrategies';
import { useJungle } from '../../contexts/JungleContext';
import AnimalMentor from './AnimalMentor';

interface Props {
  animalId: RiskProfile;
}

export default function AnimalDetail({ animalId }: Props) {
  const { setCurrentView, setSelectedStrategy, progress, getAnimalProgress } = useJungle();

  const animal = JUNGLE_ANIMALS[animalId];
  const strategies = getStrategiesByAnimal(animalId);
  const animalProgress = getAnimalProgress(animalId);

  if (!animal) return <div className="text-zinc-400 p-4">Animal not found</div>;

  return (
    <div className="pb-6 space-y-4">
      {/* Back */}
      <button
        onClick={() => setCurrentView('hub')}
        className="flex items-center gap-1 text-[#39ff14] text-sm active:text-white"
      >
        <ArrowLeft className="w-4 h-4 text-[#39ff14]" /> Back
      </button>

      {/* Header */}
      <div className="text-center">
        {animal.avatarPath ? (
          <img
            src={animal.avatarPath}
            alt={animal.characterName}
            className="w-24 h-24 rounded-full object-cover border-4 mx-auto mb-3"
            style={{ borderColor: animal.colors.primary, boxShadow: `0 0 20px ${animal.colors.primary}30` }}
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4 mx-auto mb-3"
            style={{ backgroundColor: animal.colors.bg, borderColor: animal.colors.primary }}
          >
            {animal.emoji}
          </div>
        )}

        <h1 className="text-xl font-bold text-zinc-100">{animal.characterName}</h1>
        <h2 className="text-sm font-medium" style={{ color: animal.colors.primary }}>{animal.name}</h2>

        {/* Risk Stars */}
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < animal.riskStars ? 'fill-current' : ''}`}
              style={{ color: i < animal.riskStars ? animal.colors.primary : '#3f3f46' }}
            />
          ))}
          <span className="text-xs text-zinc-500 ml-1 capitalize">{animal.riskLevel}</span>
        </div>

        <p className="text-xs text-zinc-400 italic mt-2">"{animal.catchphrase}"</p>

        {/* Warning */}
        {animal.warningMessage && (
          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 mt-3 mx-2 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span className="text-xs text-amber-400">{animal.warningMessage}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-3 px-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-zinc-500">Progress</span>
            <span style={{ color: animal.colors.primary }}>
              {animalProgress.completed}/{animalProgress.total} strategies
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${animalProgress.percentage}%`, backgroundColor: animal.colors.primary }}
            />
          </div>
        </div>
      </div>

      {/* Mentor Greeting */}
      <AnimalMentor animal={animal} messageType="greeting" />

      {/* About */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-zinc-200 mb-2 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" style={{ color: animal.colors.primary }} />
          Teaching Style
        </h3>
        <p className="text-xs text-zinc-400 mb-3">{animal.teachingStyle}</p>
        <h4 className="text-xs font-semibold text-zinc-300 mb-1">Philosophy</h4>
        <p className="text-xs text-zinc-400">{animal.philosophy}</p>
      </div>

      {/* Strategies */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-200 mb-2">
          {animal.characterName}'s Strategies
        </h3>
        <div className="space-y-2">
          {strategies.map((strategy, index) => {
            const isCompleted = progress.completedStrategies.includes(strategy.id);
            const quizScore = progress.quizScores[strategy.id];

            return (
              <button
                key={strategy.id}
                onClick={() => {
                  setSelectedStrategy(strategy.id);
                  setCurrentView('strategy-lesson');
                }}
                className="w-full bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 text-left active:scale-[0.98] transition-transform"
                style={isCompleted ? { borderColor: animal.colors.primary + '40' } : undefined}
              >
                <div className="flex items-center gap-3">
                  {/* Number / Check */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      isCompleted ? '' : 'bg-zinc-800 text-zinc-500'
                    }`}
                    style={isCompleted ? { backgroundColor: animal.colors.primary + '30', color: animal.colors.primary } : undefined}
                  >
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-200 truncate">{strategy.name}</div>
                    <div className="text-xs text-zinc-500 truncate">{strategy.description}</div>
                    {/* Difficulty dots */}
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: i < strategy.difficulty ? animal.colors.primary : '#27272a' }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quiz score */}
                  {quizScore && (
                    <div className="text-right shrink-0">
                      <div className={`text-[10px] font-medium ${quizScore.passed ? 'text-[#39ff14]' : 'text-zinc-500'}`}>
                        {quizScore.bestScore}/{quizScore.total}
                      </div>
                    </div>
                  )}

                  <Play className="w-4 h-4 text-zinc-600 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
