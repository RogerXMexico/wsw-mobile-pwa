import { BookOpen, Target, TrendingUp, Trophy, Rocket } from 'lucide-react';

export const TIER_INFO = [
    { tier: 0, name: 'Foundations', color: 'slate', icon: BookOpen },
    { tier: 0.5, name: 'Express Lane', color: 'amber', icon: Rocket },
    { tier: 1, name: 'Market Structure', color: 'blue', icon: Target },
    { tier: 2, name: 'Risk', color: 'amber', icon: Target },
    { tier: 3, name: 'The Anchors', color: 'emerald', icon: Target },
    { tier: 4, name: 'Verticals', color: 'cyan', icon: TrendingUp },
    { tier: 5, name: 'Volatility', color: 'purple', icon: TrendingUp },
    { tier: 6, name: 'Time/Skew', color: 'pink', icon: TrendingUp },
    { tier: 7, name: 'Advanced + Exotic', color: 'orange', icon: Trophy },
    { tier: 8, name: 'Event Horizons', color: 'violet', icon: Target, mentor: 'chameleon' },
    { tier: 9, name: 'Strategy Tools', color: 'rose', icon: Trophy },
    { tier: 10, name: "Let's Play", color: 'emerald', icon: Trophy },
];
