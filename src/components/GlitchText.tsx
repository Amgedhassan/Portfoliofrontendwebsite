import { motion } from 'motion/react';
import { ReactNode, useState } from 'react';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function GlitchText({ children, className = '', as = 'span' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  const Component = motion[as];

  return (
    <Component
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-primary opacity-70"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
            animate={{
              x: [0, -2, 2, -2, 0],
              opacity: [0.7, 0.5, 0.7],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {children}
          </motion.span>

          <motion.span
            className="absolute inset-0 text-accent opacity-70"
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
            animate={{
              x: [0, 2, -2, 2, 0],
              opacity: [0.7, 0.5, 0.7],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 0.1,
            }}
          >
            {children}
          </motion.span>
        </>
      )}
    </Component>
  );
}
