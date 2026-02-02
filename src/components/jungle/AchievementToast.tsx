import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { JungleBadge } from '../../types/jungle';
import { RARITY_COLORS } from '../../data/jungleBadges';

interface Props {
  badge: JungleBadge;
  onDismiss: () => void;
}

export default function AchievementToast({ badge, onDismiss }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const rarityStyle = RARITY_COLORS[badge.rarity];

  useEffect(() => {
    const show = setTimeout(() => setIsVisible(true), 50);
    const dismiss = setTimeout(() => handleDismiss(), 5000);
    return () => { clearTimeout(show); clearTimeout(dismiss); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(onDismiss, 300);
  };

  return (
    <div className={`fixed bottom-20 left-4 right-4 z-[100] transition-all duration-300 ${
      isVisible && !isLeaving ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className={`bg-[#0a0a0a] rounded-xl p-4 border-2 ${rarityStyle.border} relative overflow-hidden`}>
        <div className={`absolute inset-0 ${rarityStyle.bg} animate-pulse`} />
        <div className="absolute top-2 left-2 animate-ping">
          <Sparkles className={`w-3 h-3 ${rarityStyle.text}`} />
        </div>
        <button onClick={handleDismiss} className="absolute top-2 right-2 text-zinc-500 z-10">
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 flex items-center gap-3">
          <div className="text-4xl animate-bounce shrink-0">{badge.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-[#39ff14] font-medium">Achievement Unlocked!</div>
            <div className="text-sm font-bold text-zinc-100 truncate">{badge.name}</div>
            <div className="text-xs text-zinc-400 truncate">{badge.description}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${rarityStyle.bg} ${rarityStyle.text} capitalize`}>{badge.rarity}</span>
              <span className="text-[10px] text-[#39ff14]">+{badge.xpReward} XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
