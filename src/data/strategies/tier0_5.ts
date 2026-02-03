import { Strategy } from '../../types';

// Foundations Extended - Tier 0.5
export const TIER_0_5_STRATEGIES: Strategy[] = [
    {
        id: 'express-what-are-options',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'What Are Options?',
        outlook: 'Educational',
        objective: '10 min',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
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
        id: 'express-greeks',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'The Only 2 Greeks',
        outlook: 'Educational',
        objective: '8 min',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">The Only 2 Greeks You Need (8 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">Greeks measure how your option's price changes. For your first trades, focus on just two: Delta and Theta.</p>
            </div>

            <div class="bg-gradient-to-br from-emerald-900/30 to-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl">Δ</div>
                    <div>
                        <h3 class="text-xl font-bold text-emerald-400">Delta — Your Speedometer</h3>
                        <p class="text-slate-400 text-sm">How much your option moves when the stock moves $1</p>
                    </div>
                </div>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <p class="text-slate-300">If your call has <b>Delta = 0.50</b>, and the stock goes up $1, your option gains <b>$0.50</b> (×100 = $50 per contract).</p>
                </div>
                <div class="grid md:grid-cols-3 gap-3 text-sm">
                    <div class="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div class="text-emerald-400 font-bold">0.20 Delta</div>
                        <div class="text-slate-400">Far OTM, cheap, lottery ticket</div>
                    </div>
                    <div class="bg-slate-800/50 rounded-lg p-3 text-center border border-amber-500/30">
                        <div class="text-amber-400 font-bold">0.50 Delta</div>
                        <div class="text-slate-400">ATM, balanced risk/reward</div>
                    </div>
                    <div class="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div class="text-cyan-400 font-bold">0.80 Delta</div>
                        <div class="text-slate-400">Deep ITM, moves like stock</div>
                    </div>
                </div>
                <div class="mt-4 p-3 bg-emerald-500/10 rounded-lg">
                    <p class="text-emerald-300 text-sm"><b>Pro Tip:</b> Delta also approximates probability of expiring ITM. 0.30 delta ≈ 30% chance of profit.</p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-purple-900/30 to-purple-950/20 border border-purple-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">Θ</div>
                    <div>
                        <h3 class="text-xl font-bold text-purple-400">Theta — The Daily Tax</h3>
                        <p class="text-slate-400 text-sm">How much value your option loses each day</p>
                    </div>
                </div>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <p class="text-slate-300">If your option has <b>Theta = -0.05</b>, you lose <b>$5 per day</b> per contract just from time passing. Options are melting ice cubes.</p>
                </div>
                <div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <h4 class="text-red-400 font-bold mb-2">⚠️ The Theta Warning</h4>
                    <p class="text-slate-300 text-sm">Time decay accelerates in the final 2 weeks before expiration. Don't hold options into expiration week unless you know what you're doing.</p>
                </div>
                <div class="mt-4 p-3 bg-purple-500/10 rounded-lg">
                    <p class="text-purple-300 text-sm"><b>For Beginners:</b> Buy options with 60-120 days until expiration. This gives you time to be right without losing too much to Theta.</p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-cyan-900/30 to-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 Quick Decision Framework</h3>
                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-emerald-400 font-bold mb-2">Bullish Trade?</h4>
                        <p class="text-slate-300 text-sm">Buy a <b>0.50-0.70 delta call</b> with <b>60-90 days</b> until expiration. This balances speed (delta) and decay (theta).</p>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-red-400 font-bold mb-2">Bearish Trade?</h4>
                        <p class="text-slate-300 text-sm">Buy a <b>-0.50 to -0.70 delta put</b> with <b>60-90 days</b> until expiration. Same logic applies.</p>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-400 font-bold mb-2">Why 60-90 Days?</h4>
                        <p class="text-slate-300 text-sm">Theta doesn't hurt as much, but the option is still reasonably priced. You have time to be right.</p>
                    </div>
                </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: Delta (directional exposure) and Theta (time decay)</p>
                <p class="text-slate-400 text-sm mt-2">Next up: Learn about IV (Implied Volatility) and why it matters for pricing</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-iv',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Understanding IV',
        outlook: 'Educational',
        objective: '8 min',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Understanding IV (Implied Volatility) (8 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">IV is NOT a Greek—it's the market's forecast of how much the stock will move. It directly affects option prices.</p>
            </div>

            <div class="bg-gradient-to-br from-purple-900/30 to-purple-950/20 border border-purple-500/30 rounded-2xl p-6">
                <h3 class="text-2xl font-bold text-purple-400 mb-4">What is Implied Volatility?</h3>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <p class="text-slate-300 mb-3">
                        <b>IV is the market's expectation of future movement.</b> High IV = market expects big swings. Low IV = market expects calm.
                    </p>
                    <p class="text-slate-300">
                        Think of it as insurance pricing: earthquake-prone areas have expensive insurance, just like volatile stocks have expensive options.
                    </p>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                        <h4 class="text-emerald-400 font-bold mb-2">Low IV (~20-30%)</h4>
                        <p class="text-slate-300 text-sm mb-2">Options are <b>cheap</b>. Market expects small moves.</p>
                        <p class="text-slate-400 text-xs">Good time to <b>buy</b> options if you think a big move is coming.</p>
                    </div>
                    <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <h4 class="text-red-400 font-bold mb-2">High IV (~50-100%+)</h4>
                        <p class="text-slate-300 text-sm mb-2">Options are <b>expensive</b>. Market expects big moves.</p>
                        <p class="text-slate-400 text-xs">Be careful buying—you're paying a premium for fear.</p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-cyan-900/30 to-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">📈 IV in Action: Real Example</h3>
                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-white font-bold mb-2">Scenario 1: AAPL (Low IV = 25%)</h4>
                        <p class="text-slate-300 text-sm mb-2">Stock at $180. 30-day ATM call costs <b>$4.50</b> ($450 per contract).</p>
                        <p class="text-emerald-400 text-sm">✓ Market is calm. Options are reasonably priced.</p>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-white font-bold mb-2">Scenario 2: AAPL Earnings Week (High IV = 60%)</h4>
                        <p class="text-slate-300 text-sm mb-2">Stock still at $180. Same 30-day ATM call now costs <b>$8.20</b> ($820 per contract).</p>
                        <p class="text-red-400 text-sm">⚠️ You're paying 82% more for the same strike, just because IV spiked.</p>
                    </div>
                </div>
                <div class="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <p class="text-amber-300 text-sm"><b>Key Insight:</b> If you buy options when IV is high and it drops after (IV crush), your option loses value even if the stock doesn't move.</p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-pink-900/30 to-pink-950/20 border border-pink-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-pink-400 mb-4">🔥 IV Crush: The Silent Killer</h3>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <p class="text-slate-300 mb-3">
                        <b>IV Crush</b> happens when implied volatility suddenly drops—usually after a major event like earnings.
                    </p>
                    <p class="text-slate-300">
                        Before earnings: IV = 80% (high fear). After earnings: IV = 30% (event over, calm restored). Your option can lose 30-50% of its value overnight, even if you guessed the direction correctly.
                    </p>
                </div>
                <div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <h4 class="text-red-400 font-bold mb-2">⚠️ Beginner Warning</h4>
                    <p class="text-slate-300 text-sm">Avoid buying options right before earnings if you're new. The IV crush can wipe out your gains even if the stock moves in your favor.</p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-cyan-900/30 to-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">📊 How to Check IV</h3>
                <div class="space-y-3">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-white font-bold mb-2">1. Check IV Percentile (IV Rank)</h4>
                        <p class="text-slate-300 text-sm mb-2">IV Rank tells you where current IV sits relative to its 52-week range.</p>
                        <ul class="text-sm text-slate-400 space-y-1 ml-4">
                            <li>• <span class="text-emerald-400 font-bold">IV Rank 0-25%</span> = Low IV, options cheap</li>
                            <li>• <span class="text-amber-400 font-bold">IV Rank 25-75%</span> = Mid-range, neutral</li>
                            <li>• <span class="text-red-400 font-bold">IV Rank 75-100%</span> = High IV, options expensive</li>
                        </ul>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-white font-bold mb-2">2. Compare to Historical Average</h4>
                        <p class="text-slate-300 text-sm">SPY typically trades at 15-20% IV. If it's at 40%, something unusual is happening (market fear, event risk).</p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-emerald-900/30 to-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-4">✅ Quick IV Strategy Guide</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-emerald-400 font-bold mb-2">When IV is Low (Buy Options)</h4>
                        <ul class="text-sm text-slate-300 space-y-2">
                            <li>• Options are on sale—good time to buy calls/puts</li>
                            <li>• You benefit if IV increases (expands value)</li>
                            <li>• Lower risk of IV crush</li>
                        </ul>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-red-400 font-bold mb-2">When IV is High (Be Cautious)</h4>
                        <ul class="text-sm text-slate-300 space-y-2">
                            <li>• Options are expensive—you're overpaying</li>
                            <li>• Risk of IV crush after event passes</li>
                            <li>• Consider waiting or using spreads instead</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: What IV is, why it matters, and when to avoid buying options</p>
                <p class="text-slate-400 text-sm mt-2">IV isn't a Greek—it's the price tag. Always check IV before entering a trade.</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-chain',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Reading the Chain',
        outlook: 'Educational',
        objective: '10 min',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Reading an Options Chain (10 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">The options chain is your menu. Here's how to read it.</p>
            </div>

            <div class="bg-black/40 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">📊 Anatomy of the Chain (Example)</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-xs">
                        <thead>
                            <tr class="border-b border-slate-700">
                                <th colspan="6" class="text-emerald-400 py-2 text-center bg-emerald-500/10 font-bold">CALLS</th>
                                <th class="text-amber-400 py-2 px-3 bg-amber-500/10 font-bold">STRIKE</th>
                                <th colspan="6" class="text-red-400 py-2 text-center bg-red-500/10 font-bold">PUTS</th>
                            </tr>
                            <tr class="border-b border-slate-700 text-slate-400 text-[10px] uppercase">
                                <th class="py-2 px-1.5">Vol</th>
                                <th class="py-2 px-1.5">OI</th>
                                <th class="py-2 px-1.5">Bid</th>
                                <th class="py-2 px-1.5">Ask</th>
                                <th class="py-2 px-1.5">Delta</th>
                                <th class="py-2 px-1.5">IV</th>
                                <th class="py-2 px-3 bg-amber-500/5"></th>
                                <th class="py-2 px-1.5">Bid</th>
                                <th class="py-2 px-1.5">Ask</th>
                                <th class="py-2 px-1.5">Delta</th>
                                <th class="py-2 px-1.5">IV</th>
                                <th class="py-2 px-1.5">OI</th>
                                <th class="py-2 px-1.5">Vol</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-300">
                            <!-- Deep ITM Call -->
                            <tr class="bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-pointer">
                                <td class="py-2 px-1.5 text-slate-400">1,247</td>
                                <td class="py-2 px-1.5 text-cyan-400">8,592</td>
                                <td class="py-2 px-1.5 font-bold">12.40</td>
                                <td class="py-2 px-1.5 font-bold">12.65</td>
                                <td class="py-2 px-1.5 text-emerald-400 font-bold">0.89</td>
                                <td class="py-2 px-1.5">26%</td>
                                <td class="py-2 px-3 font-bold text-amber-400 bg-amber-500/10">$110</td>
                                <td class="py-2 px-1.5 text-slate-500">0.15</td>
                                <td class="py-2 px-1.5 text-slate-500">0.25</td>
                                <td class="py-2 px-1.5 text-red-400">-0.08</td>
                                <td class="py-2 px-1.5">35%</td>
                                <td class="py-2 px-1.5 text-cyan-400">3,201</td>
                                <td class="py-2 px-1.5 text-slate-400">89</td>
                            </tr>
                            <!-- ITM Call -->
                            <tr class="bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-pointer">
                                <td class="py-2 px-1.5 text-slate-400">2,891</td>
                                <td class="py-2 px-1.5 text-cyan-400">12,456</td>
                                <td class="py-2 px-1.5 font-bold">8.50</td>
                                <td class="py-2 px-1.5 font-bold">8.70</td>
                                <td class="py-2 px-1.5 text-emerald-400 font-bold">0.75</td>
                                <td class="py-2 px-1.5">28%</td>
                                <td class="py-2 px-3 font-bold text-amber-400 bg-amber-500/10">$115</td>
                                <td class="py-2 px-1.5">0.45</td>
                                <td class="py-2 px-1.5">0.55</td>
                                <td class="py-2 px-1.5 text-red-400">-0.18</td>
                                <td class="py-2 px-1.5">32%</td>
                                <td class="py-2 px-1.5 text-cyan-400">5,789</td>
                                <td class="py-2 px-1.5 text-slate-400">456</td>
                            </tr>
                            <!-- Near ATM Call -->
                            <tr class="bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-pointer">
                                <td class="py-2 px-1.5 text-slate-400">4,523</td>
                                <td class="py-2 px-1.5 text-cyan-400">18,234</td>
                                <td class="py-2 px-1.5 font-bold">6.30</td>
                                <td class="py-2 px-1.5 font-bold">6.50</td>
                                <td class="py-2 px-1.5 text-emerald-400 font-bold">0.62</td>
                                <td class="py-2 px-1.5">29%</td>
                                <td class="py-2 px-3 font-bold text-amber-400 bg-amber-500/10">$118</td>
                                <td class="py-2 px-1.5">3.60</td>
                                <td class="py-2 px-1.5">3.80</td>
                                <td class="py-2 px-1.5 text-red-400">-0.38</td>
                                <td class="py-2 px-1.5">30%</td>
                                <td class="py-2 px-1.5 text-cyan-400">14,892</td>
                                <td class="py-2 px-1.5 text-slate-400">2,134</td>
                            </tr>
                            <!-- ATM - Highlighted -->
                            <tr class="border-2 border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer">
                                <td class="py-2 px-1.5 text-slate-300">6,789</td>
                                <td class="py-2 px-1.5 text-cyan-300 font-bold">24,567</td>
                                <td class="py-2 px-1.5 font-bold">5.20</td>
                                <td class="py-2 px-1.5 font-bold">5.40</td>
                                <td class="py-2 px-1.5 text-emerald-400 font-bold">0.52</td>
                                <td class="py-2 px-1.5">30%</td>
                                <td class="py-2 px-3 font-bold text-amber-400">$120 ← ATM</td>
                                <td class="py-2 px-1.5 font-bold">4.80</td>
                                <td class="py-2 px-1.5 font-bold">5.00</td>
                                <td class="py-2 px-1.5 text-red-400 font-bold">-0.48</td>
                                <td class="py-2 px-1.5">30%</td>
                                <td class="py-2 px-1.5 text-cyan-300 font-bold">22,341</td>
                                <td class="py-2 px-1.5 text-slate-300">5,892</td>
                            </tr>
                            <!-- Near ATM Put -->
                            <tr class="bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer">
                                <td class="py-2 px-1.5 text-slate-400">3,456</td>
                                <td class="py-2 px-1.5 text-cyan-400">16,234</td>
                                <td class="py-2 px-1.5 font-bold">3.80</td>
                                <td class="py-2 px-1.5 font-bold">4.00</td>
                                <td class="py-2 px-1.5 text-emerald-400">0.40</td>
                                <td class="py-2 px-1.5">30%</td>
                                <td class="py-2 px-3 font-bold text-amber-400 bg-amber-500/10">$122</td>
                                <td class="py-2 px-1.5 font-bold">6.10</td>
                                <td class="py-2 px-1.5 font-bold">6.30</td>
                                <td class="py-2 px-1.5 text-red-400 font-bold">-0.60</td>
                                <td class="py-2 px-1.5">29%</td>
                                <td class="py-2 px-1.5 text-cyan-400">19,567</td>
                                <td class="py-2 px-1.5 text-slate-400">3,201</td>
                            </tr>
                            <!-- OTM Put -->
                            <tr class="bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer">
                                <td class="py-2 px-1.5 text-slate-400">2,145</td>
                                <td class="py-2 px-1.5 text-cyan-400">11,234</td>
                                <td class="py-2 px-1.5 font-bold">2.80</td>
                                <td class="py-2 px-1.5 font-bold">2.95</td>
                                <td class="py-2 px-1.5 text-emerald-400">0.32</td>
                                <td class="py-2 px-1.5">31%</td>
                                <td class="py-2 px-3 font-bold text-amber-400 bg-amber-500/10">$125</td>
                                <td class="py-2 px-1.5 font-bold">7.30</td>
                                <td class="py-2 px-1.5 font-bold">7.50</td>
                                <td class="py-2 px-1.5 text-red-400 font-bold">-0.68</td>
                                <td class="py-2 px-1.5">29%</td>
                                <td class="py-2 px-1.5 text-cyan-400">13,456</td>
                                <td class="py-2 px-1.5 text-slate-400">1,892</td>
                            </tr>
                            <!-- Deep OTM Put -->
                            <tr class="bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer">
                                <td class="py-2 px-1.5 text-slate-400">892</td>
                                <td class="py-2 px-1.5 text-cyan-400">6,789</td>
                                <td class="py-2 px-1.5 text-slate-500">1.45</td>
                                <td class="py-2 px-1.5 text-slate-500">1.60</td>
                                <td class="py-2 px-1.5 text-emerald-400">0.20</td>
                                <td class="py-2 px-1.5">32%</td>
                                <td class="py-2 px-3 font-bold text-amber-400 bg-amber-500/10">$130</td>
                                <td class="py-2 px-1.5 font-bold">9.80</td>
                                <td class="py-2 px-1.5 font-bold">10.05</td>
                                <td class="py-2 px-1.5 text-red-400 font-bold">-0.80</td>
                                <td class="py-2 px-1.5">28%</td>
                                <td class="py-2 px-1.5 text-cyan-400">8,234</td>
                                <td class="py-2 px-1.5 text-slate-400">567</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-4 flex items-center justify-between text-sm">
                    <p class="text-slate-400"><b>Stock price:</b> <span class="text-white font-bold">$120.45</span></p>
                    <p class="text-slate-400"><b>Expiration:</b> <span class="text-cyan-400 font-bold">30 DTE (Feb 26, 2026)</span></p>
                    <p class="text-slate-400"><b>IV Rank:</b> <span class="text-amber-400 font-bold">52%</span></p>
                </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-black/40 border border-emerald-500/20 rounded-xl p-5">
                    <h4 class="text-emerald-400 font-bold mb-3">📗 Bid vs Ask</h4>
                    <p class="text-slate-300 text-sm mb-2"><b>Bid:</b> What buyers will pay (you sell at this price)</p>
                    <p class="text-slate-300 text-sm mb-2"><b>Ask:</b> What sellers want (you buy at this price)</p>
                    <p class="text-slate-400 text-xs">The difference is the "spread." Tighter spread = more liquid = better.</p>
                </div>
                <div class="bg-black/40 border border-purple-500/20 rounded-xl p-5">
                    <h4 class="text-purple-400 font-bold mb-3">🎯 Strike Selection</h4>
                    <p class="text-slate-300 text-sm mb-2"><b>ITM (In The Money):</b> Higher delta, more expensive, safer</p>
                    <p class="text-slate-300 text-sm mb-2"><b>ATM (At The Money):</b> ~0.50 delta, balanced</p>
                    <p class="text-slate-300 text-sm"><b>OTM (Out of Money):</b> Lower delta, cheaper, riskier</p>
                </div>
                <div class="bg-black/40 border border-cyan-500/20 rounded-xl p-5">
                    <h4 class="text-cyan-400 font-bold mb-3">📊 Volume & OI</h4>
                    <p class="text-slate-300 text-sm mb-2"><b>Volume (Vol):</b> Contracts traded today</p>
                    <p class="text-slate-300 text-sm mb-2"><b>Open Interest (OI):</b> Total open contracts</p>
                    <p class="text-slate-400 text-xs">High OI + Volume = Liquid option = Easier to enter/exit</p>
                </div>
            </div>

            <!-- Key Insights -->
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-xl p-5">
                    <h4 class="text-amber-400 font-bold mb-3 flex items-center gap-2">
                        <span>🔥</span>
                        <span>Liquidity Check</span>
                    </h4>
                    <p class="text-slate-300 text-sm mb-3">Before trading any option, verify:</p>
                    <ul class="space-y-2 text-sm text-slate-300">
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400">•</span>
                            <span><b>OI > 1,000</b> - Enough open contracts to trade easily</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400">•</span>
                            <span><b>Volume > 100</b> - Active trading today</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400">•</span>
                            <span><b>Tight Bid-Ask Spread</b> - Less than $0.50 for most options</span>
                        </li>
                    </ul>
                </div>
                <div class="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-5">
                    <h4 class="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                        <span>⚡</span>
                        <span>Delta Reading Guide</span>
                    </h4>
                    <p class="text-slate-300 text-sm mb-3">Delta tells you probability and movement:</p>
                    <ul class="space-y-2 text-sm text-slate-300">
                        <li class="flex items-start gap-2">
                            <span class="text-emerald-400">•</span>
                            <span><b>0.75+ delta</b> - Deep ITM, ~75% chance of profit</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400">•</span>
                            <span><b>0.50 delta</b> - ATM, coin flip, most balanced</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-400">•</span>
                            <span><b>0.30 delta</b> - OTM, ~30% chance, high leverage</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4">🛒 Placing Your First Order</h3>
                <div class="space-y-4">
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">1</div>
                        <div><p class="text-slate-300"><b>Select expiration:</b> 60-120 days out for beginners</p></div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">2</div>
                        <div><p class="text-slate-300"><b>Choose strike:</b> ATM (0.50 delta) for balanced trades</p></div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">3</div>
                        <div><p class="text-slate-300"><b>Check the Ask price:</b> Multiply by 100 for total cost</p></div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">4</div>
                        <div><p class="text-slate-300"><b>Use a Limit Order:</b> Set your price between bid and ask (mid-price)</p></div>
                    </div>
                </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: How to read strikes, bids, asks, and place orders</p>
            </div>

            <!-- Interactive Live Chain Below -->
            <div class="bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border-2 border-purple-500/40 rounded-2xl p-6 text-center">
                <div class="inline-flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <span class="text-3xl">🔴</span>
                    </div>
                    <h3 class="text-2xl font-bold text-purple-400">LIVE Interactive Options Chain Below ↓</h3>
                </div>
                <p class="text-slate-300 text-lg mb-2">
                    <b>Try it yourself!</b> Scroll down to enter any ticker and explore real-time options data.
                </p>
                <p class="text-slate-400 text-sm">
                    Click different strikes, change expirations, and see live bid/ask/volume/OI data update in real-time.
                </p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-long-call',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Long Call',
        outlook: 'Bullish',
        objective: '15 min',
        risk: 'Defined',
        legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }],
        hideSimulator: false,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Long Call (15 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">Your first bullish trade. Buy a call when you think the stock is going UP.</p>
            </div>

            <div class="grid md:grid-cols-4 gap-4 text-center">
                <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                    <div class="text-emerald-400 font-bold text-lg">Direction</div>
                    <div class="text-white text-2xl">📈 BULLISH</div>
                </div>
                <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                    <div class="text-cyan-400 font-bold text-lg">Max Profit</div>
                    <div class="text-white text-2xl">∞ Unlimited</div>
                </div>
                <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div class="text-red-400 font-bold text-lg">Max Loss</div>
                    <div class="text-white text-2xl">Premium Paid</div>
                </div>
                <div class="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div class="text-purple-400 font-bold text-lg">Breakeven</div>
                    <div class="text-white text-2xl">Strike + Premium</div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-4">📖 Real Example: AAPL Long Call</h3>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div><span class="text-slate-400">Stock:</span> <span class="text-white font-bold">AAPL at $175</span></div>
                        <div><span class="text-slate-400">Your View:</span> <span class="text-emerald-400 font-bold">Bullish — earnings coming</span></div>
                        <div><span class="text-slate-400">Strike:</span> <span class="text-white font-bold">$180 Call</span></div>
                        <div><span class="text-slate-400">Expiration:</span> <span class="text-white font-bold">90 days</span></div>
                        <div><span class="text-slate-400">Premium:</span> <span class="text-white font-bold">$6.50 ($650 total)</span></div>
                        <div><span class="text-slate-400">Breakeven:</span> <span class="text-amber-400 font-bold">$186.50</span></div>
                    </div>
                </div>

                <h4 class="text-white font-bold mb-3">Three Possible Outcomes:</h4>
                <div class="space-y-3">
                    <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-emerald-400 font-bold">🎯 AAPL goes to $195</span>
                            <span class="text-emerald-400 font-bold">+$850 profit (+131%)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Option worth $15 (intrinsic) × 100 = $1,500. Minus $650 cost = $850 profit.</p>
                    </div>
                    <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-amber-400 font-bold">😐 AAPL stays at $175</span>
                            <span class="text-red-400 font-bold">-$650 loss (-100%)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Option expires worthless. You lose the premium paid. Nothing more.</p>
                    </div>
                    <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-red-400 font-bold">📉 AAPL crashes to $150</span>
                            <span class="text-red-400 font-bold">-$650 loss (-100%)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Same loss as staying flat. Your risk is DEFINED. This is the power of options.</p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4">✅ Long Call Checklist</h3>
                <div class="space-y-2">
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I'm BULLISH on this stock (expecting it to go UP)</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I've chosen 60-120 days until expiration</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I'm using ATM or slightly OTM strike (0.40-0.50 delta)</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I'm only risking money I can afford to lose (1-2% of account)</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I have an exit plan (profit target AND stop loss)</span>
                    </label>
                </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: How to buy calls for bullish trades with defined risk</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-long-put',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Long Put',
        outlook: 'Bearish',
        objective: '15 min',
        risk: 'Defined',
        legs: [{ type: 'put', action: 'buy', strikeOffset: 0, quantity: 1 }],
        hideSimulator: false,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Long Put (15 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">Profit from falling stocks OR protect your portfolio. The put is your insurance policy.</p>
            </div>

            <div class="grid md:grid-cols-4 gap-4 text-center">
                <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div class="text-red-400 font-bold text-lg">Direction</div>
                    <div class="text-white text-2xl">📉 BEARISH</div>
                </div>
                <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                    <div class="text-cyan-400 font-bold text-lg">Max Profit</div>
                    <div class="text-white text-2xl">Strike - Premium</div>
                </div>
                <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                    <div class="text-emerald-400 font-bold text-lg">Max Loss</div>
                    <div class="text-white text-2xl">Premium Paid</div>
                </div>
                <div class="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div class="text-purple-400 font-bold text-lg">Breakeven</div>
                    <div class="text-white text-2xl">Strike - Premium</div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-red-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-red-400 mb-4">📖 Real Example: META Long Put</h3>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div><span class="text-slate-400">Stock:</span> <span class="text-white font-bold">META at $500</span></div>
                        <div><span class="text-slate-400">Your View:</span> <span class="text-red-400 font-bold">Bearish — overvalued</span></div>
                        <div><span class="text-slate-400">Strike:</span> <span class="text-white font-bold">$490 Put</span></div>
                        <div><span class="text-slate-400">Expiration:</span> <span class="text-white font-bold">90 days</span></div>
                        <div><span class="text-slate-400">Premium:</span> <span class="text-white font-bold">$12.00 ($1,200 total)</span></div>
                        <div><span class="text-slate-400">Breakeven:</span> <span class="text-amber-400 font-bold">$478</span></div>
                    </div>
                </div>

                <h4 class="text-white font-bold mb-3">Three Possible Outcomes:</h4>
                <div class="space-y-3">
                    <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-emerald-400 font-bold">🎯 META drops to $450</span>
                            <span class="text-emerald-400 font-bold">+$2,800 profit (+233%)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Put worth $40 (intrinsic) × 100 = $4,000. Minus $1,200 cost = $2,800 profit.</p>
                    </div>
                    <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-amber-400 font-bold">😐 META stays at $500</span>
                            <span class="text-red-400 font-bold">-$1,200 loss (-100%)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Put expires worthless. You lose the premium paid.</p>
                    </div>
                    <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-red-400 font-bold">📈 META rallies to $550</span>
                            <span class="text-red-400 font-bold">-$1,200 loss (-100%)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Same max loss whether stock goes up a little or a lot. Risk is DEFINED.</p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">🛡️ Puts as Portfolio Insurance</h3>
                <p class="text-slate-300 mb-4">Own 100 shares of NVDA at $120? Buy a $115 put for $3 ($300). If NVDA crashes to $80, you can sell your shares at $115. Your "floor" is set.</p>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-emerald-400 font-bold mb-2">Without Protection</h4>
                        <p class="text-slate-300 text-sm">NVDA drops to $80. Loss: $4,000 (100 × $40)</p>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-cyan-400 font-bold mb-2">With $115 Put</h4>
                        <p class="text-slate-300 text-sm">NVDA drops to $80. Loss capped at $500 + $300 premium = $800</p>
                    </div>
                </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: How to buy puts for bearish trades or portfolio protection</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-csp',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Cash-Secured Put',
        outlook: 'Neutral/Bullish',
        objective: '15 min',
        risk: 'Defined',
        legs: [{ type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }],
        hideSimulator: false,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Cash-Secured Put Deep Dive (15 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">Get PAID to potentially buy a stock at a lower price. The income strategy for patient investors.</p>
            </div>

            <div class="grid md:grid-cols-4 gap-4 text-center">
                <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                    <div class="text-emerald-400 font-bold text-lg">Direction</div>
                    <div class="text-white text-2xl">📊 NEUTRAL+</div>
                </div>
                <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                    <div class="text-cyan-400 font-bold text-lg">Max Profit</div>
                    <div class="text-white text-2xl">Premium Received</div>
                </div>
                <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div class="text-red-400 font-bold text-lg">Max Loss</div>
                    <div class="text-white text-2xl">Strike × 100 - Premium</div>
                </div>
                <div class="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div class="text-purple-400 font-bold text-lg">Breakeven</div>
                    <div class="text-white text-2xl">Strike - Premium</div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-4">💡 The Concept: Getting Paid to Wait</h3>
                <p class="text-slate-300 mb-4">You want to buy AAPL, but think $175 is too expensive. You'd buy at $165. Instead of waiting and hoping, you can:</p>
                <div class="bg-slate-900/60 rounded-xl p-4">
                    <p class="text-white"><b>Sell a $165 Put</b> and collect <b>$2.50 ($250)</b> immediately.</p>
                    <ul class="mt-3 space-y-2 text-slate-300 text-sm">
                        <li>• If AAPL stays above $165: You keep the $250 and try again next month.</li>
                        <li>• If AAPL drops below $165: You buy 100 shares at $165 (your target price) AND keep the $250.</li>
                    </ul>
                </div>
                <p class="text-amber-400 text-sm mt-4"><b>Either way, you win.</b> You either collect income or buy the stock at your preferred price.</p>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">📖 Real Example: AMD Cash-Secured Put</h3>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div><span class="text-slate-400">Stock:</span> <span class="text-white font-bold">AMD at $160</span></div>
                        <div><span class="text-slate-400">Your View:</span> <span class="text-emerald-400 font-bold">Would buy at $150</span></div>
                        <div><span class="text-slate-400">Strike:</span> <span class="text-white font-bold">Sell $150 Put</span></div>
                        <div><span class="text-slate-400">Expiration:</span> <span class="text-white font-bold">60 days</span></div>
                        <div><span class="text-slate-400">Premium Received:</span> <span class="text-emerald-400 font-bold">+$4.50 (+$450)</span></div>
                        <div><span class="text-slate-400">Cash Required:</span> <span class="text-amber-400 font-bold">$15,000 (secured)</span></div>
                    </div>
                </div>

                <h4 class="text-white font-bold mb-3">Three Possible Outcomes:</h4>
                <div class="space-y-3">
                    <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-emerald-400 font-bold">📈 AMD stays above $150</span>
                            <span class="text-emerald-400 font-bold">+$450 profit (3% in 60 days)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Put expires worthless. You keep the $450 premium. Annualized: ~18% return.</p>
                    </div>
                    <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-cyan-400 font-bold">🎯 AMD drops to $145</span>
                            <span class="text-cyan-400 font-bold">Assigned: Buy at effective $145.50</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">You buy 100 shares at $150, but you collected $450, so net cost = $145.50/share. Better than buying at $160!</p>
                    </div>
                    <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-red-400 font-bold">💥 AMD crashes to $100</span>
                            <span class="text-red-400 font-bold">You own shares at $145.50</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">You still buy at $150 - $4.50 = $145.50. Paper loss, but you wanted to own AMD anyway.</p>
                    </div>
                </div>
            </div>

            <div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-red-400 mb-4">⚠️ Critical Rule: Only Sell CSPs on Stocks You WANT to Own</h3>
                <p class="text-slate-300">Never sell puts just for premium on stocks you wouldn't want to hold. If assigned, you'll own 100 shares. Make sure that's a win, not a punishment.</p>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: How to sell puts for income while waiting to buy stocks cheaper</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-covered-call',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Selling Covered Call',
        outlook: 'Neutral/Bullish',
        objective: '15 min',
        risk: 'Capped Upside',
        legs: [{ type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }],
        hideSimulator: false,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Selling Covered Call (15 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">Generate income from stocks you already own. The income strategy for long-term shareholders.</p>
            </div>

            <div class="grid md:grid-cols-4 gap-4 text-center">
                <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                    <div class="text-emerald-400 font-bold text-lg">Direction</div>
                    <div class="text-white text-2xl">📊 NEUTRAL+</div>
                </div>
                <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                    <div class="text-cyan-400 font-bold text-lg">Max Profit</div>
                    <div class="text-white text-2xl">Premium + Upside to Strike</div>
                </div>
                <div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div class="text-red-400 font-bold text-lg">Max Loss</div>
                    <div class="text-white text-2xl">Stock Drop - Premium</div>
                </div>
                <div class="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div class="text-purple-400 font-bold text-lg">Breakeven</div>
                    <div class="text-white text-2xl">Cost Basis - Premium</div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-4">💡 The Concept: Getting Paid for Capping Upside</h3>
                <p class="text-slate-300 mb-4">You own 100 shares of NVDA at $900. You're happy with the stock, but don't expect a huge move in the next month. Instead of just holding, you can:</p>
                <div class="bg-slate-900/60 rounded-xl p-4">
                    <p class="text-white"><b>Sell a $920 Call</b> and collect <b>$8.00 ($800)</b> immediately.</p>
                    <ul class="mt-3 space-y-2 text-slate-300 text-sm">
                        <li>• If NVDA stays below $920: You keep the $800 and still own the shares. Rinse & repeat next month.</li>
                        <li>• If NVDA rises above $920: You sell your shares at $920 (a 2.2% gain) PLUS keep the $800 premium.</li>
                    </ul>
                </div>
                <p class="text-amber-400 text-sm mt-4"><b>Either way, you profit.</b> You either collect income or sell your shares at a higher price.</p>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">📖 Real Example: TSLA Covered Call</h3>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                        <div><span class="text-slate-400">Stock:</span> <span class="text-white font-bold">TSLA at $250 (you own 100 shares)</span></div>
                        <div><span class="text-slate-400">Your View:</span> <span class="text-emerald-400 font-bold">Sideways to slightly bullish</span></div>
                        <div><span class="text-slate-400">Strike:</span> <span class="text-white font-bold">Sell $260 Call</span></div>
                        <div><span class="text-slate-400">Expiration:</span> <span class="text-white font-bold">45 days</span></div>
                        <div><span class="text-slate-400">Premium Received:</span> <span class="text-emerald-400 font-bold">+$5.00 (+$500)</span></div>
                        <div><span class="text-slate-400">Your Cost Basis:</span> <span class="text-white font-bold">$240/share</span></div>
                    </div>
                </div>

                <h4 class="text-white font-bold mb-3">Three Possible Outcomes:</h4>
                <div class="space-y-3">
                    <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-emerald-400 font-bold">📊 TSLA stays at $250-$255</span>
                            <span class="text-emerald-400 font-bold">+$500 profit (2% on shares in 45 days)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Call expires worthless. You keep the $500 premium and still own shares. Annualized: ~16% return on your stock position.</p>
                    </div>
                    <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-cyan-400 font-bold">📈 TSLA rises to $270</span>
                            <span class="text-cyan-400 font-bold">+$2,500 total profit (shares called away)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">You sell shares at $260 ($2,000 gain from $240 basis) + $500 premium = $2,500 total. You miss gains above $260, but you still made 10.4% in 45 days.</p>
                    </div>
                    <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <span class="text-red-400 font-bold">📉 TSLA drops to $230</span>
                            <span class="text-red-400 font-bold">-$1,500 loss on shares (offset by $500 premium)</span>
                        </div>
                        <p class="text-slate-400 text-sm mt-1">Your shares lost $2,000 in value, but the $500 premium cushions the fall. Net loss: -$1,500 vs. -$2,000 if you just held.</p>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4">✅ Covered Call Checklist</h3>
                <div class="space-y-2">
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I own 100 shares of this stock (or multiples of 100)</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I'm okay selling my shares at the strike price (it's above my cost basis)</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I'm not expecting a massive rally in the next 30-60 days</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I'm selling 30-60 days out with 0.30-0.40 delta (OTM strikes)</span>
                    </label>
                    <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white transition-colors">
                        <input type="checkbox" class="w-5 h-5 rounded border-amber-500/50 bg-transparent text-amber-500 focus:ring-amber-500">
                        <span>I understand I'm giving up unlimited upside for consistent income</span>
                    </label>
                </div>
            </div>

            <div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-red-400 mb-4">⚠️ Critical Rule: Don't Sell Covered Calls Before Major Catalysts</h3>
                <p class="text-slate-300">Avoid selling covered calls right before earnings, product launches, or major announcements. You want to collect premium during quiet periods, not cap your gains when the stock might explode higher.</p>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: How to sell covered calls for income on stocks you own</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-risk-calc',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Risk Calculator',
        outlook: 'Tool',
        objective: '10 min',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Position Sizing & Risk (10 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">The #1 rule of trading: Never risk more than you can afford to lose on a single trade.</p>
            </div>

            <div class="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-red-400 mb-4">🎯 The 1-2% Rule</h3>
                <p class="text-slate-300 mb-4">Professional traders never risk more than <b>1-2% of their account</b> on any single trade. This means:</p>
                <div class="grid md:grid-cols-3 gap-4 text-center">
                    <div class="bg-black/40 rounded-xl p-4">
                        <div class="text-slate-400 text-sm">$10,000 Account</div>
                        <div class="text-2xl font-bold text-white">$100 - $200</div>
                        <div class="text-amber-400 text-xs">Max risk per trade</div>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <div class="text-slate-400 text-sm">$25,000 Account</div>
                        <div class="text-2xl font-bold text-white">$250 - $500</div>
                        <div class="text-amber-400 text-xs">Max risk per trade</div>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <div class="text-slate-400 text-sm">$50,000 Account</div>
                        <div class="text-2xl font-bold text-white">$500 - $1,000</div>
                        <div class="text-amber-400 text-xs">Max risk per trade</div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-4">🧮 Quick Position Size Calculator</h3>
                <div class="bg-slate-900/60 rounded-xl p-4 mb-4">
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-slate-400">Your Account Size:</span>
                            <span class="text-white font-bold">$25,000</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-slate-400">Risk Percentage:</span>
                            <span class="text-amber-400 font-bold">2%</span>
                        </div>
                        <div class="flex justify-between items-center border-t border-slate-700 pt-3">
                            <span class="text-slate-400">Max Risk Per Trade:</span>
                            <span class="text-emerald-400 font-bold text-xl">$500</span>
                        </div>
                    </div>
                </div>
                <p class="text-slate-300 text-sm">If an option costs $3.00 ($300 per contract), you can buy <b>1 contract</b> and stay within risk limits. If it costs $5.00 ($500), that's your max.</p>
            </div>

            <div class="bg-indigo-950/30 border-2 border-indigo-500/40 rounded-2xl p-8 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
                <div class="relative z-10">
                    <h3 class="text-2xl font-bold text-indigo-400 mb-3">Want precise control?</h3>
                    <p class="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                        Use the full <b>Position Sizing Calculator</b> in Tier 9 to dial in exact share counts based on your stop loss and account size.
                    </p>
                    <a href="#position-sizing" class="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                        <span>Launch Position Sizing Tool</span>
                    </a>
                    <p class="text-slate-500 text-sm mt-4">
                        Strategy Tools → Tier 9 → Position Sizing
                    </p>
                </div>
            </div>

            <div class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-4">✅ Pre-Trade Risk Checklist</h3>
                <div class="space-y-3">
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">1</div>
                        <div class="text-slate-300"><b>Calculate max loss:</b> For long options = premium paid</div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">2</div>
                        <div class="text-slate-300"><b>Check against 1-2% rule:</b> Is max loss ≤ 2% of account?</div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">3</div>
                        <div class="text-slate-300"><b>Set a stop loss:</b> Decide when you'll exit if wrong (e.g., 50% loss)</div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">4</div>
                        <div class="text-slate-300"><b>Set a profit target:</b> Where will you take profits? (e.g., 50-100% gain)</div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border-2 border-emerald-500/40 rounded-2xl p-8 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 pointer-events-none"></div>
                <div class="relative z-10">
                    <h3 class="text-2xl font-bold text-emerald-400 mb-3">Ready for Advanced Risk Analysis?</h3>
                    <p class="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                        Use the full <b>Risk/Reward Calculator</b> in Strategy Tools to analyze your trades with live market data, Black-Scholes pricing, and professional-grade metrics.
                    </p>
                    <a href="#risk-reward" class="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105">
                        <span>Launch Risk/Reward Calculator</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                        </svg>
                    </a>
                    <p class="text-slate-500 text-sm mt-4">
                        Features: Live IV, 1SD projections, Tier 1 logic checks, and Tier 2 scorecard
                    </p>
                </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ You now understand: How to size positions and manage risk like a pro</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-paper-trading',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Paper Trading Practice',
        outlook: 'Tool',
        objective: '20 min',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Paper Trading Practice (20 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">Practice placing trades with fake money before risking real capital.</p>
            </div>

            <div class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-4">📝 Your Practice Assignment</h3>
                <p class="text-slate-300 mb-4">Using your broker's paper trading mode (or a demo account), execute these 4 trades:</p>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">1</div>
                            <h4 class="text-emerald-400 font-bold">Buy a Long Call</h4>
                        </div>
                        <ul class="text-slate-300 text-sm space-y-1 ml-11">
                            <li>• Pick a stock you're bullish on (AAPL, NVDA, MSFT, etc.)</li>
                            <li>• Select 60-120 days expiration</li>
                            <li>• Choose ATM or slightly OTM strike</li>
                            <li>• Buy 1 contract using a LIMIT order at mid-price</li>
                        </ul>
                    </div>

                    <div class="bg-black/40 rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">2</div>
                            <h4 class="text-red-400 font-bold">Buy a Long Put</h4>
                        </div>
                        <ul class="text-slate-300 text-sm space-y-1 ml-11">
                            <li>• Pick a stock you think might drop (or want protection on)</li>
                            <li>• Select 60-120 days expiration</li>
                            <li>• Choose ATM or slightly OTM strike</li>
                            <li>• Buy 1 contract using a LIMIT order</li>
                        </ul>
                    </div>

                    <div class="bg-black/40 rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">3</div>
                            <h4 class="text-cyan-400 font-bold">Sell a Cash-Secured Put</h4>
                        </div>
                        <ul class="text-slate-300 text-sm space-y-1 ml-11">
                            <li>• Pick a stock you'd want to own at a lower price</li>
                            <li>• Select 60-120 days expiration</li>
                            <li>• Choose a strike 5-10% below current price</li>
                            <li>• Sell 1 contract (make sure you have cash secured)</li>
                        </ul>
                    </div>

                    <div class="bg-black/40 rounded-xl p-4">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">4</div>
                            <h4 class="text-amber-400 font-bold">Sell a Covered Call</h4>
                        </div>
                        <ul class="text-slate-300 text-sm space-y-1 ml-11">
                            <li>• Pick a stock you already own (or buy 100 shares in paper account)</li>
                            <li>• Select 30-60 days expiration</li>
                            <li>• Choose a strike 5-10% above current price</li>
                            <li>• Sell 1 contract (requires owning 100 shares)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border-2 border-emerald-500/40 rounded-2xl p-8 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>

                <div class="relative z-10">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 mb-4">
                        <span class="text-3xl">🎯</span>
                    </div>

                    <h3 class="text-2xl font-bold text-emerald-400 mb-3">Ready to Start Paper Trading?</h3>

                    <p class="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                        Use our full <b>Paper Trading Simulator</b> to track your practice trades, calculate P&amp;L in real-time, and build your trading journal.
                    </p>

                    <a href="#paper-trading" class="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105">
                        <span>Launch Paper Trading Tool</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                        </svg>
                    </a>

                    <p class="text-slate-500 text-sm mt-4">
                        Strategy Tools → Tier 9 → Paper Trading
                    </p>
                </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                <p class="text-amber-300 font-bold">✓ Complete all 4 paper trades before moving to your real first trade</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },,
    {
        id: 'express-preflight',
        tier: 0.5,
        tierName: 'Express Lane',
        name: 'Pre-Flight Checklist',
        outlook: 'Educational',
        objective: '5 min',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <style>
            .neon-checkbox {
                appearance: none;
                -webkit-appearance: none;
                width: 2.5rem;
                height: 2.5rem;
                background-color: black;
                border: 2px solid #39ff14;
                border-radius: 0.25rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                flex-shrink: 0;
            }
            .neon-checkbox:checked {
                background-color: black;
                box-shadow: 0 0 15px rgba(57, 255, 20, 0.5);
                position: relative;
            }
            .neon-checkbox:checked::after {
                content: '';
                width: 1.5rem;
                height: 1.5rem;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2339ff14' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                filter: drop-shadow(0 0 5px #39ff14);
            }
            .neon-checkbox:hover {
                box-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
            }
        </style>

        <div class="space-y-8">

            <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <span class="text-amber-400 text-xs font-mono uppercase tracking-widest">Express Lane</span>
                        <h2 class="text-xl font-bold text-white">Pre-Flight Checklist (5 min)</h2>
                    </div>
                </div>
                <p class="text-slate-300">Before placing your first REAL trade, run through this checklist.</p>
            </div>



            <div class="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-6">✈️ Your First Trade Checklist</h3>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-cyan-400 font-bold mb-3">📋 Before You Trade</h4>
                        <div class="space-y-2">
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-cyan-400 transition-colors">I understand the difference between calls and puts</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-cyan-400 transition-colors">I understand the difference between buying and selling both calls and puts</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-cyan-400 transition-colors">I understand implied volatility</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-cyan-400 transition-colors">I know what Delta, Theta, and Vega mean</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-cyan-400 transition-colors">I can read an options chain and place an order</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-cyan-400 transition-colors">I've paper traded at least 3 times</span>
                            </label>
                        </div>
                    </div>

                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-400 font-bold mb-3">💰 Risk Management</h4>
                        <div class="space-y-2">
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-amber-400 transition-colors">My position size is ≤ 2% of my account</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-amber-400 transition-colors">I know my max loss BEFORE entering</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-amber-400 transition-colors">I have a profit target (e.g., 50% gain)</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-amber-400 transition-colors">I have a stop loss plan (e.g., exit at 50% loss)</span>
                            </label>
                        </div>
                    </div>

                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-purple-400 font-bold mb-3">🎯 Trade Setup</h4>
                        <div class="space-y-2">
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-purple-400 transition-colors">I have a clear thesis (bullish/bearish/neutral)</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-purple-400 transition-colors">I've chosen 60-120 days expiration</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-purple-400 transition-colors">I'm using a LIMIT order (not market order)</span>
                            </label>
                            <label class="flex items-center gap-3 text-slate-300 cursor-pointer hover:text-white group">
                                <input type="checkbox" class="neon-checkbox">
                                <span class="group-hover:text-purple-400 transition-colors">I'm mentally prepared to lose this money</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-red-400 mb-4">⚠️ Common First-Trade Mistakes to Avoid</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <p class="text-red-400 font-bold mb-1">❌ Trading too close to expiration</p>
                        <p class="text-slate-400 text-sm">Theta decay accelerates. Stick to 60-120 days.</p>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <p class="text-red-400 font-bold mb-1">❌ Buying too far OTM</p>
                        <p class="text-slate-400 text-sm">Low probability of profit. Start ATM or near-ATM.</p>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <p class="text-red-400 font-bold mb-1">❌ Using market orders</p>
                        <p class="text-slate-400 text-sm">You'll get bad fills. Always use LIMIT orders.</p>
                    </div>
                    <div class="bg-black/40 rounded-xl p-4">
                        <p class="text-red-400 font-bold mb-1">❌ Risking too much</p>
                        <p class="text-slate-400 text-sm">One bad trade shouldn't hurt your account. 1-2% max.</p>
                    </div>
                </div>
            </div>

            <div class="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-6 text-center">
                <h3 class="text-2xl font-bold text-emerald-400 mb-2">🎉 You're Ready!</h3>
                <p class="text-slate-300">If you've checked all boxes, you're prepared to place your first real options trade. Start small, stay disciplined, and welcome to the jungle.</p>
            </div>
        </div>
        `,
        analogy: '',
        nuance: '',
        example: ''
    },
];
