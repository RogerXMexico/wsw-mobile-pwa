import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';

// Lazy-load heavy pages (strategy data is 13K lines)
const LearnPage = lazy(() => import('./pages/LearnPage'));
const ModulePage = lazy(() => import('./pages/ModulePage'));
const StrategyPage = lazy(() => import('./pages/StrategyPage'));
const StrategiesPage = lazy(() => import('./pages/StrategiesPage'));
const EncyclopediaPage = lazy(() => import('./pages/EncyclopediaPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-4xl animate-pulse">🐒</div>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) return <LoginPage />;

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-slate-950">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LearnPage />} />
            <Route path="/module/:moduleId" element={<ModulePage />} />
            <Route path="/strategy/:strategyId" element={<StrategyPage />} />
            <Route path="/strategies" element={<StrategiesPage />} />
            <Route path="/encyclopedia" element={<EncyclopediaPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <BottomNav />
      </div>
    </ProgressProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
