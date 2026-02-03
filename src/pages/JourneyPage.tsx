import { useState, useEffect } from 'react';
import { Target, ChevronRight } from 'lucide-react';

interface Props {
  onSelectPath: (pathId: string, startTier: number) => void;
  onSkip: () => void;
}

const paths = [
  {
    id: 'express-lane',
    title: 'Express Lane',
    subtitle: '30-minute crash course',
    description: 'Get the essentials fast. A condensed overview of key concepts to get you trading quickly.',
    avatarPath: '/assets/Cheetah Day Trader.webp',
    startTier: 0.5,
    color: 'yellow',
    modules: ['What Are Options', 'The Greeks', 'Risk Management'],
    estimatedTime: '30-60 minutes',
  },
  {
    id: 'beginner',
    title: 'Complete Beginner',
    subtitle: 'Never traded options before',
    description: 'Start from the absolute basics. Learn what options are, how they work, and execute your first trade.',
    avatarPath: '/assets/Capybara_Foliage_Refined.webp',
    startTier: 0,
    color: 'emerald',
    modules: ['The Foundation', 'First Trade Tutorial', 'Options Vocabulary'],
    estimatedTime: '2-3 weeks',
  },
  {
    id: 'some-experience',
    title: 'Some Experience',
    subtitle: 'Bought/sold a few options',
    description: 'You know the basics but want to go deeper. Learn strategy selection and position management.',
    avatarPath: '/assets/Tucan_Female_Closeup.webp',
    startTier: 3,
    color: 'amber',
    modules: ['The Anchors', 'Execution', 'Risk Management'],
    estimatedTime: '1-2 weeks',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    subtitle: 'Comfortable with spreads',
    description: 'Master advanced strategies. Dive into volatility plays, ratio spreads, and exotic structures.',
    avatarPath: '/assets/orangutan_old_money.webp',
    startTier: 5,
    color: 'violet',
    modules: ['Volatility Strategies', 'Time & Skew', 'Ratio Spreads'],
    estimatedTime: '3-4 weeks',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    subtitle: 'Expert in complex strategies',
    description: 'The most sophisticated approaches. Portfolio optimization and professional-grade tactics.',
    avatarPath: '/assets/Panther.webp',
    startTier: 7,
    color: 'red',
    modules: ['Portfolio Strategies', 'Alpha Generation', 'Risk Modeling'],
    estimatedTime: '4-6 weeks',
  },
];

const colorStyles: Record<string, { text: string; border: string; bg: string; glow: string; ring: string }> = {
  yellow:  { text: 'text-yellow-400',  border: 'border-yellow-500/30',  bg: 'bg-yellow-500/10',  glow: 'rgba(250,204,21,0.4)',  ring: 'rgba(250,204,21,0.6)' },
  emerald: { text: 'text-[#39ff14]',   border: 'border-[#39ff14]/30',   bg: 'bg-[#39ff14]/10',   glow: 'rgba(57,255,20,0.4)',   ring: 'rgba(57,255,20,0.6)' },
  amber:   { text: 'text-amber-400',   border: 'border-amber-500/30',   bg: 'bg-amber-500/10',   glow: 'rgba(245,158,11,0.4)',  ring: 'rgba(245,158,11,0.6)' },
  violet:  { text: 'text-violet-400',  border: 'border-violet-500/30',  bg: 'bg-violet-500/10',  glow: 'rgba(139,92,246,0.4)',  ring: 'rgba(139,92,246,0.6)' },
  red:     { text: 'text-red-400',     border: 'border-red-500/30',     bg: 'bg-red-500/10',     glow: 'rgba(239,68,68,0.4)',   ring: 'rgba(239,68,68,0.6)' },
};

export default function JourneyPage({ onSelectPath, onSkip }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className={`min-h-screen bg-black text-white overflow-y-auto transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(57,255,20,0.08),_black_70%)]" />
      </div>

      <div className="relative z-10 px-5 pt-14 pb-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 mb-5">
            <Target size={16} className="text-[#39ff14]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#39ff14]">Choose Your Path</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">WHERE ARE YOU</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] to-emerald-600">ON YOUR JOURNEY?</span>
          </h1>

          <p className="text-zinc-400 text-sm px-4">
            We'll guide you to the perfect starting point based on your experience.
          </p>
        </div>

        {/* Path Cards */}
        <div className="space-y-4 max-w-lg mx-auto">
          {paths.map((path) => {
            const c = colorStyles[path.color];
            return (
              <button
                key={path.id}
                onClick={() => {
                  localStorage.setItem('wsw-learning-path', path.id);
                  localStorage.setItem('wsw-start-tier', path.startTier.toString());
                  onSelectPath(path.id, path.startTier);
                }}
                className={`w-full text-left p-4 rounded-2xl bg-[#0a0a0a] border ${c.border} active:scale-[0.98] transition-all`}
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-20 h-20 rounded-full p-[2px]"
                      style={{ background: `linear-gradient(135deg, ${c.ring}, transparent)` }}
                    >
                      <div className="w-full h-full rounded-full bg-black p-[2px]">
                        <img
                          src={path.avatarPath}
                          alt={path.title}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold ${c.text}`}>{path.title}</h3>
                    <p className="text-zinc-500 text-xs font-mono mb-1.5">{path.subtitle}</p>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-3">{path.description}</p>

                    {/* Modules preview */}
                    <div className="space-y-1 mb-3">
                      {path.modules.map((mod, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <ChevronRight size={10} className={c.text} />
                          <span className="text-zinc-500 text-[11px]">{mod}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600 text-[10px]">⏱ {path.estimatedTime}</span>
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${c.bg} ${c.border} border`}>
                        <span className={`text-[10px] font-mono font-bold ${c.text}`}>START HERE</span>
                        <ChevronRight size={12} className={c.text} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skip */}
        <div className="text-center mt-8">
          <button
            onClick={onSkip}
            className="text-zinc-500 text-xs font-mono uppercase tracking-widest py-3 px-6"
          >
            Skip — Browse all content
          </button>
        </div>

        {/* Bottom note */}
        <div className="max-w-lg mx-auto mt-6 p-4 rounded-2xl bg-[#0a0a0a] border border-[#39ff14]/10">
          <p className="text-zinc-400 text-xs text-center">
            <span className="text-[#39ff14] font-bold">Don't worry</span> — you can always access any module regardless of which path you choose.
          </p>
        </div>
      </div>
    </div>
  );
}
