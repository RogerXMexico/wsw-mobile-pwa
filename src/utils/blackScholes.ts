// Standard Normal cumulative distribution function
export function cumulativeDistribution(x: number): number {
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
