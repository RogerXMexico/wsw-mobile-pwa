import { useNavigate } from 'react-router-dom';
import { RULES_SECTIONS, getStrategiesForSection } from '../utils/curriculum';
import { useProgress } from '../contexts/ProgressContext';
import ProgressRing from '../components/ProgressRing';

export default function RulesPage() {
  const navigate = useNavigate();
  const { isCompleted } = useProgress();

  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">📜 Rules of the Jungle</h1>
        <p className="text-slate-400 text-sm mt-1">Learn the foundations before you trade</p>
      </div>

      {/* Section cards */}
      <div className="space-y-3">
        {RULES_SECTIONS.map((section) => {
          const strategies = getStrategiesForSection(section);
          const completedCount = strategies.filter(s => isCompleted(s.id)).length;
          const progress = strategies.length > 0 ? (completedCount / strategies.length) * 100 : 0;

          return (
            <button
              key={section.id}
              onClick={() => navigate(`/section/${section.id}`)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{section.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-semibold text-base">{section.title}</h2>
                  <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{section.description}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {completedCount}/{strategies.length} lessons
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
