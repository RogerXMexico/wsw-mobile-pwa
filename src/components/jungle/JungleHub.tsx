import { TreePalm, ChevronRight, Trophy, Award, Flame, Target, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';
import { JUNGLE_ANIMALS } from '../../data/jungleAnimals';
import XPBar from './XPBar';
import { JungleViewMode } from '../../types/jungle';

export default function JungleHub() {
  const {
    setCurrentView,
    setSelectedAnimal,
    riskProfile,
    assessmentCompleted,
    streakDays,
    earnedBadges,
  } = useJungle();

  // Tier 10 module definitions
  const tier10Modules: { id: JungleViewMode; name: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'leaderboard', name: 'Leaderboard', icon: <Trophy className="w-5 h-5 text-[#39ff14]" />, desc: 'See how you rank against other jungle traders' },
    { id: 'badges', name: 'Badge Collection', icon: <Award className="w-5 h-5 text-amber-400" />, desc: 'Your trophy case of trading achievements' },
    { id: 'daily-missions', name: 'Daily Missions', icon: <Target className="w-5 h-5 text-orange-400" />, desc: 'Complete daily challenges to earn XP' },
    { id: 'jungle-tribes', name: 'Jungle Tribes', icon: <Users className="w-5 h-5 text-purple-400" />, desc: 'Join a tribe and compete as a team' },
    { id: 'trading-feed', name: 'Trading Feed', icon: <MessageSquare className="w-5 h-5 text-cyan-400" />, desc: 'Share trades and learn from the community' },
    { id: 'challenge-paths', name: 'Challenge Paths', icon: <TrendingUp className="w-5 h-5 text-rose-400" />, desc: 'Performance tracking and challenge progression' },
  ];

  return (
    <div className="pb-4 space-y-5">
      {/* Header */}
      <div className="text-center pt-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <TreePalm className="w-6 h-6 text-[#39ff14]" />
          <h1 className="text-xl font-bold text-zinc-100">Jungle Academy</h1>
          <TreePalm className="w-6 h-6 text-[#39ff14]" />
        </div>
        <p className="text-xs text-zinc-500">Master options trading with animal mentors</p>
      </div>

      {/* XP Bar */}
      <div className="px-1">
        <XPBar />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 text-center">
          <Trophy className="w-5 h-5 text-[#39ff14] mx-auto mb-1" />
          <div className="text-lg font-bold text-zinc-200">{earnedBadges.length}</div>
          <div className="text-[10px] text-zinc-500">Badges</div>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-zinc-200">{streakDays}</div>
          <div className="text-[10px] text-zinc-500">Day Streak</div>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 text-center">
          <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-zinc-200">Lv.{Math.floor(earnedBadges.length / 3) + 1}</div>
          <div className="text-[10px] text-zinc-500">Rank</div>
        </div>
      </div>

      {/* Discover Your Spirit Animal */}
      {!assessmentCompleted ? (
        <button
          onClick={() => setCurrentView('assessment')}
          className="w-full bg-[#0a0a0a] border-2 border-[#39ff14]/30 rounded-xl p-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">🐾</div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-[#39ff14]">
                Discover Your Spirit Animal
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Take a quick quiz to find your trading style
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#39ff14]" />
          </div>
        </button>
      ) : riskProfile ? (
        <button
          onClick={() => {
            setSelectedAnimal(riskProfile);
            setCurrentView('animal-detail');
          }}
          className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            {JUNGLE_ANIMALS[riskProfile]?.avatarPath ? (
              <img
                src={JUNGLE_ANIMALS[riskProfile].avatarPath!}
                alt={JUNGLE_ANIMALS[riskProfile].characterName}
                className="w-12 h-12 rounded-full object-cover border-2"
                style={{ borderColor: JUNGLE_ANIMALS[riskProfile].colors.primary }}
              />
            ) : (
              <div className="text-3xl">{JUNGLE_ANIMALS[riskProfile]?.emoji}</div>
            )}
            <div className="flex-1">
              <div className="text-[10px] text-[#39ff14] font-medium uppercase tracking-wider mb-0.5">Your Spirit Animal</div>
              <div className="text-sm font-bold" style={{ color: JUNGLE_ANIMALS[riskProfile]?.colors.primary }}>
                {JUNGLE_ANIMALS[riskProfile]?.characterName} — {JUNGLE_ANIMALS[riskProfile]?.name}
              </div>
              <div className="text-xs text-zinc-400 italic">
                "{JUNGLE_ANIMALS[riskProfile]?.catchphrase}"
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentView('assessment');
              }}
              className="text-[10px] text-zinc-500 underline"
            >
              Retake
            </button>
          </div>
        </button>
      ) : null}

      {/* Choose Your Mentor — single module card */}
      <button
        onClick={() => setCurrentView('mentors')}
        className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4 text-left active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#39ff14]/10 flex items-center justify-center text-2xl">
            🌴
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-zinc-200">Choose Your Mentor</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              16 animal mentors, each with unique strategies
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500" />
        </div>
        {/* Mini avatar row preview */}
        <div className="flex gap-1 mt-3 overflow-hidden">
          {Object.values(JUNGLE_ANIMALS).slice(0, 8).map((a) => (
            a.avatarPath ? (
              <img
                key={a.id}
                src={a.avatarPath}
                alt={a.characterName}
                className="w-8 h-8 rounded-full object-cover border"
                style={{ borderColor: a.colors.primary + '60' }}
              />
            ) : (
              <div
                key={a.id}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm border"
                style={{ backgroundColor: a.colors.bg, borderColor: a.colors.primary + '60' }}
              >
                {a.emoji}
              </div>
            )
          ))}
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-medium">
            +8
          </div>
        </div>
      </button>

      {/* Tier 10 Modules */}
      <div>
        <h2 className="text-base font-bold text-zinc-200 mb-3">Let's Play</h2>
        <div className="space-y-2">
          {tier10Modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setCurrentView(mod.id)}
              className="w-full bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4 text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
                  {mod.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-zinc-200">{mod.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{mod.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
