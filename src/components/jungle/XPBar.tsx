import { useJungle } from '../../contexts/JungleContext';

export default function XPBar() {
  const { xpProgress, progress, level, levelName, levelIcon } = useJungle();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-zinc-400">
          {levelIcon} {levelName}
        </span>
        <span className="text-xs font-medium text-[#39ff14]">
          {progress.xp.toLocaleString()} XP
        </span>
      </div>
      <div className="relative w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#39ff14] to-[#39ff14]/70 rounded-full transition-all duration-500"
          style={{ width: `${xpProgress.percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-zinc-500">Level {level}</span>
        {xpProgress.needed > 0 && (
          <span className="text-[10px] text-zinc-500">
            {xpProgress.current.toLocaleString()} / {xpProgress.needed.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
