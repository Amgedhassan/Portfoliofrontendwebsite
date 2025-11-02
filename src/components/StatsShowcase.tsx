import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { HolographicCard } from './HolographicCard';

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
}

interface StatsShowcaseProps {
  stats: Stat[];
}

export function StatsShowcase({ stats }: StatsShowcaseProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <HolographicCard key={index} className="group">
          <motion.div
            className="relative p-6 border border-primary/30 bg-background/50 backdrop-blur-sm overflow-hidden"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              boxShadow: `0 0 20px ${stat.color}40`,
            }}
          >
            {/* Animated corner brackets */}
            <motion.div
              className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2"
              style={{ borderColor: stat.color }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2"
              style={{ borderColor: stat.color }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />

            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-background/50 border" style={{ borderColor: stat.color }}>
                  <stat.icon size={28} style={{ color: stat.color }} />
                </div>
              </div>
              <motion.p 
                className="mb-2 font-mono"
                style={{ 
                  color: stat.color,
                  textShadow: `0 0 10px ${stat.color}80`,
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>

            {/* Scan line effect */}
            <motion.div
              className="absolute left-0 right-0 h-px opacity-50"
              style={{ background: stat.color }}
              animate={{
                top: ['0%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.5,
              }}
            />
          </motion.div>
        </HolographicCard>
      ))}
    </div>
  );
}
