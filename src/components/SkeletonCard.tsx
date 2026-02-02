export function SkeletonCard() {
  return (
    <div className="bg-[#0a0a0a] border border-[#39ff14]/20 rounded-2xl p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-zinc-900" />
        <div className="flex-1">
          <div className="h-4 bg-zinc-900 rounded w-3/4 mb-2" />
          <div className="h-3 bg-zinc-900 rounded w-1/2" />
        </div>
        <div className="w-12 h-12 rounded-full bg-zinc-900" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3 px-4 pt-6">
      <div className="h-7 bg-zinc-900 rounded w-1/3 mb-4 animate-pulse" />
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
