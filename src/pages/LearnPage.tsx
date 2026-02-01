import { useNavigate } from 'react-router-dom';
import { MODULES, getStrategiesForModule } from '../utils/curriculum';
import { useProgress } from '../contexts/ProgressContext';
import ProgressRing from '../components/ProgressRing';

export default function LearnPage() {
  const navigate = useNavigate();
  const { isCompleted } = useProgress();

  return (
    <div className="px-4 pt-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🐒 Options Jungle</h1>
        <p className="text-slate-400 text-sm mt-1">Your learning path through the wilderness</p>
      </div>

      {/* Module cards */}
      <div className="space-y-3">
        {MODULES.map((mod) => {
          const strategies = getStrategiesForModule(mod.id);
          const completedCount = strategies.filter(s => isCompleted(s.id)).length;
          const progress = strategies.length > 0 ? (completedCount / strategies.length) * 100 : 0;

          return (
            <button
              key={mod.id}
              onClick={() => navigate(`/module/${mod.id}`)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{mod.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-base">{mod.title}</h2>
                  <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{mod.description}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {completedCount}/{strategies.length} strategies
                  </p>
                </div>
                <ProgressRing progress={progress} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
