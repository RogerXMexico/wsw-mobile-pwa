import { Strategy } from '../../types';

// The Anchors - Tier 3
export const TIER_3_STRATEGIES: Strategy[] = [
    {
        id: 'long-call', name: 'Long Call', tier: 3, tierName: 'The Anchors', outlook: 'Bullish', objective: 'Leverage & Speculation', risk: 'Defined', legs: [{ type: 'call', action: 'buy', strikeOffset: 0, quantity: 1 }], analysis: `
        <div class="space-y-8">
            <div class="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-3">What This Strategy Does</h3>
                <p class="text-slate-300">The fundamental bullish bet. You pay a small amount today for the <i>right</i> to buy shares at a fixed price later. If the stock rockets, you make multiples of your money. If it doesn't, you lose what you paid—nothing more.</p>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📖</span> Trade Walkthrough: 45 Days in the Life
                </h3>
                <p class="text-slate-400 text-sm mb-4 italic">Let's follow a real trade from start to finish. No jargon yet—just watch what happens.</p>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-300 font-bold mb-2">The Setup</h4>
                        <p class="text-slate-300 text-sm">You think <b>NVDA</b> ($120) is going higher. Buying 100 shares costs $12,000—too much risk. Instead, you pay <b>$400</b> for the right to buy 100 shares at $125 anytime in the next 45 days. If NVDA never hits $125, you lose $400. If it explodes to $150, you can buy at $125 and immediately have $25/share profit.</p>
                    </div>

                    <div class="border-l-4 border-emerald-500/50 pl-4 space-y-3">
                        <h4 class="text-emerald-400 font-bold">Path A: The Rocket (Why You Bought This)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 1</span><span class="text-slate-400">NVDA at $120. Your call is worth $400. Waiting.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 10</span><span class="text-slate-400">Great AI news! NVDA jumps to $130. Your call is now worth $850. <b>+112% gain.</b></span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 20</span><span class="text-slate-400">NVDA keeps climbing to $140. Call worth $1,650. <b>+312% gain.</b> The stock moved 17%, you're up 312%.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 30</span><span class="text-slate-400">NVDA hits $145. Call worth $2,100. You decide to sell.</span></div>
                        </div>
                        <div class="bg-emerald-500/10 rounded-lg p-3 mt-2">
                            <p class="text-emerald-300 text-sm"><b>Result:</b> Paid $400, sold for $2,100. <b>Profit: $1,700 (425% return).</b> If you'd bought shares, 100 shares × $25 gain = $2,500 profit, but you risked $12,000. With the call, you made $1,700 risking only $400. That's leverage.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-amber-500/50 pl-4 space-y-3">
                        <h4 class="text-amber-400 font-bold">Path B: The Slow Bleed (The Silent Killer)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-amber-500 font-mono w-16">Day 1</span><span class="text-slate-400">NVDA at $120. Call worth $400.</span></div>
                            <div class="flex gap-3"><span class="text-amber-500 font-mono w-16">Day 15</span><span class="text-slate-400">NVDA drifts to $121. <b>Stock up 0.8%, but call only worth $300.</b> Huh?</span></div>
                            <div class="flex gap-3"><span class="text-amber-500 font-mono w-16">Day 30</span><span class="text-slate-400">NVDA at $122. Stock up 1.7%, but call worth $180. <b>You're down 55%.</b></span></div>
                            <div class="flex gap-3"><span class="text-amber-500 font-mono w-16">Day 40</span><span class="text-slate-400">NVDA at $123. Call worth $60. <b>Down 85% even though stock is UP.</b></span></div>
                            <div class="flex gap-3"><span class="text-amber-500 font-mono w-16">Day 45</span><span class="text-slate-400">NVDA closes at $124. <b>Call expires worthless.</b></span></div>
                        </div>
                        <div class="bg-amber-500/10 rounded-lg p-3 mt-2">
                            <p class="text-amber-300 text-sm"><b>Result:</b> NVDA went UP $4 (3.3%)... and you lost 100% of your money. <b>The stock wasn't wrong. Your timing was.</b> The option needed NVDA above $129 ($125 strike + $4 premium) just to break even. It never got there.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-rose-500/50 pl-4 space-y-3">
                        <h4 class="text-rose-400 font-bold">Path C: The Drop (Expected Pain)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 1</span><span class="text-slate-400">NVDA at $120. Call worth $400.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 5</span><span class="text-slate-400">Market tanks. NVDA drops to $110. <b>Call worth $120.</b> Down 70%.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 20</span><span class="text-rose-400">NVDA recovers to $115. Call worth $80. Still dying.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 45</span><span class="text-slate-400">NVDA at $112. <b>Call expires worthless.</b></span></div>
                        </div>
                        <div class="bg-rose-500/10 rounded-lg p-3 mt-2">
                            <p class="text-rose-300 text-sm"><b>Result:</b> Lost $400 (100%). But here's the silver lining: if you'd bought 100 shares at $120, you'd be down $800 right now. <b>The call let you be wrong with less pain.</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-3">What You Just Learned (Without Realizing It)</h3>
                <div class="space-y-3 text-sm">
                    <p class="text-slate-300">☑️ <b>Notice how in Path A, a 20% stock move became a 425% option gain?</b> That's <span class="text-cyan-400">leverage</span>. Options amplify movement—in both directions.</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path B, you lost money even though the stock went UP?</b> That's <span class="text-cyan-400">Theta</span> (time decay). Every day, a piece of your option's value evaporates. You're not just betting on direction—you're racing a clock.</p>
                    <p class="text-slate-300">☑️ <b>Notice how Path B was worse than Path C emotionally?</b> Being wrong about direction is expected. Being RIGHT about direction and still losing? That's the cruel lesson of options.</p>
                    <p class="text-slate-300">☑️ <b>The pattern:</b> Long calls need the stock to move <i>far enough</i> and <i>fast enough</i>. Small, slow moves are the enemy. You're fighting two battles: price AND time.</p>
                </div>
            </div>
        </div>
        `, analogy: "It's like renting a penthouse with an option to buy. If the market booms, your locked-in price makes you a genius. If it crashes, you just walk away from the lease—you lose your rent, but you don't get stuck with a depreciating asset.", nuance: "<b>Delta as Probability:</b> A 0.30 Delta call implies roughly a 30% chance the option expires In-The-Money. It is your approximate odds of profit. <br><br><b>High Delta:</b> Buying a 0.80 Delta call is a 'Stock Replacement' strategy. It moves almost dollar-for-dollar with the stock but requires less capital.", example: "<b>Scenario:</b> You believe <b>TSLA</b> ($250) will beat earnings in 3 weeks. Buying 100 shares costs $25,000 (too rich). <br><br><b>The Trade:</b> You buy <i>one</i> $260 Strike Call expiring in 60 days for a premium of $15.00 ($1,500 total cost). <br><br><b>Outcome A (Win):</b> TSLA rips to $300. Your Call is now $40 ITM + time value, likely worth $45.00 ($4,500). Profit: $3,000 (200%). <br><br><b>Outcome B (Loss):</b> TSLA drops to $240. The option expires worthless. You lose $1,500—more than the $1,000 drop on shares. But if TSLA had crashed to $150, shares lose $10,000 while your max loss stays $1,500. The option's edge is in catastrophic scenarios."
    },,
    {
        id: 'long-put', name: 'Long Put', tier: 3, tierName: 'The Anchors', outlook: 'Bearish', objective: 'Protection / Speculation', risk: 'Defined', legs: [{ type: 'put', action: 'buy', strikeOffset: 0, quantity: 1 }], analysis: `
        <div class="space-y-8">
            <div class="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-3">What This Strategy Does</h3>
                <p class="text-slate-300">The Long Put serves two masters. For the <b>Speculator</b>, it's a leveraged bet that a stock will crash—without the unlimited risk of shorting. For the <b>Investor</b>, it's insurance that locks in a floor price for shares you own.</p>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📖</span> Trade Walkthrough: 30 Days in the Life
                </h3>
                <p class="text-slate-400 text-sm mb-4 italic">Let's follow a real trade from start to finish. No jargon yet—just watch what happens.</p>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-300 font-bold mb-2">The Setup</h4>
                        <p class="text-slate-300 text-sm">You think <b>META</b> ($500) is overvalued and due for a correction. Shorting 100 shares means unlimited risk if it keeps climbing. Instead, you pay <b>$600</b> for the right to sell 100 shares at $490 anytime in the next 30 days. If META crashes to $400, you can "sell" at $490 even though it's worth $400—instant $90/share profit. If META goes up, you lose $600 max.</p>
                    </div>

                    <div class="border-l-4 border-emerald-500/50 pl-4 space-y-3">
                        <h4 class="text-emerald-400 font-bold">Path A: The Crash (Why You Bought This)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 1</span><span class="text-slate-400">META at $500. Your put is worth $600. Waiting for the drop.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 7</span><span class="text-slate-400">Bad earnings whispers. META drops to $480. Put now worth $1,400. <b>+133% gain.</b></span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 12</span><span class="text-slate-400">Earnings miss! META gaps down to $440. Put worth $5,200. <b>+767% gain.</b></span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 15</span><span class="text-slate-400">Panic selling. META hits $420. Put worth $7,300. You decide to cash out.</span></div>
                        </div>
                        <div class="bg-emerald-500/10 rounded-lg p-3 mt-2">
                            <p class="text-emerald-300 text-sm"><b>Result:</b> Paid $600, sold for $7,300. <b>Profit: $6,700 (1,117% return).</b> META dropped 16%, you made 1,117%. If you'd shorted shares, you'd have made $8,000 but with unlimited risk if META squeezed to $600+. The put gave you asymmetric payoff.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-cyan-500/50 pl-4 space-y-3">
                        <h4 class="text-cyan-400 font-bold">Path B: The Insurance Policy (Protection Mode)</h4>
                        <p class="text-slate-400 text-sm mb-2 italic">Different setup: You OWN 100 shares of META at $500. You're nervous about earnings but don't want to sell. You buy the put as insurance.</p>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 1</span><span class="text-slate-400">META at $500. Shares worth $50,000. Put cost $600.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 12</span><span class="text-slate-400">Earnings disaster. META crashes to $420. <b>Shares down $8,000.</b> But put is worth $7,300.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 15</span><span class="text-slate-400">You exercise the put—sell your shares at $490 instead of $420.</span></div>
                        </div>
                        <div class="bg-cyan-500/10 rounded-lg p-3 mt-2">
                            <p class="text-cyan-300 text-sm"><b>Result:</b> Without the put, you'd be down $8,000. With the put, you sold at $490 (only down $1,000) minus the $600 premium = <b>down $1,600 total instead of $8,000.</b> The put was your ejection seat.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-rose-500/50 pl-4 space-y-3">
                        <h4 class="text-rose-400 font-bold">Path C: The Rally (Being Wrong)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 1</span><span class="text-slate-400">META at $500. Put worth $600.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 10</span><span class="text-slate-400">META beats earnings. Jumps to $540. <b>Put worth $150.</b> Down 75%.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 20</span><span class="text-slate-400">META keeps climbing to $560. Put worth $30. Nearly dead.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 30</span><span class="text-slate-400">META closes at $570. <b>Put expires worthless.</b></span></div>
                        </div>
                        <div class="bg-rose-500/10 rounded-lg p-3 mt-2">
                            <p class="text-rose-300 text-sm"><b>Result:</b> Lost $600 (100%). But compare to shorting: if you'd shorted 100 shares at $500, you'd owe $7,000 on the $70 move against you. <b>The put let you bet on a crash with a known max loss.</b></p>
                        </div>
                    </div>

                    <div class="border-l-4 border-amber-500/50 pl-4 space-y-3">
                        <h4 class="text-amber-400 font-bold">Path D: The IV Crush Trap</h4>
                        <p class="text-slate-400 text-sm mb-2 italic">You buy the put RIGHT BEFORE earnings when everyone is scared...</p>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-amber-500 font-mono w-16">Day 1</span><span class="text-slate-400">META at $500. Earnings tomorrow. Fear is HIGH. Put costs $1,500 (inflated).</span></div>
                            <div class="flex gap-3"><span class="text-amber-500 font-mono w-16">Day 2</span><span class="text-slate-400">Earnings: META drops to $480. You were RIGHT! But... <b>put is only worth $1,200.</b></span></div>
                        </div>
                        <div class="bg-amber-500/10 rounded-lg p-3 mt-2">
                            <p class="text-amber-300 text-sm"><b>Result:</b> Stock dropped $20 in your favor... <b>and you LOST $300.</b> Why? The "fear premium" that was baked into the option price vanished after earnings. This is called <span class="text-amber-400">IV Crush</span>—buying insurance when everyone else is panicking means you overpay.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-3">What You Just Learned (Without Realizing It)</h3>
                <div class="space-y-3 text-sm">
                    <p class="text-slate-300">☑️ <b>Notice how in Path A, a 16% stock drop became a 1,117% gain?</b> That's <span class="text-cyan-400">leverage</span> working in your favor. Puts accelerate as the stock falls (this is <span class="text-cyan-400">positive gamma</span>).</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path B, the put acted as an ejection seat?</b> That's the "insurance" use case. You paid $600 to avoid $6,400 in additional losses.</p>
                    <p class="text-slate-300">☑️ <b>Notice how Path C was a total loss but still better than shorting?</b> Puts give you <span class="text-cyan-400">defined risk</span>. You can never lose more than you paid, unlike shorting where losses are theoretically infinite.</p>
                    <p class="text-slate-300">☑️ <b>Notice Path D—the sneaky trap?</b> You were RIGHT about direction but still lost money. That's <span class="text-cyan-400">IV Crush</span>. When fear is high, options are expensive. When fear disappears (after the event), that premium evaporates—even if the stock moved your way.</p>
                </div>
            </div>
        </div>
        `, analogy: "It serves two distinct functions depending on your portfolio. If you own the stock, a Put is <b>Insurance</b>—you pay a premium to guarantee a selling price. If you <i>don't</i> own the stock, a Put is <b>Mercenary</b>—a leveraged bet that the price will collapse.", nuance: "<b>Negative Delta:</b> You gain speed as it drops (Long Gamma). <br><br><b>IV Crush Risk:</b> Don't buy expensive insurance after the hurricane passes.", example: "<b>Scenario A (The Speculator):</b> You think <b>RIVN</b> ($12) is going to $8. You buy the $11 Put for $0.50. If it hits $8, the Put is worth $3.00 (500% gain). <br><br><b>Scenario B (The Protector):</b> You own 1,000 shares of <b>SPY</b> ($500) and fear a CPI print. You buy the $495 Put to cap your losses."
    },,
    {
        id: 'covered-call', name: 'Covered Call', tier: 3, tierName: 'The Anchors', outlook: 'Neutral/Bull', objective: 'Income', risk: 'Stock Risk', legs: [{ type: 'stock', action: 'buy', strikeOffset: 0, quantity: 100 }, { type: 'call', action: 'sell', strikeOffset: 10, quantity: 1 }], analysis: `
        <div class="space-y-8">
            <div class="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-3">What This Strategy Does</h3>
                <p class="text-slate-300">Trade upside for income. By selling the call, you obligate yourself to sell your shares at the strike price. This caps your gains, but the premium collected offers a small buffer and steady income.</p>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📖</span> Trade Walkthrough: 30 Days in the Life
                </h3>
                <p class="text-slate-400 text-sm mb-4 italic">Let's follow a real trade from start to finish. No jargon yet—just watch what happens.</p>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-300 font-bold mb-2">The Setup</h4>
                        <p class="text-slate-300 text-sm">You own 100 shares of <b>MSFT</b> at $400 ($40,000 position). The stock has been stuck in a range for months. You're willing to sell at $420, but you'd like to get paid while you wait. You agree to sell your shares at $420 anytime in the next 30 days if someone wants them. In exchange, someone pays you <b>$350 upfront</b>.</p>
                    </div>

                    <div class="border-l-4 border-emerald-500/50 pl-4 space-y-3">
                        <h4 class="text-emerald-400 font-bold">Path A: The Boring Market (Best Case)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 1</span><span class="text-slate-400">MSFT closes at $401. Your shares are up $100. The call you sold is worth $340. Net position +$110.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 10</span><span class="text-slate-400">MSFT drifts to $405. Shares +$500. But the call is now worth $280. Net position +$570.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 20</span><span class="text-slate-400">MSFT pulls back to $398. Shares -$200. But the call decayed to $120. Net position +$30.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 30</span><span class="text-slate-400">MSFT closes at $408. Shares +$800. <b>Call expires worthless.</b> You keep everything.</span></div>
                        </div>
                        <div class="bg-emerald-500/10 rounded-lg p-3 mt-2">
                            <p class="text-emerald-300 text-sm"><b>Result:</b> Shares gained $800. Premium kept: $350. <b>Total: +$1,150.</b> You still own your shares and can do this again next month.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-cyan-500/50 pl-4 space-y-3">
                        <h4 class="text-cyan-400 font-bold">Path B: The Rally (Bittersweet Win)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 1</span><span class="text-slate-400">MSFT at $400. Position flat.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 10</span><span class="text-slate-400">Great earnings! MSFT jumps to $430. Shares +$3,000. But the call is now worth $1,200. Net: +$2,150.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 20</span><span class="text-slate-400">MSFT keeps climbing to $445. Shares +$4,500. Call worth $2,600. Net capped around +$2,250.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 30</span><span class="text-slate-400">MSFT at $450. <b>You're assigned—forced to sell at $420.</b></span></div>
                        </div>
                        <div class="bg-cyan-500/10 rounded-lg p-3 mt-2">
                            <p class="text-cyan-300 text-sm"><b>Result:</b> Sold shares at $420 (+$2,000 gain) + kept $350 premium = <b>+$2,350 profit.</b> But MSFT is now at $450... you "missed" $3,000 of upside. You won, but it stings watching it keep going.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-rose-500/50 pl-4 space-y-3">
                        <h4 class="text-rose-400 font-bold">Path C: The Drop (The Real Risk)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 1</span><span class="text-slate-400">MSFT at $400. All good.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 5</span><span class="text-slate-400">Tech selloff. MSFT drops to $375. <b>Shares down $2,500.</b> Call worth $50. Net: -$2,200.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 15</span><span class="text-slate-400">MSFT stabilizes at $370. Shares -$3,000. Call worth $10. Net: -$2,660.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 30</span><span class="text-slate-400">MSFT closes at $365. <b>Call expires worthless.</b> You keep the $350.</span></div>
                        </div>
                        <div class="bg-rose-500/10 rounded-lg p-3 mt-2">
                            <p class="text-rose-300 text-sm"><b>Result:</b> Shares lost $3,500. Premium kept: $350. <b>Net loss: -$3,150.</b> The premium was a band-aid on a bullet wound. You still own the shares, but you're deep in the red.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-3">What You Just Learned (Without Realizing It)</h3>
                <div class="space-y-3 text-sm">
                    <p class="text-slate-300">☑️ <b>Notice how in Path A, the call melted away as days passed?</b> That's <span class="text-cyan-400">Theta</span> (time decay) working for you. You collected rent on shares you already owned.</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path B, your profit was "capped" even though the stock kept rising?</b> That's the tradeoff—you sold your upside for guaranteed income. This is called being <span class="text-cyan-400">"short gamma"</span>—big moves hurt you.</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path C, the $350 barely helped?</b> The covered call doesn't protect you from crashes. You still own the stock. The premium is income, not insurance.</p>
                    <p class="text-slate-300">☑️ <b>The pattern:</b> This strategy wants the stock to be <i>boring</i>. Flat to slightly up = perfect. Big moves in either direction = problem.</p>
                </div>
            </div>
        </div>
        `, analogy: "Think of it as renting out the attic of a house you own. You get steady rent (premium), but if someone offers you double what the house is worth, you can't sell to them because you have a tenant.", nuance: "<b>Short Gamma:</b> You want the stock to be boring. <br><br><b>Assignment:</b> Don't fall in love with your shares.", example: "<b>Scenario:</b> You own 100 shares of <b>AMD</b> ($150). It's stuck in a range. <br><br><b>The Trade:</b> You Sell the $165 Call (30 days out) for $3.00 ($300 income). <br><br><b>Outcome A (Flat):</b> AMD closes at $160. The Call expires worthless. You keep your shares + the $300 cash. <br><br><b>Outcome B (Rocket):</b> AMD flies to $180. You are forced to sell at $165. You miss out on the move from $165 to $180 ($1,500 opportunity cost), but you still made max profit on the trade."
    },,
    {
        id: 'cash-secured-put', name: 'Cash-Secured Put', tier: 3, tierName: 'The Anchors', outlook: 'Neutral/Bull', objective: 'Acquisition', risk: 'Assignment', legs: [{ type: 'put', action: 'sell', strikeOffset: -10, quantity: 1 }], analysis: `
        <div class="space-y-8">
            <div class="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-3">What This Strategy Does</h3>
                <p class="text-slate-300">Get paid to wait for a discount. You set aside cash to buy a stock at the strike price. If the stock never drops to your price, you keep the cash and the premium.</p>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📖</span> Trade Walkthrough: 30 Days in the Life
                </h3>
                <p class="text-slate-400 text-sm mb-4 italic">Let's follow a real trade from start to finish. No jargon yet—just watch what happens.</p>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-300 font-bold mb-2">The Setup</h4>
                        <p class="text-slate-300 text-sm">You like <b>AAPL</b> at $180, but you'd rather buy it at $170. Instead of just waiting, you agree to buy 100 shares at $170 if the price drops there in the next 30 days. In exchange for making this promise, someone pays you <b>$150 upfront</b>. You set aside $17,000 cash (just in case you have to buy).</p>
                    </div>

                    <div class="border-l-4 border-emerald-500/50 pl-4 space-y-3">
                        <h4 class="text-emerald-400 font-bold">Path A: The Quiet Market</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 1</span><span class="text-slate-400">AAPL closes at $180. Your position shows +$10 profit. Nothing to do.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 7</span><span class="text-slate-400">AAPL drifts to $178. Your position shows +$45. Still nothing to do.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 14</span><span class="text-slate-400">AAPL bounces to $182. Position now +$85. You're making money while doing nothing.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 21</span><span class="text-slate-400">AAPL at $179. Position +$115. The days are ticking away in your favor.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 30</span><span class="text-slate-400">AAPL finishes at $181. <b>Your promise expires worthless.</b> You keep the $150, never had to buy anything.</span></div>
                        </div>
                        <div class="bg-emerald-500/10 rounded-lg p-3 mt-2">
                            <p class="text-emerald-300 text-sm"><b>Result:</b> +$150 profit (0.88% return on $17,000 in 30 days = 10.5% annualized). You just earned money for... waiting.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-rose-500/50 pl-4 space-y-3">
                        <h4 class="text-rose-400 font-bold">Path B: The Drop</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 1</span><span class="text-slate-400">AAPL closes at $180. Position +$10.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 5</span><span class="text-slate-400">Bad earnings report. AAPL gaps down to $168. <b>Position now -$400.</b> Feels bad.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 10</span><span class="text-slate-400">AAPL recovers slightly to $172. Position -$180. Still underwater but improving.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 20</span><span class="text-slate-400">AAPL stabilizes at $171. Position -$90. Time is helping you now.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 30</span><span class="text-slate-400">AAPL at $169. You are <b>assigned</b>—you now own 100 shares at $170.</span></div>
                        </div>
                        <div class="bg-rose-500/10 rounded-lg p-3 mt-2">
                            <p class="text-rose-300 text-sm"><b>Result:</b> You paid $170/share for a stock worth $169. But wait—you collected $1.50/share upfront. <b>Real cost: $168.50.</b> You actually got AAPL at a discount to today's price. Mission accomplished?</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-purple-500/50 pl-4 space-y-3">
                        <h4 class="text-purple-400 font-bold">Path C: The Crash (The Real Risk)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 3</span><span class="text-slate-400">Tech sector crashes. AAPL drops to $155. <b>Position: -$1,200.</b></span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 30</span><span class="text-slate-400">AAPL never recovers. Closes at $150. You're assigned at $170.</span></div>
                        </div>
                        <div class="bg-purple-500/10 rounded-lg p-3 mt-2">
                            <p class="text-purple-300 text-sm"><b>Result:</b> You paid $170 for a stock worth $150. Even with the $1.50 credit, you're down $18.50/share ($1,850 loss). This is the trap—you <i>wanted</i> AAPL at $170, but now it's at $150 and you're forced to buy high.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-3">What You Just Learned (Without Realizing It)</h3>
                <div class="space-y-3 text-sm">
                    <p class="text-slate-300">☑️ <b>Notice how in Path A, you made money just because time passed?</b> That's called <span class="text-cyan-400">Theta</span>—time decay. As a seller, time is your friend.</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path B, the big drop on Day 5 hurt, but then time helped heal it?</b> Even when stocks dip, the clock keeps ticking in your favor.</p>
                    <p class="text-slate-300">☑️ <b>Notice how Path C was the only real disaster?</b> The risk isn't small dips—it's crashes. This strategy wins small and often, but can lose big and suddenly.</p>
                </div>
            </div>
        </div>
        `, analogy: "It's like placing a limit order to buy a stock, but getting paid for waiting in line. If the price never hits your level, you keep the cash. If it does, you get the stock you wanted on sale.", nuance: "<b>Positive Theta:</b> You are the casino here. <br><br><b>The Trap:</b> The risk is that the stock crashes *far* below your strike.", example: "<b>Scenario:</b> <b>PLTR</b> is trading at $25. You love the company but refuse to pay more than $22. <br><br><b>The Trade:</b> You Sell the $22 Put (30 days out) for $0.50 ($50 credit). You must keep $2,200 cash as collateral. <br><br><b>Outcome A (Dip):</b> PLTR falls to $21.50. You are assigned shares at $22. Real cost basis is $21.50 ($22 - $0.50). <br><br><b>Outcome B (Rally):</b> PLTR goes to $30. The Put expires. You keep the $50 and never get the stock."
    },,
    {
        id: 'protective-put', name: 'Protective Put', tier: 3, tierName: 'The Anchors', outlook: 'Bullish', objective: 'Insurance', risk: 'Limited', legs: [{ type: 'stock', action: 'buy', strikeOffset: 0, quantity: 100 }, { type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }], analysis: `
        <div class="space-y-8">
            <div class="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-3">What This Strategy Does</h3>
                <p class="text-slate-300">You own the stock AND buy insurance against a crash. You keep unlimited upside if the stock moons, but you have a guaranteed "floor" price where you can always sell—no matter how bad things get. It's peace of mind, but it costs money.</p>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📖</span> Trade Walkthrough: 60 Days in the Life
                </h3>
                <p class="text-slate-400 text-sm mb-4 italic">Let's follow a real trade from start to finish. No jargon yet—just watch what happens.</p>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-300 font-bold mb-2">The Setup</h4>
                        <p class="text-slate-300 text-sm">You buy 100 shares of <b>TSLA</b> at $250 ($25,000 investment). You're bullish long-term, but Elon tweets crazy things and earnings is coming up. You can't stomach losing more than 10%. So you pay <b>$800</b> for the right to sell your shares at $225 anytime in the next 60 days. No matter what happens—even if TSLA goes to $100—you can always sell at $225.</p>
                    </div>

                    <div class="border-l-4 border-emerald-500/50 pl-4 space-y-3">
                        <h4 class="text-emerald-400 font-bold">Path A: The Moon Mission (Best Case)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 1</span><span class="text-slate-400">TSLA at $250. Shares worth $25,000. Put worth $800. Total invested: $25,800.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 15</span><span class="text-slate-400">Robotaxi hype! TSLA jumps to $290. Shares up $4,000. Put now worth $200 (dying).</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 30</span><span class="text-slate-400">TSLA keeps climbing to $320. Shares up $7,000. Put worth $50.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 60</span><span class="text-slate-400">TSLA hits $350. Shares up $10,000. <b>Put expires worthless.</b></span></div>
                        </div>
                        <div class="bg-emerald-500/10 rounded-lg p-3 mt-2">
                            <p class="text-emerald-300 text-sm"><b>Result:</b> Shares gained $10,000. Put cost: -$800. <b>Net profit: $9,200.</b> The insurance "cost" you $800, but you slept well every night. And you still captured almost all the upside. Worth it? That's for you to decide.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-cyan-500/50 pl-4 space-y-3">
                        <h4 class="text-cyan-400 font-bold">Path B: The Boring Drift (Insurance Feels Wasted)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 1</span><span class="text-slate-400">TSLA at $250. Put worth $800.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 20</span><span class="text-slate-400">TSLA drifts to $255. Shares up $500. Put worth $450.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 40</span><span class="text-slate-400">TSLA at $248. Shares down $200. Put worth $250.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 60</span><span class="text-slate-400">TSLA closes at $252. Shares up $200. <b>Put expires worthless.</b></span></div>
                        </div>
                        <div class="bg-cyan-500/10 rounded-lg p-3 mt-2">
                            <p class="text-cyan-300 text-sm"><b>Result:</b> Shares gained $200. Put cost: -$800. <b>Net loss: -$600.</b> Nothing bad happened, and you lost money anyway. This is the "drag" of insurance—it costs you when you don't need it. Like paying car insurance premiums for years without an accident.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-rose-500/50 pl-4 space-y-3">
                        <h4 class="text-rose-400 font-bold">Path C: The Crash (Why You Bought This)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 1</span><span class="text-slate-400">TSLA at $250. Feeling good.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 10</span><span class="text-slate-400">Earnings disaster + Elon tweets. TSLA gaps to $200. <b>Shares down $5,000.</b> Put worth $2,800.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 25</span><span class="text-slate-400">Analysts pile on. TSLA sinks to $170. <b>Shares down $8,000.</b> Put worth $5,600.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 40</span><span class="text-slate-400">TSLA hits $150. Shares down $10,000. <b>You exercise the put—sell at $225.</b></span></div>
                        </div>
                        <div class="bg-rose-500/10 rounded-lg p-3 mt-2">
                            <p class="text-rose-300 text-sm"><b>Result:</b> Stock crashed 40% to $150. Without the put, you'd be down $10,000. But you sold at $225, so shares lost only $2,500. Minus the $800 put cost = <b>total loss: $3,300.</b> You turned a potential $10,000 disaster into a $3,300 manageable loss. <b>The put saved you $6,700.</b></p>
                        </div>
                    </div>

                    <div class="border-l-4 border-purple-500/50 pl-4 space-y-3">
                        <h4 class="text-purple-400 font-bold">Path D: The Whipsaw (The Frustrating One)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 1</span><span class="text-slate-400">TSLA at $250. Put worth $800.</span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 15</span><span class="text-slate-400">TSLA drops to $210. Shares down $4,000. Put worth $2,200. Net: -$2,600.</span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 30</span><span class="text-purple-400">You panic and exercise the put. Sell at $225. Lock in $2,500 loss + $800 premium = <b>-$3,300.</b></span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 45</span><span class="text-slate-400">TSLA recovers to $270. <b>You sold at $225 and missed a $6,000 rebound.</b></span></div>
                        </div>
                        <div class="bg-purple-500/10 rounded-lg p-3 mt-2">
                            <p class="text-purple-300 text-sm"><b>Result:</b> You had insurance for exactly this scenario... and you used it at the worst time. The put protected you, but panic made you eject before the recovery. <b>Tools work—but only if you use them correctly.</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-3">What You Just Learned (Without Realizing It)</h3>
                <div class="space-y-3 text-sm">
                    <p class="text-slate-300">☑️ <b>Notice how in Path A, you made money but "less" than if you hadn't bought the put?</b> That's the cost of insurance. You pay a premium for peace of mind. It's not "wasted"—it's the price of sleeping at night.</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path B, nothing happened and you still lost?</b> This is called <span class="text-cyan-400">"drag"</span>. Protective puts are expensive to maintain month after month. The stock needs to go UP just to break even.</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path C, your max loss was capped even though the stock collapsed 40%?</b> That's the <span class="text-cyan-400">"floor"</span>. No matter how bad it gets, you can always sell at your strike price. This is why big institutions use protective puts around major events.</p>
                    <p class="text-slate-300">☑️ <b>Notice Path D—the psychology trap?</b> Having the tool isn't enough. You need the discipline to use it correctly. Many people buy protection, then panic-sell at the bottom anyway.</p>
                    <p class="text-slate-300">☑️ <b>The pattern:</b> Protective puts are <i>expensive peace of mind</i>. They shine in crashes, drag in flat markets, and slightly reduce gains in rallies. Use them around specific events (earnings, elections) rather than permanently.</p>
                </div>
            </div>
        </div>
        `, analogy: "This is full coverage auto insurance on your Tesla. You drive it (own stock), enjoy the speed, but if you total it (market crash), the insurer writes you a check for the replacement value.", nuance: "<b>Drag:</b> Insurance costs money. Stock must rise to cover premium. <br><br><b>Convexity:</b> Position loves volatility.", example: "<b>Scenario:</b> You buy <b>NVDA</b> at $900. It's volatile, and you can't stomach a loss > 10%. <br><br><b>The Trade:</b> You Buy a $810 Put (10% OTM) for $25.00. Total cost basis: $925. <br><br><b>Outcome A (Crash):</b> NVDA drops to $700. Your loss on stock is $200, but Put is worth $110. Net loss capped. <br><br><b>Outcome B (Moon):</b> NVDA hits $1,200. Put expires worthless (-$25), but stock gains $300. Net profit $275."
    },,
    {
        id: 'collar', name: 'Collar', tier: 3, tierName: 'The Anchors', outlook: 'Neutral', objective: 'Protection', risk: 'Very Limited', legs: [{ type: 'stock', action: 'buy', strikeOffset: 0, quantity: 100 }, { type: 'put', action: 'buy', strikeOffset: -10, quantity: 1 }, { type: 'call', action: 'sell', strikeOffset: 10, quantity: 1 }], analysis: `
        <div class="space-y-8">
            <div class="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-emerald-400 mb-3">What This Strategy Does</h3>
                <p class="text-slate-300">You own stock, buy a put for downside protection, and sell a call to pay for it. The result: you can't lose much, but you can't win much either. Your outcome is "bracketed" between two prices. It's free (or cheap) insurance—but you give up big gains.</p>
            </div>

            <div class="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📖</span> Trade Walkthrough: 45 Days in the Life
                </h3>
                <p class="text-slate-400 text-sm mb-4 italic">Let's follow a real trade from start to finish. No jargon yet—just watch what happens.</p>

                <div class="space-y-4">
                    <div class="bg-black/40 rounded-xl p-4">
                        <h4 class="text-amber-300 font-bold mb-2">The Setup</h4>
                        <p class="text-slate-300 text-sm">You own 100 shares of <b>GOOGL</b> at $175 ($17,500 position). You've got a nice gain and want to protect it through earnings—but you don't want to pay for insurance. So you: <br><br>• Buy a $165 Put for $3.00 ($300) — <i>your floor</i><br>• Sell a $185 Call for $3.00 ($300) — <i>your ceiling</i><br><br><b>Net cost: $0.</b> You've locked yourself into a range: no matter what happens, your outcome is between $165 and $185.</p>
                    </div>

                    <div class="border-l-4 border-emerald-500/50 pl-4 space-y-3">
                        <h4 class="text-emerald-400 font-bold">Path A: The Sweet Spot (Stock Stays in Range)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 1</span><span class="text-slate-400">GOOGL at $175. Collar in place. Cost: $0.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 15</span><span class="text-slate-400">Earnings: GOOGL dips to $170, then recovers to $178.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 30</span><span class="text-slate-400">GOOGL drifts to $180. Put worth $20. Call worth $150.</span></div>
                            <div class="flex gap-3"><span class="text-emerald-500 font-mono w-16">Day 45</span><span class="text-slate-400">GOOGL closes at $182. <b>Both options expire worthless.</b></span></div>
                        </div>
                        <div class="bg-emerald-500/10 rounded-lg p-3 mt-2">
                            <p class="text-emerald-300 text-sm"><b>Result:</b> Shares gained $700 ($175→$182). Options netted $0. <b>Total profit: $700.</b> You got full upside within your range, AND you had protection the whole time for free. This is the ideal outcome.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-cyan-500/50 pl-4 space-y-3">
                        <h4 class="text-cyan-400 font-bold">Path B: The Rocket (You Miss the Moonshot)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 1</span><span class="text-slate-400">GOOGL at $175. Collar locked in.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 10</span><span class="text-slate-400">Blowout earnings! GOOGL jumps to $195. Shares up $2,000. But call is now worth $1,100.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 25</span><span class="text-slate-400">GOOGL keeps climbing to $210. Shares up $3,500. Call worth $2,600. Put: $0.</span></div>
                            <div class="flex gap-3"><span class="text-cyan-500 font-mono w-16">Day 45</span><span class="text-slate-400">GOOGL at $220. <b>You're assigned—forced to sell at $185.</b></span></div>
                        </div>
                        <div class="bg-cyan-500/10 rounded-lg p-3 mt-2">
                            <p class="text-cyan-300 text-sm"><b>Result:</b> Sold at $185 (your ceiling). Gain: $1,000 ($175→$185). But GOOGL went to $220. <b>You "missed" $3,500 of upside.</b> The collar worked exactly as designed—it just feels terrible watching the stock keep going without you.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-rose-500/50 pl-4 space-y-3">
                        <h4 class="text-rose-400 font-bold">Path C: The Crash (Why You Built This)</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 1</span><span class="text-slate-400">GOOGL at $175. Collar protecting you.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 8</span><span class="text-slate-400">Antitrust news. GOOGL gaps to $155. <b>Shares down $2,000.</b> But put is worth $1,200.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 20</span><span class="text-slate-400">More bad news. GOOGL sinks to $140. Shares down $3,500. Put worth $2,600.</span></div>
                            <div class="flex gap-3"><span class="text-rose-500 font-mono w-16">Day 45</span><span class="text-slate-400">GOOGL at $135. <b>You exercise the put—sell at $165.</b></span></div>
                        </div>
                        <div class="bg-rose-500/10 rounded-lg p-3 mt-2">
                            <p class="text-rose-300 text-sm"><b>Result:</b> Stock crashed 23% to $135. Without the collar, you'd be down $4,000. But you sold at $165 (your floor). <b>Loss limited to $1,000 ($175→$165).</b> The collar saved you $3,000—and it cost you nothing to set up.</p>
                        </div>
                    </div>

                    <div class="border-l-4 border-purple-500/50 pl-4 space-y-3">
                        <h4 class="text-purple-400 font-bold">Path D: The Regret Cycle</h4>
                        <div class="grid gap-2 text-sm">
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 1</span><span class="text-slate-400">GOOGL at $175. Collar on.</span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 10</span><span class="text-slate-400">GOOGL drops to $160. You're relieved the put is there.</span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 25</span><span class="text-slate-400">GOOGL recovers to $190. Now you're annoyed at the call ceiling.</span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 40</span><span class="text-slate-400">GOOGL pulls back to $178. Now you wish you had no collar at all.</span></div>
                            <div class="flex gap-3"><span class="text-purple-500 font-mono w-16">Day 45</span><span class="text-slate-400">GOOGL closes at $180. Both options expire. <b>Gain: $500.</b></span></div>
                        </div>
                        <div class="bg-purple-500/10 rounded-lg p-3 mt-2">
                            <p class="text-purple-300 text-sm"><b>Result:</b> You made $500. But you spent 45 days alternating between "thank god I have protection" and "why did I cap my upside?" <b>This is the emotional reality of collars</b>—you're always a little bit wrong about something.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-cyan-500/20 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-cyan-400 mb-3">What You Just Learned (Without Realizing It)</h3>
                <div class="space-y-3 text-sm">
                    <p class="text-slate-300">☑️ <b>Notice how the collar cost $0 but still had a "cost"?</b> The real price was giving up upside. You funded your insurance by selling your potential gains. There's no free lunch—just different ways to pay.</p>
                    <p class="text-slate-300">☑️ <b>Notice how in Path A, staying in the range was perfect?</b> Collars are ideal when you expect <span class="text-cyan-400">moderate movement</span>. Big moves in either direction trigger one of your "rails."</p>
                    <p class="text-slate-300">☑️ <b>Notice how Path B felt like a loss even though you made money?</b> That's the psychology of collars. Capping your upside creates <span class="text-cyan-400">regret risk</span>—watching gains you can't participate in.</p>
                    <p class="text-slate-300">☑️ <b>Notice how Path C was exactly what the collar was built for?</b> Free crash protection. The put saved you $3,000, paid for by giving up gains you never would have gotten anyway (since it crashed).</p>
                    <p class="text-slate-300">☑️ <b>The pattern:</b> Collars are <i>bumper bowling</i>. You can't hit a gutter ball (crash), but you also can't get a strike (moonshot). Perfect for protecting gains you can't afford to lose—like before retirement, or when you need the money for something specific.</p>
                </div>
            </div>
        </div>
        `, analogy: "It's financial bumper bowling. You put up the rails so you won't get a gutter ball (crash), but you also can't get a strike (huge gain). You stay safely in the middle lane.", nuance: "<b>Zero-Cost Collar:</b> The goal is to make the Call credit pay for the Put debit. <br><br><b>Skew Benefit:</b> Often Puts are expensive, making perfect collars hard to price.", example: "<b>Scenario:</b> You own <b>MSFT</b> ($400). You are protecting gains for tax reasons. <br><br><b>The Trade:</b> Buy $380 Put ($8.00 cost). Sell $420 Call ($8.00 credit). Net Cost: $0. <br><br><b>Outcome:</b> You are locked in. If MSFT goes to $300, you can sell at $380. If MSFT goes to $500, you must sell at $420. Your outcome is range-bound between $380 and $420 no matter what."
    },
];
