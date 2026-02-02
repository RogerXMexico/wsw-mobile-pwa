import { ArrowLeft, TrendingUp, CheckCircle, Lock, ChevronRight } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

const PATHS = [
  {
    id: 'income',
    name: 'Income Generator',
    emoji: '💰',
    color: '#22c55e',
    desc: 'Master premium-selling strategies',
    steps: ['Covered Calls', 'Cash-Secured Puts', 'Iron Condors', 'Jade Lizards', 'Short Strangles'],
    completed: 0,
  },
  {
    id: 'directional',
    name: 'Directional Trader',
    emoji: '🎯',
    color: '#3b82f6',
    desc: 'Learn to profit from big moves',
    steps: ['Long Calls/Puts', 'Vertical Spreads', 'Backspreads', 'Synthetic Futures', 'LEAPS'],
    completed: 0,
  },
  {
    id: 'volatility',
    name: 'Volatility Hunter',
    emoji: '🌪️',
    color: '#a855f7',
    desc: 'Trade volatility like a pro',
    steps: ['Straddles', 'Strangles', 'Butterflies', 'Calendars', 'Diagonals'],
    completed: 0,
  },
  {
    id: 'hedger',
    name: 'Risk Manager',
    emoji: '🛡️',
    color: '#f59e0b',
    desc: 'Protect your portfolio like a bear',
    steps: ['Protective Puts', 'Collars', 'Put Spreads', 'Ratio Hedges', 'Portfolio Insurance'],
    completed: 0,
  },
];

export default function ChallengePaths() {
  const { setCurrentView } = useJungle();

  return (
    <div className="pb-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentView('hub')} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-zinc-100">Challenge Paths</h1>
          <p className="text-xs text-zinc-500">Structured progression tracks</p>
        </div>
      </div>

      <div className="space-y-3">
        {PATHS.map((path) => (
          <div key={path.id} className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl border"
                style={{ borderColor: path.color + '40', backgroundColor: path.color + '10' }}
              >
                {path.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-zinc-200">{path.name}</h3>
                <p className="text-xs text-zinc-500">{path.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </div>

            {/* Progress bar */}
            <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2">
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${(path.completed / path.steps.length) * 100}%`, backgroundColor: path.color }}
              />
            </div>

            {/* Steps */}
            <div className="flex flex-wrap gap-1">
              {path.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border"
                  style={{
                    borderColor: i < path.completed ? path.color + '60' : '#3f3f4630',
                    color: i < path.completed ? path.color : '#71717a',
                    backgroundColor: i < path.completed ? path.color + '10' : 'transparent',
                  }}
                >
                  {i < path.completed ? (
                    <CheckCircle className="w-2.5 h-2.5" />
                  ) : (
                    <Lock className="w-2.5 h-2.5" />
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-[#39ff14]" />
          <h3 className="text-sm font-bold text-zinc-200">Performance Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">0</div>
            <div className="text-[10px] text-zinc-500">Paths Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">0/20</div>
            <div className="text-[10px] text-zinc-500">Total Steps</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">—</div>
            <div className="text-[10px] text-zinc-500">Avg Quiz Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-zinc-200">—</div>
            <div className="text-[10px] text-zinc-500">Best Streak</div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-600 pt-4">
        🚧 Challenge tracking coming soon — level up your skills!
      </div>
    </div>
  );
}
