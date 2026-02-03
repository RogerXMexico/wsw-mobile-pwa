// Quiz System Data for Options University

export interface QuizQuestion {
    id: string;
    tier: number;
    type: 'multiple_choice' | 'true_false';
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export const TIER_QUIZ_CONFIG: Record<number, { name: string; enabled: boolean }> = {
    0: { name: 'Foundations', enabled: true },
    0.5: { name: 'Express Lane', enabled: true },
    1: { name: 'Market Structure', enabled: true },
    2: { name: 'Risk', enabled: true },
    3: { name: 'The Anchors', enabled: true },
    4: { name: 'Verticals', enabled: true },
    5: { name: 'Volatility', enabled: true },
    6: { name: 'Time/Skew', enabled: true },
    7: { name: 'Ratios', enabled: true },
    8: { name: 'Strategy Tools', enabled: true }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    // ============================================
    // TIER 0: FOUNDATIONS (8 questions)
    // ============================================
    {
        id: 'q0-1',
        tier: 0,
        type: 'multiple_choice',
        question: 'How many shares does 1 option contract represent in the US market?',
        options: ['10 shares', '50 shares', '100 shares', '1000 shares', 'However many shares I feel like it should be'],
        correctIndex: 2,
        explanation: 'In the US market, 1 option contract always equals 100 shares. This is why a $1.00 premium actually costs $100.00.'
    },
    {
        id: 'q0-2',
        tier: 0,
        type: 'true_false',
        question: 'A Call option gives you the right to SELL a stock at a specific price.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. A Call gives you the right to BUY. A Put gives you the right to SELL. Remember: "Call up, Put down."'
    },
    {
        id: 'q0-3',
        tier: 0,
        type: 'multiple_choice',
        question: 'When you BUY an option, what do you have?',
        options: ['An obligation to act', 'The right but not obligation to act', 'Shares of the company', 'A guaranteed profit', 'A receipt for expensive financial confetti that may explode'],
        correctIndex: 1,
        explanation: 'Buying an option gives you the RIGHT, but not the obligation, to act. You can let it expire worthless if the trade goes against you.'
    },
    {
        id: 'q0-4',
        tier: 0,
        type: 'true_false',
        question: 'When you SELL an option, you have an OBLIGATION to fulfill the contract if exercised.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Sellers take on obligation in exchange for premium. If the buyer exercises, the seller must deliver.'
    },
    {
        id: 'q0-5',
        tier: 0,
        type: 'multiple_choice',
        question: 'What is the "Strike Price" of an option?',
        options: ['The current market price', 'The price you paid for the option', 'The specific price at which you can buy/sell the stock', 'The maximum profit possible', 'The price at which you start panicking and texting your broker'],
        correctIndex: 2,
        explanation: 'The Strike Price is the target price where the option holder can act (buy for calls, sell for puts).'
    },
    {
        id: 'q0-6',
        tier: 0,
        type: 'multiple_choice',
        question: 'If an option premium is listed as $2.50, how much does 1 contract cost?',
        options: ['$2.50', '$25.00', '$250.00', '$2,500.00', '$2.50 plus emotional damages'],
        correctIndex: 2,
        explanation: 'Since 1 contract = 100 shares, you multiply: $2.50 × 100 = $250.00'
    },
    {
        id: 'q0-7',
        tier: 0,
        type: 'true_false',
        question: 'Options can only be profitable when the stock moves in the direction you predicted.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Options add dimensions beyond direction. You can profit from time decay (theta), volatility changes (vega), or even the stock staying still.'
    },
    {
        id: 'q0-8',
        tier: 0,
        type: 'multiple_choice',
        question: 'What happens to an option at expiration if it is "Out of the Money" (OTM)?',
        options: ['It doubles in value', 'It expires worthless', 'It converts to stock', 'It rolls to the next month', 'It transforms into a tax write-off and a lesson in humility'],
        correctIndex: 1,
        explanation: 'OTM options expire worthless. If you bought the option, you lose your premium. If you sold it, you keep the premium.'
    },
    {
        id: 'q0-svo-1',
        tier: 0,
        type: 'multiple_choice',
        question: 'Which is an advantage of OPTIONS over stocks?',
        options: ['You receive dividends', 'No expiration date', 'Leverage - control 100 shares for a fraction of the cost', 'Voting rights in the company', 'The ability to lose money 10x faster than stocks alone'],
        correctIndex: 2,
        explanation: 'Options provide leverage—you can control 100 shares for a fraction of the cost of buying them outright. Dividends, no expiration, and voting rights are advantages of stocks.'
    },
    {
        id: 'q0-svo-2',
        tier: 0,
        type: 'multiple_choice',
        question: 'Which is an advantage of STOCKS over options?',
        options: ['Defined risk on every trade', 'Profit when stocks go sideways', 'No time decay - you can hold forever', 'Higher leverage', 'You can pretend you\'re a long-term investor when you\'re actually just bag-holding'],
        correctIndex: 2,
        explanation: 'Stocks have no expiration and no time decay—you can hold them indefinitely. Defined risk, sideways profit, and leverage are advantages of options.'
    },

    // --- RULES OF THE JUNGLE QUESTIONS ---
    {
        id: 'q0-9',
        tier: 0,
        type: 'multiple_choice',
        question: 'According to the Rules of the Jungle, what is the recommended maximum percentage of your portfolio to risk on a single trade?',
        options: ['10-15%', '25-30%', '2-5%', '50%', '100% because YOLO and my wife doesn\'t check the account'],
        correctIndex: 2,
        explanation: 'The Position Sizing rule states: never risk more than 2-5% on a single trade. One bad trade should sting, not kill your account.'
    },
    {
        id: 'q0-10',
        tier: 0,
        type: 'true_false',
        question: 'According to the Rules of the Jungle, "Cash is a Position" means you should always be in a trade.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Cash IS a valid position. You don\'t always have to be in a trade. Holding cash gives you the optionality to strike when opportunities are perfect.'
    },
    {
        id: 'q0-11',
        tier: 0,
        type: 'multiple_choice',
        question: 'What does "IV Crush" refer to in the Earnings Trap rule?',
        options: ['IV increases after earnings', 'IV crashes after earnings announcement', 'IV remains stable during earnings', 'IV only affects call options', 'When the market crushes your hopes and IV crushes your wallet'],
        correctIndex: 1,
        explanation: 'IV Crush: Implied Volatility spikes BEFORE earnings (uncertainty) and crashes AFTER the announcement (uncertainty resolved). This destroys premium for option buyers.'
    },
    {
        id: 'q0-12',
        tier: 0,
        type: 'true_false',
        question: 'The "No Revenge" rule means you should double down on losing trades to recover your losses.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. No Revenge means: don\'t compound mistakes by chasing or revenge trading. Accept the loss as tuition and move on with a clear mind.'
    },
    {
        id: 'q0-13',
        tier: 0,
        type: 'multiple_choice',
        question: 'What do the Greeks (Delta, Theta, Vega) tell you about your options position?',
        options: ['The profit you will make', 'How your position will respond to changes in price, time, and volatility', 'The best time to buy', 'The strike price to choose', 'Exactly how many ancient philosophers it takes to screw up your trade'],
        correctIndex: 1,
        explanation: 'The Greeks are your dashboard: Delta = direction exposure, Theta = time decay, Vega = volatility exposure. They tell you HOW your position will move.'
    },
    {
        id: 'q0-14',
        tier: 0,
        type: 'multiple_choice',
        question: 'According to the "Liquidity First" rule, why should you avoid options with wide bid-ask spreads?',
        options: ['They are more profitable', 'Wide spreads are a hidden cost/tax on your trade', 'They have higher IV', 'They expire faster', 'Because the market maker needs a new boat and you\'re helping fund it'],
        correctIndex: 1,
        explanation: 'Wide bid-ask spreads are a hidden tax. A $0.50 wide spread means you\'re paying $50/contract just to enter and exit. Stick to liquid underlyings.'
    },
    {
        id: 'q0-15',
        tier: 0,
        type: 'true_false',
        question: 'The "Anticipate > React" rule states that professional traders position BEFORE events, not after.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. The market transfers wealth from the Reactive to the Anticipatory. Amateurs chase green candles; professionals stalk zones and position before events.'
    },
    {
        id: 'q0-16',
        tier: 0,
        type: 'multiple_choice',
        question: 'What is "Gamma Risk" and when does it become most dangerous according to Expiration Discipline?',
        options: ['Risk from interest rates; at trade entry', 'Risk from volatility; during earnings', 'Risk from rapid delta changes; in the final week before expiration', 'Risk from dividends; quarterly', 'When the Hulk gets angry at your portfolio in the last week'],
        correctIndex: 2,
        explanation: 'Gamma risk explodes in the final week before expiration. Small price moves cause large delta swings. Close or roll at 21 DTE unless you have a specific thesis.'
    },
    {
        id: 'q0-17',
        tier: 0,
        type: 'true_false',
        question: 'The "Be Flexible" rule means you should never change your trading thesis once you enter a position.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. "Strong opinions, loosely held." If market data changes, your thesis must change. Rigidity is how trees snap in a storm; be the bamboo.'
    },
    {
        id: 'q0-18',
        tier: 0,
        type: 'multiple_choice',
        question: 'What does "Defined Risk" mean in options trading?',
        options: ['Trading only on Mondays', 'Always knowing your maximum possible loss BEFORE entering a trade', 'Only buying calls', 'Using leverage', 'When you tell your spouse a specific dollar amount instead of "I don\'t want to talk about it"'],
        correctIndex: 1,
        explanation: 'Defined Risk means knowing your max loss BEFORE entry. Use spreads, protective options, or accept 100% premium loss. Undefined risk is how accounts blow up.'
    },
    {
        id: 'q0-19',
        tier: 0,
        type: 'multiple_choice',
        question: 'According to "Monitor Greed," when is it likely time to sell?',
        options: ['When you feel fearful', 'When you feel euphoric', 'When volume is low', 'At market open', 'When you start calculating yacht prices'],
        correctIndex: 1,
        explanation: 'If you feel euphoric, it\'s likely time to sell. Emotional discipline is the first line of defense. Greed clouds judgment at market tops.'
    },
    {
        id: 'q0-20',
        tier: 0,
        type: 'true_false',
        question: 'The "Roll or Die" rule teaches that winners hold and hope, while losers manage positions.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. It\'s the opposite: LOSERS hold and hope. WINNERS manage or cut. Know when to roll out in time, adjust strikes, or close and move on.'
    },
    {
        id: 'q0-21',
        tier: 0,
        type: 'multiple_choice',
        question: 'Why does the "Diversify" rule warn against having all positions in one stock?',
        options: ['It\'s illegal', 'Correlation kills - if one tanks, all positions go to zero simultaneously', 'It increases IV', 'It\'s harder to track', 'Because putting all your eggs in one basket only works in motivational posters'],
        correctIndex: 1,
        explanation: 'Correlation kills. If NVDA tanks and you have 5 NVDA positions, they all suffer together. Spread your bets across different underlyings and sectors.'
    },
    {
        id: 'q0-22',
        tier: 0,
        type: 'multiple_choice',
        question: 'What does "The Engine" (IV) rule teach about buying and selling options?',
        options: ['Buy high IV, sell low IV', 'Buy low IV, sell high IV', 'IV doesn\'t matter', 'Only trade when IV is zero', 'Buy whenever you feel lucky and sell when you panic'],
        correctIndex: 1,
        explanation: 'Buy low IV, sell high IV. Implied Volatility is the heartbeat of option pricing. When IV is cheap, options are cheap to buy. When IV is expensive, options are expensive to sell.'
    },
    // Know Your Underlying Questions
    {
        id: 'q0-23',
        tier: 0,
        type: 'true_false',
        question: 'You should deeply understand the underlying company before trading options on its stock.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Options amplify everything—gains, losses, and especially ignorance. Trading options on a stock you don\'t understand is like betting on a horse you\'ve never seen run.'
    },
    {
        id: 'q0-24',
        tier: 0,
        type: 'multiple_choice',
        question: 'Which is NOT part of proper due diligence before trading options on a stock?',
        options: ['Analyzing the company\'s financial health', 'Understanding the industry trends', 'Checking what social media influencers recommend', 'Knowing upcoming catalysts like earnings dates', 'Reading tea leaves and consulting your horoscope'],
        correctIndex: 2,
        explanation: 'Social media tips are not due diligence. Real research includes financial health, leadership quality, industry trends, competitive moat, and upcoming catalysts that could move the stock.'
    },
    {
        id: 'q0-25',
        tier: 0,
        type: 'multiple_choice',
        question: 'What should you know about a company\'s "moat"?',
        options: ['The water surrounding their headquarters', 'Their competitive advantage that protects them from rivals', 'Their total number of employees', 'Their stock ticker symbol', 'Whether dragons guard it and if the drawbridge works'],
        correctIndex: 1,
        explanation: 'A company\'s "moat" is its competitive advantage—what makes it difficult for competitors to replicate their business. Strong moats (brands, patents, network effects) protect long-term value.'
    },
    {
        id: 'q0-26',
        tier: 0,
        type: 'true_false',
        question: 'If you can\'t explain what a company does in 30 seconds, you probably shouldn\'t trade options on it.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. The leverage that makes options profitable also makes uninformed trades catastrophic. If you don\'t understand the business, you can\'t assess its risks or potential.'
    },
    {
        id: 'q0-27',
        tier: 0,
        type: 'multiple_choice',
        question: 'Why is knowing a company\'s earnings date important before buying options?',
        options: ['Earnings dates don\'t affect options', 'IV often spikes before earnings and crushes after, affecting option prices dramatically', 'You get free shares on earnings day', 'Options expire on earnings dates', 'Because watching your options die from IV crush builds character'],
        correctIndex: 1,
        explanation: 'Earnings are major catalysts. IV typically spikes before earnings (making options expensive) and crushes after (destroying option value). Knowing these dates is critical for timing your trades.'
    },
    {
        id: 'q2-intrinsic',
        tier: 2,
        type: 'multiple_choice',
        question: 'What is "Intrinsic Value" of an option?',
        options: ['The time value remaining', 'The amount the option is In-The-Money', 'The premium you paid', 'The implied volatility', 'The philosophical worth of your life choices as a trader'],
        correctIndex: 1,
        explanation: 'Intrinsic value is the real, tangible value - how much the option is ITM. A $100 call when the stock is at $105 has $5 intrinsic value.'
    },
    {
        id: 'q2-extrinsic',
        tier: 2,
        type: 'multiple_choice',
        question: 'What is "Extrinsic Value" (Time Value) of an option?',
        options: ['The intrinsic value plus the stock price', 'The portion of premium above intrinsic value, based on time and volatility', 'The strike price minus the stock price', 'The guaranteed profit', 'Money that evaporates like morning dew while you sleep'],
        correctIndex: 1,
        explanation: 'Extrinsic value is everything above intrinsic value. It represents time remaining and volatility expectations. This is what decays to zero at expiration.'
    },
    {
        id: 'q2-atm-extrinsic',
        tier: 2,
        type: 'true_false',
        question: 'An At-The-Money (ATM) option has the most extrinsic value.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. ATM options have maximum extrinsic value because they have the highest probability of finishing ITM or OTM - maximum uncertainty means maximum time value.'
    },
    {
        id: 'q0-31',
        tier: 0,
        type: 'multiple_choice',
        question: 'A call option is "In-The-Money" when:',
        options: ['The stock price is below the strike price', 'The stock price equals the strike price', 'The stock price is above the strike price', 'The option has expired', 'When your spouse finally stops asking "How\'s that investment going?"'],
        correctIndex: 2,
        explanation: 'A call is ITM when Stock > Strike. You have the right to buy at a lower price than the market. For puts, it is the opposite: Stock < Strike.'
    },
    {
        id: 'q0-32',
        tier: 0,
        type: 'true_false',
        question: 'American-style options can be exercised at any time before expiration.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. American options (most equity options) can be exercised anytime. European options (like SPX) can only be exercised at expiration.'
    },
    {
        id: 'q0-33',
        tier: 0,
        type: 'multiple_choice',
        question: 'What is "Assignment" in options trading?',
        options: ['Buying an option contract', 'Being forced to fulfill your obligation as an option seller', 'The expiration date', 'A type of spread strategy', 'Weekend homework that arrives with margin calls attached'],
        correctIndex: 1,
        explanation: 'Assignment happens when an option buyer exercises. As a seller, you are assigned the obligation - delivering shares (call) or buying shares (put).'
    },
    {
        id: 'q0-34',
        tier: 0,
        type: 'multiple_choice',
        question: 'You buy a banana voucher (call option) for $0.10 that lets you buy bananas at $1.00. The bananas suddenly go to $3.00. What\'s your first mistake?',
        options: ['Not exercising immediately', 'Forgetting to multiply by 100', 'Telling everyone about your genius banana trade', 'Thinking this will work every time', 'Immediately quitting your job to become a professional banana speculator'],
        correctIndex: 3,
        explanation: 'Congrats on the win! But the market\'s job is to make you think you\'re a genius right before it teaches you humility. One good trade doesn\'t make you Warren Buffett.'
    },
    {
        id: 'q0-35',
        tier: 0,
        type: 'multiple_choice',
        question: 'An option premium shows as $0.50. Your friend says "Dude, it\'s only 50 cents!" What\'s the actual cost and what should you tell your friend?',
        options: ['$0.50 total, your friend is right', '$5.00, but close enough', '$50.00, and your friend needs this course', '$500.00, run away immediately', '$50.00, and you need better friends who understand multiplication'],
        correctIndex: 2,
        explanation: '$0.50 × 100 shares = $50.00. If your friend doesn\'t know this, they\'re about to learn an expensive lesson. Be a good friend—send them this course.'
    },
    {
        id: 'q0-36',
        tier: 0,
        type: 'multiple_choice',
        question: 'Options expire. Stocks don\'t. What does this teach us about life?',
        options: ['Nothing, it\'s just finance', 'Deadlines create urgency but also stress—manage both wisely', 'Stock traders are immortal', 'Time is an illusion', 'That we too are slowly decaying toward our expiration date and should probably call our mothers'],
        correctIndex: 1,
        explanation: 'Expiration is what makes options powerful AND dangerous. Like a deadline for a project—it forces action, but procrastinate and you pay dearly. Theta doesn\'t care about your feelings.'
    },

    // ============================================
    // TIER 0.5: EXPRESS LANE (10 questions)
    // ============================================
    {
        id: 'qE-1',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'A Call option is like a "banana voucher" because:',
        options: ['It gives you free bananas', 'It gives you the RIGHT to buy at a fixed price later', 'It obligates you to buy bananas', 'It protects you from banana prices falling', 'Because there\'s always money in the banana stand (allegedly)'],
        correctIndex: 1,
        explanation: 'A Call option gives you the RIGHT (not obligation) to buy shares at a fixed price (strike) before expiration. Like a voucher to buy bananas at today\'s price even if they become more expensive.'
    },
    {
        id: 'qE-2',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'A Put option is most similar to:',
        options: ['A lottery ticket', 'Car insurance', 'A gift card', 'A savings account', 'A parachute you hope never to need but definitely paid too much for'],
        correctIndex: 1,
        explanation: 'A Put option is like insurance - you pay a premium for protection against your asset losing value. If your stock crashes, the put lets you sell at the higher strike price.'
    },
    {
        id: 'qE-3',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'What does Delta measure?',
        options: ['Time decay per day', 'How much the option moves per $1 stock move', 'Sensitivity to volatility changes', 'The probability of early assignment', 'The distance between your profit expectations and sad reality'],
        correctIndex: 1,
        explanation: 'Delta measures how much an option\'s price changes when the underlying stock moves $1. A 0.50 Delta option gains $0.50 for every $1 the stock rises.'
    },
    {
        id: 'qE-4',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'Theta represents:',
        options: ['The speed of the underlying stock', 'Daily time decay - value lost each day', 'Sensitivity to interest rates', 'The strike price distance', 'The sound of your money quietly screaming as it evaporates'],
        correctIndex: 1,
        explanation: 'Theta is the daily "tax" on option holders. A Theta of -0.05 means you lose $5 per contract per day just from time passing. Options are melting ice cubes.'
    },
    {
        id: 'qE-5',
        tier: 0.5,
        type: 'true_false',
        question: 'When Implied Volatility (IV) is high, options are cheap and it\'s a good time to buy.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. High IV means options are EXPENSIVE. Low IV = cheap options (good to buy). High IV = expensive options (consider selling or waiting).'
    },
    {
        id: 'qE-6',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'What is the maximum loss when buying a Long Call?',
        options: ['Unlimited', 'The strike price × 100', 'The premium paid', 'Your entire account', 'The premium paid plus your dignity when you explain it at Thanksgiving'],
        correctIndex: 2,
        explanation: 'When you BUY an option (call or put), your maximum loss is limited to the premium you paid. This is "defined risk" - you know your worst case upfront.'
    },
    {
        id: 'qE-7',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'A Cash-Secured Put means:',
        options: ['Buying a put with cash', 'Selling a put and keeping cash to buy shares if assigned', 'A put protected by another put', 'A put with no expiration date', 'A sophisticated way to accidentally become a bag holder with extra steps'],
        correctIndex: 1,
        explanation: 'A Cash-Secured Put means you sell a put and keep enough cash in your account to buy 100 shares at the strike price if you get assigned. You\'re getting paid to potentially buy stock at a lower price.'
    },
    {
        id: 'qE-8',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'The "1-2% Rule" in position sizing means:',
        options: ['Trade only 1-2 times per month', 'Aim for 1-2% profit per trade', 'Never risk more than 1-2% of your account on one trade', 'Options should be 1-2% of stock price', 'The boring adult rule that prevents you from becoming a legend or a cautionary tale'],
        correctIndex: 2,
        explanation: 'Professional traders never risk more than 1-2% of their total account on any single trade. This protects you from blowing up your account on a few bad trades.'
    },
    {
        id: 'qE-9',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'For your first options trades, what expiration should you typically choose?',
        options: ['Same day (0 DTE)', '1-2 weeks out', '30-60 days out', '1+ year (LEAPS)', 'Same day because fear is for cowards and retirement accounts are overrated'],
        correctIndex: 2,
        explanation: '30-60 days gives you enough time to be right without excessive time decay. Short expirations have rapid Theta decay, and LEAPS are expensive and slow-moving.'
    },
    {
        id: 'qE-10',
        tier: 0.5,
        type: 'true_false',
        question: 'You should always use LIMIT orders (not market orders) when trading options.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Options have wider bid-ask spreads than stocks. Market orders can give you terrible fills. Always use limit orders at or near the mid-price.'
    },
    {
        id: 'qE-11',
        tier: 0.5,
        type: 'multiple_choice',
        question: 'If there\'s always money in the banana stand, why do 90% of options traders lose money?',
        options: ['There isn\'t always money in the banana stand', 'They burn down the banana stand for insurance money', 'They confuse a metaphor for a trading strategy', 'Bananas are actually a terrible underlying'],
        correctIndex: 2,
        explanation: 'Arrested Development references don\'t equal edge. Most traders lose because they treat options like lottery tickets instead of instruments requiring strategy, discipline, and risk management.'
    },

    // ============================================
    // TIER 1: MARKET STRUCTURE (8 questions)
    // ============================================
    {
        id: 'q1-1',
        tier: 1,
        type: 'multiple_choice',
        question: 'What is a "Support" level in technical analysis?',
        options: ['A price ceiling where selling pressure increases', 'A price floor where buying pressure increases', 'The highest price ever reached', 'The opening price of the day', 'An imaginary line traders draw to feel better before it gets obliterated'],
        correctIndex: 1,
        explanation: 'Support is a price level where buying interest tends to be strong enough to prevent further decline. Think of it as a floor.'
    },
    {
        id: 'q1-2',
        tier: 1,
        type: 'true_false',
        question: 'Resistance becomes support once price breaks above it.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. This is called "polarity" - old resistance often becomes new support, and vice versa. Price has memory.'
    },
    {
        id: 'q1-3',
        tier: 1,
        type: 'multiple_choice',
        question: 'What does AVWAP stand for?',
        options: ['Average Value Weighted Asset Price', 'Anchored Volume Weighted Average Price', 'Annual Volatility With Average Pricing', 'Automatic Volume Weighted Analysis Protocol', 'A Very Weird Acronym People use to sound intelligent at parties'],
        correctIndex: 1,
        explanation: 'AVWAP = Anchored Volume Weighted Average Price. It calculates the average price weighted by volume from a specific anchor point.'
    },
    {
        id: 'q1-4',
        tier: 1,
        type: 'true_false',
        question: 'Higher volume at a price level makes that support/resistance MORE significant.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Volume represents conviction. High volume at a level means many participants have positions there, making it a stronger reference point.'
    },
    {
        id: 'q1-5',
        tier: 1,
        type: 'multiple_choice',
        question: 'When price is trading ABOVE the AVWAP, what does this suggest?',
        options: ['Most buyers from the anchor point are underwater', 'Most buyers from the anchor point are profitable', 'Volume is decreasing', 'The trend is bearish', 'That people who bought earlier are insufferably smug right now'],
        correctIndex: 1,
        explanation: 'When price is above AVWAP, the average buyer from that anchor point is in profit. This creates a bullish bias.'
    },
    {
        id: 'q1-6',
        tier: 1,
        type: 'multiple_choice',
        question: 'What typically happens when price approaches a key resistance level?',
        options: ['Price always breaks through', 'Selling pressure tends to increase', 'Volume disappears', 'Options become worthless', 'Bulls and bears engage in an elaborate financial chicken game'],
        correctIndex: 1,
        explanation: 'At resistance, sellers who bought lower take profits, and shorts enter positions, creating selling pressure that can stall or reverse the advance.'
    },
    {
        id: 'q1-7',
        tier: 1,
        type: 'true_false',
        question: 'A "breakout" occurs when price moves decisively through a support or resistance level.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Breakouts signal potential trend continuation. The key is confirmation - false breakouts (fakeouts) are common.'
    },
    {
        id: 'q1-8',
        tier: 1,
        type: 'multiple_choice',
        question: 'Why do options traders care about support and resistance levels?',
        options: ['They determine option prices directly', 'They help identify strike selection and profit targets', 'They are required by brokers', 'They only matter for stocks, not options', 'Because drawing lines on charts makes us feel like technical wizards'],
        correctIndex: 1,
        explanation: 'Support/resistance helps traders choose strikes (sell options at resistance, buy at support) and set realistic profit targets.'
    },
    {
        id: 'q1-9',
        tier: 1,
        type: 'multiple_choice',
        question: 'What is a "False Breakout" (Fakeout)?',
        options: ['A stock that never moves', 'Price briefly breaks a level then quickly reverses back', 'A guaranteed profitable pattern', 'When volume is extremely high', 'The market\'s way of saying "LOL gotcha" to eager traders'],
        correctIndex: 1,
        explanation: 'False breakouts occur when price pierces support/resistance but fails to follow through, trapping traders who entered on the breakout. Always wait for confirmation.'
    },
    {
        id: 'q1-10',
        tier: 1,
        type: 'true_false',
        question: 'Round numbers like $100, $150, $200 often act as psychological support or resistance.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Round numbers have psychological significance. Many traders place orders at round numbers, creating natural support and resistance zones.'
    },
    {
        id: 'q1-11',
        tier: 1,
        type: 'multiple_choice',
        question: 'What does high volume at a price level indicate?',
        options: ['The level is unimportant', 'Strong conviction and potential support/resistance', 'The stock will crash', 'Options are overpriced', 'That a lot of people decided to make the same mistake simultaneously'],
        correctIndex: 1,
        explanation: 'High volume = high conviction. When lots of shares change hands at a price, many participants have positions there, making it a significant reference point.'
    },
    {
        id: 'q1-12',
        tier: 1,
        type: 'multiple_choice',
        question: 'Why is anchoring AVWAP to earnings dates useful?',
        options: ['Earnings dates are random', 'It shows average price since the last major information event', 'AVWAP only works on earnings days', 'It predicts the next earnings', 'Because traders need something to anchor their hopes and dreams to'],
        correctIndex: 1,
        explanation: 'Earnings represent major information events. AVWAP from earnings shows the average price investors paid since the last fundamental update - useful for gauging sentiment.'
    },
    {
        id: 'q1-13',
        tier: 1,
        type: 'true_false',
        question: 'The more times a resistance level is tested, the weaker it becomes as supply gets used up.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. With resistance, each test uses up more of the available supply (sellers) at that level, making it weaker. Support works differently - the more it is tested, the more demand gets activated and the stronger the floor becomes.'
    },
    {
        id: 'q1-14',
        tier: 1,
        type: 'multiple_choice',
        question: 'What is a "confluence zone" in technical analysis?',
        options: ['A single moving average', 'An area where multiple support/resistance factors overlap', 'The market close', 'A type of option order', 'Where all your indicators converge to tell you absolutely nothing useful'],
        correctIndex: 1,
        explanation: 'Confluence is when multiple technical factors align at the same price (AVWAP, previous high, round number, etc.). These zones are typically stronger than single factors.'
    },
    {
        id: 'q1-15',
        tier: 1,
        type: 'multiple_choice',
        question: 'You see a $0.50 bid-ask spread on an option. The market maker whispers: "Cross me." What\'s really happening?',
        options: ['Free money opportunity', 'You\'re paying a $50 tax just to enter and exit the trade', 'The market maker is being friendly', 'This is normal and fine'],
        correctIndex: 1,
        explanation: 'That $0.50 spread × 100 shares = $50 gone instantly. You\'re down $100 round-trip before the stock even moves. Wide spreads are wealth transfer devices—avoid illiquid options like you avoid mystery meat.'
    },
    {
        id: 'q1-16',
        tier: 1,
        type: 'multiple_choice',
        question: 'You find an amazing setup on a penny stock with 3 open interest on the options chain. Should you trade it?',
        options: ['Yes, low competition means more profit', 'Only if Mercury is in retrograde', 'No, unless you enjoy shouting into the void', 'Yes, but only on Fridays'],
        correctIndex: 2,
        explanation: 'Open interest of 3 means exactly 3 people care about this option. Good luck finding someone to buy it from you. Liquidity first, setups second—or you\'ll have a beautiful trade you can\'t exit.'
    },

    // ============================================
    // TIER 2: RISK / GREEKS (8 questions)
    // ============================================
    {
        id: 'q2-1',
        tier: 2,
        type: 'multiple_choice',
        question: 'What does Delta measure?',
        options: ['Time decay per day', 'Sensitivity to volatility changes', 'Rate of change of Delta', 'Price change for a $1 move in the stock', 'The airline that lost your luggage and your profit potential'],
        correctIndex: 3,
        explanation: 'Delta measures how much the option price changes for every $1 move in the underlying stock. A 0.50 delta call gains $0.50 when the stock rises $1.'
    },
    {
        id: 'q2-2',
        tier: 2,
        type: 'true_false',
        question: 'A delta of 0.30 means approximately a 30% probability of expiring In-The-Money.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Delta serves as a rough probability estimate. A 0.30 delta option has roughly a 30% chance of finishing ITM at expiration.'
    },
    {
        id: 'q2-3',
        tier: 2,
        type: 'multiple_choice',
        question: 'Theta represents:',
        options: ['Interest rate sensitivity', 'Time decay - value lost each day', 'Volatility sensitivity', 'Stock price sensitivity', 'The Greek god of stealing your money while you\'re not looking'],
        correctIndex: 1,
        explanation: 'Theta is time decay - the amount of value an option loses every day as it approaches expiration. It accelerates near expiry.'
    },
    {
        id: 'q2-4',
        tier: 2,
        type: 'true_false',
        question: 'Option sellers benefit from time decay (positive Theta).',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Sellers collect premium and profit as time passes and options decay. Theta works in favor of sellers, against buyers.'
    },
    {
        id: 'q2-5',
        tier: 2,
        type: 'multiple_choice',
        question: 'If you are "Long Vega," you profit when:',
        options: ['Volatility decreases', 'Time passes quickly', 'Implied Volatility increases', 'The stock stays completely flat', 'Everyone panics and you profit from their collective anxiety'],
        correctIndex: 2,
        explanation: 'Long Vega means you profit when Implied Volatility rises. Buying options makes you long vega - you benefit from fear/uncertainty increasing.'
    },
    {
        id: 'q2-6',
        tier: 2,
        type: 'multiple_choice',
        question: 'What is "IV Crush"?',
        options: ['When the stock price crashes', 'A sharp drop in Implied Volatility after an event', 'When options become worthless', 'A type of spread strategy', 'When your options die faster than your enthusiasm for trading'],
        correctIndex: 1,
        explanation: 'IV Crush is the rapid decline in Implied Volatility after anticipated events (like earnings). Options lose value even if the stock moves in your direction.'
    },
    {
        id: 'q2-7',
        tier: 2,
        type: 'true_false',
        question: 'High Implied Volatility means options are expensive.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. High IV reflects expected larger price movements, which inflates option premiums. This is why selling options in high IV can be attractive.'
    },
    {
        id: 'q2-8',
        tier: 2,
        type: 'multiple_choice',
        question: 'Gamma is highest for options that are:',
        options: ['Deep In-The-Money', 'Deep Out-of-The-Money', 'At-The-Money near expiration', 'Far from expiration', 'In the danger zone where fortunes change faster than your blood pressure'],
        correctIndex: 2,
        explanation: 'Gamma peaks for ATM options near expiration. This is when small stock moves cause the largest changes in delta (and P&L swings).'
    },
    {
        id: 'q2-9',
        tier: 2,
        type: 'multiple_choice',
        question: 'What is Rho and when does it matter most?',
        options: ['Volatility sensitivity; always important', 'Interest rate sensitivity; mostly matters for long-dated options', 'Time decay; important at expiration', 'Stock price sensitivity; always important', 'The Greek nobody talks about at parties because interest rates are boring'],
        correctIndex: 1,
        explanation: 'Rho measures sensitivity to interest rate changes. It is mostly relevant for LEAPS or other long-dated options where rate changes can compound over time.'
    },
    {
        id: 'q2-10',
        tier: 2,
        type: 'true_false',
        question: 'Theta decay accelerates as expiration approaches - it is not linear.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Theta decay follows a curve, not a straight line. Options lose value slowly at first, then decay accelerates rapidly in the final weeks and days.'
    },
    {
        id: 'q2-11',
        tier: 2,
        type: 'multiple_choice',
        question: 'If you are "Short Vega," you profit when:',
        options: ['Implied Volatility increases', 'Implied Volatility decreases', 'The stock rallies', 'Time passes', 'When calm returns and everyone stops freaking out for five minutes'],
        correctIndex: 1,
        explanation: 'Short Vega means you profit when IV falls. Selling options makes you short vega - you benefit when uncertainty decreases and premiums deflate.'
    },
    {
        id: 'q2-12',
        tier: 2,
        type: 'multiple_choice',
        question: 'What is "Realized Volatility" vs "Implied Volatility"?',
        options: ['They are the same thing', 'Realized is historical actual movement; Implied is the market\'s forward expectation', 'Implied is historical; Realized is expected', 'Neither affects option prices', 'Realized is what happened, Implied is what your portfolio wishes would happen'],
        correctIndex: 1,
        explanation: 'Realized volatility is what actually happened (historical). Implied volatility is what the market expects to happen. Options are priced on IV, not RV.'
    },
    {
        id: 'q2-13',
        tier: 2,
        type: 'true_false',
        question: 'A position with high positive Gamma benefits from large price moves in either direction.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Positive gamma means your delta increases as the stock moves in your favor. Big moves accelerate your profits (like being long a straddle).'
    },
    {
        id: 'q2-14',
        tier: 2,
        type: 'multiple_choice',
        question: 'What Greek measures an option\'s sensitivity to changes in dividend expectations?',
        options: ['Delta', 'Theta', 'There is no Greek for dividends directly, but dividends affect pricing', 'Gamma', 'Aristotle, the forgotten Greek who only cares about boring dividend stocks'],
        correctIndex: 2,
        explanation: 'While there is no official Greek for dividends, expected dividends affect option pricing. Calls decrease in value, puts increase when dividends are expected.'
    },
    {
        id: 'q2-15',
        tier: 2,
        type: 'multiple_choice',
        question: 'You put 50% of your account on one 0DTE SPY call because Reddit said "diamond hands." What\'s your actual condition?',
        options: ['Calculated risk-taker', 'Suffering from acute position sizing disorder', 'A misunderstood genius', 'Practicing for a TED Talk on loss'],
        correctIndex: 1,
        explanation: 'The 2-5% rule exists because you need to survive multiple losses to get to the wins. 50% on one trade = you\'re one red candle from needing a GoFundMe. Max risk per trade: 2-5%. No exceptions, no excuses.'
    },
    {
        id: 'q2-16',
        tier: 2,
        type: 'multiple_choice',
        question: 'You just lost $500 on a bad trade. Your brain says: "Double down to win it back!" What should you actually do?',
        options: ['Listen to your brain, it\'s never wrong', 'Close your trading platform and go touch grass', 'Buy the same trade but bigger', 'Blame the market makers and tweet angrily'],
        correctIndex: 1,
        explanation: 'Revenge trading is how $500 losses become $5,000 losses. Your brain is in fight-or-flight mode, not strategy mode. Close the platform. Walk away. Come back tomorrow with fresh eyes and zero emotion.'
    },

    // ============================================
    // TIER 3: THE ANCHORS (8 questions)
    // ============================================
    {
        id: 'q3-1',
        tier: 3,
        type: 'multiple_choice',
        question: 'What is the maximum loss when buying a Long Call?',
        options: ['Unlimited', 'The strike price', 'The premium paid', 'The stock price', 'The premium paid plus whatever you tell your spouse you paid'],
        correctIndex: 2,
        explanation: 'When you buy a call, your maximum loss is the premium paid. The option can only go to zero, limiting your downside.'
    },
    {
        id: 'q3-2',
        tier: 3,
        type: 'true_false',
        question: 'A Covered Call involves owning 100 shares and selling a call against them.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Covered Call = Long 100 shares + Short 1 Call. You collect premium but cap your upside at the strike price.'
    },
    {
        id: 'q3-3',
        tier: 3,
        type: 'multiple_choice',
        question: 'A Cash-Secured Put is used by traders who:',
        options: ['Want to short the stock', 'Want to buy the stock at a discount', 'Are very bearish', 'Want unlimited upside', 'Enjoy getting paid to potentially own shares they were going to buy anyway'],
        correctIndex: 1,
        explanation: 'Cash-Secured Put sellers are willing to buy the stock at the strike price. They get paid to wait for a lower entry price.'
    },
    {
        id: 'q3-4',
        tier: 3,
        type: 'true_false',
        question: 'A Protective Put acts like insurance for stock you own.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Buying a put when you own shares protects you from downside. If the stock crashes, the put gains value, offsetting losses.'
    },
    {
        id: 'q3-5',
        tier: 3,
        type: 'multiple_choice',
        question: 'What is the risk profile of a Long Put?',
        options: ['Unlimited loss, limited gain', 'Limited loss, unlimited gain', 'Limited loss, limited gain', 'Unlimited loss, unlimited gain', 'Limited loss unless you buy 100 contracts because you felt lucky'],
        correctIndex: 2,
        explanation: 'Long Put has limited loss (premium paid) and limited gain (max profit if stock goes to zero = strike minus premium).'
    },
    {
        id: 'q3-6',
        tier: 3,
        type: 'multiple_choice',
        question: 'A Collar strategy combines:',
        options: ['Two calls at different strikes', 'Two puts at different strikes', 'Long stock + Protective Put + Covered Call', 'Short stock + Long Call', 'Options bondage that limits both your upside and downside like a responsible adult'],
        correctIndex: 2,
        explanation: 'Collar = Long Stock + Long Put (protection) + Short Call (finances the put). It creates a range of outcomes.'
    },
    {
        id: 'q3-7',
        tier: 3,
        type: 'true_false',
        question: 'Selling a Covered Call means you might have to sell your shares at the strike price.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. If the stock rises above the strike at expiration, your shares may be "called away." This is the trade-off for collecting premium.'
    },
    {
        id: 'q3-8',
        tier: 3,
        type: 'multiple_choice',
        question: 'Which strategy has unlimited profit potential?',
        options: ['Covered Call', 'Cash-Secured Put', 'Long Call', 'Collar', 'Long Call, assuming the stock goes to infinity and physics stops mattering'],
        correctIndex: 2,
        explanation: 'Long Call has unlimited profit potential - the stock can rise forever. All the others cap your upside in some way.'
    },
    {
        id: 'q3-9',
        tier: 3,
        type: 'multiple_choice',
        question: 'What is the break-even for a Long Call?',
        options: ['Strike price only', 'Strike price plus premium paid', 'Strike price minus premium paid', 'The current stock price', 'Strike plus premium plus the therapy you\'ll need if it doesn\'t work out'],
        correctIndex: 1,
        explanation: 'Break-even = Strike + Premium. The stock must rise above this level for you to profit. Example: $100 strike + $3 premium = $103 break-even.'
    },
    {
        id: 'q3-10',
        tier: 3,
        type: 'true_false',
        question: 'A Covered Call is a neutral to slightly bullish strategy.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Covered Calls work best when the stock stays flat or rises modestly. You collect premium, but give up upside above the strike.'
    },
    {
        id: 'q3-11',
        tier: 3,
        type: 'multiple_choice',
        question: 'What happens if you sell a Cash-Secured Put and the stock drops below the strike?',
        options: ['Nothing, puts are always safe', 'You may be assigned and must buy 100 shares at the strike price', 'You receive more premium', 'The position automatically closes', 'You become the proud owner of shares you could\'ve bought cheaper yesterday'],
        correctIndex: 1,
        explanation: 'If assigned, you must buy 100 shares at the strike price. This is why it\'s "cash-secured" - you need the cash ready to purchase the shares.'
    },
    {
        id: 'q3-12',
        tier: 3,
        type: 'multiple_choice',
        question: 'What is the maximum loss on a Long Put?',
        options: ['Unlimited', 'The strike price', 'The premium paid', 'The stock price', 'The premium paid times however many contracts your overconfidence convinced you to buy'],
        correctIndex: 2,
        explanation: 'Like all long options, the maximum loss is the premium paid. The put can only go to zero. Your downside is defined from the start.'
    },
    {
        id: 'q3-13',
        tier: 3,
        type: 'true_false',
        question: 'A Protective Put + Long Stock is sometimes called a "Married Put."',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. When you buy stock and a put together, it\'s called a Married Put. The put is "married" to the stock position for protection.'
    },
    {
        id: 'q3-14',
        tier: 3,
        type: 'multiple_choice',
        question: 'Why might you choose a Collar over just buying a Protective Put?',
        options: ['Collars have more upside', 'The short call helps finance the put, reducing cost', 'Collars have no downside risk', 'Puts are illegal in a collar', 'Because paying for insurance with future gains you haven\'t made yet is galaxy brain thinking'],
        correctIndex: 1,
        explanation: 'The Collar\'s short call premium offsets the cost of the protective put, sometimes making protection free. The trade-off is capped upside.'
    },
    {
        id: 'q3-15',
        tier: 3,
        type: 'multiple_choice',
        question: 'The stock hasn\'t moved in 3 weeks. Stock traders are bored. Options traders selling premium are...',
        options: ['Also bored', 'Secretly laughing in theta', 'Panicking about IV', 'Switching to stocks'],
        correctIndex: 1,
        explanation: 'This is why options are beautiful. Stock traders need movement to profit. Premium sellers profit from the stock doing absolutely nothing. Time decay is your salary when volatility sleeps.'
    },
    {
        id: 'q3-16',
        tier: 3,
        type: 'multiple_choice',
        question: 'Someone calls Iron Condors "free money." How do you respond?',
        options: ['"You\'re absolutely right!"', '"Free money until the wings get tested, then it\'s expensive lessons"', '"Condors can\'t fail, they\'re made of iron"', '"I also enjoy fairy tales"'],
        correctIndex: 1,
        explanation: 'Iron Condors work great in low volatility... until they don\'t. One big move and your "free money" becomes maximum loss faster than you can say "Black Swan." Define your risk, manage your winners, or the iron will melt.'
    },

    // ============================================
    // TIER 4: VERTICALS (8 questions)
    // ============================================
    {
        id: 'q4-1',
        tier: 4,
        type: 'multiple_choice',
        question: 'A Bull Call Spread involves:',
        options: ['Buying a call and selling a higher strike call', 'Selling a call and buying a higher strike call', 'Buying a put and selling a lower strike put', 'Buying a call and selling a put', 'Buying optimism and selling greed at different price levels'],
        correctIndex: 0,
        explanation: 'Bull Call Spread: Buy lower strike call, sell higher strike call. This is a debit spread with bullish outlook and defined risk.'
    },
    {
        id: 'q4-2',
        tier: 4,
        type: 'true_false',
        question: 'A Bull Put Spread is a credit spread - you receive money to enter.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Bull Put Spread: Sell higher strike put, buy lower strike put. You collect net premium (credit) and profit if the stock stays above the short strike.'
    },
    {
        id: 'q4-3',
        tier: 4,
        type: 'multiple_choice',
        question: 'What is the maximum profit on a $5-wide Bull Call Spread that cost $2 to enter?',
        options: ['$5', '$3', '$2', 'Unlimited', '$3 or approximately one fancy coffee per day for a month'],
        correctIndex: 1,
        explanation: 'Max profit = Width of strikes ($5) minus net debit paid ($2) = $3. This occurs when the stock is above the short strike at expiration.'
    },
    {
        id: 'q4-4',
        tier: 4,
        type: 'multiple_choice',
        question: 'A Bear Call Spread profits when:',
        options: ['The stock rallies above the short strike', 'The stock stays below the short strike', 'Volatility increases dramatically', 'The stock moves in either direction', 'When bears win and bulls cry, which is a normal Tuesday in the market'],
        correctIndex: 1,
        explanation: 'Bear Call Spread is a credit spread that profits when the stock stays below the short strike. You keep the premium collected.'
    },
    {
        id: 'q4-5',
        tier: 4,
        type: 'true_false',
        question: 'All vertical spreads have defined (limited) risk.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. The long option in a vertical spread acts as a hedge, defining your maximum loss as the width minus premium received (or premium paid for debits).'
    },
    {
        id: 'q4-6',
        tier: 4,
        type: 'multiple_choice',
        question: 'In a Bear Put Spread, which put do you buy?',
        options: ['The lower strike put', 'The higher strike put', 'Both puts', 'Neither - you sell both', 'The one that costs more because pessimism is expensive'],
        correctIndex: 1,
        explanation: 'Bear Put Spread: Buy higher strike put (more expensive), sell lower strike put. This creates a debit spread with bearish outlook.'
    },
    {
        id: 'q4-7',
        tier: 4,
        type: 'true_false',
        question: 'Credit spreads profit from time decay (theta).',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Credit spreads are net short premium. As time passes, the options decay, allowing you to keep more of the credit received.'
    },
    {
        id: 'q4-8',
        tier: 4,
        type: 'multiple_choice',
        question: 'Why would you choose a vertical spread over a naked option?',
        options: ['To increase maximum profit', 'To reduce cost and define risk', 'To avoid all risk', 'To increase leverage', 'Because your broker and spouse both prefer you not go naked'],
        correctIndex: 1,
        explanation: 'Verticals reduce cost (for debits) or define risk (for credits). You trade some profit potential for a safer, more defined position.'
    },
    {
        id: 'q4-9',
        tier: 4,
        type: 'multiple_choice',
        question: 'What is the break-even price for a Bull Call Spread with a $100/$105 strike bought for $2.00?',
        options: ['$100', '$102', '$103', '$105', '$102 or the exact price the stock will never quite reach'],
        correctIndex: 1,
        explanation: 'Break-even = Long strike + Debit paid = $100 + $2 = $102. You need the stock to be above $102 at expiration to profit.'
    },
    {
        id: 'q4-10',
        tier: 4,
        type: 'true_false',
        question: 'Rolling a credit spread out in time usually brings in additional premium.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Rolling out in time (to a later expiration) typically brings in more premium because you are selling more time value. This is a common adjustment technique.'
    },
    {
        id: 'q4-11',
        tier: 4,
        type: 'multiple_choice',
        question: 'When is a Bull Put Spread NOT a good strategy?',
        options: ['When you expect the stock to stay flat or rise', 'When IV is high', 'When you expect a sharp decline in the stock', 'When you want defined risk', 'When you\'re feeling bearish but accidentally clicked the wrong button'],
        correctIndex: 2,
        explanation: 'Bull Put Spreads lose money when the stock drops sharply below the short strike. If you expect a decline, use a bearish strategy instead.'
    },
    {
        id: 'q4-12',
        tier: 4,
        type: 'multiple_choice',
        question: 'What happens to a credit spread\'s value if IV increases after entry?',
        options: ['It increases in value (bad for you)', 'It decreases in value (good for you)', 'IV has no effect on spreads', 'It depends on the stock direction', 'It increases in value and you learn why selling premium during earnings is spicy'],
        correctIndex: 0,
        explanation: 'Credit spreads are short vega. If IV rises, the spread increases in value, which means you would have to pay more to close it - that is bad for the seller.'
    },
    {
        id: 'q4-13',
        tier: 4,
        type: 'true_false',
        question: 'Widening the strikes in a vertical spread increases both potential profit AND potential loss.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Wider spreads have higher max profit (for the same credit/debit ratio) but also higher max loss. The risk-reward scales with width.'
    },
    {
        id: 'q4-14',
        tier: 4,
        type: 'multiple_choice',
        question: 'At what profit level is it generally recommended to close credit spreads?',
        options: ['25% of max profit', '50% of max profit', '100% of max profit (full expiration)', 'Never close early', '50% of max profit because greed is what separates winners from lesson learners'],
        correctIndex: 1,
        explanation: 'The 50% rule: Close credit spreads at 50% profit. You capture half the profit quickly and avoid the risk of reversal in the remaining time.'
    },
    {
        id: 'q4-15',
        tier: 4,
        type: 'multiple_choice',
        question: 'Why do vertical spreads exist? Is the universe trying to tell us something?',
        options: ['To confuse beginners', 'To limit both risk AND profit because balance is everything', 'Market makers needed more fees', 'Someone lost a bet'],
        correctIndex: 1,
        explanation: 'Verticals are the yin and yang of options. You give up unlimited profit to cap your loss. It\'s the universe teaching you that you can\'t have everything—but you CAN define your risk precisely.'
    },
    {
        id: 'q4-16',
        tier: 4,
        type: 'multiple_choice',
        question: 'Debit spreads vs Credit spreads: What\'s the difference beyond one giving you money now and the other taking it?',
        options: ['There is no difference, it\'s an illusion', 'Debits are bullish/bearish directional, credits benefit from time decay', 'Credits are for the enlightened, debits are for peasants', 'Debits taste better'],
        correctIndex: 1,
        explanation: 'Debit spreads (long vertical) = you pay now, profit from directional moves. Credit spreads (short vertical) = collect premium now, profit from theta and staying within your strikes. Different tools, different jobs.'
    },

    // ============================================
    // TIER 5: VOLATILITY (8 questions)
    // ============================================
    {
        id: 'q5-1',
        tier: 5,
        type: 'multiple_choice',
        question: 'A Long Straddle consists of:',
        options: ['Buying a call and selling a put at the same strike', 'Buying both a call and a put at the same strike', 'Selling both a call and a put at the same strike', 'Buying a call and put at different strikes', 'Buying uncertainty and hoping the market does literally anything dramatic'],
        correctIndex: 1,
        explanation: 'Long Straddle = Buy ATM Call + Buy ATM Put at the same strike. You profit from a big move in either direction.'
    },
    {
        id: 'q5-2',
        tier: 5,
        type: 'true_false',
        question: 'A Short Straddle profits when the stock moves very little.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Short Straddle = Sell ATM Call + Sell ATM Put. You collect premium and profit if the stock stays near the strike.'
    },
    {
        id: 'q5-3',
        tier: 5,
        type: 'multiple_choice',
        question: 'How does a Strangle differ from a Straddle?',
        options: ['Strangles use different expirations', 'Strangles use different strikes for the call and put', 'Strangles are always sold, never bought', 'There is no difference', 'Strangles are cheaper but require God himself to move the stock enough'],
        correctIndex: 1,
        explanation: 'Strangle uses OTM options at different strikes (call above stock price, put below). Straddle uses ATM options at the same strike.'
    },
    {
        id: 'q5-4',
        tier: 5,
        type: 'true_false',
        question: 'An Iron Condor has unlimited risk on both sides.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Iron Condor has defined risk - the long wings cap your loss. It combines a Bull Put Spread and a Bear Call Spread.'
    },
    {
        id: 'q5-5',
        tier: 5,
        type: 'multiple_choice',
        question: 'An Iron Butterfly is most profitable when:',
        options: ['The stock makes a huge move', 'The stock expires exactly at the short strikes', 'Volatility explodes higher', 'The stock trends strongly in one direction', 'The stock lands perfectly on your strike like a beautiful mathematical miracle that never happens'],
        correctIndex: 1,
        explanation: 'Iron Butterfly has maximum profit when the stock pins at the short strike. All OTM options expire worthless and you keep the credit.'
    },
    {
        id: 'q5-6',
        tier: 5,
        type: 'multiple_choice',
        question: 'When would you buy a Long Strangle?',
        options: ['You expect the stock to stay flat', 'You expect a big move but unsure of direction', 'You want to collect premium', 'You think volatility will decrease', 'When you know something crazy is about to happen but have no idea which way'],
        correctIndex: 1,
        explanation: 'Long Strangle is for when you expect a big move but are uncertain of direction. You need the move to exceed the cost of both options.'
    },
    {
        id: 'q5-7',
        tier: 5,
        type: 'true_false',
        question: 'Short Straddles and Short Strangles have unlimited risk.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Since you are naked short options, a massive move in either direction can cause unlimited losses. This is why position sizing is critical.'
    },
    {
        id: 'q5-8',
        tier: 5,
        type: 'multiple_choice',
        question: 'What is the main advantage of an Iron Condor over a Short Strangle?',
        options: ['Higher profit potential', 'Defined risk with protective wings', 'Simpler to manage', 'Better for trending markets', 'You can sleep at night without dreaming of unlimited losses'],
        correctIndex: 1,
        explanation: 'Iron Condor adds long wings that cap your risk. You sacrifice some premium but gain defined maximum loss.'
    },
    {
        id: 'q5-9',
        tier: 5,
        type: 'multiple_choice',
        question: 'What is IV Rank (IVR)?',
        options: ['The current IV divided by 100', 'How current IV compares to its range over the past year', 'The average IV across all strikes', 'The IV of ATM options only', 'A number that tells you whether fear is on sale or at retail prices'],
        correctIndex: 1,
        explanation: 'IV Rank shows where current IV sits relative to its 52-week range. IVR of 80% means IV is near the top of its range - potentially a good time to sell premium.'
    },
    {
        id: 'q5-10',
        tier: 5,
        type: 'true_false',
        question: 'A Long Straddle is a good strategy to hold through earnings.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. While straddles profit from big moves, IV crush after earnings often destroys the value of both options. The stock needs to move MORE than the expected move to profit.'
    },
    {
        id: 'q5-11',
        tier: 5,
        type: 'multiple_choice',
        question: 'What is the "expected move" telling you?',
        options: ['The guaranteed price movement', 'The one standard deviation price range implied by options pricing', 'The analyst consensus price target', 'The maximum possible stock movement', 'A polite mathematical way of saying "we have no idea but here\'s a range"'],
        correctIndex: 1,
        explanation: 'Expected move represents one standard deviation (68% probability) of price movement implied by current IV. It\'s not a prediction - it\'s what the market is pricing in.'
    },
    {
        id: 'q5-12',
        tier: 5,
        type: 'multiple_choice',
        question: 'Why might you choose a Strangle over a Straddle for a volatility play?',
        options: ['Strangles are always more profitable', 'Strangles cost less but require a bigger move to profit', 'Strangles have no risk', 'Strangles work better in low IV', 'Because paying less to need more is the options trader\'s eternal compromise'],
        correctIndex: 1,
        explanation: 'Strangles use OTM options and cost less, but the stock must move further to be profitable. It\'s a trade-off between cost and required movement.'
    },
    {
        id: 'q5-13',
        tier: 5,
        type: 'true_false',
        question: 'Iron Butterflies have higher max profit potential than Iron Condors.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Iron Butterflies concentrate the short strikes at one point (ATM), collecting more premium than Iron Condors. But they have a smaller profit zone.'
    },
    {
        id: 'q5-14',
        tier: 5,
        type: 'multiple_choice',
        question: 'How do you adjust a Short Strangle if the stock moves sharply higher?',
        options: ['Do nothing and hope', 'Roll up the put side to collect more premium', 'Close the entire position at a loss', 'Any of these could be valid depending on your thesis', 'Panic, then check your thesis, then do one of the first three options'],
        correctIndex: 3,
        explanation: 'Adjustment depends on your outlook. You might roll the untested put up, close the whole thing, or roll the tested call. There\'s no single right answer - it depends on your new thesis.'
    },
    {
        id: 'q5-15',
        tier: 5,
        type: 'multiple_choice',
        question: 'You buy options right before earnings because IV is high. The stock moves 10% your direction but you still lose money. Who\'s to blame?',
        options: ['The market makers', 'Your high school math teacher', 'Yourself for not understanding IV crush', 'The CEO\'s earnings call tone'],
        correctIndex: 2,
        explanation: 'High IV before earnings = expensive options. After earnings, IV collapses (IV crush), destroying premium faster than the directional move can save you. Lesson: Don\'t buy expensive options. Sell them.'
    },
    {
        id: 'q5-16',
        tier: 5,
        type: 'multiple_choice',
        question: 'You\'re long options and IV drops. Your position bleeds even though the stock hasn\'t moved. What\'s happening?',
        options: ['Market manipulation obviously', 'Vega is teaching you that volatility is half the game', 'Time travel', 'Your broker is stealing from you'],
        correctIndex: 1,
        explanation: 'Options have two dimensions: direction (delta) and volatility (vega). When IV drops, option prices deflate like a sad balloon regardless of stock movement. This is why timing IV matters as much as timing direction.'
    },

    // ============================================
    // TIER 6: TIME / SKEW (8 questions)
    // ============================================
    {
        id: 'q6-1',
        tier: 6,
        type: 'multiple_choice',
        question: 'A Calendar Spread involves:',
        options: ['Options at different strikes, same expiration', 'Options at the same strike, different expirations', 'Only call options', 'Only put options', 'Time travel but with extra steps and theta decay'],
        correctIndex: 1,
        explanation: 'Calendar Spread = Same strike, different expirations. Typically sell near-term, buy longer-term to profit from differential time decay.'
    },
    {
        id: 'q6-2',
        tier: 6,
        type: 'true_false',
        question: 'Calendar spreads benefit from the stock staying near the strike price.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Calendar spreads have maximum profit when the stock is at the strike at front-month expiration. Big moves hurt the position.'
    },
    {
        id: 'q6-3',
        tier: 6,
        type: 'multiple_choice',
        question: 'PMCC stands for:',
        options: ['Put Money Covered Call', 'Poor Man\'s Covered Call', 'Premium Managed Credit Call', 'Protective Modified Collar Call', 'Peasants Making Clever Compromises (because we can\'t afford 100 shares)'],
        correctIndex: 1,
        explanation: 'PMCC = Poor Man\'s Covered Call. It uses a LEAPS call instead of stock as the "covered" position, reducing capital requirements.'
    },
    {
        id: 'q6-4',
        tier: 6,
        type: 'true_false',
        question: 'A PMCC requires significantly less capital than a traditional Covered Call.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Instead of buying 100 shares ($40,000 for a $400 stock), you buy a deep ITM LEAPS call for a fraction of the cost.'
    },
    {
        id: 'q6-5',
        tier: 6,
        type: 'multiple_choice',
        question: 'In a Calendar Spread, what happens to the front-month option you sold?',
        options: ['It gains value over time', 'It decays faster than the back-month option', 'It never expires', 'It converts to stock', 'It melts like ice cream in July while your long option melts like ice cream in October'],
        correctIndex: 1,
        explanation: 'Near-term options decay faster than longer-term options. This differential decay is what calendar spreads exploit.'
    },
    {
        id: 'q6-6',
        tier: 6,
        type: 'multiple_choice',
        question: 'What is the main risk of a Calendar Spread?',
        options: ['The stock staying perfectly still', 'A large move in either direction', 'Time passing too slowly', 'Low implied volatility', 'The stock doing exactly what you didn\'t want it to do: exploding violently away'],
        correctIndex: 1,
        explanation: 'Big moves hurt calendars because the position loses its "at-the-money" advantage. The trade needs the stock to stay near the strike.'
    },
    {
        id: 'q6-7',
        tier: 6,
        type: 'true_false',
        question: 'Calendar spreads are "long vega" - they benefit from rising implied volatility.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Calendar spreads are net long vega because the back-month option has more vega exposure. Rising IV helps the position.'
    },
    {
        id: 'q6-8',
        tier: 6,
        type: 'multiple_choice',
        question: 'Why is strike selection crucial for PMCC?',
        options: ['It determines the stock you trade', 'The short call strike must be above your LEAPS cost basis', 'Strikes don\'t matter for PMCC', 'You must use the same strike for both options', 'Because accidentally capping your profit below your cost basis is peak comedy'],
        correctIndex: 1,
        explanation: 'Your short call strike should be above your LEAPS cost basis to ensure you can\'t lose money if the stock rallies through the short strike.'
    },
    {
        id: 'q6-9',
        tier: 6,
        type: 'multiple_choice',
        question: 'What is a Diagonal Spread?',
        options: ['A calendar spread at the same strike', 'A vertical spread with different expirations', 'A calendar spread with different strikes', 'A ratio spread across time', 'When vertical and horizontal spreads had a baby that nobody asked for'],
        correctIndex: 2,
        explanation: 'Diagonal = Different strikes AND different expirations. It combines elements of both calendar spreads (time) and vertical spreads (price direction).'
    },
    {
        id: 'q6-10',
        tier: 6,
        type: 'true_false',
        question: 'When the front-month option expires in a calendar spread, you should typically sell another front-month option.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. This is called "rolling" the calendar. After front-month expiration, you can sell another near-term option against your back-month, collecting more premium.'
    },
    {
        id: 'q6-11',
        tier: 6,
        type: 'multiple_choice',
        question: 'What delta should a LEAPS call have for an ideal PMCC setup?',
        options: ['0.20 (deep OTM)', '0.50 (ATM)', '0.70-0.80 (deep ITM)', '1.00 (as deep as possible)', '0.70-0.80 because we\'re pretending to own stock without paying for it'],
        correctIndex: 2,
        explanation: 'A 0.70-0.80 delta LEAPS has mostly intrinsic value and moves nearly dollar-for-dollar with the stock, making it an effective stock replacement.'
    },
    {
        id: 'q6-12',
        tier: 6,
        type: 'multiple_choice',
        question: 'What is "term structure" in options?',
        options: ['The expiration date format', 'How IV varies across different expirations', 'The order of strike prices', 'The margin requirement schedule', 'A fancy way to say fear costs different amounts at different times'],
        correctIndex: 1,
        explanation: 'Term structure shows how IV changes across expirations. Usually longer-dated options have different (often lower) IV than near-term options.'
    },
    {
        id: 'q6-13',
        tier: 6,
        type: 'true_false',
        question: 'A Double Calendar spread uses two calendar spreads at different strikes.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Double Calendar = two calendars (one at a lower strike, one at a higher strike). This creates two profit humps and a wider profit zone.'
    },
    {
        id: 'q6-14',
        tier: 6,
        type: 'multiple_choice',
        question: 'What happens to a calendar spread if IV drops significantly?',
        options: ['Both options lose value equally', 'The back-month loses more value than the front-month', 'The front-month loses more value', 'IV has no effect on calendars', 'Your carefully crafted time machine explodes because fear evaporated'],
        correctIndex: 1,
        explanation: 'Calendars are long vega. The back-month has more vega exposure, so it loses more value when IV drops. This is why calendars struggle in falling IV environments.'
    },
    {
        id: 'q6-15',
        tier: 6,
        type: 'multiple_choice',
        question: 'What do theta gang members do while everyone else panics about stock direction?',
        options: ['Panic harder', 'Sip coffee and collect premium while time decays', 'Check their phones every 5 seconds', 'Pray to the IV gods'],
        correctIndex: 1,
        explanation: 'Theta gang doesn\'t care if the stock goes up, down, or sideways. They care that time passes. Every day, premium decays. Every day, they get paid. This is the way.'
    },
    {
        id: 'q6-16',
        tier: 6,
        type: 'multiple_choice',
        question: 'It\'s Friday 4pm. Markets closed. Your short options have 2 days until Monday open. What\'s happening to theta?',
        options: ['Nothing, markets are closed', 'It\'s secretly decaying over the weekend like leftover pizza', 'Theta takes weekends off', 'Your broker pauses time'],
        correctIndex: 1,
        explanation: 'Time doesn\'t stop on weekends. Options decay 24/7, including Saturday and Sunday. If you\'re short premium going into the weekend, theta is working FOR you even while you sleep. Nature is healing.'
    },

    // ============================================
    // TIER 7: RATIOS (8 questions)
    // ============================================
    {
        id: 'q7-1',
        tier: 7,
        type: 'multiple_choice',
        question: 'A Call Front Ratio (1x2) involves:',
        options: ['Buying 2 calls and selling 1 call', 'Buying 1 call and selling 2 calls at a higher strike', 'Selling 2 calls and buying 2 calls', 'Buying 1 put and selling 2 puts', 'Selling your soul twice for one chance at profit'],
        correctIndex: 1,
        explanation: 'Call Front Ratio: Buy 1 ATM call, sell 2 OTM calls. Often done for zero cost, but has unlimited risk above the short strikes.'
    },
    {
        id: 'q7-2',
        tier: 7,
        type: 'true_false',
        question: 'A Call Front Ratio can be entered for zero cost or even a credit.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. By selling 2 calls against 1, you can offset the cost of the long call. This creates a "free trade" but with unlimited upside risk.'
    },
    {
        id: 'q7-3',
        tier: 7,
        type: 'multiple_choice',
        question: 'A Call Backspread has maximum loss when:',
        options: ['The stock crashes', 'The stock rallies to infinity', 'The stock lands exactly at the long strike', 'The stock stays flat', 'The stock pins precisely at your strike like it knows you\'re watching'],
        correctIndex: 2,
        explanation: 'The "valley of death" is at the long strike - where your short is fully ITM but your longs are worthless. This is maximum pain.'
    },
    {
        id: 'q7-4',
        tier: 7,
        type: 'true_false',
        question: 'A ZEBRA strategy moves dollar-for-dollar with the stock like owning 100 shares.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. ZEBRA (Zero Extrinsic Back Ratio) creates 100 delta exposure. It mimics stock ownership but with less capital and defined risk.'
    },
    {
        id: 'q7-5',
        tier: 7,
        type: 'multiple_choice',
        question: 'What does ZEBRA stand for?',
        options: ['Zero Equity Back Ratio Agreement', 'Zero Extrinsic Back Ratio', 'Zone Entry Bullish Risk Adjusted', 'Zero Earnings Bullish Rally Anticipation', 'Zero Extrinsic Back Ratio or possibly an animal someone named a strategy after'],
        correctIndex: 1,
        explanation: 'ZEBRA = Zero Extrinsic Back Ratio. The structure cancels out extrinsic value (time decay), leaving pure directional exposure.'
    },
    {
        id: 'q7-6',
        tier: 7,
        type: 'multiple_choice',
        question: 'A Broken Wing Butterfly differs from a regular butterfly because:',
        options: ['It uses puts instead of calls', 'The wings are at unequal distances from the body', 'It has no risk', 'It requires no margin', 'Someone deliberately broke a perfectly good butterfly to make it asymmetric'],
        correctIndex: 1,
        explanation: 'Broken Wing Butterfly skips a strike on one wing, creating asymmetric risk. This often allows entry for a credit instead of a debit.'
    },
    {
        id: 'q7-7',
        tier: 7,
        type: 'true_false',
        question: 'Put Backspreads can be entered for a credit while still having crash protection.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. By selling 1 ATM put and buying 2 OTM puts, you can collect credit AND have downside protection if the market crashes.'
    },
    {
        id: 'q7-8',
        tier: 7,
        type: 'multiple_choice',
        question: 'Which ratio strategy has unlimited risk?',
        options: ['Put Backspread', 'Call Backspread', 'Call Front Ratio (1x2)', 'ZEBRA', 'The one where you sold more than you bought like an optimistic fool'],
        correctIndex: 2,
        explanation: 'Call Front Ratio has unlimited risk above the short strikes because you are naked short 1 call. Backspreads and ZEBRA have defined risk.'
    },
    {
        id: 'q7-9',
        tier: 7,
        type: 'multiple_choice',
        question: 'What is the "sweet spot" for a Put Front Ratio (1x2)?',
        options: ['Stock rallies sharply', 'Stock drops to the short strike at expiration', 'Stock crashes well below the long puts', 'Stock stays exactly flat', 'The mythical place the stock will never actually land because math hates you'],
        correctIndex: 1,
        explanation: 'Put Front Ratio max profit is at the short strike. The long put is worthless, and both short puts are ATM but have no intrinsic value yet.'
    },
    {
        id: 'q7-10',
        tier: 7,
        type: 'true_false',
        question: 'A Call Backspread profits from both a big rally AND a big drop.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Call Backspread primarily profits from a big RALLY (unlimited upside). A big drop gives limited profit (the credit received). The "valley of death" is in between.'
    },
    {
        id: 'q7-11',
        tier: 7,
        type: 'multiple_choice',
        question: 'Why is position sizing especially critical for Front Ratios?',
        options: ['They are always profitable', 'They have unlimited risk on one side', 'They require more margin', 'They expire worthless most of the time', 'Because unlimited risk means unlimited ways to explain bankruptcy to your family'],
        correctIndex: 1,
        explanation: 'Front Ratios have a naked short component, creating unlimited risk. A runaway move can cause catastrophic losses, so position sizing must account for worst-case scenarios.'
    },
    {
        id: 'q7-12',
        tier: 7,
        type: 'multiple_choice',
        question: 'What advantage does a ZEBRA have over simply buying 100 shares of stock?',
        options: ['Higher dividends', 'Defined downside risk with less capital required', 'Guaranteed profits', 'No expiration date', 'You get stock-like exposure without the commitment issues of actually owning stock'],
        correctIndex: 1,
        explanation: 'ZEBRA gives you 100 delta exposure like stock but uses less capital and has defined risk (the LEAPS can only go to zero). The trade-off is the expiration date.'
    },
    {
        id: 'q7-13',
        tier: 7,
        type: 'true_false',
        question: 'Broken Wing Butterflies always have risk on only one side.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. By "skipping" a strike on one wing, Broken Wing Butterflies create asymmetric risk. They typically have risk on only one side and can often be entered for a credit.'
    },
    {
        id: 'q7-14',
        tier: 7,
        type: 'multiple_choice',
        question: 'When would you use a Put Backspread?',
        options: ['Expecting a slow grind higher', 'Expecting a potential crash with limited downside if wrong', 'Expecting the stock to stay perfectly flat', 'Expecting low volatility', 'When you think the market is about to fall off a cliff and want to profit from carnage'],
        correctIndex: 1,
        explanation: 'Put Backspread is for crash protection. You get unlimited downside profit if the stock tanks, limited loss or small profit if it rallies, but pain if it drifts slowly lower.'
    },
    {
        id: 'q7-15',
        tier: 7,
        type: 'multiple_choice',
        question: 'You sell 3 options against 1 long option because "free money." What could possibly go wrong?',
        options: ['Nothing, math is on your side', 'Unlimited risk if the stock explodes past your short strikes', 'The market will respect your genius', 'Worst case you break even'],
        correctIndex: 1,
        explanation: 'Ratio spreads (selling more than you buy) create naked short exposure. That means UNLIMITED RISK if the stock keeps running. Great in theory, catastrophic in practice if you don\'t manage it.'
    },
    {
        id: 'q7-16',
        tier: 7,
        type: 'multiple_choice',
        question: 'You sell a near-term option and buy a far-term option at the same strike. You\'ve basically built a time machine to profit from...',
        options: ['The stock moving violently', 'Theta decay accelerating on the short leg while the long leg holds value', 'Market manipulation', 'Insider trading'],
        correctIndex: 1,
        explanation: 'Calendar spreads exploit the fact that near-term options decay FASTER than far-term ones. You collect decay on what you sold, while your long option loses value slower. It\'s time arbitrage.'
    },

    // ============================================
    // TIER 8: STRATEGY TOOLS (12 questions)
    // ============================================
    {
        id: 'q8-1',
        tier: 8,
        type: 'multiple_choice',
        question: 'What is the PRIMARY purpose of keeping a Trade Journal?',
        options: ['To impress other traders', 'To track P&L for taxes only', 'To identify patterns in your behavior and improve decision-making', 'To record stock tips from others', 'To document your journey from confident to humble in 30 trades or less'],
        correctIndex: 2,
        explanation: 'A Trade Journal helps you identify patterns in YOUR trading behavior—what works, what fails, and why. This self-awareness is key to improvement.'
    },
    {
        id: 'q8-2',
        tier: 8,
        type: 'true_false',
        question: 'Paper trading is useless because there are no real emotions involved.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. While emotions differ, paper trading is valuable for learning mechanics, testing strategies, and building confidence without risking capital. It\'s a crucial training ground.'
    },
    {
        id: 'q8-3',
        tier: 8,
        type: 'multiple_choice',
        question: 'When using a Position Sizing Calculator, what is the FIRST input you need?',
        options: ['Expected profit', 'Your maximum acceptable loss per trade', 'The stock\'s dividend yield', 'Your broker\'s commission', 'How much you can lose before your spouse asks uncomfortable questions'],
        correctIndex: 1,
        explanation: 'Position sizing starts with risk: How much are you willing to lose? From there, you calculate how many contracts you can trade while staying within that risk limit.'
    },
    {
        id: 'q8-4',
        tier: 8,
        type: 'multiple_choice',
        question: 'What does an Options Screener help you find?',
        options: ['The "best" stock to buy', 'Options that match specific criteria (IV, delta, premium, etc.)', 'Insider trading activity', 'Guaranteed profitable trades', 'Options that fit your strategy instead of scrolling through 10,000 strikes like a cave person'],
        correctIndex: 1,
        explanation: 'Options Screeners filter thousands of options to find those matching YOUR criteria—high IV for selling premium, specific delta ranges, target premiums, etc.'
    },
    {
        id: 'q8-5',
        tier: 8,
        type: 'true_false',
        question: 'A Risk-Reward Calculator can tell you if a trade will be profitable.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. It shows the POTENTIAL risk and reward based on your inputs, but cannot predict the future. It helps you evaluate if the potential reward justifies the risk.'
    },
    {
        id: 'q8-6',
        tier: 8,
        type: 'multiple_choice',
        question: 'What does a 3D Options Surface visualization show?',
        options: ['Stock price history', 'How option prices change across strikes AND expirations simultaneously', 'Your portfolio balance', 'News sentiment', 'A beautiful mountain range made of pain and premium decay'],
        correctIndex: 1,
        explanation: 'The 3D surface shows option pricing across two dimensions: strike price and time to expiration. This reveals patterns in IV skew and term structure.'
    },
    {
        id: 'q8-7',
        tier: 8,
        type: 'multiple_choice',
        question: 'In an Options Chain Viewer, what does "OI" stand for?',
        options: ['Option Interest', 'Open Interest', 'Original Investment', 'Optimal Indicator', 'Open Interest or "Oh, Interesting" when you see massive volume at one strike'],
        correctIndex: 1,
        explanation: 'OI = Open Interest, the total number of outstanding contracts at a given strike. High OI indicates liquidity and can signal significant price levels.'
    },
    {
        id: 'q8-8',
        tier: 8,
        type: 'true_false',
        question: 'You should always trade the options with the highest Open Interest.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. High OI indicates liquidity (good), but doesn\'t mean the trade fits YOUR strategy. Choose options based on your thesis, then verify adequate liquidity.'
    },
    {
        id: 'q8-9',
        tier: 8,
        type: 'multiple_choice',
        question: 'What should you record in your Trade Journal BEFORE entering a trade?',
        options: ['Only the final P&L', 'Your thesis, entry criteria, and exit plan', 'Nothing—journal after the trade', 'The weather that day', 'Your thesis so future you can laugh at how wrong you were'],
        correctIndex: 1,
        explanation: 'Recording your thesis BEFORE entry prevents hindsight bias. You can later compare what you THOUGHT would happen vs. what DID happen.'
    },
    {
        id: 'q8-10',
        tier: 8,
        type: 'multiple_choice',
        question: 'A Strategy Builder tool is most useful for:',
        options: ['Automatically making trades for you', 'Visualizing payoff diagrams and Greeks before entering a trade', 'Finding the "best" strategy', 'Copying other traders', 'Playing with hypothetical trades until you realize you can\'t afford any of them'],
        correctIndex: 1,
        explanation: 'Strategy Builders let you model trades BEFORE committing capital. You can see max profit, max loss, breakevens, and how Greeks change—essential for planning.'
    },
    {
        id: 'q8-11',
        tier: 8,
        type: 'true_false',
        question: 'Paper trading results will perfectly match real trading results.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Paper trading often uses mid-price fills, while real trading involves slippage, wider spreads, and emotional pressure. Results will differ—use paper trading to learn mechanics, not to predict exact returns.'
    },
    {
        id: 'q8-12',
        tier: 8,
        type: 'multiple_choice',
        question: 'What is the 2% Rule in position sizing?',
        options: ['Only trade 2% of the time', 'Never risk more than 2% of your portfolio on a single trade', 'Always aim for 2% profit', 'Keep 2% in cash', 'The boring rule that keeps you alive when your portfolio wants to die'],
        correctIndex: 1,
        explanation: 'The 2% Rule means never risking more than 2% of your total portfolio on any single trade. This ensures you can survive a string of losses without account destruction.'
    },
    {
        id: 'q8-13',
        tier: 8,
        type: 'multiple_choice',
        question: 'You ignore the Greeks and trade purely on "gut feel." How\'s that working out?',
        options: ['Amazing, I\'m a natural', 'Like driving a car blindfolded—thrilling until the crash', 'The Greeks are overrated', 'Feelings > Math'],
        correctIndex: 1,
        explanation: 'The Greeks (Delta, Gamma, Theta, Vega) are your instrument panel. Without them, you\'re flying blind. Sure, you might get lucky a few times. Then one trade explodes and you have no idea why. Learn the Greeks or pay tuition to the market.'
    },
    {
        id: 'q8-14',
        tier: 8,
        type: 'multiple_choice',
        question: 'Your portfolio delta is +500. What does that mean in English?',
        options: ['You have $500', 'You\'re effectively long 500 shares worth of directional exposure', 'You owe someone $500', 'Your portfolio weighs 500 pounds', 'You\'re pretending to own 500 shares without the commitment or dividends'],
        correctIndex: 1,
        explanation: 'Portfolio delta tells you your net directional bias. +500 delta = you\'re acting like you own 500 shares. If the market drops $1, you lose ~$500. If you don\'t know your portfolio delta, you don\'t know your risk.'
    }
];

// Helper function to get questions for a specific tier
export const getQuestionsForTier = (tier: number): QuizQuestion[] => {
    return QUIZ_QUESTIONS.filter(q => q.tier === tier);
};

// Shuffle array helper (Fisher-Yates)
export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
