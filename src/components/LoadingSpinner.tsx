import { motion } from 'motion/react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-border" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent" />
      </motion.div>
    </div>
  );
}
