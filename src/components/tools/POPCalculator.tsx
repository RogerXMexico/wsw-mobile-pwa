import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Loader2, Wifi } from 'lucide-react';
import { cumulativeDistribution } from '../../utils/blackScholes';
import { useLiveData } from '../../hooks/useLiveData';

type OptionType = 'call' | 'put';
type PositionType = 'buy' | 'sell';

export default function POPCalculator() {
  const navigate = useNavigate();
  const { fetchData, loading, liveSymbol, hasKey } = useLiveData();
  const [symbol, setSymbol] = useState('');

  const [stockPrice, setStockPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(105);
  const [dte, setDte] = useState(30);
  const [iv, setIv] = useState(30);
  const [optionType, setOptionType] = useState<OptionType>('call');
  const [position, setPosition] = useState<PositionType>('buy');

  const handleFetch = async () => {
    const data = await fetchData(symbol, optionType);
    if (data) {
      setStockPrice(data.stockPrice);
      setStrikePrice(data.strike);
      setIv(data.iv);
      setDte(data.dte);
    }
  };

  const result = useMemo(() => {
    if (stockPrice <= 0 || iv <= 0 || dte <= 0) return null;

    const sigma = stockPrice * (iv / 100) * Math.sqrt(dte / 365);
    const expectedMove = sigma;

    if (sigma === 0) return null;

    const z = (strikePrice - stockPrice) / sigma;

    let pop: number;
    if (optionType === 'call' && position === 'buy') {
      // Long Call: profit when stock > strike, POP = P(S > K)
      pop = 1 - cumulativeDistribution(z);
    } else if (optionType === 'call' && position === 'sell') {
      // Short Call: profit when stock < strike, POP = P(S < K)
      pop = cumulativeDistribution(z);
    } else if (optionType === 'put' && position === 'buy') {
      // Long Put: profit when stock < strike, POP = P(S < K)
      pop = cumulativeDistribution(z);
    } else {
      // Short Put: profit when stock > strike, POP = P(S > K)
      pop = 1 - cumulativeDistribution(z);
    }

    const breakeven = optionType === 'call' ? strikePrice : strikePrice;
    const upperBound = stockPrice + expectedMove;
    const lowerBound = stockPrice - expectedMove;

    return {
      pop: Math.max(0, Math.min(1, pop)),
      breakeven,
      expectedMove,
      upperBound,
      lowerBound,
    };
  }, [stockPrice, strikePrice, dte, iv, optionType, position]);

  const popPct = result ? Math.round(result.pop * 100) : 0;

  // SVG circular gauge
  const gaugeSize = 180;
  const gaugeStroke = 12;
  const gaugeRadius = (gaugeSize - gaugeStroke) / 2;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeOffset = gaugeCircumference - (popPct / 100) * gaugeCircumference;

  const popColor =
    popPct >= 70 ? '#39ff14' : popPct >= 50 ? '#facc15' : '#ef4444';

  return (
    <div className="min-h-screen bg-black pb-28">
      {/* Header */}
      <div
        className="px-4 flex items-center gap-3 mb-4"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}
      >
        <button
          onClick={() => navigate('/tools')}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-[#39ff14]/20 active:scale-[0.95] transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">🎲 POP Calculator</h1>
          <p className="text-zinc-500 text-xs">Probability of Profit</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Live Data Search */}
        {hasKey && (
          <div className="flex gap-2">
            <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              placeholder="Symbol (e.g. AAPL)" className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-mono text-sm placeholder-zinc-600 focus:border-cyan-500/50 focus:outline-none" />
            <button onClick={handleFetch} disabled={loading} className="px-4 py-2.5 bg-cyan-600 disabled:bg-zinc-800 text-white rounded-xl text-sm font-bold active:scale-[0.98] flex items-center gap-1.5">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
        )}
        {liveSymbol && <div className="flex items-center gap-1.5 text-[10px] text-emerald-400"><Wifi className="w-3 h-3" /> Live: {liveSymbol}</div>}

        {/* Circular Gauge */}
        {result && (
          <div className="flex flex-col items-center py-4">
            <div className="relative" style={{ width: gaugeSize, height: gaugeSize }}>
              <svg width={gaugeSize} height={gaugeSize} className="-rotate-90">
                <circle
                  cx={gaugeSize / 2}
                  cy={gaugeSize / 2}
                  r={gaugeRadius}
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={gaugeStroke}
                />
                <circle
                  cx={gaugeSize / 2}
                  cy={gaugeSize / 2}
                  r={gaugeRadius}
                  fill="none"
                  stroke={popColor}
                  strokeWidth={gaugeStroke}
                  strokeDasharray={gaugeCircumference}
                  strokeDashoffset={gaugeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  style={{ filter: `drop-shadow(0 0 8px ${popColor}66)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-4xl font-black"
                  style={{ color: popColor }}
                >
                  {popPct}%
                </span>
                <span className="text-zinc-500 text-xs mt-1">POP</span>
              </div>
            </div>
          </div>
        )}

        {/* Results Cards */}
        {result && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">Breakeven</p>
              <p className="text-[#39ff14] text-lg font-bold">
                ${result.breakeven.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">Expected Move</p>
              <p className="text-[#39ff14] text-lg font-bold">
                ±${result.expectedMove.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">Move Range Low</p>
              <p className="text-zinc-300 text-lg font-bold">
                ${result.lowerBound.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">Move Range High</p>
              <p className="text-zinc-300 text-lg font-bold">
                ${result.upperBound.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Option Type Toggle */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
          <p className="text-zinc-500 text-xs mb-3 uppercase tracking-wider">
            Option Type
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(['call', 'put'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOptionType(t)}
                className={`py-3 rounded-lg text-sm font-bold uppercase active:scale-[0.98] transition-all ${
                  optionType === t
                    ? 'bg-[#39ff14]/20 border border-[#39ff14]/50 text-[#39ff14]'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Position Toggle */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
          <p className="text-zinc-500 text-xs mb-3 uppercase tracking-wider">
            Position
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(['buy', 'sell'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPosition(p)}
                className={`py-3 rounded-lg text-sm font-bold uppercase active:scale-[0.98] transition-all ${
                  position === p
                    ? 'bg-[#39ff14]/20 border border-[#39ff14]/50 text-[#39ff14]'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                }`}
              >
                {p === 'buy' ? 'Buy (Long)' : 'Sell (Short)'}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Price */}
        <SliderInput
          label="Stock Price"
          value={stockPrice}
          onChange={setStockPrice}
          min={1}
          max={500}
          step={1}
          prefix="$"
        />

        {/* Strike Price */}
        <SliderInput
          label="Strike Price"
          value={strikePrice}
          onChange={setStrikePrice}
          min={1}
          max={500}
          step={1}
          prefix="$"
        />

        {/* Days to Expiry */}
        <SliderInput
          label="Days to Expiry"
          value={dte}
          onChange={setDte}
          min={1}
          max={365}
          step={1}
        />

        {/* Implied Volatility */}
        <SliderInput
          label="Implied Volatility"
          value={iv}
          onChange={setIv}
          min={1}
          max={200}
          step={1}
          suffix="%"
        />
      </div>
    </div>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">
          {label}
        </span>
        <span className="text-white font-mono font-bold text-sm">
          {prefix}
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full sim-slider"
      />
    </div>
  );
}
