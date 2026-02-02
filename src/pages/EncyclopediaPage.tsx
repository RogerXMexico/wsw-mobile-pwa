import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { GLOSSARY } from '../data/glossary';

export default function EncyclopediaPage() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const entries = useMemo(() => {
    const all = Object.entries(GLOSSARY).sort(([a], [b]) => a.localeCompare(b));
    if (!search) return all;
    const q = search.toLowerCase();
    return all.filter(([term, def]) =>
      term.toLowerCase().includes(q) || def.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="px-4 pt-6 pb-24">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white mb-1">📖 Encyclopedia</h1>
        <p className="text-zinc-400 text-xs">{Object.keys(GLOSSARY).length} terms</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#39ff14]/30 text-sm"
        />
      </div>

      {/* Terms list */}
      <div className="space-y-1">
        {entries.map(([term, definition]) => (
          <button
            key={term}
            onClick={() => setExpanded(expanded === term ? null : term)}
            className="w-full text-left bg-[#0a0a0a] border border-[#39ff14]/20 rounded-xl px-4 py-3 active:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{term}</span>
              {expanded === term
                ? <ChevronUp className="w-4 h-4 text-zinc-500" />
                : <ChevronDown className="w-4 h-4 text-zinc-500" />
              }
            </div>
            {expanded === term && (
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{definition}</p>
            )}
          </button>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          <p>No terms found for "{search}"</p>
        </div>
      )}
    </div>
  );
}
