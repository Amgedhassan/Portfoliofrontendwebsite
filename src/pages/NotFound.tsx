import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { MagneticButton } from '../components/MagneticButton';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="mb-4" style={{ fontSize: '120px', lineHeight: 1 }}>
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Button asChild size="lg">
                  <Link to="/" className="flex items-center gap-2">
                    <Home size={18} />
                    Go Home
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
                  <button className="flex items-center gap-2">
                    <ArrowLeft size={18} />
                    Go Back
                  </button>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
