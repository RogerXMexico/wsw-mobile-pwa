import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineBanner from './components/OfflineBanner';
import { SkeletonList } from './components/SkeletonCard';
import LoginPage from './pages/LoginPage';

// Lazy-load pages
const RulesPage = lazy(() => import('./pages/LearnPage'));
const SectionPage = lazy(() => import('./pages/ModulePage'));
const StrategyPage = lazy(() => import('./pages/StrategyPage'));
const StrategiesPage = lazy(() => import('./pages/StrategiesPage'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const SocialPage = lazy(() => import('./pages/SocialPage'));
const EncyclopediaPage = lazy(() => import('./pages/EncyclopediaPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));

function LoadingScreen() {
  return <SkeletonList count={6} />;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-4xl animate-pulse">🐒</div>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-slate-950">
        <OfflineBanner />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Tab 1: Rules of the Jungle */}
            <Route path="/" element={<RulesPage />} />
            <Route path="/section/:moduleId" element={<SectionPage />} />
            <Route path="/strategy/:strategyId" element={<StrategyPage />} />

            {/* Tab 2: Strategies */}
            <Route path="/strategies" element={<StrategiesPage />} />

            {/* Tab 3: Tools */}
            <Route path="/tools" element={<ToolsPage />} />

            {/* Tab 4: Social */}
            <Route path="/social" element={<SocialPage />} />

            {/* Utility pages */}
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
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
