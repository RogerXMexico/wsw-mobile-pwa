import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Target, CheckCircle, ChevronRight, Flame, Star, Gift } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

// ============ TYPES ============

interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: string;
  completed: boolean;
  targetView?: string;
}

interface DailyMissionState {
  date: string;
  missions: { id: string; completed: boolean }[];
  bonusMissionCompleted: boolean;
}

interface StreakState {
  currentStreak: number;
  lastCompletedDate: string;
  longestStreak: number;
}

// ============ MISSION TEMPLATES ============

const MISSION_TEMPLATES = [
  { type: 'quiz', title: 'Quiz Master', description: 'Complete any strategy quiz', icon: '🎯', xp: 50, targetView: 'hub' },
  { type: 'strategy', title: 'Strategy Review', description: 'Review a strategy lesson', icon: '📊', xp: 35, targetView: 'hub' },
  { type: 'calculator', title: 'Crunch Numbers', description: 'Use any options calculator', icon: '🧮', xp: 30, targetView: 'hub' },
  { type: 'tutorial', title: 'Knowledge Seeker', description: 'Read a tutorial or lesson', icon: '📚', xp: 40, targetView: 'hub' },
  { type: 'trade', title: 'Paper Trader', description: 'Practice a simulated trade', icon: '💹', xp: 45, targetView: 'trading-feed' },
  { type: 'tribe', title: 'Tribe Spirit', description: 'Visit your Jungle Tribe', icon: '🏕️', xp: 25, targetView: 'jungle-tribes' },
  { type: 'feed', title: 'Community Voice', description: 'Share a trade idea in the feed', icon: '📣', xp: 35, targetView: 'trading-feed' },
  { type: 'badges', title: 'Badge Hunter', description: 'Check your badges & achievements', icon: '🏅', xp: 20, targetView: 'badges' },
];

const BONUS_MISSIONS = [
  { title: 'Weekly Warrior', description: 'Complete all 3 missions 5 days straight', icon: '⚔️', xp: 150 },
  { title: 'XP Blitz', description: 'Earn 200+ XP today from any source', icon: '⚡', xp: 100 },
  { title: 'Social Butterfly', description: 'Like 3 posts and share 1 trade idea', icon: '🦋', xp: 120 },
];

// ============ HELPERS ============

function getDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function dateSeed(date: string): number {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = ((hash << 5) - hash) + date.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickMissions(date: string): typeof MISSION_TEMPLATES[number][] {
  const seed = dateSeed(date);
  const shuffled = [...MISSION_TEMPLATES].sort((a, b) => {
    const ha = dateSeed(date + a.type) % 1000;
    const hb = dateSeed(date + b.type) % 1000;
    return ha - hb;
  });
  return shuffled.slice(0, 3);
}

function pickBonusMission(date: string): typeof BONUS_MISSIONS[number] {
  const seed = dateSeed(date);
  return BONUS_MISSIONS[seed % BONUS_MISSIONS.length];
}

function loadMissionState(): DailyMissionState | null {
  try {
    const raw = localStorage.getItem('wsw_daily_missions');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveMissionState(state: DailyMissionState): void {
  localStorage.setItem('wsw_daily_missions', JSON.stringify(state));
}

function loadStreakState(): StreakState {
  try {
    const raw = localStorage.getItem('wsw_mission_streak');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { currentStreak: 0, lastCompletedDate: '', longestStreak: 0 };
}

function saveStreakState(state: StreakState): void {
  localStorage.setItem('wsw_mission_streak', JSON.stringify(state));
}

// ============ COMPONENT ============

export default function DailyMissions() {
  const { setCurrentView, addXP, progress } = useJungle();
  const today = getDateString();

  // Determine today's missions from date seed
  const todayTemplates = useMemo(() => pickMissions(today), [today]);
  const bonusTemplate = useMemo(() => pickBonusMission(today), [today]);

  // Load persisted state or init fresh
  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = loadMissionState();
    if (saved && saved.date === today) {
      return todayTemplates.map((t, i) => ({
        id: `${today}-${t.type}`,
        title: t.title,
        description: t.description,
        xp: t.xp,
        icon: t.icon,
        completed: saved.missions[i]?.completed ?? false,
        targetView: t.targetView,
      }));
    }
    return todayTemplates.map(t => ({
      id: `${today}-${t.type}`,
      title: t.title,
      description: t.description,
      xp: t.xp,
      icon: t.icon,
      completed: false,
      targetView: t.targetView,
    }));
  });

  const [bonusCompleted, setBonusCompleted] = useState<boolean>(() => {
    const saved = loadMissionState();
    return saved?.date === today ? saved.bonusMissionCompleted : false;
  });

  const [streak, setStreak] = useState<StreakState>(loadStreakState);
  const [justCompleted, setJustCompleted] = useState<string | null>(null);

  const allCompleted = missions.every(m => m.completed);
  const completedCount = missions.filter(m => m.completed).length;
  const showBonus = streak.currentStreak >= 5;

  // Persist on change
  useEffect(() => {
    const state: DailyMissionState = {
      date: today,
      missions: missions.map(m => ({ id: m.id, completed: m.completed })),
      bonusMissionCompleted: bonusCompleted,
    };
    saveMissionState(state);
  }, [missions, bonusCompleted, today]);

  // Update streak when all missions completed
  useEffect(() => {
    if (allCompleted && streak.lastCompletedDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const newStreak = streak.lastCompletedDate === yesterdayStr
        ? streak.currentStreak + 1
        : 1;

      const updated: StreakState = {
        currentStreak: newStreak,
        lastCompletedDate: today,
        longestStreak: Math.max(streak.longestStreak, newStreak),
      };
      setStreak(updated);
      saveStreakState(updated);

      // Streak bonus XP
      if (newStreak > 1) {
        addXP(25 * Math.min(newStreak, 7), 'mission_streak_bonus');
      }
    }
  }, [allCompleted, streak, today, addXP]);

  const completeMission = useCallback((missionId: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && !m.completed) {
        addXP(m.xp, 'mission_complete');
        setJustCompleted(missionId);
        setTimeout(() => setJustCompleted(null), 1500);
        return { ...m, completed: true };
      }
      return m;
    }));
  }, [addXP]);

  const completeBonusMission = useCallback(() => {
    if (!bonusCompleted) {
      setBonusCompleted(true);
      addXP(bonusTemplate.xp, 'mission_complete');
      setJustCompleted('bonus');
      setTimeout(() => setJustCompleted(null), 1500);
    }
  }, [bonusCompleted, bonusTemplate.xp, addXP]);

  const handleMissionTap = useCallback((mission: Mission) => {
    if (mission.completed) return;
    completeMission(mission.id);
    // After a brief delay, navigate to the relevant view
    if (mission.targetView) {
      setTimeout(() => {
        setCurrentView(mission.targetView as any);
      }, 800);
    }
  }, [completeMission, setCurrentView]);

  return (
    <div className="pb-4 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView('hub')}
          className="p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-zinc-100">Daily Missions</h1>
          <p className="text-xs text-zinc-500">Complete challenges to earn XP</p>
        </div>
        {/* Streak badge */}
        <div className="flex items-center gap-1.5 bg-[#0a0a0a] border border-orange-500/30 rounded-full px-3 py-1.5">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-orange-400">{streak.currentStreak}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400">Today's Progress</span>
          <span className="text-xs font-bold text-[#39ff14]">{completedCount}/3 Complete</span>
        </div>
        <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#39ff14] to-emerald-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(completedCount / 3) * 100}%` }}
          />
        </div>
        {allCompleted && (
          <div className="mt-2 text-center text-xs text-[#39ff14] animate-pulse">
            🎉 All missions complete! +{25 * Math.min(streak.currentStreak, 7)} streak bonus XP
          </div>
        )}
      </div>

      {/* Streak info */}
      {streak.currentStreak > 0 && (
        <div className="flex items-center gap-3 bg-[#0a0a0a] border border-orange-500/20 rounded-xl p-3">
          <div className="text-2xl">🔥</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-zinc-200">
              {streak.currentStreak} Day Streak!
            </div>
            <div className="text-[10px] text-zinc-500">
              {streak.currentStreak >= 7 ? 'Legendary streak! Max bonus active.' :
               streak.currentStreak >= 5 ? 'Bonus mission unlocked!' :
               `${5 - streak.currentStreak} more days to unlock bonus mission`}
            </div>
          </div>
          {streak.longestStreak > streak.currentStreak && (
            <div className="text-right">
              <div className="text-[10px] text-zinc-500">Best</div>
              <div className="text-sm font-bold text-orange-400">{streak.longestStreak}</div>
            </div>
          )}
        </div>
      )}

      {/* Daily missions */}
      <div>
        <h2 className="text-sm font-bold text-zinc-300 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-400" /> Today's Missions
        </h2>
        <div className="space-y-2">
          {missions.map((mission) => (
            <button
              key={mission.id}
              onClick={() => handleMissionTap(mission)}
              disabled={mission.completed}
              className={`w-full text-left bg-[#0a0a0a] border rounded-xl p-3 flex items-center gap-3 min-h-[56px] transition-all duration-300 active:scale-[0.98]
                ${mission.completed
                  ? 'border-[#39ff14]/30 opacity-70'
                  : 'border-[#39ff14]/10 hover:border-[#39ff14]/30'}
                ${justCompleted === mission.id ? 'ring-2 ring-[#39ff14]/50 scale-[1.02]' : ''}
              `}
            >
              <div className="text-2xl w-10 h-10 flex items-center justify-center">
                {mission.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${mission.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                  {mission.title}
                </div>
                <div className="text-[10px] text-zinc-500">{mission.description}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-bold ${mission.completed ? 'text-zinc-600' : 'text-[#39ff14]'}`}>
                  +{mission.xp} XP
                </span>
                {mission.completed ? (
                  <CheckCircle className="w-5 h-5 text-[#39ff14]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-zinc-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bonus mission (unlocked at streak 5+) */}
      <div>
        <h2 className="text-sm font-bold text-zinc-300 mb-2 flex items-center gap-2">
          <Gift className="w-4 h-4 text-purple-400" /> Weekly Bonus Mission
        </h2>
        {showBonus ? (
          <button
            onClick={completeBonusMission}
            disabled={bonusCompleted}
            className={`w-full text-left bg-[#0a0a0a] border rounded-xl p-4 flex items-center gap-3 min-h-[56px] transition-all duration-300 active:scale-[0.98]
              ${bonusCompleted
                ? 'border-purple-500/30 opacity-70'
                : 'border-purple-500/30 hover:border-purple-500/50'}
              ${justCompleted === 'bonus' ? 'ring-2 ring-purple-500/50 scale-[1.02]' : ''}
            `}
          >
            <div className="text-2xl w-10 h-10 flex items-center justify-center">
              {bonusTemplate.icon}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${bonusCompleted ? 'text-zinc-500 line-through' : 'text-purple-300'}`}>
                {bonusTemplate.title}
              </div>
              <div className="text-[10px] text-zinc-500">{bonusTemplate.description}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-xs font-bold ${bonusCompleted ? 'text-zinc-600' : 'text-purple-400'}`}>
                +{bonusTemplate.xp} XP
              </span>
              {bonusCompleted ? (
                <CheckCircle className="w-5 h-5 text-purple-400" />
              ) : (
                <Star className="w-4 h-4 text-purple-400" />
              )}
            </div>
          </button>
        ) : (
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-xs text-zinc-500">
              Reach a 5-day streak to unlock bonus missions
            </div>
            <div className="text-[10px] text-zinc-600 mt-1">
              {5 - streak.currentStreak} days to go
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-[#39ff14]">{progress.xp.toLocaleString()}</div>
          <div className="text-[10px] text-zinc-500">Total XP</div>
        </div>
        <div className="bg-[#0a0a0a] border border-orange-500/20 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-orange-400">{streak.currentStreak}</div>
          <div className="text-[10px] text-zinc-500">Current Streak</div>
        </div>
        <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-purple-400">{streak.longestStreak}</div>
          <div className="text-[10px] text-zinc-500">Best Streak</div>
        </div>
      </div>
    </div>
  );
}
