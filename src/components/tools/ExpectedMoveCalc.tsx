import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ExpectedMoveCalc() {
  const navigate = useNavigate();

  const [stockPrice, setStockPrice] = useState(100);
  const [iv, setIv] = useState(30);
  const [dte, setDte] = useState(30);

  const result = useMemo(() => {
    if (stockPrice <= 0 || iv <= 0 || dte <= 0) return null;

    const oneSd = stockPrice * (iv / 100) * Math.sqrt(dte / 365);
    const twoSd = 2 * oneSd;

    return {
      oneSd,
      twoSd,
      upper1: stockPrice + oneSd,
      lower1: stockPrice - oneSd,
      upper2: stockPrice + twoSd,
      lower2: stockPrice - twoSd,
    };
  }, [stockPrice, iv, dte]);

  // Range bar calculations
  const barMin = result ? result.lower2 - (result.twoSd * 0.15) : 0;
  const barMax = result ? result.upper2 + (result.twoSd * 0.15) : 1;
  const barRange = barMax - barMin;
  const pctOf = (v: number) => ((v - barMin) / barRange) * 100;

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
          <h1 className="text-xl font-bold text-white">📏 Expected Move</h1>
          <p className="text-zinc-500 text-xs">Standard deviation ranges</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Big Expected Move */}
        {result && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-6 text-center">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
              1 SD Expected Move ({dte}d)
            </p>
            <p
              className="text-4xl font-black text-[#39ff14]"
              style={{ textShadow: '0 0 20px #39ff1444' }}
            >
              ±${result.oneSd.toFixed(2)}
            </p>
            <p className="text-zinc-400 text-sm mt-1">
              {((result.oneSd / stockPrice) * 100).toFixed(1)}% of stock price
            </p>
          </div>
        )}

        {/* Visual Range Bar */}
        {result && (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4">
              Price Range Visualization
            </p>

            {/* Range bar */}
            <div className="relative h-16 mb-2">
              {/* 2 SD band (95%) */}
              <div
                className="absolute top-0 h-full rounded-lg bg-purple-500/15 border border-purple-500/30"
                style={{
                  left: `${pctOf(result.lower2)}%`,
                  width: `${pctOf(result.upper2) - pctOf(result.lower2)}%`,
                }}
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-purple-400 font-mono whitespace-nowrap">
                  95% (2σ)
                </span>
              </div>

              {/* 1 SD band (68%) */}
              <div
                className="absolute top-2 bottom-2 rounded-md bg-[#39ff14]/10 border border-[#39ff14]/30"
                style={{
                  left: `${pctOf(result.lower1)}%`,
                  width: `${pctOf(result.upper1) - pctOf(result.lower1)}%`,
                }}
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#39ff14] font-mono whitespace-nowrap">
                  68% (1σ)
                </span>
              </div>

              {/* Current price marker */}
              <div
                className="absolute top-0 h-full w-0.5 bg-white"
                style={{ left: `${pctOf(stockPrice)}%` }}
              />
            </div>

            {/* Labels */}
            <div className="relative h-8 text-[10px] font-mono">
              <span
                className="absolute -translate-x-1/2 text-purple-400"
                style={{ left: `${pctOf(result.lower2)}%` }}
              >
                ${result.lower2.toFixed(0)}
              </span>
              <span
                className="absolute -translate-x-1/2 text-[#39ff14]"
                style={{ left: `${pctOf(result.lower1)}%` }}
              >
                ${result.lower1.toFixed(0)}
              </span>
              <span
                className="absolute -translate-x-1/2 text-white font-bold"
                style={{ left: `${pctOf(stockPrice)}%` }}
              >
                ${stockPrice}
              </span>
              <span
                className="absolute -translate-x-1/2 text-[#39ff14]"
                style={{ left: `${pctOf(result.upper1)}%` }}
              >
                ${result.upper1.toFixed(0)}
              </span>
              <span
                className="absolute -translate-x-1/2 text-purple-400"
                style={{ left: `${pctOf(result.upper2)}%` }}
              >
                ${result.upper2.toFixed(0)}
              </span>
            </div>
          </div>
        )}

        {/* SD Breakdown Cards */}
        {result && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">1σ Range (68%)</p>
              <p className="text-[#39ff14] text-sm font-bold">
                ${result.lower1.toFixed(2)} – ${result.upper1.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">2σ Range (95%)</p>
              <p className="text-purple-400 text-sm font-bold">
                ${result.lower2.toFixed(2)} – ${result.upper2.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">1σ Move ($)</p>
              <p className="text-[#39ff14] text-lg font-bold">
                ±${result.oneSd.toFixed(2)}
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-1">2σ Move ($)</p>
              <p className="text-purple-400 text-lg font-bold">
                ±${result.twoSd.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Stock Price */}
        <MoveSlider
          label="Stock Price"
          value={stockPrice}
          onChange={setStockPrice}
          min={1}
          max={500}
          step={1}
          prefix="$"
        />

        {/* IV */}
        <MoveSlider
          label="Implied Volatility"
          value={iv}
          onChange={setIv}
          min={1}
          max={200}
          step={1}
          suffix="%"
        />

        {/* DTE */}
        <MoveSlider
          label="Days to Expiry"
          value={dte}
          onChange={setDte}
          min={1}
          max={365}
          step={1}
        />
      </div>
    </div>
  );
}

function MoveSlider({
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
        className="w-full h-2 rounded-full appearance-none cursor-pointer move-slider"
      />
      <style>{`
        .move-slider::-webkit-slider-track {
          background: #1a1a1a;
          border-radius: 9999px;
          height: 8px;
        }
        .move-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #39ff14;
          box-shadow: 0 0 10px #39ff1466;
          cursor: pointer;
          margin-top: -8px;
        }
        .move-slider::-moz-range-track {
          background: #1a1a1a;
          border-radius: 9999px;
          height: 8px;
        }
        .move-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #39ff14;
          box-shadow: 0 0 10px #39ff1466;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
