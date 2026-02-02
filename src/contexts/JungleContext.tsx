import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import {
  JungleProgress,
  JungleBadge,
  RiskProfile,
  JungleViewMode,
  JungleQuizScore,
  XP_VALUES,
  XPSource,
} from '../types/jungle';
import { JUNGLE_BADGES, getLevelForXP, getXPProgress } from '../data/jungleBadges';
import { getStrategiesByAnimal } from '../data/jungleStrategies';

// ============ CONTEXT TYPE ============

interface JungleContextType {
  progress: JungleProgress;
  level: number;
  levelName: string;
  levelIcon: string;
  xpProgress: { current: number; needed: number; percentage: number };

  addXP: (amount: number, source: XPSource) => void;
  completeLesson: (lessonId: string) => void;
  completeStrategy: (strategyId: string) => void;
  recordQuizScore: (quizId: string, score: number, total: number) => void;

  riskProfile: RiskProfile | null;
  secondaryProfile: RiskProfile | null;
  setRiskProfile: (primary: RiskProfile, secondary: RiskProfile) => void;
  assessmentCompleted: boolean;

  earnedBadges: string[];
  pendingBadge: JungleBadge | null;
  dismissBadge: () => void;
  checkBadgeEligibility: () => void;

  currentView: JungleViewMode;
  setCurrentView: (view: JungleViewMode) => void;
  selectedAnimal: RiskProfile | null;
  setSelectedAnimal: (animal: RiskProfile | null) => void;
  selectedStrategy: string | null;
  setSelectedStrategy: (strategyId: string | null) => void;

  streakDays: number;
  isLoading: boolean;
  resetProgress: () => void;
  getAnimalProgress: (animalId: RiskProfile) => { completed: number; total: number; percentage: number };
}

// ============ DEFAULT PROGRESS ============

const getDefaultProgress = (): JungleProgress => ({
  xp: 0,
  level: 1,
  completedLessons: [],
  completedStrategies: [],
  quizScores: {},
  earnedBadges: [],
  unlockedItems: [],
  streakDays: 0,
  lastLoginDate: '',
  totalLoginDays: 0,
  riskProfile: null,
  secondaryProfile: null,
  assessmentCompleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const STORAGE_KEY = 'jungle-progress';

const loadFromStorage = (): JungleProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...getDefaultProgress(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return getDefaultProgress();
};

// ============ CONTEXT ============

const JungleContext = createContext<JungleContextType | undefined>(undefined);

export const JungleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<JungleProgress>(loadFromStorage);
  const [currentView, setCurrentView] = useState<JungleViewMode>('hub');
  const [selectedAnimal, setSelectedAnimal] = useState<RiskProfile | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [pendingBadge, setPendingBadge] = useState<JungleBadge | null>(null);

  const levelData = getLevelForXP(progress.xp);
  const xpProgress = getXPProgress(progress.xp);

  // ============ SAVE ============

  const saveProgress = useCallback((newProgress: JungleProgress) => {
    const updated = { ...newProgress, updatedAt: new Date().toISOString() };
    setProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  // ============ XP ============

  const addXP = useCallback((amount: number, _source: XPSource) => {
    setProgress(prev => {
      const p = { ...prev, xp: prev.xp + amount };
      saveProgress(p);
      return p;
    });
  }, [saveProgress]);

  // ============ COMPLETIONS ============

  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const p = { ...prev, completedLessons: [...prev.completedLessons, lessonId], xp: prev.xp + XP_VALUES.lesson_complete };
      saveProgress(p);
      return p;
    });
  }, [saveProgress]);

  const completeStrategy = useCallback((strategyId: string) => {
    setProgress(prev => {
      if (prev.completedStrategies.includes(strategyId)) return prev;
      const p = { ...prev, completedStrategies: [...prev.completedStrategies, strategyId], xp: prev.xp + XP_VALUES.strategy_complete };
      saveProgress(p);
      return p;
    });
  }, [saveProgress]);

  const recordQuizScore = useCallback((quizId: string, score: number, total: number) => {
    setProgress(prev => {
      const existing = prev.quizScores[quizId];
      const passed = score >= total * 0.7;
      const isPerfect = score === total;
      const isFirstPass = passed && (!existing || !existing.passed);

      let xpGained = 0;
      if (isFirstPass) xpGained += XP_VALUES.quiz_pass_first;
      else if (passed && existing?.passed) xpGained += XP_VALUES.quiz_pass_retry;
      if (isPerfect) xpGained += XP_VALUES.quiz_perfect;

      const newScore: JungleQuizScore = {
        score, total, passed,
        attempts: (existing?.attempts || 0) + 1,
        bestScore: Math.max(score, existing?.bestScore || 0),
        completedAt: new Date().toISOString(),
      };

      const p = { ...prev, quizScores: { ...prev.quizScores, [quizId]: newScore }, xp: prev.xp + xpGained };
      saveProgress(p);
      return p;
    });
  }, [saveProgress]);

  // ============ RISK PROFILE ============

  const setRiskProfile = useCallback((primary: RiskProfile, secondary: RiskProfile) => {
    setProgress(prev => {
      const p = {
        ...prev,
        riskProfile: primary,
        secondaryProfile: secondary,
        assessmentCompleted: true,
        xp: prev.xp + (prev.assessmentCompleted ? 0 : XP_VALUES.lesson_complete),
      };
      saveProgress(p);
      return p;
    });
  }, [saveProgress]);

  // ============ BADGES ============

  const awardBadge = useCallback((badgeId: string) => {
    const badge = JUNGLE_BADGES.find(b => b.id === badgeId);
    if (!badge) return;
    setProgress(prev => {
      if (prev.earnedBadges.includes(badgeId)) return prev;
      const p = { ...prev, earnedBadges: [...prev.earnedBadges, badgeId], xp: prev.xp + badge.xpReward };
      saveProgress(p);
      return p;
    });
    setPendingBadge(badge);
  }, [saveProgress]);

  const dismissBadge = useCallback(() => setPendingBadge(null), []);

  const checkBadgeEligibility = useCallback(() => {
    JUNGLE_BADGES.forEach(badge => {
      if (progress.earnedBadges.includes(badge.id)) return;
      let earned = false;
      const req = badge.requirement;

      switch (req.type) {
        case 'complete_animal': {
          const strategies = getStrategiesByAnimal(req.animalId);
          earned = strategies.length > 0 && strategies.every(s => progress.completedStrategies.includes(s.id));
          break;
        }
        case 'complete_all_animals': {
          const animals: RiskProfile[] = ['sloth', 'badger', 'monkey', 'cheetah'];
          earned = animals.every(a => {
            const strats = getStrategiesByAnimal(a);
            return strats.every(s => progress.completedStrategies.includes(s.id));
          });
          break;
        }
        case 'quiz_perfect':
          earned = Object.values(progress.quizScores).filter(q => q.score === q.total).length >= req.count;
          break;
        case 'quiz_pass':
          earned = Object.values(progress.quizScores).filter(q => q.passed).length >= req.count;
          break;
        case 'streak':
          earned = progress.streakDays >= req.days;
          break;
        case 'xp_earned':
          earned = progress.xp >= req.amount;
          break;
        case 'level_reached':
          earned = getLevelForXP(progress.xp).level >= req.level;
          break;
        case 'lessons_completed':
          earned = progress.completedLessons.length >= req.count;
          break;
        case 'time_of_day': {
          const hour = new Date().getHours();
          earned = req.comparison === 'after' ? hour >= req.hour : hour < req.hour;
          break;
        }
        case 'custom':
          if (req.check === 'assessment_completed') earned = progress.assessmentCompleted;
          break;
      }

      if (earned) awardBadge(badge.id);
    });
  }, [progress, awardBadge]);

  // ============ STREAK ============

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastLoginDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const newStreak = progress.lastLoginDate === yesterdayStr ? progress.streakDays + 1 : 1;
    const xpGained = XP_VALUES.daily_login + (XP_VALUES.streak_bonus * Math.min(newStreak, 30));

    const p = {
      ...progress,
      streakDays: newStreak,
      lastLoginDate: today,
      totalLoginDays: progress.totalLoginDays + 1,
      xp: progress.xp + xpGained,
    };
    saveProgress(p);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Check badges when progress changes
  useEffect(() => {
    checkBadgeEligibility();
  }, [progress.completedStrategies.length, progress.completedLessons.length, progress.xp, progress.streakDays]); // eslint-disable-line react-hooks/exhaustive-deps

  // ============ UTILITY ============

  const resetProgress = useCallback(() => {
    const defaultP = getDefaultProgress();
    setProgress(defaultP);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getAnimalProgress = useCallback((animalId: RiskProfile) => {
    const strategies = getStrategiesByAnimal(animalId);
    const completed = strategies.filter(s => progress.completedStrategies.includes(s.id)).length;
    const total = strategies.length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }, [progress.completedStrategies]);

  const value: JungleContextType = {
    progress, level: levelData.level, levelName: levelData.name, levelIcon: levelData.icon, xpProgress,
    addXP, completeLesson, completeStrategy, recordQuizScore,
    riskProfile: progress.riskProfile, secondaryProfile: progress.secondaryProfile, setRiskProfile, assessmentCompleted: progress.assessmentCompleted,
    earnedBadges: progress.earnedBadges, pendingBadge, dismissBadge, checkBadgeEligibility,
    currentView, setCurrentView, selectedAnimal, setSelectedAnimal, selectedStrategy, setSelectedStrategy,
    streakDays: progress.streakDays, isLoading: false, resetProgress, getAnimalProgress,
  };

  return <JungleContext.Provider value={value}>{children}</JungleContext.Provider>;
};

export const useJungle = (): JungleContextType => {
  const ctx = useContext(JungleContext);
  if (!ctx) throw new Error('useJungle must be used within JungleProvider');
  return ctx;
};

export default JungleContext;
