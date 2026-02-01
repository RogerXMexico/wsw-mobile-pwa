import { useNavigate } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { TOOLS_SECTION, getStrategiesForSection } from '../utils/curriculum';
import StrategyCard from '../components/StrategyCard';
import { useProgress } from '../contexts/ProgressContext';

const TOOL_EMOJIS: Record<string, string> = {
  'trade-journal': '📓',
  'risk-reward-calculator': '⚖️',
  'position-sizing-calculator': '📐',
  'pop-calculator': '🎲',
  'expected-move': '📏',
  'options-screener': '🔍',
  'strategy-lab': '🧪',
  'paper-trading': '📝',
  'options-encyclopedia': '📖',
};

export default function ToolsPage() {
  const navigate = useNavigate();
  const { isCompleted } = useProgress();
  const tools = getStrategiesForSection(TOOLS_SECTION);

  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🛠️ Tools</h1>
        <p className="text-slate-400 text-sm mt-1">Your options trading toolkit</p>
      </div>

      <div className="space-y-2">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => navigate(`/strategy/${tool.id}`)}
            className="w-full flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4 active:scale-[0.98] transition-transform text-left"
          >
            <span className="text-2xl">{TOOL_EMOJIS[tool.id] || '🔧'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">{tool.name}</p>
              {tool.objective && (
                <p className="text-slate-400 text-xs mt-0.5">{tool.objective}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Wrench className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>Tools coming soon</p>
        </div>
      )}
    </div>
  );
}
