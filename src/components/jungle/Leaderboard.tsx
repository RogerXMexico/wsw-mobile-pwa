import { Trophy, Medal, Crown, ArrowLeft, User } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';
import { JUNGLE_ANIMALS } from '../../data/jungleAnimals';
import { getLevelForXP } from '../../data/jungleBadges';
import { RiskProfile } from '../../types/jungle';

// Mock leaderboard data (no Supabase in mobile)
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'WallStreetWolf', xp: 24500, level: 9, animal: 'wolf' as RiskProfile, badges: 18 },
  { rank: 2, name: 'ThetaGang_Steve', xp: 19200, level: 8, animal: 'sloth' as RiskProfile, badges: 15 },
  { rank: 3, name: 'OptionsNinja', xp: 15800, level: 7, animal: 'cheetah' as RiskProfile, badges: 12 },
  { rank: 4, name: 'SpreadQueen', xp: 12400, level: 7, animal: 'fox' as RiskProfile, badges: 11 },
  { rank: 5, name: 'IronCondorKing', xp: 10200, level: 6, animal: 'owl' as RiskProfile, badges: 9 },
  { rank: 6, name: 'DeltaNeutral', xp: 8700, level: 6, animal: 'dolphin' as RiskProfile, badges: 8 },
  { rank: 7, name: 'GammaScalper', xp: 7500, level: 5, animal: 'kangaroo' as RiskProfile, badges: 7 },
  { rank: 8, name: 'PremiumCollector', xp: 6200, level: 5, animal: 'panda' as RiskProfile, badges: 6 },
  { rank: 9, name: 'SwingTrader420', xp: 5100, level: 5, animal: 'monkey' as RiskProfile, badges: 5 },
  { rank: 10, name: 'BullishBertha', xp: 4300, level: 4, animal: 'bull' as RiskProfile, badges: 4 },
];

export default function Leaderboard() {
  const { progress, setCurrentView } = useJungle();
  const userLevel = getLevelForXP(progress.xp);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-zinc-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="text-xs text-zinc-500 font-bold">#{rank}</span>;
  };

  // Find where user would rank
  const userRank = MOCK_LEADERBOARD.filter(e => e.xp > progress.xp).length + 1;

  return (
    <div className="pb-6 space-y-4">
      {/* Back */}
      <button onClick={() => setCurrentView('hub')} className="flex items-center gap-1 text-[#39ff14] text-sm active:text-white">
        <ArrowLeft className="w-4 h-4 text-[#39ff14]" /> Back
      </button>

      {/* Header */}
      <div className="text-center">
        <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-1" />
        <h1 className="text-lg font-bold text-zinc-100">Leaderboard</h1>
        <p className="text-xs text-zinc-500">Top jungle traders</p>
      </div>

      {/* Your Rank */}
      <div className="bg-[#0a0a0a] border-2 border-[#39ff14]/30 rounded-xl p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#39ff14]/20 flex items-center justify-center">
            <span className="text-[#39ff14] text-xs font-bold">#{userRank}</span>
          </div>
          {progress.riskProfile && JUNGLE_ANIMALS[progress.riskProfile] ? (
            JUNGLE_ANIMALS[progress.riskProfile].avatarPath ? (
              <img
                src={JUNGLE_ANIMALS[progress.riskProfile].avatarPath!}
                alt="You"
                className="w-8 h-8 rounded-full object-cover border"
                style={{ borderColor: JUNGLE_ANIMALS[progress.riskProfile].colors.primary }}
              />
            ) : (
              <span className="text-xl">{JUNGLE_ANIMALS[progress.riskProfile].emoji}</span>
            )
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-500" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[#39ff14]">You</div>
            <div className="text-[10px] text-zinc-500">Level {userLevel.level} • {progress.earnedBadges.length} badges</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-[#39ff14]">{progress.xp.toLocaleString()}</div>
            <div className="text-[10px] text-zinc-500">XP</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-1.5">
        {MOCK_LEADERBOARD.map(entry => {
          const animal = JUNGLE_ANIMALS[entry.animal];
          const isTop3 = entry.rank <= 3;
          return (
            <div
              key={entry.rank}
              className={`bg-[#0a0a0a] rounded-xl p-3 border transition-all ${
                isTop3 ? 'border-amber-500/20' : 'border-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 flex items-center justify-center shrink-0">
                  {getRankIcon(entry.rank)}
                </div>
                {animal?.avatarPath ? (
                  <img
                    src={animal.avatarPath}
                    alt={entry.name}
                    className="w-8 h-8 rounded-full object-cover border shrink-0"
                    style={{ borderColor: animal.colors.primary }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg border shrink-0"
                    style={{ backgroundColor: animal?.colors.bg, borderColor: animal?.colors.primary }}
                  >
                    {animal?.emoji || '?'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-200 truncate">{entry.name}</div>
                  <div className="text-[10px] text-zinc-500">Lvl {entry.level} • {entry.badges} badges</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-zinc-300">{entry.xp.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-500">XP</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
