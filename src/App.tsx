import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineBanner from './components/OfflineBanner';
import { SkeletonList } from './components/SkeletonCard';
import LandingPage from './pages/LandingPage';
import DisclaimerPage from './pages/DisclaimerPage';
import JourneyPage from './pages/JourneyPage';
import LoginPage from './pages/LoginPage';

// Lazy-load pages
const RulesPage = lazy(() => import('./pages/LearnPage'));
const SectionPage = lazy(() => import('./pages/ModulePage'));
const StrategyPage = lazy(() => import('./pages/StrategyPage'));
const StrategiesPage = lazy(() => import('./pages/StrategiesPage'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const JunglePage = lazy(() => import('./pages/JunglePage'));
const EncyclopediaPage = lazy(() => import('./pages/EncyclopediaPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const POPCalculator = lazy(() => import('./components/tools/POPCalculator'));
const PositionSizer = lazy(() => import('./components/tools/PositionSizer'));
const ExpectedMoveCalc = lazy(() => import('./components/tools/ExpectedMoveCalc'));
const RiskRewardCalc = lazy(() => import('./components/tools/RiskRewardCalc'));
const RollingGuide = lazy(() => import('./components/tools/RollingGuide'));
const FirstTradeGuide = lazy(() => import('./components/tools/FirstTradeGuide'));
const OptionsGlossary = lazy(() => import('./components/tools/OptionsGlossary'));
const StrategyBuilder = lazy(() => import('./components/tools/StrategyBuilder'));
const StrategyComparison = lazy(() => import('./components/tools/StrategyComparison'));
const TradeJournal = lazy(() => import('./components/tools/TradeJournal'));
const GreeksVisualizer = lazy(() => import('./components/tools/GreeksVisualizer'));
const IVCrushCalc = lazy(() => import('./components/tools/IVCrushCalc'));
const PaperTrading = lazy(() => import('./components/tools/PaperTrading'));

function LoadingScreen() {
  return <SkeletonList count={6} />;
}

type AppScreen = 'landing' | 'disclaimer' | 'journey' | 'auth' | 'app';

function AppRoutes() {
  const { user, loading } = useAuth();

  // Check if user has previously accepted the disclaimer
  const [screen, setScreen] = useState<AppScreen>(() => {
    const accepted = localStorage.getItem('wsw-disclaimer-accepted');
    if (!accepted) return 'landing';
    const hasPath = localStorage.getItem('wsw-learning-path');
    return hasPath ? 'auth' : 'journey';
  });

  // Once user is authenticated, go straight to app
  useEffect(() => {
    if (user && screen === 'auth') {
      setScreen('app');
    }
  }, [user, screen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-4xl animate-pulse">🐒</div>
      </div>
    );
  }

  // Landing page
  if (screen === 'landing') {
    return <LandingPage onEnter={() => setScreen('disclaimer')} />;
  }

  // Disclaimer / liability agreement
  if (screen === 'disclaimer') {
    return (
      <DisclaimerPage
        onAccept={() => {
          localStorage.setItem('wsw-disclaimer-accepted', 'true');
          setScreen('journey');
        }}
        onBack={() => setScreen('landing')}
      />
    );
  }

  // Journey / learning path selector
  if (screen === 'journey') {
    return (
      <JourneyPage
        onSelectPath={(_pathId, _startTier) => {
          setScreen('auth');
        }}
        onSkip={() => {
          localStorage.setItem('wsw-learning-path', 'skipped');
          setScreen('auth');
        }}
      />
    );
  }

  // Auth screen (login/signup)
  if (!user) return <LoginPage />;

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-black">
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
            <Route path="/tools/pop" element={<POPCalculator />} />
            <Route path="/tools/position-size" element={<PositionSizer />} />
            <Route path="/tools/expected-move" element={<ExpectedMoveCalc />} />
            <Route path="/tools/risk-reward" element={<RiskRewardCalc />} />
            <Route path="/tools/rolling-guide" element={<RollingGuide />} />
            <Route path="/tools/first-trade" element={<FirstTradeGuide />} />
            <Route path="/tools/glossary" element={<OptionsGlossary />} />
            <Route path="/tools/strategy-builder" element={<StrategyBuilder />} />
            <Route path="/tools/strategy-comparison" element={<StrategyComparison />} />
            <Route path="/tools/trade-journal" element={<TradeJournal />} />
            <Route path="/tools/greeks" element={<GreeksVisualizer />} />
            <Route path="/tools/iv-crush" element={<IVCrushCalc />} />
            <Route path="/tools/paper-trading" element={<PaperTrading />} />

            {/* Tab 4: Jungle Academy */}
            <Route path="/jungle" element={<JunglePage />} />

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
