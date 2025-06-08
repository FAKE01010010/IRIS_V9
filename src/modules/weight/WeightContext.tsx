import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definimos el tipo para un registro de peso
export type WeightRecord = {
  date: string;
  weight: number;
};

// Definimos la interfaz del contexto
interface WeightContextType {
  weights: WeightRecord[];
  addWeight: (record: WeightRecord) => void;
  deleteWeight: (date: string) => void;
}

// Creamos el contexto
const WeightContext = createContext<WeightContextType | null>(null);

// Hook personalizado para usar el contexto
export function useWeight() {
  const context = useContext(WeightContext);
  if (!context) {
    throw new Error('useWeight debe usarse dentro de un WeightProvider');
  }
  return context;
}

// Props del provider
interface WeightProviderProps {
  children: ReactNode;
}

// Componente provider que maneja el estado
export function WeightProvider({ children }: WeightProviderProps) {
  const [weights, setWeights] = useState<WeightRecord[]>([]);

  // Cargar datos iniciales de localStorage
  useEffect(() => {
    const raw = localStorage.getItem('weightData');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as WeightRecord[];
        setWeights(parsed);
      } catch (err) {
        console.error('Error al cargar pesos de localStorage:', err);
      }
    }
  }, []);

  // Función para añadir un nuevo peso
  const addWeight = (newRecord: WeightRecord) => {
    setWeights(current => {
      // Filtrar registros existentes con la misma fecha
      const filtered = current.filter(w => w.date !== newRecord.date);
      // Añadir nuevo registro y ordenar por fecha
      const updated = [...filtered, newRecord].sort((a, b) => 
        a.date.localeCompare(b.date)
      );
      // Guardar en localStorage
      localStorage.setItem('weightData', JSON.stringify(updated));
      return updated;
    });
  };

  // Función para eliminar un peso
  const deleteWeight = (date: string) => {
    setWeights(current => {
      const updated = current.filter(w => w.date !== date);
      localStorage.setItem('weightData', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WeightContext.Provider value={{ weights, addWeight, deleteWeight }}>
      {children}
    </WeightContext.Provider>
  );
} 