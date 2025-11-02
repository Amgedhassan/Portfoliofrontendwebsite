# 🎨 Animation Effects Guide

Complete guide to using animation components in your portfolio.

---

## 📦 Installed Libraries

- **GSAP 3.12** - Professional animations
- **Three.js + React Three Fiber** - 3D graphics
- **React Spring** - Physics-based animations
- **TSParticles** - Particle effects
- **Lottie** - Vector animations
- **Motion (Framer Motion)** - React animations
- And more...

**Total**: ~200 KB gzipped (with code splitting)

---

## 🎯 Available Components

### 1. ParticleField

Interactive particle backgrounds with 4 variants.

```tsx
import { ParticleField } from './components/effects/ParticleField';

<ParticleField variant="constellation" />
```

**Variants**:
- `default` - Connected particle network
- `matrix` - Matrix-style falling characters
- `constellation` - Star constellation
- `galaxy` - Swirling galaxy

**Best for**: Hero sections, backgrounds

---

### 2. TextReveal

Animated text reveals with 4 animation styles.

```tsx
import { TextReveal } from './components/effects/TextReveal';

<TextReveal variant="wave" delay={0.2}>
  Welcome to My Portfolio
</TextReveal>
```

**Variants**:
- `fade` - Characters fade up
- `slide` - Slide from left
- `wave` - Wave effect from center
- `glitch` - Cyberpunk glitch entrance

**Best for**: Headlines, important text

---

### 3. MorphingBlob

3D morphing shapes with WebGL.

```tsx
import { MorphingBlob } from './components/effects/MorphingBlob';

<div className="w-96 h-96">
  <MorphingBlob color="#00fff2" />
</div>
```

**Best for**: Decorative elements, hero backgrounds

---

### 4. MagneticHover

Magnetic attraction on hover with spring physics.

```tsx
import { MagneticHover } from './components/effects/MagneticHover';

<MagneticHover strength={0.3}>
  <Button>Hover Me</Button>
</MagneticHover>
```

**Best for**: Buttons, interactive elements

---

### 5. ParallaxTilt

3D tilt effect with glare on hover.

```tsx
import { ParallaxTilt } from './components/effects/ParallaxTilt';

<ParallaxTilt glareEnable scale={1.05}>
  <Card>Your Content</Card>
</ParallaxTilt>
```

**Best for**: Project cards, feature cards

---

### 6. ConfettiExplosion

Celebration confetti effects.

```tsx
import { fireConfetti } from './components/effects/ConfettiExplosion';

<button onClick={() => fireConfetti()}>
  Celebrate! 🎉
</button>

// Custom confetti
fireConfetti({
  particleCount: 200,
  spread: 90,
  colors: ['#00fff2', '#ff006e']
});
```

**Best for**: Success messages, celebrations

---

### 7. AnimatedCounter

Number counting animations triggered on scroll.

```tsx
import { AnimatedCounter } from './components/effects/AnimatedCounter';

<AnimatedCounter 
  end={1000} 
  suffix="+"
  duration={2}
/>
```

**Best for**: Statistics, metrics

---

### 8. WaveBackground

Organic wave animations using canvas.

```tsx
import { WaveBackground } from './components/effects/WaveBackground';

<WaveBackground 
  color="#00fff2"
  opacity={0.1}
  amplitude={50}
  speed={0.001}
/>
```

**Best for**: Section backgrounds

---

## 🎨 Example Combinations

### Futuristic Hero

```tsx
<section className="relative min-h-screen">
  <ParticleField variant="galaxy" />
  <WaveBackground color="#00fff2" opacity={0.08} />
  <div className="relative z-10">
    <TextReveal variant="wave" className="text-6xl">
      Amazing Portfolio
    </TextReveal>
  </div>
</section>
```

### Interactive Card Grid

```tsx
<div className="grid grid-cols-3 gap-8">
  {projects.map((project) => (
    <ParallaxTilt key={project.id}>
      <MagneticHover>
        <Card>{project.title}</Card>
      </MagneticHover>
    </ParallaxTilt>
  ))}
</div>
```

### Statistics Section

```tsx
<div className="grid grid-cols-4 gap-8">
  <div>
    <AnimatedCounter end={500} suffix="+" className="text-4xl" />
    <p>Projects</p>
  </div>
  <div>
    <AnimatedCounter end={1000} suffix="+" className="text-4xl" />
    <p>Clients</p>
  </div>
</div>
```

---

## ⚡ Performance Tips

### Lazy Load Heavy Components

```tsx
import { lazy, Suspense } from 'react';

const MorphingBlob = lazy(() => import('./components/effects/MorphingBlob'));

<Suspense fallback={null}>
  <MorphingBlob />
</Suspense>
```

### Disable on Mobile

```tsx
const isMobile = window.innerWidth < 768;

{!isMobile && <ParticleField variant="galaxy" />}
```

### Respect Reduced Motion

```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

{!prefersReducedMotion && <Animations />}
```

---

## 📚 Further Reading

- See `/animations` route for live demo
- Full API in `ANIMATION_LIBRARIES.md`
- Quick reference in `EFFECTS_QUICK_REFERENCE.md`

---

**Note**: Animation showcase page (`/animations`) is hidden from navigation but accessible via direct URL for testing.
