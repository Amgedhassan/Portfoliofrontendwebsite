import { useState } from 'react';
import { motion } from 'motion/react';
import { ParticleField } from '../components/effects/ParticleField';
import { TextReveal } from '../components/effects/TextReveal';
import { MorphingBlob } from '../components/effects/MorphingBlob';
import { MagneticHover } from '../components/effects/MagneticHover';
import { fireConfetti } from '../components/effects/ConfettiExplosion';
import { ParallaxTilt } from '../components/effects/ParallaxTilt';
import { AnimatedCounter } from '../components/effects/AnimatedCounter';
import { WaveBackground } from '../components/effects/WaveBackground';
import { Button } from '../components/ui/button';
import { Sparkles, Zap, Palette, Rocket } from 'lucide-react';

export default function AnimationShowcase() {
  const [particleVariant, setParticleVariant] = useState<'default' | 'matrix' | 'constellation' | 'galaxy'>('constellation');
  const [textVariant, setTextVariant] = useState<'fade' | 'slide' | 'wave' | 'glitch'>('wave');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section with Particles */}
      <section className="relative min-h-screen flex items-center justify-center">
        <ParticleField variant={particleVariant} className="opacity-50" />
        <WaveBackground color="#00fff2" opacity={0.08} />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <TextReveal variant={textVariant} className="text-6xl md:text-8xl mb-6">
            Animation Showcase
          </TextReveal>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Explore cutting-edge visual effects and animations
          </motion.p>

          {/* Particle Variant Switcher */}
          <div className="flex gap-3 justify-center mb-4 flex-wrap">
            {(['default', 'matrix', 'constellation', 'galaxy'] as const).map((variant) => (
              <Button
                key={variant}
                onClick={() => setParticleVariant(variant)}
                variant={particleVariant === variant ? 'default' : 'outline'}
                className="font-mono"
              >
                {variant}
              </Button>
            ))}
          </div>

          {/* Text Variant Switcher */}
          <div className="flex gap-3 justify-center flex-wrap">
            {(['fade', 'slide', 'wave', 'glitch'] as const).map((variant) => (
              <Button
                key={variant}
                onClick={() => setTextVariant(variant)}
                variant={textVariant === variant ? 'default' : 'outline'}
                size="sm"
                className="font-mono"
              >
                {variant}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Morphing Blobs */}
      <section className="py-32 px-6 bg-neutral-950 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl mb-16 text-center">3D Morphing Blobs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="aspect-square">
              <MorphingBlob color="#00fff2" />
            </div>
            <div className="aspect-square">
              <MorphingBlob color="#7000ff" />
            </div>
            <div className="aspect-square">
              <MorphingBlob color="#ff006e" />
            </div>
          </div>
        </div>
      </section>

      {/* Magnetic Hover & Parallax Tilt */}
      <section className="py-32 px-6 relative">
        <ParticleField variant="default" className="opacity-30" />
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl mb-16 text-center">Interactive Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'Magnetic Hover', color: 'primary' },
              { icon: Zap, title: 'Parallax Tilt', color: 'secondary' },
              { icon: Palette, title: 'Glare Effect', color: 'accent' },
            ].map((item, index) => (
              <ParallaxTilt key={index}>
                <MagneticHover strength={0.2}>
                  <motion.div
                    className="bg-card border-2 border-primary/20 p-8 rounded-3xl hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      boxShadow: '0 0 40px rgba(0, 255, 242, 0.1)',
                    }}
                  >
                    <item.icon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-2xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">
                      Hover over this card to see the interactive effect in action
                    </p>
                  </motion.div>
                </MagneticHover>
              </ParallaxTilt>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Counters */}
      <section className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl mb-16 text-center">Animated Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { end: 500, suffix: '+', label: 'Projects' },
              { end: 1000, suffix: '+', label: 'Clients' },
              { end: 99, suffix: '%', label: 'Satisfaction' },
              { end: 15, suffix: 'K+', label: 'Downloads' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4 text-primary">
                  <AnimatedCounter
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="text-xl text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confetti Demo */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl mb-8">Celebration Effects</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Click the button to trigger a confetti explosion!
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => fireConfetti({ particleCount: 100, spread: 70 })}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Rocket className="mr-2" />
              Launch Confetti
            </Button>
            
            <Button
              onClick={() => {
                fireConfetti({ 
                  particleCount: 50, 
                  angle: 60, 
                  origin: { x: 0 } 
                });
                fireConfetti({ 
                  particleCount: 50, 
                  angle: 120, 
                  origin: { x: 1 } 
                });
              }}
              size="lg"
              variant="outline"
            >
              <Sparkles className="mr-2" />
              Double Burst
            </Button>
            
            <Button
              onClick={() => {
                const duration = 3000;
                const end = Date.now() + duration;
                
                const frame = () => {
                  fireConfetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#00fff2', '#7000ff', '#ff006e']
                  });
                  fireConfetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#00fff2', '#7000ff', '#ff006e']
                  });

                  if (Date.now() < end) {
                    requestAnimationFrame(frame);
                  }
                };
                
                frame();
              }}
              size="lg"
              variant="outline"
            >
              <Zap className="mr-2" />
              Continuous
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-neutral-950 relative overflow-hidden">
        <WaveBackground color="#7000ff" amplitude={80} speed={0.002} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl mb-6"
          >
            Ready to Build?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12"
          >
            All these effects are ready to use in your portfolio!
          </motion.p>
          
          <MagneticHover>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-accent text-white border-0"
              onClick={() => fireConfetti({ particleCount: 200, spread: 90 })}
            >
              <Rocket className="mr-2" />
              Get Started Now
            </Button>
          </MagneticHover>
        </div>
      </section>
    </div>
  );
}
