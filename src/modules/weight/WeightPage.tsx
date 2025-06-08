import WeightInputPanel from './WeightInputPanel';
import WeightChartPanel from './WeightChartPanel';
import WeightHistoryTable from './WeightHistoryTable';
import WeightStatsPanel from './WeightStatsPanel';
import { WeightProvider } from './WeightContext';
import TopBar from '../../components/TopBar';

function WeightPage() {
  return (
    <>
      <TopBar title="WEIGHT CONTROL" />
      <WeightProvider>
        <div className="flex flex-col items-center min-h-screen py-4">
          <div className="w-full max-w-screen-sm mx-auto flex flex-col gap-4">
            <div className="bg-black border border-white rounded-xl p-4">
              <h1 className="text-xl font-bold text-white mb-1">IRIS::WEIGHT_CONTROL</h1>
              <p className="text-sm text-gray-400">Seguimiento de peso</p>
            </div>
            <WeightInputPanel />
            <WeightChartPanel />
            <WeightStatsPanel />
            <WeightHistoryTable />
          </div>
        </div>
      </WeightProvider>
    </>
  );
}

export default WeightPage; 