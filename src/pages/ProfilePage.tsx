import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  LogOut,
  Sparkles,
  Compass,
  Wrench,
  Flame,
  Trophy,
  BookOpen,
  Lock,
  ChevronRight,
  X,
  Bookmark,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { useJungle } from '../contexts/JungleContext';
import { STRATEGIES } from '../data/strategies';
import { LEARNING_PATHS } from '../data/learningPaths';
import {
  JUNGLE_BADGES,
  getVisibleBadges,
  getHiddenBadges,
  getLevelForXP,
  getXPProgress,
  RARITY_COLORS,
} from '../data/jungleBadges';
import type { JungleBadge } from '../types/jungle';

// ─── helpers ───────────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString('en-US');
}

const TIER_BADGE: Record<number, string> = {
  0: '🟢',
  0.5: '🟡',
  1: '🔵',
  2: '🟣',
  3: '🟠',
  3.5: '🔴',
  4: '⚪',
  5: '🌀',
  6: '💎',
  7: '🏆',
  8: '🧬',
  9: '🌋',
  10: '👑',
};

// ─── component ─────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { completed } = useProgress();
  const {
    progress,
    level,
    levelName,
    levelIcon,
    xpProgress,
    earnedBadges,
    streakDays,
  } = useJungle();
  const navigate = useNavigate();

  const [selectedBadge, setSelectedBadge] = useState<JungleBadge | null>(null);

  // ── derived data ──
  const totalStrategies = STRATEGIES.length;
  const completedCount = completed.size;
  const xp = progress.xp;

  // Learning path
  const learningPathId =
    typeof window !== 'undefined'
      ? localStorage.getItem('wsw-learning-path')
      : null;
  const learningPath =
    learningPathId && learningPathId !== 'skipped'
      ? LEARNING_PATHS.find((p) => p.id === learningPathId) ?? null
      : null;

  // Quiz stats from JungleContext progress
  const quizzesPassed = useMemo(
    () =>
      Object.values(progress.quizScores).filter((q) => q.passed).length,
    [progress.quizScores],
  );

  // Bookmarks
  const bookmarks: string[] = useMemo(() => {
    try {
      const raw = localStorage.getItem('wsw-bookmarks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const bookmarkedStrategies = useMemo(
    () => STRATEGIES.filter((s) => bookmarks.includes(s.id)),
    [bookmarks],
  );

  // Badges
  const visibleBadges = useMemo(() => getVisibleBadges(), []);
  const hiddenBadges = useMemo(() => getHiddenBadges(), []);
  const hiddenEarnedCount = hiddenBadges.filter((b) =>
    earnedBadges.includes(b.id),
  ).length;
  const totalEarned = earnedBadges.length;

  // User initial
  const displayName = user?.user_metadata?.name || 'Jungle Explorer';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div
      className="bg-black min-h-screen px-4 pb-28"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)',
      }}
    >
      {/* ── Header ── */}
      <h1 className="text-xl font-bold text-white mb-5">Profile</h1>

      {/* ═══════════ 1. User Card ═══════════ */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#39ff14]/15 border border-[#39ff14]/30 flex items-center justify-center text-xl font-bold text-[#39ff14]">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">{displayName}</p>
            <p className="text-zinc-400 text-sm truncate">{user?.email}</p>
            {learningPath && (
              <span className="inline-flex items-center gap-1 mt-1 text-xs px-2 py-0.5 rounded-full bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20">
                {learningPath.icon} {learningPath.title}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ 2. XP & Level ═══════════ */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold text-sm">
            Level {level} — {levelName} {levelIcon}
          </span>
          <span className="text-[#39ff14] text-xs font-medium">
            {fmt(xp)} XP
          </span>
        </div>

        {/* progress bar */}
        <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${xpProgress.percentage}%`,
              background:
                'linear-gradient(90deg, #22c55e 0%, #39ff14 100%)',
            }}
          />
        </div>

        <p className="text-zinc-500 text-[11px] mt-1.5 text-right">
          {fmt(xpProgress.current)} / {fmt(xpProgress.needed)} XP to next
          level
        </p>
      </div>

      {/* ═══════════ 3. Stats Grid ═══════════ */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard
          label="Strategies"
          value={`${completedCount} / ${totalStrategies}`}
          color="text-[#39ff14]"
          icon={<BookOpen className="w-4 h-4" />}
        />
        <StatCard
          label="Streak"
          value={`${streakDays}d`}
          color="text-orange-400"
          icon={<Flame className="w-4 h-4" />}
        />
        <StatCard
          label="Quizzes Passed"
          value={String(quizzesPassed)}
          color="text-purple-400"
          icon={<Trophy className="w-4 h-4" />}
        />
        <StatCard
          label="Total XP"
          value={fmt(xp)}
          color="text-amber-400"
          icon={<Sparkles className="w-4 h-4" />}
        />
      </div>

      {/* ═══════════ 4. Badges ═══════════ */}
      <section className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-sm">
            🎖️ Badges
          </h2>
          <span className="text-zinc-500 text-xs">
            {totalEarned} / {JUNGLE_BADGES.length} earned
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {visibleBadges.map((badge) => {
            const earned = earnedBadges.includes(badge.id);
            const colors = RARITY_COLORS[badge.rarity];
            return (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-transform active:scale-[0.96] min-h-[80px] ${
                  earned
                    ? `bg-[#0a0a0a] ${colors.border} border`
                    : 'bg-[#0a0a0a] border-zinc-800 border opacity-50'
                }`}
                style={
                  earned
                    ? {
                        boxShadow: `0 0 12px ${
                          badge.rarity === 'legendary'
                            ? 'rgba(245,158,11,0.35)'
                            : badge.rarity === 'epic'
                            ? 'rgba(168,85,247,0.3)'
                            : badge.rarity === 'rare'
                            ? 'rgba(59,130,246,0.3)'
                            : 'transparent'
                        }`,
                      }
                    : {}
                }
              >
                {!earned && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-zinc-600" />
                  </div>
                )}
                <span
                  className={`text-2xl ${
                    earned ? '' : 'grayscale opacity-40'
                  }`}
                >
                  {badge.icon}
                </span>
                <span
                  className={`text-[10px] mt-1 text-center leading-tight ${
                    earned ? colors.text : 'text-zinc-600'
                  }`}
                >
                  {badge.name}
                </span>
              </button>
            );
          })}
        </div>

        {hiddenBadges.length > 0 && (
          <p className="text-zinc-600 text-xs mt-3 text-center italic">
            🔮 {hiddenBadges.length - hiddenEarnedCount} hidden badge
            {hiddenBadges.length - hiddenEarnedCount !== 1 ? 's' : ''} to
            discover…
          </p>
        )}
      </section>

      {/* ═══════════ 5. Bookmarks ═══════════ */}
      <section className="mb-4">
        <h2 className="text-white font-semibold text-sm mb-3">
          🔖 Bookmarked Strategies
        </h2>

        {bookmarkedStrategies.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-2xl p-5 flex flex-col items-center text-center">
            <Bookmark className="w-6 h-6 text-zinc-600 mb-2" />
            <p className="text-zinc-500 text-sm">
              No bookmarks yet — tap 🔖 on any strategy to save it
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {bookmarkedStrategies.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/strategy/${s.id}`)}
                className="w-full flex items-center gap-3 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3.5 active:scale-[0.98] transition-transform text-left"
              >
                <span className="text-lg">
                  {TIER_BADGE[s.tier] ?? '⬜'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {s.name}
                  </p>
                  <p className="text-zinc-500 text-xs truncate">
                    Tier {s.tier} · {s.outlook}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════ 6. Quick Links ═══════════ */}
      <section className="space-y-2 mb-6">
        <QuickLink
          icon={<Sparkles className="w-5 h-5 text-amber-400" />}
          title="Which Animal Are You?"
          subtitle="Find your trading personality"
          onClick={() => navigate('/quiz')}
        />
        <QuickLink
          icon={<Compass className="w-5 h-5 text-[#39ff14]" />}
          title="Learning Path"
          subtitle={
            learningPath
              ? `Current: ${learningPath.title}`
              : 'Choose your journey'
          }
          onClick={() => navigate('/')}
        />
        <QuickLink
          icon={<Wrench className="w-5 h-5 text-cyan-400" />}
          title="Tools"
          subtitle="Calculators & utilities"
          onClick={() => navigate('/tools')}
        />
      </section>

      {/* ═══════════ 7. Sign Out ═══════════ */}
      <button
        onClick={signOut}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0a0a0a] border border-red-500/20 rounded-2xl text-red-400 font-medium active:scale-[0.98] transition-transform"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

      {/* ═══════════ Badge Detail Modal ═══════════ */}
      {selectedBadge && (
        <BadgeModal
          badge={selectedBadge}
          earned={earnedBadges.includes(selectedBadge.id)}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </div>
  );
}

// ─── sub-components ────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className={color}>{icon}</span>
        <span className="text-zinc-500 text-[10px] uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

function QuickLink({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 active:scale-[0.98] transition-transform"
    >
      {icon}
      <div className="flex-1 text-left">
        <p className="text-white font-medium text-sm">{title}</p>
        <p className="text-zinc-400 text-xs">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-600" />
    </button>
  );
}

function BadgeModal({
  badge,
  earned,
  onClose,
}: {
  badge: JungleBadge;
  earned: boolean;
  onClose: () => void;
}) {
  const colors = RARITY_COLORS[badge.rarity];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0a0a0a] border-t border-[#39ff14]/20 rounded-t-3xl p-6 pb-10 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className={`text-4xl ${earned ? '' : 'grayscale opacity-50'}`}>
              {badge.icon}
            </span>
            <div>
              <p className="text-white font-semibold">{badge.name}</p>
              <span
                className={`text-[10px] uppercase tracking-wider font-bold ${colors.text}`}
              >
                {badge.rarity}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 active:scale-95"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        <p className="text-zinc-400 text-sm mb-3">{badge.description}</p>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#39ff14]">+{badge.xpReward} XP</span>
          <span className="text-zinc-600">·</span>
          <span className={earned ? 'text-emerald-400' : 'text-zinc-500'}>
            {earned ? '✅ Earned' : '🔒 Locked'}
          </span>
        </div>
      </div>
    </div>
  );
}
