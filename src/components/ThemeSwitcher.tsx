import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Palette, Square } from 'lucide-react';

type Theme = 'cyberpunk' | 'elegant' | 'modern' | 'brutalist';

const themeOrder: Theme[] = ['cyberpunk', 'elegant', 'modern', 'brutalist'];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as Theme) || 'cyberpunk';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('elegant', 'modern', 'brutalist');
    
    if (theme === 'elegant') {
      root.classList.add('elegant');
    } else if (theme === 'modern') {
      root.classList.add('modern');
    } else if (theme === 'brutalist') {
      root.classList.add('brutalist');
    }
    
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const currentIndex = themeOrder.indexOf(prev);
      const nextIndex = (currentIndex + 1) % themeOrder.length;
      return themeOrder[nextIndex];
    });
  };

  const getNextTheme = () => {
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    return themeOrder[nextIndex];
  };

  const nextTheme = getNextTheme();
  const themeNames = {
    cyberpunk: 'Cyberpunk',
    elegant: 'Elegant',
    modern: 'Modern',
    brutalist: 'Brutalist',
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[100] group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative">
        {theme === 'cyberpunk' && (
          // Cyberpunk style button
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div 
              className="relative px-4 py-2 bg-card/90 backdrop-blur-sm border-2 border-primary transition-all"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 242, 0.3)',
              }}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-primary font-mono text-sm uppercase">{themeNames[nextTheme]}</span>
              </div>
              
              {/* Tech corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />
            </div>
          </div>
        )}

        {theme === 'elegant' && (
          // Elegant style button
          <div className="relative">
            <div 
              className="px-5 py-2.5 bg-card/95 backdrop-blur-md border border-primary/20 rounded-full transition-all shadow-lg"
              style={{
                boxShadow: 'var(--glow-primary)',
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap size={16} className="text-primary" />
                </motion.div>
                <span className="text-primary text-sm font-medium">{themeNames[nextTheme]}</span>
              </div>
            </div>
          </div>
        )}

        {theme === 'modern' && (
          // Modern style button
          <div className="relative glass-card">
            <div 
              className="px-5 py-2.5 bg-card backdrop-blur-xl border border-primary/20 rounded-xl transition-all"
              style={{
                boxShadow: 'var(--glow-primary)',
                background: 'rgba(20, 25, 40, 0.6)',
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Palette size={16} className="text-primary" />
                </motion.div>
                <span className="text-primary text-sm font-medium">{themeNames[nextTheme]}</span>
              </div>
            </div>
          </div>
        )}

        {theme === 'brutalist' && (
          // Brutalist style button
          <div className="relative">
            <motion.div 
              className="px-5 py-2.5 bg-primary border-4 border-foreground transition-all"
              style={{
                boxShadow: '6px 6px 0px currentColor',
                color: '#0a0a0a',
              }}
              whileHover={{
                boxShadow: '8px 8px 0px currentColor',
                x: -2,
                y: -2,
              }}
              whileTap={{
                boxShadow: '2px 2px 0px currentColor',
                x: 4,
                y: 4,
              }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Square size={16} className="fill-current" />
                </motion.div>
                <span className="text-sm font-bold uppercase tracking-wide">{themeNames[nextTheme]}</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="px-3 py-1.5 bg-card/95 backdrop-blur-sm border border-primary/20 rounded whitespace-nowrap">
            <p className="text-xs text-muted-foreground">
              Switch to {themeNames[nextTheme]} theme
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as Theme) || 'cyberpunk';
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('portfolio-theme');
      setTheme((saved as Theme) || 'cyberpunk');
    };

    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 100);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  return theme;
}
