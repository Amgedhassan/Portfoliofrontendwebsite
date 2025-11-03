import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';
import { GlitchText } from './GlitchText';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/mentorship', label: 'Mentorship' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-xl border-b border-primary/20' 
          : 'bg-transparent'
      }`}
      style={isScrolled ? {
        boxShadow: '0 4px 30px rgba(0, 255, 242, 0.1)',
      } : {}}
    >
      {/* Top tech line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" 
        style={{ boxShadow: '0 0 10px rgba(0, 255, 242, 0.5)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Zap className="text-primary" size={24} style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 242, 0.8))' }} />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Zap className="text-primary" size={24} />
                </motion.div>
              </div>
              <GlitchText as="span" className="tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Amgad Hassan
              </GlitchText>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-5 py-2 group overflow-hidden"
              >
                <motion.span 
                  className={`relative z-10 transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                  style={location.pathname === item.path ? {
                    textShadow: '0 0 10px rgba(0, 255, 242, 0.8)',
                  } : {}}
                >
                  {item.label}
                </motion.span>
                
                {location.pathname === item.path && (
                  <>
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 border border-primary/50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 255, 242, 0.1), rgba(112, 0, 255, 0.1))',
                        boxShadow: 'inset 0 0 20px rgba(0, 255, 242, 0.2)',
                      }}
                    />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
                  </>
                )}

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border border-primary/30 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            style={{
              boxShadow: '0 0 15px rgba(0, 255, 242, 0.3)',
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            {isMobileMenuOpen ? 
              <X size={24} className="relative z-10 text-primary" /> : 
              <Menu size={24} className="relative z-10 text-primary" />
            }
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-primary/20 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 border transition-all relative overflow-hidden group ${
                      location.pathname === item.path
                        ? 'border-primary/50 text-primary bg-primary/10'
                        : 'border-border/30 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                    }`}
                    style={location.pathname === item.path ? {
                      boxShadow: '0 0 20px rgba(0, 255, 242, 0.2)',
                    } : {}}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
