import { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';

export default function NotesPage() {
  const [nota, setNota] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if (saved) setNota(saved);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('notes', nota);
    }, 2000);
    return () => clearInterval(interval);
  }, [nota]);

  return (
    <>
      <TopBar title="NOTES" />
      <div className="flex flex-col items-center min-h-screen py-4">
        <div className="w-full max-w-screen-md mx-auto flex flex-col gap-4">
          <div className="bg-black border border-white rounded-xl p-4">
            <h1 className="text-xl font-bold text-white mb-1">IRIS::NOTES</h1>
            <p className="text-sm text-gray-400">Bloc de notas estilo terminal</p>
          </div>

          <div className="bg-black border border-white rounded-xl p-4">
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className="w-full min-h-[300px] bg-black text-white font-mono p-4 rounded resize-none focus:outline-none placeholder:text-gray-600"
              placeholder="Escribí aquí tus notas..."
            />
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => {
                  const blob = new Blob([nota], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'iris-notas.txt';
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Exportar .txt
              </button>
              <p className="text-xs text-gray-400">Autosave cada 2 segundos</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 