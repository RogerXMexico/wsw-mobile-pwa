import { useState } from 'react';
import { Shield, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  onAccept: () => void;
  onBack: () => void;
}

export default function DisclaimerPage({ onAccept, onBack }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-14 pb-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <Shield className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-black text-white">Liability Agreement</h1>
        <p className="text-zinc-400 text-sm mt-2">Please read carefully before proceeding</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-6 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Warning Banner */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 font-semibold text-sm">Important Disclaimer</p>
              <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
                Options trading involves substantial risk and is not appropriate for all investors.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-[#0a0a0a]/80 border border-[#39ff14]/20 rounded-2xl p-4 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">📚 Educational Purpose Only</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Wall Street Wildlife Options University is an educational platform. All content, strategies, tools, and materials are provided strictly for educational and informational purposes. Nothing on this platform constitutes financial advice, investment advice, trading advice, or any other type of advice.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">⚠️ Risk Acknowledgment</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Options trading involves substantial risk of loss and is not suitable for all investors. You can lose more than your initial investment. Past performance of any trading strategy does not guarantee future results. The value of options can fluctuate rapidly and you may lose the entire amount invested.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">🚫 No Financial Advice</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                The creators, instructors, and contributors to Wall Street Wildlife are not registered investment advisors, broker-dealers, or financial planners. Any trades, strategies, or investment ideas discussed are for educational purposes only and should not be construed as recommendations to buy, sell, or hold any security.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">🧠 Your Responsibility</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                You are solely responsible for your own investment decisions. Before making any financial decisions, consult with a qualified financial advisor. Always do your own research and due diligence. Only invest money you can afford to lose.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">📊 Hypothetical Performance</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Any examples, case studies, or trade scenarios presented on this platform are hypothetical and for illustration purposes only. They do not represent actual trades and may not reflect the impact of real market conditions such as liquidity, slippage, or fees.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">🛡️ Limitation of Liability</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Wall Street Wildlife, its owners, employees, and affiliates shall not be held liable for any losses, damages, or costs arising from the use of this educational platform or reliance on any information provided herein. Use of this platform is at your own risk.
              </p>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="bg-[#0a0a0a]/80 border border-[#39ff14]/20 rounded-2xl p-4">
            <label className="flex items-start gap-3 cursor-pointer" onClick={() => setAgreed(!agreed)}>
              <div className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                agreed 
                  ? 'bg-[#39ff14] border-emerald-500' 
                  : 'border-zinc-700 bg-transparent'
              }`}>
                {agreed && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-zinc-300 text-xs leading-relaxed">
                I have read and understand this disclaimer. I acknowledge that options trading involves substantial risk of loss, that all content is educational only, and that I am solely responsible for my own investment decisions. I agree to these terms.
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-5 pb-8 pt-4 space-y-3 max-w-lg mx-auto w-full" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 32px)' }}>
        <button
          onClick={onAccept}
          disabled={!agreed}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            agreed
              ? 'bg-[#39ff14] text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]'
              : 'bg-zinc-900 text-zinc-500 cursor-not-allowed'
          }`}
        >
          I Agree — Continue
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 text-zinc-500 text-sm font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
