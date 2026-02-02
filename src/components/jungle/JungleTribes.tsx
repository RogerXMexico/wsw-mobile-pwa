import { ArrowLeft, Users, Shield } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

const TRIBES = [
  { id: 'lions', name: 'Lion Pride', emoji: '🦁', color: '#f59e0b', members: 142, xp: 45200, style: 'Aggressive Growth' },
  { id: 'wolves', name: 'Wolf Pack', emoji: '🐺', color: '#64748b', members: 128, xp: 41800, style: 'Patient Predator' },
  { id: 'bears', name: 'Bear Den', emoji: '🐻', color: '#f97316', members: 97, xp: 38500, style: 'Defensive Hedging' },
  { id: 'bulls', name: 'Bull Herd', emoji: '🐂', color: '#ef4444', members: 156, xp: 52100, style: 'Bullish Conviction' },
  { id: 'owls', name: 'Owl Parliament', emoji: '🦉', color: '#3b82f6', members: 113, xp: 43700, style: 'Analytical Edge' },
  { id: 'foxes', name: 'Fox Skulk', emoji: '🦊', color: '#a855f7', members: 105, xp: 39900, style: 'Cunning Strategy' },
];

export default function JungleTribes() {
  const { setCurrentView } = useJungle();

  return (
    <div className="pb-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentView('hub')} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-zinc-100">Jungle Tribes</h1>
          <p className="text-xs text-zinc-500">Join a tribe and compete as a team</p>
        </div>
      </div>

      <div className="space-y-3">
        {TRIBES.map((tribe, i) => (
          <button
            key={tribe.id}
            className="w-full bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4 text-left active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
                style={{ borderColor: tribe.color + '40', backgroundColor: tribe.color + '10' }}
              >
                {tribe.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-200">{tribe.name}</span>
                  {i === 0 && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-xs text-zinc-500">{tribe.style}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] text-zinc-500">
                    <Users className="w-3 h-3 inline mr-0.5" />{tribe.members}
                  </span>
                  <span className="text-[10px]" style={{ color: tribe.color }}>
                    {tribe.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
              <div className="text-lg font-bold text-zinc-600">#{i + 1}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center text-xs text-zinc-600 pt-4">
        🚧 Tribe system coming soon — compete with your pack!
      </div>
    </div>
  );
}
