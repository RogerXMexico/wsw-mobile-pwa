import { Scroll, Swords, Wrench, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', icon: Scroll, label: 'Rules' },
  { path: '/strategies', icon: Swords, label: 'Strategies' },
  { path: '/tools', icon: Wrench, label: 'Tools' },
  { path: '/social', icon: Users, label: 'Social' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide bottom nav on strategy detail pages (more immersive reading)
  if (location.pathname.startsWith('/strategy/')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.path !== '/' && location.pathname.startsWith(tab.path));
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-colors ${
                isActive
                  ? 'text-emerald-500'
                  : 'text-slate-500 active:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
