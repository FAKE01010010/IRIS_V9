import { useMemo } from 'react';

export function useCycle(startDate: string | Date): number {
  return useMemo(() => {
    const start = new Date(startDate);
    const today = new Date();
    // Reset horas
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Si estás en día 0 → devuelve 1 (primer día del ciclo)
    return (diffDays % 8) + 1;
  }, [startDate]);
} 