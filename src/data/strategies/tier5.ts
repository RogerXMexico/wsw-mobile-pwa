import { Strategy } from '../../types';

// Volatility - Tier 5
export const TIER_5_STRATEGIES: Strategy[] = [
    {
        id: 'long-straddle', name: 'Long Straddle', tier: 5, tierName: 'Volatility', outlook: 'Explosive', objective: 'Long Vol', risk: 'Limited', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">The purest volatility play. You buy both a Call and a Put at the same strike. You just need the stock to move further than the cost of the premiums combined.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 14 Days in the Life of a Long Straddle</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>NFLX</b> is at $600 with earnings in 2 weeks. You have no idea if it'll beat or miss, but you're convinced the market is underpricing the move. The expected move is $30, but you think it could swing $60+. You <b>buy the $600 Call</b> for $18 and <b>buy the $600 Put</b> for $17. Total cost: $35 per share ($3,500).</p>
                <p class="text-slate-400 text-sm mt-2">You need NFLX to move more than $35 in either direction to profit. Your breakevens: $565 on the downside, $635 on the upside.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Explosion (Either Direction)</h4>
                    <p class="text-slate-400 text-sm mb-2">NFLX delivers a massive surprise.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> NFLX $600. Straddle worth $35. You're flat.</li>
                        <li><b>Day 7:</b> Pre-earnings drift. NFLX $605. Straddle worth $33 (time decay eating both legs). Unrealized: -$200.</li>
                        <li><b>Day 14 (Earnings):</b> NFLX CRUSHES. Gaps to $680. Call worth $80. Put worth $0. <span class="text-emerald-400 font-semibold">Straddle worth $80. Profit: $4,500 (129% return).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">It didn't matter which direction—you just needed magnitude. An $80 drop would have been equally profitable via the put.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The "Good Enough" Move</h4>
                    <p class="text-slate-400 text-sm mb-2">NFLX moves, but just barely past breakeven.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> NFLX $600. Straddle worth $35.</li>
                        <li><b>Day 14 (Earnings):</b> NFLX drops to $555 on weak guidance. Put worth $45. Call worth $0.</li>
                        <li><b>Result:</b> <span class="text-cyan-400 font-semibold">Straddle worth $45. Profit: $1,000 (29% return).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Not a home run, but profitable. The move was 10% larger than the market expected.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The IV Crush Trap</h4>
                    <p class="text-slate-400 text-sm mb-2">The stock moves, but IV collapses faster.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> NFLX $600. IV is 80% (elevated pre-earnings). Straddle worth $35.</li>
                        <li><b>Day 14 (Earnings):</b> NFLX moves to $625. Your call is $25 in-the-money... but IV crashed from 80% to 35%. Call worth $26. Put worth $1.</li>
                        <li><b>Result:</b> <span class="text-yellow-400 font-semibold">Straddle worth $27. Loss: -$800.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Wait—the stock moved $25 and you LOST money? Yes. The volatility premium you paid evaporated overnight. This is IV Crush—the silent straddle killer.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Nothing Burger</h4>
                    <p class="text-slate-400 text-sm mb-2">NFLX barely moves. The nightmare scenario.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> NFLX $600. Straddle worth $35.</li>
                        <li><b>Day 7:</b> NFLX $598. Straddle worth $30. Both legs bleeding from theta.</li>
                        <li><b>Day 14 (Earnings):</b> NFLX reports in-line. Stock moves to $605. IV collapses. Call worth $6. Put worth $0.</li>
                        <li><b>Result:</b> <span class="text-red-400 font-semibold">Straddle worth $6. Loss: -$2,900 (83% of investment).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Double whammy: no movement + IV crush. This is why straddles are expensive—you're paying for the POSSIBILITY of a big move, and you lose if it doesn't happen.</p>
                </div>
            </div>

            <div class="mt-6 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you didn't care about direction?</b> That's the essence of <span class="text-cyan-400">volatility trading</span>. You're not betting on up or down—you're betting on the SIZE of the move. Straddles are <span class="text-cyan-400">delta-neutral</span> at entry.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice Path C—the stock moved $25 and you still lost?</b> That's <span class="text-cyan-400">IV Crush</span>. Before events like earnings, options are expensive because everyone expects a big move. After the event, uncertainty disappears and premiums collapse—even if the stock moved.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how both options decayed every day?</b> Straddles have <span class="text-cyan-400">double theta decay</span>—you're paying rent on TWO options. Time is your enemy until the move happens.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Long straddles are <i>bets on chaos</i>. You profit from explosions, panic, and surprise. You lose from boredom and "as expected" outcomes. Never buy straddles when everyone already knows a big move is coming—you're paying for old news.</p>
            </div>
        </div>
        `, analogy: "Lighting dynamite at both ends. You need a big bang to pay for the fuse.", nuance: "<b>Double Theta:</b> Burning time on two ends. <br><br><b>IV Crush:</b> Never buy right before earnings unless you expect a MASSIVE move.", example: "<b>Scenario:</b> <b>NFLX</b> earnings tomorrow. Price $600. Market implies $30 move. You expect $60. <br><br><b>The Trade:</b> Buy $600 Call ($15) + Buy $600 Put ($15). Cost: $30.00. <br><br><b>Outcome A (Boring):</b> NFLX moves to $610. Call worth $10, Put $0. Loss: $20 ($2,000). <br><br><b>Outcome B (Explosion):</b> NFLX tanks to $530. Put worth $70. Profit: $70 - $30 cost = $4,000."
    },,
    {
        id: 'long-strangle', name: 'Long Strangle', tier: 5, tierName: 'Volatility', outlook: 'Explosive', objective: 'Long Vol (Cheaper)', risk: 'Limited', legs: [{ type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Similar to a Straddle, but you buy OTM options. Cheaper to enter, but needs a bigger move to profit.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 30 Days in the Life of a Long Strangle</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>MSTR</b> is at $1,500 and you think Bitcoin is about to make a major move. You don't know which direction, but you expect at least a 15% swing. A straddle costs $200—too expensive. Instead, you <b>buy the $1,400 Put</b> (7% OTM) for $50 and <b>buy the $1,600 Call</b> (7% OTM) for $50. Total cost: $100 per share ($10,000).</p>
                <p class="text-slate-400 text-sm mt-2">Your breakevens: $1,300 on the downside, $1,700 on the upside. You need a bigger move than a straddle, but you paid half the price.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Moonshot</h4>
                    <p class="text-slate-400 text-sm mb-2">Bitcoin rips and MSTR follows.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSTR $1,500. Strangle worth $100. You're flat.</li>
                        <li><b>Day 15:</b> Bitcoin breaks $100k. MSTR rallies to $1,700. Call worth $130. Put worth $5. Strangle worth $135. Unrealized: +$3,500.</li>
                        <li><b>Day 30:</b> MSTR continues to $1,900. Call worth $300. Put worth $0. <span class="text-emerald-400 font-semibold">Strangle worth $300. Profit: $20,000 (200% return).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The move was massive. Your OTM call became deep ITM and exploded in value. This is the strangle dream.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Crash (Works Too)</h4>
                    <p class="text-slate-400 text-sm mb-2">Bitcoin crashes and takes MSTR with it.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSTR $1,500. Strangle worth $100.</li>
                        <li><b>Day 10:</b> Crypto contagion. MSTR gaps to $1,200. Put worth $200. Call worth $3.</li>
                        <li><b>Day 30:</b> MSTR at $1,100. Put worth $300. Call expired worthless. <span class="text-cyan-400 font-semibold">Strangle worth $300. Profit: $20,000.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Same profit, opposite direction. The strangle doesn't care which way—it just needs chaos.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The "Almost" Move</h4>
                    <p class="text-slate-400 text-sm mb-2">MSTR moves, but not enough to clear the gap.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSTR $1,500. Strangle worth $100.</li>
                        <li><b>Day 15:</b> MSTR drops to $1,380. Put worth $50. Call worth $8. Strangle worth $58.</li>
                        <li><b>Day 30:</b> MSTR settles at $1,420. Put worth $0 (expired OTM). Call worth $0. <span class="text-yellow-400 font-semibold">Strangle worth $0. Loss: -$10,000 (100% loss).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The stock dropped 5%—a decent move—but it wasn't enough. You needed it to break through $1,400 or $1,600. This is the danger of wide strangles.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Dead Zone</h4>
                    <p class="text-slate-400 text-sm mb-2">MSTR chops between your strikes.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> MSTR $1,500. Strangle worth $100.</li>
                        <li><b>Day 10:</b> MSTR $1,480. Strangle worth $70. Both options decaying.</li>
                        <li><b>Day 20:</b> MSTR $1,520. Strangle worth $40. Time crushing both legs.</li>
                        <li><b>Day 30:</b> MSTR $1,510. Both options expire worthless. <span class="text-red-400 font-semibold">Loss: -$10,000 (100% loss).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The "dead zone" between your strikes is where strangles go to die. Every day in this zone, you lose money.</p>
                </div>
            </div>

            <div class="mt-6 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you paid half the price of a straddle?</b> That's the tradeoff. Strangles are cheaper because both options are <span class="text-cyan-400">out-of-the-money</span>. But you need a BIGGER move to profit—the stock must blast through one of your strikes.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice Path C—the stock dropped 5% and you still lost everything?</b> The "dead zone" between your strikes is the strangle's Achilles heel. A straddle would have captured some value, but your OTM options expired worthless.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the binary outcomes?</b> Strangles tend to be all-or-nothing: 100% loss or 200%+ gain. There's less middle ground than with straddles. This is <span class="text-cyan-400">low delta at entry</span>—both options barely react to small moves.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Long strangles are <i>cheap lottery tickets on explosions</i>. Best for highly volatile assets (crypto, meme stocks, biotechs) where 15%+ moves are plausible. Terrible for boring stocks that just chop around.</p>
            </div>
        </div>
        `, analogy: "A cheaper dynamite stick with a longer fuse. The explosion needs to be massive to bridge the gap between your strikes.", nuance: "<b>Lower Delta:</b> Needs significant move to gain value. <br><br><b>Binary Outcome:</b> Often 100% loss or 500% gain.", example: "<b>Scenario:</b> <b>MSTR</b> is $1,500. Bitcoin is volatile. <br><br><b>The Trade:</b> Buy $1,400 Put ($50) + Buy $1,600 Call ($50). Total: $100. <br><br><b>Why?</b> A Straddle might cost $200. This is half price. <br><br><b>Outcome:</b> If MSTR stays at $1,500, you lose $100. If MSTR hits $1,800, Call is worth $200. Net Profit $100 (100%)."
    },,
    {
        id: 'short-straddle', name: 'Short Straddle', tier: 5, tierName: 'Volatility', outlook: 'Neutral', objective: 'Short Vol', risk: 'Unlimited', legs: [{ type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">You sell both the Call and the Put. Massive premium collection, but you lose if the stock moves significantly in *either* direction.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 45 Days in the Life of a Short Straddle</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>VZ</b> (Verizon) is at $40. It's the most boring stock in your universe—it never moves. You want to monetize that boredom. You <b>sell the $40 Call</b> for $1.50 and <b>sell the $40 Put</b> for $1.50. You collect $3.00 per share ($300) <i>upfront</i>.</p>
                <p class="text-slate-400 text-sm mt-2">Your breakevens: $37 on the downside, $43 on the upside. As long as VZ stays between those levels, you profit. But if it breaks out in either direction... unlimited losses.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Dream (Nothing Happens)</h4>
                    <p class="text-slate-400 text-sm mb-2">VZ does what it always does—absolutely nothing.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> VZ $40. You have $300 in your account. Straddle worth $3.00 to close.</li>
                        <li><b>Day 15:</b> VZ $40.50. Straddle worth $2.20. Time decaying beautifully. Unrealized: +$80.</li>
                        <li><b>Day 30:</b> VZ $39.80. Straddle worth $1.10. Both options melting away. Unrealized: +$190.</li>
                        <li><b>Day 45 (Expiration):</b> VZ $40.10. Both options expire nearly worthless. <span class="text-emerald-400 font-semibold">Profit: $300 (max profit achieved).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">This is the ideal scenario. You collected premium for doing nothing, and the stock cooperated by being boring.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Wiggle (Partial Win)</h4>
                    <p class="text-slate-400 text-sm mb-2">VZ moves around but stays in range.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> VZ $40. Straddle worth $3.00.</li>
                        <li><b>Day 20:</b> VZ drops to $38.50. Straddle worth $2.80. You're getting nervous.</li>
                        <li><b>Day 35:</b> VZ bounces back to $41. Straddle worth $1.50. Relief.</li>
                        <li><b>Day 45:</b> VZ $39.20. Put is ITM by $0.80. <span class="text-cyan-400 font-semibold">Net: collected $3.00, pay out $0.80 = Profit $220.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Not max profit, but still a win. The stock stayed within your breakeven range.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Slow Grind (Managed Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">VZ drifts against you, but you manage the position.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> VZ $40. Straddle worth $3.00.</li>
                        <li><b>Day 15:</b> VZ drops to $37. Straddle worth $4.50. <span class="text-red-400">Unrealized loss: -$150.</span></li>
                        <li><b>Day 20:</b> VZ continues to $36. Straddle worth $5.80. You decide to cut losses and close.</li>
                        <li><b>Result:</b> <span class="text-yellow-400 font-semibold">Loss: -$280 (closed at $5.80, collected $3.00).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You managed the trade by closing early. Without management, it could have been much worse. Short straddles require active monitoring.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Black Swan (Disaster)</h4>
                    <p class="text-slate-400 text-sm mb-2">The unexpected happens—VZ announces a merger.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> VZ $40. You collect $300.</li>
                        <li><b>Day 12:</b> BREAKING NEWS: VZ merging with T-Mobile. Stock gaps to $52 overnight.</li>
                        <li><b>Damage:</b> Your short call is $12 in-the-money. You owe $1,200 on the call. Put expires worthless.</li>
                        <li><b>Result:</b> <span class="text-red-400 font-semibold">Collected $300, pay $1,200 = Loss -$900.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">One event wiped out 3 months of potential wins. This is why short straddles are called "picking up pennies in front of a steamroller." If VZ had gone to $60? Loss would be $1,700. $70? $2,700. No limit.</p>
                </div>
            </div>

            <div class="mt-6 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice how you're betting on boredom?</b> Short straddles are the opposite of long straddles. You're <span class="text-cyan-400">short volatility</span>—you profit when nothing happens and lose when there's excitement.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the unlimited risk?</b> Unlike credit spreads, there's no cap on losses. The stock can theoretically go to infinity (call side) or zero (put side). This is why short straddles are considered <span class="text-cyan-400">advanced and dangerous</span>.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice Path D—one surprise erased multiple wins?</b> This is <span class="text-cyan-400">short gamma</span> in action. As the stock moves away from your strike, your losses accelerate. The position gets worse faster the more it moves.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Short straddles are <i>income trades that require constant vigilance</i>. Only use on the most boring, range-bound stocks. Always have a stop-loss plan. Never hold through binary events (earnings, FDA decisions, mergers).</p>
            </div>
        </div>
        `, analogy: "Picking up pennies in front of a steamroller. The pennies are shiny, but if the steamroller moves, you get flattened.", nuance: "<b>Short Gamma:</b> Losses accelerate as stock moves away. <br><br><b>Management:</b> Requires active rolling.", example: "<b>Scenario:</b> <b>VZ</b> (Verizon) is $40. It never moves. <br><br><b>The Trade:</b> Sell $40 Call ($1.50) + Sell $40 Put ($1.50). Collect $3.00 total ($300). <br><br><b>Outcome:</b> If VZ stays at $40, you keep $300. <br><br><b>Risk:</b> If VZ announces a merger and hits $50, you lose $10.00 ($1,000) on the call side minus $300 collected. Net loss $700."
    },,
    {
        id: 'short-strangle', name: 'Short Strangle', tier: 5, tierName: 'Volatility', outlook: 'Neutral', objective: 'Short Vol', risk: 'Unlimited', legs: [{ type: 'put', action: 'sell', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">You sell OTM Call and Put. Higher probability of profit than Short Straddle, but lower premium.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 45 Days in the Life of a Short Strangle</h3>

            <div class="rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>TLT</b> (Bond ETF) is at $95 and has been range-bound for months. You don't think it'll break $90 or $100 anytime soon. Instead of selling a straddle (too risky), you <b>sell the $90 Put</b> (5% OTM) for $0.80 and <b>sell the $100 Call</b> (5% OTM) for $0.70. You collect $1.50 per share ($150) <i>upfront</i>.</p>
                <p class="text-slate-400 text-sm mt-2">Your breakevens: $88.50 on the downside, $101.50 on the upside. A much wider "safe zone" than a straddle—but less premium collected.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Wide Lane (Perfect Win)</h4>
                    <p class="text-slate-400 text-sm mb-2">TLT bounces around but never threatens your strikes.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> TLT $95. You have $150 in your account. Strangle worth $1.50 to close.</li>
                        <li><b>Day 15:</b> TLT $93. Put worth $0.60. Call worth $0.15. Strangle worth $0.75. Unrealized: +$75.</li>
                        <li><b>Day 30:</b> TLT $97. Put worth $0.05. Call worth $0.35. Strangle worth $0.40. Unrealized: +$110.</li>
                        <li><b>Day 45 (Expiration):</b> TLT $94. Both options expire worthless. <span class="text-emerald-400 font-semibold">Profit: $150 (max profit).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The wide range gave TLT room to breathe. You never had to stress about minor moves.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Near-Miss (Still a Win)</h4>
                    <p class="text-slate-400 text-sm mb-2">TLT touches your strike but doesn't blow through.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> TLT $95. Strangle worth $1.50.</li>
                        <li><b>Day 20:</b> Rates spike. TLT drops to $89.50—just below your put strike! Strangle worth $2.20. <span class="text-red-400">Unrealized loss: -$70.</span></li>
                        <li><b>Day 30:</b> Rates stabilize. TLT bounces to $92. Strangle worth $0.80. Back to profitable.</li>
                        <li><b>Day 45:</b> TLT $93. Put worth $0 (expired OTM). <span class="text-cyan-400 font-semibold">Profit: $150.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Scary mid-trade, but the wide strikes gave you a cushion. A straddle at $95 would have been deep underwater.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Breach (Partial Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">TLT breaks through one of your strikes.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> TLT $95. Strangle worth $1.50.</li>
                        <li><b>Day 25:</b> Fed surprise! TLT rallies to $102. Call is $2 ITM. Strangle worth $3.00.</li>
                        <li><b>Day 35:</b> TLT continues to $103. You decide to close before it gets worse.</li>
                        <li><b>Close:</b> Buy back strangle for $3.50. <span class="text-yellow-400 font-semibold">Loss: -$200 (collected $150, paid $350 to close).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You took a managed loss. Without cutting, it could have been $500+ if TLT kept running to $108.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Gap (Unmanageable)</h4>
                    <p class="text-slate-400 text-sm mb-2">Something extreme happens overnight.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> TLT $95. You collect $150.</li>
                        <li><b>Day 18:</b> Credit crisis headline. TLT gaps down to $82 at open—8% overnight move.</li>
                        <li><b>Damage:</b> Your $90 put is $8 ITM. You owe $800. Call expires worthless.</li>
                        <li><b>Result:</b> <span class="text-red-400 font-semibold">Collected $150, pay $800 = Loss -$650.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The gap bypassed your management plan. You couldn't close before the damage was done. This is the black swan risk of all short volatility strategies.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the tradeoff vs. a short straddle?</b> You collected less premium ($150 vs ~$300 for a straddle) but got much wider breakevens. This is <span class="text-cyan-400">probability vs. premium</span>—higher win rate, smaller wins.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice Path B—touching your strike wasn't death?</b> OTM options have more "runway." With a straddle, being $1 ITM hurts immediately. With a strangle, you can be slightly ITM and still recover if the stock reverses.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the gap risk in Path D?</b> Short strangles still have <span class="text-cyan-400">unlimited risk</span>. The wider strikes help in normal markets, but can't protect you from overnight gaps or crashes.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Short strangles are <i>the workhorse of premium sellers</i>. Wider strikes = more forgiveness. Use on low-volatility, range-bound assets. Avoid around binary events. Always have a max loss threshold where you close.</p>
            </div>
        </div>
        `, analogy: "A wider road for the steamroller. You are safer, but the pennies are further apart.", nuance: "<b>Margin Intensive:</b> Brokers require significant buying power. <br><br><b>Black Swan Risk:</b> Infinite loss on upside.", example: "<b>Scenario:</b> <b>TLT</b> (Bonds) is $95. Range bound. <br><br><b>The Trade:</b> Sell $90 Put / Sell $100 Call. Collect $1.00. <br><br><b>Outcome:</b> You win if TLT stays between $90 and $100. It's a very wide profit zone."
    },,
    {
        id: 'iron-condor', name: 'Iron Condor', tier: 5, tierName: 'Volatility', outlook: 'Neutral', objective: 'Income', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: -20, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 10, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 20, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Income for non-directional markets. Sell a strangle, buy wings for protection.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 30 Days in the Life of an Iron Condor</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>SPY</b> is at $500 and the market is in a low-volatility chop. You want to sell premium but don't want unlimited risk. You build an Iron Condor:</p>
                <ul class="text-slate-300 text-sm mt-2 space-y-1">
                    <li>• <b>Buy $480 Put</b> for $0.50 (your downside protection)</li>
                    <li>• <b>Sell $490 Put</b> for $1.50 (your short put)</li>
                    <li>• <b>Sell $510 Call</b> for $1.50 (your short call)</li>
                    <li>• <b>Buy $520 Call</b> for $0.50 (your upside protection)</li>
                </ul>
                <p class="text-slate-400 text-sm mt-2">Net credit: $2.00 ($200). Max loss: Width ($10) - Credit ($2) = $8.00 ($800) per side. You're risking $800 to make $200.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Boring Chop (Max Profit)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY stays in its range—the iron condor dream.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Condor worth $2.00 to close. You have $200 credit.</li>
                        <li><b>Day 10:</b> SPY $495. Condor worth $1.60. Theta working for you. Unrealized: +$40.</li>
                        <li><b>Day 20:</b> SPY $503. Condor worth $0.80. Both wings decaying nicely. Unrealized: +$120.</li>
                        <li><b>Day 30 (Expiration):</b> SPY $498. All four options expire worthless. <span class="text-emerald-400 font-semibold">Profit: $200 (max profit).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The "profit tent" was $490-$510. SPY stayed inside. You kept all the premium.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Test (One Wing Tested)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY tests your put side but recovers.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Condor worth $2.00.</li>
                        <li><b>Day 12:</b> Selloff! SPY drops to $488. Your put spread is threatened. Condor worth $4.50. <span class="text-red-400">Unrealized loss: -$250.</span></li>
                        <li><b>Day 18:</b> Bounce. SPY back to $496. Condor worth $1.80. Back to profitable.</li>
                        <li><b>Day 30:</b> SPY $492. Put spread expires worthless. <span class="text-cyan-400 font-semibold">Profit: $200.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Day 12 was scary—you were underwater. But time was on your side. The bounce + theta decay saved the trade.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Early Exit (Managed at 50%)</h4>
                    <p class="text-slate-400 text-sm mb-2">Many traders close at 50% of max profit to free up capital.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Condor worth $2.00. Credit: $200.</li>
                        <li><b>Day 15:</b> SPY $502. Condor worth $1.00 (50% decay). You close by buying back for $1.00.</li>
                        <li><b>Result:</b> <span class="text-yellow-400 font-semibold">Profit: $100 in 15 days instead of $200 in 30 days.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">You captured 50% of max profit in 50% of the time. Now you can redeploy that capital to a fresh condor. This "profit harvesting" often beats holding to expiration.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Breach (Max Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">SPY breaks through a wing—the nightmare scenario.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Day 1:</b> SPY $500. Credit: $200.</li>
                        <li><b>Day 8:</b> Market crash! SPY gaps to $475. Your put spread is fully ITM.</li>
                        <li><b>Damage:</b> $490/$480 put spread is worth $10 (max width). You owe $10 but collected $2.</li>
                        <li><b>Day 30:</b> SPY $470. <span class="text-red-400 font-semibold">Max loss: -$800 (collected $200, paid $1,000 on put spread).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">One max loss wipes out 4 winning condors. This is the math you must accept with defined-risk premium selling. But unlike short strangles, you KNEW your max loss going in—no nasty surprises beyond $800.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the 4 legs working together?</b> An iron condor is really two <span class="text-cyan-400">vertical spreads</span> stacked: a bull put spread and a bear call spread. The long wings cap your risk; the short strikes generate premium.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the defined risk vs. short strangle?</b> A short strangle at the same strikes would collect similar premium but have unlimited risk. The iron condor's wings cost you ~$1.00 of premium but buy you peace of mind.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the win/loss ratio?</b> You risk $800 to make $200 (4:1 against). But iron condors win ~70-80% of the time when placed at 1 standard deviation wings. The math works if you're disciplined about sizing.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Iron condors are <i>the defined-risk workhorse of income traders</i>. Perfect for low-volatility environments. Manage at 50% profit or 2x loss. Avoid around major events. Size so max loss doesn't sting.</p>
            </div>
        </div>
        `, analogy: "Building a fence around a cow. As long as it stays in the pasture, you get paid. If it breaks the fence, insurance pays.", nuance: "<b>Theta Play:</b> Want days to pass without news. <br><br><b>Legging In:</b> Advanced technique to maximize premium.", example: "<b>Scenario:</b> <b>RUT</b> at 2000. Chopping sideways. <br><br><b>The Trade:</b> Sell 1900/2100 Strangle. Buy 1850/2150 Wings. Credit $2.00. <br><br><b>The Zone:</b> Profit between 1900 and 2100. <br><br><b>Risk:</b> Max loss is spread width ($50) - credit ($2) = $48 loss if market crashes."
    },,
    {
        id: 'iron-butterfly', name: 'Iron Butterfly', tier: 5, tierName: 'Volatility', outlook: 'Neutral', objective: 'Income', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A Short Straddle with training wheels. Sell ATM, buy wings. Max profit at center strike.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: 7 Days in the Life of an Iron Butterfly</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300"><b>UBER</b> is at $75 on Monday. Friday is options expiration and you think UBER will "pin" to the $75 strike—market makers often push stocks toward high-open-interest strikes at expiration. You build an Iron Butterfly:</p>
                <ul class="text-slate-300 text-sm mt-2 space-y-1">
                    <li>• <b>Buy $70 Put</b> for $0.30 (downside wing)</li>
                    <li>• <b>Sell $75 Put</b> for $1.80 (ATM short put)</li>
                    <li>• <b>Sell $75 Call</b> for $1.80 (ATM short call)</li>
                    <li>• <b>Buy $80 Call</b> for $0.30 (upside wing)</li>
                </ul>
                <p class="text-slate-400 text-sm mt-2">Net credit: $3.00 ($300). Max loss: Width ($5) - Credit ($3) = $2.00 ($200). You're risking $200 to make $300—an amazing ratio IF the stock pins.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h4 class="text-emerald-400 font-semibold">Path A: The Bullseye (Perfect Pin)</h4>
                    <p class="text-slate-400 text-sm mb-2">UBER pins exactly where you predicted.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Monday:</b> UBER $75. Butterfly worth $3.00 to close. You have $300 credit.</li>
                        <li><b>Wednesday:</b> UBER $74.50. Butterfly worth $2.50. Theta crushing both ATM options.</li>
                        <li><b>Thursday:</b> UBER $75.20. Butterfly worth $1.50. Unrealized: +$150.</li>
                        <li><b>Friday Close:</b> UBER $75.05. All four options expire worthless or nearly so. <span class="text-emerald-400 font-semibold">Profit: ~$295 (98% of max).</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">The perfect outcome. UBER stayed pinned and you collected nearly all the premium. This is what butterflies are designed for—max profit at one exact price.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h4 class="text-cyan-400 font-semibold">Path B: The Near-Pin (Partial Win)</h4>
                    <p class="text-slate-400 text-sm mb-2">UBER ends near but not at $75.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Monday:</b> UBER $75. Butterfly worth $3.00.</li>
                        <li><b>Thursday:</b> UBER drifts to $73. Butterfly worth $2.80. You're slightly underwater.</li>
                        <li><b>Friday Close:</b> UBER $73. Your short put is $2 ITM. Short call expires worthless.</li>
                        <li><b>Result:</b> Collected $3.00, owe $2.00 on put. <span class="text-cyan-400 font-semibold">Profit: $100.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Not max profit, but still a win. The butterfly is forgiving within the wings—you just lose $1 for every $1 away from center.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="text-yellow-400 font-semibold">Path C: The Edge (Breakeven Zone)</h4>
                    <p class="text-slate-400 text-sm mb-2">UBER ends exactly at your breakeven point.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Monday:</b> UBER $75. Butterfly worth $3.00.</li>
                        <li><b>Wednesday:</b> Earnings whisper. UBER rallies to $77.</li>
                        <li><b>Friday Close:</b> UBER $78. Your short call is $3 ITM. Short put expires worthless.</li>
                        <li><b>Result:</b> Collected $3.00, owe $3.00 on call. <span class="text-yellow-400 font-semibold">Breakeven: $0.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Your breakevens are $72 and $78 (center ± credit). At $78 exactly, you neither win nor lose. Past that, you start losing.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h4 class="text-red-400 font-semibold">Path D: The Blowout (Max Loss)</h4>
                    <p class="text-slate-400 text-sm mb-2">UBER moves big—past your wing.</p>
                    <ul class="text-slate-300 space-y-1 text-sm">
                        <li><b>Monday:</b> UBER $75. Credit: $300.</li>
                        <li><b>Tuesday:</b> Buyout rumor! UBER gaps to $82.</li>
                        <li><b>Friday Close:</b> UBER $85. Your $75/$80 call spread is fully max loss.</li>
                        <li><b>Damage:</b> Short $75 call is $10 ITM. Long $80 call is $5 ITM. Net loss on spread: $5.</li>
                        <li><b>Result:</b> Collected $3.00, pay $5.00. <span class="text-red-400 font-semibold">Max loss: -$200.</span></li>
                    </ul>
                    <p class="text-slate-400 text-sm mt-2 italic">Once past your wing ($80), losses max out. The butterfly can never lose more than $200—that's the "training wheels" protecting you from unlimited risk.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the unusual risk/reward?</b> You risked $200 to make $300—that's <span class="text-cyan-400">1.5:1 in your favor</span>! Most options trades are the opposite. The catch? You need a precise pin to get max profit.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice the "tent" shape of profits?</b> Max profit at center ($75), declining linearly as price moves away, max loss past the wings. This is the classic <span class="text-cyan-400">butterfly P&L curve</span>.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Notice this was a 7-day trade, not 30?</b> Butterflies work best in the final week before expiration when theta decay is fastest. The ATM options (which you sold) decay rapidly in the last 5-7 days.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Iron butterflies are <i>precision bets on a pin</i>. Great for expected chop around a specific level. Use Friday expirations, target high open-interest strikes, and accept that you'll rarely get max profit—but the risk/reward is excellent.</p>
            </div>
        </div>
        `, analogy: "Throwing a dart. Highest score at the bullseye. Points decrease as you drift, until you hit the safety net.", nuance: "<b>High Credit:</b> You collect a large credit relative to risk. <br><br><b>Pinning:</b> Market makers often pin stock to strikes at OpEx.", example: "<b>Scenario:</b> <b>UBER</b> is $75. You think it pins here Friday. <br><br><b>The Trade:</b> Sell $75 Call/Put. Buy $80 Call / $70 Put. Credit: $3.50. <br><br><b>Risk:</b> Spread is $5 wide. Credit is $3.50. Max risk is only $1.50! <br><br><b>Reward:</b> If UBER is exactly $75, you keep $350. Almost 2.5x return on risk."
    },,
    {
        id: 'reverse-iron-condor', name: 'Reverse Iron Condor', tier: 5, tierName: 'Volatility', outlook: 'Explosive', objective: 'Long Vol (Defined)', risk: 'Defined', legs: [{ type: 'put', action: 'sell', strikeOffset: -20, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 20, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05)); border: 1px solid rgba(168,85,247,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #c084fc; margin: 0 0 12px 0; font-size: 1.3em;">🔄 Reverse Iron Condor</h2>
                <p style="color: #94a3b8; margin: 0;">The mirror image of an Iron Condor — you're <b>buying</b> the wings and <b>selling</b> the body. You profit when the stock makes a big move in either direction.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <h3 style="color: #a78bfa; margin: 0 0 8px 0;">How It Works</h3>
                <p class="text-slate-300">Buy an OTM put spread + buy an OTM call spread. You pay a net debit and need the stock to move beyond one of your long strikes to profit.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #a78bfa; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Defined risk (max loss = net debit paid)</p>
                <p class="text-slate-300">✅ Profits from big moves in either direction</p>
                <p class="text-slate-300">⚠️ Time decay works against you</p>
                <p class="text-slate-300">⚠️ Needs significant move to overcome debit</p>
            </div>
        </div>
        `, analogy: "Like buying earthquake insurance on both sides of a building — you lose the premium if nothing happens, but you're covered if the ground shakes in any direction.", nuance: "<b>Vol Play:</b> Best entered when IV is low and expected to expand. The debit spread structure caps both your risk and reward compared to a long strangle.", example: "<b>Scenario:</b> <b>TSLA</b> at $250 before earnings. <br><br><b>The Trade:</b> Sell $230P, buy $240P, buy $260C, sell $270C. Net debit: $3.00. <br><br><b>Outcome:</b> Max profit $7 if TSLA below $230 or above $270. Max loss $3 if it stays between $240-$260."
    },
];
