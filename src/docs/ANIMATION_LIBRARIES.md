# 🎨 Animation Libraries Reference

Complete API reference for all 16 animation libraries installed in the portfolio.

---

## 📦 Installed Libraries

### Core Animation
1. **GSAP 3.12.5** - Professional animation platform
2. **Motion (Framer Motion)** - React animation library  
3. **React Spring 9.7.4** - Physics-based animations

### 3D & WebGL
4. **Three.js** - 3D graphics library
5. **@react-three/fiber** - React renderer for Three.js
6. **@react-three/drei** - Three.js helpers

### Particles & Effects
7. **TSParticles 3.7.1** - Particle system
8. **React TSParticles 2.12.2** - React wrapper

### Vector & Lottie
9. **Lottie Web 5.12.2** - Adobe After Effects animations
10. **React Lottie Player 2.1.0** - React Lottie wrapper

### Utilities
11. **React Intersection Observer** - Scroll triggers
12. **React Use Measure** - Element measurements
13. **React Tilt** - Parallax tilt effects
14. **Canvas Confetti** - Celebration effects
15. **React Confetti** - Confetti wrapper
16. **@auto-animate/react** - Auto animations

---

## 🎯 Quick Usage

### GSAP
```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.to('.element', {
  x: 100,
  duration: 1,
  ease: 'power2.out'
});
```

### Motion (Framer Motion)
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### React Spring
```tsx
import { useSpring, animated } from 'react-spring';

const props = useSpring({ 
  from: { opacity: 0 },
  to: { opacity: 1 }
});

<animated.div style={props}>Content</animated.div>
```

### Three.js with React Three Fiber
```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

<Canvas>
  <ambientLight />
  <OrbitControls />
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="hotpink" />
  </mesh>
</Canvas>
```

### TSParticles
```tsx
import Particles from 'react-tsparticles';

<Particles
  options={{
    particles: {
      number: { value: 80 },
      color: { value: "#ffffff" }
    }
  }}
/>
```

---

See `ANIMATION_GUIDE.md` for component usage examples.
