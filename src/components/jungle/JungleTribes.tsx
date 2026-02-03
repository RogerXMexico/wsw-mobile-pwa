import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Users, Trophy, Crown, Swords, ChevronRight, Check } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';

// ============ TYPES ============

interface Tribe {
  id: string;
  name: string;
  emoji: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  motto: string;
  style: string;
  baseMembers: number;
  baseXP: number;
}

interface LeaderboardMember {
  name: string;
  emoji: string;
  xp: number;
}

interface TribeState {
  selectedTribe: string | null;
  joinedAt: string | null;
}

// ============ TRIBE DATA ============

const TRIBES: Tribe[] = [
  {
    id: 'bulls',
    name: 'The Bulls',
    emoji: '🐂',
    color: '#22c55e',
    colorBg: 'bg-green-500/10',
    colorBorder: 'border-green-500/30',
    motto: '"Fortune favors the bold."',
    style: 'Aggressive Growth · Bullish Conviction',
    baseMembers: 1847,
    baseXP: 482300,
  },
  {
    id: 'bears',
    name: 'The Bears',
    emoji: '🐻',
    color: '#ef4444',
    colorBg: 'bg-red-500/10',
    colorBorder: 'border-red-500/30',
    motto: '"Patience is profitable."',
    style: 'Defensive Hedging · Risk Management',
    baseMembers: 1523,
    baseXP: 398700,
  },
  {
    id: 'wolves',
    name: 'The Wolves',
    emoji: '🐺',
    color: '#a855f7',
    colorBg: 'bg-purple-500/10',
    colorBorder: 'border-purple-500/30',
    motto: '"The pack hunts together."',
    style: 'Strategic Precision · Pack Mentality',
    baseMembers: 1291,
    baseXP: 367500,
  },
  {
    id: 'eagles',
    name: 'The Eagles',
    emoji: '🦅',
    color: '#f59e0b',
    colorBg: 'bg-amber-500/10',
    colorBorder: 'border-amber-500/30',
    motto: '"See further, act faster."',
    style: 'Analytical Edge · Bird\'s Eye View',
    baseMembers: 1108,
    baseXP: 341200,
  },
];

// Fun animal names for leaderboard
const ANIMAL_NAMES = [
  'AlphaApe', 'BetaBison', 'GammaGorilla', 'DeltaDeer', 'EpsilonElk',
  'ZetaZebra', 'ThetaTiger', 'IotaImpala', 'KappaKoala', 'LambdaLynx',
  'MuMongoose', 'NuNarwhal', 'OmicronOtter', 'PiPenguin', 'RhoRhino',
  'SigmaShark', 'TauTurtle', 'PhiFirefly', 'ChiCheetah', 'PsiPanther',
];

const ANIMAL_EMOJIS = ['🦍', '🦬', '🦧', '🦌', '🫎', '🦓', '🐯', '🐐', '🐨', '🐱', '🦡', '🐳', '🦦', '🐧', '🦏', '🦈', '🐢', '🪲', '🐆', '🐈‍⬛'];

const WEEKLY_CHALLENGES = [
  { title: 'XP Stampede', desc: 'Your tribe must collectively earn 10,000 XP this week', icon: '⚡' },
  { title: 'Quiz Blitz', desc: 'Tribe members pass 50 quizzes combined', icon: '🎯' },
  { title: 'Streak Warriors', desc: 'Get 20 tribe members to a 3+ day streak', icon: '🔥' },
  { title: 'Strategy Masters', desc: 'Complete 30 strategy lessons as a tribe', icon: '📊' },
];

// ============ HELPERS ============

function dateSeed(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getWeekString(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${weekNum}`;
}

function getSimulatedMembers(tribe: Tribe): number {
  const day = dateSeed(new Date().toISOString().split('T')[0] + tribe.id);
  return tribe.baseMembers + (day % 47) - 20;
}

function getSimulatedXP(tribe: Tribe): number {
  const day = dateSeed(new Date().toISOString().split('T')[0] + tribe.id + 'xp');
  return tribe.baseXP + (day % 5000) - 2000;
}

function generateLeaderboard(tribeId: string): LeaderboardMember[] {
  const seed = dateSeed(getWeekString() + tribeId);
  const members: LeaderboardMember[] = [];
  for (let i = 0; i < 10; i++) {
    const nameIdx = (seed + i * 7) % ANIMAL_NAMES.length;
    const emojiIdx = (seed + i * 3) % ANIMAL_EMOJIS.length;
    members.push({
      name: ANIMAL_NAMES[nameIdx],
      emoji: ANIMAL_EMOJIS[emojiIdx],
      xp: Math.floor(3000 - i * 250 + (dateSeed(tribeId + i.toString()) % 200)),
    });
  }
  return members.sort((a, b) => b.xp - a.xp);
}

function getWeeklyChallenge(): typeof WEEKLY_CHALLENGES[number] {
  const week = dateSeed(getWeekString());
  return WEEKLY_CHALLENGES[week % WEEKLY_CHALLENGES.length];
}

function loadTribeState(): TribeState {
  try {
    const raw = localStorage.getItem('wsw_tribe');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { selectedTribe: null, joinedAt: null };
}

function saveTribeState(state: TribeState): void {
  localStorage.setItem('wsw_tribe', JSON.stringify(state));
}

// ============ COMPONENT ============

export default function JungleTribes() {
  const { setCurrentView, progress, addXP } = useJungle();
  const [tribeState, setTribeState] = useState<TribeState>(loadTribeState);
  const [expandedTribe, setExpandedTribe] = useState<string | null>(tribeState.selectedTribe);
  const [confirmJoin, setConfirmJoin] = useState<string | null>(null);

  const weeklyChallenge = useMemo(() => getWeeklyChallenge(), []);
  const userTribe = TRIBES.find(t => t.id === tribeState.selectedTribe);

  const joinTribe = useCallback((tribeId: string) => {
    const state: TribeState = {
      selectedTribe: tribeId,
      joinedAt: new Date().toISOString(),
    };
    setTribeState(state);
    saveTribeState(state);
    setConfirmJoin(null);
    setExpandedTribe(tribeId);
    addXP(50, 'tribe_bonus');
  }, [addXP]);

  const toggleExpand = useCallback((tribeId: string) => {
    setExpandedTribe(prev => prev === tribeId ? null : tribeId);
  }, []);

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
          <h1 className="text-lg font-bold text-zinc-100">Jungle Tribes</h1>
          <p className="text-xs text-zinc-500">Join a tribe and compete together</p>
        </div>
        {userTribe && (
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border"
            style={{ borderColor: userTribe.color + '50', backgroundColor: userTribe.color + '15' }}
          >
            <span className="text-base">{userTribe.emoji}</span>
            <span className="text-xs font-bold" style={{ color: userTribe.color }}>{userTribe.name}</span>
          </div>
        )}
      </div>

      {/* Weekly Challenge */}
      <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Swords className="w-4 h-4 text-[#39ff14]" />
          <span className="text-xs font-bold text-[#39ff14] uppercase tracking-wider">Weekly Challenge</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{weeklyChallenge.icon}</div>
          <div>
            <div className="text-sm font-semibold text-zinc-200">{weeklyChallenge.title}</div>
            <div className="text-[10px] text-zinc-500">{weeklyChallenge.desc}</div>
          </div>
        </div>
      </div>

      {/* Tribes */}
      <div className="space-y-3">
        {TRIBES.map((tribe, idx) => {
          const isUserTribe = tribeState.selectedTribe === tribe.id;
          const isExpanded = expandedTribe === tribe.id;
          const members = getSimulatedMembers(tribe);
          const totalXP = getSimulatedXP(tribe) + (isUserTribe ? progress.xp : 0);
          const leaderboard = isExpanded ? generateLeaderboard(tribe.id) : [];

          return (
            <div key={tribe.id} className="overflow-hidden">
              {/* Tribe card */}
              <button
                onClick={() => toggleExpand(tribe.id)}
                className={`w-full text-left bg-[#0a0a0a] border rounded-xl p-4 transition-all duration-200 active:scale-[0.98]
                  ${isUserTribe ? tribe.colorBorder + ' ring-1' : 'border-[#39ff14]/10'}
                `}
                style={isUserTribe ? { boxShadow: `0 0 0 1px ${tribe.color}30` } : {}}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border shrink-0"
                    style={{ borderColor: tribe.color + '40', backgroundColor: tribe.color + '10' }}
                  >
                    {tribe.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-200">{tribe.name}</span>
                      {isUserTribe && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{ backgroundColor: tribe.color + '20', color: tribe.color }}>
                          YOUR TRIBE
                        </span>
                      )}
                      {idx === 0 && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">{tribe.style}</div>
                    <div className="text-[10px] italic text-zinc-600 mt-0.5">{tribe.motto}</div>
                    <div className="flex items-center gap-4 mt-1.5">
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {members.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-medium" style={{ color: tribe.color }}>
                        {totalXP.toLocaleString()} XP
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="text-xl font-bold text-zinc-600">#{idx + 1}</div>
                    <ChevronRight className={`w-4 h-4 text-zinc-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div
                  className="mt-1 bg-[#0a0a0a] border rounded-xl p-4 space-y-4 animate-in slide-in-from-top-2 duration-200"
                  style={{ borderColor: tribe.color + '20' }}
                >
                  {/* Join button */}
                  {!isUserTribe && (
                    <div>
                      {confirmJoin === tribe.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => joinTribe(tribe.id)}
                            className="flex-1 min-h-[44px] rounded-xl font-bold text-sm text-black active:scale-[0.98] transition-transform"
                            style={{ backgroundColor: tribe.color }}
                          >
                            Confirm — Join {tribe.name}
                          </button>
                          <button
                            onClick={() => setConfirmJoin(null)}
                            className="min-h-[44px] px-4 rounded-xl border border-zinc-700 text-zinc-400 text-sm active:scale-[0.98] transition-transform"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmJoin(tribe.id)}
                          className="w-full min-h-[44px] rounded-xl font-bold text-sm border active:scale-[0.98] transition-transform"
                          style={{ borderColor: tribe.color + '50', color: tribe.color }}
                        >
                          {tribeState.selectedTribe ? `Switch to ${tribe.name}` : `Join ${tribe.name}`}
                        </button>
                      )}
                    </div>
                  )}

                  {isUserTribe && (
                    <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: tribe.color + '10' }}>
                      <Check className="w-4 h-4" style={{ color: tribe.color }} />
                      <span className="text-xs" style={{ color: tribe.color }}>
                        Joined {tribeState.joinedAt ? new Date(tribeState.joinedAt).toLocaleDateString() : 'today'}
                      </span>
                    </div>
                  )}

                  {/* Leaderboard */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-3.5 h-3.5" style={{ color: tribe.color }} />
                      <span className="text-xs font-bold text-zinc-300">Tribe Leaderboard</span>
                    </div>
                    <div className="space-y-1">
                      {leaderboard.map((member, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                          style={i < 3 ? { backgroundColor: tribe.color + '08' } : {}}
                        >
                          <span className={`text-[10px] w-5 text-center font-bold ${i < 3 ? '' : 'text-zinc-600'}`}
                            style={i < 3 ? { color: tribe.color } : {}}>
                            {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                          </span>
                          <span className="text-sm">{member.emoji}</span>
                          <span className="text-xs text-zinc-300 flex-1">{member.name}</span>
                          <span className="text-[10px] font-medium" style={{ color: tribe.color }}>
                            {member.xp.toLocaleString()} XP
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tribe stats summary */}
      {userTribe && (
        <div className="bg-[#0a0a0a] border rounded-xl p-4" style={{ borderColor: userTribe.color + '20' }}>
          <div className="text-xs font-bold text-zinc-300 mb-3">Your Tribe Stats</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: userTribe.color }}>
                {getSimulatedMembers(userTribe).toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-500">Members</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: userTribe.color }}>
                {(getSimulatedXP(userTribe) + progress.xp).toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-500">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: userTribe.color }}>
                #{TRIBES.findIndex(t => t.id === userTribe.id) + 1}
              </div>
              <div className="text-[10px] text-zinc-500">Rank</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
