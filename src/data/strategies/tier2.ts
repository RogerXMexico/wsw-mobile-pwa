import { Strategy } from '../../types';

// Risk & Greeks - Tier 2
export const TIER_2_STRATEGIES: Strategy[] = [
    {
        id: 'philosophy-of-risk',
        name: 'The Philosophy of Risk',
        tier: 2,
        tierName: 'Risk',
        outlook: 'Educational',
        objective: 'Mindset',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <!-- Hero Section -->
        <div class="dolphin-code-hero border border-amber-500/30 bg-gradient-to-br from-slate-900/80 to-amber-900/20 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-amber-900/10 transition-all duration-300 cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(0,243,255,0.4)]">
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-32 h-32 rounded-full border-4 border-cyan-400 flex items-center justify-center bg-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                        <svg class="w-16 h-16 text-cyan-400" style="filter: drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 12px #22d3ee)" viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"><path d="M123.22 47.23c29.498 15.152 55.025 36.05 55.53 67.366-93.62 83.867-83.862 179.356-97.002 270.34-67.68 55.552-67.57 90.948-60.9 101.227 3.94.743 29.11-25.94 48.326-30.397 14.23-4.094 12.284-15.99 16.273-25.275 2.438 14.55 7.17 22.612 17.133 25.485 12.874 3.36 44.932 28.15 51.53 25.504 1.374-20.382-26.01-63.854-48.028-90.087 41.012-63.28 81.365-136.458 211.162-207.77-3.21-3.706-6.216-6.45-8.8-7.986l9.198-15.472c11.617 6.907 20.522 19.56 29.248 35.033 5.94 10.532 11.528 22.644 16.96 35.117 15.682-32.87 22.983 -66.406 16.402-90.254l17.35-4.786a87.287 87.287 0 0 1 1.927 8.83c33.29-4.253 55.718-13.083 85.11-29.322 3.744-2.068 19.054-13.012-.117-16.03 12.62-9.017 7.54-12.063 1.973-15.152-6.486-3.6-20.302-8.948-35.758-8.556-12.124-27.863-39.63-47.772-82.225-47.696-28.532.052-63.842 9.086-105.828 30.688C217.895 27.64 164.92 20.468 123.22 47.23zm286.942 28.74a9 9 0 1 1 0 18 9 9 0 0 1 0-18z"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-amber-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        The Jungle Dolphin Code
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"The jungle doesn't reward the bold. It rewards the <span class="text-amber-400">prepared</span>."</p>
                </div>
            </div>
        </div>

        <!-- Philosopher Quotes on Risk -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="philosophy-card bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-purple-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition-colors">
                                <p class="text-slate-300 italic text-sm leading-relaxed mb-4">"The secret of reaping the greatest fruitfulness and the greatest enjoyment from life is to live dangerously."</p>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">FN</div>
                    <div>
                        <p class="text-purple-400 font-semibold text-sm">Friedrich Nietzsche</p>
                        <p class="text-slate-500 text-xs">The Gay Science, 1882</p>
                    </div>
                </div>
            </div>

            <div class="philosophy-card bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-cyan-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
                                <p class="text-slate-300 italic text-sm leading-relaxed mb-4">"It is not because things are difficult that we do not dare; it is because we do not dare that things are difficult."</p>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">S</div>
                    <div>
                        <p class="text-cyan-400 font-semibold text-sm">Seneca</p>
                        <p class="text-slate-500 text-xs">Letters from a Stoic, 65 AD</p>
                    </div>
                </div>
            </div>

            <div class="philosophy-card bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-rose-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-rose-500/40 transition-colors">
                                <p class="text-slate-300 italic text-sm leading-relaxed mb-4">"To dare is to lose one's footing momentarily. Not to dare is to lose oneself."</p>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 text-xs font-bold">SK</div>
                    <div>
                        <p class="text-rose-400 font-semibold text-sm">Søren Kierkegaard</p>
                        <p class="text-slate-500 text-xs">Danish Philosopher, 1847</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-12">
            <!-- The Three Laws -->
            <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 p-8 rounded-[2rem]">
                <h3 class="text-2xl font-black text-white mb-8 text-center uppercase tracking-tight">The Three Laws of Jungle Risk</h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="jungle-law-card relative group">
                        <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="relative bg-black/40 p-6 rounded-2xl border border-emerald-500/20 h-full">
                            <div class="text-5xl mb-4 text-center"><span class="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-bold text-2xl" style="filter: drop-shadow(0 0 8px rgba(52,211,153,0.4))">1</span></div>
                            <h4 class="text-xl font-bold text-emerald-400 mb-3 text-center">Survival First</h4>
                            <p class="text-slate-300 text-sm leading-relaxed text-center">
                                Your primary goal is to <span class="text-white font-bold">stay in the game</span>. A dead trader makes no money. Protect your capital above all else.
                            </p>
                            <div class="mt-4 text-center">
                                <span class="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">CAPITAL PRESERVATION</span>
                            </div>
                        </div>
                    </div>

                    <div class="jungle-law-card relative group">
                        <div class="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="relative bg-black/40 p-6 rounded-2xl border border-amber-500/20 h-full">
                            <div class="text-5xl mb-4 text-center"><span class="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-amber-500/50 bg-amber-500/10 text-amber-400 font-bold text-2xl" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.4))">2</span></div>
                            <h4 class="text-xl font-bold text-amber-400 mb-3 text-center">Define Before Entry</h4>
                            <p class="text-slate-300 text-sm leading-relaxed text-center">
                                Know your <span class="text-white font-bold">max loss</span> before you click buy. If you can't quantify the risk, you can't manage it.
                            </p>
                            <div class="mt-4 text-center">
                                <span class="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">RISK DEFINITION</span>
                            </div>
                        </div>
                    </div>

                    <div class="jungle-law-card relative group">
                        <div class="absolute inset-0 bg-gradient-to-b from-rose-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="relative bg-black/40 p-6 rounded-2xl border border-rose-500/20 h-full">
                            <div class="text-5xl mb-4 text-center"><span class="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-rose-500/50 bg-rose-500/10 text-rose-400 font-bold text-2xl" style="filter: drop-shadow(0 0 8px rgba(251,113,133,0.4))">3</span></div>
                            <h4 class="text-xl font-bold text-rose-400 mb-3 text-center">Accept the Loss</h4>
                            <p class="text-slate-300 text-sm leading-relaxed text-center">
                                Before entering, <span class="text-white font-bold">emotionally accept</span> that you might lose the entire position. If that thought makes you sick, size down.
                            </p>
                            <div class="mt-4 text-center">
                                <span class="text-[10px] font-mono text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full">EMOTIONAL DETACHMENT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- The Risk Paradox -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-rose-900/10 border border-rose-500/20 p-8 rounded-3xl relative overflow-hidden">
                    <div class="absolute -right-8 -top-8 text-8xl opacity-10"><svg class="w-24 h-24 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
                    <h3 class="text-xl font-black text-rose-400 mb-4 uppercase">The Amateur's Fallacy</h3>
                    <ul class="space-y-4 text-slate-300">
                        <li class="flex gap-3 items-start">
                            <span class="text-rose-400 mt-1">✗</span>
                            <span>"I'll just hold until it comes back"</span>
                        </li>
                        <li class="flex gap-3 items-start">
                            <span class="text-rose-400 mt-1">✗</span>
                            <span>"I can't lose if I don't sell"</span>
                        </li>
                        <li class="flex gap-3 items-start">
                            <span class="text-rose-400 mt-1">✗</span>
                            <span>"It's down 50%, might as well hold"</span>
                        </li>
                        <li class="flex gap-3 items-start">
                            <span class="text-rose-400 mt-1">✗</span>
                            <span>"This time it's different"</span>
                        </li>
                        <li class="flex gap-3 items-start">
                            <span class="text-rose-400 mt-1">✗</span>
                            <span>"I'll sell when I get back to break even"</span>
                        </li>
                    </ul>
                    <div class="mt-6 p-4 bg-black/30 rounded-xl">
                        <p class="text-sm text-rose-300 italic">"Hope is not a strategy. Prayer is not risk management."</p>
                    </div>
                </div>

                <div class="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-3xl relative overflow-hidden">
                    <div class="absolute -right-8 -top-8 text-8xl opacity-10">✓</div>
                    <h3 class="text-xl font-black text-emerald-400 mb-4 uppercase">The Professional's Truth</h3>
                    <ul class="space-y-4 text-slate-300">
                        <li class="flex gap-3 items-start">
                            <span class="text-emerald-400 mt-1">✓</span>
                            <span>"I know my exit before I enter"</span>
                        </li>
                        <li class="flex gap-3 items-start">
                            <span class="text-emerald-400 mt-1">✓</span>
                            <span>"Small losses are the cost of business"</span>
                        </li>
                        <li class="flex gap-3 items-start">
                            <span class="text-emerald-400 mt-1">✓</span>
                            <span>"I'd rather be out wishing I was in"</span>
                        </li>
                        <li class="flex gap-3 items-start">
                            <span class="text-emerald-400 mt-1">✓</span>
                            <span>"Cutting losses protects my future wins"</span>
                        </li>
                    </ul>
                    <div class="mt-6 p-4 bg-black/30 rounded-xl">
                        <p class="text-sm text-emerald-300 italic">"The best traders are not the best winners. They are the best losers."</p>
                    </div>
                </div>
            </div>

            <!-- The Mathematics of Ruin -->
            <div class="bg-gradient-to-br from-purple-500/10 to-slate-900/60 border border-purple-500/30 p-8 rounded-[2rem]">
                <h3 class="text-2xl font-black text-purple-400 mb-6 flex items-center gap-3 uppercase">
                    <span class="text-3xl"><svg class="w-9 h-9 text-rose-400 inline-block" style="filter: drop-shadow(0 0 8px rgba(251,113,133,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg></span>
                    The Mathematics of Ruin
                </h3>
                <p class="text-slate-300 mb-8 text-lg">
                    Losses are not symmetrical. A <span class="text-rose-400 font-bold">50% loss</span> requires a <span class="text-emerald-400 font-bold">100% gain</span> to break even.
                </p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-black/40 p-4 rounded-xl text-center border border-white/5">
                        <div class="text-rose-400 font-mono text-2xl font-bold">-10%</div>
                        <div class="text-emerald-400 font-mono text-sm mt-1">+11% to recover</div>
                    </div>
                    <div class="bg-black/40 p-4 rounded-xl text-center border border-white/5">
                        <div class="text-rose-400 font-mono text-2xl font-bold">-25%</div>
                        <div class="text-emerald-400 font-mono text-sm mt-1">+33% to recover</div>
                    </div>
                    <div class="bg-black/40 p-4 rounded-xl text-center border border-white/5">
                        <div class="text-rose-400 font-mono text-2xl font-bold">-50%</div>
                        <div class="text-emerald-400 font-mono text-sm mt-1">+100% to recover</div>
                    </div>
                    <div class="bg-black/40 p-4 rounded-xl text-center border border-white/5">
                        <div class="text-rose-400 font-mono text-2xl font-bold">-90%</div>
                        <div class="text-emerald-400 font-mono text-sm mt-1">+900% to recover</div>
                    </div>
                </div>

                <div class="bg-black/30 p-6 rounded-2xl border border-purple-500/20">
                    <h4 class="text-white font-bold mb-3">The Lesson</h4>
                    <p class="text-slate-300 text-sm leading-relaxed">
                        This asymmetry is why <span class="text-amber-400 font-bold">position sizing</span> and <span class="text-amber-400 font-bold">stop losses</span> are not optional—they are survival mechanisms. A single catastrophic loss can undo years of gains. The jungle doesn't give second chances to those who bet their entire stack.
                    </p>
                </div>
            </div>

            <!-- The 1-2% Rule -->
            <div class="bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/30 p-8 rounded-[2rem] relative overflow-hidden">
                <div class="absolute -right-4 -bottom-4 text-8xl opacity-10 grayscale"><svg class="w-24 h-24 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
                <h3 class="text-2xl font-black text-amber-400 mb-4 flex items-center gap-3 uppercase">
                    <span class="bg-amber-500 text-slate-950 px-3 py-1 rounded-lg">1-2%</span>
                    The Golden Rule of Position Sizing
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
                    <div>
                        <p class="text-lg leading-relaxed mb-4">
                            Never risk more than <span class="text-white font-bold underline decoration-amber-500">1-2% of your total portfolio</span> on any single trade.
                        </p>
                        <p class="text-sm opacity-80 mb-4">
                            This means if your account is $10,000, your maximum loss per trade should be $100-$200. Not the position size—the <i>maximum loss</i>.
                        </p>
                        <div class="bg-black/30 p-4 rounded-xl border border-amber-500/20">
                            <div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Example</div>
                            <p class="text-sm">
                                Account: <span class="text-white font-mono">$25,000</span><br>
                                Max Risk (2%): <span class="text-amber-400 font-mono">$500</span><br>
                                Option Premium: <span class="text-white font-mono">$2.50</span><br>
                                Max Contracts: <span class="text-emerald-400 font-mono">2</span> ($500 ÷ $250)
                            </p>
                        </div>
                    </div>
                    <div class="bg-black/30 p-6 rounded-2xl border border-white/5">
                        <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Why This Works</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="flex gap-3 items-start">
                                <span class="text-amber-400">►</span>
                                <span>You can be wrong <b>50 times in a row</b> and still have capital left</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="text-amber-400">►</span>
                                <span>Emotions stay in check when losses are small</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="text-amber-400">►</span>
                                <span>You can think clearly instead of panicking</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="text-amber-400">►</span>
                                <span>Winning streaks compound; losing streaks don't destroy</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Risk vs Reward Spectrum -->
            <div class="bg-slate-800/40 border border-white/10 p-8 rounded-[2rem]">
                <h3 class="text-xl font-black text-white mb-6 text-center uppercase">The Risk-Reward Spectrum</h3>

                <div class="relative h-16 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full mb-8 overflow-hidden">
                    <div class="absolute inset-0 flex justify-between items-center px-6 text-white font-bold text-sm">
                        <span>Conservative</span>
                        <span>Balanced</span>
                        <span>Aggressive</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-4">
                        <div class="text-emerald-400 font-black text-xl mb-2">0.5-1% Risk</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Conservative</div>
                        <p class="text-xs text-slate-400">Wealth preservation. Slow growth. Sleep at night.</p>
                    </div>
                    <div class="text-center p-4 border-l border-r border-white/10">
                        <div class="text-amber-400 font-black text-xl mb-2">1-2% Risk</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Balanced</div>
                        <p class="text-xs text-slate-400">Standard professional approach. Growth with protection.</p>
                    </div>
                    <div class="text-center p-4">
                        <div class="text-rose-400 font-black text-xl mb-2">3-5% Risk</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Aggressive</div>
                        <p class="text-xs text-slate-400">High conviction only. Can blow up fast. Experts only.</p>
                    </div>
                </div>
            </div>

            <!-- The Four Dimensions of Options Risk -->
            <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-cyan-500/20 p-8 rounded-[2rem]">
                <h3 class="text-2xl font-black text-cyan-400 mb-2 uppercase tracking-tight text-center">The Four Dimensions of Options Risk</h3>
                <p class="text-slate-400 text-sm text-center mb-8">Every options position is exposed to multiple risk factors simultaneously</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-black/40 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                                <svg class="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>
                            </span>
                            <div>
                                <h4 class="text-lg font-bold text-cyan-400">Directional (Delta)</h4>
                                <span class="text-[10px] font-mono text-slate-500">PRICE MOVEMENT</span>
                            </div>
                        </div>
                        <p class="text-slate-300 text-sm leading-relaxed">Risk from the underlying moving against your position. Managed through <span class="text-white font-bold">strike selection</span>, <span class="text-white font-bold">spreads</span>, and <span class="text-white font-bold">delta hedging</span>.</p>
                    </div>

                    <div class="bg-black/40 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10">
                                <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>
                            </span>
                            <div>
                                <h4 class="text-lg font-bold text-purple-400">Volatility (Vega)</h4>
                                <span class="text-[10px] font-mono text-slate-500">IV CHANGES</span>
                            </div>
                        </div>
                        <p class="text-slate-300 text-sm leading-relaxed">Risk from implied volatility expanding or collapsing. <span class="text-rose-400 font-bold">IV Crush</span> after earnings can devastate long premium positions.</p>
                    </div>

                    <div class="bg-black/40 p-6 rounded-2xl border border-rose-500/20 hover:border-rose-400/40 transition-colors">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-rose-500/30 bg-rose-500/10">
                                <svg class="w-6 h-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
                            </span>
                            <div>
                                <h4 class="text-lg font-bold text-rose-400">Time Decay (Theta)</h4>
                                <span class="text-[10px] font-mono text-slate-500">DAILY BLEED</span>
                            </div>
                        </div>
                        <p class="text-slate-300 text-sm leading-relaxed">Options lose value every day. Long options <span class="text-rose-400 font-bold">bleed theta</span>. Short options <span class="text-emerald-400 font-bold">collect theta</span>. The clock never stops.</p>
                    </div>

                    <div class="bg-black/40 p-6 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-colors">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/10">
                                <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </span>
                            <div>
                                <h4 class="text-lg font-bold text-amber-400">Liquidity Risk</h4>
                                <span class="text-[10px] font-mono text-slate-500">EXECUTION</span>
                            </div>
                        </div>
                        <p class="text-slate-300 text-sm leading-relaxed">Wide bid-ask spreads eat profits. Illiquid options are <span class="text-amber-400 font-bold">hard to exit</span> in a crisis. Stick to liquid underlyings.</p>
                    </div>
                </div>
            </div>

            <!-- Drawdown Psychology -->
            <div class="bg-gradient-to-br from-rose-900/20 to-slate-900/80 border border-rose-500/20 p-8 rounded-[2rem]">
                <h3 class="text-2xl font-black text-rose-400 mb-6 uppercase tracking-tight flex items-center gap-3">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/></svg>
                    The Psychology of Drawdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p class="text-slate-300 text-lg leading-relaxed mb-6">
                            Every trader will experience drawdowns. The difference between survivors and casualties is <span class="text-white font-bold">how you respond</span> when your account is bleeding.
                        </p>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4 bg-black/30 p-4 rounded-xl">
                                <span class="text-2xl font-mono text-rose-400 font-bold w-16">-10%</span>
                                <span class="text-slate-400 text-sm">Annoying but manageable. Stay the course.</span>
                            </div>
                            <div class="flex items-center gap-4 bg-black/30 p-4 rounded-xl">
                                <span class="text-2xl font-mono text-rose-400 font-bold w-16">-20%</span>
                                <span class="text-slate-400 text-sm">Time to review your strategy. Reduce size.</span>
                            </div>
                            <div class="flex items-center gap-4 bg-black/30 p-4 rounded-xl">
                                <span class="text-2xl font-mono text-rose-500 font-bold w-16">-30%</span>
                                <span class="text-slate-400 text-sm">Stop trading. Analyze what went wrong.</span>
                            </div>
                            <div class="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-rose-500/30">
                                <span class="text-2xl font-mono text-rose-500 font-bold w-16">-50%</span>
                                <span class="text-rose-300 text-sm font-bold">Account blown. Start over. Learn the lesson.</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-black/30 p-6 rounded-2xl border border-white/5">
                        <h4 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                            Drawdown Rules
                        </h4>
                        <ul class="space-y-4 text-sm">
                            <li class="flex gap-3 items-start text-slate-300">
                                <span class="text-emerald-400 font-bold">1.</span>
                                <span><b class="text-white">Cut size in half</b> after hitting -15% drawdown. Your edge doesn't disappear, but your confidence and capital need protection.</span>
                            </li>
                            <li class="flex gap-3 items-start text-slate-300">
                                <span class="text-emerald-400 font-bold">2.</span>
                                <span><b class="text-white">Stop trading</b> after -25% drawdown. Take a week off. Review every trade. Find the leak.</span>
                            </li>
                            <li class="flex gap-3 items-start text-slate-300">
                                <span class="text-emerald-400 font-bold">3.</span>
                                <span><b class="text-white">Never revenge trade.</b> The market doesn't owe you anything. Each trade is independent.</span>
                            </li>
                            <li class="flex gap-3 items-start text-slate-300">
                                <span class="text-emerald-400 font-bold">4.</span>
                                <span><b class="text-white">Paper trade</b> your way back to confidence before risking real money again.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Risk Definition Framework -->
            <div class="bg-gradient-to-br from-emerald-900/10 to-slate-900/80 border border-emerald-500/20 p-8 rounded-[2rem]">
                <h3 class="text-2xl font-black text-emerald-400 mb-6 uppercase tracking-tight text-center">Before Every Trade: The Risk Checklist</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 text-center">
                        <div class="text-3xl mb-2"><svg class="w-8 h-8 text-emerald-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
                        <h4 class="text-white font-bold text-sm mb-1">Entry Point</h4>
                        <p class="text-slate-400 text-xs">Where exactly will you enter?</p>
                    </div>
                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 text-center">
                        <div class="text-3xl mb-2"><svg class="w-8 h-8 text-rose-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
                        <h4 class="text-white font-bold text-sm mb-1">Stop Loss</h4>
                        <p class="text-slate-400 text-xs">Where will you exit if wrong?</p>
                    </div>
                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 text-center">
                        <div class="text-3xl mb-2"><svg class="w-8 h-8 text-amber-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                        <h4 class="text-white font-bold text-sm mb-1">Max Loss $</h4>
                        <p class="text-slate-400 text-xs">Exact dollar amount at risk</p>
                    </div>
                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 text-center">
                        <div class="text-3xl mb-2"><svg class="w-8 h-8 text-cyan-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                        <h4 class="text-white font-bold text-sm mb-1">Target</h4>
                        <p class="text-slate-400 text-xs">Profit target (min 2:1 R:R)</p>
                    </div>
                </div>

                <div class="bg-black/30 p-6 rounded-2xl border border-emerald-500/20 text-center">
                    <p class="text-lg text-slate-300 mb-2">
                        <span class="text-white font-bold">If you cannot answer all four questions,</span>
                    </p>
                    <p class="text-2xl text-emerald-400 font-black uppercase">
                        Do Not Enter The Trade
                    </p>
                </div>
            </div>

            <!-- Final Wisdom -->
            <div class="border border-emerald-500/20 bg-emerald-500/5 p-8 rounded-[2rem] text-center">
                <div class="mb-4 inline-block"><svg class="w-12 h-12 text-emerald-400" style="filter: drop-shadow(0 0 8px rgba(16,185,129,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></div>
                <h3 class="text-xl font-bold text-emerald-400 mb-4 uppercase tracking-tighter">The Jungle's Final Lesson</h3>
                <p class="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed mb-6">
                    Risk management isn't about avoiding losses—it's about <span class="text-white font-bold">surviving them</span>. The best traders in history didn't win because they never lost. They won because they <span class="text-emerald-400 font-bold">controlled the size of their losses</span> and let their winners run.
                </p>
                <div class="bg-black/30 p-6 rounded-2xl inline-block">
                    <p class="text-2xl font-serif italic text-white gold-sweep-simple">"In the jungle, it's not the strongest who survive. It's those who <span class="text-amber-400">manage their exposure</span> to the predators."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "",
        nuance: "<b>The Paradox:</b> Accepting small losses is what allows big wins. Traders who refuse to take losses end up taking catastrophic ones. The market will force you to learn this lesson—either through discipline or through devastation.",
        example: "<b>The Scenario:</b> Two traders each have $10,000. Trader A risks 10% per trade ($1,000). Trader B risks 2% per trade ($200).<br><br><b>After 5 Losing Trades:</b><br>Trader A: $10,000 → $5,905 (41% drawdown)<br>Trader B: $10,000 → $9,039 (10% drawdown)<br><br><b>To Recover:</b><br>Trader A needs +69% to break even<br>Trader B needs +11% to break even<br><br>Trader B stays in the game. Trader A is fighting for survival."
    },,
    {
        id: 'the-greeks', tier: 2, tierName: 'Risk', name: 'The Greeks', outlook: 'Educational', objective: 'Risk Management', risk: 'Knowledge', legs: [],
        analysis: `
        <!-- Nietzsche Quote -->
        <div class="text-center mb-10 py-6 border-y border-slate-800">
            <p class="text-xl md:text-2xl font-serif italic text-slate-300 mb-3 gold-sweep-simple">"Those Greeks were superficial—out of profundity!"</p>
            <p class="text-slate-500 text-sm">— Friedrich Nietzsche, <span class="italic">The Gay Science</span></p>
        </div>

        <!-- Top Monkey Section -->
        <div class="border border-purple-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-purple-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <!-- Monkey Icon -->
                <div class="shrink-0 relative group cursor-help">
                    <div class="w-28 h-28 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform duration-300">
                        <span class="text-6xl filter drop-shadow-md"><svg class="w-14 h-14 text-amber-400 inline-block" style="filter: drop-shadow(0 0 12px rgba(251,191,36,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg></span>
                    </div>
                    <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-900 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Monkey
                    </div>
                </div>
                <!-- Content -->
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-emerald-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        <span class="w-12 h-[1px] bg-emerald-500/50"></span>
                        The Monkey's Take
                        <span class="w-12 h-[1px] bg-emerald-500/50"></span>
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight drop-shadow-md gold-sweep-simple">"Before you get into the Formula 1 car, master the steering wheel, pedal, windshield, and brakes."</p>
                </div>
            </div>
        </div>

        <!-- Analysis Header -->
        <div class="flex items-center gap-3 mb-6 animate-fadeIn" style="animation-delay: 0.1s;">
             <svg class="w-6 h-6 text-slate-400" style="filter: drop-shadow(0 0 4px currentColor)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
             <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Professional Analysis</h3>
        </div>
        
        <p class="mb-8 text-slate-300 text-lg leading-relaxed animate-fadeIn" style="animation-delay: 0.2s;">
            The "Greeks" are the dashboard of your options car. They tell you how fast you're going, how fast you're accelerating, and how much gas you have left.
        </p>
        
        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fadeIn" style="animation-delay: 0.3s;">
            
            <!-- DELTA -->
            <div class="greek-card card-delta relative overflow-hidden bg-slate-800/40 border border-cyan-500/20 p-6 rounded-2xl min-h-[280px] hover:border-cyan-400 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 group flex flex-col">
                <div class="relative z-10 pointer-events-none flex-1">
                    <div class="text-center mb-6">
                        <span class="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-cyan-500/30 bg-cyan-500/10 mb-2 transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"><svg class="w-7 h-7 text-cyan-400" style="filter: drop-shadow(0 0 6px rgba(34,211,238,0.8))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg></span>
                        <h4 class="text-cyan-400 font-black text-lg uppercase tracking-tight">Delta = Speed</h4>
                         <div class="w-8 h-1 bg-cyan-500/30 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <ul class="text-xs text-slate-400 space-y-3 list-disc pl-4 leading-relaxed">
                        <li>Option $ change per $1 stock move.</li>
                        <li>% Probability of being ITM at exp.</li>
                        <li>Hedge Ratio: Shares to sell to be neutral.</li>
                    </ul>
                </div>
            </div>

            <!-- GAMMA -->
            <div class="greek-card card-gamma relative overflow-hidden bg-slate-800/40 border border-purple-500/20 p-6 rounded-2xl min-h-[280px] hover:border-purple-400 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 group flex flex-col">
                <div class="relative z-10 pointer-events-none flex-1">
                    <div class="text-center mb-6">
                        <span class="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-purple-500/30 bg-purple-500/10 mb-2 transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"><svg class="w-7 h-7 text-purple-400" style="filter: drop-shadow(0 0 6px rgba(168,85,247,0.8))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg></span>
                        <h4 class="text-purple-400 font-black text-lg uppercase tracking-tight">Gamma = Acceleration</h4>
                        <div class="w-8 h-1 bg-purple-500/30 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <ul class="text-xs text-slate-400 space-y-3 list-disc pl-4 leading-relaxed">
                        <li>Rate of change of Delta.</li>
                        <li>Highest when ATM and near expiration.</li>
                        <li>High Gamma = Explosive P&L swings.</li>
                    </ul>
                </div>
            </div>

            <!-- THETA -->
            <div class="greek-card card-theta relative overflow-hidden bg-slate-800/40 border border-red-500/20 p-6 rounded-2xl min-h-[280px] hover:border-red-400 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(248,113,113,0.15)] transition-all duration-300 group flex flex-col">
                <div class="relative z-10 pointer-events-none flex-1">
                    <div class="text-center mb-6">
                        <span class="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-red-500/30 bg-red-500/10 mb-2 transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(248,113,113,0.4)]"><svg class="w-7 h-7 text-red-400" style="filter: drop-shadow(0 0 6px rgba(248,113,113,0.8))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg></span>
                        <h4 class="text-red-400 font-black text-lg uppercase tracking-tight">Theta = Time</h4>
                        <div class="w-8 h-1 bg-red-500/30 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <ul class="text-xs text-slate-400 space-y-3 list-disc pl-4 leading-relaxed">
                        <li>Value lost per day (Time Decay).</li>
                        <li>Highest for ATM options.</li>
                        <li>Accelerates as expiration nears.</li>
                    </ul>
                </div>
            </div>

            <!-- VEGA -->
            <div class="greek-card card-vega relative overflow-hidden bg-slate-800/40 border border-emerald-500/20 p-6 rounded-2xl min-h-[280px] hover:border-emerald-400 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 group flex flex-col">
                <div class="relative z-10 pointer-events-none flex-1">
                    <div class="text-center mb-6">
                        <span class="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-emerald-500/30 bg-emerald-500/10 mb-2 transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"><svg class="w-7 h-7 text-emerald-400" style="filter: drop-shadow(0 0 6px rgba(52,211,153,0.8))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg></span>
                        <h4 class="text-emerald-400 font-black text-lg uppercase tracking-tight">Vega = Volatility (IV)</h4>
                        <div class="w-8 h-1 bg-emerald-500/30 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <ul class="text-xs text-slate-400 space-y-3 list-disc pl-4 leading-relaxed">
                        <li>Price change per 1% change in IV.</li>
                        <li>High Vega = Sensitive to fear.</li>
                        <li>Long Vega benefits from rising IV.</li>
                    </ul>
                </div>
            </div>

        </div>

        <!-- Nuance Section (Bottom) -->
        <div class="border border-slate-800 bg-slate-900 p-8 rounded-2xl shadow-lg relative overflow-hidden">
             <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
             <div class="flex items-center gap-3 mb-4 text-pink-400 font-bold text-xs tracking-[0.2em] uppercase relative z-10">
                <svg class="w-4 h-4" style="filter: drop-shadow(0 0 4px rgba(236,72,153,0.8))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Nuance & Greeks
             </div>
             <p class="text-slate-300 text-lg relative z-10">
                <b>Interaction:</b> High Gamma usually means High Theta burn. It is the price you pay for the explosive potential.
             </p>
        </div>
        `,
        analogy: "Before you get into the Formula 1 car, master the steering wheel, pedal, windshield, and brakes.", nuance: "<b>Interaction:</b> High Gamma usually means High Theta burn.", example: ""
    },,
    {
        id: 'option-pricing', tier: 2, tierName: 'Risk', name: 'Pricing & IV', outlook: 'Educational', objective: 'Valuation', risk: 'Knowledge', legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="space-y-8">
            <!-- What is IV Section -->
            <div class="bg-gradient-to-br from-purple-900/30 to-slate-900/60 p-8 rounded-2xl border border-purple-500/30">
                <h4 class="text-2xl font-black text-purple-400 mb-6 flex items-center gap-3 uppercase tracking-wide">
                    <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    What is Implied Volatility?
                </h4>

                <div class="bg-black/40 p-5 rounded-xl border border-purple-500/20 mb-6">
                    <p class="text-lg text-white font-medium mb-3">The One-Sentence Definition:</p>
                    <p class="text-xl text-purple-300 font-serif italic text-center py-4">
                        "Implied Volatility is the market's <span class="text-purple-400 font-bold">forecast</span> of how much a stock will move—expressed as an annualized percentage."
                    </p>
                </div>

                <div class="space-y-4 mb-6">
                    <p class="text-slate-300 text-sm leading-relaxed">
                        <span class="text-purple-400 font-bold">IV is not history—it's prophecy.</span> Historical volatility tells you how much a stock <i>has</i> moved. Implied volatility tells you how much the market <i>expects</i> it to move. It's extracted backwards from option prices: given what traders are willing to pay for options, what level of future movement are they pricing in?
                    </p>
                    <p class="text-slate-300 text-sm leading-relaxed">
                        An IV of <span class="text-white font-bold">30%</span> means the market expects the stock to move roughly 30% over the next year (or about <span class="text-white font-bold">1.9% per day</span>). Higher IV = bigger expected moves = more expensive options. Lower IV = smaller expected moves = cheaper options.
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-4 mb-6">
                    <div class="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <div class="flex items-center gap-2 mb-2">
                            <svg class="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
                            <span class="font-bold text-rose-400">High IV (Fear)</span>
                        </div>
                        <p class="text-sm text-slate-300">Options are <b class="text-rose-300">expensive</b>. The market expects big moves. Often occurs before earnings, during market crashes, or around major news. <span class="text-rose-400">Favor selling premium.</span></p>
                    </div>
                    <div class="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <div class="flex items-center gap-2 mb-2">
                            <svg class="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                            <span class="font-bold text-cyan-400">Low IV (Complacency)</span>
                        </div>
                        <p class="text-sm text-slate-300">Options are <b class="text-cyan-300">cheap</b>. The market expects calm. Often occurs during grinding uptrends or low-news periods. <span class="text-cyan-400">Favor buying premium.</span></p>
                    </div>
                </div>

                <div class="bg-amber-500/10 p-5 rounded-xl border border-amber-500/20 mb-6">
                    <h5 class="text-amber-400 font-bold mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                        How Every Options Trader Should Think About IV
                    </h5>
                    <ul class="space-y-3 text-sm text-slate-300">
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 mt-1">1.</span>
                            <span><b class="text-white">IV is the price of uncertainty.</b> You're paying for the <i>possibility</i> of movement, not movement itself. If the stock sits still, high IV options lose value even if nothing "bad" happens.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 mt-1">2.</span>
                            <span><b class="text-white">Compare IV to its own history.</b> A 40% IV on TSLA is low; on KO, it's extreme. Use IV Rank or IV Percentile to know if current IV is high or low <i>for that stock</i>.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 mt-1">3.</span>
                            <span><b class="text-white">IV crushes after events.</b> Earnings, FDA decisions, elections—once the uncertainty resolves, IV collapses. Buying options before these events means paying for volatility that will evaporate.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 mt-1">4.</span>
                            <span><b class="text-white">The edge is in IV, not direction.</b> Most retail traders obsess over "will it go up or down?" Professionals ask "is volatility overpriced or underpriced?" That's where consistent profits live.</span>
                        </li>
                    </ul>
                </div>

                <p class="text-xs text-slate-500 italic text-center">"Buy low IV, sell high IV. It's that simple—and that difficult."</p>
            </div>

            <!-- Anatomy of IV Image -->
            <div class="bg-slate-800/50 p-6 rounded-[2rem] border border-amber-500/20">
                <h3 class="text-xl font-bold text-amber-400 mb-4 text-center">Anatomy of Implied Volatility</h3>
                <img src="/assets/Anatomy of IV.webp" alt="Anatomy of Implied Volatility" class="w-full max-w-3xl mx-auto rounded-xl border border-white/10" />
            </div>
            <div class="bg-slate-800/50 p-10 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                <div class="text-2xl text-white mb-8 font-serif italic tracking-wide">Black-Scholes-Merton Model</div>
                
                <div class="text-3xl md:text-5xl text-slate-200 font-mono mb-6 leading-loose select-none flex flex-wrap justify-center items-center gap-x-4 gap-y-8">
                    <span class="text-emerald-400 font-black hover:scale-110 transition-transform inline-block cursor-help" data-var="C">C</span>
                    <span>=</span>
                    <span class="text-cyan-400 font-black hover:scale-110 transition-transform inline-block cursor-help" data-var="S">S</span>
                    <span class="text-indigo-400 font-black hover:scale-110 transition-transform inline-block cursor-help" data-var="N">N</span>
                    <span class="text-indigo-300 group relative">
                        (<span class="hover:scale-110 transition-transform inline-block cursor-help font-black" data-var="d1">d₁</span>)
                    </span>
                    <span>-</span>
                    <span class="text-rose-400 font-black hover:scale-110 transition-transform inline-block cursor-help" data-var="K">K</span>
                    <span class="text-amber-400 font-black hover:scale-110 transition-transform inline-block cursor-help" data-var="e">e</span>
                    <sup class="text-xs md:text-sm -mt-8 flex gap-1">
                        -
                        <span class="text-purple-400 hover:scale-110 transition-transform inline-block cursor-help font-black" data-var="r">r</span>
                        <span class="text-yellow-400 hover:scale-110 transition-transform inline-block cursor-help font-black" data-var="T">T</span>
                    </sup>
                    <span class="text-indigo-400 font-black hover:scale-110 transition-transform inline-block cursor-help" data-var="N">N</span>
                    <span class="text-indigo-300">
                        (<span class="hover:scale-110 transition-transform inline-block cursor-help font-black" data-var="d2">d₂</span>)
                    </span>
                </div>
                
                <div class="text-[10px] text-slate-500 mt-4 uppercase tracking-[0.3em] animate-pulse">Hover formula components to decipher</div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div id="def-C" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-emerald-400">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">C</div>
                    <div class="text-sm font-bold text-white mb-1">Call Price</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">The theoretical fair premium of the option contract.</p>
                </div>
                <div id="def-S" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-cyan-400">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">S</div>
                    <div class="text-sm font-bold text-white mb-1">Stock Price</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">The current spot price of the underlying asset.</p>
                </div>
                <div id="def-N" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-indigo-400">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">N</div>
                    <div class="text-sm font-bold text-white mb-1">Normal Distribution</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">The cumulative normal distribution function.</p>
                </div>
                <div id="def-d1" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-indigo-300">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">d₁</div>
                    <div class="text-sm font-bold text-white mb-1">Probability Factor 1</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">A measure of the asset's movement relative to the strike.</p>
                </div>
                <div id="def-K" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-rose-400">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">K</div>
                    <div class="text-sm font-bold text-white mb-1">Strike Price</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">The fixed price where the contract can be exercised.</p>
                </div>
                <div id="def-e" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-amber-400">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">e</div>
                    <div class="text-sm font-bold text-white mb-1">Euler's Number</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">Constant (~2.718) used for continuous compounding.</p>
                </div>
                <div id="def-r" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-purple-400">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">r</div>
                    <div class="text-sm font-bold text-white mb-1">Interest Rate</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">The risk-free rate of return (e.g. 10Y Treasury).</p>
                </div>
                <div id="def-T" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-yellow-400">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">T</div>
                    <div class="text-sm font-bold text-white mb-1">Time to Expiry</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">The time remaining in the contract, in years.</p>
                </div>
                <div id="def-d2" class="bg-white/5 p-4 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col justify-center text-indigo-300">
                    <div class="text-xs uppercase font-black tracking-widest mb-1 opacity-50">d₂</div>
                    <div class="text-sm font-bold text-white mb-1">Probability Factor 2</div>
                    <p class="text-[10px] text-slate-400 leading-relaxed">The probability that the option will expire In-The-Money.</p>
                </div>
            </div>

            <!-- Plain English Explanation -->
            <div class="bg-gradient-to-br from-emerald-900/20 to-slate-900/60 p-6 rounded-2xl border border-emerald-500/20 mt-6">
                <h4 class="text-lg font-black text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                    What Does This Actually Mean?
                </h4>
                <p class="text-slate-300 text-sm mb-4">
                    Don't panic. <span class="text-emerald-400 font-semibold">You will never need to calculate this by hand.</span> Every broker, every platform, every options chain does this math for you instantly. But understanding what it represents makes you a better trader.
                </p>
                <div class="bg-black/30 p-4 rounded-xl border border-emerald-500/10 mb-4">
                    <p class="text-sm text-slate-300 mb-3">
                        <span class="text-emerald-400 font-bold">In plain English:</span> The Black-Scholes formula answers one question:
                    </p>
                    <p class="text-lg text-white font-medium text-center italic mb-3">
                        "What is the fair price for the <span class="text-emerald-400">right</span> to buy (or sell) something at a fixed price, given how much time is left and how crazy the market has been?"
                    </p>
                    <p class="text-xs text-slate-400">
                        It weighs five inputs: stock price, strike price, time remaining, interest rates, and volatility. That's it. The scary math is just a precise way of combining these factors.
                    </p>
                </div>
                <div class="grid md:grid-cols-2 gap-4 text-sm mb-4">
                    <div class="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                        <span class="text-emerald-400 font-bold block mb-1">What You Should Know</span>
                        <span class="text-slate-300 text-xs">The model assumes volatility is constant (it's not), markets are efficient (debatable), and no dividends (adjustable). Real prices deviate from theory—that's where opportunity lives.</span>
                    </div>
                    <div class="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                        <span class="text-amber-400 font-bold block mb-1">How to Think About It</span>
                        <span class="text-slate-300 text-xs">When an option seems "expensive" or "cheap," it's because IV differs from historical volatility. The model is a benchmark—the market price tells you what traders <i>expect</i> to happen.</span>
                    </div>
                </div>
            </div>

            <!-- Quote 1 -->
            <div class="mt-8 mb-4 text-center cursor-pointer bs-quote1-container">
                <div class="text-2xl md:text-3xl font-serif italic relative inline-block">
                    <div class="bs-q1-line-1">"The Black-Scholes model proved that options are not gambles,</div>
                    <div class="bs-q1-line-2 mt-2">but measurable probabilities of time, price, and fear."</div>
                </div>
            </div>

            <!-- Quote 2 -->
            <div class="mt-12 mb-8 text-center cursor-pointer bs-quote2-container">
                <div class="text-2xl md:text-3xl font-serif italic relative inline-block">
                    <div class="bs-q2-line-1">"You don't need to understand the engine to drive the car.</div>
                    <div class="bs-q2-line-2 mt-2">But knowing it runs on gas, not magic, keeps you from making foolish mistakes."</div>
                </div>
            </div>
            <style>
                .bs-q1-line-1, .bs-q1-line-2, .bs-q2-line-1, .bs-q2-line-2 {
                    color: #94a3b8;
                    background: linear-gradient(90deg, #fbbf24 0%, #fbbf24 50%, #94a3b8 50%, #94a3b8 100%);
                    background-size: 200% 100%;
                    background-position: 100% 0;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    transition: background-position 0s;
                }
                .bs-quote1-container:hover .bs-q1-line-1 {
                    background-position: 0% 0;
                    transition: background-position 2s ease-out;
                    filter: drop-shadow(0 0 8px rgba(251,191,36,0.4));
                }
                .bs-quote1-container:hover .bs-q1-line-2 {
                    background-position: 0% 0;
                    transition: background-position 2s ease-out 1.5s;
                    filter: drop-shadow(0 0 8px rgba(251,191,36,0.4));
                }
                .bs-quote2-container:hover .bs-q2-line-1 {
                    background-position: 0% 0;
                    transition: background-position 2s ease-out;
                    filter: drop-shadow(0 0 8px rgba(251,191,36,0.4));
                }
                .bs-quote2-container:hover .bs-q2-line-2 {
                    background-position: 0% 0;
                    transition: background-position 2s ease-out 1.5s;
                    filter: drop-shadow(0 0 8px rgba(251,191,36,0.4));
                }
            </style>
        </div>`,
        analogy: "Intrinsic is the house value. Extrinsic is the fire insurance premium. When a fire is near (Earnings), the premium spikes even if the house hasn't changed.", nuance: "<b>IV Crush:</b> Buying high IV options before earnings is like buying fire insurance while the house is already smoking.", example: ""
    },,
    {
        id: 'iv-rank-tool',
        name: 'IV Rank & Percentile',
        tier: 2,
        tierName: 'Risk',
        outlook: 'Educational',
        objective: 'Volatility Analysis',
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
                        <svg class="w-14 h-14 text-purple-400" style="filter: drop-shadow(0 0 12px rgba(168,85,247,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-purple-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        IV Rank & Percentile
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"The market's fear has a price. Know when it's cheap, know when it's expensive."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A thermometer for fear. Just as you'd check the temperature before dressing, check IV before trading options.",
        nuance: "<b>The Edge:</b> IV Rank tells you if options are priced for a hurricane or a sunny day. Sell premium when fear is high, buy when complacency reigns.",
        example: ""
    },,
    {
        id: 'earnings-calendar',
        name: 'Earnings & IV Crush',
        tier: 2,
        tierName: 'Risk',
        outlook: 'Educational',
        objective: 'Event Trading',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-rose-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-rose-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-rose-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(251,113,133,0.2)]">
                        <svg class="w-14 h-14 text-rose-400" style="filter: drop-shadow(0 0 12px rgba(251,113,133,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-rose-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        Earnings Calendar & IV Crush Analyzer
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"The jungle feasts on those who buy premium before earnings."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A weather forecast for volatility storms. Earnings are scheduled hurricanes—you know they're coming, so you can position accordingly.",
        nuance: "<b>The Trap:</b> IV crush destroys long option buyers even when they're right on direction. The smart money sells premium into earnings and profits from the collapse.",
        example: ""
    },,
    {
        id: 'iv-crush-calculator',
        name: 'IV Crush Calculator',
        tier: 2,
        tierName: 'Risk',
        outlook: 'Educational',
        objective: 'Event Analysis',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="border border-rose-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-rose-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-rose-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                        <svg class="w-14 h-14 text-rose-400" style="filter: drop-shadow(0 0 12px rgba(244,63,94,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M2 12h20"/><path d="M12 2l-4 4"/><path d="M12 2l4 4"/><path d="M12 22l-4-4"/><path d="M12 22l4-4"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-rose-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        IV Crush Calculator
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"The market giveth volatility, and the market taketh away."</p>
                </div>
            </div>
        </div>
        `,
        analogy: "A pressure gauge showing how much air will escape your balloon. When the event passes, the pressure releases—and your option deflates with it.",
        nuance: "<b>The Hidden Cost:</b> IV crush can turn a winning directional bet into a losing trade. Calculate exactly how much the stock must move just to break even after the volatility collapse.",
        example: ""
    },,
    {
        id: 'assignment-exercise',
        name: 'Assignment & Exercise',
        tier: 2,
        tierName: 'Risk',
        outlook: 'Educational',
        objective: 'Mechanics',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="text-center py-12"><p class="text-slate-400">Interactive assignment and exercise tutorial - click to open</p></div>`,
        analogy: "Exercise is cashing a winning lottery ticket. Assignment is being the lottery — sometimes you have to pay out, but you already collected the ticket price.",
        nuance: "<b>Fear vs Reality:</b> Most beginners fear assignment like it's a penalty. In reality, it's just the contract fulfilling its purpose. Many pro traders use assignment strategically.",
        example: ""
    },,
    {
        id: 'options-taxes',
        name: 'Taxes & Options',
        tier: 2,
        tierName: 'Risk',
        outlook: 'Educational',
        objective: 'Tax Planning',
        risk: 'Knowledge',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <!-- Hero Section -->
            <div class="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/40 p-8 rounded-[2rem] relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-5"></div>
                <div class="relative z-10 text-center">
                    <div class="inline-block p-4 rounded-full bg-red-500/20 border border-red-500/50 mb-4">
                        <svg class="w-12 h-12 text-red-400" style="filter: drop-shadow(0 0 10px rgba(248,113,113,0.8));" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                            <line x1="12" y1="11" x2="12" y2="17"/>
                            <line x1="9" y1="14" x2="15" y2="14"/>
                        </svg>
                    </div>
                    <h2 class="text-4xl font-black text-white mb-4">OPTIONS & TAXES</h2>
                    <p class="text-red-200 text-lg max-w-2xl mx-auto">The invisible costs that can destroy your profits. The IRS doesn't care about your clever strategy—they want their cut.</p>
                </div>
            </div>

            <div class="bg-amber-900/20 border border-amber-500/30 rounded-xl p-5">
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                        <line x1="12" x2="12" y1="9" y2="13"/>
                        <line x1="12" x2="12.01" y1="17" y2="17"/>
                    </svg>
                    <div>
                        <p class="text-amber-300 font-bold mb-2">⚠️ CRITICAL DISCLAIMER</p>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            <b class="text-white">This is NOT tax advice.</b> Tax laws are complex, change frequently, and vary by jurisdiction. Always consult a qualified tax professional (CPA or tax attorney) before making trading decisions based on tax implications. This module provides general education only.
                        </p>
                    </div>
                </div>
            </div>

            <!-- The Two Types of Capital Gains -->
            <div class="bg-slate-900/60 border border-cyan-500/30 rounded-2xl p-6">
                <h3 class="text-2xl font-black text-cyan-400 mb-6 flex items-center gap-3">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Short-Term vs Long-Term Capital Gains
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/30 rounded-xl p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold uppercase">Short-Term</span>
                            <span class="text-slate-400 text-xs">≤ 365 days</span>
                        </div>
                        <h4 class="text-red-400 font-bold mb-3">Held 1 Year or Less</h4>
                        <ul class="space-y-2 text-sm text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-red-500">▸</span>
                                <span>Taxed as <b class="text-white">ordinary income</b></span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-red-500">▸</span>
                                <span>Tax rate: <b class="text-red-400">10% to 37%</b> (based on tax bracket)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-red-500">▸</span>
                                <span><b class="text-white">Most options trades fall here</b> since they're typically held <45 days</span>
                            </li>
                        </ul>
                        <div class="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/20">
                            <p class="text-red-200 text-xs"><b>Example:</b> You're in the 32% tax bracket. You make $10,000 on a credit spread. You owe <b class="text-red-400">$3,200</b> in taxes.</p>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-500/30 rounded-xl p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase">Long-Term</span>
                            <span class="text-slate-400 text-xs">> 365 days</span>
                        </div>
                        <h4 class="text-emerald-400 font-bold mb-3">Held More Than 1 Year</h4>
                        <ul class="space-y-2 text-sm text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500">▸</span>
                                <span>Taxed at <b class="text-white">preferential rates</b></span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500">▸</span>
                                <span>Tax rate: <b class="text-emerald-400">0%, 15%, or 20%</b> (much lower!)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500">▸</span>
                                <span><b class="text-white">LEAPS only</b> - you must hold for >365 days</span>
                            </li>
                        </ul>
                        <div class="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
                            <p class="text-emerald-200 text-xs"><b>Example:</b> Same $10,000 profit, but held >1 year. You owe <b class="text-emerald-400">$1,500-$2,000</b> in taxes (15-20% rate).</p>
                        </div>
                    </div>
                </div>

                <div class="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <p class="text-purple-200 text-sm"><b class="text-purple-400">The Options Reality:</b> 99% of options traders pay short-term capital gains rates because positions are closed within weeks or days. This is why profitable options traders need to set aside 25-35% of gains for taxes.</p>
                </div>
            </div>

            <!-- Wash Sale Rules -->
            <div class="bg-slate-900/60 border border-rose-500/30 rounded-2xl p-6">
                <h3 class="text-2xl font-black text-rose-400 mb-6 flex items-center gap-3">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <line x1="17" x2="22" y1="8" y2="13"/>
                        <line x1="22" x2="17" y1="8" y2="13"/>
                    </svg>
                    The Wash Sale Rule (The Silent Killer)
                </h3>

                <p class="text-slate-300 mb-6">The wash sale rule disallows loss deductions if you repurchase a "substantially identical" security within <b class="text-white">30 days before or after</b> the sale. This creates a 61-day window where you can't claim the loss.</p>

                <div class="bg-gradient-to-r from-rose-900/40 to-red-900/40 border border-rose-500/40 rounded-xl p-6 mb-6">
                    <h4 class="text-rose-300 font-bold mb-4 text-lg">How It Works (The Trap):</h4>
                    <div class="space-y-4">
                        <div class="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                            <p class="text-slate-300 text-sm mb-2"><b class="text-white">Day 1:</b> You buy 100 shares of SPY at $450</p>
                            <p class="text-slate-300 text-sm mb-2"><b class="text-white">Day 15:</b> SPY drops to $440. You sell for a <b class="text-red-400">$1,000 loss</b></p>
                            <p class="text-slate-300 text-sm mb-2"><b class="text-white">Day 20:</b> SPY bounces to $445. You buy it back thinking you're smart</p>
                            <p class="text-amber-300 text-sm font-bold mt-3">❌ WASH SALE: Your $1,000 loss is DISALLOWED for this tax year</p>
                        </div>

                        <div class="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                            <p class="text-amber-200 text-sm"><b>What happens to the loss?</b> It gets added to the cost basis of your new position. You can eventually claim it when you sell the new position (outside the 30-day window). But for this year's taxes? Gone.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/60 rounded-xl p-5 border border-cyan-500/30">
                    <h4 class="text-cyan-400 font-bold mb-4">Does Wash Sale Apply to Options?</h4>
                    <p class="text-slate-300 text-sm mb-4"><b class="text-white">YES.</b> The IRS considers options on the same underlying to be "substantially identical." Here's what triggers it:</p>
                    <ul class="space-y-2 text-sm text-slate-300">
                        <li class="flex items-start gap-2">
                            <span class="text-rose-500">❌</span>
                            <span>Sell SPY call at a loss → Buy another SPY call within 30 days = <b class="text-rose-400">WASH SALE</b></span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-rose-500">❌</span>
                            <span>Sell AAPL shares at a loss → Buy AAPL call within 30 days = <b class="text-rose-400">WASH SALE</b></span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-emerald-500">✓</span>
                            <span>Sell SPY call at a loss → Buy QQQ call = <b class="text-emerald-400">NOT a wash sale</b> (different underlying)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Section 1256 Contracts -->
            <div class="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-6">
                <h3 class="text-2xl font-black text-purple-400 mb-6 flex items-center gap-3">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="9" x2="15" y1="9" y2="9"/>
                        <line x1="9" x2="15" y1="15" y2="15"/>
                    </svg>
                    Section 1256 Contracts (The Tax Advantage)
                </h3>

                <p class="text-slate-300 mb-6"><b class="text-white">Section 1256 contracts</b> get special tax treatment: 60% long-term / 40% short-term, regardless of holding period. This is HUGE for active traders.</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-500/30 rounded-xl p-5">
                        <h4 class="text-emerald-400 font-bold mb-3 text-lg">✅ Section 1256 Contracts</h4>
                        <ul class="space-y-2 text-sm text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500">▸</span>
                                <span><b class="text-white">Index Options</b> (SPX, NDX, RUT - cash-settled)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500">▸</span>
                                <span><b class="text-white">Futures Contracts</b> (ES, NQ, /GC)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-500">▸</span>
                                <span><b class="text-white">Futures Options</b></span>
                            </li>
                        </ul>
                        <div class="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
                            <p class="text-emerald-200 text-xs"><b>Tax Math:</b> $10,000 profit = $6,000 taxed at 15-20% (long-term) + $4,000 taxed at your bracket. <b class="text-emerald-400">Effective rate: ~26%</b></p>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-slate-800/40 to-slate-900/60 border border-slate-700 rounded-xl p-5">
                        <h4 class="text-slate-400 font-bold mb-3 text-lg">❌ NOT Section 1256</h4>
                        <ul class="space-y-2 text-sm text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-slate-500">▸</span>
                                <span><b class="text-white">Equity Options</b> (AAPL, TSLA, SPY - stock options)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-slate-500">▸</span>
                                <span><b class="text-white">ETF Options</b> (SPY, QQQ, IWM)</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-slate-500">▸</span>
                                <span>All taxed at ordinary income rates (short-term)</span>
                            </li>
                        </ul>
                        <div class="mt-4 p-3 bg-rose-900/20 rounded-lg border border-rose-500/20">
                            <p class="text-rose-200 text-xs"><b>Tax Math:</b> Same $10,000 profit = <b class="text-rose-400">$3,200 in taxes</b> (32% bracket). $600 more than SPX.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <p class="text-purple-200 text-sm"><b class="text-purple-400">Pro Tip:</b> Serious options traders often switch from SPY (equity) to SPX (index) to get Section 1256 treatment. Same exposure, better taxes. But SPX has 100x multiplier and European-style exercise, so be careful.</p>
                </div>
            </div>

            <!-- Assignment & Exercise -->
            <div class="bg-slate-900/60 border border-cyan-500/30 rounded-2xl p-6">
                <h3 class="text-2xl font-black text-cyan-400 mb-6 flex items-center gap-3">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                    </svg>
                    Assignment & Exercise Tax Treatment
                </h3>

                <div class="space-y-6">
                    <div class="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
                        <h4 class="text-white font-bold mb-3">If You're ASSIGNED on a Short Option:</h4>
                        <ul class="space-y-3 text-sm text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-cyan-500">▸</span>
                                <span><b class="text-white">Short Call Assigned:</b> You sell stock at the strike. The premium you collected is added to your sale proceeds. Your cost basis is whatever you paid for the stock.</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-cyan-500">▸</span>
                                <span><b class="text-white">Short Put Assigned:</b> You buy stock at the strike. The premium you collected reduces your cost basis. Your holding period for long-term capital gains starts the day you're assigned.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-slate-800/60 rounded-xl p-5 border border-slate-700">
                        <h4 class="text-white font-bold mb-3">If You EXERCISE a Long Option:</h4>
                        <ul class="space-y-3 text-sm text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-cyan-500">▸</span>
                                <span><b class="text-white">Long Call Exercised:</b> You buy stock at the strike. The premium you paid is added to your cost basis. Your holding period starts the day you exercise.</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-cyan-500">▸</span>
                                <span><b class="text-white">Long Put Exercised:</b> You sell stock at the strike. The premium you paid reduces your sale proceeds. Capital gain/loss is calculated normally.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Record Keeping -->
            <div class="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/40 rounded-2xl p-6">
                <h3 class="text-2xl font-black text-amber-400 mb-6 flex items-center gap-3">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" x2="8" y1="13" y2="13"/>
                        <line x1="16" x2="8" y1="17" y2="17"/>
                        <line x1="10" x2="8" y1="9" y2="9"/>
                    </svg>
                    Record Keeping (DO NOT SKIP THIS)
                </h3>

                <div class="space-y-4">
                    <p class="text-slate-300 text-sm">Your broker will send you Form <b class="text-white">1099-B</b> in February showing all your trades. But brokers often get it WRONG for complex options strategies. You need your own records.</p>

                    <div class="bg-slate-900/60 rounded-xl p-5 border border-amber-500/30">
                        <h4 class="text-amber-400 font-bold mb-3">What to Track:</h4>
                        <ul class="space-y-2 text-sm text-slate-300">
                            <li class="flex items-start gap-2">
                                <span class="text-amber-500">1.</span>
                                <span><b class="text-white">Entry Date & Price</b> - When did you open the position, at what price?</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-amber-500">2.</span>
                                <span><b class="text-white">Exit Date & Price</b> - When did you close, at what price?</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-amber-500">3.</span>
                                <span><b class="text-white">Fees & Commissions</b> - These reduce your taxable gain</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-amber-500">4.</span>
                                <span><b class="text-white">Wash Sales</b> - Flag any positions that might trigger wash sale rules</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-amber-500">5.</span>
                                <span><b class="text-white">Assignment/Exercise Events</b> - Track cost basis adjustments</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4">
                        <p class="text-emerald-200 text-sm"><b class="text-emerald-400">Pro Tip:</b> Use a trading journal or spreadsheet. Export your broker statements monthly and reconcile. Come tax time, you'll thank yourself. Consider using specialized software like TradeLog or GainsKeeper for active traders.</p>
                    </div>
                </div>
            </div>

            <!-- Key Takeaways -->
            <div class="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-500/40 rounded-xl p-6">
                <h3 class="text-purple-300 font-bold mb-4 text-xl flex items-center gap-2">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Key Takeaways
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <div class="flex items-start gap-2 text-slate-300 text-sm">
                            <span class="text-emerald-400 font-bold">1.</span>
                            <span><b class="text-white">Set aside 25-35%</b> of profits for taxes. Most options trades are short-term capital gains.</span>
                        </div>
                        <div class="flex items-start gap-2 text-slate-300 text-sm">
                            <span class="text-emerald-400 font-bold">2.</span>
                            <span><b class="text-white">Wash sale rules apply to options.</b> Don't repurchase the same underlying within 30 days of a loss.</span>
                        </div>
                        <div class="flex items-start gap-2 text-slate-300 text-sm">
                            <span class="text-emerald-400 font-bold">3.</span>
                            <span><b class="text-white">Trade SPX instead of SPY</b> if possible to get Section 1256 treatment (60/40 tax rate).</span>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-start gap-2 text-slate-300 text-sm">
                            <span class="text-emerald-400 font-bold">4.</span>
                            <span><b class="text-white">Keep meticulous records.</b> Your broker's 1099-B may be wrong for complex strategies.</span>
                        </div>
                        <div class="flex items-start gap-2 text-slate-300 text-sm">
                            <span class="text-emerald-400 font-bold">5.</span>
                            <span><b class="text-white">Consult a CPA.</b> Seriously. Tax law is complex and changes frequently.</span>
                        </div>
                        <div class="flex items-start gap-2 text-slate-300 text-sm">
                            <span class="text-emerald-400 font-bold">6.</span>
                            <span><b class="text-white">Plan ahead.</b> Tax-loss harvesting, timing realizations, entity structure—all matter at scale.</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        `,
        analogy: "Taxes are the jungle's toll. You can hunt successfully, but if you don't pay the toll at the exit, the rangers will confiscate everything you caught—plus a penalty.",
        nuance: "<b>The Mark-to-Market Election:</b> Professional traders can elect 475(f) status to deduct all losses (no $3,000 cap) and avoid wash sales. But it's irrevocable and complex. Get professional advice first.",
        example: ""
    },,
    {
        id: 'beginner-mistakes',
        name: 'Common Beginner Mistakes',
        tier: 2,
        tierName: 'Risk',
        outlook: 'Educational',
        objective: 'Capital Protection',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="text-center py-12"><p class="text-slate-400">Interactive beginner mistakes guide - click to open</p></div>`,
        analogy: "Every trader pays tuition to the market. This module lets you learn from others' expensive lessons instead of paying your own.",
        nuance: "<b>Survival First:</b> These mistakes have blown up more accounts than bad market calls. Avoiding them is more important than finding winning trades.",
        example: ""
    },
];
