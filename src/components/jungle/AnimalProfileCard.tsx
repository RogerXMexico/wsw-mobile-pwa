import { Star, CheckCircle } from 'lucide-react';
import { JungleAnimal, RiskProfile } from '../../types/jungle';
import { useJungle } from '../../contexts/JungleContext';

interface Props {
  animal: JungleAnimal;
}

export default function AnimalProfileCard({ animal }: Props) {
  const { setCurrentView, setSelectedAnimal, getAnimalProgress, riskProfile } = useJungle();

  const progress = getAnimalProgress(animal.id as RiskProfile);
  const isRecommended = riskProfile === animal.id;
  const isComplete = progress.percentage === 100;

  const handleClick = () => {
    setSelectedAnimal(animal.id as RiskProfile);
    setCurrentView('animal-detail');
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-full bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4 text-left active:scale-[0.98] transition-transform"
    >
      {/* Badges */}
      {isRecommended && (
        <div
          className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5"
          style={{ backgroundColor: animal.colors.primary + '30', color: animal.colors.primary }}
        >
          <Star className="w-2.5 h-2.5 fill-current" />
          Match
        </div>
      )}
      {isComplete && (
        <div className="absolute top-2 left-2">
          <CheckCircle className="w-4 h-4 text-[#39ff14]" />
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          {animal.avatarPath ? (
            <img
              src={animal.avatarPath}
              alt={animal.characterName}
              className="w-14 h-14 rounded-full object-cover border-2"
              style={{ borderColor: animal.colors.primary }}
            />
          ) : (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
              style={{ backgroundColor: animal.colors.bg, borderColor: animal.colors.primary }}
            >
              {animal.emoji}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-zinc-200 text-sm truncate">{animal.characterName}</span>
            <span className="text-base">{animal.emoji}</span>
          </div>
          <div className="text-xs truncate" style={{ color: animal.colors.primary }}>
            {animal.name}
          </div>

          {/* Risk Stars */}
          <div className="flex items-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < animal.riskStars ? 'fill-current' : ''}`}
                style={{ color: i < animal.riskStars ? animal.colors.primary : '#3f3f46' }}
              />
            ))}
            <span className="text-[10px] text-zinc-500 ml-1 capitalize">{animal.riskLevel}</span>
          </div>

          {/* Progress */}
          <div className="mt-1.5">
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all"
                style={{ width: `${progress.percentage}%`, backgroundColor: animal.colors.primary }}
              />
            </div>
            <span className="text-[10px] text-zinc-500">
              {progress.completed}/{progress.total} strategies
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
