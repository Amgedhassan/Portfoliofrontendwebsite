import { motion } from 'motion/react';

export function BrutalistBackground() {
  const shapes = [
    { color: '#FFD60A', size: 120, top: '10%', left: '5%', rotate: 15, duration: 20 },
    { color: '#0066FF', size: 80, top: '70%', left: '80%', rotate: -25, duration: 15 },
    { color: '#FF3B30', size: 100, top: '40%', left: '90%', rotate: 45, duration: 25 },
    { color: '#34C759', size: 60, top: '80%', left: '10%', rotate: -15, duration: 18 },
    { color: '#FFD60A', size: 90, top: '15%', left: '85%', rotate: 30, duration: 22 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Bold grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #0a0a0a, #0a0a0a 3px, transparent 3px, transparent 40px),
            repeating-linear-gradient(90deg, #0a0a0a, #0a0a0a 3px, transparent 3px, transparent 40px)
          `,
        }}
      />

      {/* Floating geometric shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            backgroundColor: shape.color,
            border: '4px solid #0a0a0a',
            boxShadow: '8px 8px 0px #0a0a0a',
          }}
          initial={{ rotate: shape.rotate }}
          animate={{
            rotate: [shape.rotate, shape.rotate + 360],
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Accent lines */}
      <motion.div
        className="absolute top-1/4 left-0 right-0 h-1 bg-primary"
        style={{
          boxShadow: '0 4px 0 #0a0a0a',
        }}
        animate={{
          scaleX: [0.5, 1, 0.5],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-2/3 left-0 right-0 h-1 bg-secondary"
        style={{
          boxShadow: '0 4px 0 #0a0a0a',
        }}
        animate={{
          scaleX: [1, 0.5, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-8 border-t-8 border-primary" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-8 border-b-8 border-secondary" />
      
      {/* Dot pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0a0a0a 2px, transparent 2px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
}
