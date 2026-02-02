import { ArrowLeft } from 'lucide-react';
import { useJungle } from '../../contexts/JungleContext';
import { getAllAnimals } from '../../data/jungleAnimals';
import AnimalProfileCard from './AnimalProfileCard';

export default function MentorGrid() {
  const { setCurrentView } = useJungle();
  const animals = getAllAnimals();

  return (
    <div className="pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView('hub')}
          className="p-2 -ml-2 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[#39ff14]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-zinc-100">Choose Your Mentor</h1>
          <p className="text-xs text-zinc-500">16 animal mentors with unique trading philosophies</p>
        </div>
      </div>

      {/* Animal Grid */}
      <div className="grid grid-cols-1 gap-2">
        {animals.map((animal) => (
          <AnimalProfileCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}
