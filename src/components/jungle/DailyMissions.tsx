import { ArrowLeft, Target, Lock } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

const SAMPLE_MISSIONS = [
  { id: 1, name: 'Complete 1 Strategy Lesson', xp: 25, icon: '📚', done: false },
  { id: 2, name: 'Pass a Quiz with 80%+', xp: 50, icon: '🎯', done: false },
  { id: 3, name: 'Review 3 Payoff Diagrams', xp: 15, icon: '📊', done: false },
  { id: 4, name: 'Visit Your Mentor', xp: 10, icon: '🐾', done: false },
];

const WEEKLY_MISSIONS = [
  { id: 10, name: 'Complete 5 Lessons', xp: 150, icon: '🏅', progress: '0/5' },
  { id: 11, name: 'Earn 200 XP', xp: 100, icon: '⚡', progress: '0/200' },
  { id: 12, name: '7-Day Streak', xp: 250, icon: '🔥', progress: '0/7' },
];

export default function DailyMissions() {
  const { setCurrentView } = useJungle();

  return (
    <div className="pb-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentView('hub')} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-zinc-100">Daily Missions</h1>
          <p className="text-xs text-zinc-500">Complete challenges to earn XP</p>
        </div>
      </div>

      {/* Daily */}
      <div>
        <h2 className="text-sm font-bold text-zinc-300 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-400" /> Today's Missions
        </h2>
        <div className="space-y-2">
          {SAMPLE_MISSIONS.map((m) => (
            <div key={m.id} className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 flex items-center gap-3">
              <div className="text-2xl">{m.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-zinc-200">{m.name}</div>
                <div className="text-[10px] text-[#39ff14]">+{m.xp} XP</div>
              </div>
              <Lock className="w-4 h-4 text-zinc-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Weekly */}
      <div>
        <h2 className="text-sm font-bold text-zinc-300 mb-2">📅 Weekly Challenges</h2>
        <div className="space-y-2">
          {WEEKLY_MISSIONS.map((m) => (
            <div key={m.id} className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 flex items-center gap-3">
              <div className="text-2xl">{m.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-zinc-200">{m.name}</div>
                <div className="text-[10px] text-zinc-500">{m.progress}</div>
              </div>
              <div className="text-xs text-[#39ff14] font-bold">+{m.xp}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-zinc-600 pt-4">
        🚧 Missions system coming soon — earn XP by learning!
      </div>
    </div>
  );
}
