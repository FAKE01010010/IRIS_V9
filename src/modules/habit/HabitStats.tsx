import { useEffect, useState } from 'react';

function getDateKey(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().split('T')[0];
}

export default function HabitStats() {
  const [percentToday, setPercentToday] = useState(0);
  const [streak, setStreak] = useState(0);

  const updateStats = () => {
    let streakCount = 0;
    for (let i = 0; i < 30; i++) {
      const key = `habits-${getDateKey(i)}`;
      const raw = localStorage.getItem(key);
      if (!raw) break;
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr) || arr.length !== 10) break;
      const allDone = arr.every(Boolean);
      if (i === 0) setPercentToday((arr.filter(Boolean).length / 10) * 100);
      if (allDone) streakCount++;
      else break;
    }
    setStreak(streakCount);
  };

  useEffect(() => {
    // Actualizar estadísticas inicialmente
    updateStats();

    // Escuchar cambios en los hábitos
    window.addEventListener('habits-updated', updateStats);

    return () => {
      window.removeEventListener('habits-updated', updateStats);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-black border border-white rounded-xl p-4 text-center">
        <div className="text-white/70 text-xs mb-1">Cumplimiento hoy</div>
        <div className="text-2xl font-bold text-white">
          {percentToday.toFixed(0)}%
        </div>
      </div>
      <div className="bg-black border border-white rounded-xl p-4 text-center">
        <div className="text-white/70 text-xs mb-1">Racha actual</div>
        <div className="text-2xl font-bold text-white">
          {streak} día{streak === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  );
} 