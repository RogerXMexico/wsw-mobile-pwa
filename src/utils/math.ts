// Standard Normal cumulative distribution function
function cumulativeDistribution(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) prob = 1 - prob;
  return prob;
}

// Black-Scholes Pricing Model
// type: 'call' | 'put'
// S: Stock Price
// K: Strike Price
// T: Time to expiration in years
// r: Risk-free interest rate (decimal, e.g., 0.05)
// v: Volatility (decimal, e.g., 0.30)
export function blackScholes(type: 'call' | 'put' | 'stock', S: number, K: number, T: number, r: number, v: number): number {
  if (type === 'stock') return S;

  // Intrinsic value logic for expired options (T <= 0)
  if (T <= 0) {
    if (type === 'call') return Math.max(0, S - K);
    else return Math.max(0, K - S);
  }

  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
  const d2 = d1 - v * Math.sqrt(T);

  if (type === 'call') {
    return S * cumulativeDistribution(d1) - K * Math.exp(-r * T) * cumulativeDistribution(d2);
  } else {
    return K * Math.exp(-r * T) * cumulativeDistribution(-d2) - S * cumulativeDistribution(-d1);
  }
}

// Greeks calculation
export interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

// Calculate Delta (rate of change of option price with respect to stock price)
export function calculateDelta(type: 'call' | 'put', S: number, K: number, T: number, r: number, v: number): number {
  if (T <= 0 || v <= 0 || S <= 0 || K <= 0) return 0;

  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));

  if (!isFinite(d1)) return 0;

  if (type === 'call') {
    return cumulativeDistribution(d1);
  } else {
    return cumulativeDistribution(d1) - 1;
  }
}

// Calculate Gamma (rate of change of delta with respect to stock price)
export function calculateGamma(S: number, K: number, T: number, r: number, v: number): number {
  if (T <= 0 || v <= 0 || S <= 0 || K <= 0) return 0;

  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));

  if (!isFinite(d1)) return 0;

  const nPrimeD1 = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-d1 * d1 / 2);
  const gamma = nPrimeD1 / (S * v * Math.sqrt(T));

  return isFinite(gamma) ? gamma : 0;
}

// Calculate Theta (rate of change of option price with respect to time)
// Returns theta per day (divide annual by 365)
export function calculateTheta(type: 'call' | 'put', S: number, K: number, T: number, r: number, v: number): number {
  if (T <= 0 || v <= 0 || S <= 0 || K <= 0) return 0;

  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
  const d2 = d1 - v * Math.sqrt(T);

  if (!isFinite(d1) || !isFinite(d2)) return 0;

  const nPrimeD1 = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-d1 * d1 / 2);

  if (type === 'call') {
    const theta = (-S * nPrimeD1 * v / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * cumulativeDistribution(d2)) / 365;
    return isFinite(theta) ? theta : 0;
  } else {
    const theta = (-S * nPrimeD1 * v / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * cumulativeDistribution(-d2)) / 365;
    return isFinite(theta) ? theta : 0;
  }
}

// Calculate Vega (rate of change of option price with respect to volatility)
// Returns vega for 1% change in IV (divide by 100)
export function calculateVega(S: number, K: number, T: number, r: number, v: number): number {
  if (T <= 0 || v <= 0 || S <= 0 || K <= 0) return 0;

  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));

  if (!isFinite(d1)) return 0;

  const nPrimeD1 = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-d1 * d1 / 2);
  const vega = (S * nPrimeD1 * Math.sqrt(T)) / 100;

  return isFinite(vega) ? vega : 0;
}

// Calculate all Greeks at once
export function calculateGreeks(type: 'call' | 'put', S: number, K: number, T: number, r: number, v: number): Greeks {
  return {
    delta: calculateDelta(type, S, K, T, r, v),
    gamma: calculateGamma(S, K, T, r, v),
    theta: calculateTheta(type, S, K, T, r, v),
    vega: calculateVega(S, K, T, r, v)
  };
}
