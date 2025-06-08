import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem
} from 'chart.js';
import { useWeight } from './WeightContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    legend: {
      display: boolean;
      labels: { color: string };
    };
    tooltip: {
      callbacks: {
        label: (ctx: TooltipItem<'line'>) => string;
      };
      backgroundColor: string;
      titleColor: string;
      bodyColor: string;
      borderColor: string;
      borderWidth: number;
    };
  };
  scales: {
    x: {
      ticks: {
        color: string;
        maxRotation: number;
        minRotation: number;
      };
      grid: {
        color: string;
        drawBorder: boolean;
      };
    };
    y: {
      beginAtZero: boolean;
      ticks: { color: string };
      grid: {
        color: string;
        drawBorder: boolean;
      };
    };
  };
}

export default function WeightChartPanel() {
  const { weights } = useWeight();

  if (!weights.length) {
    return (
      <div className="bg-black border border-white rounded-xl p-4 text-center text-white/50">
        No hay datos de peso aún
      </div>
    );
  }

  const data: ChartData<'line'> = {
    labels: weights.map(w => w.date),
    datasets: [
      {
        label: 'Peso',
        data: weights.map(w => w.weight),
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: { color: '#ffffff' },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} kg`,
        },
        backgroundColor: '#000000',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: '#333333',
          drawBorder: false,
        },
      },
      y: {
        beginAtZero: false,
        ticks: { color: '#ffffff' },
        grid: {
          color: '#333333',
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="bg-black border border-white rounded-xl p-4">
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
} 