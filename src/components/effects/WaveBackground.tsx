import { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

interface WaveBackgroundProps {
  color?: string;
  opacity?: number;
  speed?: number;
  amplitude?: number;
  className?: string;
}

export function WaveBackground({
  color = '#00fff2',
  opacity = 0.1,
  speed = 0.001,
  amplitude = 50,
  className = '',
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const noise = createNoise2D();
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity / (layer + 1);
        ctx.lineWidth = 2;

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            noise(x * 0.005, time + layer * 100) * amplitude * (layer + 1);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      time += speed;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, opacity, speed, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}
