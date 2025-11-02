import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Award, Users, Briefcase, Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { EmptyStateInline } from '../../components/EmptyState';
import { shouldShowEmptyState } from '../../utils/emptyStateHelpers';
import medadLogo from 'figma:asset/4884701e19135c38bd94f5374ad4e6d65ed002ad.png';
import movoLogo from 'figma:asset/eaac4d0e6806d088ddea7f8f293a5ce511708948.png';
import itiLogo from 'figma:asset/27b155a01764d284ee449e9eecce8afc366ead7a.png';
import voisLogo from 'figma:asset/2a2b9acd1f3aa10123259ab05af158474f0cd3f5.png';
import briefingLogo from 'figma:asset/61aad403a2d958a83bac5dc82982b55f4dc5636e.png';

// Rotating text component for hero
function RotatingText() {
  const words = ['products', 'experiences', 'interfaces', 'systems', 'solutions'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[280px] lg:min-w-[380px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Hero Section - Clean and minimal
function MinimalHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen py-20 lg:py-32 relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-orange-100/30 to-pink-100/30 rounded-full blur-3xl"
        />
      </div>
      
      {/* Sophisticated grid pattern with parallax */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Spotlight effect following mouse */}
      <motion.div
        className="pointer-events-none absolute -z-5 rounded-full opacity-0 lg:opacity-100"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Top Section - Typography */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto mb-20 lg:mb-32"
        >
          {/* Badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50/90 to-emerald-50/90 backdrop-blur-xl border-2 border-green-200/60 rounded-full mb-8 shadow-xl shadow-green-900/10"
          >
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50" 
            />
            <span className="text-sm font-medium text-green-900">
              🎯 Available for Projects · Booking Q1 2025
            </span>
          </motion.div>

          {/* Main Headline with animated gradient and letter reveal */}
          <div className="mb-8 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl lg:text-8xl xl:text-9xl tracking-tight mb-4 leading-[0.95]"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-neutral-900"
              >
                Crafting Digital
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block relative"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="bg-gradient-to-r from-neutral-600 via-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Experiences
                </motion.span>
                
                {/* Subtle glow effect */}
                <motion.span
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10"
                />
              </motion.span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            I help <span className="text-neutral-900 font-medium">companies increase revenue</span> by creating intuitive, conversion-focused product designs that users love.
          </motion.p>

          {/* Value Props - Quick Wins */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 mb-12 text-sm text-neutral-600"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>95% avg. conversion improvement</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>2-week project kickoff</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>50+ successful launches</span>
            </div>
          </motion.div>

          {/* CTAs with enhanced conversion focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full px-12 py-6 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl font-medium overflow-hidden inline-flex items-center justify-center gap-3 shadow-2xl shadow-neutral-900/30 hover:shadow-neutral-900/40 transition-shadow"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <span>Book a Free Discovery Call</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <Link to="/work" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-12 py-6 bg-white/70 backdrop-blur-xl border-2 border-neutral-200/60 text-neutral-900 rounded-2xl font-medium hover:border-neutral-300 hover:bg-white/90 hover:shadow-2xl hover:shadow-neutral-900/10 transition-all"
              >
                View Case Studies
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Signal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 text-center text-sm text-neutral-500"
          >
            ⚡ Typical response time: <span className="text-neutral-700 font-medium">within 2 hours</span>
          </motion.div>
        </motion.div>



        {/* Bottom Stats Bar with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-24 lg:mt-32"
        >
          <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-10 lg:p-16 border border-white/20 shadow-2xl shadow-neutral-900/5 overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), transparent)',
                backgroundSize: '200% 200%',
              }}
            />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                { value: '5+', label: 'Years Experience', icon: '🎯' },
                { value: '50+', label: 'Happy Clients', icon: '🤝' },
                { value: '100+', label: 'Projects Delivered', icon: '🚀' },
                { value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group cursor-default"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="text-3xl mb-3 inline-block opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="relative">
                    <motion.div 
                      className="text-5xl lg:text-6xl font-medium mb-2 bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent"
                      whileHover={{
                        backgroundPosition: ['0% 50%', '100% 50%'],
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      {stat.value}
                    </motion.div>
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity"
                      style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent 70%)',
                      }}
                    />
                  </div>
                  <div className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full" />
          </div>
        </motion.div>


      </div>
    </div>
  );
}

export function MinimalHome() {
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsData, testimonialsData] = await Promise.all([
          api.getCaseStudies(),
          api.getTestimonials(),
        ]);
        setProjects(projectsData.slice(0, 3));
        setTestimonials(testimonialsData.slice(0, 2));
      } catch (error) {
        // Only log error if not using fallback data
        if (!api.isDevelopment()) {
          console.error('Failed to load data:', error);
        }
        // Still set empty arrays to prevent UI issues
        setProjects([]);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Show floating CTA after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stats = [
    { label: 'Years of Expertise', value: '5+', icon: Award, color: 'from-blue-500 to-blue-600' },
    { label: 'Satisfied Clients', value: '50+', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Successful Launches', value: '100+', icon: Briefcase, color: 'from-pink-500 to-pink-600' },
    { label: 'Average Satisfaction', value: '98%', icon: Star, color: 'from-orange-500 to-orange-600' },
  ];

  // Companies you've worked with
  const trustedCompanies = [
    { name: 'Vodafone', logo: 'https://logo.clearbit.com/vodafone.com' },
    { name: 'Medad Cloud Platform by Naseej', logo: medadLogo },
    { name: 'Movo', logo: movoLogo },
    { name: 'Information Technology Institute', logo: itiLogo },
    { name: 'VOIS', logo: voisLogo },
    { name: 'Briefing.com', logo: briefingLogo },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section - Clean and Minimal */}
      <MinimalHero />

      {/* Trusted By Section */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/50 to-white pointer-events-none" />
        
        <div className="relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50 rounded-full text-xs font-medium text-blue-900 mb-4">
              TRUSTED BY INDUSTRY LEADERS
            </span>
            <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900 mb-3">
              Worked with Fortune 500 Companies
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              5+ years designing products for global brands and fast-growing startups
            </p>
          </motion.div>

          {/* Company Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {trustedCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative"
              >
                <div className="relative p-8 lg:p-10 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-500 flex items-center justify-center aspect-square overflow-hidden">
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08), transparent 70%)',
                    }}
                  />
                  
                  {/* Logo */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-[85%] max-h-[85%] object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-500"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const textSpan = document.createElement('span');
                          textSpan.className = 'text-sm text-center font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors px-2';
                          textSpan.textContent = company.name;
                          parent.appendChild(textSpan);
                        }
                      }}
                    />
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Featured Testimonials */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 pointer-events-none" />
        
        <div className="relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50 rounded-full text-xs font-medium text-blue-900 mb-4">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl lg:text-5xl font-medium text-neutral-900 mb-4">
              Trusted by Product Leaders
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Hear from clients who've seen real results from our collaboration
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          {shouldShowEmptyState(testimonials, loading) ? (
            <div className="mb-12">
              <EmptyStateInline
                icon={MessageSquare}
                title="Client testimonials coming soon"
                description="Featured feedback from satisfied clients will be showcased here"
                className="max-w-2xl mx-auto"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
              {testimonials.slice(0, 2).map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative p-8 lg:p-10 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-500 h-full flex flex-col">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-3xl"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1), transparent 70%)',
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Quote Icon */}
                  <div className="mb-6">
                    <svg className="w-10 h-10 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg lg:text-xl text-neutral-700 mb-6 leading-relaxed flex-grow">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-neutral-200/50">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300">
                      {testimonial.authorImage && (
                        <img
                          src={testimonial.authorImage}
                          alt={testimonial.authorName}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">{testimonial.authorName}</div>
                      <div className="text-sm text-neutral-600">{testimonial.authorTitle}</div>
                      {testimonial.clientCompany && (
                        <div className="text-sm text-neutral-500">at {testimonial.clientCompany}</div>
                      )}
                    </div>
                  </div>

                  {/* Rating Stars if available */}
                  {testimonial.rating && (
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}
                        />
                      ))}
                    </div>
                  )}

                  {/* Bottom gradient accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
                </div>
              </motion.div>
            ))}
            </div>
          )}

          {/* CTA to view all testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-neutral-600 mb-4">Join 50+ happy clients who've transformed their products</p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-xl font-medium shadow-xl shadow-neutral-900/20 hover:shadow-2xl hover:shadow-neutral-900/30 transition-all"
              >
                Start Your Project Today
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid - Enhanced with glassmorphism */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none" />
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900 mb-3">
            Proven Track Record of Success
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Numbers that showcase the impact of exceptional design
          </p>
        </motion.div>
        
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-6 lg:p-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-500 group overflow-hidden"
            >
              {/* Gradient glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1), transparent 70%)',
                }}
              />
              
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon size={28} className="text-neutral-900 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <div className="text-4xl lg:text-5xl font-medium bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  {stat.label}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value Proposition Banner - Conversion focused */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 lg:p-12 border-2 border-blue-100/50 overflow-hidden group"
        >
          {/* Animated gradient background */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), transparent)',
              backgroundSize: '200% 200%',
            }}
          />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Compelling message */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-medium text-neutral-900 mb-4">
                Ready to 10x Your Product's Impact?
              </h3>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Join 50+ successful companies who've transformed their products with data-driven design. Get a free product audit & personalized roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="flex-1 sm:flex-initial">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-4 bg-neutral-900 text-white rounded-xl font-medium shadow-xl shadow-neutral-900/20 hover:shadow-2xl hover:shadow-neutral-900/30 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <span>Claim Free Audit</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-sm text-neutral-600 justify-center sm:justify-start"
                >
                  <span className="text-green-500">●</span>
                  <span>No obligations · Value guaranteed</span>
                </motion.div>
              </div>
            </div>

            {/* Right: Social proof numbers */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '95%', label: 'Avg. Conversion Lift' },
                { value: '2 weeks', label: 'Project Start' },
                { value: '$2M+', label: 'Revenue Generated' },
                { value: '4.9★', label: 'Client Rating' },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/40 text-center"
                >
                  <div className="text-2xl lg:text-3xl font-medium bg-gradient-to-br from-neutral-900 to-neutral-600 bg-clip-text text-transparent mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs text-neutral-600">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects - Bento Grid */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-neutral-100 rounded-full text-xs font-medium text-neutral-600 mb-4">
                PORTFOLIO
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-medium text-neutral-900 mb-3"
            >
              Projects That Drive Results
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-600 max-w-2xl"
            >
              Real business outcomes from data-driven design decisions
            </motion.p>
          </div>

          <Link to="/work">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, x: 5 }}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl text-neutral-900 hover:border-white/40 hover:shadow-xl transition-all font-medium"
            >
              View All Projects
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-200">
                <div className="aspect-[4/3] bg-neutral-100 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-neutral-100 rounded-lg animate-pulse" />
                    <div className="h-6 w-20 bg-neutral-100 rounded-lg animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-3/4 bg-neutral-100 rounded animate-pulse" />
                    <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
                  </div>
                  <div className="pt-4 border-t border-neutral-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="h-8 w-16 bg-neutral-100 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-neutral-100 rounded animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-8 w-16 bg-neutral-100 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-neutral-100 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/work/${project.slug}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                    {project.coverImage && (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span 
                            key={idx}
                            className="px-2.5 py-1 bg-neutral-100 rounded-lg text-xs font-medium text-neutral-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-medium text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {project.myRole}
                      </p>
                    </div>
                    
                    {/* Metrics */}
                    {project.keyMetrics && project.keyMetrics.length > 0 && (
                      <div className="pt-4 border-t border-neutral-100">
                        <div className="grid grid-cols-2 gap-4">
                          {project.keyMetrics.slice(0, 2).map((metric: any, idx: number) => (
                            <div key={idx}>
                              <div className="text-2xl font-medium text-neutral-900 mb-0.5">
                                {metric.value}
                              </div>
                              <div className="text-xs text-neutral-600">
                                {metric.metric}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        </div>

        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-xl border border-white/20 rounded-full text-xs font-medium text-neutral-600 mb-4">
              TESTIMONIALS
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-medium text-neutral-900 mb-3"
          >
            What Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Feedback from clients who trusted me with their projects
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 lg:p-10 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.1), transparent 60%)',
                }}
              />
              
              {/* Quote icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="absolute top-8 right-8 text-6xl text-neutral-200 group-hover:text-neutral-300 transition-colors"
              >
                "
              </motion.div>

              <div className="relative">
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + i * 0.05 }}
                    >
                      <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-lg lg:text-xl text-neutral-700 mb-8 leading-relaxed italic">
                  {testimonial.quote}
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-200/50">
                  {testimonial.authorImage && (
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.authorImage} 
                      alt={testimonial.authorName}
                      className="w-14 h-14 bg-neutral-200 rounded-full object-cover ring-2 ring-white shadow-lg"
                    />
                  )}
                  {!testimonial.authorImage && (
                    <div className="w-14 h-14 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-full ring-2 ring-white shadow-lg" />
                  )}
                  <div>
                    <div className="font-medium text-neutral-900 text-lg">{testimonial.authorName}</div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.authorTitle}{testimonial.clientCompany && ` at ${testimonial.clientCompany}`}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Enhanced with gradient and glassmorphism */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-[2.5rem] p-12 lg:p-20 text-center overflow-hidden"
        >
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-xl border border-green-400/30 rounded-full text-sm font-medium text-green-300 mb-6">
                ⚡ LIMITED SPOTS AVAILABLE FOR Q1 2025
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl lg:text-6xl xl:text-7xl font-medium text-white mb-6 leading-tight"
            >
              Transform Your Product,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Accelerate Your Growth
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg lg:text-xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Partner with a designer who's helped companies achieve 95% average conversion improvements and successfully launch 50+ products
            </motion.p>

            {/* Value props for final conversion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm text-white/80"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Fast turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>ROI-focused approach</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-6 bg-white text-neutral-900 rounded-2xl font-medium hover:bg-neutral-50 transition-all inline-flex items-center gap-3 shadow-2xl shadow-white/20 overflow-hidden"
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1
                    }}
                  />
                  <span className="relative text-lg font-medium">Schedule Free Consultation</span>
                  <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link to="/work">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white rounded-2xl font-medium hover:bg-white/20 hover:border-white/30 transition-all"
                >
                  View Success Stories
                </motion.button>
              </Link>
            </motion.div>

            {/* Final trust signal with urgency */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-center text-sm text-white/60"
            >
              📧 Response within 2 hours · 🎯 Only 3 spots left this quarter
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Floating CTA Button - Appears on scroll */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-5 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-full font-medium shadow-2xl shadow-neutral-900/40 hover:shadow-neutral-900/60 transition-all overflow-hidden flex items-center gap-3"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Pulsing indicator */}
                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                />
                
                <span className="relative font-medium">Book Free Call</span>
                <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
