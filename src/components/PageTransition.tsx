import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glitch transition overlay */}
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(135deg, #00fff2, #7000ff, #ff006e)',
            transformOrigin: 'top',
          }}
        />

        {/* Scan lines during transition */}
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 242, 0.1) 2px, rgba(0, 255, 242, 0.1) 4px)',
          }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
