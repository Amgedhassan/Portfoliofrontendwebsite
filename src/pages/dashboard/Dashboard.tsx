import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Briefcase, MessageSquare, GraduationCap, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { dashboardApi } from '../../utils/dashboardApi';
import { ScrollReveal } from '../../components/ScrollReveal';
import { GlitchText } from '../../components/GlitchText';

interface DashboardStats {
  totalProjects: number;
  totalTestimonials: number;
  totalMentorshipSessions: number;
  featuredProjects: number;
  featuredTestimonials: number;
  featuredSessions: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await dashboardApi.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Projects',
      total: stats?.totalProjects || 0,
      featured: stats?.featuredProjects || 0,
      icon: Briefcase,
      color: '#00fff2',
      link: '/dashboard/projects',
    },
    {
      title: 'Testimonials',
      total: stats?.totalTestimonials || 0,
      featured: stats?.featuredTestimonials || 0,
      icon: MessageSquare,
      color: '#7000ff',
      link: '/dashboard/testimonials',
    },
    {
      title: 'Mentorship',
      total: stats?.totalMentorshipSessions || 0,
      featured: stats?.featuredSessions || 0,
      icon: GraduationCap,
      color: '#ff006e',
      link: '/dashboard/mentorship',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-center justify-between">
          <div>
            <GlitchText text="SYSTEM_OVERVIEW" className="mb-2" />
            <p className="text-muted-foreground font-mono">
              <span className="text-primary">{'>'}</span> Content management dashboard
            </p>
          </div>
          <motion.div
            className="px-4 py-2 border-2 border-primary bg-primary/10 font-mono"
            whileHover={{ scale: 1.05 }}
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 242, 0.3)',
            }}
          >
            <span className="text-primary">STATUS:</span> <span className="text-foreground">ONLINE</span>
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 border-2 border-primary/20 bg-card/50 backdrop-blur-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} delay={index * 0.1}>
                <Link to={card.link}>
                  <motion.div
                    className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative overflow-hidden group hover:border-primary/40 transition-all duration-500"
                    whileHover={{ y: -5 }}
                    style={{
                      boxShadow: `0 0 30px ${card.color}20`,
                    }}
                  >
                    {/* Tech corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: card.color }} />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: card.color }} />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: card.color }} />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: card.color }} />

                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className="w-16 h-16 border-2 flex items-center justify-center relative"
                        style={{
                          borderColor: card.color,
                          background: `${card.color}10`,
                        }}
                      >
                        <Icon size={32} style={{ color: card.color }} />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-4">
                      <h3 className="font-mono mb-2" style={{ color: card.color }}>
                        {card.title.toUpperCase()}
                      </h3>
                      <div className="flex items-baseline gap-4">
                        <div>
                          <div
                            className="text-4xl font-mono mb-1"
                            style={{
                              color: card.color,
                              textShadow: `0 0 10px ${card.color}80`,
                            }}
                          >
                            {card.total}
                          </div>
                          <div className="text-muted-foreground font-mono text-sm">TOTAL</div>
                        </div>
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                        <div>
                          <div className="text-2xl font-mono mb-1 text-accent">
                            {card.featured}
                          </div>
                          <div className="text-muted-foreground font-mono text-sm">FEATURED</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Link */}
                    <div className="flex items-center gap-2 text-primary font-mono group-hover:translate-x-2 transition-transform">
                      <span>MANAGE</span>
                      <ArrowRight size={16} />
                    </div>

                    {/* Scan line effect */}
                    <motion.div
                      className="absolute left-0 right-0 h-px opacity-30"
                      style={{ background: card.color }}
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

                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <ScrollReveal>
        <div>
          <h2 className="mb-6 flex items-center gap-2 font-mono">
            <Zap size={20} className="text-accent" />
            <span>QUICK_ACTIONS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'New Project', link: '/dashboard/projects/new', color: '#00fff2' },
              { label: 'New Testimonial', link: '/dashboard/testimonials/new', color: '#7000ff' },
              { label: 'New Session', link: '/dashboard/mentorship/new', color: '#ff006e' },
            ].map((action, index) => (
              <Link key={action.label} to={action.link}>
                <motion.div
                  className="border-2 bg-card/30 backdrop-blur-sm p-6 font-mono relative overflow-hidden group"
                  style={{ borderColor: `${action.color}40` }}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ color: action.color }}>{'>'} {action.label.toUpperCase()}</span>
                    <TrendingUp size={16} style={{ color: action.color }} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `${action.color}05` }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
