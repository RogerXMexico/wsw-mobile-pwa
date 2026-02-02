import { useNavigate } from 'react-router-dom';
import { STRATEGIES } from '../data/strategies';
import { useProgress } from '../contexts/ProgressContext';

interface ToolDef {
  id: string;
  emoji: string;
  route?: string;
}

interface CustomTool {
  emoji: string;
  name: string;
  desc: string;
  route: string;
}

const CUSTOM: Record<string, CustomTool> = {
  'greeks-viz': { emoji: '🔬', name: 'Greeks Visualizer', desc: 'Interactive Delta, Gamma, Theta, Vega charts + sensitivity analysis', route: '/tools/greeks' },
  'iv-crush': { emoji: '💥', name: 'IV Crush Simulator', desc: 'Simulate earnings IV crush — see how it destroys option value', route: '/tools/iv-crush' },
  'paper-trade': { emoji: '📝', name: 'Paper Trading', desc: 'Practice with $10K virtual cash and real-time scenarios', route: '/tools/paper-trading' },
  'rolling': { emoji: '🔄', name: 'Rolling & Adjusting', desc: 'Learn when and how to roll options positions', route: '/tools/rolling-guide' },
  'first-trade': { emoji: '🎯', name: 'Your First Trade', desc: 'Step-by-step guide to placing your first options trade', route: '/tools/first-trade' },
  'glossary': { emoji: '📖', name: 'Options Glossary', desc: 'Searchable dictionary with 50+ terms & flashcard mode', route: '/tools/glossary' },
};

const TOOL_SECTIONS: { title: string; tools: ToolDef[]; custom?: string[] }[] = [
  {
    title: '🧮 Calculators',
    tools: [
      { id: 'pop-calculator', emoji: '🎲', route: '/tools/pop' },
      { id: 'position-sizing-calculator', emoji: '📐', route: '/tools/position-size' },
      { id: 'expected-move', emoji: '📏', route: '/tools/expected-move' },
      { id: 'risk-reward-calculator', emoji: '⚖️', route: '/tools/risk-reward' },
    ],
  },
  {
    title: '📊 Analysis Tools',
    tools: [
      { id: 'strategy-comparison', emoji: '⚔️', route: '/tools/strategy-comparison' },
    ],
    custom: ['greeks-viz', 'iv-crush'],
  },
  {
    title: '🧪 Practice & Building',
    tools: [
      { id: 'strategy-builder', emoji: '🧪', route: '/tools/strategy-builder' },
      { id: 'trade-journal', emoji: '📓', route: '/tools/trade-journal' },
    ],
    custom: ['paper-trade'],
  },
  {
    title: '📚 Tutorials & Reference',
    tools: [],
    custom: ['rolling', 'first-trade', 'glossary'],
  },
  {
    title: '🔮 Event Horizons',
    tools: [
      { id: 'event-horizons-course', emoji: '🎓' },
      { id: 'event-horizons', emoji: '🔮' },
      { id: 'options-flow', emoji: '🌊' },
    ],
  },
];

export default function ToolsPage() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">🛠️ Tools</h1>
        <p className="text-zinc-400 text-sm mt-1">Your options trading toolkit</p>
      </div>

      {TOOL_SECTIONS.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="text-sm font-bold text-zinc-300 mb-2">{section.title}</h2>
          <div className="space-y-2">
            {/* Strategy-based tools */}
            {section.tools.map((toolDef) => {
              const strategy = STRATEGIES.find((s) => s.id === toolDef.id);
              if (!strategy) return null;
              return (
                <button
                  key={toolDef.id}
                  onClick={() => navigate(toolDef.route || `/strategy/${toolDef.id}`)}
                  className="w-full flex items-center gap-4 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4 active:scale-[0.98] transition-transform text-left"
                >
                  <span className="text-2xl">{toolDef.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{strategy.name}</p>
                    {strategy.objective && (
                      <p className="text-zinc-400 text-xs mt-0.5">{strategy.objective}</p>
                    )}
                  </div>
                  {toolDef.route && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#39ff14]/10 text-[#39ff14] font-medium">
                      INTERACTIVE
                    </span>
                  )}
                </button>
              );
            })}

            {/* Custom tools (not from strategies.ts) */}
            {section.custom?.map((key) => {
              const tool = CUSTOM[key];
              if (!tool) return null;
              return (
                <button
                  key={key}
                  onClick={() => navigate(tool.route)}
                  className="w-full flex items-center gap-4 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4 active:scale-[0.98] transition-transform text-left"
                >
                  <span className="text-2xl">{tool.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{tool.name}</p>
                    <p className="text-zinc-400 text-xs mt-0.5">{tool.desc}</p>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#39ff14]/10 text-[#39ff14] font-medium">
                    INTERACTIVE
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
