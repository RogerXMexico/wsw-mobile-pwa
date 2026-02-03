import { Strategy } from '../../types';

// Anchor Extensions - Tier 3.5
export const TIER_3_5_STRATEGIES: Strategy[] = [
    {
        id: 'strike-expiration',
        name: 'Strike & Expiration Selection',
        tier: 3.5,
        tierName: 'Proper Mindset',
        outlook: 'Educational',
        objective: 'Trade Planning',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <!-- Header Section -->
        <div class="border border-purple-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-purple-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-purple-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <svg class="w-14 h-14 text-purple-400" style="filter: drop-shadow(0 0 12px rgba(168,85,247,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-purple-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        The Art of Selection
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"Choosing the wrong strike is like bringing a knife to a gunfight—you had the right idea, wrong weapon."</p>
                </div>
            </div>
        </div>

        <div class="space-y-12">
            <!-- Why This Matters -->
            <div class="bg-gradient-to-br from-rose-500/10 to-slate-900 border border-rose-500/20 p-8 rounded-[2rem] relative overflow-hidden">
                <div class="absolute top-4 right-4 text-6xl opacity-10">⚠️</div>
                <h3 class="text-2xl font-black text-rose-400 mb-4 uppercase">The Most Expensive Mistake</h3>
                <p class="text-slate-300 text-lg leading-relaxed mb-6">
                    New traders obsess over <i>which</i> stock to trade and <i>which direction</i> it will go. They spend 5 seconds picking a strike and expiration.
                    <span class="text-white font-bold">This is backwards.</span> Strike and expiration selection is where most trades are won or lost—before the market even opens.
                </p>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-black/30 border border-rose-500/20 rounded-xl p-4">
                        <div class="text-rose-400 font-bold mb-2">❌ The Rookie</div>
                        <p class="text-slate-400 text-sm">"AAPL is going up! Let me buy the cheapest call I can find... $200 strike expiring Friday for $0.15!"</p>
                        <p class="text-rose-300 text-xs mt-2 italic">Needs AAPL to move 12% in 4 days. Probability: ~2%</p>
                    </div>
                    <div class="bg-black/30 border border-emerald-500/20 rounded-xl p-4">
                        <div class="text-emerald-400 font-bold mb-2">✓ The Professional</div>
                        <p class="text-slate-400 text-sm">"AAPL is going up. Given IV and my timeframe, I want the $175 strike 45 DTE at 0.40 delta."</p>
                        <p class="text-emerald-300 text-xs mt-2 italic">Reasonable move needed. Probability: ~40%</p>
                    </div>
                </div>
            </div>

            <!-- Section 1: Strike Selection -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83"/><circle cx="12" cy="12" r="4"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-cyan-400 uppercase">Part 1: Strike Selection</h3>
                </div>

                <!-- Delta-Based Selection -->
                <div class="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span class="text-cyan-400">Δ</span> The Delta Method (Primary Approach)
                    </h4>
                    <p class="text-slate-300 mb-6">Delta isn't just about price movement—it's roughly your <b class="text-white">probability of being in-the-money at expiration</b>. Use it as your strike selection compass.</p>

                    <div class="grid md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 hover:border-emerald-400/50 transition-all cursor-pointer">
                            <div class="text-3xl font-black text-emerald-400 mb-2">0.70-0.80</div>
                            <div class="text-xs text-emerald-300 uppercase tracking-widest mb-3">Deep ITM</div>
                            <p class="text-slate-400 text-sm">High probability, low leverage. Acts like stock. Use for stock replacement or when you want to minimize time decay impact.</p>
                            <div class="mt-3 text-xs text-slate-500">Win rate: ~70-80%</div>
                        </div>
                        <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 hover:border-amber-400/50 transition-all cursor-pointer">
                            <div class="text-3xl font-black text-amber-400 mb-2">0.40-0.60</div>
                            <div class="text-xs text-amber-300 uppercase tracking-widest mb-3">ATM / Near ATM</div>
                            <p class="text-slate-400 text-sm">Balanced risk/reward. Most gamma (acceleration). Best for directional plays with conviction. The "sweet spot" for most traders.</p>
                            <div class="mt-3 text-xs text-slate-500">Win rate: ~40-60%</div>
                        </div>
                        <div class="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5 hover:border-rose-400/50 transition-all cursor-pointer">
                            <div class="text-3xl font-black text-rose-400 mb-2">0.15-0.30</div>
                            <div class="text-xs text-rose-300 uppercase tracking-widest mb-3">OTM</div>
                            <p class="text-slate-400 text-sm">Low cost, low probability, high leverage. Lottery tickets. Only use with small position sizes or as part of spreads.</p>
                            <div class="mt-3 text-xs text-slate-500">Win rate: ~15-30%</div>
                        </div>
                    </div>

                    <div class="bg-black/30 border border-white/5 rounded-xl p-4">
                        <div class="text-sm text-slate-300">
                            <span class="text-cyan-400 font-bold">Pro Tip:</span> For directional trades, start with 0.40-0.50 delta. You get meaningful exposure without paying excessive premium. Adjust based on conviction level.
                        </div>
                    </div>
                </div>

                <!-- Strike Width Considerations -->
                <div class="bg-slate-800/50 border border-purple-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">Strike Selection by Strategy Type</h4>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b border-slate-700">
                                    <th class="text-left py-3 px-4 text-slate-400 font-mono uppercase text-xs">Strategy</th>
                                    <th class="text-left py-3 px-4 text-slate-400 font-mono uppercase text-xs">Recommended Delta</th>
                                    <th class="text-left py-3 px-4 text-slate-400 font-mono uppercase text-xs">Why</th>
                                </tr>
                            </thead>
                            <tbody class="text-slate-300">
                                <tr class="border-b border-slate-800">
                                    <td class="py-3 px-4 text-emerald-400">Long Call/Put (Speculative)</td>
                                    <td class="py-3 px-4">0.40-0.50</td>
                                    <td class="py-3 px-4 text-slate-400">Balance of probability and leverage</td>
                                </tr>
                                <tr class="border-b border-slate-800">
                                    <td class="py-3 px-4 text-emerald-400">Long Call/Put (Conservative)</td>
                                    <td class="py-3 px-4">0.60-0.70</td>
                                    <td class="py-3 px-4 text-slate-400">Higher probability, less time decay pain</td>
                                </tr>
                                <tr class="border-b border-slate-800">
                                    <td class="py-3 px-4 text-amber-400">Covered Call (Income)</td>
                                    <td class="py-3 px-4">0.20-0.30</td>
                                    <td class="py-3 px-4 text-slate-400">Keep premium, low assignment risk</td>
                                </tr>
                                <tr class="border-b border-slate-800">
                                    <td class="py-3 px-4 text-amber-400">Cash-Secured Put (Acquisition)</td>
                                    <td class="py-3 px-4">0.30-0.40</td>
                                    <td class="py-3 px-4 text-slate-400">Get paid to wait for your price</td>
                                </tr>
                                <tr class="border-b border-slate-800">
                                    <td class="py-3 px-4 text-purple-400">Credit Spreads</td>
                                    <td class="py-3 px-4">0.20-0.30 (short leg)</td>
                                    <td class="py-3 px-4 text-slate-400">Outside expected move = edge</td>
                                </tr>
                                <tr>
                                    <td class="py-3 px-4 text-rose-400">Protective Put</td>
                                    <td class="py-3 px-4">0.30-0.40</td>
                                    <td class="py-3 px-4 text-slate-400">Meaningful protection without overpaying</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Section 2: Expiration Selection -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-amber-400 uppercase">Part 2: Expiration Selection</h3>
                </div>

                <!-- The DTE Framework -->
                <div class="bg-slate-800/50 border border-amber-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">The DTE (Days to Expiration) Framework</h4>
                    <p class="text-slate-300 mb-6">Theta decay is <b class="text-white">not linear</b>. It accelerates dramatically in the final 21 days. Your DTE choice determines how much you're paying the "time tax."</p>

                    <div class="relative mb-8">
                        <!-- Theta Decay Visualization -->
                        <div class="h-32 bg-black/30 rounded-xl relative overflow-hidden">
                            <svg viewBox="0 0 400 100" class="w-full h-full" preserveAspectRatio="none">
                                <!-- Theta decay curve -->
                                <path d="M 0 10 Q 100 12, 200 20 Q 280 35, 320 60 Q 360 80, 400 95"
                                      fill="none" stroke="url(#thetaGradient)" stroke-width="3"/>
                                <!-- Danger zone background -->
                                <rect x="320" y="0" width="80" height="100" fill="rgba(244,63,94,0.1)"/>
                                <!-- Sweet spot background -->
                                <rect x="120" y="0" width="120" height="100" fill="rgba(16,185,129,0.05)"/>
                                <defs>
                                    <linearGradient id="thetaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:#10b981"/>
                                        <stop offset="60%" style="stop-color:#f59e0b"/>
                                        <stop offset="100%" style="stop-color:#ef4444"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div class="absolute bottom-2 left-4 text-xs text-slate-500">90 DTE</div>
                            <div class="absolute bottom-2 left-1/4 text-xs text-emerald-400 font-bold">Sweet Spot</div>
                            <div class="absolute bottom-2 right-4 text-xs text-rose-400 font-bold">Danger Zone</div>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-4 gap-4">
                        <div class="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center">
                            <div class="text-2xl font-black text-rose-400">0-14</div>
                            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">DTE</div>
                            <div class="text-xs text-rose-300 mt-2">Theta burn zone. Only for experienced traders or defined-risk sellers.</div>
                        </div>
                        <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                            <div class="text-2xl font-black text-amber-400">14-30</div>
                            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">DTE</div>
                            <div class="text-xs text-amber-300 mt-2">Accelerating decay. Good for premium sellers with quick thesis.</div>
                        </div>
                        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                            <div class="text-2xl font-black text-emerald-400">30-60</div>
                            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">DTE</div>
                            <div class="text-xs text-emerald-300 mt-2">The sweet spot. Enough time for thesis to play out, manageable decay.</div>
                        </div>
                        <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                            <div class="text-2xl font-black text-cyan-400">60-120+</div>
                            <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">DTE</div>
                            <div class="text-xs text-cyan-300 mt-2">Slow decay, higher premium. LEAPS territory. For long-term thesis.</div>
                        </div>
                    </div>
                </div>

                <!-- DTE by Strategy -->
                <div class="bg-slate-800/50 border border-purple-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">DTE Selection by Strategy</h4>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-20 text-center">
                                <div class="text-2xl font-black text-emerald-400">30-45</div>
                                <div class="text-xs text-slate-500">DTE</div>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-bold">Credit Spreads / Iron Condors</div>
                                <p class="text-slate-400 text-sm">Sweet spot for premium sellers. Enough time for adjustments, captures most theta decay.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-20 text-center">
                                <div class="text-2xl font-black text-amber-400">45-60</div>
                                <div class="text-xs text-slate-500">DTE</div>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-bold">Directional Long Options</div>
                                <p class="text-slate-400 text-sm">Give your thesis time to play out without excessive theta bleed. Close at 21 DTE if not working.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-20 text-center">
                                <div class="text-2xl font-black text-cyan-400">60-90</div>
                                <div class="text-xs text-slate-500">DTE</div>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-bold">Calendar Spreads / Diagonals</div>
                                <p class="text-slate-400 text-sm">Need the time differential to work. Back month should have 60+ DTE for stability.</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-20 text-center">
                                <div class="text-2xl font-black text-purple-400">180+</div>
                                <div class="text-xs text-slate-500">DTE</div>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-bold">LEAPS / Stock Replacement</div>
                                <p class="text-slate-400 text-sm">Long-term thesis. Buy deep ITM for stock-like exposure with less capital.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3: Putting It Together -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-emerald-400 uppercase">Part 3: The Selection Checklist</h3>
                </div>

                <div class="bg-gradient-to-br from-emerald-500/10 to-slate-900 border border-emerald-500/20 p-8 rounded-[2rem]">
                    <h4 class="text-xl font-bold text-white mb-6">Before Every Trade, Ask:</h4>
                    <div class="space-y-4">
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">1</div>
                            <div>
                                <div class="text-white font-bold">What's my thesis and timeframe?</div>
                                <p class="text-slate-400 text-sm mt-1">Is this a quick earnings play (7-14 DTE)? A technical breakout (30-45 DTE)? A long-term investment thesis (90+ DTE)?</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">2</div>
                            <div>
                                <div class="text-white font-bold">What's the expected move?</div>
                                <p class="text-slate-400 text-sm mt-1">Use the Expected Move calculator. If selling premium, place strikes OUTSIDE the expected move. If buying, understand what move you need to profit.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">3</div>
                            <div>
                                <div class="text-white font-bold">What delta gives me the right risk/reward?</div>
                                <p class="text-slate-400 text-sm mt-1">Higher delta = higher probability, lower leverage. Lower delta = lower probability, higher leverage. Match to your conviction and risk tolerance.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">4</div>
                            <div>
                                <div class="text-white font-bold">Am I giving myself enough time?</div>
                                <p class="text-slate-400 text-sm mt-1">Add 50% more time than you think you need. If your thesis is "2 weeks," buy 30-45 DTE. Markets move slower than we expect.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">5</div>
                            <div>
                                <div class="text-white font-bold">What's my exit plan?</div>
                                <p class="text-slate-400 text-sm mt-1">Define BEFORE entry: Take profit at what %? Cut losses at what level? Close at 21 DTE regardless? Write it down.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Common Mistakes -->
            <div class="bg-gradient-to-br from-rose-500/10 to-slate-900 border border-rose-500/20 p-8 rounded-[2rem]">
                <h4 class="text-xl font-bold text-rose-400 mb-6 flex items-center gap-2">
                    <span class="text-2xl">💀</span> The Five Deadly Sins of Strike/Expiration Selection
                </h4>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="p-4 bg-black/20 rounded-xl">
                        <div class="text-rose-400 font-bold mb-2">1. Buying Cheap OTM Weeklies</div>
                        <p class="text-slate-400 text-sm">"It's only $20!" — Famous last words. These have <5% probability of profit. You're donating to market makers.</p>
                    </div>
                    <div class="p-4 bg-black/20 rounded-xl">
                        <div class="text-rose-400 font-bold mb-2">2. Ignoring the Expected Move</div>
                        <p class="text-slate-400 text-sm">Selling a put at $95 when the expected move says the stock could easily hit $90? That's not income—it's gambling.</p>
                    </div>
                    <div class="p-4 bg-black/20 rounded-xl">
                        <div class="text-rose-400 font-bold mb-2">3. Not Enough Time</div>
                        <p class="text-slate-400 text-sm">Your thesis needs 2 weeks but you bought 10 DTE to "save money." Now theta is eating you alive while you wait.</p>
                    </div>
                    <div class="p-4 bg-black/20 rounded-xl">
                        <div class="text-rose-400 font-bold mb-2">4. Fighting the Probability</div>
                        <p class="text-slate-400 text-sm">Buying 0.10 delta calls because "it could happen." Sure, but it probably won't. Play the probabilities, not the possibilities.</p>
                    </div>
                    <div class="p-4 bg-black/20 rounded-xl md:col-span-2">
                        <div class="text-rose-400 font-bold mb-2">5. Same Strike/DTE for Every Trade</div>
                        <p class="text-slate-400 text-sm">Different market conditions and strategies require different selections. A high-IV environment calls for different strikes than low-IV. Adapt or die.</p>
                    </div>
                </div>
            </div>

            <!-- Quick Reference -->
            <div class="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
                <h4 class="text-lg font-bold text-white mb-4">Quick Reference Card</h4>
                <div class="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <div class="text-cyan-400 font-bold mb-2 uppercase tracking-wider text-xs">Buying Options</div>
                        <ul class="space-y-1 text-slate-300">
                            <li>• Delta: 0.40-0.60 (balanced), 0.70+ (conservative)</li>
                            <li>• DTE: 45-60 days minimum</li>
                            <li>• Exit: 21 DTE or 50% profit, whichever first</li>
                            <li>• Check: Breakeven vs expected move</li>
                        </ul>
                    </div>
                    <div>
                        <div class="text-amber-400 font-bold mb-2 uppercase tracking-wider text-xs">Selling Options</div>
                        <ul class="space-y-1 text-slate-300">
                            <li>• Delta: 0.20-0.30 (outside expected move)</li>
                            <li>• DTE: 30-45 days</li>
                            <li>• Exit: 50% profit or 21 DTE</li>
                            <li>• Check: Strike is beyond 1σ expected move</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `,
        analogy: "Strike and expiration are like choosing the right tool for a job. A hammer is great for nails, useless for screws. The wrong strike/DTE combo means even a correct market prediction won't save you.",
        nuance: "<b>The Time Tax:</b> Every extra week of DTE costs premium, but every week too few accelerates your theta decay. Find the balance where time is on your side, not eating you alive.",
        example: "<b>Scenario:</b> You're bullish on MSFT at $400 for a potential earnings beat in 3 weeks.<br><br><b>Wrong:</b> Buy $420 call expiring in 2 weeks (0.15 delta). Need 5% move in 2 weeks just to break even.<br><br><b>Right:</b> Buy $405 call expiring in 45 days (0.45 delta). Gives thesis time to play out, reasonable move needed, can exit at 21 DTE if wrong."
    },,
    {
        id: 'exit-strategies',
        name: 'Exit Strategies',
        tier: 3.5,
        tierName: 'Proper Mindset',
        outlook: 'Educational',
        objective: 'Trade Management',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <!-- Header Section -->
        <div class="border border-rose-500/30 bg-slate-900/60 p-6 md:p-10 rounded-[2rem] relative overflow-hidden mb-12 shadow-2xl shadow-rose-900/10">
            <div class="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent pointer-events-none"></div>
            <div class="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div class="shrink-0 relative group">
                    <div class="w-28 h-28 rounded-full border-4 border-rose-500 flex items-center justify-center bg-slate-800 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                        <svg class="w-14 h-14 text-rose-400" style="filter: drop-shadow(0 0 12px rgba(244,63,94,0.5))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <div class="flex items-center justify-center md:justify-start gap-3 mb-4 text-rose-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                        The Art of the Exit
                    </div>
                    <p class="text-2xl md:text-4xl font-serif italic text-white leading-tight gold-sweep-simple">"Amateurs focus on entries. Professionals obsess over exits."</p>
                </div>
            </div>
        </div>

        <!-- Philosopher Quote -->
        <div class="text-center mb-10 py-6 border-y border-slate-800">
            <p class="text-xl md:text-2xl font-serif italic text-slate-300 mb-3 gold-sweep-simple">"The general who advances without coveting fame and retreats without fearing disgrace, whose only thought is to protect his country, is the jewel of the kingdom."</p>
            <p class="text-slate-500 text-sm">— Sun Tzu, <span class="italic">The Art of War</span></p>
        </div>

        <div class="space-y-12">
            <!-- The Core Problem -->
            <div class="bg-gradient-to-br from-amber-500/10 to-slate-900 border border-amber-500/20 p-8 rounded-[2rem] relative overflow-hidden">
                <div class="absolute top-4 right-4 text-6xl opacity-10">🎯</div>
                <h3 class="text-2xl font-black text-amber-400 mb-4 uppercase">The Exit Paradox</h3>
                <p class="text-slate-300 text-lg leading-relaxed mb-6">
                    You spent hours analyzing the trade. You picked the perfect strike, the right expiration, waited for your entry. Then what?
                    <span class="text-white font-bold">Most traders have no exit plan.</span> They watch winners turn to losers and let losers become disasters.
                </p>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-black/30 border border-rose-500/20 rounded-xl p-4">
                        <div class="text-rose-400 font-bold mb-2">❌ The Gambler</div>
                        <p class="text-slate-400 text-sm">"I'll just see what happens..." Watches 80% profit evaporate. Holds losers hoping for a miracle. No rules, pure emotion.</p>
                    </div>
                    <div class="bg-black/30 border border-emerald-500/20 rounded-xl p-4">
                        <div class="text-emerald-400 font-bold mb-2">✓ The Professional</div>
                        <p class="text-slate-400 text-sm">"Profit target: 50%. Stop loss: 200%. Time stop: 21 DTE." Rules written BEFORE entry. Emotions removed from the equation.</p>
                    </div>
                </div>
            </div>

            <!-- Section 1: Profit Taking -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-emerald-400 uppercase">Part 1: Taking Profits</h3>
                </div>

                <div class="bg-slate-800/50 border border-emerald-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">The 50% Rule (For Premium Sellers)</h4>
                    <p class="text-slate-300 mb-6">When you <b>sell</b> options (credit spreads, iron condors, cash-secured puts), close at <span class="text-emerald-400 font-bold">50% of max profit</span>. This is backed by extensive research and is the industry standard.</p>

                    <div class="bg-black/30 border border-emerald-500/30 rounded-xl p-5 mb-6">
                        <div class="text-emerald-400 font-mono text-sm mb-3">Example: Bull Put Spread</div>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div class="text-slate-500">Premium collected:</div>
                                <div class="text-white font-bold">$1.00 ($100)</div>
                            </div>
                            <div>
                                <div class="text-slate-500">50% profit target:</div>
                                <div class="text-emerald-400 font-bold">$0.50 ($50 profit)</div>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-slate-700">
                            <p class="text-slate-400 text-sm">When the spread can be bought back for $0.50, close it. You've captured half the premium with far less risk.</p>
                        </div>
                    </div>

                    <div class="bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 p-4 rounded-r-xl">
                        <p class="text-slate-300 text-sm"><span class="text-emerald-400 font-bold">Why 50%?</span> The last 50% of profit takes the longest and carries the most gamma risk. You're fighting theta decay that's already happened. Taking 50% in half the time means you can redeploy capital into new trades.</p>
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">Profit Targets for Option Buyers</h4>
                    <p class="text-slate-300 mb-6">When you <b>buy</b> options (long calls, long puts, debit spreads), you need different rules because you're fighting time decay.</p>

                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                            <div class="text-3xl font-black text-cyan-400 mb-2">50-100%</div>
                            <div class="text-xs text-cyan-300 uppercase tracking-widest mb-2">Conservative</div>
                            <p class="text-slate-400 text-sm">Take profits when you've doubled your money or hit 50% gain. Don't get greedy.</p>
                        </div>
                        <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                            <div class="text-3xl font-black text-amber-400 mb-2">Scale Out</div>
                            <div class="text-xs text-amber-300 uppercase tracking-widest mb-2">Balanced</div>
                            <p class="text-slate-400 text-sm">Sell half at 50% profit, let the rest run with a trailing stop. Best of both worlds.</p>
                        </div>
                        <div class="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center">
                            <div class="text-3xl font-black text-purple-400 mb-2">Thesis-Based</div>
                            <div class="text-xs text-purple-300 uppercase tracking-widest mb-2">Advanced</div>
                            <p class="text-slate-400 text-sm">Exit when your thesis is complete (earnings released, breakout confirmed), not at arbitrary %.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-cyan-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">Profit-Taking Decision Framework</h4>
                    <p class="text-slate-300 mb-6">Struggling with "when do I take profit?" Here's your decision tree:</p>

                    <div class="space-y-3">
                        <div class="bg-black/30 rounded-xl p-4 border-l-4 border-emerald-500">
                            <h5 class="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                                <span>📊</span> Step 1: Check Your Profit Level
                            </h5>
                            <div class="space-y-2 text-sm text-slate-300 ml-6">
                                <div class="flex items-start gap-2">
                                    <span class="text-emerald-400">→</span>
                                    <div><b>0-25% profit:</b> Too early. Let it breathe. Set alert for 50%.</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-emerald-400">→</span>
                                    <div><b>25-50% profit:</b> Getting interesting. Check time decay (next step).</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-emerald-400">→</span>
                                    <div><b>50-100% profit:</b> Consider taking at least partial profits. Scale out.</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-emerald-400">→</span>
                                    <div><b>100%+ profit:</b> You doubled your money. Take it. Greed kills gains.</div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-black/30 rounded-xl p-4 border-l-4 border-amber-500">
                            <h5 class="text-amber-400 font-bold mb-2 flex items-center gap-2">
                                <span>⏰</span> Step 2: Check Your Time Remaining
                            </h5>
                            <div class="space-y-2 text-sm text-slate-300 ml-6">
                                <div class="flex items-start gap-2">
                                    <span class="text-amber-400">→</span>
                                    <div><b>>30 DTE:</b> You have time. Can let winners run if under 50% profit.</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-amber-400">→</span>
                                    <div><b>21-30 DTE:</b> Theta is accelerating. If you're in profit, strong lean toward taking it.</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-amber-400">→</span>
                                    <div><b><21 DTE:</b> Gamma danger zone. Close profitable positions. Don't get cute.</div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-black/30 rounded-xl p-4 border-l-4 border-purple-500">
                            <h5 class="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                <span>🎯</span> Step 3: Check Your Thesis
                            </h5>
                            <div class="space-y-2 text-sm text-slate-300 ml-6">
                                <div class="flex items-start gap-2">
                                    <span class="text-purple-400">→</span>
                                    <div><b>Thesis complete:</b> You traded earnings, it happened. Exit. Don't stick around.</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-purple-400">→</span>
                                    <div><b>Thesis invalidated:</b> Stock broke your support/resistance. Take profit and run.</div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-purple-400">→</span>
                                    <div><b>Thesis still unfolding:</b> Breakout in progress. Can hold if plenty of time left.</div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 p-4 rounded-r-xl">
                            <p class="text-slate-300 text-sm">
                                <span class="text-emerald-400 font-bold">Pro Tip:</span> If you're even asking yourself "should I take profit?"
                                the answer is probably YES. The fact that you're thinking about it means you're nervous about giving it back.
                                <b>Sell half, lock in the win, and let the rest ride guilt-free.</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Stop Losses -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-rose-400 uppercase">Part 2: Stop Losses</h3>
                </div>

                <div class="bg-slate-800/50 border border-rose-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">Options Stop Losses Are Different</h4>
                    <p class="text-slate-300 mb-6">You can't just set a stop loss at a price like you do with stocks. Options move non-linearly, have wide bid-ask spreads, and can gap overnight. Here's how professionals handle it:</p>

                    <div class="space-y-4">
                        <div class="bg-black/30 rounded-xl p-5">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">1</div>
                                <h5 class="text-white font-bold">The 200% Rule (Premium Sellers)</h5>
                            </div>
                            <p class="text-slate-400 text-sm mb-3">If you sold a spread for $1.00, close it if it reaches $2.00 (200% of premium received). Your max loss is 2x what you collected.</p>
                            <div class="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                                <p class="text-rose-300 text-xs"><b>Why 200%?</b> It's wide enough to avoid being stopped out by normal fluctuations, but tight enough to prevent catastrophic losses.</p>
                            </div>
                        </div>

                        <div class="bg-black/30 rounded-xl p-5">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">2</div>
                                <h5 class="text-white font-bold">The 50% Rule (Option Buyers)</h5>
                            </div>
                            <p class="text-slate-400 text-sm mb-3">If you bought an option for $2.00, consider closing if it drops to $1.00 (50% loss). Don't let it go to zero waiting for a miracle.</p>
                            <div class="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                                <p class="text-amber-300 text-xs"><b>Alternative:</b> Use the underlying stock price as your stop. "If AAPL breaks below $170, I'm out regardless of option value."</p>
                            </div>
                        </div>

                        <div class="bg-black/30 rounded-xl p-5">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">3</div>
                                <h5 class="text-white font-bold">Mental Stops vs Hard Stops</h5>
                            </div>
                            <p class="text-slate-400 text-sm">Hard stop orders on options are dangerous—wide spreads and low liquidity can trigger stops at terrible prices. Use <b>mental stops</b> with alerts, then close manually.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-rose-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">200% Stop Loss Rule - Detailed Examples</h4>
                    <p class="text-slate-300 mb-6">The 200% rule prevents catastrophic losses while giving your trade room to breathe. Here's how it works in practice:</p>

                    <div class="space-y-4">
                        <div class="bg-black/30 border border-rose-500/20 rounded-xl p-5">
                            <h5 class="text-rose-400 font-bold mb-3">Example 1: Bull Put Spread</h5>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                    <span class="text-slate-400">Entry (sell spread):</span>
                                    <span class="text-emerald-400 font-mono">+$1.00 credit ($100)</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                    <span class="text-slate-400">Stop loss trigger:</span>
                                    <span class="text-rose-400 font-mono">$2.00 debit ($200 loss)</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                    <span class="text-slate-400">Max possible loss (spread width - credit):</span>
                                    <span class="text-slate-500 font-mono">e.g., $5 width - $1 credit = $400</span>
                                </div>
                            </div>
                            <div class="mt-4 p-3 bg-rose-500/10 rounded-lg">
                                <p class="text-rose-300 text-xs"><b>Why 200%?</b> You're cutting your loss at $200 instead of riding it to max loss of $400. You gave up $100 profit to save potentially $200+ in further losses. That's a 2:1 damage control ratio.</p>
                            </div>
                        </div>

                        <div class="bg-black/30 border border-amber-500/20 rounded-xl p-5">
                            <h5 class="text-amber-400 font-bold mb-3">Example 2: Iron Condor (Tested on One Side)</h5>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                    <span class="text-slate-400">Total credit collected:</span>
                                    <span class="text-emerald-400 font-mono">$2.00 ($200)</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                    <span class="text-slate-400">Credit per side:</span>
                                    <span class="text-emerald-400 font-mono">$1.00 call side, $1.00 put side</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                    <span class="text-slate-400">Stock breaks through put side:</span>
                                    <span class="text-rose-400 font-mono">Put spread now worth $2.00</span>
                                </div>
                                <div class="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                    <span class="text-slate-400">Action:</span>
                                    <span class="text-amber-400 font-mono">Close put side, keep call side</span>
                                </div>
                            </div>
                            <div class="mt-4 p-3 bg-amber-500/10 rounded-lg">
                                <p class="text-amber-300 text-xs"><b>Result:</b> You lose $100 on put side ($2 close - $1 collected), but if call side expires worthless, you still net $0. Better than letting the losing side go to max loss.</p>
                            </div>
                        </div>

                        <div class="bg-black/30 border border-purple-500/20 rounded-xl p-5">
                            <h5 class="text-purple-400 font-bold mb-3">Example 3: When to Override the 200% Rule</h5>
                            <div class="space-y-3 text-sm text-slate-300">
                                <div class="flex items-start gap-2">
                                    <span class="text-purple-400 shrink-0">1.</span>
                                    <div>
                                        <b class="text-white">Defined catalyst ahead:</b> Earnings in 2 days. Your spread is at 180% loss but you know volatility will crush after the event. Consider holding through if you're positioned correctly.
                                    </div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-purple-400 shrink-0">2.</span>
                                    <div>
                                        <b class="text-white">Extreme spike on low volume:</b> Option jumped to $2.50 on a single trade with huge spread. Real value might be $1.80. Wait for spread to normalize before closing.
                                    </div>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-purple-400 shrink-0">3.</span>
                                    <div>
                                        <b class="text-white">Rolling makes sense:</b> Instead of taking 200% loss, you can roll out for small additional debit and your thesis is still valid. Consider roll vs close.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gradient-to-r from-rose-500/10 to-transparent border-l-4 border-rose-500 p-4 rounded-r-xl">
                            <p class="text-slate-300 text-sm">
                                <span class="text-rose-400 font-bold">Golden Rule:</span> The 200% stop is a <b>guideline, not a religion</b>.
                                But if you're going to override it, have a damn good reason written down BEFORE you ignore it.
                                "Hoping it comes back" is not a reason—it's how accounts die.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3: Time-Based Exits -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-amber-400 uppercase">Part 3: Time-Based Exits</h3>
                </div>

                <div class="bg-slate-800/50 border border-amber-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">The 21 DTE Rule</h4>
                    <p class="text-slate-300 mb-6">Regardless of profit or loss, strongly consider closing positions at <span class="text-amber-400 font-bold">21 days to expiration (DTE)</span>. This is when gamma risk accelerates dramatically.</p>

                    <div class="relative mb-8">
                        <div class="h-24 bg-black/30 rounded-xl relative overflow-hidden">
                            <svg viewBox="0 0 400 80" class="w-full h-full" preserveAspectRatio="none">
                                <!-- Gamma risk curve -->
                                <path d="M 0 70 Q 150 68, 280 55 Q 340 35, 380 5 L 400 5"
                                      fill="none" stroke="url(#gammaGradient)" stroke-width="3"/>
                                <!-- Danger zone -->
                                <rect x="320" y="0" width="80" height="80" fill="rgba(244,63,94,0.15)"/>
                                <!-- 21 DTE line -->
                                <line x1="320" y1="0" x2="320" y2="80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
                                <defs>
                                    <linearGradient id="gammaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:#10b981"/>
                                        <stop offset="70%" style="stop-color:#f59e0b"/>
                                        <stop offset="100%" style="stop-color:#ef4444"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div class="absolute bottom-1 left-2 text-xs text-slate-500">60 DTE</div>
                            <div class="absolute bottom-1 left-[78%] text-xs text-amber-400 font-bold">21 DTE</div>
                            <div class="absolute bottom-1 right-2 text-xs text-rose-400">0 DTE</div>
                            <div class="absolute top-2 right-4 text-xs text-rose-400 font-bold">DANGER ZONE</div>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                            <div class="text-emerald-400 font-bold mb-2">Before 21 DTE</div>
                            <ul class="text-slate-400 text-sm space-y-1">
                                <li>• Theta decay is steady and predictable</li>
                                <li>• Gamma is manageable</li>
                                <li>• Time to adjust if needed</li>
                                <li>• Less stress, more control</li>
                            </ul>
                        </div>
                        <div class="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                            <div class="text-rose-400 font-bold mb-2">After 21 DTE</div>
                            <ul class="text-slate-400 text-sm space-y-1">
                                <li>• Gamma explodes near the money</li>
                                <li>• Small moves cause huge P&L swings</li>
                                <li>• Assignment risk increases</li>
                                <li>• Harder to adjust or roll</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-purple-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">When to Break the 21 DTE Rule</h4>
                    <div class="space-y-3">
                        <div class="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                            <span class="text-purple-400">✓</span>
                            <p class="text-slate-300 text-sm"><b class="text-white">Deep ITM with high probability:</b> If your short strike is way out of the money (>2 standard deviations), the gamma risk is minimal.</p>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                            <span class="text-purple-400">✓</span>
                            <p class="text-slate-300 text-sm"><b class="text-white">Specific catalyst play:</b> If you entered for an event (earnings, FDA decision) that happens before 21 DTE, see it through.</p>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                            <span class="text-purple-400">✓</span>
                            <p class="text-slate-300 text-sm"><b class="text-white">Minimal capital at risk:</b> If the position is already at 80%+ profit and you're just collecting crumbs, the math changes.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 4: Managing Winners vs Losers -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-cyan-400 uppercase">Part 4: Winners vs Losers</h3>
                </div>

                <div class="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-cyan-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-6 text-center">The Asymmetric Approach</h4>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                            <div class="text-center mb-4">
                                <div class="text-4xl mb-2">🏆</div>
                                <h5 class="text-xl font-bold text-emerald-400">Managing Winners</h5>
                            </div>
                            <ul class="space-y-3 text-sm">
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Take profits quickly.</b> A bird in hand. Don't let winners turn into losers.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Scale out.</b> Sell half, let half run. Locks in gains while keeping upside.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Trail your stop.</b> Move stop loss to breakeven once you're up 50%+.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Don't add to winners.</b> Averaging up increases risk at worse prices.</span>
                                </li>
                            </ul>
                        </div>

                        <div class="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6">
                            <div class="text-center mb-4">
                                <div class="text-4xl mb-2">🩹</div>
                                <h5 class="text-xl font-bold text-rose-400">Managing Losers</h5>
                            </div>
                            <ul class="space-y-3 text-sm">
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Cut losses early.</b> Your first loss is your best loss. Hope is not a strategy.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Never average down.</b> Adding to losers is how accounts blow up.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Consider rolling.</b> If thesis is intact, roll to a later date for more time.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 mt-1">→</span>
                                    <span class="text-slate-300"><b class="text-white">Accept and move on.</b> Every loss is tuition. Learn and deploy elsewhere.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-6 p-4 bg-black/30 border border-cyan-500/20 rounded-xl text-center">
                        <p class="text-cyan-300 text-sm font-medium">"The goal is not to be right. The goal is to make money. Cut losers fast, let winners breathe, and the math takes care of itself."</p>
                    </div>
                </div>
            </div>

            <!-- Section 5: Rolling Options -->
            <div class="space-y-6">
                <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                        <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-purple-400 uppercase">Part 5: Rolling Options</h3>
                </div>

                <div class="bg-slate-800/50 border border-purple-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">What Is Rolling?</h4>
                    <p class="text-slate-300 mb-6">
                        <b>Rolling</b> means closing your current option position and simultaneously opening a new one—usually at a different strike or expiration (or both).
                        It's not "fixing" a loser. It's a strategic tool to buy more time or adjust to new conditions.
                    </p>

                    <div class="grid md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                            <h5 class="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                Roll Out
                            </h5>
                            <p class="text-slate-400 text-sm">Extend expiration to a later date. Same strike, more time. Used when your thesis needs more time to play out.</p>
                        </div>
                        <div class="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                            <h5 class="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg>
                                Roll Up/Down
                            </h5>
                            <p class="text-slate-400 text-sm">Move strike price higher (roll up) or lower (roll down). Adjusts to where the stock has moved.</p>
                        </div>
                        <div class="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                            <h5 class="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/></svg>
                                Roll Out & Up/Down
                            </h5>
                            <p class="text-slate-400 text-sm">Combo: New expiration + new strike. Most common for defensive adjustments.</p>
                        </div>
                        <div class="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                            <h5 class="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                Roll for Credit/Debit
                            </h5>
                            <p class="text-slate-400 text-sm">Rolling can collect additional premium (credit) or cost you (debit). Matters for calculating breakeven.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-purple-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">When to Roll (Decision Framework)</h4>

                    <div class="space-y-4">
                        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                            <h5 class="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                <span class="text-xl">✓</span> Roll When:
                            </h5>
                            <ul class="space-y-2 text-sm text-slate-300">
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 shrink-0">1.</span>
                                    <span><b>Your thesis is still valid</b> but you ran out of time. Stock is moving your direction but slowly. Rolling gives your trade more runway.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 shrink-0">2.</span>
                                    <span><b>Covered call/cash-secured put about to be assigned</b> but you want to keep the position. Roll to next month to collect more premium and delay assignment.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 shrink-0">3.</span>
                                    <span><b>You can roll for a credit</b> (collect more premium). If rolling extends time AND you get paid, the math often works out.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-emerald-400 shrink-0">4.</span>
                                    <span><b>Profitable trade approaching 21 DTE.</b> Rather than close, roll to next month to keep the position open if you're bullish.</span>
                                </li>
                            </ul>
                        </div>

                        <div class="bg-rose-500/10 border border-rose-500/20 rounded-xl p-5">
                            <h5 class="text-rose-400 font-bold mb-3 flex items-center gap-2">
                                <span class="text-xl">✗</span> Don't Roll When:
                            </h5>
                            <ul class="space-y-2 text-sm text-slate-300">
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 shrink-0">1.</span>
                                    <span><b>Your thesis is broken.</b> If the reason you entered the trade is invalid, close and move on. Don't throw good money after bad.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 shrink-0">2.</span>
                                    <span><b>You're just hoping for a miracle.</b> "Maybe if I give it another month it'll come back" is not a strategy—it's denial.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 shrink-0">3.</span>
                                    <span><b>Rolling requires a large debit.</b> If you have to pay significantly to roll, you're compounding your loss. Take the L and redeploy elsewhere.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-rose-400 shrink-0">4.</span>
                                    <span><b>Better opportunities exist.</b> Capital tied up in a mediocre roll means missing A+ setups. Opportunity cost matters.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-purple-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">How to Roll (Step-by-Step)</h4>

                    <div class="space-y-3">
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">1</div>
                            <div>
                                <div class="text-white font-bold mb-1">Calculate Current P&L</div>
                                <p class="text-slate-400 text-sm">Know where you stand. Are you in profit or loss? This determines if rolling makes mathematical sense.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">2</div>
                            <div>
                                <div class="text-white font-bold mb-1">Choose New Expiration/Strike</div>
                                <p class="text-slate-400 text-sm">Pick the new contract. Usually 30-45 DTE for selling premium. Consider if you need to adjust strike to reduce risk.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">3</div>
                            <div>
                                <div class="text-white font-bold mb-1">Calculate Roll Cost/Credit</div>
                                <p class="text-slate-400 text-sm">New option price minus current option price = roll credit (you collect) or debit (you pay). Factor this into your total P&L.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">4</div>
                            <div>
                                <div class="text-white font-bold mb-1">Execute as Single Order</div>
                                <p class="text-slate-400 text-sm">Most brokers let you "roll" as one order: Buy-to-close current, Sell-to-open new. Reduces execution risk and slippage.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4 p-4 bg-black/20 rounded-xl">
                            <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">5</div>
                            <div>
                                <div class="text-white font-bold mb-1">Update Your Exit Plan</div>
                                <p class="text-slate-400 text-sm">Rolling resets the trade. Define NEW profit targets, stop losses, and time stops based on the rolled position.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-purple-500/10 to-slate-900 border border-purple-500/20 p-6 rounded-2xl">
                    <h4 class="text-xl font-bold text-white mb-4">Real Example: Rolling a Covered Call</h4>

                    <div class="space-y-4">
                        <div class="bg-black/30 rounded-lg p-4">
                            <h5 class="text-purple-400 font-bold mb-2">The Setup</h5>
                            <p class="text-slate-300 text-sm">
                                You own 100 shares of AAPL at $150. You sold a <b>$155 call expiring in 7 DTE</b> for $2.00 ($200 premium).
                                AAPL is now at $157. Your call is <b>$2.00 ITM</b> and worth $4.50. You'll likely be assigned.
                            </p>
                        </div>

                        <div class="bg-black/30 rounded-lg p-4">
                            <h5 class="text-emerald-400 font-bold mb-2">Your Thesis</h5>
                            <p class="text-slate-300 text-sm">
                                You're long-term bullish on AAPL and <b>don't want to sell your shares</b> at $155. You'd rather keep collecting premium.
                            </p>
                        </div>

                        <div class="bg-black/30 rounded-lg p-4">
                            <h5 class="text-amber-400 font-bold mb-2">The Roll</h5>
                            <div class="grid md:grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div class="text-slate-500 mb-1">Close Current:</div>
                                    <div class="text-white">Buy $155 call @ $4.50</div>
                                    <div class="text-rose-400 text-xs">Cost: -$450</div>
                                </div>
                                <div>
                                    <div class="text-slate-500 mb-1">Open New:</div>
                                    <div class="text-white">Sell $160 call 30 DTE @ $3.00</div>
                                    <div class="text-emerald-400 text-xs">Credit: +$300</div>
                                </div>
                            </div>
                            <div class="mt-3 pt-3 border-t border-slate-700">
                                <div class="text-slate-400 text-xs mb-1">Net Roll Cost:</div>
                                <div class="text-white font-mono">-$450 + $300 = <span class="text-rose-400">-$150 debit</span></div>
                            </div>
                        </div>

                        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                            <h5 class="text-emerald-400 font-bold mb-2">The Math</h5>
                            <ul class="text-slate-300 text-sm space-y-1">
                                <li>• Original premium collected: <span class="text-emerald-400">+$200</span></li>
                                <li>• Roll cost: <span class="text-rose-400">-$150</span></li>
                                <li>• <b>Total premium collected: +$50</b></li>
                                <li>• New strike: $160 (vs $155 before)</li>
                                <li>• New expiration: 30 days away</li>
                            </ul>
                            <p class="text-emerald-300 text-sm mt-3 font-medium">
                                <b>Result:</b> You avoided assignment, raised your strike by $5 (more upside), collected net $50, and get to keep your shares for another month.
                            </p>
                        </div>

                        <div class="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                            <h5 class="text-amber-400 font-bold mb-2">When to Stop Rolling</h5>
                            <p class="text-slate-400 text-sm">
                                If AAPL keeps ripping higher, you might roll 3-4 times. <b>Set a limit:</b> "If I have to roll again and pay >$200 debit, I'll just let the shares get called away."
                                Don't chase a runaway stock forever—sometimes assignment is the right move.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
                    <h4 class="text-sm font-bold text-white mb-4 uppercase tracking-wider">Rolling Quick Reference</h4>
                    <div class="grid md:grid-cols-2 gap-4 text-xs">
                        <div class="space-y-2">
                            <div class="text-purple-400 font-bold mb-1">Covered Calls</div>
                            <ul class="text-slate-400 space-y-1">
                                <li>• Roll when: ITM, don't want assignment</li>
                                <li>• Roll to: Same/higher strike, 30-45 DTE</li>
                                <li>• Collect credit if possible</li>
                            </ul>
                        </div>
                        <div class="space-y-2">
                            <div class="text-purple-400 font-bold mb-1">Cash-Secured Puts</div>
                            <ul class="text-slate-400 space-y-1">
                                <li>• Roll when: ITM, want more premium vs assignment</li>
                                <li>• Roll to: Same/lower strike, 30-45 DTE</li>
                                <li>• Only if still want to own stock</li>
                            </ul>
                        </div>
                        <div class="space-y-2">
                            <div class="text-purple-400 font-bold mb-1">Credit Spreads</div>
                            <ul class="text-slate-400 space-y-1">
                                <li>• Roll when: Losing, thesis intact, can roll for small debit</li>
                                <li>• Roll to: Further OTM strikes, more DTE</li>
                                <li>• Max 1-2 rolls then take the loss</li>
                            </ul>
                        </div>
                        <div class="space-y-2">
                            <div class="text-purple-400 font-bold mb-1">Long Options</div>
                            <ul class="text-slate-400 space-y-1">
                                <li>• Roll when: Thesis valid, running out of time</li>
                                <li>• Roll to: Later expiration, consider closer strike</li>
                                <li>• Costs a debit—only if conviction high</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Exit Decision Flowchart -->
            <div class="bg-gradient-to-br from-slate-800/80 to-slate-900 border border-white/10 p-8 rounded-[2rem]">
                <h4 class="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                    <svg class="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20m0-20 6 6m-6-6-6 6"/></svg>
                    Should I Exit Now? Decision Tree
                    <svg class="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20m0-20 6 6m-6-6-6 6"/></svg>
                </h4>

                <div class="space-y-4">
                    <!-- Level 1: Is it a winner or loser? -->
                    <div class="bg-slate-900/60 border border-amber-500/30 rounded-xl p-6">
                        <h5 class="text-amber-400 font-bold mb-4 text-center text-lg">START: Am I in profit or loss?</h5>
                        <div class="grid md:grid-cols-2 gap-4">
                            <!-- Winner Path -->
                            <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                                <h6 class="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                    <span>🟢</span> In Profit →
                                </h6>
                                <div class="space-y-2 text-sm text-slate-300">
                                    <div class="pl-4 border-l-2 border-emerald-500/50">
                                        <b>If profit >50%:</b> Take it or scale out 50%
                                    </div>
                                    <div class="pl-4 border-l-2 border-emerald-500/50">
                                        <b>If profit 25-50%:</b> Check DTE ↓
                                        <div class="ml-3 mt-1 text-xs text-slate-400">
                                            • >30 DTE? Let it run<br/>
                                            • <21 DTE? Close now<br/>
                                            • 21-30 DTE? Scale out 50%
                                        </div>
                                    </div>
                                    <div class="pl-4 border-l-2 border-emerald-500/50">
                                        <b>If profit <25%:</b> Check thesis ↓
                                        <div class="ml-3 mt-1 text-xs text-slate-400">
                                            • Thesis complete? Exit<br/>
                                            • Thesis intact? Hold<br/>
                                            • Approaching 21 DTE? Consider exit
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Loser Path -->
                            <div class="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                                <h6 class="text-rose-400 font-bold mb-3 flex items-center gap-2">
                                    <span>🔴</span> In Loss →
                                </h6>
                                <div class="space-y-2 text-sm text-slate-300">
                                    <div class="pl-4 border-l-2 border-rose-500/50">
                                        <b>If loss >50% (buyers) or >200% (sellers):</b> CUT IT NOW
                                    </div>
                                    <div class="pl-4 border-l-2 border-rose-500/50">
                                        <b>If loss 25-50%:</b> Thesis check ↓
                                        <div class="ml-3 mt-1 text-xs text-slate-400">
                                            • Thesis broken? Close<br/>
                                            • Thesis intact? Consider roll vs close<br/>
                                            • <21 DTE? Close or roll
                                        </div>
                                    </div>
                                    <div class="pl-4 border-l-2 border-rose-500/50">
                                        <b>If loss <25%:</b> Normal fluctuation
                                        <div class="ml-3 mt-1 text-xs text-slate-400">
                                            • Check thesis still valid<br/>
                                            • Set alert for 50% loss<br/>
                                            • Review at 30 DTE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Level 2: Thesis Check -->
                    <div class="bg-slate-900/60 border border-purple-500/30 rounded-xl p-5">
                        <h6 class="text-purple-400 font-bold mb-3 text-center">Thesis Checkpoint</h6>
                        <div class="grid md:grid-cols-3 gap-3 text-sm">
                            <div class="bg-black/30 p-3 rounded-lg">
                                <div class="text-emerald-400 font-bold mb-2">✓ Thesis Complete</div>
                                <p class="text-slate-400 text-xs">Earnings happened, breakout confirmed, catalyst occurred. <b class="text-white">EXIT.</b> You got what you came for.</p>
                            </div>
                            <div class="bg-black/30 p-3 rounded-lg">
                                <div class="text-rose-400 font-bold mb-2">✗ Thesis Broken</div>
                                <p class="text-slate-400 text-xs">Stock broke support, news invalidated setup, fundamentals changed. <b class="text-white">EXIT.</b> Don't fight new reality.</p>
                            </div>
                            <div class="bg-black/30 p-3 rounded-lg">
                                <div class="text-amber-400 font-bold mb-2">⏸ Thesis Intact</div>
                                <p class="text-slate-400 text-xs">Still playing out as expected, just needs time. <b class="text-white">HOLD or ROLL</b> if plenty of DTE left.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Level 3: Time Urgency -->
                    <div class="bg-slate-900/60 border border-amber-500/30 rounded-xl p-5">
                        <h6 class="text-amber-400 font-bold mb-3 text-center">Time Urgency Factor</h6>
                        <div class="grid grid-cols-3 gap-3 text-sm">
                            <div class="bg-black/30 p-3 rounded-lg text-center border-t-2 border-emerald-500">
                                <div class="text-emerald-400 font-bold mb-2">>30 DTE</div>
                                <p class="text-slate-400 text-xs">Safe zone. Time is your friend. Can hold winners, give losers a chance.</p>
                            </div>
                            <div class="bg-black/30 p-3 rounded-lg text-center border-t-2 border-amber-500">
                                <div class="text-amber-400 font-bold mb-2">21-30 DTE</div>
                                <p class="text-slate-400 text-xs">Caution zone. Start making decisions. Take profits if in green.</p>
                            </div>
                            <div class="bg-black/30 p-3 rounded-lg text-center border-t-2 border-rose-500">
                                <div class="text-rose-400 font-bold mb-2"><21 DTE</div>
                                <p class="text-slate-400 text-xs">Danger zone. Close or roll. Gamma risk too high. Act now.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Final Decision Box -->
                    <div class="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 p-5 rounded-r-xl">
                        <h6 class="text-cyan-400 font-bold mb-2">Decision Matrix Quick Reference</h6>
                        <div class="grid md:grid-cols-2 gap-3 text-xs text-slate-300">
                            <div>
                                <b class="text-white">Exit NOW if:</b>
                                <ul class="ml-4 mt-1 space-y-1 text-slate-400">
                                    <li>• Profit >100% (any DTE)</li>
                                    <li>• Loss >stop loss rule</li>
                                    <li>• <21 DTE and in profit</li>
                                    <li>• Thesis broken</li>
                                    <li>• Thesis complete</li>
                                </ul>
                            </div>
                            <div>
                                <b class="text-white">Can HOLD if:</b>
                                <ul class="ml-4 mt-1 space-y-1 text-slate-400">
                                    <li>• Profit <50%, >30 DTE, thesis intact</li>
                                    <li>• Small loss <25%, >30 DTE, thesis intact</li>
                                    <li>• Specific catalyst ahead in <7 days</li>
                                </ul>
                                <b class="text-white mt-2 block">Consider ROLL if:</b>
                                <ul class="ml-4 mt-1 space-y-1 text-slate-400">
                                    <li>• Losing, thesis intact, <21 DTE</li>
                                    <li>• Can roll for credit/small debit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- The Exit Checklist -->
            <div class="bg-gradient-to-br from-emerald-500/10 to-slate-900 border border-emerald-500/20 p-8 rounded-[2rem]">
                <h4 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    The Exit Checklist (Define BEFORE Entry)
                </h4>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                            <div class="w-6 h-6 rounded border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs">1</div>
                            <span class="text-slate-300 text-sm">Profit target: ___% or $___</span>
                        </div>
                        <div class="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                            <div class="w-6 h-6 rounded border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs">2</div>
                            <span class="text-slate-300 text-sm">Stop loss: ___% or $___</span>
                        </div>
                        <div class="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                            <div class="w-6 h-6 rounded border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs">3</div>
                            <span class="text-slate-300 text-sm">Time stop: Close at ___ DTE</span>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                            <div class="w-6 h-6 rounded border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs">4</div>
                            <span class="text-slate-300 text-sm">Underlying stop: Exit if stock hits $___</span>
                        </div>
                        <div class="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                            <div class="w-6 h-6 rounded border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs">5</div>
                            <span class="text-slate-300 text-sm">Thesis invalidation: What breaks my trade?</span>
                        </div>
                        <div class="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                            <div class="w-6 h-6 rounded border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 text-xs">6</div>
                            <span class="text-slate-300 text-sm">Scale out plan: Sell ___% at ___% profit</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Reference -->
            <div class="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
                <h4 class="text-lg font-bold text-white mb-4">Quick Reference: Exit Rules by Strategy</h4>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-700">
                                <th class="text-left py-3 px-4 text-slate-400 font-mono uppercase text-xs">Strategy Type</th>
                                <th class="text-left py-3 px-4 text-slate-400 font-mono uppercase text-xs">Profit Target</th>
                                <th class="text-left py-3 px-4 text-slate-400 font-mono uppercase text-xs">Stop Loss</th>
                                <th class="text-left py-3 px-4 text-slate-400 font-mono uppercase text-xs">Time Stop</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-300">
                            <tr class="border-b border-slate-800">
                                <td class="py-3 px-4 text-amber-400">Credit Spreads</td>
                                <td class="py-3 px-4">50% of max profit</td>
                                <td class="py-3 px-4">200% of credit received</td>
                                <td class="py-3 px-4">21 DTE</td>
                            </tr>
                            <tr class="border-b border-slate-800">
                                <td class="py-3 px-4 text-amber-400">Iron Condors</td>
                                <td class="py-3 px-4">50% of max profit</td>
                                <td class="py-3 px-4">200% of credit received</td>
                                <td class="py-3 px-4">21 DTE</td>
                            </tr>
                            <tr class="border-b border-slate-800">
                                <td class="py-3 px-4 text-emerald-400">Long Calls/Puts</td>
                                <td class="py-3 px-4">50-100% gain</td>
                                <td class="py-3 px-4">50% of premium paid</td>
                                <td class="py-3 px-4">21 DTE or thesis complete</td>
                            </tr>
                            <tr class="border-b border-slate-800">
                                <td class="py-3 px-4 text-emerald-400">Debit Spreads</td>
                                <td class="py-3 px-4">50-75% of max profit</td>
                                <td class="py-3 px-4">50% of debit paid</td>
                                <td class="py-3 px-4">21 DTE</td>
                            </tr>
                            <tr>
                                <td class="py-3 px-4 text-purple-400">Covered Calls</td>
                                <td class="py-3 px-4">50-75% of premium</td>
                                <td class="py-3 px-4">Roll or let assign</td>
                                <td class="py-3 px-4">Expiration or roll at 21 DTE</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `,
        analogy: "Exit strategies are like knowing where the emergency exits are before the plane takes off. You hope you never need them, but when turbulence hits, you'll be glad you planned ahead.",
        nuance: "<b>The Discipline Tax:</b> Taking profits at 50% feels wrong when you 'could have made more.' But the traders who consistently take profits at targets outperform those who swing for the fences. Boring works.",
        example: "<b>Scenario:</b> You sold a put spread on AAPL for $1.00 credit. It's now trading at $0.45 (55% profit) with 25 DTE remaining.<br><br><b>Action:</b> Close it. You've hit your 50% target and you're approaching the 21 DTE threshold. Take the $55 profit, free up the capital, and find the next trade. Don't wait for the last $45—that's where the risk lives."
    },,
    {
        id: 'first-trade',
        name: 'Your First Trade',
        tier: 3.5,
        tierName: 'Proper Mindset',
        outlook: 'Educational',
        objective: 'Execution',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="text-center py-12"><p class="text-slate-400">Interactive first trade walkthrough - click to open</p></div>`,
        analogy: "Your first solo flight. The instructor is gone, but the checklist keeps you safe. Follow the steps, and you'll land just fine.",
        nuance: "<b>Mechanics Before Money:</b> Your first trade isn't about profit—it's about learning the buttons, the fills, the feelings. Trade small, learn the cockpit, then scale up.",
        example: ""
    },,
    {
        id: 'patience',
        name: 'Patience',
        tier: 3.5,
        tierName: 'Proper Mindset',
        outlook: 'Educational',
        objective: 'Mindset',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <!-- Hero Section -->
        <div class="text-center py-16 mb-12 relative">
            <div class="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-emerald-500/5 to-transparent pointer-events-none"></div>
            <h1 class="patience-quote text-5xl md:text-7xl lg:text-8xl font-black tracking-tight relative z-10 cursor-pointer" style="color: #10b981; text-shadow: 0 0 20px rgba(16,185,129,0.75), 0 0 40px rgba(16,185,129,0.75), 0 0 80px rgba(16,185,129,0.375);">
                "Patience, Grasshopper"
            </h1>
            <p class="text-slate-500 text-lg mt-6 font-mono">— Ancient Wisdom</p>
            <style>
                .patience-quote {
                    will-change: transform, filter;
                    transition: transform 0.3s ease-out, filter 0.3s ease-out;
                }
                .patience-quote:hover {
                    transform: scale(1.1);
                    filter: drop-shadow(0 0 24px rgba(16,185,129,0.75)) drop-shadow(0 0 48px rgba(16,185,129,0.75));
                }
            </style>
        </div>

        <div class="space-y-10">
            <!-- The Core Message -->
            <div class="bg-gradient-to-br from-emerald-500/10 to-slate-900 border border-emerald-500/30 rounded-[2rem] p-8 relative overflow-hidden">
                <div class="absolute top-4 right-4 text-6xl opacity-10">🦗</div>
                <h3 class="text-2xl font-black text-emerald-400 mb-4">Before You Trade...</h3>
                <p class="text-slate-300 text-lg leading-relaxed mb-6">
                    You've learned the mechanics. You understand calls and puts. You know about strikes, expirations, and the Greeks.
                    <span class="text-white font-bold">But knowledge without patience is a loaded gun with a hair trigger.</span>
                </p>
                <p class="text-slate-400 leading-relaxed">
                    The jungle doesn't reward the fastest hunter—it rewards the one who waits for the perfect moment to strike.
                    Every great options trader knows that the best trade is often <i>no trade at all</i>.
                </p>
            </div>

            <!-- Revisit Rules of the Jungle -->
            <div class="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
                <div class="flex items-start gap-4">
                    <div class="w-16 h-16 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                        <span class="text-3xl">📜</span>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-amber-400 mb-2">Return to the Rules</h3>
                        <p class="text-slate-300 mb-4">
                            Before placing your first real trade, revisit the <span class="text-amber-400 font-bold">Rules of the Jungle</span> module.
                            Pay special attention to the <span class="text-emerald-400 font-bold">Patience</span> law.
                        </p>
                        <p class="text-slate-400 text-sm italic">
                            "The patient predator eats. The impatient becomes the meal."
                        </p>
                    </div>
                </div>
            </div>

            <!-- The Patience Checklist -->
            <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span class="text-emerald-400">✓</span> The Patience Checklist
                </h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-black/30 rounded-xl p-4 border border-emerald-500/20">
                        <p class="text-emerald-400 font-bold mb-2">Wait for Setup</p>
                        <p class="text-slate-400 text-sm">Don't force trades. Let the market come to you. No setup = no trade.</p>
                    </div>
                    <div class="bg-black/30 rounded-xl p-4 border border-emerald-500/20">
                        <p class="text-emerald-400 font-bold mb-2">Wait for IV</p>
                        <p class="text-slate-400 text-sm">Selling premium? Wait for high IV. Buying options? Wait for low IV. Timing matters.</p>
                    </div>
                    <div class="bg-black/30 rounded-xl p-4 border border-emerald-500/20">
                        <p class="text-emerald-400 font-bold mb-2">Wait for Confirmation</p>
                        <p class="text-slate-400 text-sm">Don't anticipate. Let price action confirm your thesis before committing capital.</p>
                    </div>
                    <div class="bg-black/30 rounded-xl p-4 border border-emerald-500/20">
                        <p class="text-emerald-400 font-bold mb-2">Wait for Your Trade</p>
                        <p class="text-slate-400 text-sm">Don't chase other people's trades. Your edge is your own. Trust your process.</p>
                    </div>
                </div>
            </div>

            <!-- The Cost of Impatience -->
            <div class="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-rose-400 mb-4">The Cost of Impatience</h3>
                <div class="space-y-3">
                    <div class="flex items-start gap-3">
                        <span class="text-rose-400 mt-1">💸</span>
                        <p class="text-slate-300"><span class="text-rose-400 font-bold">Overtrading:</span> Commissions, slippage, and poor fills eat your profits</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-rose-400 mt-1">💸</span>
                        <p class="text-slate-300"><span class="text-rose-400 font-bold">FOMO entries:</span> Buying at the top because "it's running!"</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-rose-400 mt-1">💸</span>
                        <p class="text-slate-300"><span class="text-rose-400 font-bold">Revenge trading:</span> Trying to "make back" losses with bigger, riskier bets</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-rose-400 mt-1">💸</span>
                        <p class="text-slate-300"><span class="text-rose-400 font-bold">Early exits:</span> Cutting winners short because you can't sit still</p>
                    </div>
                </div>
            </div>

            <!-- Closing Wisdom -->
            <div class="text-center py-8 border-t border-slate-800">
                <p class="text-2xl font-serif italic text-slate-400 mb-4">
                    "The stock market is a device for transferring money from the impatient to the patient."
                </p>
                <p class="text-slate-500 text-sm">— Warren Buffett</p>
            </div>

            <!-- Call to Action -->
            <div class="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl p-6 text-center">
                <p class="text-emerald-400 font-bold text-lg mb-2">You've learned the tools. Now master the mindset.</p>
                <p class="text-slate-400">When you're ready—truly ready—the strategies await. But never forget: <span class="text-white font-bold">patience is the ultimate edge.</span></p>
            </div>
        </div>
        `,
        analogy: "Patience is like a crocodile waiting by the riverbank. It doesn't chase every fish—it waits motionless for hours until the perfect prey wanders into striking range. One decisive snap. Meal secured.",
        nuance: "<b>The Paradox:</b> The more patient you become, the more opportunities you'll actually see. Impatience creates tunnel vision. Patience reveals the full landscape.",
        example: "<b>Scenario:</b> You're watching NVDA. It's been running for days and you want in. But your setup requires a pullback to the 20-day moving average.<br><br><b>Patience Play:</b> You wait. And wait. Three days later, it pulls back. You enter with conviction, knowing your setup is valid. The stock bounces and you're in profit immediately. That's the power of patience."
    },
];
