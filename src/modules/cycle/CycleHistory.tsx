import { useEffect, useState } from 'react';

type Cycle = {
  startDate: string;
  endDate: string;
  completion: number;
  status: 'green' | 'amber' | 'red';
};

export default function CycleHistory() {
  const [cycles, setCycles] = useState<Cycle[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('cycles');
    if (!raw) return;
    const parsed = JSON.parse(raw) as Cycle[];
    const sorted = parsed.sort((a, b) =>
      b.endDate.localeCompare(a.endDate)
    );
    setCycles(sorted);
  }, []);

  const emoji = {
    green: '🟢',
    amber: '🟠',
    red: '🔴',
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-black border border-white rounded-xl p-4">
      <h2 className="text-lg font-medium text-white mb-4">Historial de Ciclos</h2>
      {cycles.length === 0 ? (
        <p className="text-gray-400 text-sm">No hay ciclos completados aún.</p>
      ) : (
        <ul className="space-y-2">
          {cycles.map((c, i) => (
            <li key={i} className="flex items-center gap-2 text-white/90">
              <span>{emoji[c.status]}</span>
              <span>Ciclo del {formatDate(c.startDate)}</span>
              <span className="text-white/50">→</span>
              <span className="font-medium">{c.completion}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 