import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

const SAMPLE_POSTS = [
  {
    id: 1,
    user: 'CheetahTrader_99',
    avatar: '🐆',
    time: '2h ago',
    text: 'Just closed my first iron condor on SPY! 45 DTE, collected $2.40 in premium. 🎯',
    likes: 24,
    comments: 8,
    strategy: 'Iron Condor',
  },
  {
    id: 2,
    user: 'SlothPremium',
    avatar: '🦥',
    time: '4h ago',
    text: 'Theta gang checking in. Sold CSPs on AAPL at the $180 strike. Gonna nap until expiration. 😴',
    likes: 41,
    comments: 12,
    strategy: 'Cash-Secured Put',
  },
  {
    id: 3,
    user: 'OwlAnalytics',
    avatar: '🦉',
    time: '6h ago',
    text: 'IV rank on TSLA just hit 85th percentile. Perfect setup for a short strangle if you can handle the margin. Data doesn\'t lie. 📊',
    likes: 33,
    comments: 15,
    strategy: 'Short Strangle',
  },
  {
    id: 4,
    user: 'BullRunBruno',
    avatar: '🐂',
    time: '8h ago',
    text: 'NVDA bull call spread paying off. Bought the 120/130 for next month. Bears? What bears? 🚀',
    likes: 56,
    comments: 22,
    strategy: 'Bull Call Spread',
  },
];

export default function TradingFeed() {
  const { setCurrentView } = useJungle();

  return (
    <div className="pb-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrentView('hub')} className="p-2 -ml-2 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-zinc-100">Trading Feed</h1>
          <p className="text-xs text-zinc-500">Learn from the community</p>
        </div>
      </div>

      <div className="space-y-3">
        {SAMPLE_POSTS.map((post) => (
          <div key={post.id} className="bg-[#0a0a0a] border border-[#39ff14]/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xl">{post.avatar}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-zinc-200">{post.user}</div>
                <div className="text-[10px] text-zinc-500">{post.time}</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#39ff14]/10 text-[#39ff14]">
                {post.strategy}
              </span>
            </div>
            <p className="text-sm text-zinc-300 mb-3">{post.text}</p>
            <div className="flex items-center gap-6 text-zinc-500">
              <button className="flex items-center gap-1 text-xs active:scale-95">
                <Heart className="w-4 h-4" /> {post.likes}
              </button>
              <button className="flex items-center gap-1 text-xs active:scale-95">
                <MessageCircle className="w-4 h-4" /> {post.comments}
              </button>
              <button className="flex items-center gap-1 text-xs active:scale-95">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-zinc-600 pt-4">
        🚧 Social feed coming soon — share your trades!
      </div>
    </div>
  );
}
