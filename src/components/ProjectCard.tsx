import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap } from 'lucide-react';
import { CaseStudy } from '../utils/api';
import { Badge } from './ui/badge';
import { HolographicCard } from './HolographicCard';

interface ProjectCardProps {
  project: CaseStudy;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link to={`/work/${project.slug}`} className="group block h-full">
        <HolographicCard className="h-full">
          <div className="relative overflow-hidden border-2 border-primary/20 bg-card/50 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-500 h-full flex flex-col"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 242, 0.1)',
            }}
          >
            {/* Tech corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary z-20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary z-20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary z-20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary z-20" />

            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <motion.img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg width="400" height="250" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="250" fill="%23e5e5e5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="16" fill="%23999"%3EImage not available%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* Tech overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
              
              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-primary/70 opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 242, 0.8)',
                }}
                animate={{
                  top: ['0%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 242, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 242, 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* View Project Badge */}
              <motion.div
                className="absolute top-4 right-4 border-2 border-primary bg-background/80 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 242, 0.6)',
                }}
              >
                <ArrowUpRight size={20} className="text-primary" />
              </motion.div>

              {/* Featured indicator */}
              {project.isFeatured && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 border border-accent bg-background/80 backdrop-blur-sm">
                  <Zap size={14} className="text-accent" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 0, 110, 0.8))' }} />
                  <span className="text-accent font-mono">FEATURED</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 relative flex-1 flex flex-col">
              {/* Top line accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="mb-3">
                <h3 className="group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <div className="h-px w-12 bg-primary/50" />
              </div>
              
              <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                {project.problemStatement}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-primary/30 text-primary/70 font-mono group-hover:border-primary/50 transition-colors text-sm"
                      style={{
                        background: 'rgba(0, 255, 242, 0.05)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 border border-primary/30 text-primary/70 font-mono text-sm">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Bottom tech line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </HolographicCard>
      </Link>
    </motion.div>
  );
}
