import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<'cyberpunk' | 'elegant' | 'modern' | 'brutalist'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'cyberpunk' | 'elegant' | 'modern' | 'brutalist') || 'cyberpunk';
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('portfolio-theme');
      setTheme((saved as 'cyberpunk' | 'elegant' | 'modern' | 'brutalist') || 'cyberpunk');
    };

    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 100);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const isCyberpunk = theme === 'cyberpunk';
  const isModern = theme === 'modern';
  const isBrutalist = theme === 'brutalist';
  
  // Don't render for brutalist theme
  if (isBrutalist) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Bold grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #0a0a0a, #0a0a0a 3px, transparent 3px, transparent 40px),
              repeating-linear-gradient(90deg, #0a0a0a, #0a0a0a 3px, transparent 3px, transparent 40px)
            `,
          }}
        />
        {/* Dot accent pattern */}
        <div 
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: 'radial-gradient(circle, #0a0a0a 2px, transparent 2px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = isCyberpunk 
      ? ['#00fff2', '#7000ff', '#ff006e', '#00ff88']
      : isModern
      ? ['#6366f1', '#8b5cf6', '#06b6d4', '#14b8a6']
      : ['#d4af37', '#b8956a', '#c9a961', '#a0826d'];

    // Create particles
    const particleCount = isCyberpunk ? 50 : isModern ? 40 : 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (isCyberpunk ? 0.5 : 0.2),
        vy: (Math.random() - 0.5) * (isCyberpunk ? 0.5 : 0.2),
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;

    const animate = () => {
      if (isCyberpunk) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      } else if (isModern) {
        ctx.fillStyle = 'rgba(10, 14, 26, 0.05)';
      } else {
        ctx.fillStyle = 'rgba(15, 14, 13, 0.05)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = isCyberpunk ? 10 : isModern ? 8 : 5;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = isCyberpunk ? 150 : isModern ? 180 : 200;
          if (distance < maxDistance) {
            if (isCyberpunk) {
              ctx.strokeStyle = `rgba(0, 255, 242, ${0.2 * (1 - distance / maxDistance)})`;
              ctx.shadowColor = '#00fff2';
            } else if (isModern) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${0.18 * (1 - distance / maxDistance)})`;
              ctx.shadowColor = '#6366f1';
            } else {
              ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / maxDistance)})`;
              ctx.shadowColor = '#d4af37';
            }
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = isCyberpunk ? 5 : isModern ? 4 : 3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0"
        style={{
          opacity: isCyberpunk ? 0.2 : isModern ? 0.08 : 0.1,
          backgroundImage: isCyberpunk
            ? `
              linear-gradient(rgba(0, 255, 242, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 242, 0.1) 1px, transparent 1px)
            `
            : isModern
            ? `
              linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
            `,
          backgroundSize: '50px 50px',
          animation: 'grid-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Scanning line - only in cyberpunk */}
      {isCyberpunk && (
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 242, 0.8)',
          }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Radial gradients / Mesh gradient for modern */}
      {isModern ? (
        // Modern mesh gradient
        <>
          <motion.div 
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      ) : (
        // Cyberpunk and Elegant gradients
        <>
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: isCyberpunk 
                ? 'radial-gradient(circle, rgba(0, 255, 242, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: isCyberpunk 
                ? 'radial-gradient(circle, rgba(112, 0, 255, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(139, 115, 85, 0.08) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: isCyberpunk 
                ? 'radial-gradient(circle, rgba(255, 0, 110, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(184, 149, 106, 0.08) 0%, transparent 70%)',
            }}
          />
        </>
      )}
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          animation: 'noise 8s steps(10) infinite',
        }}
      />
    </div>
  );
}
