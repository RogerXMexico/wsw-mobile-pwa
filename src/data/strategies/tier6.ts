import { Strategy } from '../../types';

// Time & Skew - Tier 6
export const TIER_6_STRATEGIES: Strategy[] = [
    {
        id: 'calendar-spread', name: 'Calendar Spread', tier: 6, tierName: 'Time/Skew', outlook: 'Neutral', objective: 'Theta Arb', risk: 'Defined', legs: [{ type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">You sell a short-term option to pay for a long-term option at the same strike. You are betting that the short-term option will decay (Theta) faster than the long-term option.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Life of a Calendar Spread</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>AMZN</b> is at $185. You think it will chop around this level for a few weeks. Instead of betting on direction, you want to exploit the difference in how fast options decay. You:</p>
                <ul class="text-slate-300 text-sm mt-2 space-y-1">
                    <li>• <b>Sell the 2-week $185 Call</b> for $4.00 (expires soon, decays fast)</li>
                    <li>• <b>Buy the 6-week $185 Call</b> for $7.00 (expires later, decays slowly)</li>
                </ul>
                <p class="text-slate-400 text-sm mt-2">Net debit: $3.00 ($300). You want the front-month to die while the back-month retains value.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Pin (Perfect Outcome)</h4>
                    <p class="text-slate-400 text-sm mb-2">AMZN stays right at your strike.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> AMZN $185. Front-month worth $4.00. Back-month worth $7.00. Spread worth $3.00.</li>
                        <li><b>Day 7:</b> AMZN $186. Front-month worth $2.50 (decaying fast). Back-month worth $6.20 (decaying slowly). Spread worth $3.70. Unrealized: +$70.</li>
                        <li><b>Day 14 (Front Expiration):</b> AMZN $185. Front-month expires worthless ($0). Back-month worth $5.50 (still has 4 weeks left).</li>
                        <li><b>Result:</b> <span class="text-emerald-400 font-semibold">Spread worth $5.50. Profit: $250 (83% return).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The front-month decayed to zero while the back-month retained most of its value. You now own a $5.50 call that cost you $3.00.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The IV Spike (Surprise Bonus)</h4>
                    <p class="text-slate-400 text-sm mb-2">Volatility increases—calendars love this.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> AMZN $185. IV at 35%. Spread worth $3.00.</li>
                        <li><b>Day 8:</b> Market turmoil! IV spikes to 50%. AMZN at $183.</li>
                        <li><b>Impact:</b> Front-month worth $3.00. Back-month worth $9.00 (IV spike helped the longer-dated option MORE).</li>
                        <li><b>Spread now worth:</b> <span class="text-cyan-400 font-semibold">$6.00. Profit: $300 (100% return).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Calendars are secretly "long vega." When volatility rises, the back-month gains more than the front-month because it has more time for that volatility to matter.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Drift (Stock Moves Away)</h4>
                    <p class="text-slate-400 text-sm mb-2">AMZN drifts away from your strike.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> AMZN $185. Spread worth $3.00.</li>
                        <li><b>Day 7:</b> AMZN rallies to $195. Both options are now ITM. Front-month worth $10.50. Back-month worth $12.50. Spread worth $2.00.</li>
                        <li><b>Day 14:</b> AMZN $198. Front-month worth $13.00. Back-month worth $14.50. Spread worth $1.50.</li>
                        <li><b>Result:</b> <span class="text-yellow-400 font-semibold">Close for $1.50. Loss: -$150.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">When the stock moves far from your strike, both options become "all intrinsic value" and the calendar collapses. You lose the time value differential you were trying to capture.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The IV Crush (Worst Case)</h4>
                    <p class="text-slate-400 text-sm mb-2">Volatility collapses—calendars hate this.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> AMZN $185. IV at 40%. Spread worth $3.00.</li>
                        <li><b>Day 5:</b> Fed meeting removes uncertainty. IV crashes to 25%.</li>
                        <li><b>Impact:</b> Front-month worth $2.00. Back-month worth $4.00. Both crushed, but the back-month lost MORE (it had more vega).</li>
                        <li><b>Spread now worth:</b> <span class="text-red-400 font-semibold">$2.00. Loss: -$100.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The same "long vega" property that helps in Path B hurts you here. When IV drops, your longer-dated option loses more value than the short-dated one.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you're trading TIME, not direction?</b> Calendar spreads exploit <span class="text-cyan-400">theta differential</span>—short-term options decay faster than long-term options. You're arbitraging this decay rate difference.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how volatility mattered more than you'd expect?</b> Calendars are <span class="text-cyan-400">long vega</span>. The back-month has more sensitivity to IV changes. Rising IV helps you; falling IV hurts you.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how the stock moving away killed the trade?</b> Calendars have a "tent" P&L like butterflies. Max profit at the strike, declining as price drifts. The further from strike, the worse it gets.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Calendar spreads are <i>bets on stability + rising IV</i>. Best when you expect a stock to hover around a level while volatility stays elevated or rises. Terrible when stocks trend strongly or IV collapses.</p>
            </div>
        </div>
        `, analogy: "Subletting your apartment for a weekend. You pay monthly rent (long option), but you charge someone else a premium for the weekend (short option). You pocket the difference.", nuance: "<b>Long Vega:</b> Surprisingly, this is a Long Vega trade. If Volatility spikes, the back-month option (which has more Vega) gains more value than the front-month option. <br><br><b>Forward Volatility:</b> You are essentially trading the 'term structure' of volatility. You want the front month Vol to be high and the back month Vol to be stable.", example: "<b>Scenario:</b> <b>AMZN</b> ($180) earnings in 3 weeks. <br><br><b>The Trade:</b> Sell next week's $180 Call ($2.00). Buy next month's $180 Call ($5.00). Net Debit: $3.00. <br><br><b>Win:</b> AMZN holds $180. Short call dies. You own the long call (worth $4.50 due to earnings IV) for net $3.00."
    },,
    {
        id: 'pmcc', name: 'Poor Man\'s Covered Call', tier: 6, tierName: 'Time/Skew', outlook: 'Bullish', objective: 'Leverage', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: -20, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 15, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Instead of buying 100 shares of stock (expensive), you buy one deep In-The-Money LEAPS call (cheap stock substitute). Then you sell short-term calls against it.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 12 Months in the Life of a Poor Man's Covered Call</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>XOM</b> is at $110. You're bullish and want covered call income, but $11,000 for 100 shares is too much capital. Instead, you build a PMCC:</p>
                <ul class="text-slate-300 text-sm mt-2 space-y-1">
                    <li>• <b>Buy Jan 2026 $80 Call (LEAPS)</b> for $33.00 — This is your "stock substitute." It's deep ITM with 0.85 delta, meaning it moves nearly 1:1 with the stock.</li>
                    <li>• <b>Sell next month's $115 Call</b> for $1.50 — This is your income, just like a covered call.</li>
                </ul>
                <p class="text-slate-400 text-sm mt-2">Total investment: $3,150 (vs. $11,000 for actual shares). You'll sell monthly calls against your LEAPS for income.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Grind (Ideal Scenario)</h4>
                    <p class="text-slate-400 text-sm mb-2">XOM drifts sideways or slightly up. You collect month after month.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Month 1:</b> XOM $110 → $112. Short call expires worthless. You keep $150. Sell next month's $117 call for $1.40.</li>
                        <li><b>Month 2:</b> XOM $112 → $109. Short call expires worthless. You keep $140. Sell $114 call for $1.60.</li>
                        <li><b>Month 3:</b> XOM $109 → $113. Short call expires worthless. You keep $160. Sell $118 call for $1.30.</li>
                        <li><b>Month 6:</b> You've collected $900 in premium (6 months × ~$150 avg). LEAPS still worth ~$35 (gained from stock appreciation).</li>
                        <li><b>Month 12:</b> Total premium collected: ~$1,800. <span class="text-emerald-400 font-semibold">Return: 57% on $3,150 invested, vs 16% if you'd held stock.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The magic of PMCC: you're earning covered call yields on 3x less capital. Your return on capital is leveraged.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Rally (Capped but Still Good)</h4>
                    <p class="text-slate-400 text-sm mb-2">XOM rallies hard and blows past your short strike.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Month 1:</b> XOM gaps from $110 to $125 on oil news.</li>
                        <li><b>Your short $115 call:</b> Worth $10. You owe $10.</li>
                        <li><b>Your LEAPS $80 call:</b> Worth $47 (was $33). Gained $14.</li>
                        <li><b>Net position:</b> $47 - $10 - $33 (cost) + $1.50 (premium) = <span class="text-cyan-400 font-semibold">Profit: $5.50 ($550).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You made money, but less than if you'd held the LEAPS alone ($1,400). The short call capped your gains. This is the tradeoff for income.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Decline (LEAPS Bleeds)</h4>
                    <p class="text-slate-400 text-sm mb-2">XOM drops and stays down.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Month 1:</b> XOM $110 → $100. LEAPS drops from $33 to $24. You keep $150 premium from short call.</li>
                        <li><b>Month 3:</b> XOM $100 → $95. LEAPS now $18. You've collected $400 in premium but LEAPS lost $15.</li>
                        <li><b>Month 6:</b> XOM $95 → $90. LEAPS at $14. Premium collected: $750. LEAPS lost $19.</li>
                        <li><b>Net position:</b> LEAPS worth $14 + $7.50 premium - $33 cost = <span class="text-yellow-400 font-semibold">Loss: -$1,150.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The premiums helped, but couldn't overcome the LEAPS decline. This is why PMCC is still a bullish strategy—you need the stock to at least hold steady.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Crash (Max Pain)</h4>
                    <p class="text-slate-400 text-sm mb-2">XOM collapses and your LEAPS becomes worthless.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Month 1:</b> Oil crash. XOM gaps to $75.</li>
                        <li><b>Your LEAPS ($80 strike):</b> Now nearly worthless at $3 (was $33). Deep OTM.</li>
                        <li><b>Premium collected:</b> $150. But LEAPS lost $30.</li>
                        <li><b>Result:</b> <span class="text-red-400 font-semibold">Loss: -$2,850 (lost nearly all of $3,150 investment).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">If XOM had crashed while you held stock, you'd have lost $3,500 on 100 shares. The PMCC lost slightly less, but it's still painful. PMCC doesn't protect against crashes—it just uses less capital.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the capital efficiency?</b> You controlled $11,000 of stock exposure with $3,150. That's roughly <span class="text-cyan-400">3.5:1 leverage</span>. Your returns (and losses) are amplified relative to capital deployed.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice why the LEAPS must be deep ITM?</b> You need high delta (0.80+) so it moves like stock. An ATM LEAPS would have only 0.50 delta—half the movement—and more theta decay eating your position.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the debit risk in Path B?</b> If the stock rallies and your short call goes ITM, you must ensure the spread width (short strike - LEAPS strike) exceeds your total debit. Otherwise, max profit is negative—a "debit trap."</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> PMCC is <i>leveraged covered call income</i>. Best for slow grinders you're mildly bullish on. Avoid on volatile stocks. Always check that your max profit (at short strike) is positive. Roll short calls up/out when threatened.</p>
            </div>
        </div>
        `, analogy: "Renting a house on a 2-year lease (LEAPS) and listing it on Airbnb weekly. You don't own the deed, but you control the asset enough to generate cash flow.", nuance: "<b>Capital Efficiency:</b> You might control $10,000 of stock for $2,000. This is 5:1 leverage. <br><br><b>Debit Risk:</b> Ensure the width between your strikes is greater than the debt paid. Otherwise, if the stock rockets up, you could actually lock in a loss.", example: "<b>Scenario:</b> <b>XOM</b> is $110. You want income but $11k is too much. <br><br><b>The Trade:</b> Buy Jan 2026 $80 Call for $32. Sell Monthly $115 Call for $1.50. Cost $3,050. <br><br><b>Yield:</b> You generate $150/month on a $3k investment (5% monthly yield) if XOM stays flat."
    },,
    {
        id: 'diagonal-spread', name: 'Diagonal Spread', tier: 6, tierName: 'Time/Skew', outlook: 'Directional', objective: 'Time + Direction', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A diagonal spread combines a calendar spread and a vertical spread. You buy a longer-dated option at one strike and sell a shorter-dated option at a different strike. This gives you both time decay arbitrage AND directional exposure.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Life of a Diagonal Spread</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>MSFT</b> is at $420. You're mildly bullish and want to profit from both time decay and a move higher. You build a <b>Call Diagonal</b>:</p>
                <ul class="text-slate-300 text-sm mt-2 space-y-1">
                    <li>• <b>Buy the 45-day $410 Call</b> for $18.00 (slightly ITM, longer-dated)</li>
                    <li>• <b>Sell the 14-day $430 Call</b> for $3.00 (OTM, shorter-dated)</li>
                </ul>
                <p class="text-slate-400 text-sm mt-2">Net debit: $15.00 ($1,500). You want MSFT to drift toward $430 by front-month expiration, then continue higher.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Drift Up (Perfect Outcome)</h4>
                    <p class="text-slate-400 text-sm mb-2">MSFT drifts toward your short strike by expiration.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSFT $420. Front-month $430 call worth $3.00. Back-month $410 call worth $18.00. Spread cost: $15.00.</li>
                        <li><b>Day 7:</b> MSFT $425. Front-month decays to $2.00. Back-month holds at $19.50 (ITM, less decay). Spread worth $17.50.</li>
                        <li><b>Day 14 (Front Expiration):</b> MSFT $429. Front-month expires worthless. Back-month worth $24.00 (31 DTE remaining, deep ITM).</li>
                        <li><b>Result:</b> <span class="text-emerald-400 font-semibold">You own a $24 call that cost you $15. Profit: $900 (60% return).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The stock moved toward your short strike (max theta capture) while your long call gained intrinsic value. The diagonal captured both time AND direction.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Surge (Roll or Close)</h4>
                    <p class="text-slate-400 text-sm mb-2">MSFT rallies hard past your short strike.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSFT $420. Spread worth $15.00.</li>
                        <li><b>Day 7:</b> MSFT gaps to $445 on earnings beat.</li>
                        <li><b>Front-month $430 call:</b> Worth $16 (ITM). Back-month $410 call: Worth $38.</li>
                        <li><b>Spread value:</b> $38 - $16 = $22. <span class="text-cyan-400 font-semibold">Profit: $700.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You made money, but less than if you'd just bought the call ($2,000 gain). The short call capped gains. You can close here or roll the short call higher to capture more upside.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Chop (Theta Works For You)</h4>
                    <p class="text-slate-400 text-sm mb-2">MSFT goes nowhere—but that's okay.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSFT $420. Spread cost $15.00.</li>
                        <li><b>Day 14:</b> MSFT still $420. Front-month $430 call expires worthless ($0). Back-month $410 call worth $15.50 (lost some time value).</li>
                        <li><b>Result:</b> <span class="text-yellow-400 font-semibold">Spread worth $15.50. Small profit: $50.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Unlike a straight long call (which would have lost money from decay), the diagonal's short leg offset the theta. You broke even or made a small profit despite no movement.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Drop (Defined Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">MSFT drops and your long call loses value.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSFT $420. Spread cost $15.00.</li>
                        <li><b>Day 7:</b> Tech selloff. MSFT drops to $395.</li>
                        <li><b>Front-month $430 call:</b> Worth $0.30 (nearly dead). Back-month $410 call: Worth $7.00 (OTM now, bleeding).</li>
                        <li><b>Spread value:</b> $6.70. <span class="text-red-400 font-semibold">Loss: -$830.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Your loss is defined—you can never lose more than the $1,500 debit. The short call premium ($300) reduced your loss slightly, but a big move against you still hurts.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you're trading BOTH time and direction?</b> A diagonal is a <span class="text-cyan-400">hybrid strategy</span>. The different expirations give you theta arbitrage (like a calendar). The different strikes give you delta exposure (like a vertical).</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how Path C didn't lose money?</b> The short call's decay offset the long call's decay. Diagonals are more forgiving than naked long calls when you're wrong about timing.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the "sweet spot" is the short strike?</b> Max profit occurs when the stock lands exactly at your short strike at front-month expiration. You capture full decay on the short AND have an ITM long call with time remaining.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Diagonals are <i>directional bets with a theta cushion</i>. Use them when you have a target price AND believe it will take time to get there. The short option funds your patience.</p>
            </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-violet-400 mb-4">Call Diagonal vs Put Diagonal</h3>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                    <h4 class="text-emerald-400 font-bold mb-2">Call Diagonal (Bullish)</h4>
                    <p class="text-slate-300 text-sm">Buy longer-dated call (lower strike)</p>
                    <p class="text-slate-300 text-sm">Sell shorter-dated call (higher strike)</p>
                    <p class="text-slate-400 text-xs mt-2 italic">Profit if stock rises toward short strike</p>
                </div>
                <div class="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                    <h4 class="text-rose-400 font-bold mb-2">Put Diagonal (Bearish)</h4>
                    <p class="text-slate-300 text-sm">Buy longer-dated put (higher strike)</p>
                    <p class="text-slate-300 text-sm">Sell shorter-dated put (lower strike)</p>
                    <p class="text-slate-400 text-xs mt-2 italic">Profit if stock falls toward short strike</p>
                </div>
            </div>
        </div>
        `, analogy: "Buying a 6-month gym membership at a good rate, then selling day passes to tourists. You profit from the time difference AND you're betting the gym gets more popular (stock rises) so those day passes become more valuable to sell.", nuance: "<b>Strike Selection:</b> The wider the strikes, the more directional the trade. Narrow strikes = more like a calendar (neutral). Wide strikes = more like a vertical (directional). <br><br><b>Delta Consideration:</b> Buy the long option with 0.60-0.70 delta for good directional exposure. Sell the short option with 0.30-0.40 delta for good premium.", example: "<b>Scenario:</b> <b>MSFT</b> ($420) You expect a slow grind to $440 over the next month. <br><br><b>The Trade:</b> Buy 45-DTE $410 Call ($18). Sell 14-DTE $435 Call ($2.50). Net Debit: $15.50. <br><br><b>Target:</b> MSFT at $435 in 2 weeks. Short call expires worthless. Long call worth ~$28. Profit: $12.50 ($1,250)."
    },,
    {
        id: 'double-diagonal', name: 'Double Diagonal', tier: 6, tierName: 'Time/Skew', outlook: 'Neutral', objective: 'Income + Volatility', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A double diagonal combines a call diagonal and a put diagonal into one position. You buy longer-dated options at wider strikes and sell shorter-dated options at narrower strikes. This creates a <span class="text-cyan-400">theta-positive, vega-positive</span> structure that profits from time decay AND potential volatility expansion.</p>

        <div class="bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-violet-400 mb-4">📖 Trade Walkthrough: The Volatility Harvester</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-violet-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>SPY</b> is at $450. You expect it to stay range-bound in the near term but want exposure to a potential volatility spike. You build a <b>Double Diagonal</b>:</p>
                <ul class="text-slate-300 text-sm mt-2 space-y-1">
                    <li>• <b>Buy 45-day $460 Call</b> for $4.00 (OTM, longer-dated)</li>
                    <li>• <b>Sell 14-day $455 Call</b> for $2.50 (OTM, shorter-dated)</li>
                    <li>• <b>Buy 45-day $440 Put</b> for $4.00 (OTM, longer-dated)</li>
                    <li>• <b>Sell 14-day $445 Put</b> for $2.50 (OTM, shorter-dated)</li>
                </ul>
                <p class="text-slate-400 text-sm mt-2">Net debit: $3.00 ($300 per spread). You want SPY to stay between $445-$455 initially, then potentially move toward either wing.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Range-Bound Dream (Best Case)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY chops sideways between your short strikes.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $450. Front-month options worth $5 total. Back-month options worth $8 total. Spread cost: $3.00.</li>
                        <li><b>Day 14 (Front Expiration):</b> SPY $452. Both short options expire worthless. Back-month options worth $6.50 combined (31 DTE remaining).</li>
                        <li><b>Result:</b> <span class="text-emerald-400 font-semibold">You kept $5 in premium, now own $6.50 in long options. Net value: $6.50 on a $3 investment. Profit: $350 (117% return).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The short options melted away while your long options retained most of their value. You can now sell new short options against your longs (rolling the diagonals).</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Breakout (Volatility Pays)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY makes a big move in either direction.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $450. Spread cost $3.00.</li>
                        <li><b>Day 7:</b> Fed surprise—SPY drops to $435.</li>
                        <li><b>Short $445 put:</b> Worth $11. Long $440 put: Worth $9.50. Call side nearly worthless.</li>
                        <li><b>Put diagonal value:</b> -$1.50. But IV spiked—your long put is now worth $12 with elevated vol.</li>
                        <li><b>Close everything:</b> <span class="text-cyan-400 font-semibold">Net profit: ~$200-400 depending on vol spike magnitude.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The long-dated options benefit from volatility expansion (positive vega). Even though the short put went ITM, the vol spike helped your long options more.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Slow Drift (Manageable)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY drifts toward one of your short strikes.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $450. Spread cost $3.00.</li>
                        <li><b>Day 10:</b> SPY drifts to $455 (at short call strike).</li>
                        <li><b>Action:</b> Roll the short call up and out, or close the call diagonal for a profit and let the put diagonal run.</li>
                        <li><b>Result:</b> <span class="text-yellow-400 font-semibold">Typical profit: $100-200 after management.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Double diagonals require active management. When price approaches a short strike, you roll or close that side.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Gap Through (Max Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY gaps hard past your long strikes before front-month expiration.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $450. Spread cost $3.00.</li>
                        <li><b>Day 3:</b> Black swan event—SPY gaps to $420.</li>
                        <li><b>All puts deep ITM:</b> Short $445 put worth ~$25. Long $440 put worth ~$20. Spread underwater by $5.</li>
                        <li><b>Result:</b> <span class="text-red-400 font-semibold">Loss: ~$500-800 depending on how fast you exit.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">When price blows through both strikes on one side, you have a losing spread. The loss is still defined (difference between strikes minus premium), but it hurts. This is why position sizing matters.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-violet-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Double diagonals are "theta + vega" plays.</b> You collect time decay from short options while maintaining exposure to volatility through longer-dated longs.</p>
                <p class="text-slate-300 mb-2">☑️ <b>They're like iron condors with an escape hatch.</b> If the stock moves big, your long options can profit from the vol spike. Iron condors just lose.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Management is key.</b> Plan to roll the tested side or close for partial profits. These aren't set-and-forget trades.</p>
                <p class="text-slate-300">☑️ <b>Best environment:</b> Range-bound with potential for a breakout, elevated IV in front month relative to back month (IV term structure in backwardation).</p>
            </div>
        </div>

        <div class="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-cyan-400 mb-4">Double Diagonal vs Similar Strategies</h3>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                    <h4 class="text-violet-400 font-bold mb-2">Double Diagonal</h4>
                    <p class="text-slate-300 text-sm">Different expirations + Different strikes</p>
                    <p class="text-slate-400 text-xs mt-2 italic">Theta positive, Vega positive. Profits from decay AND vol expansion.</p>
                </div>
                <div class="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                    <h4 class="text-amber-400 font-bold mb-2">Iron Condor</h4>
                    <p class="text-slate-300 text-sm">Same expiration + Different strikes</p>
                    <p class="text-slate-400 text-xs mt-2 italic">Theta positive, Vega negative. Pure decay play, hurt by vol.</p>
                </div>
                <div class="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                    <h4 class="text-emerald-400 font-bold mb-2">Double Calendar</h4>
                    <p class="text-slate-300 text-sm">Different expirations + Same strikes</p>
                    <p class="text-slate-400 text-xs mt-2 italic">Theta positive, Vega positive. Less directional flexibility.</p>
                </div>
            </div>
        </div>
        `, analogy: "Running two rental properties at different price points. You have a short-term Airbnb (front-month shorts) generating quick cash, backed by long-term leases (back-month longs) that appreciate if the neighborhood gets hot. You profit from the steady rental income, but if property values spike, your long-term holdings win big.", nuance: "<b>Strike Width:</b> Keep short strikes 5-10 points from ATM for good premium. Keep long strikes 5-10 points beyond shorts for defined risk. <br><br><b>DTE Selection:</b> Sell 14-21 DTE options, buy 45-60 DTE options. This maximizes the theta differential. <br><br><b>IV Consideration:</b> Best entered when front-month IV is elevated relative to back-month (backwardation). The shorts decay faster than the longs.", example: "<b>Scenario:</b> <b>SPY</b> ($450) Trading range-bound before earnings season. <br><br><b>The Trade:</b> Buy 45-DTE $460C ($4), Sell 14-DTE $455C ($2.50), Buy 45-DTE $440P ($4), Sell 14-DTE $445P ($2.50). Net Debit: $3.00 ($300). <br><br><b>Target:</b> SPY stays between $445-$455. Short options expire worthless. Long options worth $6-7. Profit: $300-400."
    },
];
