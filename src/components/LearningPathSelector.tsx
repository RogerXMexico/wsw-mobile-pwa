import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { LEARNING_PATHS, LearningPath } from '../data/learningPaths';

const colorMap: Record<string, { text: string; border: string; bg: string; badge: string }> = {
  emerald: {
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-900/50 text-emerald-400',
  },
  yellow: {
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    badge: 'bg-yellow-900/50 text-yellow-400',
  },
  amber: {
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-900/50 text-amber-400',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    badge: 'bg-purple-900/50 text-purple-400',
  },
  red: {
    text: 'text-red-400',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    badge: 'bg-red-900/50 text-red-400',
  },
};

function tierRangeLabel(tiers: number[]): string {
  const min = Math.min(...tiers);
  const max = Math.max(...tiers);
  if (min === max) return `Tier ${min}`;
  return `Tiers ${min}–${max}`;
}

function PathCard({ path }: { path: LearningPath }) {
  const { setSelectedPath } = useProgress();
  const navigate = useNavigate();
  const c = colorMap[path.color] || colorMap.emerald;

  return (
    <button
      onClick={() => {
        setSelectedPath(path.id);
        navigate('/');
      }}
      className={`w-full text-left bg-[#0a0a0a] border ${c.border} rounded-2xl p-5 active:scale-[0.98] transition-transform`}
    >
      <div className="flex items-start gap-4">
        {/* Animal Avatar */}
        <img
          src={path.imagePath}
          alt={path.title}
          className={`w-32 h-32 rounded-2xl object-cover border-2 flex-shrink-0 ${c.border}`}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold ${c.text}`}>{path.title}</h3>
          <p className="text-zinc-500 text-xs font-mono mt-0.5">{path.subtitle}</p>
          <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{path.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-3">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${c.badge}`}>
              {tierRangeLabel(path.tierSequence)}
            </span>
            <span className="text-zinc-600 text-[11px]">⏱ {path.estimatedTime}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function LearningPathSelector() {
  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">🧭 Choose Your Path</h1>
        <p className="text-zinc-400 text-sm mt-2">
          Select a learning path based on your experience level.
          <br />
          You can change it anytime.
        </p>
      </div>

      {/* Path cards */}
      <div className="space-y-3 max-w-lg mx-auto">
        {LEARNING_PATHS.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </div>
  );
}
