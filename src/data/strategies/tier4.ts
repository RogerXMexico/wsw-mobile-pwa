import { Strategy } from '../../types';

// Verticals - Tier 4
export const TIER_4_STRATEGIES: Strategy[] = [
    {
        id: 'rolling-adjusting',
        name: 'Rolling & Adjusting',
        tier: 4,
        tierName: 'Verticals',
        outlook: 'Educational',
        objective: 'Position Management',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `<div class="text-center py-12"><p class="text-slate-400">Interactive rolling and adjusting tutorial - click to open</p></div>`,
        analogy: "Rolling is like asking for extra time on a test. You didn't fail yet, but you need more runway to get the right answer.",
        nuance: "<b>The Credit Rule:</b> Always try to roll for a credit. If you have to pay to roll, think twice — you're adding to a losing position.",
        example: ""
    },,
    {
        id: 'bull-call-spread', name: 'Bull Call Spread', tier: 4, tierName: 'Verticals', outlook: 'Bullish', objective: 'Directional', risk: 'Defined Debit', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Cheaper than a long call. You can cap your profit to lower your entry cost. It is a 'high probability' version of a Long Call.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 30 Days in the Life of a Bull Call Spread</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">You like <b>SPY</b> at $500 and think it's heading to $510-$515 over the next month. But buying a call outright costs $10 per share ($1,000)—too expensive. Instead, you <b>buy the $500 Call</b> for $10.00 and <b>sell the $510 Call</b> for $4.00. Your net cost: $6.00 per share ($600 total).</p>
                <p class="text-slate-400 text-sm mt-2">You've agreed to cap your profit at $510 in exchange for paying less upfront.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Goldilocks Zone</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY drifts up to your target.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Spread worth ~$6.00. You're flat.</li>
                        <li><b>Day 10:</b> SPY $504. Spread worth ~$6.80. Small gain (+$80).</li>
                        <li><b>Day 20:</b> SPY $508. Spread worth ~$8.50. Feeling good (+$250).</li>
                        <li><b>Day 30 (Expiration):</b> SPY $510. Both calls are in-the-money. Your long call is worth $10, your short call is worth $0 (it cancels out at $510). <span class="text-emerald-400 font-semibold">Spread worth $10. Profit: $400 (67% return).</span></li>
                    </ul>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Moonshot (Bittersweet)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY explodes higher than expected.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Spread worth $6.00.</li>
                        <li><b>Day 15:</b> Breaking news! SPY gaps to $520. Your long call is worth $20... but your short call is also worth $10 (it's deep ITM now).</li>
                        <li><b>Day 30:</b> SPY $530. Long call worth $30. Short call worth $20. <span class="text-cyan-400 font-semibold">Spread still worth $10. Profit: $400.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You made money, but you left $2,000 on the table by capping at $510. If you'd bought the naked call, you'd have made $2,000 instead of $400.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Sideways Drift</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY goes nowhere.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Spread worth $6.00.</li>
                        <li><b>Day 15:</b> SPY $501. Spread worth $5.50 (time decay kicking in on both legs).</li>
                        <li><b>Day 25:</b> SPY $499. Spread worth $3.00. Starting to sweat.</li>
                        <li><b>Day 30:</b> SPY $502. Your long call is worth $2. Your short call expires worthless. <span class="text-yellow-400 font-semibold">Spread worth $2. Loss: -$400.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You needed SPY above $506 (your breakeven) to profit. Sideways wasn't good enough.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Drop</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY falls instead of rising.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Spread worth $6.00.</li>
                        <li><b>Day 10:</b> Bad economic data. SPY drops to $490. Spread worth ~$2.50.</li>
                        <li><b>Day 20:</b> SPY continues sliding to $485. Spread worth ~$0.80.</li>
                        <li><b>Day 30:</b> SPY $480. Both calls expire worthless. <span class="text-red-400 font-semibold">Spread worth $0. Loss: -$600 (your max loss).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The good news? You only lost $600, not the $1,000 you would have lost on a naked long call.</p>
                </div>
            </div>

            <div class="mt-6 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you paid less upfront but capped your gains?</b> That tradeoff is the essence of <span class="text-cyan-400">debit spreads</span>. You sacrifice unlimited upside for cheaper entry and defined risk.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how time decay hurt both legs?</b> Since both options are decaying, the effect is muted—your short call's decay partially offsets your long call's decay. This is called being <span class="text-cyan-400">theta-neutral</span>.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice Path B—you maxed out even though SPY went to $530?</b> That's because both options moved together once they were both ITM. The spread's max value is the <span class="text-cyan-400">width</span> ($10), no matter how high the stock goes.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Bull call spreads are <i>defined-risk directional bets</i>. You win if you're right about direction and magnitude. You lose less than a naked call if you're wrong. But you give up the moonshot.</p>
            </div>
        </div>
        `, analogy: "Like betting on a horse to win, but splitting the ticket with a friend who thinks the horse will only place. You pay less for the ticket, but you have to share the winnings if it wins big.", nuance: "<b>Vol Dampener:</b> Long and Short Vega cancel out. <br><br><b>Theta Neutrality:</b> Time decay of the short option helps offset the decay of the long option.", example: "<b>Scenario:</b> <b>SPY</b> is at $500. You think it goes to $510, but buying the $500 call costs $10 (too expensive). <br><br><b>The Trade:</b> Buy $500 Call ($10). Sell $510 Call ($4). Net Debit: $6.00 ($600). <br><br><b>The Math:</b> Max Profit is width ($10) - cost ($6) = $400. Max Loss is $600. <br><br><b>Why?</b> You reduced max risk from $1,000 to $600. Higher probability of profit due to lower breakeven."
    },,
    {
        id: 'bear-put-spread', name: 'Bear Put Spread', tier: 4, tierName: 'Verticals', outlook: 'Bearish', objective: 'Directional', risk: 'Defined Debit', legs: [{ type: 'put', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Cheaper than a long put. The short put limits your profit but makes the trade much cheaper to enter.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 30 Days in the Life of a Bear Put Spread</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">You think <b>COIN</b> at $200 is overvalued and heading down to $170-$180. But buying a put outright costs $12 per share ($1,200)—that's expensive for a speculative bet. Instead, you <b>buy the $200 Put</b> for $12.00 and <b>sell the $180 Put</b> for $5.00. Your net cost: $7.00 per share ($700 total).</p>
                <p class="text-slate-400 text-sm mt-2">You've agreed to cap your profit at $180 in exchange for paying less upfront.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Controlled Crash</h4>
                    <p class="text-slate-400 text-sm mb-2">COIN drops steadily to your target zone.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> COIN $200. Spread worth ~$7.00. You're flat.</li>
                        <li><b>Day 10:</b> COIN $192. Spread worth ~$9.50. Thesis playing out (+$250).</li>
                        <li><b>Day 20:</b> COIN $184. Spread worth ~$14.00. Substantial gain (+$700).</li>
                        <li><b>Day 30 (Expiration):</b> COIN $180. Your long put is worth $20, your short put is worth $0 (it cancels out at $180). <span class="text-emerald-400 font-semibold">Spread worth $20. Profit: $1,300 (186% return).</span></li>
                    </ul>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Total Collapse (Bittersweet)</h4>
                    <p class="text-slate-400 text-sm mb-2">COIN craters more than expected.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> COIN $200. Spread worth $7.00.</li>
                        <li><b>Day 10:</b> Crypto winter hits. COIN gaps down to $150. Your long put is worth $50... but your short put is also worth $30.</li>
                        <li><b>Day 30:</b> COIN $120. Long put worth $80. Short put worth $60. <span class="text-cyan-400 font-semibold">Spread still worth $20. Profit: $1,300.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Same profit as Path A. If you'd bought a naked put, you'd have made $6,800 ($80 - $12 cost). You left $5,500 on the table—but you also risked $700 instead of $1,200.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Slow Bleed</h4>
                    <p class="text-slate-400 text-sm mb-2">COIN drifts but doesn't fall enough.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> COIN $200. Spread worth $7.00.</li>
                        <li><b>Day 15:</b> COIN $195. Spread worth $7.80. Small gain, but time is passing.</li>
                        <li><b>Day 25:</b> COIN $194. Spread worth $6.50. Time decay accelerating.</li>
                        <li><b>Day 30:</b> COIN $195. Your long put is worth $5. Your short put expires worthless. <span class="text-yellow-400 font-semibold">Spread worth $5. Loss: -$200.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You were right about direction but wrong about magnitude. You needed COIN below $193 (your breakeven) to profit.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Rally (Wrong Direction)</h4>
                    <p class="text-slate-400 text-sm mb-2">COIN rallies instead of dropping.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> COIN $200. Spread worth $7.00.</li>
                        <li><b>Day 10:</b> Bitcoin pumps. COIN rallies to $220. Spread worth ~$3.00.</li>
                        <li><b>Day 20:</b> COIN continues to $240. Spread worth ~$0.50.</li>
                        <li><b>Day 30:</b> COIN $250. Both puts expire worthless. <span class="text-red-400 font-semibold">Spread worth $0. Loss: -$700 (your max loss).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You were wrong about direction. But at least you only lost $700, not the $1,200 you would have lost on a naked long put.</p>
                </div>
            </div>

            <div class="mt-6 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how this is the mirror image of the Bull Call Spread?</b> Same structure, opposite direction. You're betting on a decline instead of a rally. This is called a <span class="text-cyan-400">debit spread</span>—you pay upfront for a directional bet with capped profit.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how Path B maxed out even though COIN collapsed to $120?</b> Once both puts are deep ITM, they move together. Your profit caps at the <span class="text-cyan-400">width of the spread</span> ($20), minus what you paid ($7) = $13 max profit per share.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how Path C lost money even though COIN dropped?</b> You needed a big enough move to overcome your cost. The <span class="text-cyan-400">breakeven</span> = strike - debit ($200 - $7 = $193). Anything above that, you lose.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Bear put spreads are <i>defined-risk bets on decline</i>. Perfect when you think something is overvalued but don't want to pay full price for puts. You trade potential profit for cheaper entry.</p>
            </div>
        </div>
        `, analogy: "Shorting a stock with a built-in buy order to take profits automatically. You decide beforehand exactly how much profit is 'enough'.", nuance: "<b>Defined Risk:</b> Essential for portfolio management. <br><br><b>Pin Risk:</b> Close spreads before expiration to avoid assignment headaches.", example: "<b>Scenario:</b> <b>COIN</b> is at $200. Crypto looks weak. <br><br><b>The Trade:</b> Buy $190 Put ($12). Sell $170 Put ($5). Net Debit: $7.00. <br><br><b>Outcome:</b> If COIN drops to $170 or lower, spread is worth $20. Profit: $20 - $7 cost = $13 ($1,300). <br><br><b>Comparison:</b> A naked Put costs $12. If COIN only drops to $185, the naked put might barely break even, but the spread profits because the short leg decayed."
    },,
    {
        id: 'bull-put-spread', name: 'Bull Put Spread', tier: 4, tierName: 'Verticals', outlook: 'Neutral/Bull', objective: 'Income', risk: 'Defined Credit', legs: [{ type: 'put', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A 'Credit Spread'. You are selling insurance (the short put) and buying cheaper catastrophic insurance (the long put) for yourself.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 30 Days in the Life of a Bull Put Spread</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">You think <b>GOOGL</b> at $170 will hold above $160 support over the next month. Instead of betting on a rally, you want to get <i>paid</i> for being patient. You <b>sell the $160 Put</b> for $2.00 and <b>buy the $155 Put</b> for $0.50. You receive $1.50 per share ($150 total) <i>upfront</i>.</p>
                <p class="text-slate-400 text-sm mt-2">The money is already in your account. Now you just need GOOGL to stay above $160 for 30 days.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Boring Win</h4>
                    <p class="text-slate-400 text-sm mb-2">GOOGL does nothing exciting—perfect.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> GOOGL $170. You have $150 in your account. Spread worth ~$1.50 (what you'd pay to close it).</li>
                        <li><b>Day 10:</b> GOOGL $172. Spread worth ~$1.00. Time is decaying the puts. Unrealized gain: +$50.</li>
                        <li><b>Day 20:</b> GOOGL $168. Spread worth ~$0.40. Both options melting away. Unrealized gain: +$110.</li>
                        <li><b>Day 30 (Expiration):</b> GOOGL $165. Both puts expire worthless. <span class="text-emerald-400 font-semibold">You keep the full $150. Profit: $150 (43% return on risk).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You didn't need GOOGL to rally. You just needed it to NOT crash below $160.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Rally (Bonus)</h4>
                    <p class="text-slate-400 text-sm mb-2">GOOGL rallies—same result, just faster.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> GOOGL $170. Spread worth $1.50.</li>
                        <li><b>Day 7:</b> Great earnings! GOOGL gaps to $185. Spread now worth ~$0.15.</li>
                        <li><b>You close early:</b> Buy back for $0.15. <span class="text-cyan-400 font-semibold">Profit: $1.35 ($135). Free up your capital 3 weeks early.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Rallies accelerate your win. Many traders close at 50-75% of max profit and redeploy the capital.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Scare (Tested but Survives)</h4>
                    <p class="text-slate-400 text-sm mb-2">GOOGL dips into your danger zone but recovers.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> GOOGL $170. Spread worth $1.50.</li>
                        <li><b>Day 15:</b> Market selloff. GOOGL drops to $158. Spread worth ~$3.50. <span class="text-red-400">Unrealized loss: -$200.</span> Panic rising.</li>
                        <li><b>Day 22:</b> Market bounces. GOOGL back to $162. Spread worth ~$1.80. Still underwater but improving.</li>
                        <li><b>Day 30:</b> GOOGL $164. Both puts expire worthless. <span class="text-yellow-400 font-semibold">Profit: $150.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The roller coaster was stressful, but the outcome was the same. This is why position sizing matters—you need to survive the dip to reach the win.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Crash (Max Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">GOOGL breaks support and keeps falling.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> GOOGL $170. Spread worth $1.50.</li>
                        <li><b>Day 10:</b> Antitrust ruling! GOOGL gaps to $150. Your short put is $10 in-the-money. Spread worth ~$4.80.</li>
                        <li><b>Day 20:</b> GOOGL continues to $145. Spread worth $5.00 (max width reached).</li>
                        <li><b>Day 30:</b> GOOGL $140. Short put worth $20. Long put worth $15. <span class="text-red-400 font-semibold">Spread worth $5. Loss: -$350 (max loss).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You risked $350 to make $150. One max loss wipes out 2.3 wins. This is the core tradeoff of credit spreads: high win rate, but asymmetric risk/reward.</p>
                </div>
            </div>

            <div class="mt-6 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you got paid upfront?</b> That's the defining feature of <span class="text-cyan-400">credit spreads</span>. You receive money on day 1 and hope to keep it. Debit spreads are the opposite—you pay first and hope to profit.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how time decay was your friend?</b> Every day that passed with GOOGL above $160, both puts lost value. This decay went into your pocket. Credit spreads are <span class="text-cyan-400">theta-positive</span>—time is on your side.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the asymmetric risk/reward?</b> You risked $350 to make $150 (about 2.3:1 against you). But you win ~70-80% of the time if you pick strikes below support. The math can still work—but you must size appropriately.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Bull put spreads are <i>income trades</i>. You're selling insurance and collecting premium. You win when "nothing bad happens." It's the opposite mindset from debit spreads, which need "something good to happen."</p>
            </div>
        </div>
        `, analogy: "Like selling flood insurance to a house on a hill. It's a safe bet, but you buy a cheap re-insurance policy just in case a biblical flood actually happens.", nuance: "<b>Theta Driver:</b> Thrives on time decay. <br><br><b>High Win Rate:</b> You win small often, but one max loss can wipe out 5 wins.", example: "<b>Scenario:</b> <b>GOOGL</b> is $170. You think it holds $160 support. <br><br><b>The Trade:</b> Sell $160 Put ($2.00). Buy $155 Put ($0.50). Net Credit: $1.50 ($150). <br><br><b>Max Loss:</b> Width ($5) - Credit ($1.50) = $3.50 ($350). <br><br><b>Outcome:</b> As long as GOOGL stays above $160, you keep the $150. If it crashes to $150, you lose $350. Risk $350 to make $150 is a classic income setup."
    },,
    {
        id: 'bear-call-spread', name: 'Bear Call Spread', tier: 4, tierName: 'Verticals', outlook: 'Neutral/Bear', objective: 'Income', risk: 'Defined Credit', legs: [{ type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">You sell a Call and buy a higher strike Call for protection. You profit if the stock stays flat or drops. It is a bet against a rally.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 30 Days in the Life of a Bear Call Spread</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">You think <b>RIVN</b> at $12 is overextended after a speculative rally. You don't think it'll break above $13 resistance. Instead of shorting the stock, you <b>sell the $13 Call</b> for $0.80 and <b>buy the $15 Call</b> for $0.20. You receive $0.60 per share ($60 total) <i>upfront</i>.</p>
                <p class="text-slate-400 text-sm mt-2">The money is in your account. Now you need RIVN to stay below $13 for 30 days.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Fade (Perfect Outcome)</h4>
                    <p class="text-slate-400 text-sm mb-2">RIVN hype fades—exactly what you expected.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> RIVN $12. You have $60 in your account. Spread worth ~$0.60.</li>
                        <li><b>Day 10:</b> RIVN $11.50. Spread worth ~$0.35. Time and price working for you. Unrealized gain: +$25.</li>
                        <li><b>Day 20:</b> RIVN $10.80. Spread worth ~$0.10. Calls nearly worthless. Unrealized gain: +$50.</li>
                        <li><b>Day 30 (Expiration):</b> RIVN $10. Both calls expire worthless. <span class="text-emerald-400 font-semibold">You keep the full $60. Profit: $60 (43% return on risk).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You didn't need RIVN to crash. You just needed it to stay below $13.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Chop (Sideways Win)</h4>
                    <p class="text-slate-400 text-sm mb-2">RIVN trades sideways around $12.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> RIVN $12. Spread worth $0.60.</li>
                        <li><b>Day 15:</b> RIVN $12.50. Spread worth ~$0.55. Slightly concerning, but time is decaying.</li>
                        <li><b>Day 25:</b> RIVN $12.30. Spread worth ~$0.20. Final week, options melting fast.</li>
                        <li><b>Day 30:</b> RIVN $12.80. Both calls expire worthless (barely). <span class="text-cyan-400 font-semibold">Profit: $60.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The stock went up, but not enough. You still win because it stayed below your short strike.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Squeeze (Tested but Survives)</h4>
                    <p class="text-slate-400 text-sm mb-2">RIVN rallies into your strike zone but pulls back.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> RIVN $12. Spread worth $0.60.</li>
                        <li><b>Day 12:</b> EV news! RIVN spikes to $14. Spread worth ~$1.40. <span class="text-red-400">Unrealized loss: -$80.</span> Heart racing.</li>
                        <li><b>Day 18:</b> Hype fades. RIVN back to $13.20. Spread worth ~$0.80. Still underwater.</li>
                        <li><b>Day 30:</b> RIVN $12.50. Both calls expire worthless. <span class="text-yellow-400 font-semibold">Profit: $60.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The spike was terrifying, but you held. This is why you need to size appropriately—paper hands would have closed for a loss, then watched it recover.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Breakout (Max Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">RIVN rallies and doesn't look back.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> RIVN $12. Spread worth $0.60.</li>
                        <li><b>Day 8:</b> Partnership announcement! RIVN gaps to $16. Your short call is $3 in-the-money. Spread worth ~$1.90.</li>
                        <li><b>Day 20:</b> RIVN continues to $18. Spread worth $2.00 (max width reached).</li>
                        <li><b>Day 30:</b> RIVN $20. Short call worth $7. Long call worth $5. <span class="text-red-400 font-semibold">Spread worth $2. Loss: -$140 (max loss).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You risked $140 to make $60. One max loss wipes out 2.3 wins. But compare this to shorting the stock: you'd have lost $800 as RIVN went from $12 to $20. The spread defined your risk.</p>
                </div>
            </div>

            <div class="mt-6 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how this is the mirror image of the Bull Put Spread?</b> Same credit spread structure, opposite direction. Bull put spreads profit when stocks don't crash; bear call spreads profit when stocks don't rally. Both are bets on "nothing exciting happening."</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you're short delta without shorting stock?</b> This spread has <span class="text-cyan-400">negative delta</span>—you profit when the stock goes down. But unlike a short stock position, your loss is capped at $140, not unlimited.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice Path C—the spike to $14 was scary but didn't matter?</b> What counts is where the stock is at expiration, not the path it takes. As long as you sized correctly and didn't panic-close, the pullback saved you.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Bear call spreads are <i>income trades betting against rallies</i>. Perfect for overextended stocks you think will fade. You sell resistance levels and collect premium while waiting for gravity to do its work.</p>
            </div>
        </div>
        `, analogy: "Selling lottery tickets to optimists. You collect the cash upfront, hoping the ticket (stock price) never hits the jackpot numbers (your short strike).", nuance: "<b>Short Delta:</b> Negative Delta exposure without shorting stock. <br><br><b>Early Assignment:</b> Watch out for dividends if ITM.", example: "<b>Scenario:</b> <b>RIVN</b> is $12. You think the rally is fake. <br><br><b>The Trade:</b> Sell $13 Call ($0.80). Buy $15 Call ($0.20). Net Credit: $0.60 ($60). <br><br><b>Risk Profile:</b> Max Loss is Width ($2) - Credit ($0.60) = $1.40 ($140). <br><br><b>Outcome:</b> If RIVN fades to $11, both calls expire worthless. You keep the $60. Return on Risk: $60/$140 = 43%."
    },,
    {
        id: 'vertical-village',
        name: 'The Vertical Village',
        tier: 4,
        tierName: 'Verticals',
        outlook: 'Educational',
        objective: 'Strategy Comparison',
        risk: 'None',
        legs: [],
        hideSimulator: true,
        hideAnalyst: true,
        analysis: `
        <!-- Hero Section -->
        <div class="text-center py-12 mb-12 relative">
            <div class="absolute inset-0 bg-gradient-radial from-amber-500/20 via-emerald-500/10 to-transparent pointer-events-none"></div>
            <h1 class="text-5xl md:text-6xl font-black tracking-tight relative z-10 mb-4" style="background: linear-gradient(135deg, #39FF14 0%, #00FFFF 25%, #FF3131 50%, #FFBF00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                The Vertical Village
            </h1>
            <p class="text-slate-400 text-xl font-serif italic">Four spreads. Four personalities. One framework to rule them all.</p>
        </div>

        <div class="space-y-10">
            <!-- Introduction -->
            <div class="bg-gradient-to-br from-emerald-500/10 to-black border border-emerald-500/30 rounded-[2rem] p-8">
                <h3 class="text-2xl font-black text-emerald-400 mb-4">Welcome to the Village</h3>
                <p class="text-slate-300 text-lg leading-relaxed mb-4">
                    You've now learned all four vertical spread strategies. But here's the problem: <span class="text-white font-bold">they all sound similar</span> until you see them side by side.
                </p>
                <p class="text-slate-300 leading-relaxed">
                    This module is your <b>visual field guide</b>—a permanent reference to instantly recognize which spread fits your market outlook. Think of it as the Periodic Table of Verticals: each element has a distinct color, personality, and purpose.
                </p>
            </div>

            <!-- The Four-Quadrant Village -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Top Left: Bull Call Spread (Debit) -->
                <div class="vertical-card bg-gradient-to-br from-[#39FF14]/20 to-emerald-900/40 border-2 border-[#39FF14]/50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(57,255,20,0.4)]">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-2xl font-black tracking-tight" style="color: #39FF14; text-shadow: 0 0 10px rgba(57,255,20,0.6);">🚀 BULL CALL SPREAD</h3>
                            <span class="text-xs font-bold bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/40">DEBIT</span>
                        </div>

                        <div class="mb-6">
                            <div class="text-6xl mb-4 text-center">🎟️</div>
                            <h4 class="text-lg font-bold text-white mb-2">The Discounted Rocket Ticket</h4>
                            <p class="text-slate-300 text-sm leading-relaxed">
                                You want to go to the moon, but the full ticket is too expensive. So you buy a ticket (Long Call) but agree to get off at the Space Station (Short Call) to reduce cost. You sacrifice infinite upside for a cheaper entry.
                            </p>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Direction</span>
                                <span class="font-bold" style="color: #39FF14;">🟢 BULLISH (Needs UP)</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Action</span>
                                <span class="text-white font-bold">Pay to Play</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Time Decay</span>
                                <span class="text-red-400 font-bold">❌ Hurts You</span>
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <span class="text-slate-400">Best When</span>
                                <span class="text-white font-bold text-right">Certain of rally, want cheaper cost</span>
                            </div>
                        </div>

                        <div class="mt-4 p-4 bg-black/40 rounded-xl border border-[#39FF14]/30">
                            <p class="text-xs text-slate-400 mb-2"><b class="text-[#39FF14]">Trade Example:</b></p>
                            <p class="text-xs text-slate-300">Stock $100 → Buy $105 Call, Sell $110 Call. Max gain if stock hits $110+. You profit from targeted upside.</p>
                        </div>
                    </div>
                </div>

                <!-- Top Right: Bear Call Spread (Credit) -->
                <div class="vertical-card bg-gradient-to-br from-[#FFBF00]/20 to-orange-900/40 border-2 border-[#FFBF00]/50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,191,0,0.4)]">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-[#FFBF00]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-2xl font-black tracking-tight" style="color: #FFBF00; text-shadow: 0 0 10px rgba(255,191,0,0.6);">⚡ BEAR CALL SPREAD</h3>
                            <span class="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/40">CREDIT</span>
                        </div>

                        <div class="mb-6">
                            <div class="text-6xl mb-4 text-center">🔌</div>
                            <h4 class="text-lg font-bold text-white mb-2">The Electric Ceiling</h4>
                            <p class="text-slate-300 text-sm leading-relaxed">
                                You install an invisible electric ceiling (Short Call) above the stock. You bet it won't jump high enough to touch it. If Superman shows up, you have a helmet (Long Call) to cap losses.
                            </p>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Direction</span>
                                <span class="font-bold" style="color: #FFBF00;">🟠 NEUTRAL/BEARISH (Stay Low)</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Action</span>
                                <span class="text-white font-bold">Get Paid to Wait</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Time Decay</span>
                                <span class="text-emerald-400 font-bold">✅ Helps You</span>
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <span class="text-slate-400">Best When</span>
                                <span class="text-white font-bold text-right">Fading rallies, selling resistance</span>
                            </div>
                        </div>

                        <div class="mt-4 p-4 bg-black/40 rounded-xl border border-[#FFBF00]/30">
                            <p class="text-xs text-slate-400 mb-2"><b class="text-[#FFBF00]">Trade Example:</b></p>
                            <p class="text-xs text-slate-300">Stock $100 → Sell $105 Call, Buy $110 Call. Collect premium. Profit if stock stays below $105. The ceiling holds.</p>
                        </div>
                    </div>
                </div>

                <!-- Bottom Left: Bear Put Spread (Debit) -->
                <div class="vertical-card bg-gradient-to-br from-[#FF3131]/20 to-red-900/40 border-2 border-[#FF3131]/50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,49,49,0.4)]">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-[#FF3131]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-2xl font-black tracking-tight" style="color: #FF3131; text-shadow: 0 0 10px rgba(255,49,49,0.6);">🪂 BEAR PUT SPREAD</h3>
                            <span class="text-xs font-bold bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/40">DEBIT</span>
                        </div>

                        <div class="mb-6">
                            <div class="text-6xl mb-4 text-center">🪂</div>
                            <h4 class="text-lg font-bold text-white mb-2">The Subsidized Parachute</h4>
                            <p class="text-slate-300 text-sm leading-relaxed">
                                You're betting on a crash. A gold parachute (Long Put) is expensive. You only need to survive to ground level, not the basement. So you sell the "basement rights" (Short Put) to pay for your chute.
                            </p>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Direction</span>
                                <span class="font-bold" style="color: #FF3131;">🔴 BEARISH (Needs DOWN)</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Action</span>
                                <span class="text-white font-bold">Pay to Play</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Time Decay</span>
                                <span class="text-red-400 font-bold">❌ Hurts You</span>
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <span class="text-slate-400">Best When</span>
                                <span class="text-white font-bold text-right">Certain of crash, want cheaper cost</span>
                            </div>
                        </div>

                        <div class="mt-4 p-4 bg-black/40 rounded-xl border border-[#FF3131]/30">
                            <p class="text-xs text-slate-400 mb-2"><b class="text-[#FF3131]">Trade Example:</b></p>
                            <p class="text-xs text-slate-300">Stock $100 → Buy $95 Put, Sell $90 Put. Max gain if stock hits $90 or below. You profit from targeted downside.</p>
                        </div>
                    </div>
                </div>

                <!-- Bottom Right: Bull Put Spread (Credit) -->
                <div class="vertical-card bg-gradient-to-br from-[#00FFFF]/20 to-cyan-900/40 border-2 border-[#00FFFF]/50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-[#00FFFF]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-2xl font-black tracking-tight" style="color: #00FFFF; text-shadow: 0 0 10px rgba(0,255,255,0.6);">🌊 BULL PUT SPREAD</h3>
                            <span class="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/40">CREDIT</span>
                        </div>

                        <div class="mb-6">
                            <div class="text-6xl mb-4 text-center">🏠</div>
                            <h4 class="text-lg font-bold text-white mb-2">Selling Flood Insurance on a Hill</h4>
                            <p class="text-slate-300 text-sm leading-relaxed">
                                You sell flood insurance (Short Put) to a house on a high hill. You bet the water won't rise that high. You buy cheap reinsurance (Long Put) for the valley below to cap catastrophic risk.
                            </p>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Direction</span>
                                <span class="font-bold" style="color: #00FFFF;">🔵 NEUTRAL/BULLISH (Don't Drop)</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Action</span>
                                <span class="text-white font-bold">Get Paid to Wait</span>
                            </div>
                            <div class="flex items-center justify-between py-2 border-b border-white/10">
                                <span class="text-slate-400">Time Decay</span>
                                <span class="text-emerald-400 font-bold">✅ Helps You</span>
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <span class="text-slate-400">Best When</span>
                                <span class="text-white font-bold text-right">Selling support, be the house</span>
                            </div>
                        </div>

                        <div class="mt-4 p-4 bg-black/40 rounded-xl border border-[#00FFFF]/30">
                            <p class="text-xs text-slate-400 mb-2"><b class="text-[#00FFFF]">Trade Example:</b></p>
                            <p class="text-xs text-slate-300">Stock $100 → Sell $95 Put, Buy $90 Put. Collect premium. Profit if stock stays above $95. The floor holds.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comparison Matrix -->
            <div class="bg-black border border-slate-700 rounded-2xl p-8">
                <h3 class="text-2xl font-black text-white mb-6 text-center">The Master Comparison Matrix</h3>

                <!-- Debit Spreads vs Credit Spreads -->
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <!-- LEFT SIDE: DEBIT SPREADS -->
                    <div class="border-2 border-red-500/40 rounded-xl p-6 bg-red-500/5">
                        <h4 class="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                            <span>💸</span> DEBIT SPREADS (Pay to Play)
                        </h4>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-start gap-3">
                                <span style="color: #39FF14;" class="text-xl">🚀</span>
                                <div>
                                    <p class="font-bold text-white">Bull Call Spread</p>
                                    <p class="text-slate-400">Bullish | Need stock to rally</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <span style="color: #FF3131;" class="text-xl">🪂</span>
                                <div>
                                    <p class="font-bold text-white">Bear Put Spread</p>
                                    <p class="text-slate-400">Bearish | Need stock to crash</p>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t border-white/10">
                                <p class="text-red-400 font-bold mb-2">⚠️ Shared Characteristics:</p>
                                <ul class="space-y-1 text-slate-300">
                                    <li>• You pay upfront (debit)</li>
                                    <li>• Time decay hurts you (Theta negative)</li>
                                    <li>• You NEED price movement to win</li>
                                    <li>• Directional conviction required</li>
                                    <li>• Lower capital requirement than naked options</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT SIDE: CREDIT SPREADS -->
                    <div class="border-2 border-emerald-500/40 rounded-xl p-6 bg-emerald-500/5">
                        <h4 class="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                            <span>💰</span> CREDIT SPREADS (Get Paid to Wait)
                        </h4>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-start gap-3">
                                <span style="color: #FFBF00;" class="text-xl">⚡</span>
                                <div>
                                    <p class="font-bold text-white">Bear Call Spread</p>
                                    <p class="text-slate-400">Neutral/Bearish | Stock stays low</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <span style="color: #00FFFF;" class="text-xl">🌊</span>
                                <div>
                                    <p class="font-bold text-white">Bull Put Spread</p>
                                    <p class="text-slate-400">Neutral/Bullish | Stock stays high</p>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t border-white/10">
                                <p class="text-emerald-400 font-bold mb-2">✅ Shared Characteristics:</p>
                                <ul class="space-y-1 text-slate-300">
                                    <li>• You collect premium upfront (credit)</li>
                                    <li>• Time decay helps you (Theta positive)</li>
                                    <li>• You WIN if nothing dramatic happens</li>
                                    <li>• "Selling insurance" mindset</li>
                                    <li>• High probability, limited reward</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- The Decision Tree -->
                <div class="bg-black/40 border border-amber-500/30 rounded-xl p-6">
                    <h4 class="text-lg font-bold text-amber-400 mb-4 text-center">🧭 The Decision Tree: Which Spread Do I Use?</h4>
                    <div class="space-y-4 text-sm">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="border-l-4 border-emerald-500 pl-4">
                                <p class="text-emerald-400 font-bold mb-2">If you're BULLISH:</p>
                                <p class="text-slate-300 mb-2"><span class="font-bold" style="color: #39FF14;">→ Bull Call Spread (Debit)</span> if you're <b>certain</b> the stock will rally and want leveraged upside.</p>
                                <p class="text-slate-300"><span class="font-bold" style="color: #00FFFF;">→ Bull Put Spread (Credit)</span> if you just need the stock to <b>not crash</b> and want to collect premium.</p>
                            </div>
                            <div class="border-l-4 border-red-500 pl-4">
                                <p class="text-red-400 font-bold mb-2">If you're BEARISH:</p>
                                <p class="text-slate-300 mb-2"><span class="font-bold" style="color: #FF3131;">→ Bear Put Spread (Debit)</span> if you're <b>certain</b> the stock will crash and want leveraged downside.</p>
                                <p class="text-slate-300"><span class="font-bold" style="color: #FFBF00;">→ Bear Call Spread (Credit)</span> if you just need the stock to <b>not rally</b> and want to collect premium.</p>
                            </div>
                        </div>

                        <div class="pt-4 border-t border-white/10">
                            <p class="text-amber-400 font-bold mb-2">💡 The Golden Rule:</p>
                            <p class="text-slate-300">
                                <b class="text-white">Debit Spreads = Directional Bets.</b> You NEED movement. You're buying convexity (gamma) and paying for theta decay.
                                <br><br>
                                <b class="text-white">Credit Spreads = Income Bets.</b> You NEED stability. You're selling convexity and getting paid for theta decay.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Visual Mnemonics -->
            <div class="bg-gradient-to-br from-purple-500/10 to-black border border-purple-500/30 rounded-2xl p-8">
                <h3 class="text-2xl font-black text-purple-400 mb-6">🎨 Memory Tricks: Never Forget Again</h3>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style="background: #39FF14; color: black;">
                                <span class="text-2xl">🚀</span>
                            </div>
                            <div>
                                <p class="font-bold text-white mb-1">GREEN = Go Up (Bull Call)</p>
                                <p class="text-slate-400 text-sm">Neon green screams "launch." Aggressive upward bet. You're paying for a rocket ticket with a price cap at the space station.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style="background: #FF3131; color: white;">
                                <span class="text-2xl">🪂</span>
                            </div>
                            <div>
                                <p class="font-bold text-white mb-1">RED = Stop/Danger (Bear Put)</p>
                                <p class="text-slate-400 text-sm">Neon red screams "crash." Aggressive downward bet. You're paying for a parachute but selling the basement landing rights.</p>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style="background: #00FFFF; color: black;">
                                <span class="text-2xl">🌊</span>
                            </div>
                            <div>
                                <p class="font-bold text-white mb-1">CYAN = The Floor (Bull Put)</p>
                                <p class="text-slate-400 text-sm">Cool water rising but not flooding. You're selling insurance that the floor holds. Supportive, calm, theta-positive income.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style="background: #FFBF00; color: black;">
                                <span class="text-2xl">⚡</span>
                            </div>
                            <div>
                                <p class="font-bold text-white mb-1">AMBER = The Ceiling (Bear Call)</p>
                                <p class="text-slate-400 text-sm">Caution sign: don't fly too high. Electric fence above. You're selling insurance that the ceiling holds. Resistance, theta-positive income.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Final Wisdom -->
            <div class="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/30 rounded-2xl p-8 text-center">
                <h3 class="text-2xl font-bold text-amber-400 mb-4">🏆 You Now Speak Vertical</h3>
                <p class="text-slate-300 text-lg mb-4">
                    Bookmark this module. Whenever you're confused about which spread to use, return to the Village.
                    The colors will guide you. The metaphors will stick. And the matrix will give you the answer.
                </p>
                <p class="text-slate-400 italic">
                    "The best traders don't memorize formulas—they visualize frameworks."
                </p>
            </div>
        </div>
        `,
        analogy: "A village with four districts: The Rocket District (bull calls, aggressive upside), The Parachute District (bear puts, aggressive downside), The Insurance District (credit spreads selling protection), and The Ceiling/Floor District (neutral income plays).",
        nuance: "<b>Debit = Direction:</b> You pay for convexity. You NEED movement.<br><br><b>Credit = Theta:</b> You sell convexity. You NEED stability.",
        example: ""
    },
];
