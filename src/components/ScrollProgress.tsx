import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, #00fff2, #7000ff, #ff006e)',
          boxShadow: '0 0 20px rgba(0, 255, 242, 0.8), 0 0 40px rgba(0, 255, 242, 0.4)',
        }}
      />
      
      {/* Glowing trail */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 origin-left z-49 blur-sm"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, rgba(0, 255, 242, 0.5), rgba(112, 0, 255, 0.5), rgba(255, 0, 110, 0.5))',
        }}
      />
    </>
  );
}
