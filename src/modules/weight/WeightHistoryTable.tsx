import { useWeight } from './WeightContext';

export default function WeightHistoryTable() {
  const { weights, deleteWeight } = useWeight();

  // Ordenar por fecha descendente para la tabla
  const sortedWeights = [...weights].sort((a, b) => b.date.localeCompare(a.date));

  if (!weights.length) return null;

  return (
    <div className="w-full">
      <div className="bg-black border border-white rounded-xl p-4">
        <h2 className="text-white font-medium mb-4">Histórico de Peso</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-2 font-medium">Fecha</th>
                <th className="py-2 font-medium">Peso (kg)</th>
                <th className="py-2 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {sortedWeights.map(record => (
                <tr key={record.date} className="border-b border-white/10">
                  <td className="py-2">{record.date}</td>
                  <td className="py-2">{record.weight}</td>
                  <td className="py-2">
                    <button
                      onClick={() => deleteWeight(record.date)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 