import { useState } from 'react';
import { Trophy, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';
import { RARITY_COLORS, getVisibleBadges, getHiddenBadges } from '../../data/jungleBadges';
import { JungleBadge } from '../../types/jungle';

type FilterType = 'all' | 'earned' | 'locked';

export default function BadgeShowcase() {
  const { earnedBadges, setCurrentView } = useJungle();
  const [filter, setFilter] = useState<FilterType>('all');

  const visibleBadges = getVisibleBadges();
  const hiddenBadges = getHiddenBadges();
  const earnedHidden = hiddenBadges.filter(b => earnedBadges.includes(b.id));

  const getFiltered = (): JungleBadge[] => {
    const badges = [...visibleBadges, ...earnedHidden];
    switch (filter) {
      case 'earned': return badges.filter(b => earnedBadges.includes(b.id));
      case 'locked': return badges.filter(b => !earnedBadges.includes(b.id));
      default: return badges;
    }
  };

  const filtered = getFiltered();
  const earnedCount = visibleBadges.filter(b => earnedBadges.includes(b.id)).length;
  const pct = Math.round((earnedCount / visibleBadges.length) * 100);

  return (
    <div className="pb-6 space-y-4">
      {/* Back */}
      <button onClick={() => setCurrentView('hub')} className="flex items-center gap-1 text-[#39ff14] text-sm active:text-white">
        <ArrowLeft className="w-4 h-4 text-[#39ff14]" /> Back
      </button>

      {/* Header */}
      <div className="text-center">
        <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-1" />
        <h1 className="text-lg font-bold text-zinc-100">Badge Collection</h1>
        <p className="text-xs text-zinc-500">{earnedCount} of {visibleBadges.length} earned</p>
      </div>

      {/* Progress */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-zinc-400">Progress</span>
          <span className="text-sm font-bold text-[#39ff14]">{pct}%</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div className="h-2 rounded-full bg-gradient-to-r from-[#39ff14] to-[#39ff14]/60 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'earned', 'locked'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
              filter === f ? 'bg-[#39ff14] text-black' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-8">
          <Lock className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-500">No badges match this filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {filtered.map(badge => {
            const isEarned = earnedBadges.includes(badge.id);
            const r = RARITY_COLORS[badge.rarity];
            return (
              <div
                key={badge.id}
                className={`bg-[#0a0a0a] rounded-xl p-3 text-center border transition-all ${
                  isEarned ? `border-2 ${r.border}` : 'border-zinc-800/50 opacity-50 grayscale'
                }`}
              >
                <div className="relative mb-2">
                  <div className={`text-3xl ${!isEarned ? 'opacity-50' : ''}`}>{badge.icon}</div>
                  {!isEarned && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-zinc-600" />
                    </div>
                  )}
                  {isEarned && (
                    <Sparkles className={`w-3 h-3 ${r.text} absolute -top-0.5 -right-0.5`} />
                  )}
                </div>
                <h4 className={`text-xs font-semibold mb-0.5 truncate ${isEarned ? 'text-zinc-200' : 'text-zinc-500'}`}>
                  {badge.category === 'hidden' && !isEarned ? '???' : badge.name}
                </h4>
                <p className="text-[10px] text-zinc-500 line-clamp-2 mb-1.5 min-h-[24px]">
                  {badge.category === 'hidden' && !isEarned ? 'Hidden achievement' : badge.description}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${r.bg} ${r.text} capitalize`}>{badge.rarity}</span>
                  <span className="text-[10px] text-[#39ff14]">+{badge.xpReward}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden teaser */}
      {hiddenBadges.length - earnedHidden.length > 0 && (
        <div className="text-center py-2">
          <p className="text-xs text-purple-400">
            <Sparkles className="w-3 h-3 inline mr-1" />
            {hiddenBadges.length - earnedHidden.length} hidden badges to discover...
          </p>
        </div>
      )}
    </div>
  );
}
