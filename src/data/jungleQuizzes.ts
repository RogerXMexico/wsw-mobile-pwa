// Jungle Trading Academy - Quiz Questions

import { RiskAssessmentQuestion, JungleQuizQuestion } from '../types/jungle';

// ============ RISK ASSESSMENT QUIZ ============

export const RISK_ASSESSMENT_QUESTIONS: RiskAssessmentQuestion[] = [
  {
    id: 'ra-1',
    question: 'Camus wrote that life is a sum of all your choices. You have $10,000 to invest in options. A stock you like has been volatile. What do you do?',
    options: [
      {
        text: 'Buy the stock and sell covered calls for steady income',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Use a bull put spread to define my risk while collecting premium',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Buy call options to maximize my upside potential',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Sell naked puts to collect premium and potentially buy at a discount',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'I have no idea what a bull put spread or naked put is, but it sounds painful',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-2',
    question: 'Nietzsche also claimed that what doesn\'t kill us makes us stronger. Your option trade is down 30%. What\'s your reaction?',
    options: [
      {
        text: 'Close immediately - I can feel my blood pressure rising',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: 'I would have had a stop-loss in place already (like an adult)',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Hold and reassess - maybe I\'m early, not wrong',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Consider doubling down - you only lose if you sell, right?',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Panic and refresh my brokerage app 47 times per minute',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-3',
    question: 'The Zen masters teach that the obstacle is the path. What\'s your ideal holding period for an options trade?',
    options: [
      {
        text: 'Weeks to months - I prefer watching paint dry',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Days to weeks - enough time to be right, not enough to get bored',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Days - in and out like a caffeinated ninja',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Hours to days - I have the attention span of a goldfish on Red Bull',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'What\'s a holding period? I thought you just buy and hope',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-4',
    question: 'Do you agree with Nietzsche\'s claim that the secret of reaping the greatest fruitfulness and the greatest enjoyment from life is to live dangerously? How do you feel about undefined risk trades (like naked puts)?',
    options: [
      {
        text: 'Never - I always need to know my maximum loss (and my maximum therapy bill)',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Rarely - only with very small position sizes and a stiff drink',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Sometimes - if the probability of success is high (narrator: it wasn\'t)',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Often - YOLO is a risk management strategy, right?',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Undefined risk? That sounds like my college dating life',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-5',
    question: 'Kierkegaard believed that life can only be understood backwards, but must be lived forwards. What percentage of your trading capital would you risk on a single trade?',
    options: [
      {
        text: '1-2% maximum - because I enjoy sleeping at night',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: '3-5% - balanced, like my breakfast and my chakras',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: '5-10% - high conviction = high risk (and high antacids)',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: '10%+ - diversification is for people who don\'t know what they\'re doing',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Wait, you\'re supposed to only risk a percentage?',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-6',
    question: 'Nietzsche wrote that he who has a why to live can bear almost any how. How do you react when a trade goes in your favor quickly?',
    options: [
      {
        text: 'Take profits at my predetermined target (like I planned when I was rational)',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Adjust my position to lock in gains - because pigs get slaughtered',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Let it ride - this rocket ship has no brakes!',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Add to the position - I\'m basically Warren Buffett now',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Screenshot it for social media before it disappears',
        scores: { sloth: 1, badger: 2, monkey: 2, cheetah: 1 },
      },
    ],
  },
  {
    id: 'ra-7',
    question: 'There\'s an old Zen saying: "Sitting quietly, doing nothing, spring comes, and the grass grows by itself." How would you describe your emotional response to market volatility?',
    options: [
      {
        text: 'Volatility makes me uncomfortable - like a sweater made of anxiety',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: 'I can handle moderate swings without crying (usually)',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'I get excited - my heart rate matches the VIX',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'I thrive in chaos - volatility is my natural habitat',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Emotional response? I thought we were supposed to feel nothing',
        scores: { sloth: 2, badger: 2, monkey: 1, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-8',
    question: 'Nietzsche argued that one must still have chaos in oneself to be able to give birth to a dancing star. What\'s your primary goal with options trading?',
    options: [
      {
        text: 'Generate steady income - retirement isn\'t going to fund itself',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Grow my account with calculated, defined-risk trades (aka adulting)',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Capture significant gains - I want the lambo, not the Honda',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Maximum returns - swing for the fences or die trying',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Honestly? To feel something',
        scores: { sloth: 0, badger: 1, monkey: 2, cheetah: 2 },
      },
    ],
  },
  {
    id: 'ra-9',
    question: 'Nietzsche famously urged us to "become who you are." How much options trading experience do you have?',
    options: [
      {
        text: 'Beginner - I just learned what "calls" and "puts" mean yesterday',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Intermediate - I understand the Greeks (the trading ones, not the mythology)',
        scores: { sloth: 1, badger: 3, monkey: 2, cheetah: 0 },
      },
      {
        text: 'Advanced - I\'ve lost money in at least 5 different strategies',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 2 },
      },
      {
        text: 'Expert - I dream in Greeks and wake up calculating delta',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'I watched The Big Short - does that count?',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-10',
    question: 'Kierkegaard described anxiety as the dizziness of freedom. A friend tells you about a "sure thing" options trade. What do you do?',
    options: [
      {
        text: 'Ignore it - and start looking for smarter friends',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Research it thoroughly - trust but verify (mostly verify)',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Consider it if the technicals check out - but keep it small',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Jump in immediately - this is financial advice, right?',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Ask if this is the same friend who recommended crypto in November 2021',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-11',
    question: 'Einstein said compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn\'t, pays it. How do you feel about using leverage in your trading?',
    options: [
      {
        text: 'I avoid it - leverage is the dark side of the force',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: 'I use it conservatively - like hot sauce, a little goes a long way',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'I embrace it - 10x or nothing baby',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Maximum leverage - I\'m here for a good time, not a long time',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'What\'s leverage? Is that like using a crowbar?',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-12',
    question: 'Nietzsche believed that in every real man a child is hidden that wants to play. If you lost 50% of your trading account, how would you respond?',
    options: [
      {
        text: 'Step back, re-evaluate my life choices, possibly join a monastery',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Analyze what went wrong - treat it like expensive tuition',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Take a break, then come back with half the position sizes',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Double down - it\'s not a loss if I make it back, right?',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Check if the circus is still taking applications',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-13',
    question: 'The Zen masters say: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water." What type of options strategy appeals to you most?',
    options: [
      {
        text: 'Simple single-leg trades - I can count that high',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Defined-risk spreads - because I like knowing my worst-case scenario',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Directional plays - let\'s ride this rocket or crater spectacularly',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Complex multi-leg strategies - I have a PhD in overthinking',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'I don\'t know what any of these words mean but I\'m sure a dictionary does',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-14',
    question: 'Homer Simpson once said: "Facts are meaningless. You could use facts to prove anything that\'s even remotely true!" How do you prefer to make money with options?',
    options: [
      {
        text: 'Collecting steady premium income - slow and boring, like compound interest',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'High-probability trades - I like math, not miracles',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Catching big directional moves - ride or die',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'Exploiting volatility - I speak fluent chaos',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'Preferably without losing it first',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-15',
    question: 'Kierkegaard wrote: "To dare is to lose one\'s footing momentarily. Not to dare is to lose oneself." What is your general market outlook?',
    options: [
      {
        text: 'I don\'t predict direction - I just collect premium and pray',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: 'Neutral - let theta do the heavy lifting while I sip coffee',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: 'Usually bullish - stocks only go up (until they don\'t)',
        scores: { sloth: 0, badger: 1, monkey: 3, cheetah: 1 },
      },
      {
        text: 'I trade both directions - I\'m an equal opportunity profit seeker',
        scores: { sloth: 0, badger: 0, monkey: 1, cheetah: 3 },
      },
      {
        text: 'My outlook is "confused but optimistic"',
        scores: { sloth: 2, badger: 2, monkey: 1, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-16',
    question: 'In Dante\'s Inferno, Virgil guides Dante through the nine circles of hell. Who has been YOUR guide through the markets?',
    options: [
      {
        text: '"Virgil himself" - I\'ve had mentors, read books, taken courses, studied for years',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: '"A confused tourist with a map" - I\'ve watched some YouTube videos and read a few articles',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: '"I AM Virgil" - I\'ve been trading/investing for decades and could write the guide',
        scores: { sloth: 0, badger: 1, monkey: 2, cheetah: 3 },
      },
      {
        text: '"Still looking for the exit" - I just opened my first brokerage account',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-17',
    question: 'Odysseus took 20 years to return home. How long is YOUR journey to financial freedom?',
    options: [
      {
        text: '"I\'m still in Troy" - 30+ years until I need this money (I\'m young)',
        scores: { sloth: 0, badger: 1, monkey: 2, cheetah: 3 },
      },
      {
        text: '"Halfway past the Cyclops" - 15-30 years (I\'m middle-aged)',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: '"I can see Ithaca from here" - Less than 15 years (retirement approaching)',
        scores: { sloth: 3, badger: 2, monkey: 0, cheetah: 0 },
      },
      {
        text: '"I never left Ithaca" - I\'m already retired and living off investments',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
  {
    id: 'ra-18',
    question: 'Marcus Aurelius said "You have power over your mind, not outside events." Epicurus said "Eat, drink, and be merry." Which Roman are you?',
    options: [
      {
        text: '"Marcus Aurelius" - Control what I can control, hedge risks, stay disciplined',
        scores: { sloth: 2, badger: 3, monkey: 0, cheetah: 0 },
      },
      {
        text: '"Epicurus" - YOLO, market\'s gonna do what it\'s gonna do',
        scores: { sloth: 0, badger: 0, monkey: 2, cheetah: 3 },
      },
      {
        text: '"A blend of both" - Discipline in my core, freedom in my speculative portfolio',
        scores: { sloth: 1, badger: 2, monkey: 2, cheetah: 1 },
      },
      {
        text: '"Nero" - I fiddle while my portfolio burns',
        scores: { sloth: 1, badger: 0, monkey: 1, cheetah: 2 },
      },
    ],
  },
  {
    id: 'ra-19',
    question: 'Socrates said "I know that I know nothing." Where are you on the Socratic spectrum?',
    options: [
      {
        text: '"I know nothing" - Just starting, everything is new',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: '"I know I know a little" - Been doing this a few years, still learning',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: '"I know quite a bit" - Seasoned trader/investor, 10+ years',
        scores: { sloth: 0, badger: 2, monkey: 3, cheetah: 1 },
      },
      {
        text: '"I know I know nothing, but in an advanced way" - Decades of humility and scars',
        scores: { sloth: 0, badger: 1, monkey: 1, cheetah: 3 },
      },
    ],
  },
  {
    id: 'ra-20',
    question: 'Kierkegaard\'s "leap of faith" or Camus\' "calculated rebellion"—how do you approach a volatile market?',
    options: [
      {
        text: '"Kierkegaard" - Sometimes you just have to take the leap (high risk tolerance)',
        scores: { sloth: 0, badger: 0, monkey: 2, cheetah: 3 },
      },
      {
        text: '"Camus" - Rebel against the absurd, but do it strategically (moderate risk)',
        scores: { sloth: 1, badger: 3, monkey: 1, cheetah: 0 },
      },
      {
        text: '"Sartre" - Hell is other people\'s portfolios, I do my own thing (very conservative)',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
      {
        text: '"Kafka" - I feel like I\'ve been turned into a bug watching these charts (confused/new)',
        scores: { sloth: 3, badger: 1, monkey: 0, cheetah: 0 },
      },
    ],
  },
];

// ============ STRATEGY QUIZ QUESTIONS ============

export const STRATEGY_QUIZZES: Record<string, JungleQuizQuestion[]> = {
  // SLOTH QUIZZES
  'sloth-covered-call': [
    {
      id: 'cc-1',
      type: 'multiple_choice',
      question: 'What do you need to own before selling a covered call?',
      options: ['Nothing - covered calls are naked', 'At least 100 shares of the underlying stock', 'A put option on the same stock', 'Cash equal to the strike price'],
      correctIndex: 1,
      explanation: 'A covered call requires you to own at least 100 shares of the underlying stock. This is what makes it "covered" - you can deliver the shares if assigned.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'cc-2',
      type: 'multiple_choice',
      question: 'What happens if the stock price rises above your call strike at expiration?',
      options: ['You lose money', 'Your shares are likely called away at the strike price', 'The option expires worthless', 'You must buy more shares'],
      correctIndex: 1,
      explanation: 'When the stock price exceeds your strike price, the call is in-the-money and will likely be exercised. You\'ll sell your shares at the strike price (plus keep the premium).',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'cc-3',
      type: 'true_false',
      question: 'The maximum profit on a covered call is unlimited because the stock could rise indefinitely.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False. The maximum profit is capped at the strike price minus your purchase price plus the premium received. If the stock rockets up, your upside is limited to the strike price.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'cc-4',
      type: 'scenario',
      question: 'You bought XYZ at $50 and sold a $55 call for $2. The stock is at $60 at expiration. What is your total profit per share?',
      options: ['$10', '$7', '$5', '$12'],
      correctIndex: 1,
      explanation: 'Your profit is: ($55 strike - $50 cost) + $2 premium = $7 per share. You miss out on the move from $55 to $60, but you locked in a solid gain.',
      points: 15,
      difficulty: 2,
    },
    {
      id: 'cc-5',
      type: 'multiple_choice',
      question: 'When is the best time to sell covered calls?',
      options: ['When implied volatility is low', 'When you expect the stock to crash', 'When implied volatility is elevated', 'Right before earnings'],
      correctIndex: 2,
      explanation: 'Elevated IV means higher option premiums. Selling calls when IV is high allows you to collect more premium. Just be aware that high IV often means expected movement.',
      points: 15,
      difficulty: 3,
    },
  ],

  'sloth-cash-secured-put': [
    {
      id: 'csp-1',
      type: 'multiple_choice',
      question: 'What does "cash-secured" mean in a cash-secured put?',
      options: ['You secure the put with another option', 'You have enough cash to buy the shares if assigned', 'The cash is locked in a separate account', 'The put is guaranteed to make money'],
      correctIndex: 1,
      explanation: 'Cash-secured means you have enough cash in your account to buy 100 shares at the strike price if you\'re assigned on the put.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'csp-2',
      type: 'true_false',
      question: 'Selling a cash-secured put is bullish to neutral on the underlying stock.',
      options: ['True', 'False'],
      correctIndex: 0,
      explanation: 'True. You want the stock to stay above your strike (so the put expires worthless) or you\'re happy to buy it at the strike price. You\'re not bearish.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'csp-3',
      type: 'scenario',
      question: 'You sell a $100 put for $3 on a stock at $105. If assigned, what is your effective purchase price?',
      options: ['$103', '$100', '$97', '$105'],
      correctIndex: 2,
      explanation: 'Your effective cost is the strike price minus the premium received: $100 - $3 = $97 per share.',
      points: 15,
      difficulty: 2,
    },
    {
      id: 'csp-4',
      type: 'multiple_choice',
      question: 'What is the maximum loss on a cash-secured put?',
      options: ['The premium received', 'Unlimited', 'Strike price minus premium (if stock goes to zero)', 'Strike price only'],
      correctIndex: 2,
      explanation: 'If the stock goes to $0, you\'re forced to buy at the strike price. Your loss is strike price minus the premium you collected.',
      points: 10,
      difficulty: 2,
    },
  ],

  'sloth-protective-put': [
    {
      id: 'pp-1',
      type: 'multiple_choice',
      question: 'What is the purpose of a protective put?',
      options: ['To generate income', 'To limit downside risk on shares you own', 'To profit from a stock decline', 'To reduce your cost basis'],
      correctIndex: 1,
      explanation: 'A protective put acts as insurance for your stock position. It limits how much you can lose if the stock drops.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'pp-2',
      type: 'scenario',
      question: 'You own stock at $100 and buy a $90 put for $3. The stock drops to $70. What is your net loss per share?',
      options: ['$30', '$13', '$10', '$3'],
      correctIndex: 1,
      explanation: 'Your loss is capped at: ($100 - $90) + $3 premium = $13. Without the put, you\'d have lost $30.',
      points: 15,
      difficulty: 2,
    },
    {
      id: 'pp-3',
      type: 'true_false',
      question: 'A protective put eliminates all risk from your stock position.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False. You still have risk: the difference between your stock price and the put strike, plus the cost of the put premium.',
      points: 10,
      difficulty: 2,
    },
  ],

  'sloth-collar': [
    {
      id: 'col-1',
      type: 'multiple_choice',
      question: 'A collar strategy combines which two options strategies?',
      options: ['Long call and long put', 'Covered call and protective put', 'Bull spread and bear spread', 'Straddle and strangle'],
      correctIndex: 1,
      explanation: 'A collar combines a covered call (selling an OTM call) with a protective put (buying an OTM put) on stock you own.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'col-2',
      type: 'true_false',
      question: 'A zero-cost collar provides free downside protection.',
      options: ['True', 'False'],
      correctIndex: 0,
      explanation: 'True - technically. A zero-cost collar uses the premium from the covered call to pay for the protective put. But you give up upside potential in exchange.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'col-3',
      type: 'scenario',
      question: 'You own stock at $100, buy a $95 put for $3, and sell a $105 call for $3. What is your profit range?',
      options: ['$0 to $10', '-$5 to $5', '-$5 to $10', '-$8 to $8'],
      correctIndex: 1,
      explanation: 'Your floor is $95 (put strike) - $100 (cost) = -$5. Your ceiling is $105 (call strike) - $100 (cost) = $5. Net premium is $0.',
      points: 15,
      difficulty: 3,
    },
  ],

  // BADGER QUIZZES
  'badger-bull-put-spread': [
    {
      id: 'bps-1',
      type: 'multiple_choice',
      question: 'A bull put spread involves:',
      options: ['Buying a put and selling a call', 'Selling a higher strike put and buying a lower strike put', 'Buying calls at two different strikes', 'Selling naked puts'],
      correctIndex: 1,
      explanation: 'A bull put spread: sell a put at a higher strike (closer to the stock), buy a put at a lower strike (defines max loss). You receive a net credit.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'bps-2',
      type: 'scenario',
      question: 'You sell a $100 put for $5 and buy a $95 put for $2. What is your max profit?',
      options: ['$500', '$300', '$200', '$700'],
      correctIndex: 1,
      explanation: 'Max profit is the net credit received: $5 - $2 = $3 per share, or $300 per contract.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'bps-3',
      type: 'scenario',
      question: 'Using the same spread ($100/$95 bull put), what is your max loss?',
      options: ['$500', '$300', '$200', 'Unlimited'],
      correctIndex: 2,
      explanation: 'Max loss is the width of strikes minus the credit: ($100 - $95) - $3 = $2 per share, or $200 per contract.',
      points: 15,
      difficulty: 2,
    },
    {
      id: 'bps-4',
      type: 'multiple_choice',
      question: 'What is the breakeven for a $50/$45 bull put spread with $1.50 credit?',
      options: ['$48.50', '$51.50', '$46.50', '$50'],
      correctIndex: 0,
      explanation: 'Breakeven = short put strike - credit received = $50 - $1.50 = $48.50.',
      points: 10,
      difficulty: 2,
    },
  ],

  'badger-iron-condor': [
    {
      id: 'ic-1',
      type: 'multiple_choice',
      question: 'An iron condor is best used when you expect:',
      options: ['A big move up', 'A big move down', 'The stock to stay in a range', 'High volatility'],
      correctIndex: 2,
      explanation: 'Iron condors profit when the stock stays between the short strikes. They\'re range-bound, neutral strategies.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'ic-2',
      type: 'multiple_choice',
      question: 'How many option legs are in an iron condor?',
      options: ['2', '3', '4', '5'],
      correctIndex: 2,
      explanation: 'An iron condor has 4 legs: sell OTM put, buy further OTM put, sell OTM call, buy further OTM call.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'ic-3',
      type: 'true_false',
      question: 'An iron condor has unlimited loss potential on both sides.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False. Both sides have defined risk due to the long options (wings). Max loss is the width of the wider spread minus the total credit.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'ic-4',
      type: 'scenario',
      question: 'You set up an iron condor: sell $100 put, buy $95 put, sell $110 call, buy $115 call. Total credit: $2. What is max loss?',
      options: ['$200', '$300', '$500', '$700'],
      correctIndex: 1,
      explanation: 'The wider wing is $5 (both are equal here). Max loss = $5 - $2 credit = $3 per share, or $300.',
      points: 15,
      difficulty: 3,
    },
  ],

  // MONKEY QUIZZES
  'monkey-long-call': [
    {
      id: 'lc-1',
      type: 'multiple_choice',
      question: 'What is the maximum loss on a long call?',
      options: ['Unlimited', 'The strike price', 'The premium paid', 'There is no loss possible'],
      correctIndex: 2,
      explanation: 'Your max loss on a long call is the premium you paid. If the stock doesn\'t rise above your breakeven, you lose the premium.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'lc-2',
      type: 'scenario',
      question: 'You buy a $50 call for $3. The stock is at $58 at expiration. What is your profit?',
      options: ['$8', '$5', '$3', '$11'],
      correctIndex: 1,
      explanation: 'Intrinsic value at expiration: $58 - $50 = $8. Minus the $3 premium = $5 profit per share.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'lc-3',
      type: 'multiple_choice',
      question: 'Time decay (theta) affects a long call by:',
      options: ['Increasing its value over time', 'Decreasing its value over time', 'Having no effect', 'Only affecting it at expiration'],
      correctIndex: 1,
      explanation: 'Theta works against long option holders. Each day, all else equal, your option loses value due to time decay.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'lc-4',
      type: 'multiple_choice',
      question: 'What is the breakeven for a $100 call purchased for $5?',
      options: ['$100', '$105', '$95', '$110'],
      correctIndex: 1,
      explanation: 'Breakeven = strike + premium = $100 + $5 = $105. The stock must exceed $105 for you to profit.',
      points: 10,
      difficulty: 1,
    },
  ],

  'monkey-straddle': [
    {
      id: 'str-1',
      type: 'multiple_choice',
      question: 'A long straddle involves:',
      options: ['Buying a call and selling a put at the same strike', 'Buying both a call and put at the same strike', 'Selling both a call and put at the same strike', 'Buying calls at different strikes'],
      correctIndex: 1,
      explanation: 'A long straddle is buying both a call AND a put at the same strike price and expiration.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'str-2',
      type: 'true_false',
      question: 'A straddle profits only if the stock goes up.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False. A straddle profits from a big move in EITHER direction. That\'s the whole point - you don\'t need to predict direction, just magnitude.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'str-3',
      type: 'scenario',
      question: 'You buy a $100 straddle for $10 total ($6 call + $4 put). What are your breakeven points?',
      options: ['$90 and $110', '$94 and $106', '$96 and $104', '$95 and $105'],
      correctIndex: 0,
      explanation: 'Breakevens are strike +/- total premium: $100 + $10 = $110 upside, $100 - $10 = $90 downside.',
      points: 15,
      difficulty: 2,
    },
    {
      id: 'str-4',
      type: 'multiple_choice',
      question: 'Straddles are most profitable when:',
      options: ['IV is high when you buy', 'The stock stays exactly at the strike', 'The stock makes a big move and IV rises', 'IV crushes after you buy'],
      correctIndex: 2,
      explanation: 'You want the stock to move more than expected AND ideally IV to stay elevated. IV crush is the enemy of long straddles.',
      points: 15,
      difficulty: 3,
    },
  ],

  // CHEETAH QUIZZES
  'cheetah-naked-put': [
    {
      id: 'np-1',
      type: 'multiple_choice',
      question: 'What is the maximum loss on a naked put?',
      options: ['The premium received', 'The strike price minus premium', 'Unlimited', 'Equal to the stock price'],
      correctIndex: 1,
      explanation: 'If the stock goes to $0, you must buy at the strike price. Max loss = strike - premium received. (Stock can\'t go below $0.)',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'np-2',
      type: 'true_false',
      question: 'Naked puts and cash-secured puts have identical risk profiles.',
      options: ['True', 'False'],
      correctIndex: 0,
      explanation: 'True - the risk is the same. The difference is capital requirements and margin. Naked puts use margin; CSPs are fully cash-covered.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'np-3',
      type: 'multiple_choice',
      question: 'Why are naked puts considered aggressive?',
      options: ['They always lose money', 'They require predicting direction', 'They use leverage and can have large losses', 'They expire worthless most of the time'],
      correctIndex: 2,
      explanation: 'Naked puts use margin (leverage). If the stock crashes, losses can far exceed the premium collected, potentially wiping out the account.',
      points: 15,
      difficulty: 3,
    },
  ],

  'cheetah-leaps': [
    {
      id: 'leaps-1',
      type: 'multiple_choice',
      question: 'LEAPS options have expirations of:',
      options: ['Less than 30 days', '30-90 days', '1-3 years', 'Indefinite'],
      correctIndex: 2,
      explanation: 'LEAPS (Long-term Equity Anticipation Securities) are options with expirations 1-3 years in the future.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'leaps-2',
      type: 'true_false',
      question: 'LEAPS have more time decay per day than short-term options.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False. LEAPS have LESS time decay per day. Theta accelerates as expiration approaches. Long-dated options decay slowly.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'leaps-3',
      type: 'multiple_choice',
      question: 'Deep ITM LEAPS calls are often used as:',
      options: ['A way to sell premium', 'A stock replacement strategy', 'A hedge against long stock', 'A way to short the market'],
      correctIndex: 1,
      explanation: 'Deep ITM LEAPS have high delta (nearly 1.0), moving almost dollar-for-dollar with the stock. They act like owning stock with less capital.',
      points: 15,
      difficulty: 2,
    },
  ],

  'cheetah-butterfly': [
    {
      id: 'bf-1',
      type: 'multiple_choice',
      question: 'A butterfly spread has maximum profit when:',
      options: ['The stock moves significantly up', 'The stock moves significantly down', 'The stock is exactly at the middle strike', 'Implied volatility increases'],
      correctIndex: 2,
      explanation: 'A butterfly profits most when the stock lands exactly at the middle strike at expiration. It\'s a precision strategy.',
      points: 10,
      difficulty: 1,
    },
    {
      id: 'bf-2',
      type: 'multiple_choice',
      question: 'A long call butterfly consists of:',
      options: ['Buy 1, sell 1, buy 1', 'Buy 1, sell 2, buy 1', 'Sell 1, buy 2, sell 1', 'Buy 2, sell 2'],
      correctIndex: 1,
      explanation: 'A butterfly: Buy 1 lower strike call, Sell 2 middle strike calls, Buy 1 higher strike call. The wings are bought, the body is sold.',
      points: 10,
      difficulty: 2,
    },
    {
      id: 'bf-3',
      type: 'scenario',
      question: 'A $95/$100/$105 butterfly costs $1.50 to enter. What is the max profit?',
      options: ['$1.50', '$3.50', '$5.00', '$6.50'],
      correctIndex: 1,
      explanation: 'Max profit = width of one wing - cost = $5 - $1.50 = $3.50 per share ($350 per contract).',
      points: 15,
      difficulty: 3,
    },
  ],
};

// Helper functions
export const getQuizForStrategy = (strategyId: string): JungleQuizQuestion[] | undefined => {
  return STRATEGY_QUIZZES[strategyId];
};

export const calculateRiskProfile = (answers: number[]): {
  primary: string;
  secondary: string;
  scores: Record<string, number>;
  confidence: number;
} => {
  // Initialize scores for all 16 animals
  const scores: Record<string, number> = {
    turtle: 0, owl: 0, cheetah: 0, fox: 0, retriever: 0, sloth: 0,
    badger: 0, monkey: 0, bull: 0, octopus: 0, bear: 0, dolphin: 0,
    chameleon: 0, wolf: 0, kangaroo: 0, panda: 0
  };

  // Map old scores to new animal groups by risk level
  // Conservative (1 star): turtle, sloth, panda
  // Moderate-Conservative (2 stars): retriever, badger, dolphin
  // Moderate (3 stars): owl, fox, bear, chameleon
  // Aggressive (4 stars): cheetah, monkey, bull, wolf
  // Very Aggressive (5 stars): octopus, kangaroo
  answers.forEach((answerIndex, questionIndex) => {
    const question = RISK_ASSESSMENT_QUESTIONS[questionIndex];
    if (question && question.options[answerIndex]) {
      const opt = question.options[answerIndex].scores;
      // Conservative animals (1 star)
      scores.turtle += opt.sloth;
      scores.sloth += opt.sloth;
      scores.panda += opt.sloth;
      // Moderate-Conservative animals (2 stars)
      scores.retriever += Math.round((opt.sloth + opt.badger) / 2);
      scores.badger += opt.badger;
      scores.dolphin += Math.round((opt.sloth + opt.badger) / 2);
      // Moderate animals (3 stars)
      scores.owl += opt.badger;
      scores.fox += opt.badger;
      scores.bear += opt.badger;
      scores.chameleon += opt.badger;
      // Aggressive animals (4 stars)
      scores.cheetah += opt.monkey;
      scores.monkey += opt.monkey;
      scores.bull += opt.monkey;
      scores.wolf += opt.monkey;
      // Very aggressive (5 stars)
      scores.octopus += opt.cheetah;
      scores.kangaroo += opt.cheetah;
    }
  });

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sortedScores[0][0];
  const secondary = sortedScores[1][0];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 ? sortedScores[0][1] / totalScore : 0.25;

  return { primary, secondary, scores, confidence };
};
