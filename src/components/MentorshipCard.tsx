import { motion } from 'motion/react';
import { Clock, Users, ExternalLink, Zap, CheckCircle2 } from 'lucide-react';
import { Mentorship } from '../utils/api';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { HolographicCard } from './HolographicCard';

interface MentorshipCardProps {
  session: Mentorship;
  index?: number;
}

export function MentorshipCard({ session, index = 0 }: MentorshipCardProps) {
  const hasOffer = session.offerPrice && session.offerEndDate && new Date(session.offerEndDate) > new Date();
  const displayPrice = hasOffer ? session.offerPrice : session.price;

  const cardColors = ['#00fff2', '#7000ff', '#ff006e'];
  const color = cardColors[index % cardColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <HolographicCard className="h-full group">
        <div 
          className="bg-card/50 backdrop-blur-sm border-2 border-accent/20 p-8 h-full flex flex-col relative overflow-hidden hover:border-accent/40 transition-all duration-500"
          style={{
            boxShadow: `0 0 30px ${color}20`,
          }}
        >
          {/* Tech corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: color }} />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: color }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: color }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: color }} />

          {/* Header */}
          <div className="mb-6 relative z-10 min-h-[140px]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="group-hover:text-accent transition-colors">{session.title}</h3>
              <div className="flex items-center gap-2 shrink-0">
                {session.isFeatured && (
                  <div className="flex items-center gap-2 px-3 py-1 border border-accent bg-accent/10">
                    <Zap size={14} className="text-accent" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 0, 110, 0.8))' }} />
                    <span className="text-accent font-mono text-sm">HOT</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Session Type Badge */}
            <div className="mb-3">
              <span 
                className="inline-block px-2 py-1 border font-mono text-xs"
                style={{
                  borderColor: color,
                  background: `${color}10`,
                  color,
                }}
              >
                {session.sessionType === 'one-on-one' ? '1:1 SESSION' : 
                 session.sessionType === 'workshop' ? 'WORKSHOP' :
                 session.sessionType === 'course' ? 'COURSE' : 
                 'GROUP SESSION'}
              </span>
            </div>
            
            <div className="h-px w-16 mb-4 bg-gradient-to-r from-accent to-transparent" />
            <p className="text-muted-foreground leading-relaxed line-clamp-4">{session.description}</p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-accent/20">
            <div className="flex items-center gap-2 text-muted-foreground group/meta hover:text-accent transition-colors">
              <Clock size={18} className="text-accent" />
              <span className="font-mono">{session.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground group/meta hover:text-accent transition-colors">
              <Users size={18} className="text-accent" />
              <span className="font-mono">{session.targetAudience}</span>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mb-6 flex-1 min-h-[140px]">
            <h4 className="mb-4 flex items-center gap-2">
              <span className="text-accent">{'>'}</span>
              <span>Session Includes</span>
            </h4>
            <ul className="space-y-3">
              {session.whatToExpect.slice(0, 3).map((item, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start gap-3 text-muted-foreground group/item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                >
                  <CheckCircle2 
                    size={16} 
                    className="mt-0.5 shrink-0 text-accent" 
                    style={{ filter: 'drop-shadow(0 0 3px rgba(255, 0, 110, 0.5))' }}
                  />
                  <span className="leading-relaxed group-hover/item:text-foreground transition-colors text-sm">{item}</span>
                </motion.li>
              ))}
              {session.whatToExpect.length > 3 && (
                <li className="text-muted-foreground font-mono pl-7 text-sm">
                  +{session.whatToExpect.length - 3} more features...
                </li>
              )}
            </ul>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-6 border-t border-accent/20 relative z-10">
            <div className="flex items-end justify-between mb-6">
              <div>
                {hasOffer && (
                  <p className="text-muted-foreground line-through font-mono mb-1">
                    {session.currency} {session.price}
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="font-mono" style={{ 
                    color,
                    textShadow: `0 0 10px ${color}80`,
                  }}>
                    {session.currency}
                  </span>
                  <span className="font-mono" style={{ 
                    color,
                    textShadow: `0 0 10px ${color}80`,
                  }}>
                    {displayPrice}
                  </span>
                </div>
              </div>
              {hasOffer && (
                <div className="px-3 py-1 border-2 border-accent bg-accent/20 font-mono text-accent animate-pulse">
                  SALE
                </div>
              )}
            </div>
            
            <Button
              asChild
              className="w-full border-2 border-accent bg-accent/10 hover:bg-accent/20 text-accent group/btn relative overflow-hidden"
            >
              <a
                href={session.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 relative z-10"
              >
                <span className="font-mono">BOOK_SESSION</span>
                <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </a>
            </Button>
          </div>

          {/* Scan line effect */}
          <motion.div
            className="absolute left-0 right-0 h-px opacity-30"
            style={{ background: color }}
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 0.7,
            }}
          />
        </div>
      </HolographicCard>
    </motion.div>
  );
}
