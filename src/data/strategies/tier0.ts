import { Strategy } from '../../types';

// Foundations - Tier 0
export const TIER_0_STRATEGIES: Strategy[] = [
    {
        id: 'course-goals',
        tier: 0,
        tierName: 'Foundations',
        name: 'Course Goals',
        outlook: 'Educational',
        objective: 'Orientation',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <style>
            .commitment-checkbox {
                appearance: none;
                -webkit-appearance: none;
                width: 28px;
                height: 28px;
                border: 2px solid rgba(255, 240, 31, 0.4);
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                flex-shrink: 0;
            }
            .commitment-checkbox:hover {
                border-color: rgba(255, 240, 31, 0.8);
                box-shadow: 0 0 20px rgba(255, 240, 31, 0.4);
                transform: scale(1.1);
            }
            .commitment-checkbox:checked {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                border-color: #fbbf24;
                box-shadow: 0 0 25px rgba(251, 191, 36, 0.6);
            }
            .commitment-checkbox:checked::after {
                content: '🍌';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 16px;
            }
            .commitment-item {
                transition: all 0.3s ease;
            }
            .commitment-item:hover {
                transform: translateX(4px);
                box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);
            }
            .commitment-item:has(.commitment-checkbox:checked) {
                background: rgba(251, 191, 36, 0.08);
                border-color: rgba(251, 191, 36, 0.4);
                box-shadow: 0 0 25px rgba(251, 191, 36, 0.15);
            }
            .commitment-item:has(.commitment-checkbox:checked) .commitment-text {
                color: #fbbf24;
            }
            .course-goals-card {
                transition: all 0.3s ease;
            }
            .course-goals-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
            .what-youll-gain {
                transition: all 0.4s ease;
                cursor: pointer;
            }
            .what-youll-gain:hover {
                transform: translateY(-4px);
                border-color: #39ff14 !important;
                box-shadow: 0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2), 0 0 60px rgba(57, 255, 20, 0.1), inset 0 0 20px rgba(57, 255, 20, 0.05);
            }
            .what-youll-gain:hover h3 {
                color: #39ff14 !important;
                text-shadow: 0 0 10px rgba(57, 255, 20, 0.8);
            }
            .what-youll-gain:hover .gain-icon {
                border-color: #39ff14 !important;
                background: rgba(57, 255, 20, 0.15) !important;
                box-shadow: 0 0 15px rgba(57, 255, 20, 0.5);
            }
            .what-youll-gain:hover .gain-icon svg {
                color: #39ff14 !important;
                filter: drop-shadow(0 0 8px rgba(57, 255, 20, 0.8));
            }
            .pillar-card {
                transition: all 0.3s ease;
            }
            .pillar-card:hover {
                transform: scale(1.05);
            }
            .pillar-card:hover .pillar-icon {
                filter: drop-shadow(0 0 15px currentColor);
            }
            .path-item {
                transition: all 0.3s ease;
            }
            .path-item:hover {
                transform: translateX(8px);
            }
            .path-item:hover .path-number {
                transform: scale(1.15);
                box-shadow: 0 0 20px currentColor;
            }
            .course-quote {
                font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
                font-style: italic;
                cursor: default;
                position: relative;
            }
            .course-quote .qw {
                color: white;
                transition: color 0.4s ease, text-shadow 0.4s ease;
            }
            .course-quote:hover .qw {
                color: #fbbf24;
                text-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
                transition-delay: calc(var(--i) * 165ms);
            }
            .course-quote cite {
                display: block;
                margin-top: 8px;
                font-style: normal;
                font-family: ui-monospace, monospace;
                font-size: 0.75em;
                color: #94a3b8;
                transition: color 0.5s ease 3.5s, text-shadow 0.5s ease 3.5s;
            }
            .course-quote:hover cite {
                color: #d97706;
                text-shadow: 0 0 8px rgba(217, 119, 6, 0.4);
            }
            .course-goals-quotes {
                margin-top: -40px;
                margin-bottom: 48px;
                padding-top: 0;
            }
        </style>

        <!-- Wisdom Quotes - directly under Course Goals heading -->
        <div class="course-goals-quotes text-center space-y-3">
            <blockquote class="course-quote text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                <span class="qw" style="--i:0">"It</span> <span class="qw" style="--i:1">is</span> <span class="qw" style="--i:2">better</span> <span class="qw" style="--i:3">to</span> <span class="qw" style="--i:4">be</span> <span class="qw" style="--i:5">lucky.</span> <span class="qw" style="--i:6">But</span> <span class="qw" style="--i:7">I</span> <span class="qw" style="--i:8">would</span> <span class="qw" style="--i:9">rather</span> <span class="qw" style="--i:10">be</span> <span class="qw" style="--i:11">exact.</span> <span class="qw" style="--i:12">Then</span> <span class="qw" style="--i:13">when</span> <span class="qw" style="--i:14">luck</span> <span class="qw" style="--i:15">comes</span> <span class="qw" style="--i:16">you</span> <span class="qw" style="--i:17">are</span> <span class="qw" style="--i:18">ready."</span>
                <cite>— Ernest Hemingway, The Old Man and the Sea</cite>
            </blockquote>

            <blockquote class="course-quote text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                <span class="qw" style="--i:0">"A</span> <span class="qw" style="--i:1">ship</span> <span class="qw" style="--i:2">in</span> <span class="qw" style="--i:3">port</span> <span class="qw" style="--i:4">is</span> <span class="qw" style="--i:5">safe</span> <span class="qw" style="--i:6">but</span> <span class="qw" style="--i:7">that</span> <span class="qw" style="--i:8">is</span> <span class="qw" style="--i:9">not</span> <span class="qw" style="--i:10">what</span> <span class="qw" style="--i:11">ships</span> <span class="qw" style="--i:12">are</span> <span class="qw" style="--i:13">built</span> <span class="qw" style="--i:14">for."</span>
                <cite>— Grace Hopper</cite>
            </blockquote>

            <blockquote class="course-quote text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                <span class="qw" style="--i:0">"He</span> <span class="qw" style="--i:1">who</span> <span class="qw" style="--i:2">would</span> <span class="qw" style="--i:3">learn</span> <span class="qw" style="--i:4">to</span> <span class="qw" style="--i:5">fly</span> <span class="qw" style="--i:6">one</span> <span class="qw" style="--i:7">day</span> <span class="qw" style="--i:8">must</span> <span class="qw" style="--i:9">first</span> <span class="qw" style="--i:10">learn</span> <span class="qw" style="--i:11">to</span> <span class="qw" style="--i:12">stand</span> <span class="qw" style="--i:13">and</span> <span class="qw" style="--i:14">walk</span> <span class="qw" style="--i:15">and</span> <span class="qw" style="--i:16">run</span> <span class="qw" style="--i:17">and</span> <span class="qw" style="--i:18">climb</span> <span class="qw" style="--i:19">and</span> <span class="qw" style="--i:20">dance;</span> <span class="qw" style="--i:21">one</span> <span class="qw" style="--i:22">cannot</span> <span class="qw" style="--i:23">fly</span> <span class="qw" style="--i:24">into</span> <span class="qw" style="--i:25">flying."</span>
                <cite>— Nietzsche</cite>
            </blockquote>
        </div>

        <div class="space-y-10">
            <!-- Hero Section -->
            <div class="relative border border-emerald-500/30 bg-black/40 p-8 md:p-12 rounded-[2rem] overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div class="relative z-10 text-center">
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                        <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        <span class="text-emerald-400 font-mono text-xs uppercase tracking-widest">Wall Street Wildlife University</span>
                    </div>

                    <h1 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Your Journey Through the <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Options Jungle</span>
                    </h1>

                    <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Whether you're taking your first steps or sharpening advanced skills, this course transforms you from prey into predator.
                    </p>
                </div>
            </div>

            <!-- Who Is This For? -->
            <div class="grid md:grid-cols-3 gap-6">
                <div class="course-goals-card bg-black/40 border border-cyan-500/20 p-6 rounded-2xl cursor-pointer">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <svg class="w-6 h-6 text-cyan-400" style="filter: drop-shadow(0 0 8px rgba(34,211,238,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-cyan-400">New to Options?</h3>
                    </div>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        <li class="flex items-start gap-2"><span class="text-cyan-400">→</span> Understand calls, puts, and the 100-share contract</li>
                        <li class="flex items-start gap-2"><span class="text-cyan-400">→</span> Learn options vocabulary and essential terminology</li>
                        <li class="flex items-start gap-2"><span class="text-cyan-400">→</span> Read basic options information and charts</li>
                        <li class="flex items-start gap-2"><span class="text-cyan-400">→</span> Learn why options aren't gambling when used correctly</li>
                        <li class="flex items-start gap-2"><span class="text-cyan-400">→</span> Build a foundation before risking real capital</li>
                        <li class="flex items-start gap-2"><span class="text-cyan-400">→</span> Develop the mindset that separates winners from losers</li>
                    </ul>
                </div>

                <div class="course-goals-card bg-black/40 border border-amber-500/20 p-6 rounded-2xl cursor-pointer">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <svg class="w-6 h-6 text-amber-400" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-amber-400">Intermediate Trader?</h3>
                    </div>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        <li class="flex items-start gap-2"><span class="text-amber-400">→</span> Master multi-leg strategies: spreads, straddles, iron condors</li>
                        <li class="flex items-start gap-2"><span class="text-amber-400">→</span> Learn to read and exploit implied volatility</li>
                        <li class="flex items-start gap-2"><span class="text-amber-400">→</span> Understand the Greeks at a deeper level</li>
                        <li class="flex items-start gap-2"><span class="text-amber-400">→</span> Develop trade management: when to adjust, roll, or exit</li>
                        <li class="flex items-start gap-2"><span class="text-amber-400">→</span> Match strategies to market conditions and your thesis</li>
                        <li class="flex items-start gap-2"><span class="text-amber-400">→</span> Refine your psychology and eliminate bad habits</li>
                    </ul>
                </div>

                <div class="course-goals-card bg-black/40 border border-rose-500/20 p-6 rounded-2xl cursor-pointer">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                            <svg class="w-6 h-6 text-rose-400" style="filter: drop-shadow(0 0 8px rgba(251,113,133,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-rose-400">Advanced Trader?</h3>
                    </div>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        <li class="flex items-start gap-2"><span class="text-rose-400">→</span> Integrate market structure with precision entry and exit points</li>
                        <li class="flex items-start gap-2"><span class="text-rose-400">→</span> Explore and discover new advanced strategies and structures</li>
                        <li class="flex items-start gap-2"><span class="text-rose-400">→</span> Reconnect to the fundamentals of proper trading mindset</li>
                        <li class="flex items-start gap-2"><span class="text-rose-400">→</span> Expand your toolkit with probability, risk, and reward analysis</li>
                        <li class="flex items-start gap-2"><span class="text-rose-400">→</span> Use the Trade Journal daily for better pattern recognition</li>
                        <li class="flex items-start gap-2"><span class="text-rose-400">→</span> Optimize position sizing and portfolio-level Greeks management</li>
                    </ul>
                </div>
            </div>

            <!-- What You'll Gain -->
            <div class="what-youll-gain bg-black/40 border border-emerald-500/30 p-8 rounded-2xl relative overflow-hidden">
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="gain-icon w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center transition-all">
                            <svg class="w-6 h-6 text-emerald-400 transition-all" style="filter: drop-shadow(0 0 8px rgba(16,185,129,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-emerald-400 transition-all">What You'll Gain</h3>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-4">
                        By the end of this course, you'll have developed a <span class="text-emerald-400 font-semibold">fundamental understanding of how options work</span>—enough to confidently navigate the Wall Street Wildlife Options University modules, including the intermediate and advanced sections, on your own time.
                    </p>
                    <p class="text-slate-300 leading-relaxed">
                        More importantly, you'll have built the <span class="text-emerald-400 font-semibold">mental framework</span> to explore new strategies, evaluate trade setups, and tackle unfamiliar topics <span class="text-emerald-400 font-semibold">without needing a guide</span>. The jungle will no longer be foreign territory—you'll know how to move through it.
                    </p>
                </div>
            </div>

            <!-- The Three Pillars -->
            <div class="bg-black/40 border border-white/10 p-8 rounded-2xl">
                <h2 class="text-2xl font-black text-white mb-6 text-center">The Three Pillars of Mastery</h2>

                <div class="grid md:grid-cols-3 gap-6">
                    <div class="pillar-card text-center p-4 rounded-xl cursor-pointer">
                        <div class="pillar-icon w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-all">
                            <svg class="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        </div>
                        <h3 class="font-bold text-emerald-400 mb-2">Knowledge</h3>
                        <p class="text-sm text-slate-400">Master the mechanics—contracts, Greeks, strategies, and market structure.</p>
                    </div>

                    <div class="pillar-card text-center p-4 rounded-xl cursor-pointer">
                        <div class="pillar-icon w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center transition-all">
                            <svg class="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <!-- Clean brain outline -->
                                <path d="M12 5a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 3 3v2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3"/>
                                <path d="M12 5a3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1 3 3 3 3 0 0 1-3 3v2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3"/>
                                <path d="M12 5v14"/>
                                <!-- Sparks/energy emanating -->
                                <path d="M2 8l1 1M2 12h1.5M2 16l1-1" stroke-width="2" style="filter: drop-shadow(0 0 4px rgba(168,85,247,1))"/>
                                <path d="M22 8l-1 1M22 12h-1.5M22 16l-1-1" stroke-width="2" style="filter: drop-shadow(0 0 4px rgba(168,85,247,1))"/>
                            </svg>
                        </div>
                        <h3 class="font-bold text-purple-400 mb-2">Psychology</h3>
                        <p class="text-sm text-slate-400">Control greed, fear, and revenge. 90% of trading is mental discipline.</p>
                    </div>

                    <div class="pillar-card text-center p-4 rounded-xl cursor-pointer">
                        <div class="pillar-icon w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center transition-all">
                            <svg class="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h3 class="font-bold text-amber-400 mb-2">Risk Management</h3>
                        <p class="text-sm text-slate-400">Protect capital first. Position sizing, defined risk, and knowing when to walk away.</p>
                    </div>
                </div>
            </div>

            <!-- Commitment Section -->
            <div class="bg-black/40 border-2 border-emerald-500/30 p-8 rounded-[2rem] relative overflow-hidden">
                <div class="absolute top-4 right-4">
                    <svg class="w-20 h-20 text-emerald-500/10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>

                <div class="flex items-center gap-3 mb-6">
                    <svg class="w-8 h-8 text-emerald-400" style="filter: drop-shadow(0 0 10px rgba(16,185,129,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <h2 class="text-2xl font-black text-emerald-400 uppercase tracking-wide">Your Commitment</h2>
                </div>

                <p class="text-slate-300 mb-6">Check each box to lock in your commitment. This isn't just reading—it's transformation.</p>

                <div class="space-y-4">
                    <label class="commitment-item flex items-start gap-4 p-4 bg-black/20 border border-white/5 rounded-xl cursor-pointer hover:border-emerald-500/30 transition-all">
                        <input type="checkbox" class="commitment-checkbox mt-0.5" />
                        <div>
                            <span class="commitment-text font-semibold text-white block">I will complete each module before moving forward</span>
                            <span class="text-sm text-slate-400">No skipping ahead. Foundations matter.</span>
                        </div>
                    </label>

                    <label class="commitment-item flex items-start gap-4 p-4 bg-black/20 border border-white/5 rounded-xl cursor-pointer hover:border-emerald-500/30 transition-all">
                        <input type="checkbox" class="commitment-checkbox mt-0.5" />
                        <div>
                            <span class="commitment-text font-semibold text-white block">I will paper trade before risking real money</span>
                            <span class="text-sm text-slate-400">Practice makes permanent. Mistakes here cost nothing.</span>
                        </div>
                    </label>

                    <label class="commitment-item flex items-start gap-4 p-4 bg-black/20 border border-white/5 rounded-xl cursor-pointer hover:border-emerald-500/30 transition-all">
                        <input type="checkbox" class="commitment-checkbox mt-0.5" />
                        <div>
                            <span class="commitment-text font-semibold text-white block">I will follow the Rules of the Jungle</span>
                            <span class="text-sm text-slate-400">Position sizing, defined risk, no revenge trading.</span>
                        </div>
                    </label>

                    <label class="commitment-item flex items-start gap-4 p-4 bg-black/20 border border-white/5 rounded-xl cursor-pointer hover:border-emerald-500/30 transition-all">
                        <input type="checkbox" class="commitment-checkbox mt-0.5" />
                        <div>
                            <span class="commitment-text font-semibold text-white block">I will journal every trade</span>
                            <span class="text-sm text-slate-400">What you don't track, you can't improve.</span>
                        </div>
                    </label>

                    <label class="commitment-item flex items-start gap-4 p-4 bg-black/20 border border-white/5 rounded-xl cursor-pointer hover:border-emerald-500/30 transition-all">
                        <input type="checkbox" class="commitment-checkbox mt-0.5" />
                        <div>
                            <span class="commitment-text font-semibold text-white block">I understand that losses are tuition, not failure</span>
                            <span class="text-sm text-slate-400">Every professional has losses. It's how you respond that matters.</span>
                        </div>
                    </label>

                    <label class="commitment-item flex items-start gap-4 p-4 bg-black/20 border border-white/5 rounded-xl cursor-pointer hover:border-emerald-500/30 transition-all">
                        <input type="checkbox" class="commitment-checkbox mt-0.5" />
                        <div>
                            <span class="commitment-text font-semibold text-white block">I will be patient and disciplined</span>
                        </div>
                    </label>
                </div>
            </div>

            <!-- Your Learning Path — 9 Steps -->
            <div class="bg-black/30 border border-white/5 p-8 md:p-10 rounded-[2rem]">
                <h2 class="text-2xl font-black text-white mb-2 text-center">Your Learning Path</h2>
                <p class="text-slate-400 text-center mb-8">Nine steps from first contact to expert edge.</p>

                <div class="grid md:grid-cols-2 gap-5">
                    <!-- Step 1: Foundations -->
                    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(16,185,129,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-lg shadow-[0_0_12px_rgba(16,185,129,0.3)]">1</div>
                                <h4 class="text-lg font-bold text-emerald-400">Foundations</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Options basics, contracts, the Greeks, and the Rules of the Jungle. Build the vocabulary and mental models everything else rests on.</p>
                        </div>
                    </div>

                    <!-- Step 2: Market Structure -->
                    <div style="background: linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(34,211,238,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black text-lg shadow-[0_0_12px_rgba(34,211,238,0.3)]">2</div>
                                <h4 class="text-lg font-bold text-cyan-400">Market Structure</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Support/resistance, AVWAP, market cycles, and time frames. Learn to read the terrain before you enter it.</p>
                        </div>
                    </div>

                    <!-- Step 3: Risk -->
                    <div style="background: linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(245,158,11,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-amber-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg shadow-[0_0_12px_rgba(245,158,11,0.3)]">3</div>
                                <h4 class="text-lg font-bold text-amber-400">Risk</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Position sizing, defined risk, and protective strategies. The number-one job is staying in the game.</p>
                        </div>
                    </div>

                    <!-- Step 4: The Anchors -->
                    <div style="background: linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(234,179,8,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-black text-lg shadow-[0_0_12px_rgba(234,179,8,0.3)]">4</div>
                                <h4 class="text-lg font-bold text-yellow-400">The Anchors</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Covered calls, cash-secured puts, protective puts, and collars. Your first real strategies—income and protection.</p>
                        </div>
                    </div>

                    <!-- Step 5: Tools of the Trade -->
                    <div style="background: linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(56,189,248,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-sky-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-black text-lg shadow-[0_0_12px_rgba(56,189,248,0.3)]">5</div>
                                <h4 class="text-lg font-bold text-sky-400">Tools of the Trade</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Learn the tools you'll keep coming back to to fine-tune your odds of success—options calculators, IV rank, screeners, position sizers, and payoff diagrams.</p>
                        </div>
                    </div>

                    <!-- Step 6: Community -->
                    <div style="background: linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(168,85,247,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-purple-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-black text-lg shadow-[0_0_12px_rgba(168,85,247,0.3)]">6</div>
                                <h4 class="text-lg font-bold text-purple-400">Engage in Community</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Engage in the community to support others in using options to make more and more profitable trades. Share setups, review trades together, and grow faster in packs.</p>
                        </div>
                    </div>

                    <!-- Step 7: Advanced Strategies -->
                    <div style="background: linear-gradient(135deg, rgba(244,63,94,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(244,63,94,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-rose-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-black text-lg shadow-[0_0_12px_rgba(244,63,94,0.3)]">7</div>
                                <h4 class="text-lg font-bold text-rose-400">Advanced Strategies</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Starting with verticals in Tier 4, then volatility plays, time spreads, and skew strategies. Multi-leg setups that give you an edge in any market environment.</p>
                        </div>
                    </div>

                    <!-- Step 8: Expert-Only Exotic Strategies -->
                    <div style="background: linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(251,146,60,0.25);" class="p-6 rounded-2xl relative overflow-hidden group hover:border-orange-400/50 transition-all duration-300">
                        <div class="absolute -top-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-lg shadow-[0_0_12px_rgba(251,146,60,0.3)]">8</div>
                                <h4 class="text-lg font-bold text-orange-400">Experts Only</h4>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Advanced and exotic strategies in Tier 7. Ratio spreads, broken-wing butterflies, jade lizards, and beyond. Reserved for traders who've mastered every step before this one.</p>
                        </div>
                    </div>

                    <!-- Step 9: Event Horizons -->
                    <div style="background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.08) 50%, rgba(0,0,0,0.4) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(99,102,241,0.3);" class="md:col-span-2 p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-400/50 transition-all duration-300">
                        <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
                        <div class="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-black text-lg shadow-[0_0_12px_rgba(99,102,241,0.4)]">9</div>
                                <h4 class="text-lg font-bold text-indigo-400">Event Horizons</h4>
                                <span class="text-[10px] font-mono uppercase tracking-widest text-indigo-400/70 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">Expert Edge</span>
                            </div>
                            <p class="text-sm text-slate-300 leading-relaxed">Combine Polymarket prediction-market data with options implied volatility to spot where the crowd and the options market disagree. When prediction markets price a binary event differently than the options chain, that gap is your edge. The ultimate synthesis of everything you've learned.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Final Call to Action -->
            <div class="text-center py-8">
                <p class="text-2xl font-black text-white mb-2">Ready to begin?</p>
                <p class="text-slate-400">Continue to the next module: <span class="text-emerald-400 font-semibold">What Are Options?</span></p>
            </div>
        </div>
        `,
        analogy: "",
        nuance: "<b>Commitment Compounds:</b> Every professional was once a beginner who decided to show up consistently. Your edge isn't intelligence—it's discipline.",
        example: ""
    },,
    {
        id: 'what-are-options', tier: 0, tierName: 'Foundations', name: 'What Are Options?', outlook: 'Educational', objective: 'Foundations', risk: 'None', legs: [],
        analysis: `
        <!-- Top Title Section -->
        <div class="welcome-jungle-pane border border-emerald-500/30 bg-black/40 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-emerald-900/10 transition-all duration-300">
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-56 h-56 rounded-full border-4 border-emerald-500 overflow-hidden bg-black/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <img src="/assets/Krzysztof_Monkey_Cute.webp" alt="Monkey with Bananas" class="w-full h-full object-cover" />
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-emerald-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Welcome to the Jungle
                    </div>
                    <h2 class="text-3xl md:text-4xl text-white font-black leading-tight mb-2">Don't Start with Math. <br/><span class="text-emerald-400">Start with Bananas.</span></h2>
                    <p class="text-lg text-slate-400 leading-relaxed">Before we define "Options", let's solve two simple jungle problems.</p>
                </div>
            </div>
        </div>

        <!-- The Two Stories (Inductive Hook) -->
        <div class="space-y-8 mb-16">
            <!-- Call Option + Banana Voucher Combined -->
            <div class="banana-voucher-pane call-option-pane bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 p-8 rounded-[2rem] relative overflow-hidden group transition-all duration-300 cursor-pointer">
                <div class="absolute -top-4 -right-4 p-0 opacity-20 w-80 h-80 pointer-events-none router-ignore">
                    <span class="text-[12rem]">🍌</span>
                </div>
                
                <div class="bg-black/30 p-6 rounded-2xl border border-emerald-500/10 mb-6">
                    <h4 class="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
                        <span class="text-2xl">🍌</span> Story 1: The "Banana Voucher"
                    </h4>
                    <p class="text-slate-300 text-base leading-relaxed mb-4">
                        You're a monkey. The merchant sells bananas for <b class="text-white">$5</b>. You're scared the price will double tomorrow, but you don't have $5 yet. You pay <b class="text-white">$0.50</b> for a <i>voucher</i> that guarantees you can buy a banana at $5 anytime this month.
                    </p>
                    <ul class="text-sm space-y-3 text-slate-300 font-medium">
                        <li class="flex items-start gap-3">
                            <span class="text-emerald-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                            <span><b>Scenario A:</b> Banana shortage! Price jumps to <b>$8</b>. Your voucher lets you buy at $5. You flip it for $8. Profit!</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-rose-500 text-lg flex-shrink-0 mt-0.5">✗</span>
                            <span><b>Scenario B:</b> Surplus. Price drops to <b>$4</b>. You throw the voucher away (lose $0.50) and just buy at $4.</span>
                        </li>
                    </ul>
                </div>
                
                <div class="flex items-center gap-4 mb-2">
                    <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-emerald-500/30 bg-emerald-500/10"><svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div>
                    <div>
                        <h3 class="text-xl font-black text-emerald-400 uppercase">This is a "Call Option"</h3>
                        <p class="text-slate-400 text-sm">The right to <b class="text-white">BUY</b> later at a fixed price.</p>
                    </div>
                </div>
                <div class="text-sm text-emerald-500/80 italic font-mono mt-2">Bullish monkeys buy Calls.</div>
            </div>

            <!-- Put Option + Insurance Combined -->
            <div class="insurance-pane put-option-pane bg-gradient-to-br from-rose-900/20 to-black border border-rose-500/20 p-8 rounded-[2rem] relative overflow-hidden group transition-all duration-300 cursor-pointer">
                <div class="absolute -top-4 -right-4 p-0 opacity-30 w-80 h-80 pointer-events-none router-ignore">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="w-full h-full text-rose-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>

                <div class="bg-black/30 p-6 rounded-2xl border border-rose-500/10 mb-6">
                    <h4 class="text-lg font-bold text-rose-400 mb-3 flex items-center gap-2">
                        <span class="text-2xl">🍌</span> Story 2: The "Banana Plantation Insurance"
                    </h4>
                    <p class="text-slate-300 text-base leading-relaxed mb-4">
                        You own a banana plantation (Stock) worth <b class="text-white">$50k</b>. You're scared of a disease outbreak wiping out your crop. You pay <b class="text-white">$1k</b> for an insurance policy.
                    </p>
                    <ul class="text-sm space-y-3 text-slate-300 font-medium">
                        <li class="flex items-start gap-3">
                            <span class="text-emerald-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                            <span><b>Scenario A:</b> DISEASE! Bananas rot, value hits $0. Insurance pays you <b>$50k</b>. You are saved.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-rose-500 text-lg flex-shrink-0 mt-0.5">✗</span>
                            <span><b>Scenario B:</b> No disease. You lose the $1k premium, but you slept well at night.</span>
                        </li>
                    </ul>
                </div>

                <div class="flex items-center gap-4 mb-2">
                    <div class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-rose-500/30 bg-rose-500/10"><svg class="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg></div>
                    <div>
                        <h3 class="text-xl font-black text-rose-400 uppercase">This is a "Put Option"</h3>
                        <p class="text-slate-400 text-sm">The right to <b class="text-white">SELL</b> later at a fixed price (protection).</p>
                    </div>
                </div>
                <div class="text-sm text-rose-500/80 italic font-mono mt-2">Bearish monkeys buy Puts.</div>
            </div>
        </div>

        <div class="space-y-12">
            
            <!-- Formal Definition (Moved Down) -->
            <div class="bg-slate-800/40 p-8 rounded-3xl border-l-4 border-amber-500">
                <h3 class="text-white font-bold mb-2">The Technical Definition</h3>
                <p class="text-lg text-slate-300 leading-relaxed">
                    Now you know the intuition. Here is the formal rule: <br/>
                    An <b>option contract</b> gives you the <span class="text-amber-400 font-bold">right</span>, but <span class="italic">not the obligation</span>, to buy or sell a stock at a predetermined price before a set date.
                </p>
            </div>

            <!-- The 100 Share Rule -->
            <div class="golden-multiplier-pane bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/30 p-8 rounded-[2rem] relative overflow-hidden transition-all duration-300 cursor-pointer">
                <div class="absolute -right-4 -bottom-4 text-8xl opacity-10 font-black text-amber-400">100</div>
                <h3 class="text-2xl font-black text-amber-400 mb-4 flex items-center gap-3 uppercase italic">
                    <span class="bg-amber-500 text-slate-950 px-3 py-1 rounded-lg not-italic">100</span>
                    The Golden Multiplier
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
                    <div>
                        <p class="text-lg leading-relaxed mb-4">
                            In the US market, <span class="text-white font-bold underline decoration-amber-500">1 option contract always equals 100 shares</span>.
                        </p>
                        <p class="text-sm opacity-80">
                            Think of it as a wholesale box. You can't buy just 1 egg; you must buy the carton of 100. This is why a $1.00 premium actually costs you <span class="text-amber-400 font-mono">$100.00</span>.
                        </p>
                    </div>
                    <div class="bg-black/30 p-6 rounded-2xl border border-white/5">
                        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">The "Covered" Requirement</h4>
                        <p class="text-sm leading-relaxed">
                            To <span class="text-rose-400 font-bold">SELL</span> a call safely, you <span class="text-white font-bold">MUST own 100 shares</span>. This acts as your collateral.
                        </p>
                    </div>
                </div>
            </div>

            <!-- The Anatomy -->
            <div class="anatomy-pane bg-transparent p-8 rounded-3xl transition-all duration-300 cursor-pointer">
                <h3 class="text-lg font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">The Anatomy of a Contract</h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="anatomy-number text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer" data-color="emerald">
                        <div class="anatomy-value text-emerald-400 font-black text-3xl mb-2 transition-all duration-300">$150</div>
                        <div class="text-xs text-slate-500 uppercase tracking-widest font-bold">Strike Price</div>
                        <p class="text-xs text-slate-400 mt-2 leading-relaxed">The target price where you can act.</p>
                    </div>
                    <div class="anatomy-number text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer" data-color="purple">
                        <div class="anatomy-value text-purple-400 font-black text-3xl mb-2 transition-all duration-300">$5.00</div>
                        <div class="text-xs text-slate-500 uppercase tracking-widest font-bold">Premium</div>
                        <p class="text-xs text-slate-400 mt-2 leading-relaxed">Cost of 1 share's right. Total cost = <span class="text-purple-300 font-bold">$500</span>.</p>
                    </div>
                    <div class="anatomy-number text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer" data-color="amber">
                        <div class="anatomy-value text-amber-400 font-black text-3xl mb-2 transition-all duration-300">30 Days</div>
                        <div class="text-xs text-slate-500 uppercase tracking-widest font-bold">Expiration</div>
                        <p class="text-xs text-slate-400 mt-2 leading-relaxed">The time left before the contract dies.</p>
                    </div>
                    <div class="anatomy-number text-center p-4 rounded-2xl transition-all duration-300 cursor-pointer" data-color="cyan">
                        <div class="anatomy-value text-cyan-400 font-black text-3xl mb-2 transition-all duration-300">NVDA</div>
                        <div class="text-xs text-slate-500 uppercase tracking-widest font-bold">Underlying</div>
                        <p class="text-xs text-slate-400 mt-2 leading-relaxed">The actual asset the option tracks.</p>
                    </div>
                </div>
            </div>

            <!-- Know Your Underlying -->
            <div class="know-underlying-pane relative bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/30 border-2 border-cyan-500/30 p-8 rounded-[2rem] overflow-hidden transition-all duration-300 cursor-pointer">
                <div class="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div class="relative z-10">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                            <svg class="w-7 h-7 text-cyan-400" style="filter: drop-shadow(0 0 8px rgba(34,211,238,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                <path d="M6 8h2M6 12h2M6 16h2M16 8h2M16 12h2M16 16h2"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xl font-black text-cyan-400 uppercase tracking-wide">Know Your Underlying</h3>
                            <p class="text-xs text-slate-400 font-mono">The Foundation of Every Options Trade</p>
                        </div>
                    </div>

                    <div class="bg-black/30 border border-cyan-500/20 rounded-2xl p-6 mb-6">
                        <p class="text-lg text-white leading-relaxed mb-4">
                            <span class="text-cyan-400 font-bold text-2xl">"</span>An option is only as good as the company beneath it.<span class="text-cyan-400 font-bold text-2xl">"</span>
                        </p>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Before you ever buy or sell an option, you must <span class="text-white font-bold">deeply understand the underlying company</span>. Options amplify everything—gains, losses, and especially <span class="text-rose-400 font-semibold">ignorance</span>. Trading options on a stock you don't understand is like betting on a horse you've never seen run.
                        </p>
                    </div>

                    <h4 class="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        Due Diligence Checklist
                    </h4>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="bg-slate-800/50 border border-white/5 rounded-xl p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-800/70">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                </div>
                                <div>
                                    <h5 class="text-emerald-400 font-bold text-sm">Financial Health</h5>
                                    <p class="text-xs text-slate-400 mt-1">Revenue growth, profit margins, debt levels, cash flow. Is the company actually making money?</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800/50 border border-white/5 rounded-xl p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-800/70">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg class="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                </div>
                                <div>
                                    <h5 class="text-purple-400 font-bold text-sm">Leadership & Moat</h5>
                                    <p class="text-xs text-slate-400 mt-1">Who runs the company? What's their competitive advantage? Can competitors easily replicate their business?</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800/50 border border-white/5 rounded-xl p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-800/70">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                                </div>
                                <div>
                                    <h5 class="text-amber-400 font-bold text-sm">Industry & Trends</h5>
                                    <p class="text-xs text-slate-400 mt-1">Is the sector growing or dying? What macro trends affect this business? Regulatory risks?</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800/50 border border-white/5 rounded-xl p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-800/70">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg class="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                </div>
                                <div>
                                    <h5 class="text-cyan-400 font-bold text-sm">Catalysts & Calendar</h5>
                                    <p class="text-xs text-slate-400 mt-1">Earnings dates, FDA approvals, product launches. Know what events could move the stock before your option expires.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 bg-rose-950/30 border border-rose-500/20 rounded-xl p-4">
                        <p class="text-sm text-slate-300 flex items-start gap-3">
                            <svg class="w-5 h-5 text-rose-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                            <span><span class="text-rose-400 font-bold">Warning:</span> If you can't explain in 30 seconds what the company does and why it will succeed, you have no business trading options on it. The leverage that makes options profitable also makes uninformed trades catastrophic.</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/40 border border-white/5 p-8 rounded-3xl">
                <h3 class="text-white font-bold mb-4 flex items-center gap-2">
                    <span class="text-xl"><svg class="w-6 h-6 text-amber-400 inline-block" style="filter: drop-shadow(0 0 5px rgba(251,191,36,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg></span> Rights vs. Obligations
                </h3>
                <p class="text-slate-400 text-sm leading-relaxed">
                    When you <span class="text-emerald-400 font-bold">BUY</span> an option, you have the <span class="text-white">RIGHT</span> to act, but you don't have to. If the trade goes against you, you simply let the contract expire worthless and lose only the premium you paid.
                    <br><br>
                    When you <span class="text-rose-400 font-bold">SELL</span> an option, you have the <span class="text-white">OBLIGATION</span> to fulfill the contract if the buyer chooses to exercise it. This is why selling can be more dangerous!
                </p>
            </div>


            <!-- The Options Paradigm Shift -->
            <div class="bg-indigo-950/20 border border-indigo-500/20 p-8 rounded-3xl">
                <h3 class="text-indigo-400 font-bold mb-6 flex items-center gap-3 text-lg uppercase tracking-widest">
                    <span class="animate-pulse">🧠</span> The Options Paradigm Shift
                </h3>
                <div class="space-y-6">
                    <div class="flex gap-4">
                        <div class="shrink-0 w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        </div>
                        <div>
                            <h4 class="text-cyan-200 font-bold text-sm mb-1">Non-Linearity (3D Chess)</h4>
                            <p class="text-xs text-slate-400 leading-relaxed">Stocks are 2D: they go up or down. Options are 3D: you can profit from direction, time passing, or even volatility exploding. You are no longer limited to just "being right" about direction.</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                            <h4 class="text-emerald-200 font-bold text-sm mb-1">Asymmetric Risk (The Shield)</h4>
                            <p class="text-xs text-slate-400 leading-relaxed">Beginners think options are risky. Pros know that <i>owning stock</i> is risky. Buying a Call defines your max loss instantly (the premium). Owning stock leaves you exposed to a 50% drop overnight.</p>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="shrink-0 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 12-7 7-7-7"/><path d="M12 19V5"/></svg>
                        </div>
                        <div>
                            <h4 class="text-purple-200 font-bold text-sm mb-1">Capital Agility (The Lever)</h4>
                            <p class="text-xs text-slate-400 leading-relaxed">Why tie up $15,000 to own 100 shares of Apple? You can control the same upside for $500. This frees up your remaining capital to generate yield elsewhere. It's not about gambling; it's about efficient allocation.</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        `,
        analogy: "An option is like a VIP banana coupon. If the store price for bananas is higher than your coupon price, you use it and get more bananas for less. If the store price drops below your coupon, you toss it in the trash and buy bananas at the cheaper market price.",
        nuance: "<b>The 100 Multiplier:</b> Every $1 in premium equals $100 in real dollars. If you see an option for $2.50, it costs $250.00.",
        example: "<b>Scenario:</b> Apple is $150. You think it hits $170.<br><br><b>Option:</b> You buy a $160 Strike Call for $2.00 ($200 total).<br><br><b>Result:</b> If Apple hits $180, your option is worth at least $20.00 ($2,000). You turned $200 into $2,000. That is the power of options."
    },,
    {
        id: 'stocks-vs-options', tier: 0, tierName: 'Foundations', name: 'Stocks vs Options', outlook: 'Educational', objective: 'Comparison', risk: 'None', legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <!-- Header -->
            <div class="text-center mb-8">
                <h2 class="text-3xl font-black text-white mb-3">Two Tools, Different Strengths</h2>
                <p class="text-slate-400 max-w-2xl mx-auto">Stocks and options aren't competitors—they're complements. Understanding when to use each is part of becoming a complete trader.</p>
            </div>

            <!-- Comparison Chart -->
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Stocks Column -->
                <div class="stocks-card bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                <svg class="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                            </div>
                            <h3 class="text-2xl font-black text-cyan-400 uppercase tracking-tight">Stocks</h3>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Ownership</span>
                                    <p class="text-slate-400 text-sm">You own a piece of the company with voting rights</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Dividends</span>
                                    <p class="text-slate-400 text-sm">Receive cash payments from company profits</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">No Expiration</span>
                                    <p class="text-slate-400 text-sm">Hold forever—time is on your side</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Simplicity</span>
                                    <p class="text-slate-400 text-sm">Buy low, sell high—straightforward mechanics</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">No Time Decay</span>
                                    <p class="text-slate-400 text-sm">Your position doesn't erode daily</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Tax Efficiency</span>
                                    <p class="text-slate-400 text-sm">Benefit from lower long-term capital gains rates</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Margin Collateral</span>
                                    <p class="text-slate-400 text-sm">Use your stock holdings as collateral to borrow against</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Liquidity Depth</span>
                                    <p class="text-slate-400 text-sm">Easier to enter/exit large positions without slippage</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Options Column -->
                <div class="options-card bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                            <h3 class="text-2xl font-black text-emerald-400 uppercase tracking-tight">Options</h3>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Leverage</span>
                                    <p class="text-slate-400 text-sm">Control 100 shares for a fraction of the cost</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Defined Risk</span>
                                    <p class="text-slate-400 text-sm">Know your max loss before entering (when buying)</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Income Generation</span>
                                    <p class="text-slate-400 text-sm">Sell premium to collect income on stocks you own</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Hedge & Protect</span>
                                    <p class="text-slate-400 text-sm">Insure your portfolio against downturns</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Profit Any Direction</span>
                                    <p class="text-slate-400 text-sm">Make money when stocks go up, down, or sideways</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Capital Efficiency</span>
                                    <p class="text-slate-400 text-sm">Free up cash for other trades while maintaining exposure</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Volatility Trading</span>
                                    <p class="text-slate-400 text-sm">Profit from changes in fear (IV), regardless of direction</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                                <div>
                                    <span class="text-white font-semibold">Statistical Edge</span>
                                    <p class="text-slate-400 text-sm">Be the "House" by selling over-priced premium and using volatility to your advantage</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Bottom Insight -->
            <div class="jungle-insight bg-slate-800/50 border border-amber-500/20 rounded-xl p-5 flex items-start gap-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-slate-800/70">
                <div class="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                </div>
                <div>
                    <h4 class="text-amber-400 font-bold mb-1">The Jungle Insight</h4>
                    <p class="text-slate-300 text-sm">The best traders don't choose sides—they use <b class="text-white">both tools strategically</b>. Own stocks for long-term wealth building. Use options to generate income, protect positions, and capitalize on short-term opportunities.</p>
                </div>
            </div>
        </div>
        `,
        analogy: "Stocks are like owning a house. Options are like renting one—or selling insurance on it. Both have their place depending on your goals.",
        nuance: "<b>Synergy:</b> The most powerful portfolios combine stock ownership with options strategies. Covered calls on stocks you own. Protective puts when volatility spikes. The tools work together.",
        example: ""
    },,
    {
        id: 'who-are-options-for', tier: 0, tierName: 'Foundations', name: 'Who Are Options For?', outlook: 'Educational', objective: 'Demystification', risk: 'None', legs: [],
        analysis: `
        <div class="space-y-12">
            <!-- Myth Demolition -->
            <div class="who-options-pane myth-demolition-pane relative p-8 rounded-3xl overflow-hidden border border-white/10 bg-slate-900/40 transition-all duration-300 cursor-pointer">
                <div class="absolute -right-20 -top-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
                <div class="flex flex-col md:flex-row gap-8 items-center">
                    <div class="animate-bounce"><svg class="w-32 h-32 text-rose-500" style="filter: drop-shadow(0 0 25px rgba(244,63,94,0.8))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                    <div>
                        <h3 class="text-2xl font-black text-rose-400 uppercase mb-2">The Common Fallacy</h3>
                        <p class="text-slate-300 text-lg leading-relaxed">
                            Many believe options are "only for experts" or "just for gambling." This myth keeps regular investors away from the <span class="text-emerald-400 font-bold">most powerful risk-management tools</span> in finance.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Understanding the Levels -->
            <div class="who-options-pane levels-pane border border-amber-500/20 bg-amber-500/5 p-6 rounded-2xl transition-all duration-300 cursor-pointer">
                <div class="flex items-start gap-4">
                    <svg class="w-8 h-8 text-amber-400 shrink-0 mt-1" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    <div>
                        <h4 class="text-lg font-bold text-amber-400 mb-2">What Determines Your Level?</h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Your level isn't about intelligence—it's about <b>how many variables you can manage at once</b>. Beginners focus on <b>one variable</b> (direction). Intermediate traders add <b>two variables</b> (direction + time decay). Advanced traders juggle <b>multiple variables</b> (direction, time, volatility, and correlation). Each level builds on the last.
                        </p>
                    </div>
                </div>
            </div>

            <!-- BEGINNER SECTION -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <svg class="w-8 h-8 text-emerald-400" style="filter: drop-shadow(0 0 10px rgba(16,185,129,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-black text-emerald-400 uppercase">The Beginner</h3>
                        <p class="text-slate-400 text-sm">Goal: Protection & Simple Directional Bets</p>
                    </div>
                </div>

                <div class="who-options-pane beginner-glass-pane glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500 transition-all duration-300 cursor-pointer">
                    <h4 class="text-white font-bold mb-3">Why These Are Beginner Strategies:</h4>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        <li class="flex gap-2"><span class="text-emerald-400">✓</span> <b>One decision:</b> Which direction will the stock move?</li>
                        <li class="flex gap-2"><span class="text-emerald-400">✓</span> <b>Defined risk:</b> You can only lose what you pay (premium)</li>
                        <li class="flex gap-2"><span class="text-emerald-400">✓</span> <b>No margin required:</b> Cash-based, no borrowing</li>
                        <li class="flex gap-2"><span class="text-emerald-400">✓</span> <b>Simple math:</b> Stock goes up = Call profits. Stock goes down = Put profits.</li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Long Call -->
                    <div class="who-options-card bg-slate-800/40 border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">📈</span>
                            <h5 class="text-white font-bold">Long Call</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy a call when you think the stock will go UP. Max loss = premium paid.</p>
                        <div class="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded inline-block">BULLISH • DEFINED RISK</div>
                    </div>

                    <!-- Long Put -->
                    <div class="who-options-card bg-slate-800/40 border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">📉</span>
                            <h5 class="text-white font-bold">Long Put</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy a put when you think the stock will go DOWN. Max loss = premium paid.</p>
                        <div class="text-[10px] font-mono text-rose-500 bg-rose-500/10 px-2 py-1 rounded inline-block">BEARISH • DEFINED RISK</div>
                    </div>

                    <!-- Protective Put -->
                    <div class="who-options-card bg-slate-800/40 border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🛡️</span>
                            <h5 class="text-white font-bold">Protective Put</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Own stock + buy a put = insurance. Your stock can't fall below put strike.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">PROTECTION • INSURANCE</div>
                    </div>

                    <!-- LEAPS -->
                    <div class="who-options-card bg-slate-800/40 border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🗓️</span>
                            <h5 class="text-white font-bold">LEAPS (Long-Dated Calls)</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Calls with 1-2 years until expiration. Time decay is minimal. Leverage with patience.</p>
                        <div class="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded inline-block">LONG-TERM BULLISH</div>
                    </div>

                    <!-- Married Put -->
                    <div class="who-options-card bg-slate-800/40 border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">💍</span>
                            <h5 class="text-white font-bold">Married Put</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy stock + put simultaneously. You're bullish but want protection from day one.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">BULLISH + PROTECTED</div>
                    </div>

                    <!-- Synthetic Long Stock -->
                    <div class="who-options-card bg-slate-800/40 border border-emerald-500/20 p-5 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🔄</span>
                            <h5 class="text-white font-bold">Synthetic Long Stock</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy call + sell put at same strike. Acts like owning stock with less capital.</p>
                        <div class="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded inline-block">STOCK REPLACEMENT</div>
                    </div>
                </div>
            </div>

            <!-- INTERMEDIATE SECTION -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <svg class="w-8 h-8 text-cyan-400" style="filter: drop-shadow(0 0 10px rgba(34,211,238,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-black text-cyan-400 uppercase">The Intermediate</h3>
                        <p class="text-slate-400 text-sm">Goal: Generate Income & Reduce Cost Basis</p>
                    </div>
                </div>

                <div class="who-options-pane intermediate-glass-pane glass-panel p-6 rounded-2xl border-l-4 border-l-cyan-500 transition-all duration-300 cursor-pointer">
                    <h4 class="text-white font-bold mb-3">Why These Are Intermediate Strategies:</h4>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        <li class="flex gap-2"><span class="text-cyan-400">✓</span> <b>Two decisions:</b> Direction + when to sell premium (timing)</li>
                        <li class="flex gap-2"><span class="text-cyan-400">✓</span> <b>Obligation risk:</b> Selling options means potential assignment</li>
                        <li class="flex gap-2"><span class="text-cyan-400">✓</span> <b>Stock ownership required:</b> Need to own shares (covered) or have cash (cash-secured)</li>
                        <li class="flex gap-2"><span class="text-cyan-400">✓</span> <b>Time decay works FOR you:</b> Theta is your friend when selling premium</li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Covered Call -->
                    <div class="who-options-card bg-slate-800/40 border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🏠</span>
                            <h5 class="text-white font-bold">Covered Call</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Own 100 shares + sell a call. Get paid monthly. Stock called away if it rises above strike.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">INCOME • NEUTRAL/BULLISH</div>
                    </div>

                    <!-- Cash-Secured Put -->
                    <div class="who-options-card bg-slate-800/40 border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">💵</span>
                            <h5 class="text-white font-bold">Cash-Secured Put</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell a put with cash to cover. Get paid to wait to buy stock at your target price.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">INCOME • ACQUISITION</div>
                    </div>

                    <!-- Poor Man's Covered Call -->
                    <div class="who-options-card bg-slate-800/40 border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🎯</span>
                            <h5 class="text-white font-bold">Poor Man's Covered Call</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">LEAPS call + sell short-term calls. Like covered calls but with less capital.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">INCOME • CAPITAL EFFICIENT</div>
                    </div>

                    <!-- Collar -->
                    <div class="who-options-card bg-slate-800/40 border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">📎</span>
                            <h5 class="text-white font-bold">Collar</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Own stock + buy put + sell call. Protection funded by covered call. Limited up/down.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">PROTECTION • NEUTRAL</div>
                    </div>

                    <!-- Bull Put Spread -->
                    <div class="who-options-card bg-slate-800/40 border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🐂</span>
                            <h5 class="text-white font-bold">Bull Put Spread</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell put + buy lower put. Collect credit if stock stays above short strike.</p>
                        <div class="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded inline-block">BULLISH • DEFINED RISK</div>
                    </div>

                    <!-- Bear Call Spread -->
                    <div class="who-options-card bg-slate-800/40 border border-cyan-500/20 p-5 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🐻</span>
                            <h5 class="text-white font-bold">Bear Call Spread</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell call + buy higher call. Collect credit if stock stays below short strike.</p>
                        <div class="text-[10px] font-mono text-rose-500 bg-rose-500/10 px-2 py-1 rounded inline-block">BEARISH • DEFINED RISK</div>
                    </div>
                </div>
            </div>

            <!-- ADVANCED SECTION -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                        <svg class="w-8 h-8 text-purple-400" style="filter: drop-shadow(0 0 10px rgba(168,85,247,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-black text-purple-400 uppercase">The Advanced</h3>
                        <p class="text-slate-400 text-sm">Goal: Profit from Volatility, Time & Multi-Dimensional Moves</p>
                    </div>
                </div>

                <div class="who-options-pane advanced-glass-pane glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500 transition-all duration-300 cursor-pointer">
                    <h4 class="text-white font-bold mb-3">Why These Are Advanced Strategies:</h4>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        <li class="flex gap-2"><span class="text-purple-400">✓</span> <b>Multiple variables:</b> Direction + time + volatility + sometimes multiple stocks</li>
                        <li class="flex gap-2"><span class="text-purple-400">✓</span> <b>Greek management:</b> Must understand Delta, Theta, Vega, and how they interact</li>
                        <li class="flex gap-2"><span class="text-purple-400">✓</span> <b>3-4 legs:</b> Multiple options working together create complex P&L profiles</li>
                        <li class="flex gap-2"><span class="text-purple-400">✓</span> <b>Volatility plays:</b> Profit when IV rises or falls, not just from stock movement</li>
                        <li class="flex gap-2"><span class="text-purple-400">✓</span> <b>Active management:</b> May require rolling, adjusting, or early closing</li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Iron Condor -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🦅</span>
                            <h5 class="text-white font-bold">Iron Condor</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell put spread + sell call spread. Profit if stock stays in range. 4 legs.</p>
                        <div class="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded inline-block">NEUTRAL • SELL VOLATILITY</div>
                    </div>

                    <!-- Iron Butterfly -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🦋</span>
                            <h5 class="text-white font-bold">Iron Butterfly</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell ATM straddle + buy OTM strangle. Max profit if stock pins at center strike.</p>
                        <div class="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded inline-block">PINNING • HIGH CREDIT</div>
                    </div>

                    <!-- Calendar Spread -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">📅</span>
                            <h5 class="text-white font-bold">Calendar Spread</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell short-term + buy long-term at same strike. Profits from time decay differential.</p>
                        <div class="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded inline-block">TIME PLAY • VEGA LONG</div>
                    </div>

                    <!-- Diagonal Spread -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">↗️</span>
                            <h5 class="text-white font-bold">Diagonal Spread</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Calendar + vertical combined. Different strikes AND different expirations.</p>
                        <div class="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded inline-block">DIRECTIONAL + TIME</div>
                    </div>

                    <!-- Straddle -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">⚡</span>
                            <h5 class="text-white font-bold">Long Straddle</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy ATM call + ATM put. Profit from big move in either direction. Buy volatility.</p>
                        <div class="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded inline-block">BIG MOVE • LONG VEGA</div>
                    </div>

                    <!-- Strangle -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🎸</span>
                            <h5 class="text-white font-bold">Long Strangle</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy OTM call + OTM put. Cheaper than straddle but needs bigger move to profit.</p>
                        <div class="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded inline-block">BREAKOUT PLAY</div>
                    </div>

                    <!-- Butterfly -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🎯</span>
                            <h5 class="text-white font-bold">Butterfly Spread</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">3 strikes: Buy 1 + Sell 2 + Buy 1. Max profit at center strike. Low cost pinning bet.</p>
                        <div class="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded inline-block">PRECISION • LOW COST</div>
                    </div>

                    <!-- Ratio Spreads -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">⚖️</span>
                            <h5 class="text-white font-bold">Ratio Spreads</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Uneven legs (buy 1, sell 2). Can be done for credit but has unlimited risk on one side.</p>
                        <div class="text-[10px] font-mono text-rose-500 bg-rose-500/10 px-2 py-1 rounded inline-block">COMPLEX • UNDEFINED RISK</div>
                    </div>

                    <!-- Jade Lizard -->
                    <div class="who-options-card bg-slate-800/40 border border-purple-500/20 p-5 rounded-2xl hover:border-purple-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🦎</span>
                            <h5 class="text-white font-bold">Jade Lizard</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Short put + short call spread. No upside risk if done correctly. Premium collection.</p>
                        <div class="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-1 rounded inline-block">PREMIUM • NO UPSIDE RISK</div>
                    </div>
                </div>
            </div>

            <!-- INVESTOR SECTION -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                        <svg class="w-8 h-8 text-pink-400" style="filter: drop-shadow(0 0 10px rgba(236,72,153,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-black text-pink-400 uppercase">The Investor</h3>
                        <p class="text-slate-400 text-sm">Goal: Long-Term Portfolio Enhancement & Tax-Efficient Wealth Building</p>
                    </div>
                </div>

                <div class="who-options-pane investor-glass-pane glass-panel p-6 rounded-2xl border-l-4 border-l-pink-500 transition-all duration-300 cursor-pointer">
                    <h4 class="text-white font-bold mb-3">Why These Are Investor Strategies:</h4>
                    <ul class="space-y-2 text-slate-300 text-sm">
                        <li class="flex gap-2"><span class="text-pink-400">✓</span> <b>Long-term focus:</b> Weeks to months, not days. Compounding over time.</li>
                        <li class="flex gap-2"><span class="text-pink-400">✓</span> <b>Portfolio integration:</b> Options enhance existing stock positions</li>
                        <li class="flex gap-2"><span class="text-pink-400">✓</span> <b>Tax awareness:</b> Strategies consider wash sales, holding periods, tax lots</li>
                        <li class="flex gap-2"><span class="text-pink-400">✓</span> <b>Wealth preservation:</b> Focused on protecting gains, not just making gains</li>
                        <li class="flex gap-2"><span class="text-pink-400">✓</span> <b>Strategic acquisition:</b> Building positions systematically over time</li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- The Wheel -->
                    <div class="who-options-card bg-slate-800/40 border border-pink-500/20 p-5 rounded-2xl hover:border-pink-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🎡</span>
                            <h5 class="text-white font-bold">The Wheel Strategy</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell puts → get assigned → sell calls → get called away → repeat. Systematic income.</p>
                        <div class="text-[10px] font-mono text-pink-500 bg-pink-500/10 px-2 py-1 rounded inline-block">INCOME MACHINE</div>
                    </div>

                    <!-- Stock Replacement -->
                    <div class="who-options-card bg-slate-800/40 border border-pink-500/20 p-5 rounded-2xl hover:border-pink-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🔄</span>
                            <h5 class="text-white font-bold">Stock Replacement (LEAPS)</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Deep ITM LEAPS instead of stock. Same exposure, less capital, defined risk.</p>
                        <div class="text-[10px] font-mono text-pink-500 bg-pink-500/10 px-2 py-1 rounded inline-block">CAPITAL EFFICIENT</div>
                    </div>

                    <!-- Portfolio Hedge -->
                    <div class="who-options-card bg-slate-800/40 border border-pink-500/20 p-5 rounded-2xl hover:border-pink-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🏰</span>
                            <h5 class="text-white font-bold">Portfolio Hedge (Index Puts)</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy SPY or QQQ puts to protect entire portfolio from market crash. Sleep insurance.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">CRASH PROTECTION</div>
                    </div>

                    <!-- Tax-Loss Harvesting -->
                    <div class="who-options-card bg-slate-800/40 border border-pink-500/20 p-5 rounded-2xl hover:border-pink-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">📊</span>
                            <h5 class="text-white font-bold">Tax-Loss Harvesting w/ Options</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Sell losing stock, use options to maintain exposure without wash sale. Tax optimization.</p>
                        <div class="text-[10px] font-mono text-pink-500 bg-pink-500/10 px-2 py-1 rounded inline-block">TAX EFFICIENT</div>
                    </div>

                    <!-- Dividend Capture -->
                    <div class="who-options-card bg-slate-800/40 border border-pink-500/20 p-5 rounded-2xl hover:border-pink-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">💰</span>
                            <h5 class="text-white font-bold">Dividend Capture Strategy</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy stock before ex-div + sell covered call. Capture dividend + premium income.</p>
                        <div class="text-[10px] font-mono text-pink-500 bg-pink-500/10 px-2 py-1 rounded inline-block">DIVIDEND + PREMIUM</div>
                    </div>

                    <!-- Zero-Cost Collar -->
                    <div class="who-options-card bg-slate-800/40 border border-pink-500/20 p-5 rounded-2xl hover:border-pink-500/40 transition-all duration-300 cursor-pointer">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-2xl">🆓</span>
                            <h5 class="text-white font-bold">Zero-Cost Collar</h5>
                        </div>
                        <p class="text-slate-400 text-xs mb-3">Buy put + sell call where premiums offset. Free protection with capped upside.</p>
                        <div class="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded inline-block">FREE PROTECTION</div>
                    </div>
                </div>
            </div>

            <!-- Level Progression Ladder -->
            <div class="bg-slate-900/60 border border-white/10 p-8 rounded-3xl">
                <h3 class="text-xl font-bold text-white mb-6 text-center uppercase tracking-tight">The Skill Progression Ladder</h3>
                <div class="flex flex-col md:flex-row gap-4 items-stretch">
                    <div class="flex-1 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                        <div class="text-emerald-400 font-bold mb-2 text-sm">1. BEGINNER</div>
                        <p class="text-slate-400 text-xs">Master long calls/puts. Understand that options have an expiration and premium decays. Learn to pick strikes and expirations.</p>
                    </div>
                    <div class="flex items-center text-slate-600 text-2xl hidden md:flex">→</div>
                    <div class="flex-1 bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl">
                        <div class="text-cyan-400 font-bold mb-2 text-sm">2. INTERMEDIATE</div>
                        <p class="text-slate-400 text-xs">Start selling premium. Own stock first. Understand assignment risk. Learn to manage positions and roll when needed.</p>
                    </div>
                    <div class="flex items-center text-slate-600 text-2xl hidden md:flex">→</div>
                    <div class="flex-1 bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl">
                        <div class="text-purple-400 font-bold mb-2 text-sm">3. ADVANCED</div>
                        <p class="text-slate-400 text-xs">Combine multiple legs. Trade volatility, not just direction. Understand Greeks deeply. Profit from time decay and IV crush.</p>
                    </div>
                    <div class="flex items-center text-slate-600 text-2xl hidden md:flex">→</div>
                    <div class="flex-1 bg-pink-500/10 border border-pink-500/20 p-4 rounded-xl">
                        <div class="text-pink-400 font-bold mb-2 text-sm">4. INVESTOR</div>
                        <p class="text-slate-400 text-xs">Integrate options into long-term portfolio. Think about taxes, position sizing, and wealth preservation. Systematic approach.</p>
                    </div>
                </div>
            </div>

            <!-- Conclusion Summary -->
            <div class="border border-emerald-500/20 bg-emerald-500/5 p-8 rounded-[2rem] text-center relative overflow-hidden group">
                <div class="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                    <div>
                        <h3 class="text-xl font-bold text-emerald-400 mb-4 uppercase tracking-tighter">Options Are For Everyone (Who Does Their Homework)</h3>
                        <p class="text-slate-300 max-w-xl mx-auto leading-relaxed text-left md:text-center">
                            Options are right for <b>all levels</b> of investors, but only if you start with the <b>Underlying Stock</b> first. <br><br>
                            If you wouldn't buy the stock, you have no business buying the option. But if you have a thesis on the asset, options simply give you a sharper sword to express it—whether to <b>hedge</b>, <b>collect income</b>, or <b>leverage</b> your conviction.
                        </p>
                    </div>
                    <div class="shrink-0 wise-owl-container" style="perspective: 1000px;">
                         <img src="/metaphors/owl.webp" alt="Wise Owl with Glasses" class="wise-owl-image w-48 h-48 object-contain filter drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] transform -rotate-6 cursor-pointer transition-all duration-300" style="animation: owlBob 3s ease-in-out infinite;" />
                    </div>
                    <style>
                        @keyframes owlBob {
                            0%, 100% { transform: rotate(-6deg) translateY(0px); }
                            50% { transform: rotate(-6deg) translateY(-8px); }
                        }
                    </style>
                </div>
            </div>
        </div>
        `,
        analogy: "An option is like a car. A professional can use it to win a race (Advanced), a commuter uses it to get to work safely (Intermediate), and a teen uses it with a student permit and training wheels (Beginner). The car isn't the danger—the driver's training is.",
        nuance: "<b>Risk Reduction:</b> Most people think options increase risk. In reality, strategies like the <i>Collar</i> or <i>Covered Call</i> actually lower the volatility of your portfolio compared to just owning stock.",
        example: "Imagine the market is shaky. Instead of selling your favorite stock and paying taxes, you buy a <b>Put</b> for $1.00. The market drops 20%, but your Put gains in value, offsetting your losses. You used options to <i>stay in the game</i> while others were forced out."
    },,
    {
        id: 'know-thyself', tier: 0, tierName: 'Foundations', name: 'Know Thyself', outlook: 'Psychology', objective: 'Self-Awareness', risk: 'None', legs: [],
        analysis: `
        <div class="space-y-12">
            <!-- Compass Only -->
            <div class="text-center mb-8">
                <div class="inline-block">
                    <span class="text-5xl interactive-compass" style="display: inline-block; cursor: pointer;"><svg class="w-16 h-16 text-emerald-400 compass-svg" style="filter: drop-shadow(0 0 10px rgba(52,211,153,0.5)); transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon class="compass-needle" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.3" style="transform-origin: center; transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);"/><polygon class="compass-needle" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" style="transform-origin: center; transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg></span>
                </div>
            </div>

            <!-- The 4 Types Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <!-- 1. Scalpers -->
                <div class="know-thyself-pane scalpers-pane bg-transparent border border-rose-500/20 p-8 rounded-3xl group hover:border-rose-500/40 transition-all duration-300 relative overflow-hidden cursor-pointer">
                    <!-- Lemur Avatar -->
                    <div class="flex justify-center mb-6">
                        <div class="relative group/avatar">
                            <div class="absolute inset-0 rounded-full bg-rose-500/0 blur-xl group-hover/avatar:bg-rose-500/40 transition-all duration-500"></div>
                            <div class="relative w-56 h-56 rounded-full overflow-hidden border-2 border-rose-500/50 shadow-none group-hover/avatar:shadow-[0_0_30px_rgba(251,113,133,0.5)] group-hover/avatar:scale-110 group-hover/avatar:border-rose-400 transition-all duration-300">
                                <img src="/assets/Lemur Scalper.webp" alt="Lemur the Scalper" class="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-4xl"><svg class="w-10 h-10 text-rose-400 inline-block" style="filter: drop-shadow(0 0 8px rgba(251,113,133,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
                        <div>
                            <h4 class="text-xl font-bold text-rose-400 uppercase">1. Scalpers</h4>
                            <div class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">The Adrenaline Junkies</div>
                        </div>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li class="flex gap-2"><svg class="w-4 h-4 text-rose-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg> <span><b>Timeframe:</b> Seconds to Minutes.</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-rose-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> <span><b>Goal:</b> Tiny profits on high volume.</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-rose-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg> <span><b>Mindset:</b> Hyper-focused, reflexive, intense.</span></li>
                    </ul>
                </div>

                <!-- 2. Day Traders -->
                <div class="know-thyself-pane daytraders-pane bg-transparent border border-amber-500/20 p-8 rounded-3xl group hover:border-amber-500/40 transition-all duration-300 relative overflow-hidden cursor-pointer">
                    <!-- Cheetah Avatar -->
                    <div class="flex justify-center mb-6">
                        <div class="relative group/avatar">
                            <div class="absolute inset-0 rounded-full bg-amber-500/0 blur-xl group-hover/avatar:bg-amber-500/40 transition-all duration-500"></div>
                            <div class="relative w-56 h-56 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-none group-hover/avatar:shadow-[0_0_30px_rgba(251,191,36,0.5)] group-hover/avatar:scale-110 group-hover/avatar:border-amber-400 transition-all duration-300">
                                <img src="/assets/Cheetah Day Trader.webp" alt="Cheetah the Day Trader" class="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-4xl"><svg class="w-10 h-10 text-amber-400 inline-block" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>
                        <div>
                            <h4 class="text-xl font-bold text-amber-400 uppercase">2. Day Traders</h4>
                            <div class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">The Daily Grinders</div>
                        </div>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li class="flex gap-2"><svg class="w-4 h-4 text-amber-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg> <span><b>Timeframe:</b> Minutes to Hours. (Flat by close).</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-amber-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> <span><b>Goal:</b> Capture the day's range. No overnight risk.</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-amber-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg> <span><b>Mindset:</b> Disciplined, routine-oriented, tactical.</span></li>
                    </ul>
                </div>

                <!-- 3. Swing Traders -->
                <div class="know-thyself-pane swingtraders-pane bg-transparent border border-cyan-500/20 p-8 rounded-3xl group hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden cursor-pointer">
                    <!-- Monkey Avatar -->
                    <div class="flex justify-center mb-6">
                        <div class="relative group/avatar">
                            <div class="absolute inset-0 rounded-full bg-cyan-500/0 blur-xl group-hover/avatar:bg-cyan-500/40 transition-all duration-500"></div>
                            <div class="relative w-56 h-56 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-none group-hover/avatar:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover/avatar:scale-110 group-hover/avatar:border-cyan-400 transition-all duration-300">
                                <img src="/assets/Monkey Swing Trader.webp" alt="Monkey the Swing Trader" class="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-4xl"><svg class="w-10 h-10 text-cyan-400 inline-block" style="filter: drop-shadow(0 0 8px rgba(34,211,238,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg></span>
                        <div>
                            <h4 class="text-xl font-bold text-cyan-400 uppercase">3. Swing Traders</h4>
                            <div class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">The Surfers</div>
                        </div>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li class="flex gap-2"><svg class="w-4 h-4 text-cyan-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg> <span><b>Timeframe:</b> Days to weeks to months and sometimes a year or two.</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-cyan-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> <span><b>Goal:</b> Catching a multi-day trend move.</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-cyan-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg> <span><b>Mindset:</b> Patient, analytical, calm.</span></li>
                    </ul>
                </div>

                <!-- 4. Investors -->
                <div class="know-thyself-pane investors-pane bg-transparent border border-emerald-500/20 p-8 rounded-3xl group hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden cursor-pointer">
                    <!-- Badger Avatar -->
                    <div class="flex justify-center mb-6">
                        <div class="relative group/avatar">
                            <div class="absolute inset-0 rounded-full bg-emerald-500/0 blur-xl group-hover/avatar:bg-emerald-500/40 transition-all duration-500"></div>
                            <div class="relative w-56 h-56 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-none group-hover/avatar:shadow-[0_0_30px_rgba(52,211,153,0.5)] group-hover/avatar:scale-110 group-hover/avatar:border-emerald-400 transition-all duration-300">
                                <img src="/assets/Badger Investor.webp" alt="Badger the Investor" class="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-4xl"><svg class="w-10 h-10 text-emerald-400 inline-block" style="filter: drop-shadow(0 0 8px rgba(52,211,153,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></span>
                        <div>
                            <h4 class="text-xl font-bold text-emerald-400 uppercase">4. Investors</h4>
                            <div class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">The Architects</div>
                        </div>
                    </div>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li class="flex gap-2"><svg class="w-4 h-4 text-emerald-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg> <span><b>Timeframe:</b> Months to Years.</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-emerald-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> <span><b>Goal:</b> Wealth compounding and value.</span></li>
                        <li class="flex gap-2"><svg class="w-4 h-4 text-emerald-500" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg> <span><b>Mindset:</b> Visionary, detached, strategic.</span></li>
                    </ul>
                </div>

            </div>

            <!-- Options Work For Everyone -->
            <div class="mt-8 border border-emerald-500/30 rounded-2xl p-8 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-amber-500/5 via-cyan-500/5 to-emerald-500/5"></div>
                <div class="relative">
                    <div class="flex justify-center mb-4">
                        <svg class="w-12 h-12 text-emerald-400" style="filter: drop-shadow(0 0 12px rgba(52,211,153,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <h4 class="text-2xl font-bold text-white mb-4">Options Work for <span class="text-emerald-400">Every</span> Style</h4>
                    <p class="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-6">Whether you're a lightning-fast <span class="text-rose-400 font-semibold">Scalper</span>, a disciplined <span class="text-amber-400 font-semibold">Day Trader</span>, a patient <span class="text-cyan-400 font-semibold">Swing Trader</span>, or a long-term <span class="text-emerald-400 font-semibold">Investor</span>—options are the most versatile tool in the market.</p>
                    <p class="text-slate-400 max-w-2xl mx-auto">The key isn't changing who you are. It's <b class="text-white">mastering the right strategies</b> for your style. This course will teach you exactly which options strategies fit your personality, your schedule, and your risk tolerance.</p>
                    <div class="mt-6 flex justify-center gap-3">
                        <span class="w-3 h-3 rounded-full bg-rose-500" style="box-shadow: 0 0 10px rgba(251,113,133,0.6)"></span>
                        <span class="w-3 h-3 rounded-full bg-amber-500" style="box-shadow: 0 0 10px rgba(251,191,36,0.6)"></span>
                        <span class="w-3 h-3 rounded-full bg-cyan-500" style="box-shadow: 0 0 10px rgba(34,211,238,0.6)"></span>
                        <span class="w-3 h-3 rounded-full bg-emerald-500" style="box-shadow: 0 0 10px rgba(52,211,153,0.6)"></span>
                    </div>
                </div>
            </div>

            <!-- Conclusion -->
            <div
                id="fatal-mistake-pane"
                class="bg-black/60 border-2 border-rose-500/50 p-12 rounded-2xl flex items-start gap-8 shadow-[0_0_30px_rgba(244,63,94,0.3)] cursor-pointer transition-all duration-300"
                onmouseover="
                    const pane = this;
                    pane.style.borderColor = 'rgb(244, 63, 94)';
                    pane.style.boxShadow = '0 0 40px rgba(244,63,94,0.8), 0 0 80px rgba(244,63,94,0.6), 0 0 120px rgba(244,63,94,0.4), inset 0 0 60px rgba(244,63,94,0.15)';
                    pane.style.backgroundColor = 'rgba(244,63,94,0.15)';
                    pane.style.transform = 'scale(1.02)';

                    try {
                        const AudioContext = window.AudioContext || window.webkitAudioContext;
                        const ctx = new AudioContext();
                        const now = ctx.currentTime;

                        // Create danger siren sound
                        const osc1 = ctx.createOscillator();
                        const osc2 = ctx.createOscillator();
                        const gain = ctx.createGain();

                        // Two-tone alarm (like emergency siren)
                        osc1.type = 'sine';
                        osc2.type = 'sine';

                        // Oscillate between two frequencies
                        osc1.frequency.setValueAtTime(800, now);
                        osc1.frequency.setValueAtTime(600, now + 0.2);
                        osc1.frequency.setValueAtTime(800, now + 0.4);
                        osc1.frequency.setValueAtTime(600, now + 0.6);

                        osc2.frequency.setValueAtTime(820, now);
                        osc2.frequency.setValueAtTime(620, now + 0.2);
                        osc2.frequency.setValueAtTime(820, now + 0.4);
                        osc2.frequency.setValueAtTime(620, now + 0.6);

                        // Envelope
                        gain.gain.setValueAtTime(0, now);
                        gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
                        gain.gain.setValueAtTime(0.15, now + 0.6);
                        gain.gain.linearRampToValueAtTime(0, now + 0.7);

                        // Connect
                        osc1.connect(gain);
                        osc2.connect(gain);
                        gain.connect(ctx.destination);

                        // Play
                        osc1.start(now);
                        osc2.start(now);
                        osc1.stop(now + 0.7);
                        osc2.stop(now + 0.7);

                        setTimeout(() => ctx.close().catch(() => {}), 800);
                    } catch (e) {
                        console.error('Audio failed:', e);
                    }
                "
                onmouseout="
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                    this.style.backgroundColor = '';
                    this.style.transform = '';
                "
            >
                <div class="w-36 h-36 shrink-0 mt-1 rounded-full overflow-hidden filter drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]">
                    <img src="/assets/Fatal_Mistake_Warning.webp" alt="Fatal Mistake Warning" class="w-full h-full object-cover" />
                </div>
                <div>
                    <h5 class="text-rose-400 font-black text-3xl mb-4" style="text-shadow: 0 0 20px rgba(244,63,94,0.5)">Fatal Mistake</h5>
                    <p class="text-slate-200 text-lg leading-relaxed">Most beginners fail because they <b class="text-white">think</b> they are Scalpers (wanting fast money) but they <b class="text-white">act</b> like Investors (holding onto losing trades forever). Or they think they are Investors but act like short-term Scalpers. In either case, the mistake is that they forget which game they are playing. <b class="text-rose-400">Pick a lane and stay in it.</b></p>
                </div>
            </div>
        </div>
        `,
        analogy: "The unexamined life is not worth living. — Socrates\n\nKnowing yourself is the beginning of all wisdom. — Aristotle\n\nWisdom comes alone through suffering. — Aeschylus\n\nIf you do not know who you are, the market is an expensive place to find out. — Adam Smith",
        nuance: "<b>Frequency vs. Accuracy:</b> Scalpers make 100 trades to make 100 points. Investors make 1 trade to make 100 points. The tax bill and stress levels are the difference.",
        example: ""
    },,
    {
        id: 'options-vocabulary',
        name: 'Options Vocabulary',
        tier: 0,
        tierName: 'Foundations',
        outlook: 'Educational',
        objective: 'Terminology',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="text-center py-12"><p class="text-slate-400">Interactive vocabulary guide - click to open</p></div>`,
        analogy: "A field guide to the jungle. Before you hunt, you must know the names of the creatures.",
        nuance: "<b>Fluency First:</b> Options traders speak their own language. BTO, STO, IV, OI, sweeps, blocks—master the vocabulary and the charts become readable.",
        example: ""
    },,
    {
        id: 'rules-of-the-jungle', tier: 0, tierName: 'Foundations', name: 'Rules of the Jungle', outlook: 'Psychology', objective: 'Discipline', risk: 'Mindset', legs: [],
        analysis: `
        <style>
            .jungle-rules-container {
                --bg-color: transparent;
                --card-bg: rgba(15, 23, 42, 0.6);
                --card-back-bg: rgba(10, 15, 25, 0.8);
                --text-primary: #e0e0e0;
                --text-secondary: #94a3b8;
                --accent-green: #10b981;
                --accent-green-dim: rgba(16, 185, 129, 0.2);
                --accent-red: #f43f5e;
                --accent-gold: #fbbf24;
                --font-mono: 'JetBrains Mono', monospace;
                --font-sans: 'Inter', sans-serif;

                color: var(--text-primary);
                font-family: var(--font-sans);
                line-height: 1.6;
            }

            .jungle-rules-container header {
                text-align: center;
                margin-bottom: 60px;
                padding-bottom: 20px;
            }

            .jungle-rules-container h1 {
                font-family: var(--font-mono);
                color: var(--accent-green);
                font-size: 2.5rem;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 4px;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #10b981 0%, #6ee7b7 25%, #34d399 50%, #6ee7b7 75%, #10b981 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                background-size: 300% 300%;
                animation: predatorShimmer 4s ease-in-out infinite;
                filter:
                    drop-shadow(0 0 8px rgba(16,185,129,0.6))
                    drop-shadow(0 0 20px rgba(16,185,129,0.4))
                    drop-shadow(0 0 40px rgba(16,185,129,0.25));
            }

            @keyframes predatorShimmer {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            .jungle-rules-container .quote {
                font-style: italic;
                color: var(--text-secondary);
                font-size: 1.1rem;
                max-width: 800px;
                margin: 0 auto;
            }

            .jungle-rules-container .quote span {
                color: var(--accent-green);
                font-weight: bold;
            }

            /* FLIP GRID */
            .jungle-rules-container .grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 30px;
                max-width: 1400px;
                margin: 0 auto;
                padding: 20px;
            }

            .flip-card-wrapper {
                background-color: transparent;
                width: 100%;
                height: 280px;
                perspective: 1000px;
                cursor: pointer;
                overflow: visible;
                position: relative;
                transition: none;
            }

            .flip-card-wrapper:hover {
            }

            .flip-input {
                display: none;
            }

            .flip-card-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1), box-shadow 0.3s ease;
                transform-style: preserve-3d;
                z-index: 10;
            }

            /* Flip trigger */
            .flip-input:checked + .flip-card-inner {
                transform: rotateY(180deg);
            }

            /* Wobble Animation */
            @keyframes mild-wobble {
                0%, 100% { transform: rotateY(0deg); }
                25% { transform: rotateY(4deg); }
                75% { transform: rotateY(-4deg); }
            }

            /* Glow pulse animation */
            @keyframes glow-pulse {
                0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.2), 0 0 40px rgba(16, 185, 129, 0.1); }
                50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2); }
            }

            /* Icon float animation */
            @keyframes icon-float {
                0%, 100% { transform: scale(1.15) translateY(0); }
                50% { transform: scale(1.2) translateY(-8px); }
            }

            /* Border glow animation */
            @keyframes border-glow {
                0%, 100% { border-color: var(--accent-green); }
                50% { border-color: #4ade80; }
            }

            /* Hover effect - subtle wobble only, no box glow since no container */
            .flip-card-wrapper:hover .flip-card-inner {
            }

            /* Only wobble if not flipped */
            .flip-card-wrapper:hover input:not(:checked) + .flip-card-inner {
                 animation: mild-wobble 1.2s ease-in-out infinite;
            }

            .flip-card-front, .flip-card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                border-radius: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 24px;
                border: none;
                background: transparent;
                transition: none;
            }

            .flip-card-front {
                background: transparent;
            }

            .flip-card-wrapper:hover .flip-card-front {
            }

            .flip-card-back {
                background: rgba(0, 0, 0, 0.85);
                border-radius: 16px;
                border: 1px solid rgba(16, 185, 129, 0.3);
                transform: rotateY(180deg);
                overflow-y: auto;
                justify-content: flex-start;
                text-align: left;
            }

            .flip-card-wrapper:hover .flip-card-back {
                border-color: rgba(16, 185, 129, 0.6);
            }

            .flip-card-back::-webkit-scrollbar { width: 4px; }
            .flip-card-back::-webkit-scrollbar-track { background: transparent; }
            .flip-card-back::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

            .icon-front {
                font-size: 4rem;
                margin-bottom: 20px;
                filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));
                transition: transform 0.3s ease, filter 0.3s ease;
            }

            .flip-card-wrapper:hover .icon-front {
                animation: icon-float 1.5s ease-in-out infinite;
                filter: drop-shadow(0 0 20px currentColor);
            }

            .flip-card-wrapper:hover .icon-front svg {
                filter: drop-shadow(0 0 15px currentColor);
            }

            .title-front {
                font-family: var(--font-mono);
                color: var(--accent-green);
                font-size: 1.4rem;
                font-weight: bold;
                text-transform: uppercase;
                margin: 0;
                transition: text-shadow 0.3s ease, color 0.3s ease;
            }

            .flip-card-wrapper:hover .title-front {
                text-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4);
                color: #4ade80;
            }
            
            .back-header {
                display: flex;
                align-items: center;
                width: 100%;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding-bottom: 10px;
                margin-bottom: 15px;
            }
            
            .icon-back {
                font-size: 1.5rem;
                margin-right: 10px;
            }
            
            .title-back {
                font-family: var(--font-mono);
                color: var(--accent-green);
                font-size: 1rem;
                font-weight: bold;
                text-transform: uppercase;
            }

            .flip-card-back p {
                color: var(--text-secondary);
                font-size: 0.95rem;
                line-height: 1.6;
                width: 100%;
            }

            .highlight { color: var(--text-primary); font-weight: 600; }
            .sell { color: var(--accent-red); font-weight: bold; }
            .buy { color: var(--accent-green); font-weight: bold; }
            .iv { color: var(--accent-gold); font-weight: bold; }

            .flip-card-back ul {
                padding-left: 20px;
                margin: 10px 0;
                list-style-type: disc;
                align-self: flex-start;
                color: var(--text-secondary);
                font-size: 0.9rem;
            }
            
            .flip-card-back li {
                margin-bottom: 5px;
            }
        </style>

        <div class="jungle-rules-container">

            <!-- TIER LABELS -->
            <style>
                .tier-label {
                    grid-column: 1 / -1;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 10px 0;
                    margin-top: 20px;
                }
                .tier-label:first-of-type { margin-top: 0; }
                .tier-label span {
                    font-family: var(--font-mono);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: #64748b;
                }
                .tier-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, rgba(100,116,139,0.3), transparent);
                }
            </style>

            <div class="grid-container">

                <!-- ═══════════════════════════════════════════════════════════ -->
                <!-- TIER 1: MINDSET - Psychology comes first                    -->
                <!-- ═══════════════════════════════════════════════════════════ -->
                <div class="tier-label"><span>Tier I: Mindset</span></div>

                <!-- 1. Monitor Greed -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-slate-300" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></span>
                            <h2 class="title-front">Monitor Greed</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-emerald-400" style="filter: drop-shadow(0 0 6px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></span>
                                <h3 class="title-back">Monitor Greed</h3>
                            </div>
                            <p>Monitor your Greed level carefully and honestly. Emotional discipline is the first line of defense. If you feel euphoric, it's likely time to sell.</p>
                            <p class="mt-3 text-sm italic text-emerald-300/80">"It is not the man who has too little, but the man who craves more, that is poor." — Seneca</p>
                        </div>
                    </div>
                </label>

                <!-- 2. No Revenge -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-rose-500" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg></span>
                            <h2 class="title-front">No Revenge</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-rose-500 inline-block" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg></span>
                                <h3 class="title-back">Discipline</h3>
                            </div>
                            <p>You will never be 100% right; but don't compound mistakes by chasing or revenge trading. Accept the loss as a tuition fee and clear your mind.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"He who cannot obey himself will be commanded." — Friedrich Nietzsche, Thus Spoke Zarathustra</p>
                        </div>
                    </div>
                </label>

                <!-- 3. Patience -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-pink-500" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3 C10 7 10 11 12 15 C14 11 14 7 12 3Z"/><path d="M7 7 C4 10 5 14 9 16 C8 12 7 9 7 7Z"/><path d="M17 7 C20 10 19 14 15 16 C16 12 17 9 17 7Z"/><path d="M4 12 C2 15 4 18 8 18 C6 15 5 13 4 12Z"/><path d="M20 12 C22 15 20 18 16 18 C18 15 19 13 20 12Z"/><line x1="12" y1="15" x2="12" y2="22"/></svg></span>
                            <h2 class="title-front">Patience</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-pink-500" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3 C10 7 10 11 12 15 C14 11 14 7 12 3Z"/><path d="M7 7 C4 10 5 14 9 16 C8 12 7 9 7 7Z"/><path d="M17 7 C20 10 19 14 15 16 C16 12 17 9 17 7Z"/><path d="M4 12 C2 15 4 18 8 18 C6 15 5 13 4 12Z"/><path d="M20 12 C22 15 20 18 16 18 C18 15 19 13 20 12Z"/><line x1="12" y1="15" x2="12" y2="22"/></svg></span>
                                <h3 class="title-back">Zen</h3>
                            </div>
                            <p>Often doing nothing is the correct move until the situation is stacked in your favor. Sit on your hands and cultivate patience. <span class="sell">FOMO is the enemy.</span></p>
                            <p class="mt-3 text-xs italic text-slate-400">"All of humanity's problems stem from man's inability to sit quietly in a room alone." — Blaise Pascal, Pensées</p>
                        </div>
                    </div>
                </label>

                <!-- 4. Cash is a Position -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-emerald-500" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
                            <h2 class="title-front">Cash is a Position</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-emerald-500" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
                                <h3 class="title-back">Optionality</h3>
                            </div>
                            <p>You don't always have to be in a trade. Cash is a valid position. It gives you the <span class="highlight">optionality</span> to strike when opportunities are perfect.</p>
                            <p class="mt-3 text-sm italic text-emerald-300/80">"It is better to be on the sidelines and wish you were in than it is to be in the market and wish you were out."</p>
                            <p class="mt-2 text-xs italic text-slate-400">"I just wait until there is money lying in the corner, and all I have to do is go over there and pick it up. I do nothing in the meantime." — Jim Rogers</p>
                        </div>
                    </div>
                </label>

                <!-- 5. Anticipate > React -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-amber-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></span>
                            <h2 class="title-front">Anticipate > React</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-amber-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></span>
                                <h3 class="title-back">Hunter vs. Prey</h3>
                            </div>
                            <p>The market transfers wealth from the <span class="sell">Reactive</span> to the <span class="buy">Anticipatory</span>.</p>
                            <ul>
                                <li><strong>Amateur:</strong> Chases green candles, sells the bottom.</li>
                                <li><strong>Professional:</strong> Stalks the zone, sells into strength.</li>
                            </ul>
                            <p class="mt-3 text-xs italic text-slate-400">"You do not need to leave your room. Remain sitting at your table and listen. Do not even listen, simply wait, be quiet, still and solitary. The world will freely offer itself to you to be unmasked, it has no choice, it will roll in ecstasy at your feet." — Franz Kafka, The Zürau Aphorisms</p>
                        </div>
                    </div>
                </label>

                <!-- 6. Think Like an Artist -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-violet-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22c-4.97 0-9-2.69-9-6v-.5C3 12.46 6.58 10 11 10c.89 0 1.75.1 2.56.28"/><path d="M18 14.5c0 1.1-.9 2-2 2s-2-.9-2-2l2-6 2 6z"/><path d="M14 16.5l4-4"/></svg></span>
                            <h2 class="title-front">Think Like an Artist</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-violet-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22c-4.97 0-9-2.69-9-6v-.5C3 12.46 6.58 10 11 10c.89 0 1.75.1 2.56.28"/><path d="M18 14.5c0 1.1-.9 2-2 2s-2-.9-2-2l2-6 2 6z"/><path d="M14 16.5l4-4"/></svg></span>
                                <h3 class="title-back">Creativity</h3>
                            </div>
                            <p>Don't approach options and market structure formulaically—approach them like an <span class="iv">art</span>. Just as a fundamental analyst must move beyond price-to-earnings ratios, learning options and market structure adds more colors to your artistic paintbrush.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"The painter has the Universe in his mind and hands." — Leonardo da Vinci</p>
                        </div>
                    </div>
                </label>

                <!-- ═══════════════════════════════════════════════════════════ -->
                <!-- TIER 2: RISK MANAGEMENT - The Foundation                    -->
                <!-- ═══════════════════════════════════════════════════════════ -->
                <div class="tier-label"><span>Tier II: Risk Management</span></div>

                <!-- 6. Frame Risk -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-cyan-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/><circle cx="12" cy="12" r="2"/></svg></span>
                            <h2 class="title-front">Frame Risk</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-cyan-400 inline-block" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/><circle cx="12" cy="12" r="2"/></svg></span>
                                <h3 class="title-back">Structure</h3>
                            </div>
                            <p>Risk management frame is crucial. Options can both increase or decrease risk depending on how they are structured. Define max loss <em>before</em> entry.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"The general who wins the battle makes many calculations in his temple before the battle is fought." — Sun Tzu, The Art of War</p>
                        </div>
                    </div>
                </label>

                <!-- 7. Position Sizing ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-orange-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
                            <h2 class="title-front">Position Sizing</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-orange-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
                                <h3 class="title-back">Never Bet the Farm</h3>
                            </div>
                            <p>Never risk more than <span class="sell">2-5%</span> of your portfolio on a single trade. One bad trade should sting, not kill.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Size positions so you can survive a <em>string</em> of losses. The goal is to stay in the game.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"He who knows that enough is enough will always have enough." — Lao Tzu, Tao Te Ching</p>
                        </div>
                    </div>
                </label>

                <!-- 8. Defined Risk ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-red-500" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></span>
                            <h2 class="title-front">Defined Risk</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-red-500" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></span>
                                <h3 class="title-back">Know Your Max Loss</h3>
                            </div>
                            <p>Know your max loss <span class="highlight">BEFORE</span> you enter. Use spreads, buy protective options, or accept 100% loss of premium.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;"><span class="sell">Undefined risk</span> is how accounts blow up overnight.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"The beginning of wisdom is the definition of terms." — Socrates</p>
                        </div>
                    </div>
                </label>

                <!-- 9. Diversify Underlyings ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-indigo-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
                            <h2 class="title-front">Diversify</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-indigo-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>
                                <h3 class="title-back">Spread Your Bets</h3>
                            </div>
                            <p>Don't put all your positions in one stock or sector. <span class="sell">Correlation kills.</span></p>
                            <p style="margin-top: 10px; font-size: 0.85em;">If NVDA tanks, you don't want 5 NVDA positions going to zero simultaneously.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"Beware lest you lose the substance by grasping at the shadow." — Aesop</p>
                        </div>
                    </div>
                </label>

                <!-- 10. Use Protection -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-cyan-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
                            <h2 class="title-front">Use Protection</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-cyan-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
                                <h3 class="title-back">Insurance</h3>
                            </div>
                            <p>Do not forget about <strong>puts</strong> as insurance and portfolio protection instruments. A small premium can save your entire portfolio during a crash.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"By failing to prepare, you are preparing to fail." — Benjamin Franklin</p>
                        </div>
                    </div>
                </label>

                <!-- ═══════════════════════════════════════════════════════════ -->
                <!-- TIER 3: OPTIONS MECHANICS - The Engine                      -->
                <!-- ═══════════════════════════════════════════════════════════ -->
                <div class="tier-label"><span>Tier III: Options Mechanics</span></div>

                <!-- 11. The Engine (IV) -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-purple-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></span>
                            <h2 class="title-front">The Engine</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-purple-400 inline-block" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></span>
                                <h3 class="title-back">Implied Volatility</h3>
                            </div>
                            <p>Understand that <span class="iv">Implied Volatility (IV)</span> makes all the difference. It is the heartbeat of option pricing.</p>
                            <p style="margin-top: 10px;"><span class="buy">Buy low IV</span>, <span class="sell">Sell high IV</span>.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"One must still have chaos in oneself to be able to give birth to a dancing star." — Friedrich Nietzsche, Thus Spoke Zarathustra</p>
                        </div>
                    </div>
                </label>

                <!-- 12. Time Confidence -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-amber-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg></span>
                            <h2 class="title-front">Time Confidence</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-amber-400" style="filter: drop-shadow(0 0 6px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg></span>
                                <h3 class="title-back">Theta Decay</h3>
                            </div>
                            <p>Did you buy options with enough time? If not, you are <span class="highlight">trading rather than investing</span>.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Time is the only asset you cannot buy back. Theta eats your premium every day.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"Life can only be understood backwards; but it must be lived forwards." — Søren Kierkegaard</p>
                        </div>
                    </div>
                </label>

                <!-- 13. Respect the Greeks ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front" style="font-size: 3.5rem; font-weight: 900; font-family: serif; color: #a78bfa; filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor);">Δθν</span>
                            <h2 class="title-front">Respect the Greeks</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back" style="font-size: 1.2rem; font-weight: 900; font-family: serif; color: #a78bfa;">Δθν</span>
                                <h3 class="title-back">The Dashboard</h3>
                            </div>
                            <p><span class="buy">Delta (Δ)</span> = Direction exposure<br>
                            <span class="iv">Theta (θ)</span> = Time decay<br>
                            <span class="sell">Vega (ν)</span> = Volatility exposure</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Ignore the Greeks and you're flying blind. They tell you <em>how</em> your position will move.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"Everything flows; nothing stands still." — Heraclitus</p>
                        </div>
                    </div>
                </label>

                <!-- 14. Liquidity First ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-sky-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L8 8"/><path d="m16 8-2.828 2.828A4 4 0 0 0 12 13.7V22"/></svg></span>
                            <h2 class="title-front">Liquidity First</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-sky-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L8 8"/><path d="m16 8-2.828 2.828A4 4 0 0 0 12 13.7V22"/></svg></span>
                                <h3 class="title-back">Bid-Ask Spread</h3>
                            </div>
                            <p>Trade liquid options with <span class="highlight">tight bid-ask spreads</span>. If the spread is $0.50 wide, you're paying a hidden $50/contract tax.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Stick to high-volume underlyings: SPY, QQQ, AAPL, NVDA, etc.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"The green reed which bends in the wind is stronger than the mighty oak which breaks in a storm." — Confucius</p>
                        </div>
                    </div>
                </label>

                <!-- 15. The Earnings Trap ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-yellow-500" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
                            <h2 class="title-front">The Earnings Trap</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-yellow-500" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>
                                <h3 class="title-back">IV Crush</h3>
                            </div>
                            <p>IV <span class="iv">spikes before earnings</span> and <span class="sell">crashes after</span> (IV Crush).</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Buying options into earnings? You need the stock to move <em>MORE</em> than the implied move. The house usually wins.</p>
                            <p style="margin-top: 12px; font-size: 1.1em; font-style: italic; color: #e2e8f0; border-top: 1px solid rgba(234, 179, 8, 0.2); padding-top: 10px;">"Man is sometimes extraordinarily, passionately, in love with suffering." — Fyodor Dostoevsky, <em>Notes from Underground</em></p>
                        </div>
                    </div>
                </label>

                <!-- ═══════════════════════════════════════════════════════════ -->
                <!-- TIER 4: EXECUTION - The Hunt                                -->
                <!-- ═══════════════════════════════════════════════════════════ -->
                <div class="tier-label"><span>Tier IV: Execution</span></div>

                <!-- 16. Have a Plan -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-indigo-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/><circle cx="12" cy="12" r="4"/></svg></span>
                            <h2 class="title-front">Have a Plan</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-indigo-400 inline-block" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="M2 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="M12 18v4"/><path d="m19.07 19.07-2.83-2.83"/><path d="M22 12h-4"/><path d="m19.07 4.93-2.83 2.83"/><circle cx="12" cy="12" r="4"/></svg></span>
                                <h3 class="title-back">Targets</h3>
                            </div>
                            <p>Have targets before you enter:</p>
                            <ul>
                                <li><strong class="sell">Bad Scenario:</strong> Stop-loss or invalidation level.</li>
                                <li><strong class="buy">Good Scenario:</strong> Take profits at 25-50%.</li>
                            </ul>
                            <p class="mt-3 text-xs italic text-slate-400">"Everyone has a plan until they get punched in the mouth." — Mike Tyson</p>
                        </div>
                    </div>
                </label>

                <!-- 17. Roll or Die ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-teal-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>
                            <h2 class="title-front">Roll or Die</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-teal-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>
                                <h3 class="title-back">Trade Management</h3>
                            </div>
                            <p><span class="sell">Losers hold and hope.</span> <span class="buy">Winners manage or cut.</span></p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Know when to roll out in time, roll up/down in strike, or simply close and move on. Adjustment is a skill.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"It is not the strongest of the species that survives, nor the most intelligent, but the one most adaptable to change." — Charles Darwin</p>
                        </div>
                    </div>
                </label>

                <!-- 18. Expiration Discipline ⭐NEW -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-rose-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg></span>
                            <h2 class="title-front">Expiration Discipline</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-rose-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg></span>
                                <h3 class="title-back">Gamma Risk</h3>
                            </div>
                            <p><span class="sell">Gamma risk explodes</span> in the final week. Don't hold positions into expiration hoping for a miracle.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Close or roll at <span class="highlight">21 DTE</span> unless you have a specific thesis.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"The two most powerful warriors are patience and time." — Leo Tolstoy, War and Peace</p>
                        </div>
                    </div>
                </label>

                <!-- 19. Flow with it -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-sky-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg></span>
                            <h2 class="title-front">Flow with it</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-sky-400 inline-block" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg></span>
                                <h3 class="title-back">Momentum</h3>
                            </div>
                            <p>Know the momentum of the market and trade <strong>with</strong> the grain rather than against it.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;"><span class="sell">Don't try to catch a falling knife.</span></p>
                            <p class="mt-3 text-xs italic text-slate-400">"Do not push the river; it will flow by itself." — Zen proverb</p>
                        </div>
                    </div>
                </label>

                <!-- 20. Be Flexible -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-lime-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></span>
                            <h2 class="title-front">Be Flexible</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-lime-400" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></span>
                                <h3 class="title-back">Adaptability</h3>
                            </div>
                            <p><span class="highlight">Strong opinions, loosely held.</span> If the market data changes, your thesis must change.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Rigidity is how trees snap in a storm; be the bamboo.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"She who is flexible is rarely bent out of shape."</p>
                        </div>
                    </div>
                </label>

                <!-- 21. Probabilities -->
                <label class="flip-card-wrapper">
                    <input type="checkbox" class="flip-input" />
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <span class="icon-front"><svg class="w-16 h-16 text-violet-400" style="filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 15px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg></span>
                            <h2 class="title-front">Probabilities</h2>
                        </div>
                        <div class="flip-card-back">
                            <div class="back-header">
                                <span class="icon-back"><svg class="w-6 h-6 text-violet-400 inline-block" style="filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 12px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg></span>
                                <h3 class="title-back">The Odds</h3>
                            </div>
                            <p>Options are a world of probabilities; <span class="sell">losses are inevitable</span>. Learn and move on.</p>
                            <p style="margin-top: 10px; font-size: 0.85em;">Even a 60% win rate means losing 40 times out of 100. That's the game.</p>
                            <p class="mt-3 text-xs italic text-slate-400">"The only certainty is that nothing is certain." — Pliny the Elder</p>
                        </div>
                    </div>
                </label>

            </div>
        </div>
        `,
        analogy: "", nuance: "<b>Mind over Math:</b> 90% of trading is psychology. The other 10% is just looking for the buttons.", example: ""
    },
];
