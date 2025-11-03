import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Briefcase, Code2, Sparkles, Terminal, GraduationCap, Settings } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { api } from '../utils/api';
import { ProjectCard } from '../components/ProjectCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { MentorshipCard } from '../components/MentorshipCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { MagneticButton } from '../components/MagneticButton';
import { GlitchText } from '../components/GlitchText';
import { HolographicCard } from '../components/HolographicCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useRef, useState, useEffect } from 'react';

export function Home() {
  const { data: featuredProjects, loading: projectsLoading } = useApi(() => api.getCaseStudies(true), []);
  const { data: featuredTestimonials, loading: testimonialsLoading } = useApi(() => api.getTestimonials(true), []);
  const { data: allMentorship, loading: mentorshipLoading } = useApi(() => api.getMentorshipSessions(true), []);
  
  // Separate 1:1 sessions from learning offerings
  const oneOnOneSessions = allMentorship?.filter(session => session.sessionType === 'one-on-one') || [];
  const learningSessions = allMentorship?.filter(session => session.sessionType !== 'one-on-one') || [];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const [typedText, setTypedText] = useState('');
  const fullText = '> CRAFTING_DIGITAL_EXPERIENCES.exe';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Briefcase, value: '12+', label: 'Live Products Launched', color: '#00fff2' },
    { icon: Award, value: '3', label: 'Awards Received', color: '#7000ff' },
    { icon: Users, value: '450+', label: 'Teams Engaged', color: '#ff006e' },
  ];

  return (
    <div className="min-h-screen">
      {/* Testing Only - Dashboard Link */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50 group"
      >
        <Link to="/dashboard/login">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative px-6 py-4 bg-card/90 backdrop-blur-sm border-2 border-primary/50 group-hover:border-primary transition-all"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Settings size={20} className="text-primary" />
                </motion.div>
                <div>
                  <p className="text-primary font-mono text-sm">DEMO DASHBOARD</p>
                  <p className="text-xs text-accent font-mono">demo@amgad.design</p>
                </div>
              </div>
              
              {/* Tech corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
            </div>

            {/* Tooltip on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-accent/90 backdrop-blur-sm border border-accent whitespace-nowrap hidden group-hover:block"
              style={{
                boxShadow: '0 0 20px rgba(255, 0, 110, 0.4)',
              }}
            >
              <p className="text-xs font-mono">Password: demo123</p>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent" />
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Hero Section - Ultra Futuristic */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-12">
        {/* Floating tech elements */}
        <motion.div
          className="absolute top-20 left-10 text-primary/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Code2 size={60} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-secondary/20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Terminal size={50} />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/4 text-accent/20"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles size={40} />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Terminal-style badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-block"
            >
              <div className="relative px-6 py-3 border border-primary/50 bg-primary/5"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 242, 0.3), inset 0 0 20px rgba(0, 255, 242, 0.1)',
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
                
                <span className="text-primary font-mono">
                  Product Designer • UI/UX Instructor • Tech Enthusiast
                </span>
              </div>
            </motion.div>

            {/* Terminal command text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 font-mono text-primary/70"
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                _
              </motion.span>
            </motion.div>

            {/* Main Heading - Extreme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <h1 className="mb-4 tracking-tight relative">
                <GlitchText as="span">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                    style={{
                      textShadow: '0 0 30px rgba(0, 255, 242, 0.5)',
                    }}
                  >
                    DIGITAL ARCHITECT
                  </span>
                </GlitchText>
              </h1>
              <h2 className="text-muted-foreground">
                Building the <span className="text-primary">Future</span> of User Experience
              </h2>
            </motion.div>

            {/* Description with tech styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-12"
            >
              <div className="max-w-3xl mx-auto relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
                <p className="text-muted-foreground leading-relaxed pl-8 text-left">
                  Merging <span className="text-primary">engineering precision</span> with <span className="text-secondary">creative innovation</span>.
                  I craft digital experiences that don't just meet user needs—they <span className="text-accent">anticipate them</span>.
                  From Vodafone's global platforms to teaching the next generation at ITI, I'm pushing the boundaries of what's possible in design.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons - Extreme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <MagneticButton>
                <Button asChild size="lg" className="group relative overflow-hidden border-2 border-primary bg-primary/10 hover:bg-primary/20">
                  <Link to="/work" className="flex items-center gap-2 relative z-10">
                    <Terminal size={18} />
                    <span>EXPLORE_WORK</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </Link>
                </Button>
              </MagneticButton>
              
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="border-2 border-accent/50 hover:border-accent hover:bg-accent/10">
                  <Link to="/mentorship" className="flex items-center gap-2">
                    <GraduationCap size={18} />
                    <span>BOOK_MENTORSHIP</span>
                  </Link>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="border-2 border-secondary/50 hover:border-secondary hover:bg-secondary/10">
                  <Link to="/contact" className="flex items-center gap-2">
                    <Sparkles size={18} />
                    <span>INIT_CONTACT</span>
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Stats - Tech cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <HolographicCard key={index} className="group">
                  <motion.div
                    className="relative p-6 border border-primary/30 bg-background/50 backdrop-blur-sm overflow-hidden"
                    whileHover={{ scale: 1.05 }}
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
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Tech style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-primary rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ boxShadow: '0 0 10px rgba(0, 255, 242, 0.8)' }}
              />
            </div>
            <span className="text-primary/70 font-mono">SCROLL</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Quick Links Section */}
      <section className="py-20 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Showcase */}
              <Link 
                to="/work"
                className="group relative p-8 border-2 border-primary/30 bg-background/50 backdrop-blur-sm overflow-hidden hover:border-primary/60 transition-all duration-500"
                style={{
                  boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)',
                }}
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
                
                <div className="relative z-10">
                  <div className="mb-4 w-12 h-12 border-2 border-primary bg-primary/10 flex items-center justify-center">
                    <Briefcase className="text-primary" size={24} />
                  </div>
                  <h3 className="mb-2 text-primary">Product Design</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore 12+ live products with proven impact on millions of users
                  </p>
                  <div className="flex items-center gap-2 text-primary font-mono group-hover:gap-3 transition-all">
                    <span>VIEW_PROJECTS</span>
                    <ArrowRight size={16} />
                  </div>
                </div>

                <motion.div
                  className="absolute left-0 right-0 h-px bg-primary/50 opacity-0 group-hover:opacity-100"
                  animate={{
                    top: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </Link>

              {/* Mentorship */}
              <Link 
                to="/mentorship"
                className="group relative p-8 border-2 border-accent/30 bg-background/50 backdrop-blur-sm overflow-hidden hover:border-accent/60 transition-all duration-500"
                style={{
                  boxShadow: '0 0 30px rgba(255, 0, 110, 0.1)',
                }}
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent" />
                
                <div className="relative z-10">
                  <div className="mb-4 w-12 h-12 border-2 border-accent bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="text-accent" size={24} />
                  </div>
                  <h3 className="mb-2 text-accent">1:1 Mentorship</h3>
                  <p className="text-muted-foreground mb-4">
                    Level up your design career with personalized coaching sessions
                  </p>
                  <div className="flex items-center gap-2 text-accent font-mono group-hover:gap-3 transition-all">
                    <span>BOOK_SESSION</span>
                    <ArrowRight size={16} />
                  </div>
                </div>

                <motion.div
                  className="absolute left-0 right-0 h-px bg-accent/50 opacity-0 group-hover:opacity-100"
                  animate={{
                    top: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </Link>

              {/* Teaching */}
              <Link 
                to="/about"
                className="group relative p-8 border-2 border-secondary/30 bg-background/50 backdrop-blur-sm overflow-hidden hover:border-secondary/60 transition-all duration-500"
                style={{
                  boxShadow: '0 0 30px rgba(112, 0, 255, 0.1)',
                }}
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-secondary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-secondary" />
                
                <div className="relative z-10">
                  <div className="mb-4 w-12 h-12 border-2 border-secondary bg-secondary/10 flex items-center justify-center">
                    <Users className="text-secondary" size={24} />
                  </div>
                  <h3 className="mb-2 text-secondary">Teaching @ ITI</h3>
                  <p className="text-muted-foreground mb-4">
                    Training the next generation of product designers in Egypt
                  </p>
                  <div className="flex items-center gap-2 text-secondary font-mono group-hover:gap-3 transition-all">
                    <span>LEARN_MORE</span>
                    <ArrowRight size={16} />
                  </div>
                </div>

                <motion.div
                  className="absolute left-0 right-0 h-px bg-secondary/50 opacity-0 group-hover:opacity-100"
                  animate={{
                    top: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-32 px-6 lg:px-12 relative">
        {/* Section header with tech styling */}
        <ScrollReveal>
          <div className="max-w-7xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-primary font-mono">// FEATURED PROJECTS</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="mb-2">
                  <GlitchText>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Latest Work
                    </span>
                  </GlitchText>
                </h2>
                <p className="text-muted-foreground">Pushing boundaries in digital design</p>
              </div>
              <Button asChild variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Link to="/work" className="flex items-center gap-2">
                  <span>VIEW_ALL</span>
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto">
          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="border-2 border-primary/20 relative overflow-hidden h-[500px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 255, 242, 0.05), rgba(112, 0, 255, 0.05))',
                  }}
                >
                  {/* Tech corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                  
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
              {featuredProjects?.slice(0, 4).map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 1:1 Mentorship Section */}
      {!mentorshipLoading && oneOnOneSessions && oneOnOneSessions.length > 0 && (
        <section className="py-32 px-6 lg:px-12 relative">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/50" />
                  <span className="text-accent font-mono">// 1:1 MENTORSHIP</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/50" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="mb-2">
                      <GlitchText>
                        <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                          Personalized Guidance
                        </span>
                      </GlitchText>
                    </h2>
                    <p className="text-muted-foreground">One-on-one sessions tailored to your design career goals</p>
                  </div>
                  <Button asChild variant="outline" className="border-accent/50 hover:bg-accent/10 hidden md:flex">
                    <Link to="/mentorship" className="flex items-center gap-2">
                      <span>ALL_SESSIONS</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {mentorshipLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-2 border-accent/20 relative overflow-hidden h-[520px] p-8"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.05), rgba(112, 0, 255, 0.05))',
                    }}
                  >
                    {/* Tech corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {oneOnOneSessions.slice(0, 3).map((session, index) => (
                  <MentorshipCard key={session._id} session={session} index={index} />
                ))}
              </div>
            )}

            {/* Mobile View All Button */}
            <ScrollReveal>
              <div className="mt-12 text-center md:hidden">
                <MagneticButton>
                  <Button asChild variant="outline" size="lg" className="border-accent/50 hover:bg-accent/10">
                    <Link to="/mentorship" className="flex items-center gap-2">
                      <GraduationCap size={18} />
                      <span>BOOK_A_SESSION</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Learning & Courses Section */}
      {!mentorshipLoading && learningSessions && learningSessions.length > 0 && (
        <section className="py-32 px-6 lg:px-12 relative">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary/50" />
                  <span className="text-secondary font-mono">// LEARNING PROGRAMS</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-secondary/50" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="mb-2">
                      <GlitchText>
                        <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                          Workshops & Courses
                        </span>
                      </GlitchText>
                    </h2>
                    <p className="text-muted-foreground">Structured learning experiences to master UX/UI design</p>
                  </div>
                  <Button asChild variant="outline" className="border-secondary/50 hover:bg-secondary/10 hidden md:flex">
                    <Link to="/mentorship" className="flex items-center gap-2">
                      <span>EXPLORE_ALL</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {learningSessions.slice(0, 3).map((session, index) => (
                <MentorshipCard key={session._id} session={session} index={index} />
              ))}
            </div>

            {/* Mobile View All Button */}
            <ScrollReveal>
              <div className="mt-12 text-center md:hidden">
                <MagneticButton>
                  <Button asChild variant="outline" size="lg" className="border-secondary/50 hover:bg-secondary/10">
                    <Link to="/mentorship" className="flex items-center gap-2">
                      <Code2 size={18} />
                      <span>EXPLORE_ALL_COURSES</span>
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {!testimonialsLoading && featuredTestimonials && featuredTestimonials.length > 0 && (
        <section className="py-32 px-6 lg:px-12 relative">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary/50" />
                  <span className="text-secondary font-mono">// TESTIMONIALS</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-secondary/50" />
                </div>
                <div className="text-center">
                  <h2 className="mb-2">
                    <GlitchText>
                      <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                        Client Feedback
                      </span>
                    </GlitchText>
                  </h2>
                  <p className="text-muted-foreground">What people say about working with me</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {featuredTestimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Ultra tech */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="relative p-12 lg:p-20 overflow-hidden border-2 border-primary/30"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 242, 0.05), rgba(112, 0, 255, 0.05), rgba(255, 0, 110, 0.05))',
                boxShadow: '0 0 60px rgba(0, 255, 242, 0.2), inset 0 0 60px rgba(0, 255, 242, 0.05)',
              }}
            >
              {/* Tech grid overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 242, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 242, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />

              <div className="relative z-10 text-center">
                <motion.div
                  className="mb-4 font-mono text-primary"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {'>'} SYSTEM.READY_FOR_COLLABORATION = true;
                </motion.div>

                <h2 className="mb-6">
                  <GlitchText>
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      Let's Build Something Epic
                    </span>
                  </GlitchText>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Ready to transform your digital presence? Whether it's a revolutionary product, 
                  a mentorship journey, or just a conversation about design—I'm here to make it happen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton>
                    <Button asChild size="lg" className="border-2 border-primary bg-primary/20 hover:bg-primary/30">
                      <Link to="/contact" className="flex items-center gap-2">
                        <Terminal size={18} />
                        <span>INIT_PROJECT</span>
                      </Link>
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button asChild variant="outline" size="lg" className="border-2 border-secondary/50 hover:bg-secondary/10">
                      <Link to="/mentorship" className="flex items-center gap-2">
                        <Code2 size={18} />
                        <span>BOOK_SESSION</span>
                      </Link>
                    </Button>
                  </MagneticButton>
                </div>
              </div>

              {/* Animated scan line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-primary/50"
                style={{ boxShadow: '0 0 10px rgba(0, 255, 242, 0.8)' }}
                animate={{
                  top: ['0%', '100%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
