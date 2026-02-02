import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen, GraduationCap } from 'lucide-react';
import { STRATEGIES } from '../data/strategies';
import { OptionLeg } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { getTierInfo, getTierBadgeColor } from '../utils/curriculum';
import { blackScholes } from '../utils/blackScholes';
import PayoffChart from '../components/PayoffChart';
import StrategyQuiz from '../components/StrategyQuiz';
import { TIER_QUIZ_CONFIG, getQuestionsForTier } from '../data/quizData';

// Entry conditions (must match PayoffChart constants)
const ENTRY_PRICE = 100;
const RISK_FREE_RATE = 0.05;

function describeLeg(leg: OptionLeg): string {
  if (leg.type === 'stock') {
    return leg.action === 'buy' ? 'Buy Stock' : 'Short Stock';
  }
  const action = leg.action === 'buy' ? 'Buy' : 'Sell';
  const type = leg.type === 'call' ? 'Call' : 'Put';
  const qty = leg.quantity > 1 ? `${leg.quantity}x ` : '';
  const strike = leg.strikeOffset !== undefined && leg.strikeOffset !== 0
    ? ` (${leg.strikeOffset > 0 ? '+' : ''}${leg.strikeOffset})`
    : '';
  return `${qty}${action} ${type}${strike}`;
}

function describeAllLegs(legs: OptionLeg[]): string {
  return legs.map(describeLeg).join(' + ');
}

// Compute position value for Greeks via Black-Scholes
function positionBS(
  legs: OptionLeg[],
  S: number,
  T: number,
  v: number,
): number {
  let value = 0;
  legs.forEach((leg) => {
    const strike = ENTRY_PRICE + (leg.strikeOffset || 0);
    const quantity = leg.quantity || 1;
    const multiplier = leg.action === 'buy' ? 1 : -1;
    const t = Math.max(T / 365, 0.0001);
    const val = blackScholes(leg.type, S, strike, t, RISK_FREE_RATE, v);
    value += val * multiplier * quantity;
  });
  return value;
}

// Greeks via numerical differentiation
function computeGreeks(
  legs: OptionLeg[],
  S: number,
  days: number,
  vol: number,
): { delta: number; gamma: number; theta: number; vega: number } {
  if (days <= 0) {
    return { delta: 0, gamma: 0, theta: 0, vega: 0 };
  }

  const dS = 0.01;
  const delta = (positionBS(legs, S + dS, days, vol) - positionBS(legs, S - dS, days, vol)) / (2 * dS);

  const gamma =
    positionBS(legs, S + 1, days, vol) -
    2 * positionBS(legs, S, days, vol) +
    positionBS(legs, S - 1, days, vol);

  const theta =
    days > 1
      ? positionBS(legs, S, days - 1, vol) - positionBS(legs, S, days, vol)
      : positionBS(legs, S, 0, vol) - positionBS(legs, S, days, vol);

  const dV = 0.01;
  const vega = (positionBS(legs, S, days, vol + dV) - positionBS(legs, S, days, vol - dV)) / (2 * dV);

  return {
    delta: Math.round(delta * 1000) / 1000,
    gamma: Math.round(gamma * 1000) / 1000,
    theta: Math.round(theta * 100) / 100,
    vega: Math.round(vega * 100) / 100,
  };
}

export default function StrategyPage() {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const { isCompleted, toggleComplete } = useProgress();

  const [showQuiz, setShowQuiz] = useState(false);

  // Simulator state
  const [simPrice, setSimPrice] = useState(100);
  const [simVol, setSimVol] = useState(0.30);
  const [simDays, setSimDays] = useState(45);
  const [currentPnL, setCurrentPnL] = useState(0);
  const [entryValue, setEntryValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  const handlePnLCalculated = useCallback(
    (pnl: number, entry: number, current: number) => {
      setCurrentPnL(pnl);
      setEntryValue(entry);
      setCurrentValue(current);
    },
    [],
  );

  const strategy = STRATEGIES.find((s) => s.id === strategyId);
  if (!strategy) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Strategy not found
      </div>
    );
  }

  const tierInfo = getTierInfo(strategy.tier);
  const badgeColor = getTierBadgeColor(strategy.tier);
  const completed = isCompleted(strategy.id);
  const showSimulator = strategy.legs.length > 0 && !strategy.hideSimulator;

  const greeks = showSimulator
    ? computeGreeks(strategy.legs, simPrice, simDays, simVol)
    : { delta: 0, gamma: 0, theta: 0, vega: 0 };

  const resetSimulation = () => {
    setSimPrice(100);
    setSimVol(0.30);
    setSimDays(45);
  };

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Sticky header — padded for iPhone notch/Dynamic Island */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-[#39ff14]/10">
        <div className="pt-[calc(env(safe-area-inset-top,0px)+8px)]">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[#39ff14] active:text-white transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
              <span className="text-sm">Back</span>
            </button>
            <button
              onClick={() => toggleComplete(strategy.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 min-h-[44px] ${
                completed
                  ? 'bg-[#39ff14]/10 text-[#39ff14] border border-emerald-500/30'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
              }`}
            >
              {completed ? <Check className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
              {completed ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>

      {/* Strategy header */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
            Tier {strategy.tier} — {tierInfo?.name}
          </span>
          <span className="text-[10px] text-zinc-500">{strategy.outlook}</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{strategy.name}</h1>
        {strategy.objective && (
          <p className="text-zinc-400 text-sm mt-1">{strategy.objective}</p>
        )}

        {/* Strategy mechanics */}
        {strategy.legs && strategy.legs.length > 0 && (
          <div className="mt-4 space-y-2">
            {/* Legs breakdown */}
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
              <p className="text-[10px] text-zinc-500 uppercase mb-2">How to Build It</p>
              <div className="space-y-1.5">
                {strategy.legs.map((leg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                      leg.action === 'buy'
                        ? 'bg-emerald-900/40 text-[#39ff14]'
                        : 'bg-red-900/40 text-red-400'
                    }`}>
                      {leg.action === 'buy' ? 'BUY' : 'SELL'}
                    </span>
                    <span className="text-sm text-white">{describeLeg(leg)}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">
                {describeAllLegs(strategy.legs)}
              </p>
            </div>

            {/* Quick stats row */}
            <div className="flex gap-2">
              {strategy.risk && strategy.risk !== 'None' && (
                <div className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-zinc-500 uppercase">Risk</p>
                  <p className="text-sm text-white font-medium">{strategy.risk}</p>
                </div>
              )}
              <div className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
                <p className="text-[10px] text-zinc-500 uppercase">Legs</p>
                <p className="text-sm text-white font-medium">{strategy.legs.length}</p>
              </div>
              <div className="flex-1 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
                <p className="text-[10px] text-zinc-500 uppercase">Outlook</p>
                <p className="text-sm text-white font-medium">{strategy.outlook}</p>
              </div>
            </div>
          </div>
        )}

        {/* For educational content without legs */}
        {(!strategy.legs || strategy.legs.length === 0) && strategy.risk && strategy.risk !== 'None' && (
          <div className="flex gap-3 mt-4">
            <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-3 py-2">
              <p className="text-[10px] text-zinc-500 uppercase">Risk</p>
              <p className="text-sm text-white font-medium">{strategy.risk}</p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive P&L Simulator */}
      {showSimulator && (
        <div className="px-4 mb-6 space-y-3">
          {/* Chart */}
          <PayoffChart
            strategy={strategy}
            stockPrice={simPrice}
            volatility={simVol}
            daysToExpiry={simDays}
            onPnLCalculated={handlePnLCalculated}
          />

          {/* P&L Readout */}
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">Entry</p>
                <p className="text-sm font-bold text-zinc-300">
                  ${Math.abs(entryValue).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">Current</p>
                <p className="text-sm font-bold text-white">
                  ${Math.abs(currentValue).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500 uppercase font-bold">P&L</p>
                <p
                  className={`text-lg font-black ${
                    currentPnL >= 0 ? 'text-[#39ff14]' : 'text-red-400'
                  }`}
                >
                  {currentPnL >= 0 ? '+' : ''}${currentPnL.toFixed(0)}
                </p>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold">Simulation Controls</p>
              <button
                onClick={resetSimulation}
                className="text-[10px] text-zinc-500 active:text-[#39ff14] transition-colors min-h-[44px] flex items-center"
              >
                Reset
              </button>
            </div>

            {/* Stock Price slider */}
            <div className="space-y-1">
              <label className="flex justify-between text-[10px] text-zinc-400 uppercase font-bold">
                <span>Stock Price</span>
                <span className="text-[#39ff14]">${simPrice}</span>
              </label>
              <input
                type="range"
                min="50"
                max="150"
                step="1"
                value={simPrice}
                onChange={(e) => setSimPrice(Number(e.target.value))}
                className="sim-slider w-full"
              />
            </div>

            {/* IV slider */}
            <div className="space-y-1">
              <label className="flex justify-between text-[10px] text-zinc-400 uppercase font-bold">
                <span>Implied Volatility</span>
                <span className="text-purple-400">{(simVol * 100).toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min="0.10"
                max="1.0"
                step="0.05"
                value={simVol}
                onChange={(e) => setSimVol(Number(e.target.value))}
                className="sim-slider sim-slider-purple w-full"
              />
            </div>

            {/* DTE slider */}
            <div className="space-y-1">
              <label className="flex justify-between text-[10px] text-zinc-400 uppercase font-bold">
                <span>Days to Expiry</span>
                <span className="text-cyan-400">{simDays}d</span>
              </label>
              <input
                type="range"
                min="0"
                max="90"
                step="1"
                value={simDays}
                onChange={(e) => setSimDays(Number(e.target.value))}
                className="sim-slider sim-slider-cyan w-full"
              />
            </div>
          </div>

          {/* Greeks */}
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
            <p className="text-[9px] text-zinc-500 uppercase font-bold mb-2">Position Greeks</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-[9px] text-zinc-500">Delta</p>
                <p className="text-sm font-mono text-zinc-300">{greeks.delta.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500">Gamma</p>
                <p className="text-sm font-mono text-zinc-300">{greeks.gamma.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500">Theta</p>
                <p className={`text-sm font-mono ${greeks.theta >= 0 ? 'text-[#39ff14]' : 'text-red-400'}`}>
                  {greeks.theta.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-zinc-500">Vega</p>
                <p className="text-sm font-mono text-zinc-300">{greeks.vega.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analogy — WSW animal story */}
      {strategy.analogy && (
        <div className="px-4 mb-6">
          <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌴</span>
              <h3 className="text-sm font-bold text-[#39ff14]">Jungle Analogy</h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">{strategy.analogy}</p>
          </div>
        </div>
      )}

      {/* Analysis content (HTML from desktop) */}
      {strategy.analysis && (
        <div className="px-4 mb-6">
          <div
            className="strategy-content prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: strategy.analysis }}
          />
        </div>
      )}

      {/* Nuance — deeper insights */}
      {strategy.nuance && (
        <div className="px-4 mb-6">
          <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔍</span>
              <h3 className="text-sm font-bold text-amber-400">The Nuance</h3>
            </div>
            <div
              className="strategy-content prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: strategy.nuance }}
            />
          </div>
        </div>
      )}

      {/* Example — worked through */}
      {strategy.example && (
        <div className="px-4 mb-6">
          <div className="bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📝</span>
              <h3 className="text-sm font-bold text-cyan-400">Worked Example</h3>
            </div>
            <div
              className="strategy-content prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: strategy.example }}
            />
          </div>
        </div>
      )}

      {/* Quiz button — only for tiers with quiz questions */}
      {(() => {
        const tierConfig = TIER_QUIZ_CONFIG[strategy.tier];
        const hasQuestions = tierConfig?.enabled && getQuestionsForTier(strategy.tier).length > 0;
        if (!hasQuestions) return null;
        return (
          <div className="px-4 mb-8">
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-4 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-3 min-h-[44px]"
            >
              <GraduationCap className="w-5 h-5 text-[#39ff14]" />
              <span className="text-[#39ff14] font-bold text-sm">
                Take the Tier {strategy.tier} Quiz
              </span>
            </button>
          </div>
        );
      })()}

      {/* Quiz overlay */}
      {showQuiz && (
        <StrategyQuiz
          tier={strategy.tier}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}
