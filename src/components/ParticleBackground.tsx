'use client';

import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function ParticleBackground() {
  const particles = useMemo<Particle[]>(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
}
