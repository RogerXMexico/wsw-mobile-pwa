import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PositionSizer() {
  const navigate = useNavigate();

  const [accountSize, setAccountSize] = useState(25000);
  const [riskPct, setRiskPct] = useState(2);
  const [maxLossPerContract, setMaxLossPerContract] = useState(200);

  const result = useMemo(() => {
    if (accountSize <= 0 || riskPct <= 0 || maxLossPerContract <= 0)
      return null;

    const dollarRisk = accountSize * (riskPct / 100);
    const maxContracts = Math.floor(dollarRisk / maxLossPerContract);
    const totalRisk = maxContracts * maxLossPerContract;
    const totalRiskPct = (totalRisk / accountSize) * 100;

    return { dollarRisk, maxContracts, totalRisk, totalRiskPct };
  }, [accountSize, riskPct, maxLossPerContract]);

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
          <h1 className="text-xl font-bold text-white">📐 Position Sizer</h1>
          <p className="text-zinc-500 text-xs">Risk-based position sizing</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Results */}
        {result && (
          <>
            {/* Big Number Card */}
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-6 text-center">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                Recommended Contracts
              </p>
              <p
                className="text-6xl font-black text-[#39ff14]"
                style={{ textShadow: '0 0 20px #39ff1444' }}
              >
                {result.maxContracts}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
                <p className="text-zinc-500 text-xs mb-1">Dollar Risk Budget</p>
                <p className="text-[#39ff14] text-lg font-bold">
                  ${result.dollarRisk.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
                <p className="text-zinc-500 text-xs mb-1">Total Risk</p>
                <p className="text-[#39ff14] text-lg font-bold">
                  ${result.totalRisk.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 col-span-2">
                <p className="text-zinc-500 text-xs mb-1">% of Account at Risk</p>
                <div className="flex items-end gap-3">
                  <p className="text-white text-lg font-bold">
                    {result.totalRiskPct.toFixed(1)}%
                  </p>
                  <div className="flex-1 h-3 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(result.totalRiskPct, 100)}%`,
                        backgroundColor:
                          result.totalRiskPct <= 2
                            ? '#39ff14'
                            : result.totalRiskPct <= 5
                            ? '#facc15'
                            : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Account Size */}
        <SizerSlider
          label="Account Size"
          value={accountSize}
          onChange={setAccountSize}
          min={1000}
          max={500000}
          step={1000}
          prefix="$"
          format={(v) => v.toLocaleString()}
        />

        {/* Risk Per Trade % */}
        <SizerSlider
          label="Risk Per Trade"
          value={riskPct}
          onChange={setRiskPct}
          min={0.5}
          max={10}
          step={0.5}
          suffix="%"
        />

        {/* Max Loss Per Contract */}
        <SizerSlider
          label="Max Loss / Contract"
          value={maxLossPerContract}
          onChange={setMaxLossPerContract}
          min={10}
          max={5000}
          step={10}
          prefix="$"
          format={(v) => v.toLocaleString()}
        />

        {/* Risk Warning */}
        {riskPct > 3 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400 text-sm font-medium">
              ⚠️ Risking &gt;3% per trade significantly increases risk of ruin.
              Pros typically risk 1–2%.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function SizerSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  format?: (v: number) => string;
}) {
  const display = format ? format(value) : String(value);

  return (
    <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-500 text-xs uppercase tracking-wider">
          {label}
        </span>
        <span className="text-white font-mono font-bold text-sm">
          {prefix}
          {display}
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
        className="w-full h-2 rounded-full appearance-none cursor-pointer sizer-slider"
      />
      <style>{`
        .sizer-slider::-webkit-slider-track {
          background: #1a1a1a;
          border-radius: 9999px;
          height: 8px;
        }
        .sizer-slider::-webkit-slider-thumb {
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
        .sizer-slider::-moz-range-track {
          background: #1a1a1a;
          border-radius: 9999px;
          height: 8px;
        }
        .sizer-slider::-moz-range-thumb {
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
