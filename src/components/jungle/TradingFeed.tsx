import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Heart, Trash2, Send, TrendingUp, TrendingDown, Plus, X } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

// ============ TYPES ============

interface FeedPost {
  id: string;
  symbol: string;
  direction: 'bullish' | 'bearish';
  strategy: string;
  note: string;
  username: string;
  avatar: string;
  timestamp: number;
  likes: number;
  likedByUser: boolean;
  isOwn: boolean;
}

interface FeedState {
  posts: FeedPost[];
  lastSeedDate: string;
}

// ============ SEED DATA ============

const AVATAR_EMOJIS = ['🦊', '🐺', '🦁', '🐯', '🦅', '🐻', '🐸', '🐙', '🦈', '🐊', '🦎', '🐒', '🦉', '🐝', '🦇'];

const STRATEGIES = [
  'Covered Call',
  'Cash-Secured Put',
  'Iron Condor',
  'Bull Call Spread',
  'Bear Put Spread',
  'Long Straddle',
  'Butterfly Spread',
  'Collar Strategy',
  'Vertical Spread',
  'Calendar Spread',
];

const SEED_POSTS: Omit<FeedPost, 'id' | 'timestamp' | 'likedByUser' | 'isOwn'>[] = [
  {
    symbol: 'SPY',
    direction: 'bullish',
    strategy: 'Iron Condor',
    note: 'Just opened a 45 DTE iron condor on SPY. Collected $2.40 in premium. Love how this plays in low-vol environments. 🎯',
    username: 'CheetahTrader_99',
    avatar: '🐆',
    likes: 24,
  },
  {
    symbol: 'AAPL',
    direction: 'bearish',
    strategy: 'Cash-Secured Put',
    note: 'Selling CSPs on AAPL at the $180 strike. If I get assigned, I\'m happy to own it at that price. Theta gang for life. 😴',
    username: 'SlothPremium',
    avatar: '🦥',
    likes: 41,
  },
  {
    symbol: 'TSLA',
    direction: 'bullish',
    strategy: 'Long Straddle',
    note: 'IV rank on TSLA just hit 85th percentile before earnings. Going with a straddle — don\'t care which way, just need movement! ⚡',
    username: 'OwlAnalytics',
    avatar: '🦉',
    likes: 33,
  },
  {
    symbol: 'NVDA',
    direction: 'bullish',
    strategy: 'Bull Call Spread',
    note: 'NVDA bull call spread paying off big. Bought the 120/130 spread for next month. AI hype is real and so are the profits. 🚀',
    username: 'BullRunBruno',
    avatar: '🐂',
    likes: 56,
  },
  {
    symbol: 'AMZN',
    direction: 'bearish',
    strategy: 'Bear Put Spread',
    note: 'Opened a bear put spread on AMZN ahead of earnings. Risk/reward is great — risking $200 to make $800. Let\'s see. 🐻',
    username: 'BearishBadger',
    avatar: '🦡',
    likes: 18,
  },
];

// ============ HELPERS ============

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getUsername(): string {
  try {
    const saved = localStorage.getItem('wsw_username');
    if (saved) return saved;
  } catch { /* ignore */ }
  return 'Anonymous Ape';
}

function getAvatar(): string {
  try {
    const saved = localStorage.getItem('wsw_avatar');
    if (saved) return saved;
  } catch { /* ignore */ }
  return AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)];
}

function loadFeedState(): FeedState | null {
  try {
    const raw = localStorage.getItem('wsw_trading_feed');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveFeedState(state: FeedState): void {
  localStorage.setItem('wsw_trading_feed', JSON.stringify(state));
}

function initFeed(): FeedPost[] {
  const saved = loadFeedState();
  const today = new Date().toISOString().split('T')[0];

  if (saved && saved.posts.length > 0) {
    return saved.posts;
  }

  // Seed with sample posts (spread over past 12 hours)
  const now = Date.now();
  return SEED_POSTS.map((post, i) => ({
    ...post,
    id: generateId() + i,
    timestamp: now - (i + 1) * 2 * 60 * 60 * 1000, // 2h intervals
    likedByUser: false,
    isOwn: false,
  }));
}

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(ts).toLocaleDateString();
}

// ============ COMPONENT ============

export default function TradingFeed() {
  const { setCurrentView, addXP } = useJungle();
  const [posts, setPosts] = useState<FeedPost[]>(initFeed);
  const [showForm, setShowForm] = useState(false);
  const [formSymbol, setFormSymbol] = useState('');
  const [formDirection, setFormDirection] = useState<'bullish' | 'bearish'>('bullish');
  const [formStrategy, setFormStrategy] = useState(STRATEGIES[0]);
  const [formNote, setFormNote] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Persist
  useEffect(() => {
    const state: FeedState = {
      posts,
      lastSeedDate: new Date().toISOString().split('T')[0],
    };
    saveFeedState(state);
  }, [posts]);

  const handleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newLiked = !p.likedByUser;
        if (newLiked) addXP(5, 'trade_liked');
        return {
          ...p,
          likes: newLiked ? p.likes + 1 : p.likes - 1,
          likedByUser: newLiked,
        };
      }
      return p;
    }));
  }, [addXP]);

  const handleDelete = useCallback((postId: string) => {
    if (deleteConfirm === postId) {
      setPosts(prev => prev.filter(p => p.id !== postId));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(postId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  }, [deleteConfirm]);

  const handleSubmit = useCallback(() => {
    if (!formSymbol.trim() || !formNote.trim()) return;

    const newPost: FeedPost = {
      id: generateId(),
      symbol: formSymbol.toUpperCase().trim(),
      direction: formDirection,
      strategy: formStrategy,
      note: formNote.trim(),
      username: getUsername(),
      avatar: getAvatar(),
      timestamp: Date.now(),
      likes: 0,
      likedByUser: false,
      isOwn: true,
    };

    setPosts(prev => [newPost, ...prev]);
    addXP(25, 'trade_shared');

    // Reset form
    setFormSymbol('');
    setFormNote('');
    setFormDirection('bullish');
    setFormStrategy(STRATEGIES[0]);
    setShowForm(false);
  }, [formSymbol, formDirection, formStrategy, formNote, addXP]);

  const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView('hub')}
          className="p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-zinc-100">Trading Feed</h1>
          <p className="text-xs text-zinc-500">Share & discover trade ideas</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-all active:scale-[0.98]
            ${showForm
              ? 'border-red-500/30 bg-red-500/10'
              : 'border-[#39ff14]/30 bg-[#39ff14]/10'}
          `}
        >
          {showForm ? (
            <X className="w-5 h-5 text-red-400" />
          ) : (
            <Plus className="w-5 h-5 text-[#39ff14]" />
          )}
        </button>
      </div>

      {/* Post form */}
      {showForm && (
        <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-bold text-[#39ff14] uppercase tracking-wider">New Trade Idea</div>

          {/* Symbol */}
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 block">Ticker Symbol</label>
            <input
              type="text"
              value={formSymbol}
              onChange={(e) => setFormSymbol(e.target.value.slice(0, 5))}
              placeholder="e.g. SPY, AAPL, TSLA"
              className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-[#39ff14]/50 focus:outline-none"
              maxLength={5}
            />
          </div>

          {/* Direction */}
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 block">Direction</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormDirection('bullish')}
                className={`min-h-[44px] rounded-lg border text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-all
                  ${formDirection === 'bullish'
                    ? 'border-green-500/50 bg-green-500/15 text-green-400'
                    : 'border-zinc-800 text-zinc-500'}
                `}
              >
                <TrendingUp className="w-4 h-4" /> Bullish
              </button>
              <button
                onClick={() => setFormDirection('bearish')}
                className={`min-h-[44px] rounded-lg border text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-all
                  ${formDirection === 'bearish'
                    ? 'border-red-500/50 bg-red-500/15 text-red-400'
                    : 'border-zinc-800 text-zinc-500'}
                `}
              >
                <TrendingDown className="w-4 h-4" /> Bearish
              </button>
            </div>
          </div>

          {/* Strategy */}
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 block">Strategy</label>
            <select
              value={formStrategy}
              onChange={(e) => setFormStrategy(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 focus:border-[#39ff14]/50 focus:outline-none appearance-none"
            >
              {STRATEGIES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 block">Note</label>
            <textarea
              value={formNote}
              onChange={(e) => setFormNote(e.target.value.slice(0, 280))}
              placeholder="Share your thesis, setup, or insight..."
              rows={3}
              className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-[#39ff14]/50 focus:outline-none resize-none"
              maxLength={280}
            />
            <div className="text-right text-[10px] text-zinc-600 mt-0.5">{formNote.length}/280</div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!formSymbol.trim() || !formNote.trim()}
            className={`w-full min-h-[44px] rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all
              ${formSymbol.trim() && formNote.trim()
                ? 'bg-[#39ff14] text-black'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}
            `}
          >
            <Send className="w-4 h-4" /> Post Trade Idea
          </button>
        </div>
      )}

      {/* Feed stats */}
      <div className="flex items-center gap-2 text-[10px] text-zinc-500">
        <span>{sortedPosts.length} trade ideas</span>
        <span>•</span>
        <span>{sortedPosts.filter(p => p.isOwn).length} yours</span>
      </div>

      {/* Feed */}
      <div ref={feedRef} className="space-y-3">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className={`bg-[#0a0a0a] border rounded-xl p-4 transition-all
              ${post.isOwn ? 'border-[#39ff14]/20' : 'border-[#39ff14]/10'}
            `}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xl w-8 h-8 flex items-center justify-center">{post.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-zinc-200 truncate">{post.username}</span>
                  {post.isOwn && (
                    <span className="text-[8px] px-1 py-0.5 rounded bg-[#39ff14]/15 text-[#39ff14] font-bold shrink-0">YOU</span>
                  )}
                </div>
                <div className="text-[10px] text-zinc-500">{timeAgo(post.timestamp)}</div>
              </div>
              {/* Direction badge */}
              <span className={`text-[10px] px-2 py-1 rounded-full font-medium flex items-center gap-1 shrink-0
                ${post.direction === 'bullish'
                  ? 'bg-green-500/15 text-green-400'
                  : 'bg-red-500/15 text-red-400'}
              `}>
                {post.direction === 'bullish' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {post.symbol}
              </span>
            </div>

            {/* Strategy tag */}
            <div className="mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#39ff14]/10 text-[#39ff14]">
                {post.strategy}
              </span>
            </div>

            {/* Note */}
            <p className="text-sm text-zinc-300 mb-3 leading-relaxed">{post.note}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 text-zinc-500">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 text-xs min-h-[44px] min-w-[44px] justify-center active:scale-[0.98] transition-all
                  ${post.likedByUser ? 'text-red-400' : 'text-zinc-500'}
                `}
              >
                <Heart className={`w-4 h-4 ${post.likedByUser ? 'fill-current' : ''}`} />
                {post.likes > 0 && <span>{post.likes}</span>}
              </button>

              {post.isOwn && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className={`flex items-center gap-1.5 text-xs min-h-[44px] min-w-[44px] justify-center active:scale-[0.98] transition-all
                    ${deleteConfirm === post.id ? 'text-red-400' : 'text-zinc-600'}
                  `}
                >
                  <Trash2 className="w-4 h-4" />
                  {deleteConfirm === post.id && <span className="text-[10px]">Tap again</span>}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📭</div>
          <div className="text-sm text-zinc-400">No trade ideas yet</div>
          <div className="text-[10px] text-zinc-600 mt-1">Be the first to share!</div>
        </div>
      )}
    </div>
  );
}
