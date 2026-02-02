import { Strategy, OptionLeg } from '../types';

interface PayoffThumbProps {
  strategy: Strategy;
  width?: number;
  height?: number;
}

function calculateLegPayoff(leg: OptionLeg, stockPrice: number, currentPrice: number): number {
  const strike = currentPrice + (leg.strikeOffset || 0);
  const multiplier = leg.action === 'buy' ? 1 : -1;
  const qty = leg.quantity;

  if (leg.type === 'stock') return (stockPrice - currentPrice) * multiplier * qty;
  if (leg.type === 'call') return Math.max(0, stockPrice - strike) * multiplier * qty;
  if (leg.type === 'put') return Math.max(0, strike - stockPrice) * multiplier * qty;
  return 0;
}

function estimatePremium(leg: OptionLeg): number {
  if (leg.type === 'stock') return 0;
  const offset = Math.abs(leg.strikeOffset || 0);
  return Math.max(2, 8 - offset * 0.15);
}

export default function PayoffThumb({ strategy, width = 80, height = 40 }: PayoffThumbProps) {
  if (!strategy.legs || strategy.legs.length === 0) return null;

  const stockPrice = 100;
  const range = 40;
  const steps = 40;
  const stepSize = (range * 2) / steps;

  // Calculate net premium
  let netPremium = 0;
  strategy.legs.forEach(leg => {
    const premium = estimatePremium(leg);
    if (leg.action === 'buy') netPremium -= premium * leg.quantity;
    else netPremium += premium * leg.quantity;
  });

  // Generate payoff values
  const payoffs: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const price = stockPrice - range + i * stepSize;
    let totalPayoff = netPremium;
    strategy.legs.forEach(leg => {
      totalPayoff += calculateLegPayoff(leg, price, stockPrice);
    });
    payoffs.push(totalPayoff);
  }

  const maxVal = Math.max(...payoffs);
  const minVal = Math.min(...payoffs);
  const valRange = maxVal - minVal || 1;

  // Padding
  const padX = 2;
  const padY = 4;
  const drawW = width - padX * 2;
  const drawH = height - padY * 2;

  // Map to SVG coordinates
  const points = payoffs.map((val, i) => {
    const x = padX + (i / steps) * drawW;
    const y = padY + drawH - ((val - minVal) / valRange) * drawH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  // Zero line y
  const zeroY = padY + drawH - ((0 - minVal) / valRange) * drawH;

  // Build fill polygon (area under curve, split by profit/loss)
  const fillPoints = [
    `${padX},${zeroY.toFixed(1)}`,
    ...points,
    `${(padX + drawW).toFixed(1)},${zeroY.toFixed(1)}`,
  ].join(' ');

  // Determine if mostly profit or loss for color
  const profitArea = payoffs.filter(v => v > 0).length;
  const isNetProfit = profitArea > payoffs.length / 2;

  const lineColor = '#39ff14'; // neon green
  const fillColor = isNetProfit ? 'rgba(57,255,20,0.12)' : 'rgba(239,68,68,0.10)';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="flex-shrink-0"
    >
      {/* Zero line */}
      <line
        x1={padX}
        y1={zeroY}
        x2={padX + drawW}
        y2={zeroY}
        stroke="#334155"
        strokeWidth="0.5"
        strokeDasharray="2,2"
      />
      {/* Fill area */}
      <polygon
        points={fillPoints}
        fill={fillColor}
      />
      {/* Payoff line */}
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
