import { Strategy } from '../../types';

// Advanced & Exotic - Tier 7
export const TIER_7_STRATEGIES: Strategy[] = [
    {
        id: 'ratio-spread', name: 'Call Front Ratio (1x2)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Mild Bull', objective: 'Income', risk: 'Unlimited', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 10, quantity: 2 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">You buy one option and sell two further out. Usually done for a 'credit' or zero cost. You want the stock to rise to your short strike, but not past it.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Gold Creep</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">Gold (GLD) is at $200. You think it will slowly drift up to $210 over the next month, but you don't expect a massive rally. You want to make money if you're right—ideally for free.</p>
                <p class="text-slate-400 mt-2 text-sm">You buy 1 call at the $200 strike (costs $4.00) and sell 2 calls at $210 (each pays $2.00). Net cost: $0. You've entered for free.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Perfect Creep (GLD lands at exactly $210)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Day 1-15:</b> GLD drifts from $200 to $205. Your long $200 call is now worth $6. The $210 calls you sold are still OTM and lose value.</p>
                    <p class="text-slate-400 text-sm"><b>Day 16-30:</b> GLD continues to $210 at expiration. Your long call is worth $10 (intrinsic only). The two shorts expire worthless.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> You make $1,000 profit (10 × 100 shares) on a trade that cost you nothing. This is the dream scenario.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Fade (GLD drops to $195)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Day 1-15:</b> GLD weakens, drops to $197. All your calls lose value. But since you entered for free, you're not losing cash.</p>
                    <p class="text-slate-400 text-sm"><b>Day 16-30:</b> GLD fades to $195 at expiration. All calls expire worthless—your long and both shorts.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $0 profit, $0 loss. You risked nothing downside. The "free trade" protection worked perfectly.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: The Moderate Rally (GLD rises to $215)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Day 1-15:</b> GLD rallies nicely to $208. Your long call is doing great. But the shorts are now ATM and gaining value fast.</p>
                    <p class="text-slate-400 text-sm"><b>Day 16-30:</b> GLD ends at $215. Your long call makes $15. But each short call costs you $5—that's $10 total loss on the shorts.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> +$15 (long) - $10 (shorts) = $500 profit. You still made money, but notice how the shorts are eating into gains.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Blowout (GLD rockets to $240 on geopolitical crisis)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Day 1-5:</b> War headlines. Gold gaps from $200 to $225. Your long call is up $25. But each short is now $15 in the money—$30 total loss on shorts. Net: -$5.</p>
                    <p class="text-slate-400 text-sm"><b>Day 6-30:</b> Gold keeps running to $240. Your long makes $40. But the two shorts cost you $30 each = $60 total. Net loss: $20.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> You lose $2,000. And if gold had hit $260? You'd lose $4,000. Every dollar past your "break-even ceiling" costs you $100. This is the trap springing on you.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>That "free entry" with downside protection?</b> This is why traders call ratios "zero-cost" trades. If the stock goes down or nowhere, you lose nothing.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That perfect sweet spot at $210?</b> This is your <i>max profit point</i>—where the longs are fully profitable and shorts expire worthless.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That accelerating loss in Path D?</b> This is <i>naked call risk</i>. You sold 2 calls but only have 1 to cover. One call is "naked"—unlimited loss potential.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Ratio spreads are <i>precision instruments</i>. Perfect for "I think it moves TO here, not THROUGH here." The ceiling becomes a trap if broken.</p>
            </div>
        </div>
        `, analogy: "A trap. You set bait (long call) but if the prey is too big (massive rally), it breaks the trap (the 2 short calls) and you owe money on the damage.", nuance: "<b>Naked Risk:</b> You are naked short 1 call. If the stock gaps up on takeover news, you have unlimited risk. <br><br><b>The 'Free' Trade:</b> If done for a credit, you have no downside risk. If the stock falls, all options expire worthless and you keep the initial credit.", example: "<b>Scenario:</b> <b>GLD</b> is $200. Creep up to $210 likely. <br><br><b>The Trade:</b> Buy 1x $200 Call. Sell 2x $210 Calls. Net Cost $0. <br><br><b>Perfect:</b> GLD hits $210. Long call makes $10. Shorts expire. Profit $1,000. <br><br><b>Disaster:</b> GLD hits $250. You lose unlimited money on the naked leg."
    },,
    {
        id: 'call-backspread', name: 'Call Backspread', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Explosive', objective: 'Vol Explosion', risk: 'Limited', legs: [{ type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 2 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">You sell one expensive ATM option to buy two cheaper OTM options. You want a massive move. If the stock drops, you are safe (hedged by the short). If it rallies, you have double leverage.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The NVDA Moonshot</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">NVDA is at $800 before earnings. You believe the move will be explosive—either it moons or crashes. You don't want to just buy calls because they're expensive. You want leveraged upside exposure for free.</p>
                <p class="text-slate-400 mt-2 text-sm">You sell 1 call at $800 strike (collect $40) and buy 2 calls at $850 strike (pay $22.50 each = $45). Net debit: $5 ($500). You've set up a "moonshot catcher" for a small upfront cost.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Moonshot (NVDA rockets to $1,000)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Earnings Day:</b> NVDA beats expectations massively. Stock gaps from $800 to $920 overnight.</p>
                    <p class="text-slate-400 text-sm"><b>Next 2 Weeks:</b> Momentum continues. NVDA runs to $1,000. Your short $800 call is now $200 in the money (you owe $200). But your two $850 calls are each $150 in the money—that's $300 total profit on the longs.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> -$200 (short) + $300 (longs) - $5 (initial cost) = $9,500 profit. The double leverage kicked in beautifully, returning nearly 20x your initial investment.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Crash (NVDA drops to $700)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Earnings Day:</b> NVDA misses guidance. Stock gaps down from $800 to $720.</p>
                    <p class="text-slate-400 text-sm"><b>Next 2 Weeks:</b> Selling continues to $700 at expiration. All your calls expire worthless—the short you sold and both longs you bought.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> -$500 loss (your initial debit). All calls expire worthless. You had crash insurance built in, and the small loss is your insurance premium.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: The Valley of Death (NVDA lands exactly at $850)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Earnings Day:</b> NVDA has a moderate beat. Stock moves from $800 to $840.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> NVDA settles right at $850. Your short $800 call costs you $50. Your two $850 calls? They expire at exactly their strike—worthless (ATM at expiration = zero value).</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> -$50 (short) - $5 (initial cost) = -$5,500. This is the worst possible outcome. The stock moved just enough to hurt your short but not enough to help your longs. You landed in the "valley of death."</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Moderate Rally (NVDA rises to $875)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Earnings Week:</b> Solid beat. NVDA moves from $800 to $860.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> NVDA ends at $875. Your short $800 call costs you $75. Your two $850 calls are each worth $25—that's $50 total on the longs.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$75 (short) + $50 (longs) - $5 (initial cost) = -$3,000 loss. Better than the valley of death, but still painful. The move wasn't explosive enough.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>That zero-cost entry?</b> This is a <i>backspread</i>—selling expensive options to buy cheap ones. You finance your bet with someone else's premium.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That double leverage when NVDA hit $1,000?</b> This is <i>gamma acceleration</i>. Two calls means 2x delta. Eventually the longs overpower the short.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That max pain point at $850?</b> Traders call this the <i>valley of death</i>—where your longs are worthless and your short is fully against you. It's the break-even that never breaks.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Backspreads are <i>volatility bets</i>. You want the stock to move BIG or not at all. The middle is murder. Best before earnings, FDA decisions, or binary events.</p>
            </div>
        </div>
        `, analogy: "Reverse trap. You pay a small fee ($5 per contract) to set it up, but if the market explodes, you have double the buckets to catch the rain.", nuance: "<b>Gamma Explosion:</b> As the stock rallies, your short call hurts you (linear), but your two long calls help you (exponential). Eventually, the longs overpower the short. <br><br><b>The 'Valley of Death':</b> Your max loss is if the stock sits exactly at your long strike at expiration.", example: "<b>Scenario:</b> <b>NVDA</b> at $800. You think it hits $1000. <br><br><b>The Trade:</b> Sell $800 Call ($40). Buy 2x $850 Calls ($22.50 each). Net Debit $5 ($500). <br><br><b>Outcome:</b> If NVDA sits at $850, you lose $50 on the short, longs are worthless, plus $5 initial cost. Max Loss $5,500. <br><br><b>Win:</b> NVDA hits $1,000. Short loses $200. Longs make $150x2 = $300. Minus $5 cost = Net Profit $9,500."
    },,
    {
        id: 'put-backspread', name: 'Put Backspread', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bearish', objective: 'Crash Protection', risk: 'Limited', legs: [{ type: 'put', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: -10, quantity: 2 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Sell ATM Put, Buy 2 OTM Puts. Crash insurance paid by the short put.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Crash Lottery</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">SPY is at $500 and the market feels fragile. You want crash protection, but buying puts outright is expensive. What if you could get paid to own insurance?</p>
                <p class="text-slate-400 mt-2 text-sm">You sell 1 put at $500 (collect $12) and buy 2 puts at $480 (pay $6.50 each = $13). Net debit: $1.00 ($100). You pay a small fee for crash insurance with leveraged downside.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Crash (SPY collapses to $400)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1:</b> Recession headlines. SPY gaps from $500 to $460. Your short put is underwater ($40 loss) but your two long puts are gaining fast ($20 each = $40 profit). You're roughly flat.</p>
                    <p class="text-slate-400 text-sm"><b>Week 2-4:</b> Panic selling continues. SPY crashes to $400. Your short $500 put costs you $100. But your two $480 puts are each worth $80—that's $160 total.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> -$100 (short) + $160 (longs) - $1 (debit) = $5,900 profit. The crash insurance just paid out massively—nearly 60x your initial investment.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Rally (SPY rises to $550)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-2:</b> Good economic news. SPY drifts up from $500 to $525. All your puts lose value, but who cares?</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> SPY ends at $550. All puts expire worthless—your short and both longs.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> -$100 loss (your debit). All puts expire worthless. You paid a small premium for insurance you didn't need—like buying a warranty you never used.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: The Valley of Death (SPY lands at $480)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-2:</b> Moderate selloff. SPY drops from $500 to $485. Your short put is $15 ITM, your longs are still OTM.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> SPY ends exactly at $480. Your short put costs you $20. Your two long puts expire exactly at their strike—worthless.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> -$20 (short) + $0 (longs) - $1 (debit) = -$2,100 loss. This is the valley of death—the move was too small to trigger your insurance payout.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Moderate Dip (SPY drops to $490)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-3:</b> Choppy market. SPY bounces between $490-$505.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> SPY ends at $490. Your short put costs you $10. Your long $480 puts are OTM and expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$10 (short) + $0 (longs) - $1 (debit) = -$1,100 loss. Not catastrophic, but the market didn't move enough in either direction.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>That small debit you paid?</b> This is leveraged crash insurance. You pay a tiny premium ($100) for massive downside exposure. If nothing happens, you lose the premium. If crashes happen, you profit big.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That explosive gain in Path A?</b> Two puts means 2x downside leverage. As the market crashes, your gains accelerate while your short loss is linear. Eventually the longs overpower.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That max pain at $480?</b> The <i>valley of death</i> again—where your insurance activates but never pays out. Moderate moves are the enemy.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Put backspreads are <i>tail risk hedges</i>. They pay you to wait for catastrophe. Best when you're nervous but don't want to pay for puts. You need BIG moves or nothing.</p>
            </div>
        </div>
        `, analogy: "Paying a small fee to buy two lottery tickets for the apocalypse.", nuance: "<b>Leveraged Crash Protection:</b> Small debit for massive downside exposure.", example: "<b>Scenario:</b> Market looks shaky. <b>SPY</b> $500. <br><br><b>The Trade:</b> Sell $500 Put ($12). Buy 2x $480 Puts ($6.50 each). Net Debit $1.00 ($100). <br><br><b>Crash:</b> SPY hits $400. Short loses $100. Longs make $80x2 = $160. Minus $1 debit = Profit $59 ($5,900). <br><br><b>Rally:</b> SPY hits $550. All expire worthless. Loss: $100 (debit paid)."
    },,
    {
        id: 'zebra', name: 'ZEBRA', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bullish', objective: 'Stock Replacement', risk: 'Limited', legs: [{ type: 'call', action: 'buy', strikeOffset: -10, quantity: 2 }, { type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Zero Extrinsic Back Ratio. By buying 2 ITM and selling 1 ATM, you cancel out all the 'time value'. The result is a position that moves 1:1 with the stock (100 Delta) but costs half as much.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Budget MSFT Position</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">You want to own 100 shares of Microsoft at $400, but that's $40,000 you don't have. You could buy a call, but every day it loses value from time decay. What if you could own the stock movement without the "rent payment"?</p>
                <p class="text-slate-400 mt-2 text-sm">You buy 2 deep ITM calls at the $370 strike (each costs $35 = $70 total) and sell 1 ATM call at $400 (collect $5). Net cost: $65 = $6,500. You now control the equivalent of 100 shares.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Steady Rise (MSFT climbs to $430)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-2:</b> MSFT drifts from $400 to $410. You notice something magical: your position is up roughly $1,000—almost exactly like if you owned the stock. No daily decay eating at you.</p>
                    <p class="text-slate-400 text-sm"><b>Week 3-4:</b> MSFT continues to $430. Your two $370 calls are worth $60 each = $120 total. Your short $400 call costs $30. Net value: $90 (up from $65).</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> +$2,500 profit. Stock moved $30, you made roughly $2,500. That's nearly 1:1 with stock, but you only risked $6,500 instead of $40,000. That's 6:1 capital efficiency.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Sideways Grind (MSFT stays at $400)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-4:</b> MSFT chops between $395-$405. Normally, options would be bleeding value every day. But watch what happens.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> MSFT ends at $400. Your two $370 calls are worth their intrinsic value: $30 each = $60 total. Your $400 short call expires worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $60 - $65 cost = -$500 loss. But wait—a regular call buyer would have lost nearly their entire premium to time decay. You only lost the small amount of extrinsic that leaked through. The ZEBRA protected you.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: The Moderate Drop (MSFT falls to $380)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-2:</b> Tech selloff. MSFT drops from $400 to $385. Your position is down, just like if you owned stock.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> MSFT ends at $380. Your two $370 calls are worth $10 each = $20 total. Your short $400 call expires worthless.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $20 - $65 cost = -$4,500 loss. Stock dropped $20 and you lost roughly $4,500. Similar to owning 100 shares that dropped $45. The leverage cuts both ways.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Crash (MSFT drops to $360)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1:</b> Massive tech correction. MSFT gaps from $400 to $370.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> MSFT ends at $360—below your long strike. All your calls expire worthless. Your short was free money, but your longs are toast.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$6,500 (total loss). BUT—if you had bought the stock outright, you'd be down $4,000. Here's the thing: your max loss was capped at your investment. You can never lose more than $6,500. Stock owners could theoretically lose $40,000.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>That 1:1 movement with the stock?</b> This is <i>100 delta</i>. Two ITM calls (each ~50 delta) minus one ATM call (~50 delta) = 100 delta. You move dollar-for-dollar with the stock.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That "no time decay" magic?</b> The extrinsic value of your short call offsets the extrinsic of your longs. This is called <i>zero extrinsic</i>—hence ZEBRA.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That capped max loss?</b> Unlike actual stock ownership, your worst case is losing your initial investment. This is the <i>defined risk</i> benefit of options.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> ZEBRA is <i>synthetic stock ownership</i> for those who can't afford (or don't want to commit) full capital. Best for high-conviction, longer-term bullish plays where you need capital efficiency.</p>
            </div>
        </div>
        `, analogy: "Synthetic stock ownership. It behaves exactly like the stock—no time decay drag—but you don't pay full price for the shares.", nuance: "<b>Stock Replacement:</b> This is the only option strategy that truly mimics stock without the Theta decay headache. <br><br><b>Liquidity Warning:</b> Exiting a multi-leg deep ITM strategy can be hard. The bid-ask spreads might be wide.", example: "<b>Scenario:</b> Want <b>MSFT</b> exposure ($400) but short on cash. <br><br><b>The Trade:</b> Buy 2x $370 Calls. Sell 1x $400 Call. The extrinsic value of the short covers the extrinsic of the longs. <br><br><b>Result:</b> You control 100 shares of MSFT for roughly $3,000 instead of $40,000, and you don't pay daily 'rent' (theta)."
    },,
    {
        id: 'broken-wing-butterfly', name: 'Broken Wing Butterfly', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Range/Bull', objective: 'Income', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 0, quantity: 2 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A Butterfly where you skip a strike on the protective wing to get a credit. You take slightly more risk on one side to ensure you make money if nothing happens.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Lopsided Bet</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">NVDA is at $500. You're neutral to slightly bearish—you think it stays flat or drifts down slightly. A regular butterfly would cost you money and only wins if NVDA pins exactly at your target. What if you could get paid to place the bet, with the only risk being a massive rally?</p>
                <p class="text-slate-400 mt-2 text-sm">You buy the $490 call ($15), sell 2x $500 calls ($10 each = $20), and buy the $520 call ($4)—skipping the $510 strike. Net credit: $1.00. You just got paid $100 to enter.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Pin (NVDA lands at $500)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-2:</b> NVDA bounces between $495-$505. Your position is slowly gaining value as time passes.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> NVDA ends exactly at $500. Your $490 call is worth $10. Your two $500 calls expire worthless. Your $520 call expires worthless.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $10 (long $490) + $1 (credit) = $1,100 profit. This is your max profit zone—right at the short strikes. The lopsided structure still pays like a regular butterfly here.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Drop (NVDA falls to $480)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-2:</b> Tech weakness. NVDA sells off from $500 to $485. All your calls are losing value.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> NVDA ends at $480. Every single call—your long $490, your short $500s, your long $520—expires worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> You keep your $100 credit. You got paid to make a bet, and even when wrong on the downside, you walk away with profit. This is the "free trade" advantage.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: The Moderate Rally (NVDA rises to $510)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1-2:</b> Bullish momentum. NVDA rallies from $500 to $508.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> NVDA ends at $510. Your $490 call is worth $20. Your two $500 calls cost you $10 each = $20 total. Your $520 call is worthless.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $20 (long) - $20 (shorts) + $1 (credit) = $100 profit. You broke even on the options but kept the credit. The rally hurt but didn't crush you.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Blowout (NVDA rockets to $540)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Week 1:</b> Massive AI announcement. NVDA gaps from $500 to $525.</p>
                    <p class="text-slate-400 text-sm"><b>Expiration:</b> NVDA ends at $540. Your $490 call is worth $50. Your two $500 calls cost you $40 each = $80. Your $520 call is worth $20.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $50 + $20 - $80 + $1 = -$900 loss. This is your max loss zone—past the upper wing. The broken wing means you have less protection on the upside. But notice: max loss is capped at $900 no matter how high NVDA goes.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>That credit you received?</b> By "breaking" the wing (skipping a strike), you collected more premium. Normal butterflies cost money; this one pays you.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That free money when NVDA dropped?</b> This is the directional bias. If wrong on the downside, you keep the credit. The lopsided structure only hurts you on one side.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That capped max loss in Path D?</b> Even though you "broke" the upper wing, your long $520 call still provides protection. Loss is defined, just larger than a symmetric fly.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Broken wing butterflies are <i>directional income trades</i>. Best when you have a mild directional bias and want to get paid for being right—or wrong on one side. Trade-off: more risk in the direction of the broken wing.</p>
            </div>
        </div>
        `, analogy: "A jagged fence. One side is lower than the other. If the cow jumps the low side, you lose a bit more, but you got paid upfront to build it.", nuance: "<b>Free Trade:</b> If the stock moves away from the risk side, you keep the credit. <br><br><b>Directional Bias:</b> Unlike a regular fly, this is directional.", example: "<b>Scenario:</b> <b>NVDA</b> is $500. You are neutral to slightly bearish. <br><br><b>The Trade:</b> Buy $490 Call, Sell 2x $500 Calls, Buy $520 Call (skipping $510). Credit $1.00. <br><br><b>Outcome:</b> If NVDA stays under $500, you make money. Max loss is only if NVDA rips through $520."
    },,
    {
        id: 'long-call-butterfly', name: 'Long Call Butterfly', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Pinning', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 0, quantity: 2 }, { type: 'call', action: 'buy', strikeOffset: 5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">The classic neutral strategy. Buy one lower call, sell two at-the-money calls, buy one higher call. Max profit when stock pins exactly at the middle strike. Low cost, high reward if you nail the price target.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Precision Strike</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">SPY is at $500 with monthly expiration in 14 days. You believe SPY will pin around $500 for opex. Instead of betting on direction, you bet on location.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $495 call ($8), sell 2x $500 calls ($5.50 each = $11), buy 1x $505 call ($3.50). Net debit: $0.50 ($50 total).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Perfect Pin (SPY lands at $500)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY closes at exactly $500. Your $495 call is worth $5. Both $500 calls expire worthless. Your $505 call is worthless.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $5 - $0.50 debit = $4.50 profit ($450). That's a 900% return on your $50 investment. This is your max profit zone.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Close But Not Perfect (SPY at $502)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY ends at $502. Your $495 call is worth $7. Your two $500 calls cost $2 each = $4. Your $505 call is worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $7 - $4 - $0.50 = $2.50 profit ($250). Still profitable, but less than the perfect pin.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: The Breakout (SPY rallies to $515)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY rallies to $515. All calls are ITM. $495 call worth $20, $500 calls cost $15 each = $30, $505 call worth $10.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $20 + $10 - $30 - $0.50 = -$0.50 loss ($50). Beyond the upper wing, gains and losses cancel. You only lose your initial debit.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Selloff (SPY drops to $490)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY tanks to $490. All calls expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$0.50 loss ($50). This is your max loss—just the debit paid. Below the lower wing, everything expires worthless.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 What You Just Learned</h4>
                <p class="text-slate-300 mb-2">☑️ <b>That 900% potential return?</b> Butterflies are <i>lottery tickets with defined risk</i>. Small cost, huge payout if the stock lands exactly where you predict.</p>
                <p class="text-slate-300 mb-2">☑️ <b>That tiny max loss?</b> No matter what happens, you can only lose your initial debit. This is the appeal for pinning plays.</p>
                <p class="text-slate-300">☑️ <b>The pattern:</b> Long butterflies are <i>precision bets</i>. Best for opex pinning plays or when you have high conviction on a specific price target. Low cost of entry makes them great for speculation.</p>
            </div>
        </div>
        `, analogy: "Throwing a dart at a bullseye. Miss by a little and you still score. Miss by a lot and you lose your entry fee—nothing more.", nuance: "<b>Pinning Plays:</b> Best used when you expect a stock to settle at a specific price. Max pain, opex, or support/resistance levels. <br><br><b>Time Decay:</b> Theta works for you as expiration approaches if stock is near the center.", example: "<b>Scenario:</b> <b>SPY</b> at $500. You expect pinning at $500 for opex. <br><br><b>The Trade:</b> Buy $495/$500/$505 call butterfly for $0.50 debit. <br><br><b>Outcome:</b> Max profit $450 if SPY pins at $500. Max loss $50 anywhere else."
    },,
    {
        id: 'long-put-butterfly', name: 'Long Put Butterfly', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Pinning', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: 5, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 0, quantity: 2 }, { type: 'put', action: 'buy', strikeOffset: -5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">The put version of the classic butterfly. Buy one higher put, sell two at-the-money puts, buy one lower put. Identical payoff to the call butterfly—use whichever has better liquidity or pricing.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Put Alternative</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">AAPL is at $200. You're neutral and expect it to stay around $200. The call butterfly has wide spreads, so you check the puts—tighter markets!</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $205 put ($7), sell 2x $200 puts ($4.50 each = $9), buy 1x $195 put ($2.50). Net debit: $0.50 ($50).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Pin (AAPL at $200)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AAPL closes at $200. Your $205 put is worth $5. Both $200 puts expire worthless. Your $195 put is worthless.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $5 - $0.50 = $4.50 profit ($450). Same payoff as a call butterfly at this strike.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Slight Miss (AAPL at $198)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AAPL at $198. $205 put worth $7, two $200 puts cost $2 each = $4, $195 put worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $7 - $4 - $0.50 = $2.50 profit ($250). Profitable but reduced from max.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Rally (AAPL to $210)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> All puts expire worthless. AAPL is above all strikes.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> -$0.50 loss ($50). Max loss—your initial debit.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: Crash (AAPL to $185)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> All puts deep ITM. $205 put = $20, $200 puts = $15 each ($30), $195 put = $10.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $20 + $10 - $30 - $0.50 = -$0.50 ($50 loss). Gains cancel beyond the wings.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 When to Use Put vs Call Butterfly</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Liquidity:</b> Check open interest and bid-ask spreads. Use whichever is tighter.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Skew:</b> Put skew can make put butterflies cheaper when expecting the stock to stay flat.</p>
                <p class="text-slate-300">☑️ <b>Parity:</b> At expiration, both produce identical payoffs. The choice is purely tactical.</p>
            </div>
        </div>
        `, analogy: "Same dart game, different colored darts. The target and scoring are identical—pick the color with the better grip.", nuance: "<b>Put-Call Parity:</b> At the same strikes, put and call butterflies have identical risk/reward profiles. Choose based on liquidity and pricing.", example: "<b>Scenario:</b> <b>AAPL</b> at $200. Put spreads are tighter than calls. <br><br><b>The Trade:</b> Buy $205/$200/$195 put butterfly for $0.50. <br><br><b>Outcome:</b> Max profit $450 at $200. Max loss $50."
    },,
    {
        id: 'jade-lizard', name: 'Jade Lizard', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral/Bull', objective: 'Income', risk: 'Defined (Downside)', legs: [{ type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A short strangle with upside protection. Sell an OTM put, sell an OTM call, buy a further OTM call. Collect premium with NO upside risk if structured properly. The lizard's magic: you can't lose on rallies.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The No-Upside-Risk Income Trade</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">AMZN is at $185. You're neutral to slightly bullish. You want income but are terrified of a squeeze to the upside. Enter the Jade Lizard.</p>
                <p class="text-slate-400 mt-2 text-sm">Sell 1x $180 put ($3.50), sell 1x $190 call ($2.50), buy 1x $195 call ($1.00). Net credit: $5.00 ($500). <b>Key:</b> Your credit ($5) must exceed the call spread width ($5). This eliminates upside risk!</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Sweet Spot (AMZN stays $180-$190)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMZN ends at $186. All options expire worthless. The put is OTM. The calls are OTM.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> Keep entire $500 credit. This is max profit—stock stays between the short strikes.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Blowout Rally (AMZN rockets to $210)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMZN explodes to $210. Your $190 call costs $20. Your $195 call is worth $15. Put expires worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> -$20 (short call) + $15 (long call) + $5 (credit) = $0. <b>BREAKEVEN!</b> No matter how high AMZN goes, you can't lose on the upside. This is the lizard's magic.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Moderate Drop (AMZN to $178)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMZN drops to $178. Your $180 put costs $2. Calls expire worthless.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $5 credit - $2 put loss = $3 profit ($300). Still profitable even with a small drop.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Crash (AMZN craters to $160)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMZN crashes to $160. Your $180 put costs $20. Calls expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $5 credit - $20 put = -$15 loss ($1,500). This is the danger zone. Downside risk is real and significant—the lizard only protects you from rallies.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 The Jade Lizard Rules</h4>
                <p class="text-slate-300 mb-2">☑️ <b>The Golden Rule:</b> Credit received MUST exceed the width of the call spread. If call spread is $5 wide, collect at least $5.01. This guarantees no upside loss.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Directional Bias:</b> Best for neutral-to-bullish outlook. You're betting the stock doesn't crash.</p>
                <p class="text-slate-300">☑️ <b>The Pattern:</b> Jade Lizards are <i>short strangles with insurance on one side</i>. Perfect when you fear squeezes but want premium income.</p>
            </div>
        </div>
        `, analogy: "A bouncer who only checks IDs at the back door. Anyone can enter through the front (upside), but the basement (downside) is where the trouble is.", nuance: "<b>No Upside Risk:</b> If credit ≥ call spread width, you cannot lose money on rallies. <br><br><b>Downside Exposed:</b> Acts like a naked put on the downside—significant risk if stock crashes.", example: "<b>Scenario:</b> <b>AMZN</b> at $185. Neutral-bullish view. <br><br><b>The Trade:</b> Sell $180 put, sell $190 call, buy $195 call. Credit: $5.00. <br><br><b>Outcome:</b> Max profit $500 between $180-$190. Zero loss on any rally. Downside risk like naked put."
    },,
    {
        id: 'long-synthetic-future', name: 'Long Synthetic Future', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bullish', objective: 'Stock Replacement', risk: 'Significant', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Buy a call, sell a put at the same strike. The position moves exactly like owning 100 shares of stock. You control stock for little or no capital, but you have the same risk as a stockholder.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: Owning Stock Without Buying Stock</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">META is at $500. You want 100-share exposure but don't want to tie up $50,000. Using options, you can control the same position for almost nothing upfront.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $500 call ($15), sell 1x $500 put ($14). Net debit: $1.00 ($100). You now have 100 delta—identical to owning 100 shares.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Rally (META climbs to $550)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> META at $550. Your $500 call is worth $50. Your $500 put expires worthless.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $50 - $1 debit = $49 profit ($4,900). Stock moved $50, you made $4,900. Exactly what a stockholder would make.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Unchanged (META stays at $500)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> META ends at exactly $500. Call and put both expire worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> -$1 loss ($100). The small debit is your only cost for standing still—much less than interest on $50K.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path C: The Crash (META drops to $450)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> META crashes to $450. Your call expires worthless. Your short $500 put costs $50.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$50 - $1 = -$51 loss ($5,100). Stock dropped $50, you lost $5,100. <b>This is the catch</b>—you have full downside exposure just like a stockholder. The short put can be assigned.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Synthetic vs Actual Stock</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Capital Efficiency:</b> Control $50,000 worth of stock for $100. Massive leverage.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Same Risk:</b> If assigned on the put, you own the stock at the strike. Unlimited downside risk.</p>
                <p class="text-slate-300 mb-2">☑️ <b>No Dividends:</b> You don't receive dividends like an actual stockholder would.</p>
                <p class="text-slate-300">☑️ <b>The Pattern:</b> Synthetics are <i>leverage tools</i>. Use when you want stock exposure without capital commitment, but respect the risk.</p>
            </div>
        </div>
        `, analogy: "Renting a mansion instead of buying it. You get all the benefits of living there, but if it burns down, you're still on the hook for the damage.", nuance: "<b>100 Delta:</b> Moves dollar-for-dollar with stock. <br><br><b>Assignment Risk:</b> If stock drops, you may be assigned on the short put and forced to buy shares. <br><br><b>Margin Required:</b> Broker requires margin for the short put.", example: "<b>Scenario:</b> <b>META</b> at $500. You want exposure but not $50K outlay. <br><br><b>The Trade:</b> Buy $500 call, sell $500 put. Net cost: $1.00. <br><br><b>Outcome:</b> Acts exactly like owning 100 shares. Full upside, full downside."
    },,
    {
        id: 'advanced-double-diagonal', name: 'Double Diagonal', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Income + Time', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: -10, quantity: 1, expirationOffset: 30 }, { type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1, expirationOffset: 30 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A double calendar meets an iron condor. Sell short-term OTM options, buy longer-term further OTM options. You profit from time decay AND have protection from big moves. The holy grail of income trading.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Time Machine</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">QQQ is at $450. You expect it to stay in a range but want protection in case of a big move. You also want to profit from time passing.</p>
                <p class="text-slate-400 mt-2 text-sm">Sell $440 put (30 days, $4), buy $430 put (60 days, $5). Sell $460 call (30 days, $4), buy $470 call (60 days, $5). Net debit: $2.00 ($200).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: Range-Bound (QQQ stays $440-$460)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>30-day expiration:</b> QQQ at $450. Both short options expire worthless. You keep the $8 in short premium. Your long options still have 30 days of value.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> Short options: +$8. Long options still worth ~$6. Total value ~$6, paid $2 = ~$400 profit. Theta worked in your favor on the front month.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Moderate Move (QQQ to $465)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>30-day expiration:</b> QQQ at $465. $460 call costs $5. $470 long call has value. Put side expires worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> Call side: -$5 short + ~$3 long. Put side: +$4. Net around breakeven. The long options cushion the move.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Big Move (QQQ crashes to $420)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>30-day expiration:</b> QQQ at $420. $440 put costs $20. But your $430 put is worth $15+ (more time value).</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> Put side: -$20 + $15+ = cushioned loss. Call side: +$4 premium kept. The diagonal structure protects you.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: Extreme Move (QQQ gaps to $500)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>30-day expiration:</b> Massive gap. $460 call costs $40. $470 call worth $30.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> Call side: -$40 + $30 = -$10. Put side: +$4. Net: -$6 ($600 loss). Max loss is defined by the diagonal widths. Still better than a naked strangle.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Why Double Diagonals Shine</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Theta + Protection:</b> You get time decay income (like iron condor) PLUS crash protection (like calendars).</p>
                <p class="text-slate-300 mb-2">☑️ <b>Rolling Opportunity:</b> After front month expires, you can sell new short options against your remaining longs.</p>
                <p class="text-slate-300">☑️ <b>The Pattern:</b> Double diagonals are <i>sophisticated income trades</i>. Best for range-bound markets when you want protection from tail risks.</p>
            </div>
        </div>
        `, analogy: "A fence with shock absorbers. It contains the cattle AND flexes when they charge instead of breaking.", nuance: "<b>Two Time Frames:</b> Short-term options decay fast (income). Long-term options provide protection and flexibility. <br><br><b>Management:</b> After front month expires, you can roll to new short options or close the longs.", example: "<b>Scenario:</b> <b>QQQ</b> at $450. Expecting range $440-$460. <br><br><b>The Trade:</b> Sell 30-day $440P/$460C strangle, buy 60-day $430P/$470C strangle. <br><br><b>Outcome:</b> Profit from time decay, protected from big moves."
    },,
    {
        id: 'strap', name: 'Strap (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Volatile/Bull', objective: 'Volatility', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 2 }, { type: 'put', action: 'buy', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A bullish straddle. Buy 2 ATM calls and 1 ATM put. You're betting on a big move, but you think UP is more likely than down. If right about direction, you make 2x on the rally.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Bullish Volatility Bet</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">TSLA is at $250 ahead of earnings. You expect a big move. Your gut says UP is more likely, but you're not sure. A regular straddle pays equally for up or down—but you want extra juice on rallies.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 2x $250 calls ($12 each = $24), buy 1x $250 put ($11). Total debit: $35 ($3,500).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Blastoff (TSLA rallies to $300)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> TSLA rockets to $300. Your 2 calls are worth $50 each = $100. Your put expires worthless.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $100 - $35 = $65 profit ($6,500). Because you had 2 calls, the rally paid double compared to a standard straddle.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Crash (TSLA drops to $200)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> TSLA tanks to $200. Your 2 calls expire worthless. Your put is worth $50.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $50 - $35 = $15 profit ($1,500). Still profitable on the downside, just not as much as a straddle would be.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Muted Move (TSLA goes to $265)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> TSLA only moves to $265. 2 calls worth $15 each = $30. Put worthless.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $30 - $35 = -$5 loss ($500). Small move wasn't enough to cover the higher premium.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Pin (TSLA stays at $250)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> TSLA pins at $250. All options expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$35 loss ($3,500). Max loss—you paid for volatility that never came.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Strap vs Straddle</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Higher Premium:</b> You pay more upfront (3 options vs 2). Breakeven is further out.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Directional Bias:</b> Unlike a straddle, you're expressing a view: "I think it moves, probably up."</p>
                <p class="text-slate-300">☑️ <b>Exotic Classification:</b> Less common than straddles. Use when you have conviction about direction but still want crash protection.</p>
            </div>
        </div>
        `, analogy: "Betting on a horse race where you put 2 chips on horse A and 1 chip on horse B. You win either way, but you're rooting for A.", nuance: "<b>Asymmetric Payoff:</b> 2:1 ratio means rallies pay double what drops pay. <br><br><b>Higher Cost:</b> Costs more than a straddle, so you need a bigger move to profit.", example: "<b>Scenario:</b> <b>TSLA</b> at $250. Earnings tomorrow, bullish lean. <br><br><b>The Trade:</b> Buy 2x $250 calls, 1x $250 put. Debit: $35. <br><br><b>Outcome:</b> Rally to $300 = $6,500 profit. Drop to $200 = $1,500 profit. Pin = $3,500 loss."
    },,
    {
        id: 'strip', name: 'Strip (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Volatile/Bear', objective: 'Volatility', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: 0, quantity: 2 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A bearish straddle. Buy 1 ATM call and 2 ATM puts. You expect a big move, but think DOWN is more likely. If right about direction, you make 2x on the crash.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Bearish Volatility Bet</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">NFLX at $600 reporting earnings. You smell trouble. If they miss, it crashes. But if they beat, it might rally. You want to profit from volatility with a bearish lean.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $600 call ($18), buy 2x $600 puts ($17 each = $34). Total debit: $52 ($5,200).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Crash (NFLX tanks to $520)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> NFLX crashes to $520. Your call expires worthless. Your 2 puts are worth $80 each = $160.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $160 - $52 = $108 profit ($10,800). The 2 puts turned a big crash into a massive payday.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Rally (NFLX pops to $680)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> NFLX beats and rallies to $680. Your call is worth $80. Your puts expire worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $80 - $52 = $28 profit ($2,800). Still profitable, just not as juicy as if it crashed.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Modest Drop (NFLX to $575)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> NFLX drops only to $575. Call worthless. 2 puts worth $25 each = $50.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $50 - $52 = -$2 loss ($200). Needed a slightly bigger move to profit.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Pin (NFLX stays at $600)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> NFLX closes at $600. All options expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$52 loss ($5,200). Max loss—no movement means total loss of premium.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 When to Use a Strip</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Bearish Lean:</b> You expect volatility but think down is more likely. Earnings misses, guidance cuts, macro fears.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Crash Insurance:</b> The 2 puts give you 2x exposure to drops—perfect for "I smell blood" moments.</p>
                <p class="text-slate-300">☑️ <b>Still Protected:</b> If you're wrong and it rallies, the single call still makes money.</p>
            </div>
        </div>
        `, analogy: "Betting on a fight where you put 2 chips on the underdog knockout and 1 chip on the favorite winning. You think the upset is coming.", nuance: "<b>Inverse of Strap:</b> 1:2 ratio means crashes pay double what rallies pay. <br><br><b>Higher Breakeven:</b> Costs more than a straddle due to extra put.", example: "<b>Scenario:</b> <b>NFLX</b> at $600. Expecting volatility, bearish lean. <br><br><b>The Trade:</b> Buy 1x $600 call, 2x $600 puts. Debit: $52. <br><br><b>Outcome:</b> Crash to $520 = $10,800 profit. Rally to $680 = $2,800 profit."
    },,
    {
        id: 'covered-short-straddle', name: 'Covered Short Straddle (Advanced)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Income', risk: 'Significant', legs: [{ type: 'stock', action: 'buy', quantity: 100 }, { type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Own 100 shares and sell both an ATM call AND an ATM put. Collect massive premium. Covered on the upside, but naked exposure on the downside if stock crashes. High income, high risk.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Maximum Premium Play</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">You own 100 shares of MSFT at $400. You want maximum income and expect the stock to stay flat. A covered call isn't enough—you want to sell a put too.</p>
                <p class="text-slate-400 mt-2 text-sm">Long 100 shares ($40,000), sell 1x $400 call ($12), sell 1x $400 put ($11). Total credit: $23 ($2,300).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Pin (MSFT stays at $400)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> MSFT closes at $400. Both options expire worthless. You keep your shares.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> Keep $2,300 premium. Shares unchanged. This is the dream scenario—maximum income, no assignment.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: The Rally (MSFT to $430)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> MSFT rallies to $430. Your $400 call is assigned—you sell shares at $400. Put expires worthless.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> Sold at $400 + $23 premium = $423 effective. Shares worth $430, so you missed $7. Still profitable, but capped. Opportunity cost on big rallies.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Moderate Drop (MSFT to $385)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> MSFT drops to $385. Call expires worthless. Put is assigned—you buy 100 more shares at $400.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> Stock loss: -$15/share on original + $23 premium = +$8 net on first 100. But now you own 200 shares at $400 avg, worth $385 each. Paper loss of $3,000 on the new shares.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Crash (MSFT craters to $320)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> MSFT crashes to $320. Put assigned—you buy 100 more at $400. You now own 200 shares at $400, worth $320.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $23 premium - $80/share loss x 200 = <b>massive loss</b>. This is the danger—the short put doubles your exposure in a crash.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Why This Is Advanced</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Double Exposure:</b> If assigned on the put, you own 200 shares. A crash hurts 2x as much.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Premium is Compensation:</b> You get paid handsomely because you're taking real risk.</p>
                <p class="text-slate-300">☑️ <b>Best For:</b> High conviction that stock stays flat. Willing to own more shares at current price. Strong stomachs only.</p>
            </div>
        </div>
        `, analogy: "Running a hotel where you rent out the penthouse AND the basement. Great income when occupancy is perfect, but if both tenants trash the place, you're paying double repairs.", nuance: "<b>Covered Call + Naked Put:</b> The call is covered by shares. The put is naked—if assigned, you buy more shares. <br><br><b>Double Down Risk:</b> In a crash, you end up owning 200 shares at the strike price.", example: "<b>Scenario:</b> <b>MSFT</b> at $400. You own 100 shares, want max income. <br><br><b>The Trade:</b> Sell $400 call + $400 put. Credit: $23. <br><br><b>Outcome:</b> Pin at $400 = $2,300 pure profit. Rally = shares called away. Crash = you own 200 shares."
    },,
    {
        id: 'short-synthetic-future', name: 'Short Synthetic Future', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bearish', objective: 'Stock Replacement', risk: 'Significant', legs: [{ type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: 0, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Sell a call, buy a put at the same strike. The position moves exactly like being SHORT 100 shares. You profit from drops, lose from rallies. No borrowing fees, but full directional risk.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: Shorting Without Borrowing</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">NVDA is at $800 and you're bearish. Borrowing shares is expensive (high short interest). Instead, you create a synthetic short using options.</p>
                <p class="text-slate-400 mt-2 text-sm">Sell 1x $800 call ($45), buy 1x $800 put ($42). Net credit: $3 ($300). You now have -100 delta—identical to being short 100 shares.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Crash (NVDA drops to $700)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> NVDA tanks to $700. Your short call expires worthless. Your put is worth $100.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $100 + $3 credit = $103 profit ($10,300). Stock dropped $100, you made $10,300. Same as shorting 100 shares.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Unchanged (NVDA stays at $800)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> NVDA ends at $800. Both options expire at the money.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> Keep $3 credit ($300). No borrow costs paid. Better than actual short selling for flat stocks.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path C: The Squeeze (NVDA rockets to $900)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> NVDA squeezes to $900. Your short $800 call costs $100. Your put expires worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$100 + $3 = -$97 loss ($9,700). <b>Unlimited risk on the upside.</b> Just like being short shares, a squeeze destroys you.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Synthetic Short vs Actual Short</h4>
                <p class="text-slate-300 mb-2">☑️ <b>No Borrow Fees:</b> Hard-to-borrow stocks often have 20-50% annual borrow rates. Synthetics avoid this.</p>
                <p class="text-slate-300 mb-2">☑️ <b>No Locate Needed:</b> Some stocks are impossible to borrow. Synthetics let you short anyway.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Same Risk:</b> Unlimited upside loss. Margin required for the short call.</p>
                <p class="text-slate-300">☑️ <b>Assignment Risk:</b> If the call goes ITM, you may be assigned and forced to deliver shares.</p>
            </div>
        </div>
        `, analogy: "Renting out your house while secretly hoping it burns down. You collect rent but if the neighborhood improves, property values rise and you owe the difference.", nuance: "<b>-100 Delta:</b> Moves opposite to stock, dollar-for-dollar. <br><br><b>Unlimited Risk:</b> If stock rallies, losses are theoretically unlimited. <br><br><b>No Dividends:</b> You don't pay dividends like an actual short seller would.", example: "<b>Scenario:</b> <b>NVDA</b> at $800. Bearish, borrow rate is 30%. <br><br><b>The Trade:</b> Sell $800 call, buy $800 put. Net credit: $3. <br><br><b>Outcome:</b> Acts exactly like shorting 100 shares. No borrow fees."
    },,
    {
        id: 'seagull', name: 'Seagull (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Directional', objective: 'Zero-Cost Hedge', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: -5, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A zero-cost collar with a twist. Buy a put spread for downside protection, sell an OTM call to pay for it. You get crash protection for free, but cap your upside. Named for its payoff shape—looks like a seagull in flight.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: Free Insurance, Capped Gains</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">You own GOOGL at $175 with nice gains. You want to protect profits but don't want to pay for puts. The seagull gives you protection financed by selling upside.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $170 put ($4), sell 1x $165 put ($2), sell 1x $180 call ($2.50). Net credit: $0.50 ($50). Protection from $170-$165 costs nothing—you even get paid!</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: Modest Gains (GOOGL rises to $178)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> GOOGL at $178. All options expire worthless (call is OTM).</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> Stock gain of $3 + $0.50 credit = $3.50 profit per share. Full participation up to $180.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Big Rally (GOOGL rockets to $200)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> GOOGL explodes to $200. Your $180 call is assigned—shares called away at $180.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> Effective sale at $180 + $0.50 = $180.50. Stock is at $200, so you missed $19.50. This is the tradeoff—capped upside for free protection.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: The Dip (GOOGL drops to $168)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> GOOGL drops to $168. Your $170 put is worth $2. Other options expire worthless.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> Stock loss of $7 + put gain of $2 + $0.50 credit = -$4.50 net. The put cushioned your fall.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Crash (GOOGL craters to $155)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> GOOGL crashes to $155. $170 put worth $15, short $165 put costs $10. Net put spread value: $5.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> Stock loss of $20 + put spread gain of $5 + $0.50 credit = -$14.50 net. Without the seagull, you'd be down $20. You saved $5.50. <b>But</b>: below $165, no more protection (put spread maxes out).</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 The Seagull in Practice</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Zero-Cost (or Credit):</b> The sold call finances the put spread. Often done for net zero or small credit.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Limited Protection:</b> Unlike a collar with a full put, your protection stops at the short put strike.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Exotic Name, Simple Concept:</b> It's just a put spread + short call. The "seagull" comes from the payoff diagram shape.</p>
                <p class="text-slate-300">☑️ <b>Best For:</b> Protecting gains when you're moderately worried but don't expect a complete crash.</p>
            </div>
        </div>
        `, analogy: "An umbrella with a hole in the handle. Protects you from light rain (moderate drops), but in a hurricane (crash), water still gets through. And you can't fully stretch your arms (capped upside).", nuance: "<b>Three-Leg Structure:</b> Long put + short put (spread) + short call. The call finances the put spread. <br><br><b>Gap in Protection:</b> Below the short put strike, you're exposed again.", example: "<b>Scenario:</b> <b>GOOGL</b> at $175. Want to protect gains for free. <br><br><b>The Trade:</b> Buy $170P, sell $165P, sell $180C. Net credit: $0.50. <br><br><b>Outcome:</b> Protected from $170-$165. Capped at $180. Free insurance."
    },,
    {
        id: 'bull-call-ladder', name: 'Bull Call Ladder (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bullish', objective: 'Reduced Cost', risk: 'Unlimited Above', legs: [{ type: 'call', action: 'buy', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A bull call spread with an extra short call above. Buy one lower call, sell one middle call, sell one higher call. Reduces cost but creates unlimited risk if stock rockets too high. A "free" spread with a catch.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Subsidized Spread</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">AMD is at $150. You're moderately bullish—expecting a move to $155-160, but not a moonshot. A regular bull call spread costs $3. You want it cheaper.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $145 call ($8), sell 1x $150 call ($5), sell 1x $155 call ($3). Net debit: $0 (free entry!). The extra short call finances your spread.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Sweet Spot (AMD rises to $155)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMD at $155. $145 call worth $10, $150 call costs $5, $155 call expires worthless.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $10 - $5 = $5 profit ($500). Max profit zone. The spread worked perfectly and the extra short call expired worthless.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Modest Move (AMD to $152)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMD at $152. $145 call = $7, $150 call = $2, $155 call = $0.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $7 - $2 = $5 profit ($500). Still max profit—anywhere between $150-$155.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Too Much Rally (AMD blasts to $170)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMD rockets to $170. $145 call = $25, $150 call = $20, $155 call = $15.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $25 - $20 - $15 = -$10 loss ($1,000). <b>Here's the catch</b>—above $160, you start losing money. The naked short call kills you on huge rallies.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Drop (AMD falls to $140)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> AMD drops to $140. All calls expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $0. You entered for free, you exit for free. No loss on the downside.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Why It's Exotic</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Free Entry, Hidden Risk:</b> The zero-cost entry comes at a price—unlimited loss potential above the top strike.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Goldilocks Zone:</b> You need the stock to rise "just enough" but not too much. Precision required.</p>
                <p class="text-slate-300">☑️ <b>Best For:</b> When you have a specific price target and are confident the stock won't explode past it.</p>
            </div>
        </div>
        `, analogy: "A ladder where the top rung is missing. Climb partway and you're golden. Climb too high and you fall through the gap.", nuance: "<b>Naked Short Call:</b> The top short call is uncovered. If stock rockets, losses are unlimited. <br><br><b>Breakeven Analysis:</b> Upper breakeven = sum of strikes minus premium received. Know your danger zone.", example: "<b>Scenario:</b> <b>AMD</b> at $150. Bullish to $155-160, not higher. <br><br><b>The Trade:</b> Buy $145C, sell $150C, sell $155C. Net: $0. <br><br><b>Outcome:</b> Max profit $500 at $150-155. Unlimited loss above $160."
    },,
    {
        id: 'bear-put-ladder', name: 'Bear Put Ladder (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bearish', objective: 'Reduced Cost', risk: 'Unlimited Below', legs: [{ type: 'put', action: 'buy', strikeOffset: 5, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A bear put spread with an extra short put below. Buy one higher put, sell one middle put, sell one lower put. Low or zero cost entry, but creates unlimited risk if stock crashes too far. The bearish ladder.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Controlled Descent</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">COIN is at $200. You're bearish—expecting a pullback to $190-195, but not a complete collapse. You want cheap downside exposure.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $205 put ($9), sell 1x $200 put ($6), sell 1x $195 put ($4). Net credit: $1 ($100). You get PAID to put on a bearish position.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: Perfect Drop (COIN falls to $195)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> COIN at $195. $205 put = $10, $200 put = $5, $195 put = $0.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $10 - $5 + $1 credit = $6 profit ($600). Max profit zone—the stock fell to your target.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Slight Miss (COIN to $198)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> COIN at $198. $205 put = $7, $200 put = $2, $195 put = $0.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $7 - $2 + $1 = $6 profit ($600). Still max profit between $195-$200.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Crash Too Far (COIN craters to $170)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> COIN crashes to $170. $205 put = $35, $200 put = $30, $195 put = $25.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $35 - $30 - $25 + $1 = -$19 loss ($1,900). <b>The naked short put bites</b>—below $190, losses accelerate.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: Rally (COIN rises to $215)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> COIN rallies to $215. All puts expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> Keep $1 credit ($100). Wrong direction but you still make money. This is the ladder advantage.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 The Ladder Trap</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Credit Entry:</b> You often get paid to enter. But that payment comes with hidden risk.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Crash Risk:</b> If stock collapses completely, the naked short put creates massive losses.</p>
                <p class="text-slate-300">☑️ <b>Target Zone:</b> Best when you expect a moderate move to a specific area—not a complete meltdown.</p>
            </div>
        </div>
        `, analogy: "A safety net with a hole in the middle. Catch a small fall and you're fine. Fall too far and you go right through.", nuance: "<b>Naked Short Put:</b> The bottom short put is uncovered. Stock crash = unlimited loss potential. <br><br><b>Margin Heavy:</b> Brokers require significant margin for the naked put.", example: "<b>Scenario:</b> <b>COIN</b> at $200. Bearish to $195 area, not lower. <br><br><b>The Trade:</b> Buy $205P, sell $200P, sell $195P. Net credit: $1. <br><br><b>Outcome:</b> Max profit $600 at $195-200. Danger below $190."
    },,
    {
        id: 'long-call-condor', name: 'Long Call Condor', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Pinning', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">A butterfly with a flat top. Four strikes: buy lowest, sell two middle (different strikes), buy highest. Wider profit zone than a butterfly, but lower max profit. The condor soars in range-bound markets.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Wide Profit Zone</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">SPY is at $500. You expect it to stay in a $490-$510 range for the next 3 weeks. A butterfly requires pinning at one strike—too precise. You want a wider target.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $490 call ($14), sell 1x $495 call ($10), sell 1x $505 call ($4), buy 1x $510 call ($2). Net debit: $2 ($200).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Range (SPY lands between $495-$505)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY at $500. $490 call = $10, $495 call = $5, $505 and $510 calls = $0.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $10 - $5 - $2 = $3 profit ($300). Max profit is $5 (spread width) minus $2 debit = $3. You hit it anywhere in the $495-505 zone.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Edge of Zone (SPY at $493)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY at $493. $490 call = $3, all others = $0.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $3 - $2 = $1 profit ($100). Still profitable at the edges of your zone.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Breakout (SPY rallies to $520)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY at $520. All calls ITM. $490 = $30, $495 = $25, $505 = $15, $510 = $10.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $30 - $25 - $15 + $10 - $2 = -$2 ($200 loss). Beyond the wings, gains and losses cancel. You only lose the initial debit.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: Selloff (SPY drops to $480)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SPY tanks to $480. All calls expire worthless.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$2 ($200 loss). Max loss = initial debit. Below the lowest strike, everything is worthless.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Condor vs Butterfly</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Wider Profit Zone:</b> Butterfly needs exact pin. Condor profits across a range.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Lower Max Profit:</b> The tradeoff—wider zone means smaller max gain.</p>
                <p class="text-slate-300">☑️ <b>Same Max Loss:</b> Both strategies risk only the initial debit.</p>
            </div>
        </div>
        `, analogy: "A hammock strung between two trees. Lie anywhere in the middle and you're comfortable. Roll off either side and you fall (but not far).", nuance: "<b>Four Strikes Required:</b> Creates a flat profit plateau between the middle strikes. <br><br><b>Cost vs Probability:</b> Costs more than a butterfly but wins more often.", example: "<b>Scenario:</b> <b>SPY</b> at $500. Expecting $495-505 range. <br><br><b>The Trade:</b> Buy $490C, sell $495C, sell $505C, buy $510C. Debit: $2. <br><br><b>Outcome:</b> Max profit $300 anywhere from $495-505. Max loss $200."
    },,
    {
        id: 'long-put-condor', name: 'Long Put Condor', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Pinning', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: 10, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">The put version of the condor. Same payoff structure—use whichever has better liquidity. Buy highest put, sell two middle puts at different strikes, buy lowest put. Wide profit zone, defined risk.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Put Alternative</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">IWM (Russell 2000 ETF) at $220. You expect sideways action. Call condor has wide spreads, so you check puts—much better liquidity.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $230 put ($12), sell 1x $225 put ($8), sell 1x $215 put ($3), buy 1x $210 put ($1.50). Net debit: $2.50 ($250).</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Zone (IWM stays $215-$225)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> IWM at $220. $230 put = $10, $225 put = $5, $215 and $210 puts = $0.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $10 - $5 - $2.50 = $2.50 profit ($250). Max profit anywhere between the short strikes.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Near Edge (IWM at $227)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> IWM at $227. $230 put = $3, all others = $0.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $3 - $2.50 = $0.50 profit ($50). Reduced but still positive near breakeven.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Big Rally (IWM to $240)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> IWM rallies to $240. All puts expire worthless.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> -$2.50 ($250 loss). Initial debit lost.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: Crash (IWM to $200)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> All puts deep ITM. Gains and losses cancel beyond the wings.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> -$2.50 ($250 loss). Same max loss—the structure protects you.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Choosing Calls vs Puts</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Identical Payoff:</b> At expiration, call and put condors at same strikes produce the same P&L.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Liquidity Rules:</b> Choose whichever side has tighter bid-ask spreads.</p>
                <p class="text-slate-300">☑️ <b>Skew Consideration:</b> Put skew can make put condors slightly cheaper in some markets.</p>
            </div>
        </div>
        `, analogy: "Same hammock, different rope. The comfort zone is identical—just pick the rope that's easier to tie.", nuance: "<b>Put-Call Parity:</b> Identical risk/reward to call condor at same strikes. Choose based on execution quality.", example: "<b>Scenario:</b> <b>IWM</b> at $220. Put spreads tighter than calls. <br><br><b>The Trade:</b> Buy $230P, sell $225P, sell $215P, buy $210P. Debit: $2.50. <br><br><b>Outcome:</b> Max profit $250 from $215-225. Max loss $250."
    },,
    {
        id: 'long-guts', name: 'Long Guts (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Volatile', objective: 'Volatility', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: -5, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: 5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Buy an ITM call AND an ITM put. Like a straddle but using in-the-money options. Higher cost but more intrinsic value. You're betting on a massive move in either direction—the "guts" to go big.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The ITM Volatility Play</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">SHOP is at $100 before a major product launch. You expect a huge move but have no idea which direction. ATM straddle is expensive. You try an ITM guts for different Greeks exposure.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $95 call ($8 - includes $5 intrinsic), buy 1x $105 put ($9 - includes $5 intrinsic). Total debit: $17 ($1,700). The intrinsic value is $10, so time value paid is only $7.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: Moonshot (SHOP rockets to $130)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SHOP at $130. $95 call = $35. $105 put = $0.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $35 - $17 = $18 profit ($1,800). The call's intrinsic value exploded.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Crash (SHOP tanks to $70)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SHOP at $70. $95 call = $0. $105 put = $35.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $35 - $17 = $18 profit ($1,800). Symmetric payout—big moves pay equally either direction.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Modest Move (SHOP to $108)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SHOP at $108. $95 call = $13. $105 put = $0.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $13 - $17 = -$4 ($400 loss). Didn't move enough. You needed a bigger move to overcome the premium.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: The Pin (SHOP stays at $100)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> SHOP pins at $100. $95 call = $5 (intrinsic). $105 put = $5 (intrinsic).</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $5 + $5 - $17 = -$7 ($700 loss). Max loss. You lose all the time value paid. But you keep the $10 intrinsic.</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Guts vs Straddle</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Higher Delta:</b> ITM options have higher delta. The position moves faster with the stock initially.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Lower Vega:</b> Less sensitive to IV crush since you're buying intrinsic, not just time value.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Guaranteed Value:</b> Even at max loss, you keep the intrinsic value. Straddle can go to zero.</p>
                <p class="text-slate-300">☑️ <b>Capital Intensive:</b> Costs more upfront due to intrinsic value component.</p>
            </div>
        </div>
        `, analogy: "Buying two insurance policies that both pay out immediately if you die—one from your spouse, one from your doctor. Overlap means double cost but guaranteed partial payout.", nuance: "<b>Intrinsic Floor:</b> Unlike straddles, guts can't go to zero. The overlapping ITM strikes guarantee some value at expiration. <br><br><b>Higher Capital:</b> Requires more buying power than ATM straddle.", example: "<b>Scenario:</b> <b>SHOP</b> at $100. Major event, expecting huge move. <br><br><b>The Trade:</b> Buy $95 call + $105 put. Debit: $17. <br><br><b>Outcome:</b> Need move beyond $88 or $112 to profit. Max loss $700 if pins at $100."
    },,
    {
        id: 'short-guts', name: 'Short Guts (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Neutral', objective: 'Income', risk: 'Significant', legs: [{ type: 'call', action: 'sell', strikeOffset: -5, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: 5, quantity: 1 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Sell an ITM call AND an ITM put. Collect massive premium including intrinsic value. You're betting the stock stays between the strikes. Unlimited risk on both sides—this is aggressive income generation.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: Maximum Premium Collection</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">WMT is at $60. It's the most boring stock on the planet—hasn't moved 5% in a year. You want maximum premium income. Short strangle isn't enough—go short guts.</p>
                <p class="text-slate-400 mt-2 text-sm">Sell 1x $55 call ($7 - $5 intrinsic + $2 extrinsic), sell 1x $65 put ($8 - $5 intrinsic + $3 extrinsic). Total credit: $15 ($1,500). That's $10 intrinsic + $5 time value.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: The Pin (WMT stays at $60)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> WMT at $60. $55 call = $5 (costs you). $65 put = $5 (costs you). Total cost: $10.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $15 credit - $10 cost = $5 profit ($500). You keep all the extrinsic value. This is max profit—stock between strikes.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Slight Move (WMT to $57)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> WMT at $57. $55 call = $2 (costs you). $65 put = $8 (costs you). Total cost: $10.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $15 - $10 = $5 profit ($500). Anywhere between $55-65, you make max profit.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Breakout Rally (WMT to $72)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> WMT rallies to $72. $55 call = $17 (costs you). $65 put = $0.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $15 - $17 = -$2 ($200 loss). Beyond $70, losses accelerate. Unlimited on big moves.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: Crash (WMT craters to $45)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Expiration:</b> WMT crashes to $45. $55 call = $0. $65 put = $20 (costs you).</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $15 - $20 = -$5 ($500 loss). Losses compound on big drops. <b>Unlimited risk both directions.</b></p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 Why It's Exotic (and Dangerous)</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Assignment Guaranteed:</b> Both options are ITM. You WILL be assigned on at least one side.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Margin Intensive:</b> Brokers require substantial margin for naked ITM options.</p>
                <p class="text-slate-300 mb-2">☑️ <b>Unlimited Risk:</b> Stock crash or rally = unlimited loss potential.</p>
                <p class="text-slate-300">☑️ <b>Best For:</b> Ultra-boring stocks with no catalysts. Still dangerous if something unexpected happens.</p>
            </div>
        </div>
        `, analogy: "Selling fire insurance on a house made of brick (the stock is boring). Collect fat premiums because fires are rare. But if lightning strikes, you're paying for the whole house.", nuance: "<b>ITM = Certain Assignment:</b> Unlike short strangles, short guts guarantee assignment on at least one leg. Plan for it. <br><br><b>Max Profit = Time Value:</b> You only keep the extrinsic portion collected.", example: "<b>Scenario:</b> <b>WMT</b> at $60. Ultra-stable, expecting nothing. <br><br><b>The Trade:</b> Sell $55 call + $65 put. Credit: $15. <br><br><b>Outcome:</b> Max profit $500 between $55-65. Unlimited risk outside that range."
    },,
    {
        id: 'twisted-sister', name: 'Twisted Sister (Exotic)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Directional', objective: 'Leveraged Move', risk: 'Significant', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1, expirationOffset: 30 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 2 }], analysis: `
        <p class="text-slate-300 text-lg leading-relaxed mb-6">Buy a longer-dated ATM call, sell two shorter-dated OTM calls. A ratio spread meets a calendar. If the stock rallies moderately, both shorts expire worthless and you keep the long. If it rallies too much, the naked short call hurts.</p>

        <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6 mt-8">
            <h3 class="text-xl font-bold text-amber-400 mb-4">📖 Trade Walkthrough: The Time-Twisted Ratio</h3>

            <div class="bg-slate-800/50 rounded-xl p-4 mb-6">
                <h4 class="text-amber-300 font-semibold mb-2">The Setup</h4>
                <p class="text-slate-300">PLTR is at $25. You're bullish but want a cheap entry. Earnings are in 2 weeks (front month expiry). You expect a pop to $27-28, then continued upside.</p>
                <p class="text-slate-400 mt-2 text-sm">Buy 1x $25 call 45-day ($3.50), sell 2x $27.50 calls 14-day ($1 each = $2). Net debit: $1.50 ($150). The short calls finance most of your long.</p>
            </div>

            <div class="space-y-4">
                <div class="border-l-4 border-emerald-500 pl-4">
                    <h5 class="text-emerald-400 font-semibold">Path A: Perfect Scenario (PLTR at $27 at front expiry)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Front Expiration:</b> PLTR at $27. Both $27.50 calls expire worthless. Your $25 call (31 days left) is worth ~$4.</p>
                    <p class="text-emerald-400 text-sm mt-2"><b>Result:</b> $4 - $1.50 = $2.50 profit ($250) and you still own the call! Continue riding or sell. This is the dream—shorts die, long lives.</p>
                </div>

                <div class="border-l-4 border-cyan-500 pl-4">
                    <h5 class="text-cyan-400 font-semibold">Path B: Stock Flat (PLTR stays at $25)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Front Expiration:</b> PLTR at $25. All front-month options expire worthless. Your $25 call (31 days left) is worth ~$2.</p>
                    <p class="text-cyan-400 text-sm mt-2"><b>Result:</b> $2 - $1.50 = $0.50 profit ($50). Modest gain—the theta decay on shorts helped you.</p>
                </div>

                <div class="border-l-4 border-yellow-500 pl-4">
                    <h5 class="text-yellow-400 font-semibold">Path C: Too Much Rally (PLTR rockets to $32)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Front Expiration:</b> PLTR at $32. 2x $27.50 calls cost you $4.50 each = $9. Your $25 call worth ~$8.</p>
                    <p class="text-yellow-400 text-sm mt-2"><b>Result:</b> $8 - $9 - $1.50 = -$2.50 ($250 loss). One short call is covered by your long. The OTHER is naked—unlimited risk on further rallies.</p>
                </div>

                <div class="border-l-4 border-red-500 pl-4">
                    <h5 class="text-red-400 font-semibold">Path D: Crash (PLTR drops to $22)</h5>
                    <p class="text-slate-400 text-sm mt-1"><b>Front Expiration:</b> PLTR at $22. All calls expire worthless. Your long $25 call worth ~$0.50.</p>
                    <p class="text-red-400 text-sm mt-2"><b>Result:</b> $0.50 - $1.50 = -$1 ($100 loss). Downside limited to debit paid (mostly).</p>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 rounded-xl p-4">
                <h4 class="text-amber-300 font-semibold mb-3">💡 The "Twist"</h4>
                <p class="text-slate-300 mb-2">☑️ <b>Calendar + Ratio:</b> The time difference (longer long, shorter shorts) creates the "twist." You benefit from front-month decay.</p>
                <p class="text-slate-300 mb-2">☑️ <b>One Naked Leg:</b> Selling 2 calls against 1 long means one is uncovered. That's your unlimited risk zone.</p>
                <p class="text-slate-300">☑️ <b>Named After:</b> The 80s hair metal band. Because this trade has big hair energy—flashy but can blow up in your face.</p>
            </div>
        </div>
        `, analogy: "A catapult with a counterweight. Moderate wind sends the projectile perfectly. A hurricane sends it right back at you.", nuance: "<b>Two Time Frames:</b> The front-month shorts decay faster than your back-month long. Time works for you initially. <br><br><b>Naked Exposure:</b> Above the short strike, one call is uncovered. Manage or roll before it gets dangerous.", example: "<b>Scenario:</b> <b>PLTR</b> at $25. Bullish, want cheap exposure. <br><br><b>The Trade:</b> Buy 45-day $25C, sell 2x 14-day $27.50C. Debit: $1.50. <br><br><b>Outcome:</b> Best if PLTR at $27-28 at front expiry. Risk if it explodes past $30."
    },,
    {
        id: 'naked-call', name: 'Naked Call', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bearish', objective: 'Income (High Risk)', risk: 'Unlimited', legs: [{ type: 'call', action: 'sell', strikeOffset: 10, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05)); border: 1px solid rgba(239,68,68,0.4); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #f87171; margin: 0 0 12px 0; font-size: 1.3em;">⚠️ Naked Call</h2>
                <p style="color: #94a3b8; margin: 0;">Selling a call without owning the underlying stock. <b style="color: #f87171;">This is one of the highest-risk strategies in options.</b> Unlimited loss potential if the stock rallies.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                <h3 style="color: #fb923c; margin: 0 0 8px 0;">How It Works</h3>
                <p class="text-slate-300">You collect premium by selling a call. If the stock stays below the strike, you keep it all. If it rockets higher, your losses are theoretically unlimited.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #fb923c; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Collect premium upfront</p>
                <p class="text-slate-300">✅ Time decay works in your favor</p>
                <p class="text-slate-300">🚨 <b>UNLIMITED risk</b> if stock rallies</p>
                <p class="text-slate-300">🚨 Requires high margin / Level 4+ options approval</p>
            </div>
        </div>
        `, analogy: "Selling fire insurance on someone else's house with no reinsurance. You collect the premium, but if the house burns down, you owe everything.", nuance: "<b>Margin Intensive:</b> Brokers require significant margin. A sharp gap up can cause margin calls. Most professionals use naked calls only on indices or with strict stop-losses. <br><br><b>Why It Exists:</b> Statistically, most OTM calls expire worthless. But the tail risk is catastrophic.", example: "<b>Scenario:</b> <b>SPY</b> at $500. Bearish short-term. <br><br><b>The Trade:</b> Sell $520C for $2.50. <br><br><b>Outcome:</b> Keep $250 if SPY stays below $520. If SPY hits $540, you lose $1,750. No cap on losses."
    },,
    {
        id: 'naked-put', name: 'Naked Put', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Neutral/Bull', objective: 'Income (High Risk)', risk: 'Significant', legs: [{ type: 'put', action: 'sell', strikeOffset: -10, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(251,146,60,0.15), rgba(251,146,60,0.05)); border: 1px solid rgba(251,146,60,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #fb923c; margin: 0 0 12px 0; font-size: 1.3em;">⚡ Naked Put</h2>
                <p style="color: #94a3b8; margin: 0;">Selling a put without the cash to fully cover assignment. Similar to a cash-secured put but using margin instead of reserved cash. Higher capital efficiency, higher risk.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #fb923c; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Higher return on capital vs cash-secured puts</p>
                <p class="text-slate-300">✅ Time decay + falling IV both help</p>
                <p class="text-slate-300">⚠️ Risk = strike × 100 minus premium (if stock goes to $0)</p>
                <p class="text-slate-300">⚠️ Margin calls possible in sharp selloffs</p>
            </div>
        </div>
        `, analogy: "Like a cash-secured put that's been hitting the gym — more powerful, more efficient, but can hurt you worse if things go wrong.", nuance: "<b>Key Difference from CSP:</b> A cash-secured put reserves the full assignment cost. A naked put uses margin, freeing capital but adding liquidation risk. Same P&L profile, different risk management.", example: "<b>Scenario:</b> <b>AAPL</b> at $190. Bullish outlook. <br><br><b>The Trade:</b> Sell $180P for $3.00 on margin. <br><br><b>Outcome:</b> Keep $300 if AAPL stays above $180. If assigned, you buy at effective $177. Margin required: ~$3,600 vs $18,000 cash-secured."
    },,
    {
        id: 'put-front-ratio', name: 'Put Front Ratio (1x2)', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Mild Bear', objective: 'Income', risk: 'Unlimited', legs: [{ type: 'put', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -10, quantity: 2 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05)); border: 1px solid rgba(239,68,68,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #f87171; margin: 0 0 12px 0; font-size: 1.3em;">📉 Put Front Ratio (1x2)</h2>
                <p style="color: #94a3b8; margin: 0;">Buy 1 ATM put + sell 2 OTM puts. The bear-side mirror of the Call Front Ratio. Profits from a moderate decline to the short strike, but has unlimited downside risk if the stock crashes.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #f87171; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Often entered for a net credit or small debit</p>
                <p class="text-slate-300">✅ Max profit at short strike at expiration</p>
                <p class="text-slate-300">⚠️ Unlimited risk below the lower breakeven</p>
                <p class="text-slate-300">⚠️ One put is naked — requires margin approval</p>
            </div>
        </div>
        `, analogy: "A ski slope with a cliff at the bottom. Gentle decline is profitable. Too steep and you go off the edge.", nuance: "<b>Mirror of Call Ratio:</b> Same structure, opposite direction. Max profit when stock settles at the short strikes. Popular before earnings when IV is high (sell expensive OTM puts). <br><br><b>Risk Management:</b> Close or roll if the stock drops past the short strikes.", example: "<b>Scenario:</b> <b>AMZN</b> at $200. Expecting mild pullback. <br><br><b>The Trade:</b> Buy 1 $200P, sell 2 $190P. Net credit: $1.00. <br><br><b>Outcome:</b> Max profit $11 if AMZN at $190 at expiry. Breakeven at $179. Unlimited risk below $179."
    },,
    {
        id: 'risk-reversal', name: 'Risk Reversal', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Leveraged Directional', outlook: 'Bullish', objective: 'Synthetic Directional', risk: 'Significant', legs: [{ type: 'put', action: 'sell', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 10, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05)); border: 1px solid rgba(16,185,129,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #34d399; margin: 0 0 12px 0; font-size: 1.3em;">🔀 Risk Reversal</h2>
                <p style="color: #94a3b8; margin: 0;">Sell an OTM put to finance buying an OTM call. A directional bet that can often be done for zero cost. Like a synthetic long stock with a dead zone in the middle.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #34d399; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Often zero or near-zero cost entry</p>
                <p class="text-slate-300">✅ Unlimited upside above call strike</p>
                <p class="text-slate-300">⚠️ Significant downside below put strike (like owning stock)</p>
                <p class="text-slate-300">💡 Popular with hedge funds for directional bets</p>
            </div>
        </div>
        `, analogy: "Borrowing from one pocket to fill the other. The put premium pays for the call. You get free upside exposure but accept downside obligation.", nuance: "<b>Skew Play:</b> Often used when put IV is higher than call IV (typical in equities). You sell expensive puts and buy cheaper calls. <br><br><b>Vs Synthetic:</b> A synthetic future uses ATM options. A risk reversal uses OTM options, creating a neutral zone.", example: "<b>Scenario:</b> <b>META</b> at $500. Bullish. <br><br><b>The Trade:</b> Sell $480P, buy $520C. Net cost: $0.50. <br><br><b>Outcome:</b> Above $520.50: profit like owning stock. Between $480-$520: lose only $50. Below $480: lose like stock ownership."
    },,
    {
        id: 'short-call-butterfly', name: 'Short Call Butterfly', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Volatile', objective: 'Vol Bet', risk: 'Defined', legs: [{ type: 'call', action: 'sell', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 0, quantity: 2 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05)); border: 1px solid rgba(168,85,247,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #c084fc; margin: 0 0 12px 0; font-size: 1.3em;">🦋 Short Call Butterfly</h2>
                <p style="color: #94a3b8; margin: 0;">The inverse of a Long Call Butterfly. You <b>collect</b> a credit and profit if the stock moves significantly away from the center strike in either direction.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #c084fc; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Net credit received</p>
                <p class="text-slate-300">✅ Max profit = credit received (if stock far from center)</p>
                <p class="text-slate-300">⚠️ Max loss at center strike at expiration</p>
                <p class="text-slate-300">💡 Bet that the stock will NOT pin at a specific price</p>
            </div>
        </div>
        `, analogy: "Betting against a dart hitting the bullseye. You win if it lands anywhere except dead center.", nuance: "<b>Low Risk/Reward:</b> Small credit collected, small max loss. The inverse butterfly is rarely traded directly — more commonly used as an adjustment. <br><br><b>When to Use:</b> Expecting a move but unsure of direction. Limited capital at risk.", example: "<b>Scenario:</b> <b>NVDA</b> at $800. Expecting a big move. <br><br><b>The Trade:</b> Sell $795C, buy 2x $800C, sell $805C. Credit: $1.50. <br><br><b>Outcome:</b> Keep $150 if NVDA moves away from $800. Max loss $350 if pinned at exactly $800."
    },,
    {
        id: 'short-put-butterfly', name: 'Short Put Butterfly', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Exotic Volatility', outlook: 'Volatile', objective: 'Vol Bet', risk: 'Defined', legs: [{ type: 'put', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: 0, quantity: 2 }, { type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.05)); border: 1px solid rgba(168,85,247,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #c084fc; margin: 0 0 12px 0; font-size: 1.3em;">🦋 Short Put Butterfly</h2>
                <p style="color: #94a3b8; margin: 0;">The put-side inverse butterfly. Collect a credit and profit when the stock moves significantly away from the center strike. Same structure as the short call butterfly but built with puts.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #c084fc; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Net credit received</p>
                <p class="text-slate-300">✅ Profits from movement away from center strike</p>
                <p class="text-slate-300">⚠️ Max loss at center strike</p>
                <p class="text-slate-300">💡 Put-call parity: equivalent payoff to short call butterfly</p>
            </div>
        </div>
        `, analogy: "Same dart-missing-bullseye bet, just using a different set of darts (puts instead of calls).", nuance: "<b>Parity:</b> Theoretically identical payoff to the short call butterfly at the same strikes. Choice between puts/calls often depends on liquidity and skew pricing.", example: "<b>Scenario:</b> <b>GOOGL</b> at $175. <br><br><b>The Trade:</b> Sell $180P, buy 2x $175P, sell $170P. Credit: $1.20. <br><br><b>Outcome:</b> Keep $120 if GOOGL moves away from $175. Max loss $380 if pinned at $175."
    },,
    {
        id: 'christmas-tree-butterfly', name: 'Christmas Tree Butterfly', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Mild Bull', objective: 'Precision Targeting', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 10, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 15, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05)); border: 1px solid rgba(16,185,129,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #34d399; margin: 0 0 12px 0; font-size: 1.3em;">🎄 Christmas Tree Butterfly</h2>
                <p style="color: #94a3b8; margin: 0;">A modified butterfly with unequally spaced strikes. Like a broken wing butterfly but with the short strikes at different distances from the long. Named because the payoff diagram looks like a tree.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #34d399; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Low cost entry (small debit)</p>
                <p class="text-slate-300">✅ Wider profit zone than standard butterfly</p>
                <p class="text-slate-300">⚠️ Max loss = net debit paid</p>
                <p class="text-slate-300">💡 Directional bias built into the structure</p>
            </div>
        </div>
        `, analogy: "A Christmas tree shape — wide at the base, narrowing to a peak. The profit zone is wider on one side, tapering off.", nuance: "<b>Vs Standard Butterfly:</b> The asymmetric spacing gives you a directional lean. The Christmas tree is essentially a 1x1x1x1 spread (unlike the 1x2x1 standard butterfly). <br><br><b>Flexibility:</b> Adjust strike spacing to control how directional and how wide your profit zone is.", example: "<b>Scenario:</b> <b>MSFT</b> at $400. Mildly bullish. <br><br><b>The Trade:</b> Buy $400C, sell $405C, sell $410C, buy $415C. Debit: $1.50. <br><br><b>Outcome:</b> Max profit ~$3.50 if MSFT between $405-$410. Max loss $1.50."
    },,
    {
        id: 'box-spread', name: 'Box Spread', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Arbitrage', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'put', action: 'buy', strikeOffset: 5, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.05)); border: 1px solid rgba(34,211,238,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #60a5fa; margin: 0 0 12px 0; font-size: 1.3em;">📦 Box Spread</h2>
                <p style="color: #94a3b8; margin: 0;">A combination of a bull call spread and a bear put spread at the same strikes. The result is a position that's worth exactly the width of the strikes at expiration, regardless of stock price. Used for arbitrage and synthetic lending/borrowing.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #60a5fa; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Guaranteed value at expiration (strike width × 100)</p>
                <p class="text-slate-300">✅ No directional risk — pure interest rate play</p>
                <p class="text-slate-300">⚠️ Profit only if bought below theoretical value</p>
                <p class="text-slate-300">💡 Used by institutions as a financing tool</p>
            </div>
        </div>
        `, analogy: "Like buying a bond. You pay X today and receive a guaranteed amount at expiration. The 'interest rate' is implied by the pricing.", nuance: "<b>Not for Retail:</b> Box spreads require European-style options (SPX) to avoid early assignment risk. The famous 'GUH' story on Reddit involved box spreads on American-style options gone wrong. <br><br><b>Practical Use:</b> Institutions use box spreads to borrow/lend at implied rates, often cheaper than traditional financing.", example: "<b>Scenario:</b> <b>SPX</b> $5-wide box. Strikes: 5000/5005. <br><br><b>The Trade:</b> Buy $5000C, sell $5005C, buy $5005P, sell $5000P. Cost: $4.95. <br><br><b>Outcome:</b> Worth exactly $5.00 at expiration. Profit: $0.05 (≈1% risk-free return)."
    },,
    {
        id: 'iron-albatross', name: 'Iron Albatross', tier: 7, tierName: 'Advanced + Exotic', subCategory: 'Precision Income', outlook: 'Neutral', objective: 'Income (Wide Range)', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: -30, quantity: 1 }, { type: 'put', action: 'sell', strikeOffset: -5, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 5, quantity: 1 }, { type: 'call', action: 'buy', strikeOffset: 30, quantity: 1 }], analysis: `
        <div style="font-family: system-ui; color: #e2e8f0; line-height: 1.7; max-width: 800px;">
            <div style="background: linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05)); border: 1px solid rgba(14,165,233,0.3); border-radius: 16px; padding: 24px; margin-bottom: 20px;">
                <h2 style="color: #38bdf8; margin: 0 0 12px 0; font-size: 1.3em;">🦅 Iron Albatross</h2>
                <p style="color: #94a3b8; margin: 0;">A wide iron butterfly — selling ATM (or near-ATM) puts and calls with far OTM protective wings. Larger credit than a standard iron condor but with more risk. Named for the albatross's massive wingspan.</p>
            </div>
            <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(51,65,85,0.5); border-radius: 12px; padding: 20px;">
                <h3 style="color: #38bdf8; margin: 0 0 8px 0;">Key Points</h3>
                <p class="text-slate-300">✅ Large premium collected</p>
                <p class="text-slate-300">✅ High probability of partial profit</p>
                <p class="text-slate-300">⚠️ Wide wings = large max loss if breached</p>
                <p class="text-slate-300">💡 Essentially a short straddle with distant crash protection</p>
            </div>
        </div>
        `, analogy: "An albatross glides effortlessly with its enormous wingspan — steady income in calm skies. But that wide wingspan catches more turbulence when storms hit.", nuance: "<b>Vs Iron Condor:</b> Wider short strikes (closer to ATM) = more premium but bigger risk. Vs Iron Butterfly: The long wings are further OTM, so you keep more of the credit but accept larger max loss. <br><br><b>Position Sizing:</b> Because of the wide wings, size this smaller than a standard iron condor.", example: "<b>Scenario:</b> <b>SPY</b> at $500. Neutral outlook. <br><br><b>The Trade:</b> Buy $470P, sell $495P, sell $505C, buy $530C. Credit: $8.50. <br><br><b>Outcome:</b> Keep $850 if SPY stays between $495-$505. Max loss ~$1,650 per side."
    },
];
