import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;
      switch (e.key) {
        case '1':
          navigate('/');
          break;
        case '2':
          navigate('/weight');
          break;
        case '3':
          navigate('/habit');
          break;
        case '4':
          navigate('/cycle');
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);
} 