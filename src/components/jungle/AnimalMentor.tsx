import { JungleAnimal } from '../../types/jungle';

interface Props {
  animal: JungleAnimal;
  messageType: keyof JungleAnimal['dialogues'];
  customMessage?: string;
}

export default function AnimalMentor({ animal, messageType, customMessage }: Props) {
  const message = customMessage || animal.dialogues[messageType];

  return (
    <div
      className="rounded-xl p-3 relative"
      style={{ background: `linear-gradient(135deg, ${animal.colors.bg}, transparent)` }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          {animal.avatarPath ? (
            <img
              src={animal.avatarPath}
              alt={animal.characterName}
              className="w-10 h-10 rounded-full object-cover border-2"
              style={{ borderColor: animal.colors.primary }}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2"
              style={{ backgroundColor: animal.colors.bg, borderColor: animal.colors.primary }}
            >
              {animal.emoji}
            </div>
          )}
        </div>

        {/* Speech Bubble */}
        <div className="flex-1 min-w-0">
          <div
            className="rounded-xl rounded-tl-none p-3"
            style={{ backgroundColor: animal.colors.primary + '15', borderLeft: `2px solid ${animal.colors.primary}` }}
          >
            <div className="text-[10px] font-medium mb-0.5" style={{ color: animal.colors.primary }}>
              {animal.characterName} says:
            </div>
            <p className="text-xs text-zinc-400 italic">"{message}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
