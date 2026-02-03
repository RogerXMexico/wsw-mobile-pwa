import { Strategy } from '../../types';

// Market Structure - Tier 1
export const TIER_1_STRATEGIES: Strategy[] = [
    {
        id: 'market-time', name: 'Time (Relativity)', tier: 1, tierName: 'Market Structure', outlook: 'Educational', objective: 'Understanding', risk: 'Knowledge', legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-12">
            
            <!-- Hero Quote -->
            <div class="gravity-tilt-card bg-slate-900 border border-purple-500/20 p-8 rounded-[2rem] relative overflow-hidden text-center transition-all duration-100" style="perspective: 1000px; transform-style: preserve-3d;">
                 <div class="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
                 <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
                 
                 <div class="mb-6 flex justify-center group interactive-clock cursor-crosshair">
                    <svg class="w-20 h-20 text-purple-400 group-hover:text-purple-300 transition-all duration-300 transform group-hover:scale-110" style="filter: drop-shadow(0 0 10px rgba(168,85,247,0.8)); transition: filter 0.3s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                 </div>
                 <p class="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight" style="text-shadow: 0 0 20px rgba(168,85,247,0.5)">"Time is Relative"</p>
                 <p class="text-purple-300 italic text-lg opacity-80 mb-2">— Albert Einstein</p>
            </div>

            <!-- Bull/Bear Quote (Gold) -->
            <div class="border-2 border-amber-400 p-6 md:p-8 rounded-[1.5rem] text-center bg-black/40 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all duration-300">
                 <div class="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors pointer-events-none"></div>
                 <p class="text-xl md:text-2xl font-black text-amber-400 italic leading-snug" style="text-shadow: 0 0 15px rgba(251,191,36,0.5)">
                    "The labels <span class="text-emerald-400">'Bull'</span> and <span class="text-rose-400">'Bear'</span> are meaningless without a reference to Time Frame."
                 </p>
            </div>

            <!-- Physics of Trading - Full Width -->
            <div class="space-y-6">
                <h3 class="text-xl font-bold text-white flex items-center gap-2">
                    <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    The Physics of the Market
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <p class="text-slate-300 leading-relaxed text-lg">
                        In physics, time slows down as you approach the speed of light. In trading, time "slows down" when you are losing money. This is <span class="text-purple-400 font-bold">Emotional Time Dilation</span>.
                    </p>
                    <p class="text-slate-300 leading-relaxed text-lg">
                        Options are distinct from stocks because they have an expiration date. They are decaying assets. You are not just betting on <b>direction</b>; you are betting against the <b>clock</b>.
                    </p>
                </div>

                <div class="bg-black/40 p-6 rounded-2xl border border-white/5 max-w-2xl mx-auto">
                    <p class="text-sm italic text-slate-400 text-center">"The only reason for time is so that everything doesn't happen at once."</p>
                    <div class="flex justify-center mt-2"><span class="text-xs text-slate-600 uppercase tracking-widest">— ALBERT EINSTEIN / JOHN WHEELER</span></div>
                </div>
            </div>

            <!-- Time Advantage Comparison -->
            <div class="time-comparison-container bg-black/80 border border-white/10 rounded-2xl p-8">
                <h3 class="text-2xl font-bold text-white text-center mb-2">Time: Your Ally or Your Enemy?</h3>
                <p class="text-slate-400 text-center mb-8 max-w-2xl mx-auto">The same clock ticks for everyone, but time treats different traders differently. Your strategy determines whether time works <span class="text-emerald-400 font-bold">for</span> you or <span class="text-rose-400 font-bold">against</span> you.</p>

                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Long-Term Investors -->
                    <div class="time-card time-card-longterm bg-black/60 border border-indigo-500/30 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-indigo-400/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-[1.02]">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="time-card-icon w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center transition-all duration-300">
                                <svg class="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"/></svg>
                            </div>
                            <div>
                                <h4 class="text-indigo-400 font-bold text-lg uppercase tracking-wide">Long-Term Investor</h4>
                                <p class="text-slate-500 text-sm">Weeks to Years</p>
                            </div>
                        </div>

                        <!-- Advantages -->
                        <div class="mb-6">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="text-emerald-400 font-bold text-sm uppercase tracking-wide">Advantages</span>
                                <div class="flex-1 h-px bg-emerald-500/30"></div>
                            </div>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">Compounding works for you</b> — the 8th wonder of the world</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">Time to recover</b> — bad entries heal with enough patience</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">Lower emotional toll</b> — daily noise becomes irrelevant</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">Tax advantages</b> — long-term capital gains rates</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Disadvantages -->
                        <div>
                            <div class="flex items-center gap-2 mb-3">
                                <span class="text-rose-400 font-bold text-sm uppercase tracking-wide">Disadvantages</span>
                                <div class="flex-1 h-px bg-rose-500/30"></div>
                            </div>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">Capital locked up</b> — opportunity cost while waiting</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">Holding losers too long</b> — patience can become stubbornness</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">Slow feedback loops</b> — takes years to know if strategy works</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">Market regime changes</b> — the world can fundamentally shift</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><circle cx="10" cy="7" r="1" fill="currentColor"/><circle cx="14" cy="7" r="1" fill="currentColor"/><path d="M10 10h4"/><path d="M12 13v3"/><path d="M8 20l4-4 4 4"/><path d="M6 16l2 2"/><path d="M18 16l-2 2"/></svg>
                                    <span><b class="text-rose-300">You might die first</b> — your thesis could take decades to play out</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Short/Medium-Term Traders -->
                    <div class="time-card time-card-shortterm bg-black/60 border border-amber-500/30 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-[1.02]">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="time-card-icon w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center transition-all duration-300">
                                <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </div>
                            <div>
                                <h4 class="text-amber-400 font-bold text-lg uppercase tracking-wide">Short/Medium-Term Trader</h4>
                                <p class="text-slate-500 text-sm">Minutes to Weeks</p>
                            </div>
                        </div>

                        <!-- Advantages -->
                        <div class="mb-6">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="text-emerald-400 font-bold text-sm uppercase tracking-wide">Advantages</span>
                                <div class="flex-1 h-px bg-emerald-500/30"></div>
                            </div>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">Rapid feedback</b> — learn and adapt quickly</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">Capture momentum</b> — ride waves before they break</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">More opportunities</b> — multiple setups per week/day</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span><b class="text-emerald-300">Capital flexibility</b> — money isn't tied up for months</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Disadvantages -->
                        <div>
                            <div class="flex items-center gap-2 mb-3">
                                <span class="text-rose-400 font-bold text-sm uppercase tracking-wide">Disadvantages</span>
                                <div class="flex-1 h-px bg-rose-500/30"></div>
                            </div>
                            <ul class="space-y-2">
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">Time decay is brutal</b> — options lose value daily (theta)</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">High emotional toll</b> — constant decisions drain willpower</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">Transaction costs add up</b> — commissions and bid/ask spreads</span>
                                </li>
                                <li class="flex items-start gap-2 text-slate-300 text-sm">
                                    <svg class="w-4 h-4 text-rose-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span><b class="text-rose-300">No time to recover</b> — mistakes compound quickly</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Bottom Insight -->
                <div class="mt-8 bg-gradient-to-r from-purple-500/10 via-black/80 to-purple-500/10 border border-purple-500/20 rounded-xl p-5 text-center">
                    <p class="text-slate-300 text-sm"><span class="text-purple-400 font-bold">The Jungle Truth:</span> There is no "better" timeframe. There is only the timeframe that matches <span class="text-white font-bold">your personality</span>, <span class="text-white font-bold">your capital</span>, and <span class="text-white font-bold">your life</span>.</p>
                </div>
            </div>
        </div>`,
        analogy: "To a photon, time does not exist; it arrives instantly. To an option buyer, time is the ultimate enemy. To an option seller, time is the ultimate ally.",
        nuance: "<b>Focus on your Frame:</b> A Day Trader looking at a Monthly chart will freeze. An Investor looking at a 1-minute chart will panic. Pick your Time Frame and ignore the relativity of the others.",
        example: ""
    },,
    {
        id: 'four-frames', name: 'Four Frames of Reference', tier: 1, tierName: 'Market Structure', outlook: 'Educational', objective: 'Time Frames', risk: 'Knowledge', legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <!-- Header -->
            <div class="border border-cyan-500/30 bg-slate-900/60 p-8 rounded-[2rem] relative overflow-hidden text-center">
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"></div>
                <div class="inline-block p-4 rounded-full bg-slate-800 border border-cyan-500/30 mb-4 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                    <svg class="w-12 h-12 text-cyan-400" style="filter: drop-shadow(0 0 10px rgba(34,211,238,0.5));" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h2 class="text-3xl font-black text-white mb-3">The 4 Frames of Reference</h2>
                <p class="text-slate-400 max-w-2xl mx-auto">Every trader operates in a different time dimension. Your frame of reference determines what you see, what you ignore, and how you react to market movements.</p>
            </div>

            <!-- Badger Bias - Flexibility -->
            <div class="bg-black/60 border border-amber-500/30 rounded-2xl p-6 overflow-hidden">
                <div class="flex flex-col lg:flex-row gap-6 items-center">
                    <div class="lg:w-1/2">
                        <img src="/assets/Badger Bias.webp" alt="Badger Bias - Stay Flexible" class="w-full h-auto rounded-xl border border-white/10" />
                    </div>
                    <div class="lg:w-1/2 space-y-4">
                        <h3 class="text-2xl font-bold text-amber-400 flex items-center gap-3">
                            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                            Stay Flexible
                        </h3>
                        <p class="text-slate-300 leading-relaxed">
                            <b class="text-white">The market doesn't care about your bias.</b> A badger trapped in one mindset becomes prey. The best traders adapt their timeframe to what the market is showing them—not what they <i>want</i> to see.
                        </p>
                        <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                            <p class="text-amber-300 text-sm font-medium">
                                <span class="text-amber-400 font-bold">Flexibility is survival.</span> If your daily thesis conflicts with the weekly trend, zoom out. If your monthly conviction is being challenged, be willing to reassess. Rigid traders break. Flexible traders bend and profit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Candlestick Anatomy -->
            <div class="bg-slate-800/50 border border-white/10 rounded-2xl p-8">
                <h3 class="text-2xl font-bold text-white text-center mb-2">Reading a Candlestick</h3>
                <p class="text-slate-400 text-center mb-8 max-w-xl mx-auto">Each candlestick tells the story of a time period—where price started, where it went, and where it ended.</p>

                <div class="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <!-- Bullish Candle -->
                    <div class="text-center">
                        <h4 class="text-emerald-400 font-bold text-lg mb-4 uppercase tracking-wide">Bullish (Price Went Up)</h4>
                        <div class="relative inline-block">
                            <svg width="240" height="280" viewBox="0 0 240 280" class="mx-auto">
                                <!-- Upper Wick -->
                                <line x1="100" y1="20" x2="100" y2="70" stroke="#10b981" stroke-width="3"/>
                                <!-- Body -->
                                <rect x="60" y="70" width="80" height="120" fill="#10b981" rx="4"/>
                                <!-- Lower Wick -->
                                <line x1="100" y1="190" x2="100" y2="250" stroke="#10b981" stroke-width="3"/>

                                <!-- Labels -->
                                <!-- High -->
                                <line x1="110" y1="20" x2="160" y2="20" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="165" y="25" fill="#94a3b8" font-size="12" font-weight="bold">HIGH</text>

                                <!-- Close (top of body for bullish) -->
                                <line x1="140" y1="70" x2="175" y2="50" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="178" y="55" fill="#10b981" font-size="12" font-weight="bold">CLOSE</text>

                                <!-- Open (bottom of body for bullish) -->
                                <line x1="140" y1="190" x2="175" y2="210" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="178" y="215" fill="#10b981" font-size="12" font-weight="bold">OPEN</text>

                                <!-- Low -->
                                <line x1="110" y1="250" x2="160" y2="250" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="165" y="255" fill="#94a3b8" font-size="12" font-weight="bold">LOW</text>

                                <!-- Body label -->
                                <text x="20" y="135" fill="#10b981" font-size="11" font-weight="bold">BODY</text>
                                <line x1="45" y1="130" x2="58" y2="130" stroke="#10b981" stroke-width="1"/>

                                <!-- Upper Wick label -->
                                <text x="5" y="50" fill="#94a3b8" font-size="10">UPPER</text>
                                <text x="5" y="62" fill="#94a3b8" font-size="10">WICK</text>
                                <line x1="35" y1="55" x2="97" y2="45" stroke="#64748b" stroke-width="1"/>

                                <!-- Lower Wick label -->
                                <text x="5" y="220" fill="#94a3b8" font-size="10">LOWER</text>
                                <text x="5" y="232" fill="#94a3b8" font-size="10">WICK</text>
                                <line x1="35" y1="225" x2="97" y2="220" stroke="#64748b" stroke-width="1"/>
                            </svg>
                        </div>
                        <p class="text-slate-400 text-sm mt-4">Green/White candle = Price <span class="text-emerald-400 font-bold">closed higher</span> than it opened</p>
                    </div>

                    <!-- Bearish Candle -->
                    <div class="text-center">
                        <h4 class="text-rose-400 font-bold text-lg mb-4 uppercase tracking-wide">Bearish (Price Went Down)</h4>
                        <div class="relative inline-block">
                            <svg width="240" height="280" viewBox="0 0 240 280" class="mx-auto">
                                <!-- Upper Wick -->
                                <line x1="100" y1="20" x2="100" y2="70" stroke="#f43f5e" stroke-width="3"/>
                                <!-- Body -->
                                <rect x="60" y="70" width="80" height="120" fill="#f43f5e" rx="4"/>
                                <!-- Lower Wick -->
                                <line x1="100" y1="190" x2="100" y2="250" stroke="#f43f5e" stroke-width="3"/>

                                <!-- Labels -->
                                <!-- High -->
                                <line x1="110" y1="20" x2="160" y2="20" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="165" y="25" fill="#94a3b8" font-size="12" font-weight="bold">HIGH</text>

                                <!-- Open (top of body for bearish) -->
                                <line x1="140" y1="70" x2="175" y2="50" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="178" y="55" fill="#f43f5e" font-size="12" font-weight="bold">OPEN</text>

                                <!-- Close (bottom of body for bearish) -->
                                <line x1="140" y1="190" x2="175" y2="210" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="178" y="215" fill="#f43f5e" font-size="12" font-weight="bold">CLOSE</text>

                                <!-- Low -->
                                <line x1="110" y1="250" x2="160" y2="250" stroke="#64748b" stroke-width="1" stroke-dasharray="4"/>
                                <text x="165" y="255" fill="#94a3b8" font-size="12" font-weight="bold">LOW</text>

                                <!-- Body label -->
                                <text x="20" y="135" fill="#f43f5e" font-size="11" font-weight="bold">BODY</text>
                                <line x1="45" y1="130" x2="58" y2="130" stroke="#f43f5e" stroke-width="1"/>

                                <!-- Upper Wick label -->
                                <text x="5" y="50" fill="#94a3b8" font-size="10">UPPER</text>
                                <text x="5" y="62" fill="#94a3b8" font-size="10">WICK</text>
                                <line x1="35" y1="55" x2="97" y2="45" stroke="#64748b" stroke-width="1"/>

                                <!-- Lower Wick label -->
                                <text x="5" y="220" fill="#94a3b8" font-size="10">LOWER</text>
                                <text x="5" y="232" fill="#94a3b8" font-size="10">WICK</text>
                                <line x1="35" y1="225" x2="97" y2="220" stroke="#64748b" stroke-width="1"/>
                            </svg>
                        </div>
                        <p class="text-slate-400 text-sm mt-4">Red/Black candle = Price <span class="text-rose-400 font-bold">closed lower</span> than it opened</p>
                    </div>
                </div>

                <!-- OHLC Summary -->
                <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    <div class="bg-black/30 p-4 rounded-xl text-center">
                        <div class="text-white font-bold text-lg">O</div>
                        <div class="text-slate-400 text-xs uppercase tracking-wide">Open</div>
                        <div class="text-slate-500 text-xs mt-1">Starting price</div>
                    </div>
                    <div class="bg-black/30 p-4 rounded-xl text-center">
                        <div class="text-white font-bold text-lg">H</div>
                        <div class="text-slate-400 text-xs uppercase tracking-wide">High</div>
                        <div class="text-slate-500 text-xs mt-1">Highest price</div>
                    </div>
                    <div class="bg-black/30 p-4 rounded-xl text-center">
                        <div class="text-white font-bold text-lg">L</div>
                        <div class="text-slate-400 text-xs uppercase tracking-wide">Low</div>
                        <div class="text-slate-500 text-xs mt-1">Lowest price</div>
                    </div>
                    <div class="bg-black/30 p-4 rounded-xl text-center">
                        <div class="text-white font-bold text-lg">C</div>
                        <div class="text-slate-400 text-xs uppercase tracking-wide">Close</div>
                        <div class="text-slate-500 text-xs mt-1">Ending price</div>
                    </div>
                </div>

                <p class="text-center text-slate-500 text-sm mt-6 italic">Each candle represents one unit of your timeframe (1 minute, 1 day, 1 week, etc.)</p>
            </div>

            <!-- Monthly - Full Width -->
            <div class="timeframe-card timeframe-monthly group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-indigo-500/30 p-6 hover:bg-slate-800/80 transition-all cursor-pointer">
                <div class="absolute left-0 top-0 h-full w-2 bg-indigo-500"></div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-indigo-400 font-black uppercase text-lg tracking-widest">Monthly</span>
                    <span class="text-sm text-slate-400 uppercase">The Macro Strategist</span>
                </div>
                <img src="/eos_charts/eos_monthly.webp" alt="EOS Monthly Chart" class="w-full h-[625px] object-contain rounded-xl mb-4 border border-indigo-500/30 bg-slate-900/50 opacity-90 group-hover:opacity-100 transition-opacity" />
                <p class="text-slate-300 text-base leading-relaxed"><b>The Primary Trend.</b> The tide itself. This establishes the dominant direction of the market (Secular Bull or Bear). We align with this, but rarely trade it directly.</p>
            </div>

            <!-- Weekly - Full Width -->
            <div class="timeframe-card timeframe-weekly group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-emerald-500/30 p-6 hover:bg-slate-800/80 transition-all cursor-pointer">
                <div class="absolute left-0 top-0 h-full w-2 bg-emerald-500"></div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-emerald-400 font-black uppercase text-lg tracking-widest">Weekly</span>
                    <span class="text-sm text-slate-400 uppercase">The Investor</span>
                </div>
                <img src="/eos_charts/eos_weekly.webp" alt="EOS Weekly Chart" class="w-full h-[625px] object-contain rounded-xl mb-4 border border-emerald-500/30 bg-slate-900/50 opacity-90 group-hover:opacity-100 transition-opacity" />
                <p class="text-slate-300 text-base leading-relaxed"><b>Deep Time.</b> Tectonic movements. Ignoring the daily noise. Wealth is built here. Compounding works best in this frame.</p>
            </div>

            <!-- Daily - Full Width -->
            <div class="timeframe-card timeframe-daily group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-amber-500/30 p-6 hover:bg-slate-800/80 transition-all cursor-pointer">
                <div class="absolute left-0 top-0 h-full w-2 bg-amber-500"></div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-amber-400 font-black uppercase text-lg tracking-widest">Daily</span>
                    <span class="text-sm text-slate-400 uppercase">The Swing Trader</span>
                </div>
                <img src="/eos_charts/eos_daily.webp" alt="EOS Daily Chart" class="w-full h-[625px] object-contain rounded-xl mb-4 border border-amber-500/30 bg-slate-900/50 opacity-90 group-hover:opacity-100 transition-opacity" />
                <p class="text-slate-300 text-base leading-relaxed"><b>Human Time.</b> The rhythm of business. Trends last for days or weeks. This is the "sweet spot" for most option strategies.</p>
            </div>

            <!-- Minute - Full Width -->
            <div class="timeframe-card timeframe-minute group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-rose-500/30 p-6 hover:bg-slate-800/80 transition-all cursor-pointer">
                <div class="absolute left-0 top-0 h-full w-2 bg-rose-500"></div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-rose-400 font-black uppercase text-lg tracking-widest">Minute</span>
                    <span class="text-sm text-slate-400 uppercase">The Day Trader</span>
                </div>
                <img src="/eos_charts/eos_minute.webp" alt="EOS Minute Chart" class="w-full h-[625px] object-contain rounded-xl mb-4 border border-rose-500/30 bg-slate-900/50 opacity-90 group-hover:opacity-100 transition-opacity" />
                <p class="text-slate-300 text-base leading-relaxed"><b>Quantum Foam.</b> Chaos and noise. Time moves incredibly fast here. One mistake can be fatal. High stress, high adrenaline.</p>
            </div>

            <!-- Insight Box -->
            <div class="bg-slate-800/50 border border-amber-500/20 rounded-xl p-5 flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                </div>
                <div>
                    <h4 class="text-amber-400 font-bold mb-1">The Jungle Insight</h4>
                    <p class="text-slate-300 text-sm"><b class="text-white">Pick your frame and commit.</b> A Day Trader looking at a Monthly chart will freeze. An Investor looking at a 1-minute chart will panic. Know which animal you are and hunt in your time zone.</p>
                </div>
            </div>

            <!-- MATCHING STRATEGIES TO YOUR TIMEFRAME -->
            <div class="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-2 border-amber-500/40 p-6 rounded-2xl mt-8">
                <div class="flex items-center gap-3 mb-4">
                    <svg class="w-8 h-8 text-amber-400" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.8));" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <h3 class="text-2xl font-black text-white">MATCHING STRATEGIES TO YOUR TIMEFRAME</h3>
                </div>

                <p class="text-slate-300 text-sm mb-6">Your timeframe determines your options strategy. Here's how to match Days-To-Expiration (DTE) to your trading style:</p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-slate-900/60 border border-purple-500/30 rounded-xl p-4">
                        <h4 class="text-purple-400 font-bold mb-2 text-sm">MINUTE TRADER</h4>
                        <p class="text-slate-400 text-xs mb-3 italic">Intraday scalps, fast entries/exits</p>
                        <div class="space-y-2 text-xs">
                            <div class="flex justify-between text-slate-300">
                                <span>DTE:</span>
                                <span class="text-white font-bold">0-7 days</span>
                            </div>
                            <div class="bg-purple-500/10 rounded p-2 border border-purple-500/20">
                                <p class="text-purple-300"><b>Strategy:</b> 0DTE spreads, lottery plays, gamma scalps</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-900/60 border border-cyan-500/30 rounded-xl p-4">
                        <h4 class="text-cyan-400 font-bold mb-2 text-sm">DAY TRADER</h4>
                        <p class="text-slate-400 text-xs mb-3 italic">Swing trades, 1-5 day holds</p>
                        <div class="space-y-2 text-xs">
                            <div class="flex justify-between text-slate-300">
                                <span>DTE:</span>
                                <span class="text-white font-bold">7-21 days</span>
                            </div>
                            <div class="bg-cyan-500/10 rounded p-2 border border-cyan-500/20">
                                <p class="text-cyan-300"><b>Strategy:</b> Debit spreads, directional plays, earnings trades</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-900/60 border border-emerald-500/30 rounded-xl p-4">
                        <h4 class="text-emerald-400 font-bold mb-2 text-sm">WEEK TRADER</h4>
                        <p class="text-slate-400 text-xs mb-3 italic">Position trades, 1-4 week holds</p>
                        <div class="space-y-2 text-xs">
                            <div class="flex justify-between text-slate-300">
                                <span>DTE:</span>
                                <span class="text-white font-bold">30-60 days</span>
                            </div>
                            <div class="bg-emerald-500/10 rounded p-2 border border-emerald-500/20">
                                <p class="text-emerald-300"><b>Strategy:</b> Credit spreads, Iron Condors, theta plays</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-900/60 border border-amber-500/30 rounded-xl p-4">
                        <h4 class="text-amber-400 font-bold mb-2 text-sm">MONTH TRADER</h4>
                        <p class="text-slate-400 text-xs mb-3 italic">Long-term positions, multi-month</p>
                        <div class="space-y-2 text-xs">
                            <div class="flex justify-between text-slate-300">
                                <span>DTE:</span>
                                <span class="text-white font-bold">90+ days (LEAPS)</span>
                            </div>
                            <div class="bg-amber-500/10 rounded p-2 border border-amber-500/20">
                                <p class="text-amber-300"><b>Strategy:</b> LEAPS, Poor Man's Covered Call, diagonal spreads</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 bg-rose-900/20 border border-rose-500/30 rounded-lg p-3">
                    <p class="text-rose-300 text-xs"><b>⚠️ WARNING:</b> Don't mix frames. If you're a Week Trader, don't buy 7 DTE options—you don't have time to be right. Match your DTE to your timeframe or you'll constantly fight theta.</p>
                </div>
            </div>
        </div>`,
        analogy: "Each timeframe is a different species. The Monthly trader is an elephant—slow, patient, unstoppable. The Minute trader is a hummingbird—fast, reactive, exhausting.",
        nuance: "<b>Multiple Frame Analysis:</b> The best traders check the higher frame for direction, then execute in their primary frame. Monthly sets the trend, Daily picks the entry.",
        example: ""
    },,
    {
        id: 'mkt-structure', name: 'Market Structure', tier: 1, tierName: 'Market Structure', outlook: 'Educational', objective: 'Understanding', risk: 'Knowledge', legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <!-- Brian Shannon Stage Analysis Chart -->
            <div class="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/assets/market-stages.webp" alt="Brian Shannon's 4 Stages of Market Structure" class="w-full h-auto" />
            </div>

            <div class="text-center text-xs text-slate-500 italic">Chart by Brian Shannon (@alphatrends) - The 4 Stages of a Stock's Life Cycle</div>

            <!-- The 4 Stages -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-yellow-600">
                    <h4 class="text-lg font-bold text-yellow-500 mb-2 flex items-center gap-2">
                        <span class="bg-yellow-600 text-black text-xs font-mono px-2 py-1 rounded">STAGE 1</span>
                        Accumulation
                    </h4>
                    <p class="text-slate-300 text-sm">The 'Smart Money' buying phase. Price moves sideways in a range. Low volatility, low interest from the public. <span class="text-yellow-400 font-bold">Patience is key.</span></p>
                </div>
                <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-green-500">
                    <h4 class="text-lg font-bold text-green-400 mb-2 flex items-center gap-2">
                        <span class="bg-green-600 text-black text-xs font-mono px-2 py-1 rounded">STAGE 2</span>
                        Markup
                    </h4>
                    <p class="text-slate-300 text-sm">The uptrend. Higher highs and higher lows. Price moves rapidly away from value. <span class="text-green-400 font-bold">This is where you want to be LONG.</span></p>
                </div>
                <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-orange-500">
                    <h4 class="text-lg font-bold text-orange-400 mb-2 flex items-center gap-2">
                        <span class="bg-orange-600 text-black text-xs font-mono px-2 py-1 rounded">STAGE 3</span>
                        Distribution
                    </h4>
                    <p class="text-slate-300 text-sm">'Smart Money' selling to the late public. High volatility, choppy price action. <span class="text-orange-400 font-bold">The top is forming.</span></p>
                </div>
                <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-red-500">
                    <h4 class="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
                        <span class="bg-red-600 text-white text-xs font-mono px-2 py-1 rounded">STAGE 4</span>
                        Decline
                    </h4>
                    <p class="text-slate-300 text-sm">The downtrend. Lower highs and lower lows. Fear dominates. <span class="text-red-400 font-bold">This is where you want to be SHORT or in CASH.</span></p>
                </div>
            </div>

            <!-- Key Insight -->
            <div class="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
                <h4 class="text-white font-bold mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    The Golden Rule
                </h4>
                <p class="text-slate-300 text-sm leading-relaxed">
                    <b class="text-emerald-400">Buy breakouts in Stage 2.</b>
                    <b class="text-rose-400">Sell breakdowns in Stage 4.</b>
                    <b class="text-amber-400">Avoid Stage 1 and Stage 3</b> unless you're a patient accumulator or experienced short seller.
                </p>
            </div>

            <!-- Market Cycle -->
            <div class="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/assets/market cycle.webp" alt="Market Cycle" class="w-full h-auto" />
            </div>

            <!-- STRATEGIES FOR EACH STAGE -->
            <div class="bg-gradient-to-br from-slate-800/80 to-slate-900 border-2 border-emerald-500/30 p-8 rounded-[2rem] mt-12">
                <div class="text-center mb-8">
                    <div class="inline-block p-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 mb-4">
                        <svg class="w-10 h-10 text-emerald-400" style="filter: drop-shadow(0 0 10px rgba(52,211,153,0.8));" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <polyline points="3.29 7 12 12 20.71 7"/>
                            <line x1="12" y1="22" x2="12" y2="12"/>
                        </svg>
                    </div>
                    <h3 class="text-3xl font-black text-white mb-3">STRATEGIES FOR EACH STAGE</h3>
                    <p class="text-slate-400 max-w-2xl mx-auto">Now that you understand market structure, here's how to trade it. Each stage requires different strategies.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Stage 1: Accumulation -->
                    <div class="bg-slate-900/60 border-2 border-yellow-500/40 rounded-2xl p-6 hover:border-yellow-500/70 transition-all">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="bg-yellow-600 text-black text-xs font-mono px-3 py-1.5 rounded-lg font-bold">STAGE 1</span>
                            <h4 class="text-xl font-bold text-yellow-400">Accumulation</h4>
                        </div>
                        <p class="text-slate-300 text-sm mb-4 italic">Price is range-bound. Volatility is low. The smart money is quietly buying.</p>

                        <div class="space-y-3">
                            <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                                <h5 class="text-emerald-400 font-bold text-sm mb-2">✅ IDEAL STRATEGIES:</h5>
                                <ul class="text-slate-300 text-sm space-y-2">
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Iron Condor</b> - Profit from the range with defined risk on both sides</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Covered Call</b> - Generate income while waiting for breakout</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Cash-Secured Put</b> - Get paid to wait for accumulation entry</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-rose-900/20 rounded-lg p-3 border border-rose-500/30">
                                <p class="text-rose-300 text-xs"><b>⚠️ AVOID:</b> Directional bets (Long Calls/Puts). You're trying to predict the breakout—save that for Stage 2.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Stage 2: Markup -->
                    <div class="bg-slate-900/60 border-2 border-emerald-500/40 rounded-2xl p-6 hover:border-emerald-500/70 transition-all">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="bg-emerald-600 text-black text-xs font-mono px-3 py-1.5 rounded-lg font-bold">STAGE 2</span>
                            <h4 class="text-xl font-bold text-emerald-400">Markup (Uptrend)</h4>
                        </div>
                        <p class="text-slate-300 text-sm mb-4 italic">Higher highs, higher lows. The trend is your friend. This is where you make money.</p>

                        <div class="space-y-3">
                            <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                                <h5 class="text-emerald-400 font-bold text-sm mb-2">✅ IDEAL STRATEGIES:</h5>
                                <ul class="text-slate-300 text-sm space-y-2">
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Long Call</b> - Pure upside leverage with defined risk</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Bull Put Spread</b> - Sell fear at support levels, collect premium</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Call Debit Spread</b> - Cheaper than naked calls, still captures trend</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-rose-900/20 rounded-lg p-3 border border-rose-500/30">
                                <p class="text-rose-300 text-xs"><b>⚠️ AVOID:</b> Selling calls (Covered Call, Bear Call Spread). Don't cap your upside in a strong trend.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Stage 3: Distribution -->
                    <div class="bg-slate-900/60 border-2 border-orange-500/40 rounded-2xl p-6 hover:border-orange-500/70 transition-all">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="bg-orange-600 text-black text-xs font-mono px-3 py-1.5 rounded-lg font-bold">STAGE 3</span>
                            <h4 class="text-xl font-bold text-orange-400">Distribution</h4>
                        </div>
                        <p class="text-slate-300 text-sm mb-4 italic">Choppy, volatile, topping action. Smart money is selling to the euphoric public.</p>

                        <div class="space-y-3">
                            <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                                <h5 class="text-emerald-400 font-bold text-sm mb-2">✅ IDEAL STRATEGIES:</h5>
                                <ul class="text-slate-300 text-sm space-y-2">
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Iron Condor</b> - Profit from volatility contraction as range forms</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Bear Call Spread</b> - Fade resistance, collect premium on rallies</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Short Straddle/Strangle</b> - Advanced: Sell inflated IV as fear peaks</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-rose-900/20 rounded-lg p-3 border border-rose-500/30">
                                <p class="text-rose-300 text-xs"><b>⚠️ AVOID:</b> Naked directional bets. Whipsaws will destroy you. Wait for Stage 4 confirmation.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Stage 4: Decline -->
                    <div class="bg-slate-900/60 border-2 border-rose-500/40 rounded-2xl p-6 hover:border-rose-500/70 transition-all">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="bg-rose-600 text-white text-xs font-mono px-3 py-1.5 rounded-lg font-bold">STAGE 4</span>
                            <h4 class="text-xl font-bold text-rose-400">Decline (Downtrend)</h4>
                        </div>
                        <p class="text-slate-300 text-sm mb-4 italic">Lower highs, lower lows. Fear dominates. This is where bears feast.</p>

                        <div class="space-y-3">
                            <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                                <h5 class="text-emerald-400 font-bold text-sm mb-2">✅ IDEAL STRATEGIES:</h5>
                                <ul class="text-slate-300 text-sm space-y-2">
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Long Put</b> - Pure downside leverage with defined risk</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Bear Call Spread</b> - Sell rallies at resistance, collect premium</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Put Debit Spread</b> - Cheaper than naked puts, captures downside</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-amber-900/20 rounded-lg p-3 border border-amber-500/30">
                                <p class="text-amber-300 text-xs"><b>💰 OR:</b> Just go to cash. No shame in sitting out Stage 4. Capital preservation > catching falling knives.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/40 rounded-xl p-6">
                    <h4 class="text-purple-300 font-bold mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                        </svg>
                        The Cardinal Rule
                    </h4>
                    <p class="text-slate-300 text-sm leading-relaxed">
                        <b class="text-white">Let the market tell you what stage it's in.</b> Don't force a bullish strategy in Stage 4 because "it's cheap." Don't short a Stage 2 trend because "it's extended." <span class="text-emerald-400">The market can remain irrational longer than you can remain solvent.</span> Trade the stage, not your opinion.
                    </p>
                </div>
            </div>
        </div>
        `, analogy: "The seasons of the market. You don't plant seeds in winter (Decline) and you don't harvest in spring (Accumulation). To everything there is a season.", nuance: "<b>Wyckoff Logic:</b> Study Wyckoff theory to spot the difference between Re-Accumulation (pause in trend) and Distribution (end of trend).", example: ""
    },,
    {
        id: 'support-resistance', name: 'Support & Resistance', tier: 1, tierName: 'Market Structure', outlook: 'Educational', objective: 'Levels', risk: 'Knowledge', legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-8">
            <ul class="space-y-4 text-sm text-slate-300">
                <li class="flex gap-4 items-start"><span class="text-2xl select-none shrink-0"><svg class="w-7 h-7 text-emerald-400 inline-block" style="filter: drop-shadow(0 0 6px rgba(52,211,153,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="4" rx="1"/><rect x="2" y="14" width="20" height="4" rx="1"/><line x1="12" y1="6" x2="12" y2="10"/><line x1="7" y1="14" x2="7" y2="18"/><line x1="17" y1="14" x2="17" y2="18"/></svg></span><span><b>Support (Floor):</b> A price level where buyers have historically stepped in. Demand exceeds supply.</span></li>
                <li class="flex gap-4 items-start"><span class="text-2xl select-none shrink-0"><svg class="w-7 h-7 text-rose-400 inline-block" style="filter: drop-shadow(0 0 6px rgba(251,113,133,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg></span><span><b>Resistance (Ceiling):</b> A price level where sellers have historically stepped in. Supply exceeds demand.</span></li>
            </ul>

            <!-- Why Levels Matter -->
            <div class="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Why Markets Remember Price Levels
                </h3>
                <p class="text-slate-300 text-sm leading-relaxed">
                    Support and resistance aren't magic lines—they're <b class="text-white">psychological scars</b> left on the market. When price bounces from a level, traders who missed the move place orders there, hoping for another chance. Institutional traders park large orders at round numbers. The more times a level is tested, the more "order memory" accumulates there. <span class="text-cyan-400">The market has a memory, and these levels are where it remembers.</span>
                </p>
            </div>

            <!-- Why More Tests = Stronger -->
            <div class="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-xl p-5 space-y-4">
                <h3 class="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                    Why "More Tests = Stronger" Exists
                </h3>

                <div class="space-y-4">
                    <!-- Textbook View -->
                    <div class="bg-slate-800/40 rounded-lg p-4">
                        <h4 class="font-semibold text-amber-400 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                            <span>📚</span> The Textbook View
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Textbooks and many education sites say that a support or resistance level is stronger the more times it has caused price to reverse, because this shows many participants are reacting to that zone. In that sense <b class="text-white">"stronger" really means "more widely recognized and therefore more relevant,"</b> not necessarily more likely to hold on the next test.
                        </p>
                    </div>

                    <!-- Order Flow Perspective -->
                    <div class="bg-slate-800/40 rounded-lg p-4">
                        <h4 class="font-semibold text-cyan-400 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                            <span>📊</span> Order-Flow Perspective
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Each time price tags support, resting buy orders get filled and some motivated buyers exhaust their demand, so the supply–demand imbalance that created the bounce is gradually reduced. <b class="text-white">Unless new buy orders keep appearing at that level, repeated tests typically thin out the bid</b> and make a breakdown more likely—demand is being used up.
                        </p>
                    </div>

                    <!-- Reconciling Views -->
                    <div class="bg-slate-800/40 rounded-lg p-4">
                        <h4 class="font-semibold text-emerald-400 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                            <span>🔄</span> Reconciling the Two Views
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed mb-2">Multiple bounces both:</p>
                        <ul class="text-sm text-slate-300 space-y-2 ml-4">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-400 mt-0.5">✓</span>
                                <span><b class="text-white">Confirm that a level matters</b>—lots of traders see and trade it</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-rose-400 mt-0.5">✓</span>
                                <span><b class="text-white">Increase the odds of a break</b>—on a later test, the defending side may run out of inventory</span>
                            </li>
                        </ul>
                        <p class="text-slate-400 text-sm mt-3 italic">
                            Many experienced price-action traders treat a level with many recent, rapid tests as a good candidate for a <span class="text-cyan-400">breakout trade</span>, not as "extra strong" support or resistance.
                        </p>
                    </div>

                    <!-- Practical Takeaway -->
                    <div class="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
                        <h4 class="font-semibold text-amber-400 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                            <span>💡</span> Practical Takeaway
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            For structuring trades, it's more robust to think: <b class="text-amber-300">"More tests = more validated but increasingly fragile level."</b> Read the tape around it—rejection size, volume, higher lows/lower highs—to decide whether to <span class="text-emerald-400">fade</span> the level or <span class="text-rose-400">trade the break</span>.
                        </p>
                    </div>
                </div>
            </div>

            <!-- How to Find Levels -->
            <div class="bg-slate-800/30 border border-cyan-500/20 rounded-xl p-5 space-y-4">
                <h3 class="text-lg font-bold text-cyan-400 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    How to Find Support & Resistance
                </h3>

                <div class="grid md:grid-cols-2 gap-4">
                    <!-- Finding Support -->
                    <div class="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                        <h4 class="font-semibold text-emerald-400 mb-2 text-sm uppercase tracking-wide">Finding Support</h4>
                        <ul class="text-sm text-slate-300 space-y-2">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-400 mt-0.5">→</span>
                                <span>Look for <b class="text-white">swing lows</b>—points where price fell, then bounced back up</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-400 mt-0.5">→</span>
                                <span>Find areas where <b class="text-white">multiple candle wicks</b> touch but don't break through</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-400 mt-0.5">→</span>
                                <span>For support: the more times tested, the more demand gets activated—that level gets recognized as <b class="text-emerald-400">where buying demand lives</b></span>
                            </li>
                        </ul>
                    </div>

                    <!-- Finding Resistance -->
                    <div class="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
                        <h4 class="font-semibold text-rose-400 mb-2 text-sm uppercase tracking-wide">Finding Resistance</h4>
                        <ul class="text-sm text-slate-300 space-y-2">
                            <li class="flex items-start gap-2">
                                <span class="text-rose-400 mt-0.5">→</span>
                                <span>Look for <b class="text-white">swing highs</b>—points where price rose, then fell back down</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-rose-400 mt-0.5">→</span>
                                <span>Find areas where <b class="text-white">sellers repeatedly stepped in</b> to push price down</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-rose-400 mt-0.5">→</span>
                                <span>Watch for "rejection wicks"—long upper shadows showing sellers winning</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-rose-400 mt-0.5">→</span>
                                <span>For resistance: the more times tested, the more supply gets used up and the <b class="text-rose-400">weaker the resistance becomes</b></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Pro Tips -->
                <div class="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 mt-4">
                    <h4 class="font-semibold text-amber-400 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        Pro Tips for Drawing Levels
                    </h4>
                    <ul class="text-sm text-slate-300 space-y-2">
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 font-bold">1.</span>
                            <span><b class="text-white">Think in zones, not lines.</b> Support and resistance are areas, not exact prices. A zone of 2-3% is normal.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 font-bold">2.</span>
                            <span><b class="text-white">Zoom out first.</b> Major levels visible on weekly/daily charts are more significant than intraday levels.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 font-bold">3.</span>
                            <span><b class="text-white">Count the touches.</b> A level touched 5 times is stronger than one touched twice. More memory = more significance.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-amber-400 font-bold">4.</span>
                            <span><b class="text-white">Look for confluence zones</b>—areas where multiple technical factors overlap (round numbers like $100/$50, previous highs/lows, moving averages, AVWAP). When these cluster at the same price, the level is significantly stronger.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Clear Support & Resistance Example -->
            <div class="bg-slate-800/50 p-6 rounded-[2rem] border border-cyan-500/20">
                <h3 class="text-xl font-bold text-cyan-400 mb-4 text-center">Clear Support & Resistance Levels</h3>
                <img src="/s:r/Clear Support Resistence.webp" alt="Clear Support and Resistance Levels" class="w-full max-w-4xl mx-auto rounded-xl border border-white/10" />
            </div>

            <!-- Interactive Chart Exercise -->
            <div class="border border-cyan-500/30 bg-slate-900/60 p-6 rounded-2xl">
                <div class="flex items-center gap-3 mb-4">
                    <svg class="w-8 h-8 text-cyan-400" style="filter: drop-shadow(0 0 8px rgba(34,211,238,0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    <h3 class="text-xl font-bold text-cyan-400 uppercase tracking-wide">Your Turn: Find the Levels</h3>
                </div>
                <p class="text-slate-300 mb-6 text-base leading-relaxed">
                    Look at the chart below. <b class="text-white">Draw the most obvious and dominant line of Support and Resistance.</b>
                    Where has price bounced multiple times? Where has it been rejected? Train your eye to see what the market remembers.
                </p>
                <div class="relative rounded-xl overflow-hidden border border-slate-700 bg-black/50">
                    <img src="/s:r/zs_daily.webp" alt="Daily Chart - Draw Support and Resistance" class="w-full h-auto object-contain" />
                </div>
                <div class="mt-4 flex items-center gap-2 text-slate-400 text-sm">
                    <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    <span>Hint: Look for horizontal zones where price has touched at least 2-3 times.</span>
                </div>

                <!-- Answer Reveal -->
                <details class="mt-6 group">
                    <summary class="cursor-pointer list-none">
                        <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold text-sm hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all duration-300">
                            <svg class="w-5 h-5 transition-transform duration-300 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                            <span>Reveal Answer</span>
                            <svg class="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                    </summary>

                    <div class="mt-4 p-5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-emerald-500/20 rounded-xl space-y-4 animate-fadeIn">
                        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wide">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Answer Key
                        </div>

                        <!-- Answer Chart with Lines -->
                        <div class="relative rounded-xl overflow-hidden border border-emerald-500/30 bg-black/50">
                            <img src="/s:r/zs_daily.webp" alt="Answer - Support and Resistance Levels" class="w-full h-auto object-contain" />
                            <!-- Resistance Zone Overlay -->
                            <div class="absolute left-0 right-0 h-[8%] bg-rose-500/20 border-t-2 border-b-2 border-rose-500/60 border-dashed" style="top: 14%;">
                                <span class="absolute right-2 top-1/2 -translate-y-1/2 text-rose-400 font-bold text-xs uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded">Resistance Zone</span>
                            </div>
                            <!-- Support Zone Overlay -->
                            <div class="absolute left-0 right-0 h-[8%] bg-emerald-500/20 border-t-2 border-b-2 border-emerald-500/60 border-dashed" style="top: 72%;">
                                <span class="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded">Support Zone</span>
                            </div>
                        </div>

                        <!-- Explanation -->
                        <div class="grid md:grid-cols-2 gap-4 text-sm">
                            <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                                <h5 class="font-semibold text-emerald-400 mb-1 flex items-center gap-2">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
                                    Support Level
                                </h5>
                                <p class="text-slate-300 text-xs leading-relaxed">
                                    Notice how price bounced from this zone <b class="text-white">multiple times</b>. Each time sellers pushed price down to this area, buyers stepped in aggressively. The more touches without breaking, the stronger the floor.
                                </p>
                            </div>
                            <div class="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3">
                                <h5 class="font-semibold text-rose-400 mb-1 flex items-center gap-2">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/></svg>
                                    Resistance Level
                                </h5>
                                <p class="text-slate-300 text-xs leading-relaxed">
                                    Price attempted to break through this ceiling <b class="text-white">several times</b> but was rejected. The long upper wicks show sellers overwhelming buyers at this level. This is where supply exceeds demand.
                                </p>
                            </div>
                        </div>

                        <div class="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mt-3">
                            <p class="text-slate-300 text-xs leading-relaxed flex items-start gap-2">
                                <svg class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                <span><b class="text-amber-400">Support and resistance behave differently when tested.</b> For support, repeated tests activate demand, strengthening the floor. For resistance, repeated tests use up supply (sellers), weakening the ceiling. Watch the volume and candle patterns to gauge which is happening.</span>
                            </p>
                        </div>

                        <div class="text-xs text-slate-400 italic border-t border-slate-700/50 pt-3 flex items-start gap-2">
                            <svg class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                            <span><b class="text-slate-300">Key Insight:</b> Your lines don't need to be exact. Support and resistance are <em>zones</em>, not precise prices. If you identified these general areas, you're reading the chart correctly.</span>
                        </div>
                    </div>
                </details>
            </div>

            <!-- Quote with gold reveal on hover -->
            <div class="mt-12 mb-8 text-center group cursor-pointer sr-quote-container">
                <p class="text-2xl md:text-3xl font-serif italic text-slate-400 relative inline-block">
                    <span class="sr-quote-base transition-opacity duration-700">"Fear knows no support. Greed knows no resistance."</span>
                    <span class="sr-quote-gold absolute left-0 top-0 text-amber-400 opacity-0 transition-all duration-700" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.5)); background: linear-gradient(90deg, #fbbf24 0%, #fbbf24 50%, transparent 50%); background-size: 200% 100%; background-position: 100% 0; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">"Fear knows no support. Greed knows no resistance."</span>
                </p>
            </div>

            <!-- TRADING AT KEY LEVELS -->
            <div class="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border-2 border-cyan-500/40 p-8 rounded-[2rem] mt-12">
                <div class="text-center mb-8">
                    <div class="inline-block p-3 rounded-full bg-cyan-500/20 border border-cyan-500/50 mb-4">
                        <svg class="w-10 h-10 text-cyan-400" style="filter: drop-shadow(0 0 10px rgba(34,211,238,0.8));" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7" rx="1"/>
                            <rect x="14" y="3" width="7" height="7" rx="1"/>
                            <rect x="14" y="14" width="7" height="7" rx="1"/>
                            <rect x="3" y="14" width="7" height="7" rx="1"/>
                        </svg>
                    </div>
                    <h3 class="text-3xl font-black text-white mb-3">TRADING AT KEY LEVELS</h3>
                    <p class="text-slate-400 max-w-2xl mx-auto">Now that you can identify support and resistance, here's how to profit from them using credit spreads.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <!-- Trading Support with Bull Put Spreads -->
                    <div class="bg-slate-900/60 border-2 border-emerald-500/40 rounded-2xl p-6 hover:border-emerald-500/70 transition-all">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
                                <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" x2="12" y1="5" y2="19"/>
                                    <polyline points="19 12 12 19 5 12"/>
                                </svg>
                            </div>
                            <h4 class="text-xl font-bold text-emerald-400">Selling at Support</h4>
                        </div>

                        <p class="text-slate-300 text-sm mb-4 italic">
                            When price approaches strong support, fear increases. That fear = inflated put premiums = opportunity.
                        </p>

                        <div class="space-y-4">
                            <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                                <h5 class="text-emerald-400 font-bold text-sm mb-3">Strategy: <span class="text-white">Bull Put Spread</span></h5>
                                <ul class="text-slate-300 text-sm space-y-2">
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Sell a put</b> at or just below support</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span><b class="text-white">Buy a put</b> further OTM for protection</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-emerald-500">▸</span>
                                        <span>You're betting <b class="text-emerald-400">support holds</b> and collecting premium from fearful traders</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
                                <h6 class="text-emerald-300 font-bold text-xs mb-2 uppercase tracking-wide">Real Example:</h6>
                                <p class="text-slate-300 text-sm leading-relaxed">
                                    SPY is at $450 approaching strong support at $445. You sell the $445 put and buy the $440 put for a <span class="text-emerald-400">$1.50 credit</span>.
                                    If SPY holds $445, you keep the full $150. Max risk: $350 if support breaks completely.
                                </p>
                            </div>

                            <div class="bg-amber-900/20 rounded-lg p-3 border border-amber-500/30">
                                <p class="text-amber-300 text-xs"><b>⚠️ RISK:</b> If support breaks, you take the loss. Always use stops and never risk more than 2% of your account.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Trading Resistance with Bear Call Spreads -->
                    <div class="bg-slate-900/60 border-2 border-rose-500/40 rounded-2xl p-6 hover:border-rose-500/70 transition-all">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="p-2 rounded-lg bg-rose-500/20 border border-rose-500/50">
                                <svg class="w-6 h-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" x2="12" y1="19" y2="5"/>
                                    <polyline points="5 12 12 5 19 12"/>
                                </svg>
                            </div>
                            <h4 class="text-xl font-bold text-rose-400">Selling at Resistance</h4>
                        </div>

                        <p class="text-slate-300 text-sm mb-4 italic">
                            When price rallies to strong resistance, greed increases. That greed = inflated call premiums = opportunity.
                        </p>

                        <div class="space-y-4">
                            <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                                <h5 class="text-rose-400 font-bold text-sm mb-3">Strategy: <span class="text-white">Bear Call Spread</span></h5>
                                <ul class="text-slate-300 text-sm space-y-2">
                                    <li class="flex items-start gap-2">
                                        <span class="text-rose-500">▸</span>
                                        <span><b class="text-white">Sell a call</b> at or just above resistance</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-rose-500">▸</span>
                                        <span><b class="text-white">Buy a call</b> further OTM for protection</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="text-rose-500">▸</span>
                                        <span>You're betting <b class="text-rose-400">resistance holds</b> and fading the breakout attempt</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="bg-rose-900/20 rounded-lg p-4 border border-rose-500/30">
                                <h6 class="text-rose-300 font-bold text-xs mb-2 uppercase tracking-wide">Real Example:</h6>
                                <p class="text-slate-300 text-sm leading-relaxed">
                                    AAPL rallies to $180, a level that's rejected price 3 times. You sell the $180 call and buy the $185 call for a <span class="text-rose-400">$1.20 credit</span>.
                                    If AAPL fails to break $180, you keep the full $120. Max risk: $380 if it rips through resistance.
                                </p>
                            </div>

                            <div class="bg-amber-900/20 rounded-lg p-3 border border-amber-500/30">
                                <p class="text-amber-300 text-xs"><b>⚠️ RISK:</b> If resistance breaks (especially with volume), exit quickly. Breakouts can be explosive.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Key Rules for Trading Levels -->
                <div class="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/40 rounded-xl p-6">
                    <h4 class="text-purple-300 font-bold mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        Golden Rules for Level Trading
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div class="space-y-2">
                            <div class="flex items-start gap-2 text-slate-300">
                                <span class="text-emerald-400 font-bold">1.</span>
                                <span><b class="text-white">Trade WITH the trend.</b> Bull Put Spreads work better in uptrends. Bear Call Spreads work better in downtrends.</span>
                            </div>
                            <div class="flex items-start gap-2 text-slate-300">
                                <span class="text-emerald-400 font-bold">2.</span>
                                <span><b class="text-white">Give yourself room.</b> Sell strikes slightly beyond the level, not right at it. Price can overshoot briefly.</span>
                            </div>
                            <div class="flex items-start gap-2 text-slate-300">
                                <span class="text-emerald-400 font-bold">3.</span>
                                <span><b class="text-white">Check IV first.</b> You want HIGH implied volatility when selling. Low IV = low premium = not worth the risk.</span>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-start gap-2 text-slate-300">
                                <span class="text-emerald-400 font-bold">4.</span>
                                <span><b class="text-white">Use 30-45 DTE.</b> Gives theta time to decay but not so far that you're tying up capital forever.</span>
                            </div>
                            <div class="flex items-start gap-2 text-slate-300">
                                <span class="text-emerald-400 font-bold">5.</span>
                                <span><b class="text-white">Take profit at 50%.</b> Made half your max profit? Close it. Don't be greedy. Theta works fastest in the last 2 weeks.</span>
                            </div>
                            <div class="flex items-start gap-2 text-slate-300">
                                <span class="text-emerald-400 font-bold">6.</span>
                                <span><b class="text-white">Honor your stops.</b> If the level breaks with conviction, get out. Don't hope. Hope is not a strategy.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 bg-slate-900/60 border border-cyan-500/30 rounded-xl p-5">
                    <p class="text-slate-300 text-sm leading-relaxed">
                        <b class="text-cyan-400">Bottom Line:</b> Support and resistance aren't just chart lines—they're <b class="text-white">trading opportunities</b>. When you see a strong level being tested, ask yourself:
                        <span class="text-emerald-400">"Can I sell premium here and get paid while the market decides?"</span> That's the edge. That's how pros trade levels.
                    </p>
                </div>
            </div>

            <style>
                .sr-quote-container:hover .sr-quote-gold {
                    opacity: 1 !important;
                    background-position: 0% 0 !important;
                    transition: background-position 1.5s ease-out, opacity 0.6s !important;
                }
                .sr-quote-container:hover .sr-quote-base {
                    opacity: 0;
                    transition: opacity 0.6s;
                }
            </style>
        </div>
        `, analogy: "A ball bouncing in a room. It hits the floor (Support) and bounces up. It hits the ceiling (Resistance) and bounces down. Eventually, if thrown hard enough, it breaks through one of them.", nuance: "<b>Polarity Principle:</b> When Resistance is broken, it often becomes Support (and vice-versa). The ceiling becomes the floor of the second story.", example: ""
    },,
    {
        id: 'avwap',
        name: 'The Holy Trinity (AVWAP)',
        tier: 1,
        tierName: 'Market Structure',
        outlook: 'Educational',
        objective: 'Trend Truth',
        risk: 'Knowledge',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <div class="space-y-6 text-slate-300">
            <p class="text-lg font-medium text-white mb-4">Three forces govern the jungle. Understanding how they interact is the difference between gambling and trading.</p>
            
            <ul class="space-y-4 text-sm">
                <li class="flex gap-4 items-center">
                    <span class="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                        <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </span>
                    <div>
                        <strong class="text-emerald-400 block">1. Price</strong>
                        <span class="opacity-80">The consensus of value based on the equilibrium of supply and demand. The "WHAT".</span>
                    </div>
                </li>
                <li class="flex gap-4 items-center">
                    <span class="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0">
                        <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
                    </span>
                    <div>
                        <strong class="text-amber-400 block">2. Volume</strong>
                        <span class="opacity-80">The emotional conviction behind the price. The "HOW MUCH". Price without volume is a lie.</span>
                    </div>
                </li>
                <li class="flex gap-4 items-center">
                    <span class="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 shrink-0">
                        <svg class="w-6 h-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </span>
                    <div>
                        <strong class="text-rose-400 block">3. Time</strong>
                        <span class="opacity-80">The context of the move. The "WHEN".</span>
                    </div>
                </li>
            </ul>

            <div class="bg-gradient-to-br from-cyan-900/20 to-slate-900/60 p-6 rounded-2xl border border-cyan-500/30 mt-6 relative overflow-hidden group">
                <div class="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                <h4 class="text-lg font-black text-cyan-400 mb-3 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" x2="12" y1="22" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
                    AVWAP: The Anchor
                </h4>
                <p class="text-sm leading-relaxed mb-4">
                    <b>Anchored Volume Weighted Average Price</b> combines all three. Unlike standard VWAP which resets daily, AVWAP is anchored to a specific "event" (Earnings, a gap, a Fed announcement).
                </p>
                <div class="bg-black/30 p-3 rounded-lg border border-cyan-500/10">
                    <p class="text-xs font-mono text-cyan-200">
                        It tells you the <b>TRUE COST BASIS</b> of the average participant involved since that event.
                    </p>
                </div>
            </div>

            <!-- Buyer/Seller Control Module -->
            <div class="bg-gradient-to-br from-emerald-900/20 to-rose-900/20 p-6 rounded-2xl border border-emerald-500/20 mt-6">
                <h4 class="text-lg font-black text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                    Who's Winning?
                </h4>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30">
                        <div class="flex items-center gap-2 mb-2">
                            <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
                            <span class="font-bold text-emerald-400">Above AVWAP</span>
                        </div>
                        <p class="text-sm text-slate-300"><b class="text-emerald-300">Buyers are in control.</b> The average participant since the anchor point is profitable. AVWAP acts as <span class="text-emerald-400">support</span>.</p>
                    </div>
                    <div class="bg-rose-500/10 p-4 rounded-xl border border-rose-500/30">
                        <div class="flex items-center gap-2 mb-2">
                            <svg class="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                            <span class="font-bold text-rose-400">Below AVWAP</span>
                        </div>
                        <p class="text-sm text-slate-300"><b class="text-rose-300">Sellers are in control.</b> The average participant since the anchor point is underwater. AVWAP acts as <span class="text-rose-400">resistance</span>.</p>
                    </div>
                </div>
            </div>

            <!-- Guilty/Innocent Module -->
            <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 rounded-2xl border border-amber-500/20 mt-6">
                <h4 class="text-lg font-black text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 15-3.09-3.09"/><circle cx="11" cy="11" r="8"/><path d="m15.49 15.49 5.02 5.02"/><path d="M12 7v8"/><path d="M8 11h8"/></svg>
                    The Verdict: Slope Matters
                </h4>
                <p class="text-sm text-slate-400 mb-4">The <b>direction of the AVWAP</b> tells you the trend's character:</p>
                <div class="space-y-3">
                    <div class="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p class="text-sm"><span class="text-rose-400 font-bold">Below a DECLINING AVWAP:</span> <span class="text-slate-300">The stock is <b class="text-rose-300">guilty until proven innocent</b>. Sellers are adding to positions at lower prices. Every bounce is a chance to sell, not buy.</span></p>
                    </div>
                    <div class="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p class="text-sm"><span class="text-emerald-400 font-bold">Above an UPSLOPING AVWAP:</span> <span class="text-slate-300">The stock is <b class="text-emerald-300">innocent until proven guilty</b>. Buyers are accumulating at higher prices. Every dip is a buying opportunity.</span></p>
                    </div>
                </div>
            </div>

            <!-- AVWAP vs VWAP Module -->
            <div class="bg-gradient-to-br from-violet-900/20 to-slate-900/60 p-6 rounded-2xl border border-violet-500/20 mt-6">
                <h4 class="text-lg font-black text-violet-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m21 3-9 9"/></svg>
                    AVWAP vs Regular VWAP
                </h4>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-700">
                                <th class="text-left py-2 text-slate-400 font-medium"></th>
                                <th class="text-left py-2 text-cyan-400 font-medium">VWAP</th>
                                <th class="text-left py-2 text-violet-400 font-medium">AVWAP</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-300">
                            <tr class="border-b border-slate-800">
                                <td class="py-2 text-slate-400">Resets</td>
                                <td class="py-2">Daily at market open</td>
                                <td class="py-2"><b>Never</b> — anchored to your chosen event</td>
                            </tr>
                            <tr class="border-b border-slate-800">
                                <td class="py-2 text-slate-400">Time Horizon</td>
                                <td class="py-2">Intraday only</td>
                                <td class="py-2">Days, weeks, months, or years</td>
                            </tr>
                            <tr class="border-b border-slate-800">
                                <td class="py-2 text-slate-400">Best For</td>
                                <td class="py-2">Day trading execution</td>
                                <td class="py-2">Swing/position trading context</td>
                            </tr>
                            <tr class="border-b border-slate-800">
                                <td class="py-2 text-slate-400">Shows</td>
                                <td class="py-2">Today's institutional fair value</td>
                                <td class="py-2">Cost basis since a <b>specific event</b></td>
                            </tr>
                            <tr>
                                <td class="py-2 text-slate-400">Flexibility</td>
                                <td class="py-2">Fixed calculation</td>
                                <td class="py-2">You choose the anchor point</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Where to Anchor Module -->
            <div class="bg-gradient-to-br from-amber-900/20 to-slate-900/60 p-6 rounded-2xl border border-amber-500/20 mt-6">
                <h4 class="text-lg font-black text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" x2="12" y1="22" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
                    Where to Drop the Anchor
                </h4>
                <p class="text-sm text-slate-400 mb-3">Anchor to the <b class="text-amber-300">"Scene of the Crime"</b> — significant events where institutional money entered:</p>
                <div class="grid md:grid-cols-2 gap-3 text-sm">
                    <div class="flex items-center gap-2 bg-black/20 p-3 rounded-lg">
                        <span class="text-amber-400">●</span>
                        <span class="text-slate-300"><b>Earnings gaps</b> (up or down)</span>
                    </div>
                    <div class="flex items-center gap-2 bg-black/20 p-3 rounded-lg">
                        <span class="text-amber-400">●</span>
                        <span class="text-slate-300"><b>52-week highs/lows</b></span>
                    </div>
                    <div class="flex items-center gap-2 bg-black/20 p-3 rounded-lg">
                        <span class="text-amber-400">●</span>
                        <span class="text-slate-300"><b>Fed announcements</b></span>
                    </div>
                    <div class="flex items-center gap-2 bg-black/20 p-3 rounded-lg">
                        <span class="text-amber-400">●</span>
                        <span class="text-slate-300"><b>IPO or SPAC merger date</b></span>
                    </div>
                    <div class="flex items-center gap-2 bg-black/20 p-3 rounded-lg">
                        <span class="text-amber-400">●</span>
                        <span class="text-slate-300"><b>Major news events</b></span>
                    </div>
                    <div class="flex items-center gap-2 bg-black/20 p-3 rounded-lg">
                        <span class="text-amber-400">●</span>
                        <span class="text-slate-300"><b>Highest volume day</b> in recent history</span>
                    </div>
                </div>
                <p class="text-xs text-slate-500 mt-4 italic">"The anchor point is not random. It's where the battle began."</p>
            </div>

            <!-- Multiple AVWAPs Module -->
            <div class="bg-gradient-to-br from-cyan-900/20 to-violet-900/20 p-6 rounded-2xl border border-cyan-500/20 mt-6">
                <h4 class="text-lg font-black text-cyan-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h10"/><path d="M6 12h9"/><path d="M11 18h7"/></svg>
                    Stacking AVWAPs
                </h4>
                <p class="text-sm text-slate-300 mb-4">Use <b>multiple AVWAPs</b> simultaneously to find confluence zones:</p>
                <ul class="space-y-2 text-sm text-slate-300">
                    <li class="flex items-start gap-2">
                        <span class="text-cyan-400 mt-1">→</span>
                        <span><b class="text-cyan-300">Earnings AVWAP</b>: Anchored to the last earnings report</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-violet-400 mt-1">→</span>
                        <span><b class="text-violet-300">Year-to-Date AVWAP</b>: Anchored to January 1st</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-amber-400 mt-1">→</span>
                        <span><b class="text-amber-300">Swing Low AVWAP</b>: Anchored to the most recent major low</span>
                    </li>
                </ul>
                <div class="bg-black/30 p-3 rounded-lg border border-cyan-500/10 mt-4">
                    <p class="text-xs text-cyan-200">When price approaches an area where <b>multiple AVWAPs converge</b>, expect a strong reaction. That zone represents overlapping cost bases of different market participants.</p>
                </div>
            </div>

            <!-- Trend Persistence Module -->
            <div class="bg-gradient-to-br from-emerald-900/30 to-slate-900/60 p-6 rounded-2xl border border-emerald-500/30 mt-6">
                <h4 class="text-lg font-black text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    The First Law of Technical Analysis
                </h4>
                <div class="bg-black/40 p-4 rounded-xl border border-emerald-500/20 mb-4">
                    <p class="text-base text-emerald-100 font-medium text-center italic">"A trend, once established, is more likely to continue than reverse."</p>
                </div>
                <p class="text-sm text-slate-300 mb-3">This is the foundation of all technical analysis. It's why:</p>
                <ul class="space-y-2 text-sm text-slate-300">
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-400 mt-1">✓</span>
                        <span>We <b>trade with the trend</b>, not against it</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-400 mt-1">✓</span>
                        <span>We <b>buy dips in uptrends</b> and <b>sell rips in downtrends</b></span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-400 mt-1">✓</span>
                        <span>We use AVWAP slope to <b>confirm trend direction</b></span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-400 mt-1">✓</span>
                        <span>Reversals require <b>proof</b>; continuation is the default assumption</span>
                    </li>
                </ul>
                <p class="text-xs text-slate-500 mt-4 italic">"Don't fight the tape. The trend is your friend until it ends."</p>
            </div>

            <!-- Hidden Support/Resistance Module -->
            <div class="bg-gradient-to-br from-amber-900/20 to-cyan-900/20 p-6 rounded-2xl border border-amber-500/30 mt-6">
                <h4 class="text-lg font-black text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h5"/><path d="M17 12h5"/><path d="M12 2v5"/><path d="M12 17v5"/><circle cx="12" cy="12" r="4"/></svg>
                    AVWAP: Hidden Support & Resistance
                </h4>
                <p class="text-sm text-slate-300 mb-4">
                    Traditional support and resistance are drawn from <b>price alone</b>—previous highs, lows, and consolidation zones. But AVWAP reveals <span class="text-amber-400 font-semibold">invisible levels</span> that don't appear on any chart.
                </p>
                <div class="bg-black/30 p-4 rounded-xl border border-amber-500/20 mb-4">
                    <p class="text-sm text-amber-200 font-medium mb-2">Why are these levels hidden?</p>
                    <p class="text-xs text-slate-400 leading-relaxed">
                        Because they represent the <b class="text-cyan-300">average cost basis</b> of all participants since a specific event—not a price level the stock has touched. When price approaches an AVWAP, traders who entered since that anchor point are either <span class="text-emerald-400">profitable or underwater</span>. This psychological pressure creates real support and resistance.
                    </p>
                </div>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                        <span class="text-emerald-400 font-bold block mb-1">Hidden Support</span>
                        <span class="text-slate-300 text-xs">When price pulls back to an upsloping AVWAP, buyers defend their profitable positions. This support level exists <i>nowhere</i> on the price chart.</span>
                    </div>
                    <div class="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                        <span class="text-rose-400 font-bold block mb-1">Hidden Resistance</span>
                        <span class="text-slate-300 text-xs">When price rallies to a downsloping AVWAP, trapped longs sell to "get back to even." This resistance is invisible to those who don't use AVWAP.</span>
                    </div>
                </div>
                <p class="text-xs text-slate-500 mt-4 italic">"The most powerful levels are the ones nobody else can see."</p>
            </div>

            <!-- Quote -->
            <div class="mt-12 mb-8 text-center group cursor-pointer ht-quote-container">
                <p class="text-2xl md:text-3xl font-serif italic text-slate-400 relative inline-block">
                    <span class="ht-quote-base transition-opacity duration-700">"Don't buy the dip; buy evidence of strength after the dip."</span>
                    <span class="ht-quote-gold absolute left-0 top-0 text-amber-400 opacity-0 transition-all duration-700" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.5)); background: linear-gradient(90deg, #fbbf24 0%, #fbbf24 50%, transparent 50%); background-size: 200% 100%; background-position: 100% 0; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">"Don't buy the dip; buy evidence of strength after the dip."</span>
                </p>
            </div>
            <style>
                .ht-quote-container:hover .ht-quote-gold {
                    opacity: 1 !important;
                    background-position: 0% 0 !important;
                    transition: background-position 1.5s ease-out, opacity 0.6s !important;
                }
            </style>

            <!-- TRADING WITH AVWAP TRENDS -->
            <div class="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-2 border-indigo-500/40 p-6 rounded-2xl mt-8">
                <div class="flex items-center gap-3 mb-4">
                    <svg class="w-8 h-8 text-indigo-400" style="filter: drop-shadow(0 0 8px rgba(99,102,241,0.8));" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                    <h3 class="text-2xl font-black text-white">TRADING WITH AVWAP TRENDS</h3>
                </div>

                <p class="text-slate-300 text-sm mb-6">AVWAP tells you who's winning: buyers or sellers. Here's how to use it for directional trades:</p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Price ABOVE AVWAP = Bullish -->
                    <div class="bg-slate-900/60 border-2 border-emerald-500/40 rounded-xl p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
                                <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"/>
                                </svg>
                            </div>
                            <h4 class="text-emerald-400 font-bold">Price ABOVE AVWAP = Buyers Winning</h4>
                        </div>

                        <p class="text-slate-300 text-sm mb-4 italic">
                            When price stays above AVWAP, the average buyer is in profit. This creates momentum as more buyers pile in.
                        </p>

                        <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700 space-y-2">
                            <h5 class="text-emerald-400 font-bold text-xs mb-2 uppercase">Bullish Strategies:</h5>
                            <div class="text-slate-300 text-xs space-y-1.5">
                                <div class="flex items-start gap-2">
                                    <span class="text-emerald-500">▸</span>
                                    <span><b class="text-white">Long Call</b> - Pure bullish bet with defined risk</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-emerald-500">▸</span>
                                    <span><b class="text-white">Bull Put Spread</b> - Sell fear at AVWAP pullbacks</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-emerald-500">▸</span>
                                    <span><b class="text-white">Call Debit Spread</b> - Lower cost, capped upside</span>
                                </div>
                            </div>
                        </div>

                        <div class="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3 mt-3">
                            <p class="text-emerald-300 text-xs"><b>Entry Trigger:</b> Wait for price to pull back TO AVWAP (dip buy opportunity), then bounce. That's your signal the trend is intact.</p>
                        </div>
                    </div>

                    <!-- Price BELOW AVWAP = Bearish -->
                    <div class="bg-slate-900/60 border-2 border-rose-500/40 rounded-xl p-5">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="p-2 rounded-lg bg-rose-500/20 border border-rose-500/50">
                                <svg class="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </div>
                            <h4 class="text-rose-400 font-bold">Price BELOW AVWAP = Sellers Winning</h4>
                        </div>

                        <p class="text-slate-300 text-sm mb-4 italic">
                            When price stays below AVWAP, the average buyer is underwater. This creates selling pressure as stop losses trigger.
                        </p>

                        <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700 space-y-2">
                            <h5 class="text-rose-400 font-bold text-xs mb-2 uppercase">Bearish Strategies:</h5>
                            <div class="text-slate-300 text-xs space-y-1.5">
                                <div class="flex items-start gap-2">
                                    <span class="text-rose-500">▸</span>
                                    <span><b class="text-white">Long Put</b> - Pure bearish bet with defined risk</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-rose-500">▸</span>
                                    <span><b class="text-white">Bear Call Spread</b> - Fade rallies back to AVWAP</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-rose-500">▸</span>
                                    <span><b class="text-white">Put Debit Spread</b> - Lower cost, capped downside</span>
                                </div>
                            </div>
                        </div>

                        <div class="bg-rose-900/20 border border-rose-500/30 rounded-lg p-3 mt-3">
                            <p class="text-rose-300 text-xs"><b>Entry Trigger:</b> Wait for price to rally UP to AVWAP (dead cat bounce), then reject. That's your signal the downtrend continues.</p>
                        </div>
                    </div>
                </div>

                <!-- Key Rules -->
                <div class="mt-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/40 rounded-xl p-5">
                    <h4 class="text-purple-300 font-bold mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <line x1="9" x2="15" y1="9" y2="9"/>
                            <line x1="9" x2="15" y1="15" y2="15"/>
                        </svg>
                        The Three Rules of AVWAP Trading
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div class="bg-slate-900/40 rounded-lg p-3 border border-slate-700">
                            <div class="text-amber-400 font-bold mb-2">1. Direction Filter</div>
                            <p class="text-slate-300">Above AVWAP? Only look for LONGS. Below AVWAP? Only look for SHORTS. Don't fight the tape.</p>
                        </div>
                        <div class="bg-slate-900/40 rounded-lg p-3 border border-slate-700">
                            <div class="text-amber-400 font-bold mb-2">2. Pullback Entry</div>
                            <p class="text-slate-300">Best entries happen when price touches AVWAP and bounces (bullish) or rejects (bearish). That's where institutional orders sit.</p>
                        </div>
                        <div class="bg-slate-900/40 rounded-lg p-3 border border-slate-700">
                            <div class="text-amber-400 font-bold mb-2">3. Crossover Exit</div>
                            <p class="text-slate-300">If price crosses AVWAP against your trade (breaks above when you're short, or below when you're long), exit. The tide has turned.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
        analogy: "Imagine a tug-of-war started at a specific moment (the Anchor). AVWAP is the flag in the middle. It shows exactly who is winning the war regarding that specific battle.",
        nuance: "<b>Relevance over Ritual:</b> Don't just place anchors randomly. Anchor them to the 'Scene of the Crime'—where the high volume institutional activity occurred (e.g., the day of a massive gap up).",
        example: ""
    },,
    {
        id: 'avoid-biases',
        tier: 1,
        tierName: 'Market Structure',
        name: 'Avoid Biases',
        outlook: 'Psychology',
        objective: 'Behavioral Awareness',
        risk: 'Cognitive',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <style>
            .anchoring-container {
                --bg-color: transparent;
                --card-bg: rgba(15, 23, 42, 0.6);
                --text-primary: #e0e0e0;
                --text-secondary: #94a3b8;
                --accent-orange: #f97316;
                --accent-orange-dim: rgba(249, 115, 22, 0.2);
                --accent-red: #f43f5e;
                --accent-green: #10b981;
                --font-mono: 'JetBrains Mono', monospace;
                --font-sans: 'Inter', sans-serif;
                color: var(--text-primary);
                font-family: var(--font-sans);
                line-height: 1.6;
            }

            .anchoring-container header {
                text-align: center;
                margin-bottom: 50px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .anchoring-container h1 {
                font-family: var(--font-mono);
                color: var(--accent-orange);
                font-size: 2.5rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 10px;
                text-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
            }

            .anchoring-container .tagline {
                color: var(--text-secondary);
                font-size: 1.1rem;
                font-style: italic;
                max-width: 700px;
                margin: 0 auto;
            }

            .anchor-icon-hero {
                margin: 30px auto;
                width: 120px;
                height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: anchor-float 3s ease-in-out infinite;
            }

            @keyframes anchor-float {
                0%, 100% { transform: translateY(0) rotate(-5deg); }
                50% { transform: translateY(-15px) rotate(5deg); }
            }

            .definition-box {
                background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(15, 23, 42, 0.8));
                border: 2px solid rgba(249, 115, 22, 0.4);
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 50px;
                position: relative;
                overflow: hidden;
            }

            .definition-box::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, transparent, var(--accent-orange), transparent);
            }

            .definition-box h2 {
                font-family: var(--font-mono);
                color: var(--accent-orange);
                font-size: 1.4rem;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .definition-box p {
                font-size: 1.1rem;
                line-height: 1.8;
            }

            .examples-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 25px;
                margin-bottom: 50px;
            }

            .example-card {
                background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.6));
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 25px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .example-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0), rgba(249, 115, 22, 0));
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .example-card:hover::before {
                background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15), transparent 70%);
                opacity: 1;
            }

            .example-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: rgba(249, 115, 22, 0.6);
                box-shadow:
                    0 15px 50px rgba(249, 115, 22, 0.25),
                    0 0 30px rgba(249, 115, 22, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .example-card .card-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
            }

            .example-card h3 {
                font-family: var(--font-mono);
                color: var(--accent-orange);
                font-size: 1.1rem;
                text-transform: uppercase;
                margin-bottom: 12px;
            }

            .example-card p {
                color: var(--text-secondary);
                font-size: 0.95rem;
            }

            .example-card .bad-example {
                color: var(--accent-red);
                font-weight: 600;
            }

            .example-card .good-example {
                color: var(--accent-green);
                font-weight: 600;
            }

            .why-avoid-section {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.08), transparent);
                border-top: 2px solid rgba(244, 63, 94, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
                margin-bottom: 40px;
            }

            .why-avoid-section h2 {
                font-family: var(--font-mono);
                color: var(--accent-red);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .danger-list {
                list-style: none;
                padding: 0;
                display: grid;
                gap: 15px;
            }

            .danger-list li {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                padding: 15px 20px;
                background: rgba(244, 63, 94, 0.08);
                border-left: 3px solid var(--accent-red);
                border-radius: 0 12px 12px 0;
            }

            .danger-list li svg {
                flex-shrink: 0;
                color: var(--accent-red);
            }

            .solution-section {
                background: linear-gradient(180deg, rgba(16, 185, 129, 0.08), transparent);
                border-top: 2px solid rgba(16, 185, 129, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
            }

            .solution-section h2 {
                font-family: var(--font-mono);
                color: var(--accent-green);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .solution-list {
                list-style: none;
                padding: 0;
                display: grid;
                gap: 15px;
            }

            .solution-list li {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                padding: 15px 20px;
                background: rgba(16, 185, 129, 0.08);
                border-left: 3px solid var(--accent-green);
                border-radius: 0 12px 12px 0;
            }

            .solution-list li svg {
                flex-shrink: 0;
                color: var(--accent-green);
            }

            .quote-footer {
                text-align: center;
                padding: 40px 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 40px;
            }

            .quote-footer blockquote {
                font-size: 1.3rem;
                font-style: italic;
                color: var(--text-secondary);
                max-width: 600px;
                margin: 0 auto 15px;
            }

            .quote-footer cite {
                color: var(--accent-orange);
                font-family: var(--font-mono);
                font-size: 0.9rem;
            }

            /* BIAS SECTION DIVIDER */
            .bias-section-divider {
                margin: 80px 0 60px;
                text-align: center;
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .bias-section-divider::before {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 50%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: all 0.3s ease;
            }

            .bias-section-divider:hover::before {
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
                box-shadow: 0 0 20px rgba(255,255,255,0.3);
            }

            .bias-section-divider span {
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
                padding: 8px 30px;
                position: relative;
                color: var(--text-secondary);
                font-family: var(--font-mono);
                text-transform: uppercase;
                letter-spacing: 3px;
                font-size: 0.8rem;
                border-radius: 20px;
                border: 1px solid transparent;
                transition: all 0.3s ease;
            }

            .bias-section-divider:hover span {
                color: #fff;
                border-color: rgba(255, 255, 255, 0.3);
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }

            /* CONFIRMATION BIAS STYLES */
            .confirmation-header {
                text-align: center;
                margin-bottom: 50px;
            }

            .confirmation-header h2 {
                font-family: var(--font-mono);
                color: #8b5cf6;
                font-size: 2rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 10px;
                text-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
            }

            .confirmation-header .tagline {
                color: var(--text-secondary);
                font-size: 1rem;
                font-style: italic;
            }

            .confirmation-icon-hero {
                margin: 30px auto;
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: confirmation-pulse 2s ease-in-out infinite;
            }

            @keyframes confirmation-pulse {
                0%, 100% { transform: scale(1); opacity: 0.9; }
                50% { transform: scale(1.1); opacity: 1; }
            }

            .confirmation-definition-box {
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(15, 23, 42, 0.8));
                border: 2px solid rgba(139, 92, 246, 0.4);
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 50px;
                position: relative;
                overflow: hidden;
            }

            .confirmation-definition-box::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, transparent, #8b5cf6, transparent);
            }

            .confirmation-definition-box h3 {
                font-family: var(--font-mono);
                color: #8b5cf6;
                font-size: 1.4rem;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .confirmation-card {
                background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.6));
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 25px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .confirmation-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0), rgba(139, 92, 246, 0));
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .confirmation-card:hover::before {
                background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%);
                opacity: 1;
            }

            .confirmation-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: rgba(139, 92, 246, 0.6);
                box-shadow:
                    0 15px 50px rgba(139, 92, 246, 0.25),
                    0 0 30px rgba(139, 92, 246, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .confirmation-card .card-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
            }

            .confirmation-card h3 {
                font-family: var(--font-mono);
                color: #8b5cf6;
                font-size: 1.1rem;
                text-transform: uppercase;
                margin-bottom: 12px;
            }

            .confirmation-card p {
                color: var(--text-secondary);
                font-size: 0.95rem;
            }

            .confirmation-why-avoid {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.08), transparent);
                border-top: 2px solid rgba(244, 63, 94, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
                margin-bottom: 40px;
            }

            .confirmation-why-avoid h3 {
                font-family: var(--font-mono);
                color: var(--accent-red);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .confirmation-solution {
                background: linear-gradient(180deg, rgba(16, 185, 129, 0.08), transparent);
                border-top: 2px solid rgba(16, 185, 129, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
            }

            .confirmation-solution h3 {
                font-family: var(--font-mono);
                color: var(--accent-green);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .confirmation-quote-footer {
                text-align: center;
                padding: 40px 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 40px;
            }

            .confirmation-quote-footer blockquote {
                font-size: 1.3rem;
                font-style: italic;
                color: var(--text-secondary);
                max-width: 600px;
                margin: 0 auto 15px;
            }

            .confirmation-quote-footer cite {
                color: #8b5cf6;
                font-family: var(--font-mono);
                font-size: 0.9rem;
            }

            /* LOSS AVERSION STYLES */
            .loss-aversion-header {
                text-align: center;
                margin-bottom: 50px;
            }

            .loss-aversion-header h2 {
                font-family: var(--font-mono);
                color: #ef4444;
                font-size: 2rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 10px;
                text-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
            }

            .loss-aversion-header .tagline {
                color: var(--text-secondary);
                font-size: 1rem;
                font-style: italic;
            }

            .loss-aversion-icon-hero {
                margin: 30px auto;
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: loss-shake 0.5s ease-in-out infinite;
            }

            @keyframes loss-shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-3px) rotate(-2deg); }
                75% { transform: translateX(3px) rotate(2deg); }
            }

            .loss-aversion-definition-box {
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(15, 23, 42, 0.8));
                border: 2px solid rgba(239, 68, 68, 0.4);
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 50px;
                position: relative;
                overflow: hidden;
            }

            .loss-aversion-definition-box::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, transparent, #ef4444, transparent);
            }

            .loss-aversion-definition-box h3 {
                font-family: var(--font-mono);
                color: #ef4444;
                font-size: 1.4rem;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .loss-aversion-card {
                background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.6));
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 25px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .loss-aversion-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0), rgba(239, 68, 68, 0));
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .loss-aversion-card:hover::before {
                background: radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.15), transparent 70%);
                opacity: 1;
            }

            .loss-aversion-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: rgba(239, 68, 68, 0.6);
                box-shadow:
                    0 15px 50px rgba(239, 68, 68, 0.25),
                    0 0 30px rgba(239, 68, 68, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .loss-aversion-card .card-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
            }

            .loss-aversion-card h3 {
                font-family: var(--font-mono);
                color: #ef4444;
                font-size: 1.1rem;
                text-transform: uppercase;
                margin-bottom: 12px;
            }

            .loss-aversion-card p {
                color: var(--text-secondary);
                font-size: 0.95rem;
            }

            .loss-aversion-why-avoid {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.08), transparent);
                border-top: 2px solid rgba(244, 63, 94, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
                margin-bottom: 40px;
            }

            .loss-aversion-why-avoid h3 {
                font-family: var(--font-mono);
                color: var(--accent-red);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .loss-aversion-solution {
                background: linear-gradient(180deg, rgba(16, 185, 129, 0.08), transparent);
                border-top: 2px solid rgba(16, 185, 129, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
            }

            .loss-aversion-solution h3 {
                font-family: var(--font-mono);
                color: var(--accent-green);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .loss-aversion-quote-footer {
                text-align: center;
                padding: 40px 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 40px;
            }

            .loss-aversion-quote-footer blockquote {
                font-size: 1.3rem;
                font-style: italic;
                color: var(--text-secondary);
                max-width: 600px;
                margin: 0 auto 15px;
            }

            .loss-aversion-quote-footer cite {
                color: #ef4444;
                font-family: var(--font-mono);
                font-size: 0.9rem;
            }

            /* RECENCY BIAS STYLES */
            .recency-bias-header {
                text-align: center;
                margin-bottom: 50px;
            }

            .recency-bias-header h2 {
                font-family: var(--font-mono);
                color: #06b6d4;
                font-size: 2rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 10px;
                text-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
            }

            .recency-bias-header .tagline {
                color: var(--text-secondary);
                font-size: 1rem;
                font-style: italic;
            }

            .recency-bias-icon-hero {
                margin: 30px auto;
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: recency-tick 1s steps(1) infinite;
            }

            @keyframes recency-tick {
                0%, 50% { transform: rotate(0deg); }
                50.1%, 100% { transform: rotate(6deg); }
            }

            .recency-bias-definition-box {
                background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(15, 23, 42, 0.8));
                border: 2px solid rgba(6, 182, 212, 0.4);
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 50px;
                position: relative;
                overflow: hidden;
            }

            .recency-bias-definition-box::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, transparent, #06b6d4, transparent);
            }

            .recency-bias-definition-box h3 {
                font-family: var(--font-mono);
                color: #06b6d4;
                font-size: 1.4rem;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .recency-bias-card {
                background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.6));
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 25px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .recency-bias-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0), rgba(6, 182, 212, 0));
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .recency-bias-card:hover::before {
                background: radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15), transparent 70%);
                opacity: 1;
            }

            .recency-bias-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: rgba(6, 182, 212, 0.6);
                box-shadow:
                    0 15px 50px rgba(6, 182, 212, 0.25),
                    0 0 30px rgba(6, 182, 212, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .recency-bias-card .card-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
            }

            .recency-bias-card h3 {
                font-family: var(--font-mono);
                color: #06b6d4;
                font-size: 1.1rem;
                text-transform: uppercase;
                margin-bottom: 12px;
            }

            .recency-bias-card p {
                color: var(--text-secondary);
                font-size: 0.95rem;
            }

            .recency-bias-why-avoid {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.08), transparent);
                border-top: 2px solid rgba(244, 63, 94, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
                margin-bottom: 40px;
            }

            .recency-bias-why-avoid h3 {
                font-family: var(--font-mono);
                color: var(--accent-red);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .recency-bias-solution {
                background: linear-gradient(180deg, rgba(16, 185, 129, 0.08), transparent);
                border-top: 2px solid rgba(16, 185, 129, 0.3);
                padding: 40px 30px;
                border-radius: 0 0 20px 20px;
            }

            .recency-bias-solution h3 {
                font-family: var(--font-mono);
                color: var(--accent-green);
                font-size: 1.5rem;
                text-transform: uppercase;
                margin-bottom: 25px;
                text-align: center;
            }

            .recency-bias-quote-footer {
                text-align: center;
                padding: 40px 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin-top: 40px;
            }

            .recency-bias-quote-footer blockquote {
                font-size: 1.3rem;
                font-style: italic;
                color: var(--text-secondary);
                max-width: 600px;
                margin: 0 auto 15px;
            }

            .recency-bias-quote-footer cite {
                color: #06b6d4;
                font-family: var(--font-mono);
                font-size: 0.9rem;
            }
        </style>

        <div class="anchoring-container">
            <header>
                <div class="anchor-icon-hero">
                    <svg class="w-24 h-24 text-orange-500" style="filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="5" r="3"/>
                        <line x1="12" y1="8" x2="12" y2="21"/>
                        <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
                    </svg>
                </div>
                <h1>Avoid Biases</h1>
                <p class="tagline">Cognitive traps that sabotage your trading — and how to break free</p>
            </header>

            <div class="anchoring-pane definition-box" style="transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s ease;">
                <h2>
                    <svg class="w-6 h-6" style="filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="21"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>
                    What is Anchoring Bias?
                </h2>
                <p>
                    <strong>Anchoring bias</strong> is a cognitive trap where investors fixate on a specific reference point — often <span style="color: var(--accent-orange); font-weight: bold;">an irrelevant number</span> — and make all subsequent decisions based on that anchor instead of current market reality.
                </p>
                <p style="margin-top: 15px;">
                    First identified by psychologists Tversky and Kahneman, anchoring causes investors to place <em>disproportionate weight</em> on the first piece of information they encounter, even when that information has no predictive value for future price movements.
                </p>
            </div>

            <h2 style="font-family: var(--font-mono); color: #94a3b8; text-align: center; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 2px;">Common Anchoring Traps</h2>

            <div class="examples-grid">
                <div class="anchoring-card example-card">
                    <div class="card-icon">💰</div>
                    <h3>Purchase Price Anchor</h3>
                    <p>You bought NVDA at $500. It drops to $300. You refuse to sell because you're anchored to your entry price, waiting to "get back to even."</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> The stock doesn't know your cost basis. It may never return to $500.</p>
                </div>

                <div class="anchoring-card example-card">
                    <div class="card-icon">📈</div>
                    <h3>All-Time High Anchor</h3>
                    <p>A stock peaked at $200 and now trades at $80. It feels "cheap" because you're comparing to the high.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Price is only cheap relative to <em>value</em>, not to arbitrary historical levels.</p>
                </div>

                <div class="anchoring-card example-card">
                    <div class="card-icon">🎯</div>
                    <h3>Analyst Target Anchor</h3>
                    <p>An analyst sets a $150 target. The stock hits $145 and you hold for that last $5, only to watch it collapse back to $100.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Analyst targets are opinions, not guarantees. Take profits when the trade thesis is fulfilled.</p>
                </div>

                <div class="anchoring-card example-card">
                    <div class="card-icon">⚡</div>
                    <h3>52-Week Range Anchor</h3>
                    <p>You see a stock "near its 52-week low" and assume it must bounce. You ignore that fundamentals have changed.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> 52-week lows can become 5-year lows. Price ranges tell you nothing about future direction.</p>
                </div>
            </div>

            <div class="anchoring-pane why-avoid-section">
                <h2>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Why Anchoring Destroys Portfolios
                </h2>
                <ul class="danger-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Prevents rational exit decisions</strong> — You hold losers hoping to "get back to even" while the position bleeds capital.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Creates false valuation signals</strong> — "It was worth $200 before, so it's a bargain at $50" ignores why it fell.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Ignores opportunity cost</strong> — Capital stuck in a losing position can't compound in winning positions.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Leads to averaging down recklessly</strong> — Buying more of a falling stock because it's "cheaper than before" compounds losses.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Blinds you to changing fundamentals</strong> — The world changed, but you're still trading against an obsolete reference point.</div>
                    </li>
                </ul>
            </div>

            <div class="anchoring-pane solution-section">
                <h2>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    How to Break Free from the Anchor
                </h2>
                <ul class="solution-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Ask: "Would I buy this today at this price?"</strong> — If not, you shouldn't hold it either. Your entry price is irrelevant.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Focus on forward-looking analysis</strong> — What matters is future earnings, cash flow, and market conditions—not historical prices.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Set exit rules BEFORE entry</strong> — Define your stop-loss and profit targets before you buy, based on technicals and thesis, not emotions.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Use a trade journal</strong> — Document your decision rationale. Review it when anchoring tempts you to abandon your strategy.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Practice "fresh eyes" analysis</strong> — Regularly pretend you have no position. Evaluate each holding as if seeing it for the first time.</div>
                    </li>
                </ul>
            </div>

            <div class="anchoring-pane quote-footer">
                <blockquote>"The market doesn't care what you paid. It only cares what it's worth today."</blockquote>
                <cite>— Trading Wisdom</cite>
            </div>

            <!-- CONFIRMATION BIAS SECTION -->
            <div class="bias-section-divider">
                <span>Next Cognitive Trap</span>
            </div>

            <div class="confirmation-header">
                <div class="confirmation-icon-hero">
                    <svg class="w-20 h-20" style="color: #8b5cf6; filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                        <path d="M11 8v6"/>
                        <path d="M8 11h6"/>
                    </svg>
                </div>
                <h2>Confirmation Bias</h2>
                <p class="tagline">The echo chamber in your mind — hearing only what you want to hear</p>
            </div>

            <div class="confirmation-pane confirmation-definition-box" style="transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s ease;">
                <h3>
                    <svg class="w-6 h-6" style="color: #8b5cf6; filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    What is Confirmation Bias?
                </h3>
                <p>
                    <strong>Confirmation bias</strong> is the tendency to search for, interpret, and remember information in a way that <span style="color: #8b5cf6; font-weight: bold;">confirms your pre-existing beliefs</span> — while ignoring or dismissing evidence that contradicts them.
                </p>
                <p style="margin-top: 15px;">
                    In trading, this manifests as seeking out bullish news for stocks you own, following only analysts who agree with your thesis, and rationalizing away red flags. Your brain becomes a <em>filter that only lets through what you want to see</em>.
                </p>
            </div>

            <h2 style="font-family: var(--font-mono); color: #94a3b8; text-align: center; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 2px;">Common Confirmation Traps</h2>

            <div class="examples-grid">
                <div class="confirmation-card">
                    <div class="card-icon">🔍</div>
                    <h3>Selective Research</h3>
                    <p>You're bullish on TSLA, so you only read positive Tesla news and follow bull-case analysts. Negative reports? You scroll past them.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> You're building a case, not seeking truth. The bear thesis may have critical info you're missing.</p>
                </div>

                <div class="confirmation-card">
                    <div class="card-icon">💬</div>
                    <h3>Echo Chamber Effect</h3>
                    <p>Your Twitter feed, Discord servers, and Reddit subs are all bullish on your positions. "Everyone agrees this is a winner!"</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Algorithms feed you what you engage with. You've built a bubble, not found consensus.</p>
                </div>

                <div class="confirmation-card">
                    <div class="card-icon">🎯</div>
                    <h3>Thesis Rationalization</h3>
                    <p>Your stock misses earnings. "It's a buying opportunity!" It loses a major contract. "They'll find another!" Every negative becomes a positive.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> You're not analyzing—you're rationalizing. Your thesis should evolve with facts, not despite them.</p>
                </div>

                <div class="confirmation-card">
                    <div class="card-icon">📊</div>
                    <h3>Chart Pattern Cherry-Picking</h3>
                    <p>You see a bullish pattern because you want to. You ignore the three bearish signals on the same chart because they don't fit your narrative.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Technical analysis requires objectivity. If you only see what you want, you're not analyzing—you're hoping.</p>
                </div>
            </div>

            <div class="confirmation-pane confirmation-why-avoid">
                <h3>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Why Confirmation Bias Destroys Portfolios
                </h3>
                <ul class="danger-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Blind spots become catastrophes</strong> — The risk you refuse to see is the one that destroys your position.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Overconfidence leads to oversized positions</strong> — When you only hear bullish voices, you convince yourself to bet bigger.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Delays necessary exits</strong> — You hold through warning signs because you've filtered them out of your awareness.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Stunts learning and growth</strong> — If you only validate your wins and explain away losses, you never improve.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Creates false conviction</strong> — Feeling certain doesn't make you right—it often means you've stopped questioning.</div>
                    </li>
                </ul>
            </div>

            <div class="confirmation-pane confirmation-solution">
                <h3>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    How to Break Free from the Echo Chamber
                </h3>
                <ul class="solution-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Actively seek the bear case</strong> — For every position, find the best argument against it. If you can't steelman the opposition, you don't understand your trade.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Follow analysts who disagree</strong> — Intentionally diversify your information sources. The uncomfortable opinions are often the most valuable.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Pre-define what would prove you wrong</strong> — Before entering, write down: "I'll exit if X happens." This commits you to objective criteria.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Review losing trades honestly</strong> — Ask: "What did I ignore? What signals did I dismiss?" The patterns will reveal your blind spots.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Use a devil's advocate process</strong> — Before any trade, force yourself to argue the opposite side for 5 minutes. If you can't, reconsider.</div>
                    </li>
                </ul>
            </div>

            <div class="confirmation-pane confirmation-quote-footer">
                <blockquote>"The first principle is that you must not fool yourself — and you are the easiest person to fool."</blockquote>
                <cite>— Richard Feynman</cite>
            </div>

            <!-- LOSS AVERSION SECTION -->
            <div class="bias-section-divider">
                <span>The Pain Multiplier</span>
            </div>

            <div class="loss-aversion-header">
                <div class="loss-aversion-icon-hero">
                    <svg class="w-20 h-20" style="color: #ef4444; filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                </div>
                <h2>Loss Aversion</h2>
                <p class="tagline">Why losing $100 hurts twice as much as gaining $100 feels good</p>
            </div>

            <div class="loss-aversion-pane loss-aversion-definition-box" style="transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s ease;">
                <h3>
                    <svg class="w-6 h-6" style="color: #ef4444; filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    What is Loss Aversion?
                </h3>
                <p>
                    <strong>Loss aversion</strong> is the psychological phenomenon where the <span style="color: #ef4444; font-weight: bold;">pain of losing is psychologically twice as powerful</span> as the pleasure of gaining. A $1,000 loss feels far worse than a $1,000 gain feels good.
                </p>
                <p style="margin-top: 15px;">
                    Discovered by Kahneman and Tversky, loss aversion explains why traders hold losing positions too long (to avoid realizing the pain) and sell winners too early (to lock in the pleasure). It's the reason most traders <em>do the exact opposite</em> of what they should.
                </p>
            </div>

            <h2 style="font-family: var(--font-mono); color: #94a3b8; text-align: center; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 2px;">How Loss Aversion Manifests</h2>

            <div class="examples-grid">
                <div class="loss-aversion-card">
                    <div class="card-icon">😰</div>
                    <h3>Holding Losers Too Long</h3>
                    <p>Your stock drops 20%. Instead of cutting losses, you hold—because selling makes the loss "real." You'd rather live in denial than face the pain.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> The loss is already real. Your account balance doesn't care if you've "realized" it or not.</p>
                </div>

                <div class="loss-aversion-card">
                    <div class="card-icon">🏃</div>
                    <h3>Selling Winners Too Early</h3>
                    <p>Your stock is up 15%. You sell immediately to "lock in gains" before they disappear. Meanwhile, the stock runs another 50%.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> You're trading to feel good, not to maximize returns. Winners should run; losers should be cut.</p>
                </div>

                <div class="loss-aversion-card">
                    <div class="card-icon">🎰</div>
                    <h3>Revenge Trading</h3>
                    <p>After a loss, you immediately enter another trade to "make it back." You're not analyzing—you're trying to erase the pain as fast as possible.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Emotional trades compound losses. The market doesn't owe you a recovery.</p>
                </div>

                <div class="loss-aversion-card">
                    <div class="card-icon">📉</div>
                    <h3>Averaging Down Recklessly</h3>
                    <p>Your position is underwater, so you buy more to lower your average. "Now I only need it to go up 10% instead of 20% to break even!"</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> You're doubling down on a losing thesis. Smart money cuts losers; it doesn't marry them.</p>
                </div>
            </div>

            <div class="loss-aversion-pane loss-aversion-why-avoid">
                <h3>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Why Loss Aversion Destroys Portfolios
                </h3>
                <ul class="danger-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Inverts optimal behavior</strong> — You do the opposite of "cut losers, let winners run." Instead, you cut winners and let losers bleed.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Destroys risk/reward ratios</strong> — Taking small wins and big losses is a mathematical path to ruin, regardless of win rate.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Triggers emotional spirals</strong> — Revenge trading after losses leads to bigger losses, more revenge trading, and account destruction.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Concentrates risk in losers</strong> — By averaging down, you put more capital into your worst ideas instead of your best ones.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Creates paralysis</strong> — Fear of loss can prevent you from taking any trades at all, including high-probability setups.</div>
                    </li>
                </ul>
            </div>

            <div class="loss-aversion-pane loss-aversion-solution">
                <h3>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    How to Overcome Loss Aversion
                </h3>
                <ul class="solution-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Pre-define your stop-loss</strong> — Before entering any trade, decide exactly where you'll exit if wrong. Make it mechanical, not emotional.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Think in probabilities, not outcomes</strong> — A good trade can lose money. A bad trade can make money. Judge decisions by process, not results.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Size positions so losses don't hurt</strong> — If a loss would devastate you emotionally, you're trading too big. Scale down until losses feel manageable.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Reframe losses as tuition</strong> — Every loss teaches something. Extract the lesson, then move on. The cost was the education fee.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Implement a cooling-off period</strong> — After any loss, wait 24 hours before your next trade. Never trade to recover; trade to execute your system.</div>
                    </li>
                </ul>
            </div>

            <div class="loss-aversion-pane loss-aversion-quote-footer">
                <blockquote>"The goal of a successful trader is to make the best trades. Money is secondary."</blockquote>
                <cite>— Alexander Elder</cite>
            </div>

            <!-- RECENCY BIAS SECTION -->
            <div class="bias-section-divider">
                <span>The Memory Distortion</span>
            </div>

            <div class="recency-bias-header">
                <div class="recency-bias-icon-hero">
                    <svg class="w-20 h-20" style="color: #06b6d4; filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </div>
                <h2>Recency Bias</h2>
                <p class="tagline">Why yesterday feels like forever — and why that destroys your trading</p>
            </div>

            <div class="recency-bias-pane recency-bias-definition-box" style="transform-style: preserve-3d; transition: transform 0.1s ease-out, box-shadow 0.3s ease;">
                <h3>
                    <svg class="w-6 h-6" style="color: #06b6d4; filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    What is Recency Bias?
                </h3>
                <p>
                    <strong>Recency bias</strong> is the tendency to <span style="color: #06b6d4; font-weight: bold;">overweight recent events</span> and assume they'll continue indefinitely. What happened last week feels more important than what happened over the last decade.
                </p>
                <p style="margin-top: 15px;">
                    In trading, this manifests as chasing hot stocks after they've already run, panic selling after a dip, or assuming the current trend will last forever. Your brain treats the recent past as a crystal ball for the future—<em>and it's almost always wrong</em>.
                </p>
            </div>

            <h2 style="font-family: var(--font-mono); color: #94a3b8; text-align: center; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 2px;">How Recency Bias Manifests</h2>

            <div class="examples-grid">
                <div class="recency-bias-card">
                    <div class="card-icon">🚀</div>
                    <h3>Chasing Performance</h3>
                    <p>A stock is up 50% this month. You pile in because "it's working." You buy at the top, right before the inevitable pullback.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Past performance doesn't predict future returns. You're buying other people's gains.</p>
                </div>

                <div class="recency-bias-card">
                    <div class="card-icon">📉</div>
                    <h3>Panic After Dips</h3>
                    <p>The market drops 5% in a week. You sell everything because "it's crashing." A month later, it's at new highs without you.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Volatility is normal. Selling after drops locks in losses and misses recoveries.</p>
                </div>

                <div class="recency-bias-card">
                    <div class="card-icon">🔥</div>
                    <h3>Hot Sector FOMO</h3>
                    <p>AI stocks are surging. You abandon your diversified portfolio to go all-in on the hot theme. When it rotates, you're left holding the bag.</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Sector rotations are unpredictable. Today's hot sector is often tomorrow's laggard.</p>
                </div>

                <div class="recency-bias-card">
                    <div class="card-icon">😴</div>
                    <h3>Complacency in Bull Markets</h3>
                    <p>Markets have been up for months. You increase leverage and ignore risk management because "stocks only go up."</p>
                    <p style="margin-top: 10px;"><span class="bad-example">Reality:</span> Bull markets end. The longer the calm, the more violent the correction often is.</p>
                </div>
            </div>

            <div class="recency-bias-pane recency-bias-why-avoid">
                <h3>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Why Recency Bias Destroys Portfolios
                </h3>
                <ul class="danger-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Buy high, sell low</strong> — You chase winners after they've run and dump losers after they've fallen. The exact opposite of profitable trading.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Ignores mean reversion</strong> — Markets tend to revert to the mean. What's hot cools down; what's cold heats up. Recency bias blinds you to this.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Destroys diversification</strong> — Chasing hot sectors concentrates risk in whatever's recently performed best—usually at the worst time.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Amplifies volatility</strong> — You're most aggressive at tops and most fearful at bottoms. Your emotions amplify market swings instead of dampening them.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                        <div><strong>Erases historical perspective</strong> — A 10% correction feels like a crash if you've only known a bull market. Context gets lost in the noise of now.</div>
                    </li>
                </ul>
            </div>

            <div class="recency-bias-pane recency-bias-solution">
                <h3>
                    <svg class="w-6 h-6 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    How to Overcome Recency Bias
                </h3>
                <ul class="solution-list">
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Zoom out on charts</strong> — Before any decision, look at the 5-year and 10-year charts. What seems catastrophic on a daily chart is often noise on a longer timeframe.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Study market history</strong> — Read about past crashes, recoveries, and cycles. What feels unprecedented usually isn't. History provides context that recency steals.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Use a rebalancing schedule</strong> — Commit to rebalancing quarterly or annually. This forces you to trim winners and add to losers—the opposite of what recency bias wants.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Wait before acting</strong> — Implement a 48-hour rule for any trade triggered by recent news or price action. Urgency is usually the enemy.</div>
                    </li>
                    <li>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <div><strong>Base decisions on data, not feelings</strong> — Use valuation metrics, not recent performance. A stock that's up 100% can still be cheap; one that's down 50% can still be expensive.</div>
                    </li>
                </ul>
            </div>

            <div class="recency-bias-pane recency-bias-quote-footer">
                <blockquote>"In the short run, the market is a voting machine. In the long run, it is a weighing machine."</blockquote>
                <cite>— Benjamin Graham</cite>
            </div>
        </div>
        `,
        analogy: "Your brain is a broken compass with a faulty memory. Anchoring chains you to irrelevant numbers. Confirmation builds an echo chamber. Loss aversion doubles every pain. Recency makes yesterday feel like forever. These four biases form a perfect storm that sinks portfolios: you cling to old prices, hear only agreement, fear every loss, and chase whatever just happened. The antidote is systematic discipline that ignores what you feel.",
        nuance: "<b>The Fatal Four:</b> These biases compound. You're anchored to your entry, you only read bullish news, you can't stomach the loss, and the recent price action convinces you to hold. Quadruple-trapped. Or you chase a hot stock because it's been running, confirm your thesis with cherry-picked data, and refuse to sell when it turns because the loss hurts. The cure is rules-based trading that executes regardless of psychology.",
        example: `
        <div class="p-4 bg-slate-800/50 rounded-xl border border-orange-500/20">
            <p class="text-orange-400 font-mono text-sm mb-2">REAL SCENARIO:</p>
            <p class="text-slate-300">You bought COIN at $350 during the crypto hype. It crashes to $50. Anchored to $350, you refuse to sell, thinking "it'll come back." Meanwhile, you could have cut your loss at $200, deployed capital into MSFT at $250, and ridden it to $400.</p>
            <p class="text-slate-400 text-sm mt-3 italic">The anchor cost you both the remaining COIN value AND the MSFT gains. Double penalty.</p>
        </div>
        `
    },
];
