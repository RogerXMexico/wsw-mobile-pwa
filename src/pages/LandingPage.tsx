import { useState, useEffect } from 'react';
import { ArrowRight, GraduationCap, Coins, Shield, Activity, Compass, Layers, Zap, Target } from 'lucide-react';

interface Props {
  onEnter: () => void;
}

const features = [
  { title: 'Zero to Mastery', desc: 'No finance degree required. Step-by-step from first trade to expert.', icon: GraduationCap, color: 'emerald' },
  { title: 'Consistent Income', desc: 'Stop gambling. Learn systems to generate reliable monthly cash flow.', icon: Coins, color: 'yellow' },
  { title: 'Strategic Control', desc: 'Define your risk before you enter. Control 100 shares for a fraction.', icon: Compass, color: 'indigo' },
  { title: 'Risk First', desc: 'Master the art of defense. Survive the jungle to hunt another day.', icon: Shield, color: 'amber' },
  { title: 'The Greeks', desc: 'Visualize the math. See Delta, Gamma, Theta in action.', icon: Activity, color: 'cyan' },
  { title: 'Strategy Lab', desc: 'Build complex spreads and ratios. Test before you trade.', icon: Layers, color: 'purple' },
  { title: 'Volatility', desc: 'Master the crush. Sell fear when the jungle panics.', icon: Zap, color: 'pink' },
  { title: 'Market Structure', desc: 'Read the terrain. Hunt with the trend, not against it.', icon: Target, color: 'blue' },
  { title: 'Time & Skew', desc: 'Patience pays. Let time decay work for you.', icon: Layers, color: 'orange' },
];

const marqueeTexts = [
  'MOMENTUM IS A LIAR', 'PRICE PAYS', 'RESPECT THE RISK', 'DO NOT FIGHT THE FED',
  'CASH IS A POSITION', 'DISCIPLINE EQUALS FREEDOM', 'FEAR AND GREED MOVE MARKETS',
  'CUT LOSSES SHORT, LET WINNERS RUN', 'THE TREND IS YOUR FRIEND UNTIL THE END',
  'TIME DECAY WAITS FOR NO ONE', 'HOPE IS NOT A STRATEGY', 'PATIENCE IS A SUPERPOWER',
  'PLAN THE TRADE, TRADE THE PLAN', 'BE FEARFUL WHEN OTHERS ARE GREEDY',
];

const colorMap: Record<string, { text: string; border: string; bg: string }> = {
  emerald: { text: 'text-[#39ff14]', border: 'border-emerald-500/30', bg: 'bg-[#39ff14]/10' },
  yellow: { text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' },
  indigo: { text: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
  amber: { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  cyan: { text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  purple: { text: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  pink: { text: 'text-pink-500', border: 'border-pink-500/30', bg: 'bg-pink-500/10' },
  blue: { text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
  orange: { text: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10' },
};

export default function LandingPage({ onEnter }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className={`min-h-screen bg-black text-white overflow-y-auto transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_black_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pt-16 pb-20">
        {/* Hero */}
        <div className="text-center max-w-lg mx-auto mb-16 space-y-6">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center bg-black/50 overflow-hidden animate-float">
            <img src="/assets/lion_wsw.png" alt="WSW Logo" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-4xl font-black tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">OPTIONS</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]">
              UNIVERSITY
            </span>
          </h1>

          <p className="text-base text-zinc-300 leading-relaxed px-2">
            The jungle feeds the <span className="text-[#39ff14] font-semibold">prepared</span> and eats the <span className="text-rose-500 font-semibold">impulsive</span>.
          </p>

          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black border border-[#39ff14]/30 rounded-full overflow-hidden active:scale-[0.97] transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <div className="absolute inset-0 bg-[#39ff14]/10" />
            <span className="relative z-10 text-lg font-bold font-mono tracking-widest text-[#39ff14]">
              ENTER THE JUNGLE
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 text-[#39ff14] group-active:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="w-full max-w-lg space-y-3 mb-16">
          {features.map((f, i) => {
            const c = colorMap[f.color];
            const Icon = f.icon;
            return (
              <div key={i} className={`p-4 rounded-2xl bg-black/40 border ${c.border} flex items-start gap-4`}>
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 ${c.text}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${c.text}`}>{f.title}</h3>
                  <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="w-full max-w-lg mb-16">
          <h2 className="text-2xl font-black text-center text-white mb-6">SURVIVAL GUIDE</h2>
          <div className="space-y-3">
            {[
              { q: 'Do I need a finance degree?', a: 'Absolutely not. If you can understand a banana voucher, you can understand a call option.' },
              { q: 'Is this gambling?', a: "Only if you treat it that way. We teach you to be the casino—managing risk, probabilities, and edge." },
              { q: 'How much capital do I need?', a: 'You can start learning with $0 (Paper Trading). Spreads let you trade with defined risk on small accounts.' },
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#0a0a0a]/80 border border-[#39ff14]/20">
                <h3 className="text-sm font-bold text-white mb-1">{faq.q}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mb-16">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full border-2 border-[#39ff14]/30 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <img src="/assets/monkey.png" alt="WSW Monkey" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-black text-white mb-6">
            BECOME A <span className="text-pink-500 drop-shadow-[0_0_20px_rgba(255,20,147,0.8)]">BEAST</span> OF AN INVESTOR
          </h2>
          <button
            onClick={onEnter}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-black border border-[#39ff14]/30 rounded-full active:scale-[0.97] transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <span className="text-lg font-bold font-mono tracking-widest text-[#39ff14]">ENTER THE JUNGLE</span>
            <ArrowRight className="w-5 h-5 text-[#39ff14]" />
          </button>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mb-20">
          <a href="https://www.youtube.com/@WallStreetWildlife" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600/10 border border-red-500/30 rounded-xl text-red-400 font-bold text-sm tracking-wider">
            YOUTUBE
          </a>
          <a href="https://www.patreon.com/wallstreetwildlife" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 bg-orange-600/10 border border-orange-500/30 rounded-xl text-orange-400 font-bold text-sm tracking-wider">
            PATREON
          </a>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/95 border-t border-white/10 flex items-center overflow-hidden z-50">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          {[...marqueeTexts, ...marqueeTexts].map((t, i) => (
            <span key={i}>✦ {t}</span>
          ))}
        </div>
      </div>

      <style>{`
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-marquee { animation: marquee 60s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
