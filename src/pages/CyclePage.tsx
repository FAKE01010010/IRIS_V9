import { useState } from 'react';
import { useCycle } from '../utils/useCycle';
import CycleHistory from '../modules/cycle/CycleHistory';
import TopBar from '../components/TopBar';

export default function CyclePage() {
  const [startDate, setStartDate] = useState('2025-06-08');
  const day = useCycle(startDate);

  const cerrarCiclo = () => {
    const start = new Date(startDate);
    const allChecks: boolean[] = [];

    // Recolectar todos los checks de los 8 días
    for (let i = 0; i < 8; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = `habits-${d.toISOString().split('T')[0]}`;
      const raw = localStorage.getItem(key);
      const dayHabits = raw ? JSON.parse(raw) : new Array(10).fill(false);
      allChecks.push(...dayHabits);
    }

    // Calcular porcentaje de cumplimiento
    const total = allChecks.length;
    const success = allChecks.filter(Boolean).length;
    const percent = Math.round((success / total) * 100);

    // Determinar el estado según el porcentaje
    const status =
      percent >= 80 ? 'green' :
      percent >= 50 ? 'amber' : 'red';

    // Crear y guardar el nuevo ciclo
    const oldCycles = JSON.parse(localStorage.getItem('cycles') || '[]');
    const newCycle = {
      startDate,
      endDate: new Date().toISOString().split('T')[0],
      completion: percent,
      status,
    };
    localStorage.setItem('cycles', JSON.stringify([...oldCycles, newCycle]));
    
    // Iniciar nuevo ciclo
    setStartDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <>
      <TopBar title="CYCLE TRACKER" />
      <div className="flex flex-col items-center min-h-screen py-4">
        <div className="w-full max-w-screen-sm mx-auto flex flex-col gap-4">
          <div className="bg-black border border-white rounded-xl p-4">
            <h1 className="text-xl font-bold text-white mb-1">IRIS::CYCLE_TRACKER</h1>
            <p className="text-sm text-gray-400">Gestión de ciclos de 8 días</p>
          </div>

          <div className="bg-black border border-white rounded-xl p-4">
            <h2 className="text-lg font-medium text-white mb-4">Ciclo Actual</h2>
            <p className="text-2xl font-bold mb-6">Hoy es el Día {day} del Ciclo</p>
            <button
              onClick={cerrarCiclo}
              className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Cerrar ciclo
            </button>
          </div>

          <CycleHistory />
        </div>
      </div>
    </>
  );
} 