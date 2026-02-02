import { JungleProvider, useJungle } from '../contexts/JungleContext';
import JungleHub from '../components/jungle/JungleHub';
import MentorGrid from '../components/jungle/MentorGrid';
import RiskAssessmentQuiz from '../components/jungle/RiskAssessmentQuiz';
import AnimalDetail from '../components/jungle/AnimalDetail';
import StrategyLesson from '../components/jungle/StrategyLesson';
import BadgeShowcase from '../components/jungle/BadgeShowcase';
import Leaderboard from '../components/jungle/Leaderboard';
import DailyMissions from '../components/jungle/DailyMissions';
import JungleTribes from '../components/jungle/JungleTribes';
import TradingFeed from '../components/jungle/TradingFeed';
import ChallengePaths from '../components/jungle/ChallengePaths';
import AchievementToast from '../components/jungle/AchievementToast';

function JungleContent() {
  const { currentView, selectedAnimal, selectedStrategy, pendingBadge, dismissBadge } = useJungle();

  const renderView = () => {
    switch (currentView) {
      case 'assessment':
        return <RiskAssessmentQuiz />;
      case 'mentors':
        return <MentorGrid />;
      case 'animal-detail':
        return selectedAnimal ? <AnimalDetail animalId={selectedAnimal} /> : <JungleHub />;
      case 'strategy-lesson':
        return selectedStrategy ? <StrategyLesson strategyId={selectedStrategy} /> : <JungleHub />;
      case 'badges':
        return <BadgeShowcase />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'daily-missions':
        return <DailyMissions />;
      case 'jungle-tribes':
        return <JungleTribes />;
      case 'trading-feed':
        return <TradingFeed />;
      case 'challenge-paths':
        return <ChallengePaths />;
      default:
        return <JungleHub />;
    }
  };

  return (
    <div className="px-4 pb-20" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
      {renderView()}
      {pendingBadge && <AchievementToast badge={pendingBadge} onDismiss={dismissBadge} />}
    </div>
  );
}

export default function JunglePage() {
  return (
    <JungleProvider>
      <JungleContent />
    </JungleProvider>
  );
}
