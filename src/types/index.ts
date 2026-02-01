export type StrategyTier = 0 | 0.5 | 1 | 2 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export enum Outlook {
  BULLISH = "Bullish",
  BEARISH = "Bearish",
  NEUTRAL = "Neutral",
  VOLATILE = "Volatile",
  EDUCATIONAL = "Educational",
  RANGE = "Range",
  EXPLOSIVE = "Explosive"
}

export interface OptionLeg {
  type: 'call' | 'put' | 'stock';
  action: 'buy' | 'sell';
  strikeOffset?: number; // relative to stock price 100. e.g. 10 = 110 strike
  quantity: number;
  expirationOffset?: number; // Days offset from standard expiration (for diagonals/calendars)
}

export interface Strategy {
  id: string;
  name: string;
  tier: StrategyTier;
  tierName: string;
  subCategory?: string; // Sub-category within a tier (e.g., "Precision Income", "Leveraged Directional", "Exotic Volatility")
  description?: string; // Optional legacy field
  outlook: string; // Changed to string to support loose types like "Mild Bull"
  objective: string;
  risk: string;
  legs: OptionLeg[];
  analysis: string; // HTML allowed
  analogy: string;
  nuance: string; // HTML allowed
  example: string; // HTML allowed
  bestUsedWhen?: string; // Optional legacy
  hideSimulator?: boolean; // Hide the Live Simulator panel
  hideAnalyst?: boolean; // Hide the Gemini Analyst panel
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}
