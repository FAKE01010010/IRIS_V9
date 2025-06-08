import HabitChecklist from './HabitChecklist';
import HabitStats from './HabitStats';
import WeeklyHabitMatrix from './WeeklyHabitMatrix';
import TopBar from '../../components/TopBar';

export default function HabitPage() {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <TopBar title="HABIT TRACKER" />
      <div className="flex flex-col items-center min-h-screen py-4">
        <div className="w-full max-w-screen-sm mx-auto flex flex-col gap-4">
          <div className="bg-black border border-white rounded-xl p-4">
            <h1 className="text-xl font-bold text-white mb-1">IRIS::HABIT_TRACKER</h1>
            <p className="text-sm text-gray-400 capitalize">{today}</p>
          </div>

          <HabitStats />

          <div className="bg-black border border-white rounded-xl p-4">
            <h2 className="text-lg font-medium text-white mb-4">Hábitos de hoy</h2>
            <HabitChecklist />
          </div>

          <WeeklyHabitMatrix />
        </div>
      </div>
    </>
  );
} 