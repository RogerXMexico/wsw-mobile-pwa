import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { useAuth } from './AuthContext';
import { Strategy } from '../types';
import { LEARNING_PATHS, getPathModules } from '../data/learningPaths';

interface ProgressContextType {
  completed: Set<string>;
  toggleComplete: (strategyId: string) => void;
  isCompleted: (strategyId: string) => boolean;
  loading: boolean;
  selectedPath: string | null;
  setSelectedPath: (pathId: string) => void;
  getNextRecommended: () => Strategy | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'wsw-progress';
const PATH_STORAGE_KEY = 'wsw-learning-path';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedPath, setSelectedPathState] = useState<string | null>(() => {
    const saved = localStorage.getItem(PATH_STORAGE_KEY);
    // 'skipped' means user skipped the journey page — treat as no path
    return saved && saved !== 'skipped' ? saved : null;
  });

  // Load progress
  useEffect(() => {
    async function loadProgress() {
      // Try Supabase first
      if (user && isSupabaseConfigured()) {
        try {
          const { data } = await supabase
            .from('user_progress')
            .select('strategy_id')
            .eq('user_id', user.id);
          if (data) {
            setCompleted(new Set(data.map(d => d.strategy_id)));
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Failed to load progress from Supabase, using local:', e);
        }
      }

      // Fall back to localStorage
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          setCompleted(new Set(JSON.parse(saved)));
        } catch {}
      }
      setLoading(false);
    }

    loadProgress();
  }, [user]);

  // Save to localStorage as backup
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...completed]));
    }
  }, [completed, loading]);

  const toggleComplete = useCallback(async (strategyId: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(strategyId)) {
        next.delete(strategyId);
      } else {
        next.add(strategyId);
      }
      return next;
    });

    // Sync to Supabase
    if (user && isSupabaseConfigured()) {
      const isNowCompleted = !completed.has(strategyId);
      try {
        if (isNowCompleted) {
          await supabase.from('user_progress').upsert({
            user_id: user.id,
            strategy_id: strategyId,
            completed_at: new Date().toISOString(),
          });
        } else {
          await supabase.from('user_progress')
            .delete()
            .eq('user_id', user.id)
            .eq('strategy_id', strategyId);
        }
      } catch (e) {
        console.warn('Failed to sync progress to Supabase:', e);
      }
    }
  }, [user, completed]);

  const isCompleted = useCallback((strategyId: string) => completed.has(strategyId), [completed]);

  const setSelectedPath = useCallback((pathId: string) => {
    if (pathId) {
      setSelectedPathState(pathId);
      localStorage.setItem(PATH_STORAGE_KEY, pathId);
    } else {
      setSelectedPathState(null);
      localStorage.removeItem(PATH_STORAGE_KEY);
    }
  }, []);

  const getNextRecommended = useCallback((): Strategy | null => {
    if (!selectedPath) return null;
    const path = LEARNING_PATHS.find(p => p.id === selectedPath);
    if (!path) return null;

    const modules = getPathModules(path);
    for (const strategy of modules) {
      if (!completed.has(strategy.id)) {
        return strategy;
      }
    }
    return null;
  }, [selectedPath, completed]);

  return (
    <ProgressContext.Provider
      value={{
        completed,
        toggleComplete,
        isCompleted,
        loading,
        selectedPath,
        setSelectedPath,
        getNextRecommended,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
