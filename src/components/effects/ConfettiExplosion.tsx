import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiExplosionProps {
  trigger?: boolean;
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
}

export function ConfettiExplosion({
  trigger = false,
  particleCount = 100,
  spread = 70,
  origin = { x: 0.5, y: 0.5 },
  colors = ['#00fff2', '#7000ff', '#ff006e'],
}: ConfettiExplosionProps) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount,
        spread,
        origin,
        colors,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        startVelocity: 30,
      });
    }
  }, [trigger, particleCount, spread, origin, colors]);

  return null;
}

export function fireConfetti(options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
}) {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#00fff2', '#7000ff', '#ff006e'],
  };

  confetti({
    ...defaults,
    ...options,
    ticks: 200,
    gravity: 1,
    decay: 0.94,
    startVelocity: 30,
  });
}
