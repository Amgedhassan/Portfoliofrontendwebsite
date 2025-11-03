import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../utils/api';
import { Badge } from './ui/badge';
import { HolographicCard } from './HolographicCard';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  const typeColors: Record<string, string> = {
    Client: '#00fff2',
    Mentee: '#7000ff',
    Colleague: '#ff006e',
    Student: '#00ff88',
  };

  const color = typeColors[testimonial.testimonialType] || '#00fff2';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <HolographicCard className="h-full">
        <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 p-8 h-full flex flex-col relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
          style={{
            boxShadow: `0 0 20px ${color}20`,
          }}
        >
          {/* Tech corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: color }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: color }} />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: color }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: color }} />

          {/* Quote Icon */}
          <div className="mb-6 relative">
            <div className="w-12 h-12 border-2 flex items-center justify-center relative"
              style={{ 
                borderColor: color,
                background: `${color}10`,
              }}
            >
              <Quote size={24} style={{ color }} />
            </div>
          </div>

          {/* Rating */}
          {testimonial.rating && (
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                >
                  <Star
                    size={16}
                    className={i < testimonial.rating! ? 'fill-primary text-primary' : 'text-muted-foreground/30'}
                    style={i < testimonial.rating! ? {
                      filter: 'drop-shadow(0 0 5px rgba(0, 255, 242, 0.6))',
                    } : {}}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="flex-1 mb-6 relative min-h-[120px]">
            <div className="absolute -left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            <p className="text-muted-foreground leading-relaxed pl-4 font-mono line-clamp-6">
              "{testimonial.quote}"
            </p>
          </blockquote>

          {/* Author Info */}
          <div className="pt-4 border-t border-primary/20 relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={testimonial.authorImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.authorName)}&background=random`}
                  alt={testimonial.authorName}
                  className="w-12 h-12 object-cover border-2"
                  style={{ borderColor: color }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.authorName)}&background=random`;
                  }}
                />
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 border-2"
                  style={{ borderColor: color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-foreground font-mono">{testimonial.authorName}</p>
                </div>
                <p className="text-muted-foreground">{testimonial.authorTitle}</p>
                {testimonial.clientCompany && (
                  <p className="text-muted-foreground">{testimonial.clientCompany}</p>
                )}
              </div>
              <div className="px-3 py-1 border font-mono" 
                style={{ 
                  borderColor: color,
                  background: `${color}10`,
                  color,
                }}
              >
                {testimonial.testimonialType}
              </div>
            </div>
          </div>

          {/* Scan line effect */}
          <motion.div
            className="absolute left-0 right-0 h-px opacity-30"
            style={{ background: color }}
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
        </div>
      </HolographicCard>
    </motion.div>
  );
}
