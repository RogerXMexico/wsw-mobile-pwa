import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Flame, Swords } from 'lucide-react';
import { SOCIAL_SECTION, getStrategiesForSection } from '../utils/curriculum';

export default function SocialPage() {
  const navigate = useNavigate();
  const socialItems = getStrategiesForSection(SOCIAL_SECTION);

  const SOCIAL_CARDS = [
    { id: 'trading-feed', emoji: '📡', icon: Users, title: 'Trading Feed', desc: 'See live trades from the community', color: 'emerald' },
    { id: 'leaderboard', emoji: '🏆', icon: Trophy, title: 'Leaderboard', desc: 'Top traders this week', color: 'amber' },
    { id: 'daily-missions', emoji: '🎯', icon: Flame, title: 'Daily Missions', desc: 'Complete challenges for XP', color: 'orange' },
    { id: 'jungle-tribes', emoji: '🦁', icon: Swords, title: 'Jungle Tribes', desc: 'Join a tribe and compete', color: 'purple' },
    { id: 'badge-collection', emoji: '🎖️', icon: Trophy, title: 'Badge Collection', desc: 'Your earned badges and achievements', color: 'amber' },
  ];

  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🏟️ The Arena</h1>
        <p className="text-zinc-400 text-sm mt-1">Live trades, competitions & gamification</p>
      </div>

      <div className="space-y-3">
        {SOCIAL_CARDS.map(card => {
          const strategyItem = socialItems.find(s => s.id === card.id);
          return (
            <button
              key={card.id}
              onClick={() => strategyItem ? navigate(`/strategy/${card.id}`) : null}
              className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{card.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-sm">{card.title}</h2>
                  <p className="text-zinc-400 text-xs mt-0.5">{card.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Coming soon note */}
      <div className="mt-6 text-center">
        <p className="text-zinc-600 text-xs">Social features are rolling out — stay tuned 🐒</p>
      </div>
    </div>
  );
}
