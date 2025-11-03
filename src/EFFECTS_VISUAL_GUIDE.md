# 🎨 Visual Effects Guide

## Complete Visual Reference for All Animation Effects

---

## 1️⃣ PARTICLE FIELD

### Default Variant
```tsx
<ParticleField variant="default" />
```
**Visual**: Connected particle network with glowing cyan lines  
**Use Case**: Professional tech backgrounds  
**Performance**: Medium (80 particles)  
**Best For**: Hero sections, about pages

---

### Matrix Variant
```tsx
<ParticleField variant="matrix" />
```
**Visual**: Falling green characters like The Matrix  
**Use Case**: Cyberpunk aesthetic, tech demos  
**Performance**: Medium (100 particles)  
**Best For**: Developer portfolios, tech showcases

---

### Constellation Variant
```tsx
<ParticleField variant="constellation" />
```
**Visual**: Starfield with connected triangles  
**Use Case**: Elegant, professional backgrounds  
**Performance**: Light (60 particles)  
**Best For**: Any page, most versatile

---

### Galaxy Variant
```tsx
<ParticleField variant="galaxy" />
```
**Visual**: Swirling colorful particles with rotation  
**Use Case**: Dynamic, energetic backgrounds  
**Performance**: Heavy (150 particles)  
**Best For**: Landing pages, hero sections

---

## 2️⃣ TEXT REVEAL

### Fade Variant
```tsx
<TextReveal variant="fade">Your Text</TextReveal>
```
**Visual**: Characters fade up smoothly one by one  
**Speed**: Medium (0.03s stagger)  
**Feel**: Professional, clean  
**Best For**: Headers, important text

---

### Slide Variant
```tsx
<TextReveal variant="slide">Your Text</TextReveal>
```
**Visual**: Characters slide in from left with bounce  
**Speed**: Fast (0.02s stagger)  
**Feel**: Energetic, playful  
**Best For**: CTAs, dynamic content

---

### Wave Variant
```tsx
<TextReveal variant="wave">Your Text</TextReveal>
```
**Visual**: Wave effect from center outward  
**Speed**: Medium (0.03s stagger)  
**Feel**: Impressive, eye-catching  
**Best For**: Hero headlines, main titles

---

### Glitch Variant
```tsx
<TextReveal variant="glitch">Your Text</TextReveal>
```
**Visual**: Random glitch entrance with rotation  
**Speed**: Fast (0.02s stagger)  
**Feel**: Cyberpunk, futuristic  
**Best For**: Tech content, modern portfolios

---

## 3️⃣ MORPHING BLOB

### Standard Usage
```tsx
<div className="w-96 h-96">
  <MorphingBlob color="#00fff2" />
</div>
```
**Visual**: 3D morphing icosahedron with metallic material  
**Colors**: Any hex color  
**Performance**: Heavy (WebGL)  
**Best For**: Hero backgrounds, decorative elements

### Variations:
- **Cyan Blob**: `color="#00fff2"` - Tech, modern
- **Purple Blob**: `color="#7000ff"` - Creative, elegant  
- **Pink Blob**: `color="#ff006e"` - Bold, energetic

---

## 4️⃣ MAGNETIC HOVER

### Basic Usage
```tsx
<MagneticHover strength={0.3}>
  <Button>Hover Me</Button>
</MagneticHover>
```
**Visual**: Element follows cursor with spring physics  
**Strength**: 0.1-0.5 (default: 0.3)  
**Feel**: Interactive, playful  
**Best For**: Buttons, cards, interactive elements

### Strength Guide:
- **0.1**: Subtle movement
- **0.3**: Standard (recommended)
- **0.5**: Strong attraction

---

## 5️⃣ PARALLAX TILT

### Standard Tilt
```tsx
<ParallaxTilt glareEnable>
  <Card>Your Content</Card>
</ParallaxTilt>
```
**Visual**: 3D tilt on mouse hover with glare effect  
**Max Angle**: 15° (adjustable)  
**Scale**: 1.05 on hover  
**Best For**: Project cards, feature cards

### Options:
- **glareEnable**: Adds shine effect
- **scale**: Hover zoom (1.0-1.1)
- **tiltMaxAngle**: Max tilt degrees

---

## 6️⃣ CONFETTI

### Standard Burst
```tsx
fireConfetti();
```
**Visual**: Colorful confetti explosion from center  
**Particle Count**: 100  
**Colors**: Cyan, purple, pink  
**Best For**: Success messages, celebrations

### Double Side Burst
```tsx
fireConfetti({ angle: 60, origin: { x: 0 } });
fireConfetti({ angle: 120, origin: { x: 1 } });
```
**Visual**: Confetti shoots from both sides  
**Best For**: Major achievements

### Continuous
```tsx
// Fires confetti for 3 seconds
const duration = 3000;
const end = Date.now() + duration;

const frame = () => {
  fireConfetti({ particleCount: 3 });
  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
};
frame();
```
**Visual**: Continuous confetti rain  
**Best For**: Special moments

---

## 7️⃣ ANIMATED COUNTER

### Basic Counter
```tsx
<AnimatedCounter end={1000} suffix="+" />
```
**Visual**: Number counts up from 0 to target  
**Duration**: 2 seconds (adjustable)  
**Trigger**: On scroll into view  
**Best For**: Statistics, metrics

### With Formatting
```tsx
<AnimatedCounter 
  end={1000} 
  prefix="$"
  suffix="K"
  decimals={1}
/>
```
**Output**: $1000.0K  
**Best For**: Revenue, downloads, users

---

## 8️⃣ WAVE BACKGROUND

### Cyan Waves
```tsx
<WaveBackground 
  color="#00fff2"
  opacity={0.1}
  amplitude={50}
  speed={0.001}
/>
```
**Visual**: Three layers of flowing waves  
**Motion**: Organic, continuous  
**Performance**: Medium (canvas)  
**Best For**: Section backgrounds

### Subtle Waves
```tsx
<WaveBackground 
  color="#000"
  opacity={0.05}
  amplitude={30}
  speed={0.0005}
/>
```
**Visual**: Very subtle wave motion  
**Best For**: Professional, minimal designs

---

## 🎯 COMBINING EFFECTS

### Hero Section (Futuristic)
```tsx
<section className="relative min-h-screen">
  {/* Layer 1: Particles (far) */}
  <ParticleField variant="galaxy" className="opacity-30" />
  
  {/* Layer 2: Waves (mid) */}
  <WaveBackground color="#00fff2" opacity={0.08} />
  
  {/* Layer 3: 3D Blob (mid-far) */}
  <div className="absolute inset-0 flex items-center justify-center">
    <MorphingBlob color="#7000ff" className="w-96 h-96 opacity-20" />
  </div>
  
  {/* Layer 4: Content (front) */}
  <div className="relative z-10">
    <TextReveal variant="wave" className="text-6xl">
      Amazing Portfolio
    </TextReveal>
  </div>
</section>
```

**Result**: Multi-layered futuristic hero with depth

---

### Hero Section (Elegant)
```tsx
<section className="relative min-h-screen">
  {/* Subtle background */}
  <ParticleField variant="constellation" className="opacity-20" />
  <WaveBackground color="#000" opacity={0.03} />
  
  {/* Clean content */}
  <TextReveal variant="fade" className="text-5xl">
    Elegant Design
  </TextReveal>
</section>
```

**Result**: Clean, professional aesthetic

---

### Hero Section (Cyberpunk)
```tsx
<section className="relative min-h-screen bg-black">
  {/* Matrix rain */}
  <ParticleField variant="matrix" />
  
  {/* Glitch text */}
  <TextReveal variant="glitch" className="text-6xl text-green-400">
    SYSTEM_ONLINE
  </TextReveal>
</section>
```

**Result**: Matrix-style cyberpunk

---

### Interactive Cards Grid
```tsx
<div className="grid grid-cols-3 gap-8">
  {cards.map((card, index) => (
    <ParallaxTilt key={index}>
      <MagneticHover>
        <motion.div 
          className="bg-card p-6 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          {card.content}
        </motion.div>
      </MagneticHover>
    </ParallaxTilt>
  ))}
</div>
```

**Result**: Highly interactive card grid

---

### Statistics Section
```tsx
<section className="py-20">
  <div className="grid grid-cols-4 gap-8">
    {[
      { end: 500, suffix: '+', label: 'Projects' },
      { end: 1000, suffix: '+', label: 'Clients' },
      { end: 99, suffix: '%', label: 'Satisfaction' },
      { end: 15, suffix: 'K', label: 'Downloads' },
    ].map((stat, i) => (
      <div key={i} className="text-center">
        <AnimatedCounter 
          end={stat.end}
          suffix={stat.suffix}
          className="text-5xl text-primary"
        />
        <p className="mt-2">{stat.label}</p>
      </div>
    ))}
  </div>
</section>
```

**Result**: Impressive animated statistics

---

## 📐 LAYOUT PATTERNS

### Full-Screen Background
```tsx
<div className="relative min-h-screen">
  <ParticleField variant="constellation" />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</div>
```

### Section Background
```tsx
<section className="relative py-32">
  <WaveBackground color="#00fff2" opacity={0.1} />
  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Your content */}
  </div>
</section>
```

### Decorative Blob
```tsx
<div className="relative">
  <div className="absolute -top-40 -right-40 w-80 h-80 opacity-20">
    <MorphingBlob color="#7000ff" />
  </div>
  <div className="relative z-10">
    {/* Your content */}
  </div>
</div>
```

### Layered Effects
```tsx
<div className="relative">
  <ParticleField variant="default" className="opacity-30" />
  <WaveBackground color="#00fff2" opacity={0.05} />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</div>
```

---

## 🎨 COLOR SCHEMES

### Tech Modern (Cyan)
```tsx
<ParticleField variant="constellation" />
<TextReveal className="text-cyan-400">Tech</TextReveal>
<MorphingBlob color="#00fff2" />
```

### Creative Purple
```tsx
<ParticleField variant="galaxy" />
<TextReveal className="text-purple-400">Creative</TextReveal>
<MorphingBlob color="#7000ff" />
```

### Bold Pink
```tsx
<ParticleField variant="default" />
<TextReveal className="text-pink-500">Bold</TextReveal>
<MorphingBlob color="#ff006e" />
```

### Elegant Minimal
```tsx
<WaveBackground color="#000" opacity={0.03} />
<TextReveal className="text-neutral-900">Minimal</TextReveal>
```

---

## ⚡ PERFORMANCE TIPS

### Light Setup (Fast)
```tsx
<WaveBackground color="#00fff2" opacity={0.1} />
<TextReveal variant="fade">Content</TextReveal>
```
**Load Time**: Instant  
**FPS**: 60  
**Use**: Always safe

---

### Medium Setup (Balanced)
```tsx
<ParticleField variant="constellation" />
<TextReveal variant="wave">Content</TextReveal>
<AnimatedCounter end={1000} />
```
**Load Time**: <1s  
**FPS**: 50-60  
**Use**: Most pages

---

### Heavy Setup (Impressive)
```tsx
<ParticleField variant="galaxy" />
<MorphingBlob color="#00fff2" />
<TextReveal variant="glitch">Content</TextReveal>
```
**Load Time**: 1-2s  
**FPS**: 40-50  
**Use**: Hero sections only

---

## 📱 RESPONSIVE GUIDELINES

### Mobile
```tsx
{!isMobile && <ParticleField variant="galaxy" />}
{!isMobile && <MorphingBlob />}
<TextReveal variant="fade">Content</TextReveal>
```
**Strategy**: Disable heavy effects on mobile

### Tablet
```tsx
<ParticleField variant="constellation" className="opacity-50" />
<TextReveal variant="fade">Content</TextReveal>
```
**Strategy**: Reduce opacity, simpler effects

### Desktop
```tsx
<ParticleField variant="galaxy" />
<MorphingBlob color="#00fff2" />
<ParallaxTilt>
  <Card />
</ParallaxTilt>
```
**Strategy**: Full effects enabled

---

## 🎯 USE CASE MATRIX

| Effect | Hero | About | Work | Contact | Dashboard |
|--------|------|-------|------|---------|-----------|
| ParticleField | ✅✅✅ | ✅✅ | ✅✅ | ✅ | ❌ |
| TextReveal | ✅✅✅ | ✅✅ | ✅✅ | ✅✅ | ❌ |
| MorphingBlob | ✅✅ | ✅ | ❌ | ❌ | ❌ |
| MagneticHover | ✅✅ | ✅✅ | ✅✅✅ | ✅✅ | ✅ |
| ParallaxTilt | ✅✅ | ✅ | ✅✅✅ | ✅ | ❌ |
| Confetti | ✅ | ❌ | ❌ | ✅✅✅ | ✅✅ |
| Counter | ✅✅✅ | ✅✅✅ | ✅ | ❌ | ✅✅ |
| WaveBackground | ✅✅ | ✅✅ | ✅✅ | ✅✅ | ❌ |

**Legend**: ✅✅✅ Perfect, ✅✅ Great, ✅ Good, ❌ Not recommended

---

## 🎓 LEARNING ORDER

### Week 1: Basics
1. ParticleField (all variants)
2. TextReveal (all variants)
3. AnimatedCounter

### Week 2: Interaction
4. MagneticHover
5. ParallaxTilt
6. Confetti

### Week 3: Advanced
7. MorphingBlob (3D)
8. WaveBackground (canvas)
9. Combining effects

### Week 4: Master
10. Custom GSAP animations
11. Performance optimization
12. Creating custom effects

---

## 🎨 INSPIRATION

Your portfolio can now achieve effects seen on:
- ✅ Apple product launches (smooth reveals)
- ✅ Stripe homepage (3D cards)
- ✅ Vercel (particle backgrounds)
- ✅ Linear (magnetic hover)
- ✅ Awwwards winners (all effects combined)

But faster and more maintainable! 🚀

---

**Print this page as a visual reference!** 📄

Visit `/animations` to see all effects live in action!
