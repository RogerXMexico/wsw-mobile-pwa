import { useNavigate } from 'react-router-dom';
import { User, LogOut, Sparkles, BookOpen, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { STRATEGIES } from '../data/strategies';
import { RULES_SECTIONS, STRATEGY_SECTIONS } from '../utils/curriculum';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { completed } = useProgress();
  const navigate = useNavigate();

  const totalStrategies = STRATEGIES.length;
  const completedCount = completed.size;
  const progressPct = totalStrategies > 0 ? Math.round((completedCount / totalStrategies) * 100) : 0;

  return (
    <div className="px-4 pt-6 pb-24">
      <h1 className="text-xl font-bold text-white mb-6">Profile</h1>

      {/* User card */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#39ff14] text-black/20 border border-emerald-500/30 flex items-center justify-center">
            <User className="w-6 h-6 text-[#39ff14]" />
          </div>
          <div>
            <p className="text-white font-semibold">{user?.user_metadata?.name || 'Jungle Explorer'}</p>
            <p className="text-zinc-400 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-[#39ff14]">{completedCount}</p>
          <p className="text-[10px] text-zinc-500 uppercase">Completed</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-white">{totalStrategies}</p>
          <p className="text-[10px] text-zinc-500 uppercase">Total</p>
        </div>
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-amber-400">{progressPct}%</p>
          <p className="text-[10px] text-zinc-500 uppercase">Progress</p>
        </div>
      </div>

      {/* Quiz CTA */}
      <button
        onClick={() => navigate('/quiz')}
        className="w-full flex items-center gap-3 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 mb-4 active:scale-[0.98] transition-transform"
      >
        <Sparkles className="w-5 h-5 text-amber-400" />
        <div className="flex-1 text-left">
          <p className="text-white font-medium text-sm">Which Jungle Animal Are You?</p>
          <p className="text-zinc-400 text-xs">Take the quiz to find your trading personality</p>
        </div>
      </button>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="w-full flex items-center justify-center gap-2 py-3 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl text-red-400 font-medium active:scale-[0.98] transition-transform"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );
}
