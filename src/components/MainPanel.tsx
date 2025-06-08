import { useNavigate } from "react-router-dom";

function MainPanel() {
  const navigate = useNavigate();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      <div
        onClick={() => navigate("/weight")}
        className="bg-black border border-white p-6 rounded-xl cursor-pointer hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-shadow"
      >
        <h2 className="text-lg font-bold text-white">WEIGHT CONTROL</h2>
        <p className="text-sm text-gray-400">Seguimiento de peso</p>
      </div>
      
      <div
        onClick={() => navigate("/habit")}
        className="bg-black border border-white p-6 rounded-xl cursor-pointer hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-shadow"
      >
        <h2 className="text-lg font-bold text-white">HABIT TRACKER</h2>
        <p className="text-sm text-gray-400">Control diario de hábitos</p>
      </div>

      <div
        onClick={() => navigate("/cycle")}
        className="bg-black border border-white p-6 rounded-xl cursor-pointer hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-shadow"
      >
        <h2 className="text-lg font-bold text-white">CYCLE TRACKER</h2>
        <p className="text-sm text-gray-400">Ciclos de 8 días</p>
      </div>

      <div
        onClick={() => navigate("/notes")}
        className="bg-black border border-white p-6 rounded-xl cursor-pointer hover:shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-shadow"
      >
        <h2 className="text-lg font-bold text-white">NOTES</h2>
        <p className="text-sm text-gray-400">Bloc de notas personal</p>
      </div>
    </main>
  );
}

export default MainPanel; 