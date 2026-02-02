import { useMemo, useEffect } from 'react';
import { Strategy, OptionLeg } from '../types';
import { blackScholes } from '../utils/blackScholes';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
} from 'recharts';

interface PayoffChartProps {
  strategy: Strategy;
  stockPrice: number;
  volatility: number;
  daysToExpiry: number;
  onPnLCalculated?: (pnl: number, entryValue: number, currentValue: number) => void;
}

// Entry conditions: fixed at inception
const ENTRY_PRICE = 100;
const ENTRY_VOL = 0.30;
const ENTRY_DAYS = 45;
const RISK_FREE_RATE = 0.05;

function computePositionValue(
  legs: OptionLeg[],
  price: number,
  daysToExpiry: number,
  volatility: number,
): number {
  let value = 0;
  legs.forEach((leg) => {
    const strike = ENTRY_PRICE + (leg.strikeOffset || 0);
    const quantity = leg.quantity || 1;
    const multiplier = leg.action === 'buy' ? 1 : -1;

    let val: number;
    if (daysToExpiry <= 0) {
      // At expiration: intrinsic only
      if (leg.type === 'call') val = Math.max(0, price - strike);
      else if (leg.type === 'put') val = Math.max(0, strike - price);
      else if (leg.type === 'stock') val = price;
      else val = 0;
    } else {
      val = blackScholes(
        leg.type,
        price,
        strike,
        daysToExpiry / 365,
        RISK_FREE_RATE,
        volatility,
      );
    }

    value += val * multiplier * quantity;
  });
  return value;
}

export default function PayoffChart({
  strategy,
  stockPrice,
  volatility,
  daysToExpiry,
  onPnLCalculated,
}: PayoffChartProps) {
  if (!strategy.legs || strategy.legs.length === 0) return null;

  const { chartData, entryCost } = useMemo(() => {
    // 1. Entry cost at inception
    const entry = computePositionValue(
      strategy.legs,
      ENTRY_PRICE,
      ENTRY_DAYS,
      ENTRY_VOL,
    );

    // 2. Generate chart data across price range
    const range = 40;
    const minPrice = ENTRY_PRICE - range;
    const maxPrice = ENTRY_PRICE + range;
    const step = 1;
    const points: Array<{
      price: number;
      currentPnL: number;
      expirationPnL: number;
    }> = [];

    for (let p = minPrice; p <= maxPrice; p += step) {
      // Current theoretical P&L (with time + vol)
      const currentVal = computePositionValue(
        strategy.legs,
        p,
        daysToExpiry,
        volatility,
      );
      const currentPnL = (currentVal - entry) * 100;

      // Expiration payoff (intrinsic only)
      const expirationVal = computePositionValue(strategy.legs, p, 0, ENTRY_VOL);
      const expirationPnL = (expirationVal - entry) * 100;

      points.push({
        price: p,
        currentPnL: Math.round(currentPnL * 100) / 100,
        expirationPnL: Math.round(expirationPnL * 100) / 100,
      });
    }

    return { chartData: points, entryCost: entry };
  }, [strategy.legs, stockPrice, volatility, daysToExpiry]);

  // Notify parent of P&L at current simulated price
  useEffect(() => {
    if (onPnLCalculated) {
      const currentVal = computePositionValue(
        strategy.legs,
        stockPrice,
        daysToExpiry,
        volatility,
      );
      const pnl = (currentVal - entryCost) * 100;
      onPnLCalculated(pnl, entryCost * 100, currentVal * 100);
    }
  }, [strategy.legs, stockPrice, daysToExpiry, volatility, entryCost, onPnLCalculated]);

  // Gradient offset for green/red split
  const gradientOffset = useMemo(() => {
    const maxPnL = Math.max(...chartData.map((d) => d.currentPnL));
    const minPnL = Math.min(...chartData.map((d) => d.currentPnL));
    if (maxPnL <= 0) return 0;
    if (minPnL >= 0) return 1;
    return maxPnL / (maxPnL - minPnL);
  }, [chartData]);

  const maxPnL = Math.max(...chartData.map((d) => d.currentPnL));
  const minPnL = Math.min(...chartData.map((d) => d.currentPnL));
  const yMin = Math.min(minPnL * 1.2, -5);
  const yMax = Math.max(maxPnL * 1.2, 5);

  return (
    <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 relative">
      {/* Entry conditions label — top-left */}
      <div className="absolute top-3 left-4 z-10 text-[9px] font-mono text-zinc-500 leading-tight">
        <div className="text-zinc-400 font-bold mb-0.5">ENTRY</div>
        <div>S: <span className="text-zinc-300">$100</span></div>
        <div>IV: <span className="text-zinc-300">30%</span></div>
        <div>DTE: <span className="text-zinc-300">45</span></div>
      </div>

      {/* Current simulation label — top-right */}
      <div className="absolute top-3 right-4 z-10 text-[9px] font-mono text-zinc-500 leading-tight text-right">
        <div className="text-[#39ff14] font-bold mb-0.5">SIMULATION</div>
        <div>S: <span className="text-amber-300">${stockPrice}</span></div>
        <div>IV: <span className="text-purple-300">{(volatility * 100).toFixed(0)}%</span></div>
        <div>DTE: <span className="text-cyan-300">{daysToExpiry}d</span></div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart
          data={chartData}
          margin={{ top: 45, right: 5, bottom: 5, left: -15 }}
        >
          <defs>
            {/* Green-red gradient for fill */}
            <linearGradient id="pnlFillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset={0} stopColor="#39ff14" stopOpacity={0.25} />
              <stop offset={gradientOffset} stopColor="#39ff14" stopOpacity={0.05} />
              <stop offset={gradientOffset} stopColor="#f43f5e" stopOpacity={0.05} />
              <stop offset={1} stopColor="#f43f5e" stopOpacity={0.25} />
            </linearGradient>
            {/* Stroke gradient: green above 0, red below */}
            <linearGradient id="pnlStrokeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset={gradientOffset} stopColor="#39ff14" stopOpacity={1} />
              <stop offset={gradientOffset} stopColor="#f43f5e" stopOpacity={1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="price"
            tick={{ fontSize: 10, fill: '#52525b' }}
            tickLine={false}
            axisLine={{ stroke: '#1a1a1a' }}
            type="number"
            domain={['dataMin', 'dataMax']}
            tickCount={7}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#52525b' }}
            tickLine={false}
            axisLine={false}
            domain={[yMin, yMax]}
          />

          {/* Zero line */}
          <ReferenceLine y={0} stroke="#3f3f46" strokeDasharray="3 3" />

          {/* Entry price marker */}
          <ReferenceLine
            x={ENTRY_PRICE}
            stroke="#71717a"
            strokeDasharray="2 2"
            label={{
              value: 'ENTRY',
              position: 'insideTopLeft',
              fill: '#71717a',
              fontSize: 9,
            }}
          />

          {/* Current simulated price marker */}
          {stockPrice !== ENTRY_PRICE && (
            <ReferenceLine
              x={stockPrice}
              stroke="#fbbf24"
              strokeWidth={2}
              strokeDasharray="4 4"
              label={{
                value: 'NOW',
                position: 'insideTopRight',
                fill: '#fbbf24',
                fontSize: 9,
              }}
            />
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: '#000000',
              border: '1px solid #27272a',
              borderRadius: '10px',
              fontSize: '11px',
              padding: '6px 10px',
            }}
            labelFormatter={(v) => `Stock: $${v}`}
            formatter={(value: number, name: string) => [
              `$${value.toFixed(2)}`,
              name === 'currentPnL' ? 'Current P&L' : 'At Expiry',
            ]}
          />

          {/* Expiration payoff — dotted line */}
          <Line
            type="monotone"
            dataKey="expirationPnL"
            stroke="#52525b"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            dot={false}
            activeDot={false}
          />

          {/* Current theoretical P&L — solid area + line */}
          <Area
            type="monotone"
            dataKey="currentPnL"
            stroke="url(#pnlStrokeGrad)"
            strokeWidth={2.5}
            fill="url(#pnlFillGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#fbbf24', stroke: '#000' }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-1 text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-[2px] bg-[#39ff14] rounded" /> Current
        </span>
        <span className="flex items-center gap-1">
          <span
            className="inline-block w-4 h-[1.5px] rounded"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, #52525b 0, #52525b 3px, transparent 3px, transparent 6px)',
            }}
          />{' '}
          At Expiry
        </span>
      </div>
    </div>
  );
}
