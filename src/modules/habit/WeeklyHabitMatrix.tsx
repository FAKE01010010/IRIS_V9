import { useEffect, useState } from 'react';

const defaultHabits = [
  'No fumar',
  'Levantarse 5:30 am',
  'Hacer cama',
  'Flexiones',
  'Movilidad',
  'Leer',
  'Estudiar',
  'Dientes (mañana)',
  'Dientes (noche)',
  'Dar gracias',
];

function getDateKey(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().split('T')[0];
}

function getDayLabel(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
}

const hasThreeFails = (arr: boolean[]) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      count++;
      if (count >= 3) return true;
    } else {
      count = 0;
    }
  }
  return false;
};

export default function WeeklyHabitMatrix() {
  const [data, setData] = useState<boolean[][]>([]);

  const updateMatrix = () => {
    const result: boolean[][] = defaultHabits.map(() => []);
    for (let offset = 6; offset >= 0; offset--) {
      const key = `habits-${getDateKey(offset)}`;
      const raw = localStorage.getItem(key);
      const day = raw ? JSON.parse(raw) : new Array(10).fill(false);
      day.forEach((done: boolean, i: number) => {
        result[i].push(done);
      });
    }
    setData(result);
  };

  useEffect(() => {
    updateMatrix();
    window.addEventListener('habits-updated', updateMatrix);
    return () => window.removeEventListener('habits-updated', updateMatrix);
  }, []);

  return (
    <div className="bg-black border border-white rounded-xl p-4">
      <h2 className="text-lg font-medium text-white mb-4">Vista Semanal</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="border-b border-white/20 px-3 py-2 text-left font-medium">
                Hábito
              </th>
              {[...Array(7)].map((_, i) => (
                <th key={i} className="border-b border-white/20 px-3 py-2 text-center font-medium capitalize">
                  {getDayLabel(6 - i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {defaultHabits.map((habit, rowIdx) => {
              const hasAlert = data[rowIdx] && hasThreeFails(data[rowIdx]);
              return (
                <tr key={rowIdx} className="border-b border-white/10 last:border-none">
                  <td className={`px-3 py-2 text-white ${hasAlert ? 'bg-red-800/50' : ''}`}>
                    {hasAlert && <span className="mr-2">❗</span>}
                    {habit}
                  </td>
                  {data[rowIdx]?.map((done, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-3 py-2 text-center transition-colors ${
                        done ? 'bg-white/10' : ''
                      }`}
                    >
                      {done ? '✓' : '·'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 