import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import MainPanel from "./components/MainPanel";
import WeightPage from "./modules/weight/WeightPage";
import HabitPage from "./modules/habit/HabitPage";
import CyclePage from "./pages/CyclePage";
import NotesPage from "./pages/NotesPage";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

function App() {
  // Activar los atajos de teclado
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar title="IRIS" />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<MainPanel />} />
          <Route path="/weight" element={<WeightPage />} />
          <Route path="/habit" element={<HabitPage />} />
          <Route path="/cycle" element={<CyclePage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
