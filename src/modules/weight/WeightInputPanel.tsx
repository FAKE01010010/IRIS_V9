import { useState } from "react";
import { useWeight } from "./WeightContext";

function WeightInputPanel() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState("");
  const { addWeight } = useWeight();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    addWeight({
      date,
      weight: parseFloat(weight),
    });
    
    setWeight("");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-black border border-white rounded-xl p-4">
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-black border border-white text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">Peso (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.01"
            className="w-full bg-black border border-white text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default WeightInputPanel; 