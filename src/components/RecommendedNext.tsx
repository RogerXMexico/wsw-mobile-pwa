import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { LEARNING_PATHS, getPathModules } from '../data/learningPaths';
import { getTierBadgeColor } from '../utils/curriculum';

export default function RecommendedNext() {
  const navigate = useNavigate();
  const { selectedPath, completed, getNextRecommended } = useProgress();

  // No path selected — prompt to choose
  if (!selectedPath) {
    return (
      <button
        onClick={() => navigate('/')}
        className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left mb-4"
      >
        <p className="text-zinc-400 text-sm">
          🧭 <span className="text-[#39ff14] font-semibold">Choose a learning path</span> to get
          personalized recommendations
        </p>
      </button>
    );
  }

  const path = LEARNING_PATHS.find((p) => p.id === selectedPath);
  if (!path) return null;

  const modules = getPathModules(path);
  const completedInPath = modules.filter((s) => completed.has(s.id)).length;
  const progressPercent = modules.length > 0 ? (completedInPath / modules.length) * 100 : 0;

  const next = getNextRecommended();

  // All done!
  if (!next) {
    return (
      <div className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div className="flex-1">
            <p className="text-[#39ff14] font-semibold text-sm">Path Complete!</p>
            <p className="text-zinc-500 text-xs mt-0.5">
              You've finished {path.title}. {completedInPath}/{modules.length} modules done.
            </p>
          </div>
        </div>
        {/* Full progress bar */}
        <div className="mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#39ff14] rounded-full transition-all duration-500"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    );
  }

  const badgeColor = getTierBadgeColor(next.tier);

  return (
    <button
      onClick={() => navigate(`/strategy/${next.id}`)}
      className="w-full bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left mb-4"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">📍</span>
        <div className="flex-1 min-w-0">
          <p className="text-zinc-500 text-[11px] font-mono uppercase tracking-wider">Up Next</p>
          <p className="text-white font-semibold text-sm mt-0.5 truncate">{next.name}</p>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${badgeColor}`}>
          T{next.tier}
        </span>
      </div>
      {/* Progress bar */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#39ff14] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-zinc-500 text-[10px] font-mono tabular-nums">
          {completedInPath}/{modules.length}
        </span>
      </div>
    </button>
  );
}
