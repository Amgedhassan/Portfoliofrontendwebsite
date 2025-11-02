import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Terminal, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { dashboardApi } from '../../utils/dashboardApi';
import { toast } from 'sonner@2.0.3';
import { GlitchText } from '../../components/GlitchText';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dashboardApi.login(email, password);
      
      // Check if demo mode
      const isDemo = email === 'demo@amgad.design';
      
      toast.success(
        isDemo 
          ? 'Demo mode activated! All changes are temporary.' 
          : 'Access granted! Entering the system...', 
        {
          style: {
            background: isDemo ? 'rgba(255, 0, 110, 0.1)' : 'rgba(0, 255, 242, 0.1)',
            border: isDemo ? '1px solid #ff006e' : '1px solid #00fff2',
            color: isDemo ? '#ff006e' : '#00fff2',
          },
        }
      );
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error) {
      toast.error('Access denied! Invalid credentials.', {
        style: {
          background: 'rgba(255, 0, 110, 0.1)',
          border: '1px solid #ff006e',
          color: '#ff006e',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 242, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 242, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Scan lines */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-primary/70"
        style={{
          boxShadow: '0 0 10px rgba(0, 255, 242, 0.8)',
        }}
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-primary bg-background/80 backdrop-blur-sm relative"
            whileHover={{ scale: 1.05 }}
            style={{
              boxShadow: '0 0 30px rgba(0, 255, 242, 0.5)',
            }}
          >
            <Terminal size={32} className="text-primary" />
            
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
          </motion.div>

          <GlitchText text="ADMIN_ACCESS" className="mb-2" />
          <p className="text-muted-foreground font-mono">
            <span className="text-primary">{'>'}</span> Secure authentication required
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          className="border-2 border-primary/20 bg-card/50 backdrop-blur-sm p-8 relative"
          style={{
            boxShadow: '0 0 30px rgba(0, 255, 242, 0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Tech corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-primary font-mono">
                <Mail size={16} />
                <span>EMAIL_ADDRESS</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono h-12"
                  placeholder="your.email@example.com"
                  required
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{
                    boxShadow: '0 0 10px rgba(0, 255, 242, 0.8)',
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 text-primary font-mono">
                <Lock size={16} />
                <span>PASSWORD_KEY</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input-background border-2 border-primary/30 focus:border-primary font-mono h-12"
                  placeholder="••••••••••••"
                  required
                  disabled={loading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{
                    boxShadow: '0 0 10px rgba(0, 255, 242, 0.8)',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 border-2 border-primary bg-primary/10 hover:bg-primary/20 text-primary font-mono relative overflow-hidden group"
              disabled={loading}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>ENTER_SYSTEM</span>
                  </>
                )}
              </span>

              {/* Animated gradient */}
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
            </Button>
          </form>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>

        {/* Demo Credentials Info */}
        <motion.div
          className="mt-8 border-2 border-accent/20 bg-accent/5 backdrop-blur-sm p-6 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            boxShadow: '0 0 20px rgba(255, 0, 110, 0.1)',
          }}
        >
          {/* Tech corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent" />

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"
                style={{
                  boxShadow: '0 0 10px rgba(255, 0, 110, 0.8)',
                }}
              />
              <p className="text-accent font-mono text-sm">DEMO_MODE_AVAILABLE</p>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              Test the dashboard with demo credentials:
            </p>
            <div className="bg-background/50 border border-accent/30 p-3 rounded font-mono text-sm space-y-1">
              <p className="text-primary">Email: <span className="text-accent">demo@amgad.design</span></p>
              <p className="text-primary">Password: <span className="text-accent">demo123</span></p>
            </div>
            <p className="text-muted-foreground text-xs mt-3">
              All changes in demo mode are temporary and reset on logout
            </p>
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          className="text-center mt-6 text-muted-foreground font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-accent">{'>'}</span> Unauthorized access will be logged and traced
        </motion.p>
      </motion.div>
    </div>
  );
}
