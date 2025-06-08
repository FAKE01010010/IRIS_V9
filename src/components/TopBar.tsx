import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ title }: { title: string }) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-black border-b border-white">
      <button
        onClick={() => navigate('/')}
        className="text-white text-xl hover:opacity-75"
      >
        ←
      </button>
      <h1 className="text-white text-lg font-bold">{title}</h1>
      <div className="w-6" /> {/* Espacio para alinear el botón */}
      <span className="text-sm text-white/60">{today}</span>
    </div>
  );
} 