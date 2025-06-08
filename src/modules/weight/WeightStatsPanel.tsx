import { useMemo } from 'react';
import { useWeight } from './WeightContext';

export default function WeightStatsPanel() {
  const { weights } = useWeight();

  // Calcular estadísticas usando useMemo para evitar recálculos innecesarios
  const stats = useMemo(() => {
    if (weights.length === 0) {
      return { current: 0, min: 0, max: 0 };
    }

    const sorted = [...weights].sort((a, b) => a.date.localeCompare(b.date));
    const weightValues = sorted.map(r => r.weight);
    const current = weightValues[weightValues.length - 1];
    const min = Math.min(...weightValues);
    const max = Math.max(...weightValues);

    return { current, min, max };
  }, [weights]);

  if (!weights.length) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-black border border-white rounded-xl p-3 text-center">
          <div className="text-white/70 text-xs mb-1">Actual</div>
          <div className="text-white font-medium">{stats.current} kg</div>
        </div>
        <div className="bg-black border border-white rounded-xl p-3 text-center">
          <div className="text-white/70 text-xs mb-1">Mínimo</div>
          <div className="text-white font-medium">{stats.min} kg</div>
        </div>
        <div className="bg-black border border-white rounded-xl p-3 text-center">
          <div className="text-white/70 text-xs mb-1">Máximo</div>
          <div className="text-white font-medium">{stats.max} kg</div>
        </div>
      </div>
    </div>
  );
} 