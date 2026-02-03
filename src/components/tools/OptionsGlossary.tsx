import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Layers } from 'lucide-react';

/* ── types ── */
interface GlossaryTerm {
  term: string;
  abbrev?: string;
  definition: string;
  example?: string;
  related?: string[];
  category: Category;
}

type Category = 'Basics' | 'Greeks' | 'Strategies' | 'Market Mechanics' | 'Risk Management';

const CATEGORY_COLORS: Record<Category, string> = {
  Basics: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  Greeks: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  Strategies: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  'Market Mechanics': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'Risk Management': 'text-red-400 bg-red-500/10 border-red-500/30',
};

const CATEGORY_EMOJIS: Record<Category, string> = {
  Basics: '📚',
  Greeks: '🏛️',
  Strategies: '♟️',
  'Market Mechanics': '⚙️',
  'Risk Management': '🛡️',
};

/* ── glossary terms (extracted & expanded from desktop OptionsVocabulary.tsx) ── */
const TERMS: GlossaryTerm[] = [
  // Basics
  { term: 'Ask', abbrev: 'Offer', definition: 'The lowest price a seller is willing to accept for an option. If you want to buy immediately, you pay the ask.', example: 'Ask: $2.55 means the cheapest available option costs $2.55.', related: ['Bid', 'Spread', 'Mid Price'], category: 'Basics' },
  { term: 'At The Money', abbrev: 'ATM', definition: 'Strike price equals or is very close to the current stock price. Has the most extrinsic value and highest gamma.', example: 'Stock at $150, the $150 strike is ATM. Delta ≈ 0.50.', related: ['In The Money', 'Out of The Money', 'Strike Price'], category: 'Basics' },
  { term: 'Bid', definition: 'The highest price a buyer is willing to pay. If you sell immediately, you get the bid price.', example: 'Bid: $2.45 means market makers will buy your option for $2.45 right now.', related: ['Ask', 'Spread', 'Mid Price'], category: 'Basics' },
  { term: 'Buy to Close', abbrev: 'BTC', definition: 'Closing an existing short position by buying back the option you previously sold.', example: 'You STO a put for $2.00. Stock went up, put is now $0.50. You BTC for $0.50, keeping $1.50 profit.', related: ['Sell to Open', 'Buy to Open'], category: 'Basics' },
  { term: 'Buy to Open', abbrev: 'BTO', definition: 'Opening a new position by buying an option. You pay premium to acquire rights.', example: 'You BTO 1 AAPL $180 Call = You paid premium for the RIGHT to buy 100 shares at $180.', related: ['Sell to Close', 'Premium'], category: 'Basics' },
  { term: 'Contract', definition: 'One options contract represents 100 shares of the underlying stock.', example: '1 AAPL call contract gives you rights on 100 AAPL shares. Premium of $3.00 = $300 total cost.', related: ['Premium', 'Underlying'], category: 'Basics' },
  { term: 'Exercise', definition: 'Using your right as an option holder to buy (call) or sell (put) the underlying stock at the strike price.', example: 'Exercise your $150 call = buy 100 shares at $150 regardless of current price.', related: ['Assignment', 'Strike Price', 'Expiration'], category: 'Basics' },
  { term: 'Expiration Date', abbrev: 'DTE', definition: 'The last day the option can be traded or exercised. After this, the option ceases to exist.', example: '45 DTE = option expires in 45 days. 0 DTE = expires today.', related: ['Theta', 'Time Value'], category: 'Basics' },
  { term: 'In The Money', abbrev: 'ITM', definition: 'Option has intrinsic value. Calls: strike < stock price. Puts: strike > stock price.', example: 'Stock at $150. The $140 Call is $10 ITM. The $160 Put is $10 ITM.', related: ['At The Money', 'Out of The Money', 'Intrinsic Value'], category: 'Basics' },
  { term: 'Intrinsic Value', definition: 'The "real" value if exercised immediately. For calls: Stock Price - Strike. For puts: Strike - Stock Price.', example: 'Stock at $105, $100 Call has $5 intrinsic value.', related: ['Extrinsic Value', 'In The Money'], category: 'Basics' },
  { term: 'Mid Price', abbrev: 'Mark', definition: 'The midpoint between bid and ask. Often used as fair value. Most traders place limit orders near the mid.', example: 'Bid $2.45 / Ask $2.55 → Mid = $2.50.', related: ['Bid', 'Ask', 'Spread'], category: 'Basics' },
  { term: 'Open Interest', abbrev: 'OI', definition: 'Total number of outstanding contracts that haven\'t been closed or exercised. Updates once daily after close.', example: 'SPY $450 Put has 50,000 OI = 50,000 open contracts someone is holding.', related: ['Volume', 'Liquidity'], category: 'Basics' },
  { term: 'Out of The Money', abbrev: 'OTM', definition: 'Option has no intrinsic value. Calls: strike > stock price. Puts: strike < stock price.', example: 'Stock at $150. The $160 Call is $10 OTM. The $140 Put is $10 OTM.', related: ['At The Money', 'In The Money'], category: 'Basics' },
  { term: 'Premium', definition: 'The total price paid for an option. Premium = Intrinsic Value + Extrinsic Value.', example: 'You pay $3.50 premium for a call = $350 total cost (per-share price × 100).', related: ['Intrinsic Value', 'Extrinsic Value'], category: 'Basics' },
  { term: 'Sell to Close', abbrev: 'STC', definition: 'Closing an existing long position by selling the option you previously bought.', example: 'You BTO a call for $1.00. Stock rallied, call now $4.00. You STC for $4.00 = $3.00 profit.', related: ['Buy to Open', 'Sell to Open'], category: 'Basics' },
  { term: 'Sell to Open', abbrev: 'STO', definition: 'Opening a new position by selling an option. You collect premium but take on an obligation.', example: 'You STO 1 AAPL $170 Put for $3.00 = $300 collected, obligation to buy at $170 if assigned.', related: ['Buy to Close', 'Premium'], category: 'Basics' },
  { term: 'Spread', abbrev: 'Bid-Ask Spread', definition: 'The difference between bid and ask. Tight = good liquidity. Wide = poor liquidity, harder to trade.', example: 'Bid $2.45 / Ask $2.55 = $0.10 spread (tight). Bid $2.00 / Ask $3.00 = $1.00 spread (wide).', related: ['Bid', 'Ask', 'Liquidity'], category: 'Basics' },
  { term: 'Strike Price', definition: 'The price at which you can buy (call) or sell (put) the underlying stock if you exercise.', example: '$150 strike call = right to BUY stock at $150.', related: ['In The Money', 'At The Money', 'Out of The Money'], category: 'Basics' },
  { term: 'Underlying', definition: 'The stock or asset that the option derives its value from.', example: 'An AAPL option has AAPL stock as its underlying.', related: ['Contract', 'Strike Price'], category: 'Basics' },
  { term: 'Volume', definition: 'Number of contracts traded today. Resets to zero each day. High volume = active trading interest.', example: 'TSLA $250 Call has 15,000 volume = 15,000 contracts traded today.', related: ['Open Interest', 'Liquidity'], category: 'Basics' },

  // Greeks
  { term: 'Delta', abbrev: 'Δ', definition: 'How much the option price changes per $1 move in stock. Also approximates probability of expiring ITM. Range: 0 to 1 (calls) or -1 to 0 (puts).', example: 'Delta 0.60 call: Stock up $1 → option gains ~$0.60. ~60% chance of expiring ITM.', related: ['Gamma', 'Theta', 'Vega'], category: 'Greeks' },
  { term: 'Extrinsic Value', abbrev: 'Time Value', definition: 'The portion of premium above intrinsic value. Represents time and uncertainty. Decays to zero at expiration.', example: '$100 Call trading at $7 with $5 intrinsic = $2 extrinsic value.', related: ['Intrinsic Value', 'Theta', 'Premium'], category: 'Greeks' },
  { term: 'Gamma', abbrev: 'Γ', definition: 'How fast delta changes as the stock moves. Highest for ATM options near expiration.', example: 'Gamma 0.05: Stock moves $1 → delta changes by 0.05 (e.g., 0.50 → 0.55).', related: ['Delta', 'Theta'], category: 'Greeks' },
  { term: 'Implied Volatility', abbrev: 'IV', definition: 'Market\'s expectation of future volatility, backed out from option prices. Higher IV = more expensive options.', example: 'AAPL IV at 25% is calm. TSLA IV at 60% is volatile.', related: ['Vega', 'IV Rank', 'IV Crush'], category: 'Greeks' },
  { term: 'IV Crush', definition: 'Sharp drop in implied volatility after a known event (typically earnings). Devastates option buyers even if the stock moves correctly.', example: 'Pre-earnings IV: 80%. Post-earnings IV: 40%. Option loses half its extrinsic value overnight.', related: ['Implied Volatility', 'Vega', 'Earnings'], category: 'Greeks' },
  { term: 'IV Rank', abbrev: 'IVR', definition: 'Where current IV sits relative to its range over the past year. 0% = lowest, 100% = highest.', example: 'IVR of 80% means current IV is near the top of its yearly range — options are expensive.', related: ['Implied Volatility', 'IV Percentile'], category: 'Greeks' },
  { term: 'Rho', abbrev: 'ρ', definition: 'How much option price changes per 1% change in interest rates. Small effect for short-dated options.', example: 'Rho of 0.05 means a 1% rate increase adds $0.05 to a call option.', related: ['Delta', 'Vega'], category: 'Greeks' },
  { term: 'Theta', abbrev: 'Θ', definition: 'Daily time decay — how much value the option loses each day from time passing. Negative for long options.', example: 'Theta -0.05: Option loses $5 per contract per day.', related: ['Delta', 'Gamma', 'Expiration Date'], category: 'Greeks' },
  { term: 'Vega', abbrev: 'ν', definition: 'How much option price changes per 1% change in implied volatility. Higher for longer-dated options.', example: 'Vega 0.15: IV up 1% → option gains $0.15 ($15/contract).', related: ['Implied Volatility', 'Theta'], category: 'Greeks' },

  // Strategies
  { term: 'Bull Call Spread', definition: 'Buy a call at a lower strike and sell a call at a higher strike. Same expiration. Reduces cost but caps profit.', example: 'Buy $100 call for $5, sell $110 call for $2. Net cost $3, max profit $7.', related: ['Bear Put Spread', 'Debit Spread'], category: 'Strategies' },
  { term: 'Bear Put Spread', definition: 'Buy a put at a higher strike and sell a put at a lower strike. Same expiration. Bearish defined-risk play.', example: 'Buy $100 put for $5, sell $90 put for $2. Net cost $3, max profit $7.', related: ['Bull Call Spread', 'Debit Spread'], category: 'Strategies' },
  { term: 'Covered Call', definition: 'Own 100 shares and sell a call against them. Collect premium but cap upside.', example: 'Own 100 AAPL at $180, sell $190 call for $3. Income if stock stays below $190.', related: ['Cash-Secured Put', 'Wheel Strategy'], category: 'Strategies' },
  { term: 'Cash-Secured Put', abbrev: 'CSP', definition: 'Sell a put while holding enough cash to buy 100 shares at the strike if assigned.', example: 'Sell $170 put for $3 with $17,000 cash reserved. Willing to buy at $170.', related: ['Covered Call', 'Wheel Strategy'], category: 'Strategies' },
  { term: 'Iron Condor', definition: 'Sell both a call spread and put spread. Profit if stock stays within a range. Defined risk on both sides.', example: 'Sell $100/$105 call spread + sell $90/$85 put spread. Profit zone: $90-$100.', related: ['Strangle', 'Credit Spread'], category: 'Strategies' },
  { term: 'Straddle', definition: 'Buy both a call and put at the same strike and expiration. Profit from big moves in either direction.', example: 'Buy $100 call + $100 put for $8 total. Profit if stock moves > $8 in either direction.', related: ['Strangle', 'Implied Volatility'], category: 'Strategies' },
  { term: 'Strangle', definition: 'Buy an OTM call and OTM put. Cheaper than a straddle but needs a bigger move to profit.', example: 'Buy $105 call + $95 put for $4. Need stock above $109 or below $91.', related: ['Straddle', 'Iron Condor'], category: 'Strategies' },
  { term: 'Wheel Strategy', definition: 'Cycle between selling puts (to buy stock) and selling calls (on owned stock). Income-focused strategy.', example: 'Sell puts → get assigned → sell covered calls → shares called away → repeat.', related: ['Cash-Secured Put', 'Covered Call'], category: 'Strategies' },
  { term: 'Credit Spread', definition: 'Any spread where you collect net premium when opening. Profit when the spread expires worthless.', example: 'Sell $105 call, buy $110 call for net $1.50 credit. Max loss $3.50.', related: ['Debit Spread', 'Iron Condor'], category: 'Strategies' },
  { term: 'Debit Spread', definition: 'Any spread where you pay net premium when opening. Profit when the spread moves in your favor.', example: 'Buy $100 call, sell $105 call for net $2 debit. Max profit $3.', related: ['Credit Spread', 'Bull Call Spread'], category: 'Strategies' },

  // Market Mechanics
  { term: 'Assignment', definition: 'When an option seller is required to fulfill their obligation — buy (put) or sell (call) shares at the strike price.', example: 'Your short $100 put gets assigned → you must buy 100 shares at $100.', related: ['Exercise', 'Expiration Date'], category: 'Market Mechanics' },
  { term: 'Block Trade', definition: 'A single large order executed at one price, usually negotiated between institutions.', example: '10,000 contracts traded as a single block at $2.50 — institutional positioning.', related: ['Sweep', 'Unusual Activity'], category: 'Market Mechanics' },
  { term: 'Liquidity', definition: 'How easily you can enter and exit positions at fair prices. Measured by volume, OI, and bid-ask spread.', example: 'SPY options: very liquid. Random small-cap: likely illiquid.', related: ['Volume', 'Open Interest', 'Spread'], category: 'Market Mechanics' },
  { term: 'Market Maker', definition: 'Firms that provide liquidity by continuously offering to buy and sell options. They profit from the bid-ask spread.', example: 'Citadel, Wolverine, etc. set bid/ask prices on thousands of options continuously.', related: ['Bid', 'Ask', 'Spread'], category: 'Market Mechanics' },
  { term: 'Option Chain', definition: 'Display of all available options for a stock, organized by expiration and strike, showing calls and puts side by side.', example: 'The AAPL option chain shows every available strike and expiration with bids, asks, volume, OI, and Greeks.', related: ['Strike Price', 'Expiration Date'], category: 'Market Mechanics' },
  { term: 'Put/Call Ratio', definition: 'Ratio of put volume to call volume. High = more puts (bearish). Low = more calls (bullish). Extreme values can be contrarian signals.', example: 'P/C 0.7 = 70 puts per 100 calls. P/C 1.5 = heavy put buying.', related: ['Volume', 'Sentiment'], category: 'Market Mechanics' },
  { term: 'Sweep', definition: 'An aggressive order that sweeps across multiple exchanges to fill fast, often paying the ask. Indicates urgency and conviction.', example: 'Trader needs 5,000 contracts NOW — sweeps all available asks across exchanges.', related: ['Block Trade', 'Unusual Activity'], category: 'Market Mechanics' },
  { term: 'Unusual Activity', abbrev: 'UOA', definition: 'Options volume significantly higher than normal (2x+ average). May indicate informed trading ahead of news.', example: 'XYZ averages 500 contracts/day. Today: 15,000 with no news. That\'s unusual.', related: ['Sweep', 'Block Trade', 'Volume'], category: 'Market Mechanics' },

  // Risk Management
  { term: 'Breakeven', definition: 'The stock price at which your trade has zero profit/loss at expiration. For calls: strike + premium. For puts: strike - premium.', example: 'Buy $100 call for $3 → breakeven at $103 at expiration.', related: ['Premium', 'Strike Price'], category: 'Risk Management' },
  { term: 'Defined Risk', definition: 'Trades where maximum possible loss is known upfront. Buying options and spreads are defined-risk.', example: 'Buy a call for $3 → max loss is $300 no matter what happens.', related: ['Undefined Risk', 'Spread'], category: 'Risk Management' },
  { term: 'Max Loss', definition: 'The maximum amount you can lose on a trade. For long options, it\'s the premium paid. For spreads, it\'s width minus credit.', example: 'Long call bought for $5 → max loss $500. $5-wide spread for $1.50 credit → max loss $350.', related: ['Max Profit', 'Defined Risk'], category: 'Risk Management' },
  { term: 'Max Profit', definition: 'The maximum amount you can gain. Unlimited for long calls. For credit spreads, it\'s the credit received.', example: 'Credit spread for $1.50 → max profit $150 per contract.', related: ['Max Loss', 'Risk/Reward'], category: 'Risk Management' },
  { term: 'Position Sizing', definition: 'Determining how many contracts to trade based on account size and risk tolerance. Never risk more than 1-2% per trade.', example: '$50,000 account, 1% rule = max $500 risk per trade.', related: ['Max Loss', 'Risk Management'], category: 'Risk Management' },
  { term: 'Rolling', definition: 'Closing your current option and simultaneously opening a new one with different terms (strike/expiration). Used to manage losing positions.', example: 'Close Jan $100 put, open Feb $95 put for a credit = rolled out and down.', related: ['Adjustment', 'Breakeven'], category: 'Risk Management' },
  { term: 'Stop Loss', definition: 'A predetermined exit point to limit losses. In options, often set at 50% of premium paid.', example: 'Bought call for $4. Stop loss at $2 = exit if option drops 50%.', related: ['Position Sizing', 'Risk/Reward'], category: 'Risk Management' },
  { term: 'Undefined Risk', definition: 'Trades where theoretical max loss is very large or unlimited. Selling naked calls/puts.', example: 'Selling a naked call has unlimited risk if stock goes to infinity.', related: ['Defined Risk', 'Margin'], category: 'Risk Management' },
];

/* ── alphabet letters present ── */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* ── main component ── */
export default function OptionsGlossary() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories: (Category | 'All')[] = ['All', 'Basics', 'Greeks', 'Strategies', 'Market Mechanics', 'Risk Management'];

  /* filter terms */
  const filtered = useMemo(() => {
    let result = TERMS;
    if (activeCategory !== 'All') {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          (t.abbrev && t.abbrev.toLowerCase().includes(q)) ||
          t.definition.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeCategory]);

  /* letters that have terms */
  const activeLetters = useMemo(() => {
    const s = new Set<string>();
    filtered.forEach((t) => s.add(t.term[0].toUpperCase()));
    return s;
  }, [filtered]);

  /* scroll to letter */
  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`glossary-${letter}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* group by letter */
  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    filtered.forEach((t) => {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    });
    return map;
  }, [filtered]);

  const toggleCard = (term: string) => {
    setRevealedCards((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-black pb-24" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
      {/* header */}
      <div className="px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#39ff14] text-sm font-medium min-h-[44px] active:scale-[0.98]">
          <ArrowLeft size={18} /> Back
        </button>

        <div className="flex items-center justify-between mt-2 mb-1">
          <h1 className="text-xl font-black text-white">📖 Options Glossary</h1>
          <button
            onClick={() => { setFlashcardMode((m) => !m); setRevealedCards(new Set()); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold min-h-[36px] active:scale-[0.98] border transition-all ${
              flashcardMode
                ? 'bg-[#39ff14]/20 border-[#39ff14]/40 text-[#39ff14]'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400'
            }`}
          >
            <Layers size={12} className="inline mr-1" />
            {flashcardMode ? 'Flashcards ON' : 'Flashcards'}
          </button>
        </div>
        <p className="text-zinc-500 text-xs mb-3">{TERMS.length} terms · tap to expand{flashcardMode ? ' · flashcard mode' : ''}</p>

        {/* search bar */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#39ff14]/40 min-h-[44px]"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 active:scale-[0.98]">
              <X size={16} />
            </button>
          )}
        </div>

        {/* category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none mb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium min-h-[36px] active:scale-[0.98] transition-all border ${
                activeCategory === cat
                  ? cat === 'All'
                    ? 'bg-[#39ff14]/20 text-[#39ff14] border-[#39ff14]/30'
                    : CATEGORY_COLORS[cat as Category].split(' ').map(c => c).join(' ')
                  : 'bg-zinc-900 text-zinc-500 border-zinc-800'
              }`}
            >
              {cat === 'All' ? '🔤 All' : `${CATEGORY_EMOJIS[cat as Category]} ${cat}`}
            </button>
          ))}
        </div>

        <p className="text-zinc-600 text-[10px] mb-2">{filtered.length} term{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* main content with A-Z sidebar */}
      <div className="flex">
        {/* terms list */}
        <div className="flex-1 px-4 overflow-y-auto" ref={scrollRef}>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-sm">No terms found</p>
              <p className="text-zinc-600 text-xs mt-1">Try a different search or category</p>
            </div>
          )}

          {Array.from(grouped.entries()).map(([letter, terms]) => (
            <div key={letter} id={`glossary-${letter}`}>
              <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm py-1 mb-1">
                <span className="text-[#39ff14] font-black text-sm">{letter}</span>
              </div>
              <div className="space-y-2 mb-4">
                {terms.map((t) => {
                  const isRevealed = !flashcardMode || revealedCards.has(t.term);
                  const catClass = CATEGORY_COLORS[t.category];

                  return (
                    <button
                      key={t.term}
                      onClick={() => flashcardMode ? toggleCard(t.term) : toggleCard(t.term)}
                      className="w-full text-left rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 active:scale-[0.98] transition-all"
                    >
                      {/* term header */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold text-sm">{t.term}</span>
                          {t.abbrev && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">{t.abbrev}</span>
                          )}
                        </div>
                        <span className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded border ${catClass}`}>
                          {t.category}
                        </span>
                      </div>

                      {/* flashcard mode: tap to reveal */}
                      {flashcardMode && !isRevealed ? (
                        <p className="text-zinc-600 text-xs italic mt-2">Tap to reveal definition →</p>
                      ) : (
                        <>
                          <p className="text-zinc-400 text-xs leading-relaxed mt-1">{t.definition}</p>
                          {t.example && (
                            <div className="mt-2 p-2 rounded-lg bg-black/40 border-l-2 border-cyan-500/40">
                              <p className="text-zinc-500 text-[10px] uppercase font-mono mb-0.5">Example</p>
                              <p className="text-zinc-400 text-xs">{t.example}</p>
                            </div>
                          )}
                          {t.related && t.related.length > 0 && (
                            <div className="flex gap-1.5 mt-2 flex-wrap">
                              {t.related.map((r) => (
                                <span key={r} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">{r}</span>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* A-Z sidebar */}
        <div className="w-5 flex flex-col items-center py-1 pr-1 shrink-0">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              disabled={!activeLetters.has(letter)}
              className={`text-[8px] leading-[14px] font-bold w-4 text-center active:scale-[1.2] transition-transform ${
                activeLetters.has(letter) ? 'text-[#39ff14]' : 'text-zinc-800'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
