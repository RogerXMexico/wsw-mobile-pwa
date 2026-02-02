import { useState, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blackScholes } from '../../utils/blackScholes';
import { calculateExpectedMove, probabilityAbovePrice, probabilityBelowPrice } from '../../utils/probabilityMath';

// ─── Types ────────────────────────────────────────────

type PutCall = 'call' | 'put';
type Rating = 'Good' | 'Caution' | 'No';

interface Inputs {
  symbol: string;
  currentPrice: number;
  putCall: PutCall;
  strike: number;
  optionPrice: number;
  iv: number;
  dte: number;
  riskFreeRate: number;
}

interface TargetStop {
  target: number;
  stop: number;
}

interface Tier2Ratings {
  pointOfControl: Rating;
  monthlyTrendUp: Rating;
  weeklyTrendUp: Rating;
  dailyMomentumUp: Rating;
  earningsNews: Rating;
}

// ─── Component ────────────────────────────────────────

export default function RiskRewardCalc() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<Inputs>({
    symbol: '',
    currentPrice: 50,
    putCall: 'call',
    strike: 52,
    optionPrice: 2.50,
    iv: 35,
    dte: 30,
    riskFreeRate: 4.50,
  });

  const [targetStop, setTargetStop] = useState<TargetStop>({
    target: 55,
    stop: 47,
  });

  const [tier2, setTier2] = useState<Tier2Ratings>({
    pointOfControl: 'Good',
    monthlyTrendUp: 'Good',
    weeklyTrendUp: 'Good',
    dailyMomentumUp: 'Good',
    earningsNews: 'No',
  });

  const [showTier2, setShowTier2] = useState(false);
  const [showProbability, setShowProbability] = useState(false);

  // ─── Core Calculations ─────────────────────────────

  const calcs = useMemo(() => {
    const { currentPrice, iv, dte, strike, optionPrice, putCall, riskFreeRate } = inputs;
    const T = dte / 365;
    const sigma = iv / 100;

    // 1 Standard Deviation move
    const sd1 = currentPrice * sigma * Math.sqrt(T);
    const sd1Up = currentPrice + sd1;
    const sd1Down = currentPrice - sd1;

    // 2 Standard Deviation move
    const sd2 = sd1 * 2;
    const sd2Up = currentPrice + sd2;
    const sd2Down = currentPrice - sd2;

    // % from current
    const sd1Pct = (sd1 / currentPrice) * 100;

    // Distance from strike
    const fromStrike = ((currentPrice - strike) / strike) * 100;

    // Black-Scholes projections at target and stop
    const optAtTarget = blackScholes(putCall, targetStop.target, strike, T, riskFreeRate / 100, sigma);
    const optAtStop = blackScholes(putCall, targetStop.stop, strike, T, riskFreeRate / 100, sigma);

    // Target analysis
    const targetDollar = targetStop.target - currentPrice;
    const targetPct = (targetDollar / currentPrice) * 100;
    const targetOptGL = optionPrice > 0 ? ((optAtTarget - optionPrice) / optionPrice) * 100 : 0;

    // Stop analysis
    const stopDollar = targetStop.stop - currentPrice;
    const stopPct = (stopDollar / currentPrice) * 100;
    const stopOptGL = optionPrice > 0 ? ((optAtStop - optionPrice) / optionPrice) * 100 : 0;

    // R-Ratio (absolute gain / absolute loss)
    const rRatio = stopOptGL !== 0 ? Math.abs(targetOptGL / stopOptGL) : 0;

    // Probability calculations
    const probAboveTarget = probabilityAbovePrice(currentPrice, targetStop.target, iv, dte);
    const probBelowStop = probabilityBelowPrice(currentPrice, targetStop.stop, iv, dte);
    const probInRange = 1 - probAboveTarget - probBelowStop;

    return {
      sd1, sd1Up, sd1Down, sd1Pct,
      sd2, sd2Up, sd2Down,
      fromStrike,
      optAtTarget, optAtStop,
      targetDollar, targetPct, targetOptGL,
      stopDollar, stopPct, stopOptGL,
      rRatio,
      probAboveTarget, probBelowStop, probInRange,
    };
  }, [inputs, targetStop]);

  // ─── Tier 1 Logic Checks ──────────────────────────

  const tier1 = useMemo(() => {
    const { sd1Up, sd1Down, rRatio, stopOptGL } = calcs;
    return {
      sd1AboveTarget: sd1Up > targetStop.target,
      targetAboveNegSD1: targetStop.target > sd1Down,
      rAbove2: rRatio > 2,
      stopLossUnder50: Math.abs(stopOptGL) < 50,
    };
  }, [calcs, targetStop]);

  const allTier1Pass = tier1.rAbove2 && tier1.stopLossUnder50;

  // ─── Tier 2 Scoring ───────────────────────────────

  const tier2Score = useMemo(() => {
    const ratings = Object.values(tier2);
    const goodCount = ratings.filter(r => r === 'Good').length;
    return Math.round((goodCount / ratings.length) * 100);
  }, [tier2]);

  // ─── Input helpers ─────────────────────────────────

  const updateInput = (key: keyof Inputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  // ─── Render ────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-95">
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
            </button>
            <Calculator className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg font-bold text-white">Risk/Reward Calculator</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Quote */}
        <p className="text-center text-xs italic text-zinc-500 px-6">
          "Risk is not the enemy. Ignorance of risk is."
        </p>

        {/* ═══ INPUT SECTION ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Input Data
          </h2>

          {/* Symbol + Put/Call row */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <NumberInput
              label="Symbol"
              value={inputs.symbol}
              onChangeText={(v) => updateInput('symbol', v.toUpperCase())}
              isText
              color="#39ff14"
            />
            <div>
              <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Put / Call</label>
              <div className="flex gap-1">
                {(['call', 'put'] as const).map((pc) => (
                  <button
                    key={pc}
                    onClick={() => updateInput('putCall', pc)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-[0.98] ${
                      inputs.putCall === pc
                        ? pc === 'call'
                          ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                          : 'bg-red-500/20 border border-red-500/50 text-red-400'
                        : 'bg-black border border-zinc-800 text-zinc-500'
                    }`}
                  >
                    {pc === 'call' ? '📈 Call' : '📉 Put'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price inputs grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <NumberInput label="Current Price" value={inputs.currentPrice} onChange={(v) => updateInput('currentPrice', v)} prefix="$" color="#22c55e" />
            <NumberInput label="Strike" value={inputs.strike} onChange={(v) => updateInput('strike', v)} prefix="$" color="#ffffff" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <NumberInput label="Option Price" value={inputs.optionPrice} onChange={(v) => updateInput('optionPrice', v)} prefix="$" color="#a855f7" />
            <NumberInput label="IV (%)" value={inputs.iv} onChange={(v) => updateInput('iv', v)} suffix="%" color="#06b6d4" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberInput label="DTE" value={inputs.dte} onChange={(v) => updateInput('dte', v)} color="#fbbf24" />
            <NumberInput label="Risk-Free Rate" value={inputs.riskFreeRate} onChange={(v) => updateInput('riskFreeRate', v)} suffix="%" color="#71717a" />
          </div>
        </div>

        {/* ═══ TARGET & STOP ═══ */}
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4">
          <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Target & Stop
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <NumberInput label="Target Price" value={targetStop.target} onChange={(v) => setTargetStop(p => ({ ...p, target: v }))} prefix="$" color="#22c55e" />
            <NumberInput label="Stop Price" value={targetStop.stop} onChange={(v) => setTargetStop(p => ({ ...p, stop: v }))} prefix="$" color="#ef4444" />
          </div>
        </div>

        {/* ═══ 1SD PROJECTIONS ═══ */}
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4">
          <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3">
            Standard Deviation Projections
          </h2>

          {/* 1SD Move - Big Display */}
          <div className="text-center mb-4 pb-4 border-b border-zinc-800">
            <p className="text-[10px] text-zinc-500 uppercase mb-1">1 Standard Deviation Move</p>
            <p className="text-3xl font-black text-[#39ff14]">${calcs.sd1.toFixed(2)}</p>
            <p className="text-xs text-zinc-400">±{calcs.sd1Pct.toFixed(1)}% from current</p>
          </div>

          {/* SD Range Table */}
          <div className="space-y-2">
            {/* Headers */}
            <div className="grid grid-cols-3 text-[10px] text-zinc-500 uppercase tracking-wider">
              <div />
              <div className="text-center text-emerald-400">Upside</div>
              <div className="text-center text-red-400">Downside</div>
            </div>

            {/* 1SD Row */}
            <div className="grid grid-cols-3 items-center py-2 border-b border-zinc-800/50">
              <div className="text-xs text-zinc-400 font-medium">1 SD (68%)</div>
              <div className="text-center text-sm font-mono text-emerald-400">${calcs.sd1Up.toFixed(2)}</div>
              <div className="text-center text-sm font-mono text-red-400">${calcs.sd1Down.toFixed(2)}</div>
            </div>

            {/* 2SD Row */}
            <div className="grid grid-cols-3 items-center py-2 border-b border-zinc-800/50">
              <div className="text-xs text-zinc-400 font-medium">2 SD (95%)</div>
              <div className="text-center text-sm font-mono text-emerald-400">${calcs.sd2Up.toFixed(2)}</div>
              <div className="text-center text-sm font-mono text-red-400">${calcs.sd2Down.toFixed(2)}</div>
            </div>

            {/* Current price context */}
            <div className="grid grid-cols-3 items-center py-2">
              <div className="text-xs text-zinc-400 font-medium">From Strike</div>
              <div className="text-center text-sm font-mono text-zinc-300 col-span-2">
                {calcs.fromStrike >= 0 ? '+' : ''}{calcs.fromStrike.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Visual Range Bar */}
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <SDRangeBar
              current={inputs.currentPrice}
              sd1Up={calcs.sd1Up}
              sd1Down={calcs.sd1Down}
              target={targetStop.target}
              stop={targetStop.stop}
            />
          </div>
        </div>

        {/* ═══ OPTION ANALYSIS ═══ */}
        <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-2xl p-4">
          <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3">
            Option P&L Analysis
          </h2>

          {/* Target Row */}
          <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase">At Target (${targetStop.target.toFixed(2)})</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-emerald-400">
                  ${calcs.optAtTarget.toFixed(2)}
                </span>
                <span className={`text-xs font-bold ${calcs.targetOptGL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {calcs.targetOptGL >= 0 ? '+' : ''}{calcs.targetOptGL.toFixed(0)}%
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">
                Stock: {calcs.targetPct >= 0 ? '+' : ''}{calcs.targetPct.toFixed(1)}% (${calcs.targetDollar >= 0 ? '+' : ''}{calcs.targetDollar.toFixed(2)})
              </p>
            </div>
          </div>

          {/* Stop Row */}
          <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl mb-3">
            <TrendingDown className="w-4 h-4 text-red-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-zinc-500 uppercase">At Stop (${targetStop.stop.toFixed(2)})</p>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-red-400">
                  ${calcs.optAtStop.toFixed(2)}
                </span>
                <span className={`text-xs font-bold ${calcs.stopOptGL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {calcs.stopOptGL.toFixed(0)}%
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">
                Stock: {calcs.stopPct.toFixed(1)}% (${calcs.stopDollar.toFixed(2)})
              </p>
            </div>
          </div>

          {/* R-Ratio Big Display */}
          <div className={`text-center p-4 rounded-xl border ${
            calcs.rRatio >= 2 ? 'bg-emerald-500/10 border-emerald-500/30' :
            calcs.rRatio >= 1.5 ? 'bg-amber-500/10 border-amber-500/30' :
            'bg-red-500/10 border-red-500/30'
          }`}>
            <p className="text-[10px] text-zinc-500 uppercase mb-1">R-Ratio (Reward / Risk)</p>
            <p className={`text-4xl font-black font-mono ${
              calcs.rRatio >= 2 ? 'text-emerald-400' :
              calcs.rRatio >= 1.5 ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {calcs.rRatio.toFixed(2)}
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              {calcs.rRatio >= 2 ? 'Trade eligible — reward outweighs risk' :
               calcs.rRatio >= 1.5 ? 'Marginal — consider adjusting' :
               'Unfavorable — risk exceeds reward'}
            </p>
          </div>
        </div>

        {/* ═══ PROBABILITY (collapsible) ═══ */}
        <button
          onClick={() => setShowProbability(!showProbability)}
          className="w-full bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-4 active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-2">
              📊 Probability Analysis
            </h2>
            {showProbability ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </div>
        </button>

        {showProbability && (
          <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-4 -mt-2">
            <div className="space-y-3">
              <ProbBar label="Above Target" value={calcs.probAboveTarget} color="#22c55e" />
              <ProbBar label="Between (In Range)" value={calcs.probInRange} color="#06b6d4" />
              <ProbBar label="Below Stop" value={calcs.probBelowStop} color="#ef4444" />
            </div>
            <p className="text-[10px] text-zinc-600 mt-3 text-center">
              Based on log-normal distribution with {inputs.iv}% IV over {inputs.dte} DTE
            </p>
          </div>
        )}

        {/* ═══ TIER 1 LOGIC CHECKS ═══ */}
        <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-4">
          <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Tier 1 Logic Checks
          </h2>

          <div className="space-y-2">
            <CheckRow label="Is +1SD > Target?" sublabel="Call trade validation" pass={tier1.sd1AboveTarget} />
            <CheckRow label="Is Target > -1SD?" sublabel="Put trade validation" pass={tier1.targetAboveNegSD1} />
            <CheckRow label="R at Target > 2?" sublabel="STOP IF NO" pass={tier1.rAbove2} critical />
            <CheckRow label="Loss if Stopped < 50%?" sublabel="STOP IF NO" pass={tier1.stopLossUnder50} critical />
          </div>

          {/* Overall Signal */}
          <div className={`mt-3 p-3 rounded-xl text-center ${
            allTier1Pass ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'
          }`}>
            <div className="flex items-center justify-center gap-2">
              {allTier1Pass ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-400 uppercase">Trade Eligible</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-bold text-red-400 uppercase">Review Required</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ═══ TIER 2 SCORECARD (collapsible) ═══ */}
        <button
          onClick={() => setShowTier2(!showTier2)}
          className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
              Tier 2 Scorecard
            </h2>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${
                tier2Score >= 80 ? 'text-emerald-400' :
                tier2Score >= 60 ? 'text-amber-400' :
                'text-red-400'
              }`}>{tier2Score}%</span>
              {showTier2 ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
            </div>
          </div>
        </button>

        {showTier2 && (
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 -mt-2 space-y-3">
            {([
              { key: 'pointOfControl' as const, label: 'Point of Control' },
              { key: 'monthlyTrendUp' as const, label: 'Monthly Trend Up?' },
              { key: 'weeklyTrendUp' as const, label: 'Weekly Trend Up?' },
              { key: 'dailyMomentumUp' as const, label: 'Daily Momentum Up?' },
              { key: 'earningsNews' as const, label: 'Earnings/News in 30d?' },
            ]).map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between py-1">
                <span className="text-sm text-zinc-300">{label}</span>
                <RatingPicker
                  value={tier2[key]}
                  onChange={(v) => setTier2(prev => ({ ...prev, [key]: v }))}
                />
              </div>
            ))}

            {/* Score Display */}
            <div className={`mt-2 p-3 rounded-xl text-center ${
              tier2Score >= 80 ? 'bg-emerald-500/10 border border-emerald-500/30' :
              tier2Score >= 60 ? 'bg-amber-500/10 border border-amber-500/30' :
              'bg-red-500/10 border border-red-500/30'
            }`}>
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Tier 2 Score</p>
              <p className={`text-3xl font-black ${
                tier2Score >= 80 ? 'text-emerald-400' :
                tier2Score >= 60 ? 'text-amber-400' :
                'text-red-400'
              }`}>{tier2Score}</p>
            </div>
          </div>
        )}

        {/* ═══ NOTES ═══ */}
        <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-4">
          <label className="text-[10px] text-amber-400 uppercase tracking-wider font-bold block mb-2">
            Trade Notes
          </label>
          <textarea
            placeholder="Observations, setup context, catalysts..."
            className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-300 placeholder-zinc-600 focus:border-amber-500/50 focus:outline-none resize-none h-20"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────

function NumberInput({
  label, value, onChange, onChangeText, prefix, suffix, color, isText,
}: {
  label: string;
  value: number | string;
  onChange?: (v: number) => void;
  onChangeText?: (v: string) => void;
  prefix?: string;
  suffix?: string;
  color?: string;
  isText?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">{prefix}</span>
        )}
        <input
          type={isText ? 'text' : 'number'}
          inputMode={isText ? 'text' : 'decimal'}
          value={value}
          onChange={(e) => {
            if (isText && onChangeText) {
              onChangeText(e.target.value);
            } else if (onChange) {
              onChange(parseFloat(e.target.value) || 0);
            }
          }}
          className="w-full bg-black border border-zinc-800 rounded-lg py-2.5 text-sm font-mono focus:border-[#39ff14]/50 focus:outline-none transition-colors"
          style={{
            color: color || '#e4e4e7',
            paddingLeft: prefix ? '1.5rem' : '0.75rem',
            paddingRight: suffix ? '2rem' : '0.75rem',
          }}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function CheckRow({ label, sublabel, pass, critical }: {
  label: string;
  sublabel: string;
  pass: boolean;
  critical?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
      <div>
        <p className="text-sm text-zinc-200">{label}</p>
        <p className={`text-[10px] ${critical ? 'text-red-400 font-bold' : 'text-zinc-500 italic'}`}>
          {sublabel}
        </p>
      </div>
      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
        pass
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'bg-red-500/20 text-red-400 border border-red-500/30'
      }`}>
        {pass ? 'YES' : 'NO'}
      </span>
    </div>
  );
}

function RatingPicker({ value, onChange }: {
  value: Rating;
  onChange: (v: Rating) => void;
}) {
  const ratings: Rating[] = ['Good', 'Caution', 'No'];
  return (
    <div className="flex gap-1">
      {ratings.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold transition-all active:scale-95 ${
            value === r
              ? r === 'Good' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : r === 'Caution' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-black text-zinc-600 border border-zinc-800'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

function ProbBar({ label, value, color }: {
  label: string;
  value: number;
  color: string;
}) {
  const pct = Math.max(0, Math.min(100, value * 100));
  return (
    <div>
      <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
        <span>{label}</span>
        <span style={{ color }} className="font-bold">{pct.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function SDRangeBar({ current, sd1Up, sd1Down, target, stop }: {
  current: number;
  sd1Up: number;
  sd1Down: number;
  target: number;
  stop: number;
}) {
  // Scale: show from -2SD to +2SD range
  const range = (sd1Up - sd1Down);
  const min = sd1Down - range * 0.3;
  const max = sd1Up + range * 0.3;
  const span = max - min;

  const toPos = (v: number) => Math.max(0, Math.min(100, ((v - min) / span) * 100));

  const currentPos = toPos(current);
  const sd1UpPos = toPos(sd1Up);
  const sd1DownPos = toPos(sd1Down);
  const targetPos = toPos(target);
  const stopPos = toPos(stop);

  return (
    <div className="relative h-12">
      {/* SD Range Background */}
      <div
        className="absolute top-4 h-4 bg-[#39ff14]/10 border border-[#39ff14]/20 rounded"
        style={{ left: `${sd1DownPos}%`, width: `${sd1UpPos - sd1DownPos}%` }}
      />

      {/* Current Price Marker */}
      <div
        className="absolute top-3 w-0.5 h-6 bg-white"
        style={{ left: `${currentPos}%` }}
      />
      <div
        className="absolute top-0 text-[9px] text-zinc-400 -translate-x-1/2 whitespace-nowrap"
        style={{ left: `${currentPos}%` }}
      >
        ${current.toFixed(0)}
      </div>

      {/* Target Marker */}
      <div
        className="absolute top-3 w-0.5 h-6 bg-emerald-400"
        style={{ left: `${targetPos}%` }}
      />
      <div
        className="absolute bottom-0 text-[9px] text-emerald-400 -translate-x-1/2 whitespace-nowrap"
        style={{ left: `${targetPos}%` }}
      >
        T
      </div>

      {/* Stop Marker */}
      <div
        className="absolute top-3 w-0.5 h-6 bg-red-400"
        style={{ left: `${stopPos}%` }}
      />
      <div
        className="absolute bottom-0 text-[9px] text-red-400 -translate-x-1/2 whitespace-nowrap"
        style={{ left: `${stopPos}%` }}
      >
        S
      </div>

      {/* SD Labels */}
      <div
        className="absolute top-10 text-[8px] text-[#39ff14]/60 -translate-x-1/2 whitespace-nowrap"
        style={{ left: `${sd1DownPos}%` }}
      >
        -1σ
      </div>
      <div
        className="absolute top-10 text-[8px] text-[#39ff14]/60 -translate-x-1/2 whitespace-nowrap"
        style={{ left: `${sd1UpPos}%` }}
      >
        +1σ
      </div>
    </div>
  );
}
