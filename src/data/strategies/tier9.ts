import { Strategy } from '../../types';

// Special/Placeholder - Tier 9
export const TIER_9_STRATEGIES: Strategy[] = [
    {
        id: 'trade-journal',
        name: 'Trade Journal',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Self-Improvement',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="trade-journal-hero border border-amber-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-amber-900/10 cursor-pointer" style="transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s ease;">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="journal-icon-circle w-28 h-28 rounded-full border-4 border-amber-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all duration-300">
                        <svg class="w-14 h-14 text-amber-400" style="filter: drop-shadow(0 0 12px rgba(251,191,36,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-amber-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Trade Journal
                    </div>
                    <p class="journal-quote text-2xl md:text-4xl font-serif italic text-white leading-tight transition-all duration-300 gold-sweep-simple">"What you don't track, you can't improve. What you don't review, you're doomed to repeat."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A pilot's logbook. Every flight, every decision, every outcome—recorded and reviewed. The journal is how you become an ace.",
        nuance: "<b>Pattern Recognition:</b> Your journal reveals truths you can't see in the moment. Over time, patterns emerge—your edge, your blind spots, your path to mastery.",
        example: ""
    },,
    {
        id: 'risk-reward-calculator',
        name: 'Risk-Reward Calculator',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Risk Management',
        risk: 'None',
        legs: [],
        analysis: `
        <div class="border border-amber-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-amber-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-amber-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                        <span class="text-6xl filter drop-shadow-md"><svg class="w-14 h-14 text-cyan-400 inline-block" style="filter: drop-shadow(0 0 12px rgba(34,211,238,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="3" y2="21"/><path d="m4 7 4 10 4-10"/><path d="m12 7 4 10 4-10"/><circle cx="4" cy="17" r="3"/><circle cx="20" cy="17" r="3"/></svg></span>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-amber-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Wall Street Wildlife
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"Risk is not the enemy. Ignorance of risk is."</p>
                </div>
            </div>
        </div>

        <div class="space-y-12">
            <div class="bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/30 p-8 rounded-[2rem] relative overflow-hidden">
                <h3 class="text-2xl font-black text-amber-400 mb-6 uppercase">Options Risk-Reward Calculator</h3>
                <p class="text-slate-300 mb-8">Before entering any trade, the jungle demands you know your numbers. Use this calculator to determine your position size, maximum risk, and reward potential.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <h4 class="text-lg font-bold text-white">Key Metrics to Calculate</h4>
                        <ul class="space-y-3 text-slate-300">
                            <li class="flex gap-3 items-start"><span class="text-amber-400">►</span><span><b>Max Loss:</b> The most you can lose on the trade (premium paid for debit spreads)</span></li>
                            <li class="flex gap-3 items-start"><span class="text-amber-400">►</span><span><b>Max Gain:</b> The most you can profit (spread width minus premium for debit spreads)</span></li>
                            <li class="flex gap-3 items-start"><span class="text-amber-400">►</span><span><b>Breakeven:</b> The price where you neither win nor lose</span></li>
                            <li class="flex gap-3 items-start"><span class="text-amber-400">►</span><span><b>Risk/Reward Ratio:</b> How much you risk to make $1 of profit</span></li>
                        </ul>
                    </div>
                    <div class="bg-black/30 p-6 rounded-2xl border border-white/5">
                        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">The 1% Rule</h4>
                        <p class="text-sm leading-relaxed text-slate-300 mb-4">
                            Never risk more than <span class="text-amber-400 font-bold">1-2%</span> of your total portfolio on a single trade. If your account is $10,000, your max loss per trade should be $100-$200.
                        </p>
                        <div class="text-xs text-slate-500 italic">
                            "Survival first, profits second."
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-emerald-900/10 border border-emerald-500/20 p-6 rounded-2xl">
                    <div class="text-3xl mb-3"><svg class="w-9 h-9 text-emerald-400 inline-block" style="filter: drop-shadow(0 0 8px rgba(52,211,153,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg></div>
                    <h4 class="text-lg font-bold text-emerald-400 mb-2">Position Sizing</h4>
                    <p class="text-sm text-slate-300">Calculate how many contracts you can trade based on your risk tolerance and account size.</p>
                </div>
                <div class="bg-rose-900/10 border border-rose-500/20 p-6 rounded-2xl">
                    <div class="text-3xl mb-3"><svg class="w-9 h-9 text-rose-400 inline-block" style="filter: drop-shadow(0 0 8px rgba(251,113,133,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
                    <h4 class="text-lg font-bold text-rose-400 mb-2">Profit Targets</h4>
                    <p class="text-sm text-slate-300">Set realistic profit targets based on the probability of success and risk/reward ratio.</p>
                </div>
                <div class="bg-purple-900/10 border border-purple-500/20 p-6 rounded-2xl">
                    <div class="mb-3"><svg class="w-10 h-10 text-purple-400" style="filter: drop-shadow(0 0 10px rgba(168,85,247,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></div>
                    <h4 class="text-lg font-bold text-purple-400 mb-2">Stop Losses</h4>
                    <p class="text-sm text-slate-300">Define your exit points before entering. The jungle punishes those without an escape plan.</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A compass in the jungle. Before you take a single step, you must know which direction leads to safety and which leads to quicksand.",
        nuance: "<b>Pre-Trade Ritual:</b> Never enter a trade without calculating your max loss first. If you can't define the risk, you can't manage it.",
        example: ""
    },,
    {
        id: 'position-sizing-calculator',
        name: 'Position Sizing',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Risk Management',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-purple-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-purple-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-purple-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <svg class="w-14 h-14 text-purple-400" style="filter: drop-shadow(0 0 12px rgba(168,85,247,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h8"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-purple-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Position Sizing Calculator
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"Size your positions like your portfolio depends on it—because it does."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A measuring cup for risk. You wouldn't pour boiling water without knowing the volume—don't size a trade without knowing your exposure.",
        nuance: "<b>The Math of Survival:</b> Position sizing is the difference between a bad trade and a blown account. Size correctly and you can weather any storm.",
        example: ""
    },,
    {
        id: 'pop-calculator',
        name: 'POP & Expected Value',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Probability Analysis',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-amber-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-amber-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-amber-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                        <svg class="w-14 h-14 text-amber-400" style="filter: drop-shadow(0 0 12px rgba(251,191,36,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 22v-4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-amber-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        POP & Expected Value Calculator
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"In the jungle, knowing your odds is the difference between predator and prey."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A crystal ball that shows probability, not certainty. It tells you the odds before you step into the arena.",
        nuance: "<b>The Edge:</b> POP shows likelihood of profit. Expected Value shows long-term results. Together, they reveal whether your trade has an edge or is just gambling.",
        example: ""
    },,
    {
        id: 'expected-move',
        name: 'Expected Move',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Probability Analysis',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-cyan-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-cyan-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-cyan-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        <svg class="w-14 h-14 text-cyan-400" style="filter: drop-shadow(0 0 12px rgba(34,211,238,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Expected Move & Probability Cone
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"The market whispers its expected range. Listen, and place your strikes wisely."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A radar showing the probable path of a storm. The cone shows where the hurricane might go—your strikes should sit outside that cone to stay safe.",
        nuance: "<b>The Edge:</b> Selling strikes outside the expected move gives you statistical probability on your side. The market is telling you where it expects to stay—trade accordingly.",
        example: ""
    },,
    {
        id: 'options-screener',
        name: 'Options Screener',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Trade Discovery',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-violet-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-violet-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-violet-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                        <svg class="w-14 h-14 text-violet-400" style="filter: drop-shadow(0 0 12px rgba(139,92,246,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-violet-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Options Screener & Trade Discovery
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"The jungle is vast. The screener helps you find prey worth hunting."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A metal detector on a beach of options. Instead of digging randomly, you scan for the buried treasure that matches your criteria.",
        nuance: "<b>The Filter:</b> High IV Rank + High Volume + Right Delta = opportunity. The screener surfaces trades that match YOUR strategy, not someone else's.",
        example: ""
    },,
    {
        id: 'strategy-builder',
        name: 'Strategy Lab',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Build & Compare',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-purple-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-purple-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-purple-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <svg class="w-14 h-14 text-purple-400" style="filter: drop-shadow(0 0 12px rgba(168,85,247,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-purple-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Strategy Lab
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"Every battle is won before it is ever fought."</p>
                    <p class="text-sm text-slate-500 mt-2 font-mono">— Sun Tzu, The Art of War</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A trading architect's workshop. Build custom strategies leg by leg, compare them side-by-side, and see how each decision changes the payoff landscape.",
        nuance: "<b>Build & Compare:</b> Construct your own multi-leg strategies and instantly compare them. See how each leg affects the payoff diagram in real-time. The right strategy for the wrong situation is the wrong strategy—the Lab helps you find the perfect match.",
        example: ""
    },,
    {
        id: 'event-horizons-course',
        name: 'Event Horizon Prediction Markets',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Learn Event Trading',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="text-center py-12"><p class="text-slate-400">Event Horizons Course - click to open</p></div>`,
        analogy: "Master event-driven trading with Cameron the Chameleon. 8 comprehensive lessons covering prediction markets, earnings plays, and volatility events.",
        nuance: "<b>Structured Learning:</b> Progress through 8 lessons with quizzes and case studies. Learn from three expert mentors: Chameleon, Cheetah, and Owl.",
        example: ""
    },,
    {
        id: 'event-horizons',
        name: 'Event Horizons Tools',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Event Trading Tools',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="text-center py-12"><p class="text-slate-400">Event Horizons - click to open</p></div>`,
        analogy: "Access the Event Horizons toolkit: Prediction Scanner, Gap Analyzer, Event Replay, Paper Trading, and AI Signal Synthesizer.",
        nuance: "<b>Event-Driven Trading:</b> Combine options knowledge with prediction market signals. Understand IV crush, earnings straddles, and how to position around known catalysts.",
        example: ""
    },,
    {
        id: 'options-flow',
        name: 'Options Flow',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Order Flow Analysis',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05)); border: 1px solid rgba(16,185,129,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #34d399; margin: 0 0 12px 0; font-size: 1.3em;">🌊 Options Flow</h2>
                <p style="color: #94a3b8; margin: 0;">Track unusual options activity in real time. See what the big players are doing — large block trades, sweeps, and institutional positioning that can signal where smart money is headed.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <h3 style="color: #34d399; margin: 0 0 8px 0;">What You'll See</h3>
                <p class="text-slate-300">📊 <b>Unusual Volume:</b> Options trading at multiples of normal volume</p>
                <p class="text-slate-300">🐋 <b>Block Trades:</b> Large institutional orders that hit the tape</p>
                <p class="text-slate-300">⚡ <b>Sweeps:</b> Aggressive orders that sweep across multiple exchanges</p>
                <p class="text-slate-300">📈 <b>Put/Call Ratio:</b> Sentiment shifts in real time</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #34d399; margin: 0 0 8px 0;">How to Use It</h3>
                <p class="text-slate-300">🔍 Follow the flow, don't fight it. When you see massive call sweeps on a stock you're already bullish on, that's confirmation. When you see heavy put buying before earnings, that's a warning.</p>
                <p class="text-slate-300 mt-2">⚠️ <b>Important:</b> Flow is one signal, not the whole picture. Combine it with your own analysis — the smart money isn't always right, and not every big trade is directional.</p>
            </div>
        </div>
        `,
        analogy: "Like watching footprints in the snow — you can't see the hikers, but you can see where they've been and which direction they're heading. Options flow shows you where the money is moving.",
        nuance: "<b>Reading the Tape:</b> Not all large trades are bullish/bearish bets. Some are hedges, rolls, or spread legs. Context matters. A big put buy might be insurance, not a bearish bet. Look at the premium paid, the expiration, and whether it was bought or sold.",
        example: ""
    },,
    {
        id: 'paper-trading',
        name: 'Paper Trading',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Practice Trading',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-emerald-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-emerald-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                        <svg class="w-14 h-14 text-emerald-400" style="filter: drop-shadow(0 0 12px rgba(52,211,153,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-emerald-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Paper Trading Simulator
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"Practice in the sandbox before you play in the jungle."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A flight simulator for traders. Pilots don't learn to fly with passengers on board—they practice until the controls become second nature.",
        nuance: "<b>Risk-Free Learning:</b> Make mistakes with fake money. Track your wins and losses. Build confidence before risking real capital.",
        example: ""
    },,
    {
        id: 'greeks-visualizer',
        name: 'Greeks Visualizer',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Interactive Greeks Explorer',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div style="padding: 20px;">
            <h2 style="color: #39ff14; margin-bottom: 16px;">📊 Greeks Visualizer</h2>
            <p style="color: #a1a1aa; margin-bottom: 16px;">Explore how Delta, Gamma, Theta, and Vega change across strike prices, time to expiration, and volatility levels.</p>
            <div style="background: #0a0a0a; border: 1px solid rgba(57,255,20,0.2); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                <h3 style="color: #fbbf24; font-size: 14px; margin-bottom: 8px;">🔬 What You'll Learn</h3>
                <ul style="color: #d4d4d8; font-size: 13px; line-height: 1.8;">
                    <li><b>Delta:</b> How much the option price moves per $1 stock move</li>
                    <li><b>Gamma:</b> How fast Delta changes — the acceleration</li>
                    <li><b>Theta:</b> Time decay — how much value you lose each day</li>
                    <li><b>Vega:</b> Sensitivity to volatility changes</li>
                </ul>
            </div>
            <div style="background: #0a0a0a; border: 1px solid rgba(57,255,20,0.2); border-radius: 12px; padding: 16px;">
                <h3 style="color: #22c55e; font-size: 14px; margin-bottom: 8px;">💡 Key Insight</h3>
                <p style="color: #a1a1aa; font-size: 13px;">Greeks aren't static numbers — they change constantly as price, time, and volatility shift. Understanding their dynamics is what separates beginners from professionals.</p>
            </div>
        </div>`,
        analogy: "Think of the Greeks as your instrument panel in a cockpit. Delta is your speedometer, Gamma is your acceleration, Theta is your fuel gauge burning down, and Vega is your altitude sensitivity to turbulence.",
        nuance: "<b>The Greeks Interact:</b> Delta changes because of Gamma. Theta accelerates near expiration. Vega matters most when IV is low. Understanding these relationships is the key to managing complex positions.",
        example: ""
    },,
    {
        id: 'strategy-comparison',
        name: 'Strategy Comparison',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Compare Strategies Side-by-Side',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div style="padding: 20px;">
            <h2 style="color: #39ff14; margin-bottom: 16px;">⚔️ Strategy Comparison Matrix</h2>
            <p style="color: #a1a1aa; margin-bottom: 16px;">Compare options strategies side-by-side to find the best fit for your market outlook and risk tolerance.</p>
            <div style="background: #0a0a0a; border: 1px solid rgba(57,255,20,0.2); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                <h3 style="color: #fbbf24; font-size: 14px; margin-bottom: 8px;">📋 Compare By</h3>
                <ul style="color: #d4d4d8; font-size: 13px; line-height: 1.8;">
                    <li><b>Risk/Reward Profile:</b> Max gain vs max loss</li>
                    <li><b>Capital Required:</b> Margin and buying power impact</li>
                    <li><b>Market Outlook:</b> Bullish, bearish, or neutral</li>
                    <li><b>Volatility Bias:</b> Long vol, short vol, or neutral</li>
                    <li><b>Time Decay:</b> Theta positive or negative</li>
                    <li><b>Complexity:</b> Number of legs and management required</li>
                </ul>
            </div>
            <div style="background: #0a0a0a; border: 1px solid rgba(57,255,20,0.2); border-radius: 12px; padding: 16px;">
                <h3 style="color: #22c55e; font-size: 14px; margin-bottom: 8px;">💡 When to Use</h3>
                <p style="color: #a1a1aa; font-size: 13px;">Can't decide between an iron condor and a butterfly? Use the comparison tool to see which strategy better matches your thesis, risk budget, and management style.</p>
            </div>
        </div>`,
        analogy: "Like test-driving two cars before buying. You wouldn't buy a pickup truck for drag racing or a sports car for hauling lumber. Match the strategy to the job.",
        nuance: "<b>Context Matters:</b> The 'best' strategy depends on your outlook, risk tolerance, account size, and time commitment. There's no universal winner — only the right tool for the right situation.",
        example: ""
    },,
    {
        id: 'watchlist',
        name: 'Watchlist',
        tier: 9,
        tierName: 'Strategy Tools',
        outlook: 'Educational',
        objective: 'Track Your Tickers',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div style="padding: 20px;">
            <h2 style="color: #39ff14; margin-bottom: 16px;">👀 Watchlist</h2>
            <p style="color: #a1a1aa; margin-bottom: 16px;">Build and manage your personal watchlist of stocks and ETFs you're tracking for options trades.</p>
            <div style="background: #0a0a0a; border: 1px solid rgba(57,255,20,0.2); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                <h3 style="color: #fbbf24; font-size: 14px; margin-bottom: 8px;">📌 Track These Metrics</h3>
                <ul style="color: #d4d4d8; font-size: 13px; line-height: 1.8;">
                    <li><b>IV Rank & IV Percentile:</b> Is volatility high or low historically?</li>
                    <li><b>Upcoming Earnings:</b> When is the next catalyst?</li>
                    <li><b>Price Action:</b> Support/resistance levels, trend direction</li>
                    <li><b>Option Volume:</b> Where is smart money positioning?</li>
                    <li><b>Sector Correlation:</b> How does it move with the market?</li>
                </ul>
            </div>
            <div style="background: #0a0a0a; border: 1px solid rgba(57,255,20,0.2); border-radius: 12px; padding: 16px;">
                <h3 style="color: #22c55e; font-size: 14px; margin-bottom: 8px;">💡 Pro Tip</h3>
                <p style="color: #a1a1aa; font-size: 13px;">Keep your watchlist focused — 10-15 names max. Know them deeply rather than tracking 100 tickers superficially. The best traders are specialists, not generalists.</p>
            </div>
        </div>`,
        analogy: "Your watchlist is your hunting ground. The best predators don't chase every animal in the jungle — they study a few prey deeply and strike when conditions are perfect.",
        nuance: "<b>Quality Over Quantity:</b> A focused watchlist with deep knowledge of each name beats a massive list you barely follow. Know the earnings dates, IV patterns, and support levels of your watchlist stocks.",
        example: ""
    },
];
