import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';

interface ParticleFieldProps {
  variant?: 'default' | 'matrix' | 'constellation' | 'galaxy';
  className?: string;
}

export function ParticleField({ variant = 'default', className = '' }: ParticleFieldProps) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('Particles loaded', container);
  };

  const options = useMemo(() => {
    const configs = {
      default: {
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: '#00fff2',
          },
          links: {
            color: '#00fff2',
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none' as const,
            random: false,
            straight: false,
            outModes: {
              default: 'bounce' as const,
            },
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      },
      matrix: {
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: '#00ff00',
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'bottom' as const,
            straight: true,
          },
          number: {
            value: 100,
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
            },
          },
          shape: {
            type: 'char',
            character: {
              value: ['0', '1', 'あ', 'い', 'う', 'A', 'B', 'C'],
            },
          },
          size: {
            value: 16,
          },
        },
        detectRetina: true,
      },
      constellation: {
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 200,
            enable: true,
            opacity: 0.1,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.05,
            },
          },
          move: {
            enable: true,
            speed: 0.5,
          },
          number: {
            value: 60,
          },
          opacity: {
            value: 0.5,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
            },
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      },
      galaxy: {
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ['#00fff2', '#7000ff', '#ff006e'],
          },
          move: {
            enable: true,
            speed: 1,
            outModes: {
              default: 'out' as const,
            },
            attract: {
              enable: true,
              rotate: {
                x: 600,
                y: 1200,
              },
            },
          },
          number: {
            value: 150,
          },
          opacity: {
            value: { min: 0.1, max: 0.6 },
            animation: {
              enable: true,
              speed: 2,
            },
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 3,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        detectRetina: true,
      },
    };

    return configs[variant];
  }, [variant]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Particles
        id={`tsparticles-${variant}`}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  );
}
