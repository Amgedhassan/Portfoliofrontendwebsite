import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }];
        return newTrail.slice(-15); // Keep last 15 points
      });
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Only show on desktop
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-1 h-1 rounded-full pointer-events-none z-[9998]"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0,
            scale: 0,
          }}
          transition={{ 
            duration: 0.6,
            ease: 'easeOut',
          }}
          style={{
            left: point.x,
            top: point.y,
            background: `radial-gradient(circle, ${
              index % 3 === 0 ? '#00fff2' : index % 3 === 1 ? '#7000ff' : '#ff006e'
            }, transparent)`,
          }}
        />
      ))}

      {/* Main cursor dot with glow */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          background: 'radial-gradient(circle, #00fff2, #7000ff)',
          boxShadow: '0 0 20px #00fff2, 0 0 40px #00fff2',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
      
      {/* Cursor ring with gradient */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          width: 40,
          height: 40,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          rotate: isPointer ? 90 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(#000, #000), linear-gradient(135deg, #00fff2, #7000ff, #ff006e)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: isPointer ? '0 0 30px rgba(0, 255, 242, 0.6)' : '0 0 15px rgba(0, 255, 242, 0.3)',
          }}
        />
      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
          width: 60,
          height: 60,
        }}
        animate={{
          scale: isPointer ? 1.3 : 1,
          opacity: isPointer ? 0.6 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <motion.div 
          className="w-full h-full rounded-full border border-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 242, 0.3)',
          }}
        />
      </motion.div>
    </>
  );
}
