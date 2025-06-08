import { useState, useEffect } from 'react';

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

const getTodayKey = () => {
  const today = new Date().toISOString().split('T')[0];
  return `habits-${today}`;
};

export default function HabitChecklist() {
  const [checked, setChecked] = useState<boolean[]>(new Array(10).fill(false));

  useEffect(() => {
    const saved = localStorage.getItem(getTodayKey());
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(getTodayKey(), JSON.stringify(checked));
    // Disparar evento personalizado para actualizar estadísticas
    window.dispatchEvent(new Event('habits-updated'));
  }, [checked]);

  const toggle = (i: number) => {
    const newState = [...checked];
    newState[i] = !newState[i];
    setChecked(newState);
  };

  return (
    <div className="grid gap-2 text-white">
      {defaultHabits.map((habit, i) => (
        <label key={i} className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => toggle(i)}
            className="accent-white w-5 h-5"
          />
          <span className="select-none">{habit}</span>
        </label>
      ))}
    </div>
  );
} 