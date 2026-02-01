import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { useAuth } from './AuthContext';

interface ProgressContextType {
  completed: Set<string>;
  toggleComplete: (strategyId: string) => void;
  isCompleted: (strategyId: string) => boolean;
  loading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'wsw-progress';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

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

  return (
    <ProgressContext.Provider value={{ completed, toggleComplete, isCompleted, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
