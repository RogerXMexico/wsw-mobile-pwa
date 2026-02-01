import { Strategy, OptionLeg } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Area, AreaChart } from 'recharts';

interface PayoffChartProps {
  strategy: Strategy;
  stockPrice?: number;
}

function calculateLegPayoff(leg: OptionLeg, stockPrice: number, currentPrice: number): number {
  const strike = currentPrice + (leg.strikeOffset || 0);
  const multiplier = leg.action === 'buy' ? 1 : -1;
  const qty = leg.quantity;

  if (leg.type === 'stock') {
    return (stockPrice - currentPrice) * multiplier * qty;
  }

  if (leg.type === 'call') {
    const intrinsic = Math.max(0, stockPrice - strike);
    return intrinsic * multiplier * qty;
  }

  if (leg.type === 'put') {
    const intrinsic = Math.max(0, strike - stockPrice);
    return intrinsic * multiplier * qty;
  }

  return 0;
}

function estimatePremium(leg: OptionLeg): number {
  const offset = Math.abs(leg.strikeOffset || 0);
  // Rough heuristic for chart display
  if (leg.type === 'stock') return 0;
  const basePremium = Math.max(2, 8 - offset * 0.15);
  return basePremium;
}

export default function PayoffChart({ strategy, stockPrice = 100 }: PayoffChartProps) {
  if (!strategy.legs || strategy.legs.length === 0) return null;

  // Calculate net premium
  let netPremium = 0;
  strategy.legs.forEach(leg => {
    const premium = estimatePremium(leg);
    if (leg.action === 'buy') netPremium -= premium * leg.quantity;
    else netPremium += premium * leg.quantity;
  });

  // Generate data points
  const range = 40;
  const data = [];
  for (let price = stockPrice - range; price <= stockPrice + range; price += 1) {
    let totalPayoff = netPremium;
    strategy.legs.forEach(leg => {
      totalPayoff += calculateLegPayoff(leg, price, stockPrice);
    });
    data.push({
      price,
      payoff: Math.round(totalPayoff * 100) / 100,
    });
  }

  const maxPayoff = Math.max(...data.map(d => d.payoff));
  const minPayoff = Math.min(...data.map(d => d.payoff));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <h3 className="text-sm font-medium text-slate-300 mb-3">Payoff at Expiration</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
          <defs>
            <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="price"
            tick={{ fontSize: 10, fill: '#64748b' }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#64748b' }}
            tickLine={false}
            axisLine={false}
            domain={[Math.min(minPayoff * 1.2, -5), Math.max(maxPayoff * 1.2, 5)]}
          />
          <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
          <ReferenceLine x={stockPrice} stroke="#475569" strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '12px',
              fontSize: '12px',
            }}
            labelFormatter={(v) => `Stock: $${v}`}
            formatter={(v: number) => [`$${v.toFixed(2)}`, 'P&L']}
          />
          <Area
            type="monotone"
            dataKey="payoff"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#profitGrad)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-between mt-2 text-[10px] text-slate-500">
        <span>Max Loss: ${Math.abs(minPayoff).toFixed(0)}</span>
        <span>Max Profit: {maxPayoff > 900 ? '∞' : `$${maxPayoff.toFixed(0)}`}</span>
      </div>
    </div>
  );
}
