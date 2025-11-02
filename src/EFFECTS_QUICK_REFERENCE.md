# 🎨 Effects Quick Reference

## One-Page Cheat Sheet

---

## 🌟 Particle Backgrounds

```tsx
import { ParticleField } from './components/effects/ParticleField';

// 4 Variants:
<ParticleField variant="default" />        // Connected network
<ParticleField variant="matrix" />         // Matrix falling
<ParticleField variant="constellation" />  // Star field
<ParticleField variant="galaxy" />         // Swirling galaxy
```

---

## ✍️ Text Animations

```tsx
import { TextReveal } from './components/effects/TextReveal';

// 4 Variants:
<TextReveal variant="fade">Text</TextReveal>    // Fade up
<TextReveal variant="slide">Text</TextReveal>   // Slide right
<TextReveal variant="wave">Text</TextReveal>    // Wave effect
<TextReveal variant="glitch">Text</TextReveal>  // Glitch in

// With delay:
<TextReveal variant="wave" delay={0.5}>Text</TextReveal>
```

---

## 🎭 3D Morphing Blob

```tsx
import { MorphingBlob } from './components/effects/MorphingBlob';

<div className="w-96 h-96">
  <MorphingBlob color="#00fff2" />
</div>
```

---

## 🧲 Magnetic Hover

```tsx
import { MagneticHover } from './components/effects/MagneticHover';

<MagneticHover strength={0.3}>
  <Button>Hover Me</Button>
</MagneticHover>
```

---

## 🎪 3D Tilt Effect

```tsx
import { ParallaxTilt } from './components/effects/ParallaxTilt';

<ParallaxTilt glareEnable scale={1.05}>
  <Card>Your Content</Card>
</ParallaxTilt>

// Props:
tiltMaxAngleX={15}      // Max X angle
tiltMaxAngleY={15}      // Max Y angle
scale={1.05}            // Hover scale
glareEnable={true}      // Glare effect
glareMaxOpacity={0.3}   // Glare opacity
```

---

## 🎉 Confetti

```tsx
import { fireConfetti } from './components/effects/ConfettiExplosion';

// Simple burst:
fireConfetti();

// Custom:
fireConfetti({
  particleCount: 200,
  spread: 90,
  origin: { x: 0.5, y: 0.6 },
  colors: ['#00fff2', '#ff006e']
});

// Side cannons:
fireConfetti({ angle: 60, origin: { x: 0 } });
fireConfetti({ angle: 120, origin: { x: 1 } });
```

---

## 🔢 Animated Counter

```tsx
import { AnimatedCounter } from './components/effects/AnimatedCounter';

<AnimatedCounter 
  end={1000} 
  start={0}
  duration={2}
  prefix="$"
  suffix="+"
  decimals={0}
/>
```

---

## 🌊 Wave Background

```tsx
import { WaveBackground } from './components/effects/WaveBackground';

<WaveBackground 
  color="#00fff2"
  opacity={0.1}
  speed={0.001}
  amplitude={50}
/>
```

---

## 🔄 Auto Animate (Lists)

```tsx
import { useAutoAnimate } from './hooks/useAutoAnimate';

function List() {
  const [parent] = useAutoAnimate();
  
  return (
    <ul ref={parent}>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

## 📜 Scroll Detection

```tsx
import { useInView } from 'react-intersection-observer';

const { ref, inView } = useInView({
  threshold: 0.5,
  triggerOnce: true
});

<div ref={ref}>
  {inView && <AnimatedContent />}
</div>
```

---

## 🎬 GSAP Scroll Animations

```tsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  gsap.from('.element', {
    scrollTrigger: {
      trigger: '.element',
      start: 'top center',
      end: 'bottom center',
      scrub: true
    },
    opacity: 0,
    y: 100
  });
}, []);
```

---

## 🌀 React Spring

```tsx
import { useSpring, animated } from 'react-spring';

const props = useSpring({
  from: { opacity: 0, transform: 'scale(0.8)' },
  to: { opacity: 1, transform: 'scale(1)' }
});

<animated.div style={props}>
  Content
</animated.div>
```

---

## 🎨 Common Patterns

### Hero Section
```tsx
<section className="relative min-h-screen">
  <ParticleField variant="constellation" />
  <WaveBackground color="#00fff2" opacity={0.08} />
  <TextReveal variant="wave" className="text-6xl">
    Welcome
  </TextReveal>
</section>
```

### Interactive Card
```tsx
<ParallaxTilt>
  <MagneticHover>
    <div className="bg-card p-6 rounded-lg">
      Content
    </div>
  </MagneticHover>
</ParallaxTilt>
```

### Stats Section
```tsx
<div className="grid grid-cols-3 gap-8">
  {stats.map(stat => (
    <div key={stat.label}>
      <AnimatedCounter 
        end={stat.value} 
        suffix="+"
        className="text-4xl"
      />
      <p>{stat.label}</p>
    </div>
  ))}
</div>
```

### Success Action
```tsx
const handleSuccess = async () => {
  await saveData();
  fireConfetti({ particleCount: 150 });
};
```

---

## ⚡ Performance Tips

```tsx
// Lazy load heavy components
const MorphingBlob = lazy(() => import('./effects/MorphingBlob'));

// Disable on mobile
{!isMobile && <ParticleField />}

// Respect reduced motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

{!prefersReducedMotion && <Animations />}

// Use will-change for smooth animations
<div style={{ willChange: 'transform, opacity' }}>
  Animated element
</div>
```

---

## 🎯 Quick Combinations

**Cyberpunk**
```tsx
<ParticleField variant="matrix" />
<TextReveal variant="glitch">Cyberpunk</TextReveal>
```

**Elegant**
```tsx
<WaveBackground color="#000" opacity={0.05} />
<TextReveal variant="fade">Minimal</TextReveal>
```

**Futuristic**
```tsx
<ParticleField variant="galaxy" />
<MorphingBlob color="#00fff2" />
<TextReveal variant="wave">Future</TextReveal>
```

---

## 📦 Import Summary

```tsx
// Particles
import { ParticleField } from './components/effects/ParticleField';

// Text
import { TextReveal } from './components/effects/TextReveal';

// 3D
import { MorphingBlob } from './components/effects/MorphingBlob';
import { ParallaxTilt } from './components/effects/ParallaxTilt';

// Interactive
import { MagneticHover } from './components/effects/MagneticHover';

// Celebrations
import { fireConfetti } from './components/effects/ConfettiExplosion';

// Numbers
import { AnimatedCounter } from './components/effects/AnimatedCounter';

// Backgrounds
import { WaveBackground } from './components/effects/WaveBackground';

// Hooks
import { useAutoAnimate } from './hooks/useAutoAnimate';
import { useInView } from 'react-intersection-observer';

// Libraries
import gsap from 'gsap';
import { useSpring, animated } from 'react-spring';
```

---

**Print this page for quick reference!** 📄

All components are fully typed with TypeScript for IntelliSense support.
