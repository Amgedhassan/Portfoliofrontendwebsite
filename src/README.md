# Amgad Design Portfolio

Modern, professional portfolio website built with React, TypeScript, and cutting-edge animation libraries. Features a Swiss Minimalist + Bento Grid design with comprehensive dashboard for content management.

🌐 **Live Site**: [amgad.design](https://amgad.design)  
🔧 **API**: [srvr.amgad.design](https://srvr.amgad.design)

---

## ✨ Features

### Portfolio
- 🎨 **Swiss Minimalist Design** - Clean, typography-focused layout
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎭 **Advanced Animations** - GSAP, Three.js, React Spring
- 🖼️ **Case Studies** - Detailed project showcases
- 💬 **Testimonials** - Client feedback section
- 🎓 **Mentorship** - Teaching & coaching offerings
- 📧 **Contact Form** - Direct communication

### Dashboard
- 🔐 **JWT Authentication** - Secure login system
- 📊 **CRUD Operations** - Full content management
- 🎯 **Projects Management** - Add, edit, delete case studies
- ⭐ **Testimonials Management** - Manage client reviews
- 📚 **Mentorship Sessions** - Manage coaching offerings
- 🖼️ **Image Handling** - Robust error handling for all images

---

## 🚀 Tech Stack

### Core
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool
- **React Router 6.27** - Routing

### Styling
- **Tailwind CSS 4.0** - Utility-first CSS
- **Shadcn/UI** - Component library
- **Radix UI** - Accessible primitives

### Animation
- **GSAP 3.12** - Professional animations
- **Three.js + R3F** - 3D graphics
- **React Spring** - Physics-based animations
- **Motion (Framer Motion)** - React animations
- **TSParticles** - Particle effects
- **Lottie** - Vector animations

### State & API
- **Custom Hooks** - API integration
- **JWT** - Authentication
- **Axios-like Fetch** - HTTP client

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/amgad-portfolio.git
cd amgad-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in `/dist`.

**Preview production build:**
```bash
npm run preview
```

---

## 🚢 Deployment

### VPS Deployment (Recommended)

**Quick Deploy:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Manual Deploy:**
```bash
# 1. Build
npm run build

# 2. Upload dist/ to VPS
scp -r dist/* user@your-vps:/var/www/portfolio

# 3. Configure Nginx (see nginx.conf)
sudo nginx -t
sudo systemctl reload nginx
```

See `docs/VPS_DEPLOYMENT.md` for detailed instructions.

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

Configuration is in `vercel.json`.

---

## 📁 Project Structure

```
├── components/          # React components
│   ├── effects/        # Animation components
│   ├── minimal/        # Minimal theme components
│   ├── ui/             # Shadcn UI components
│   └── figma/          # Image handling
├── pages/              # Page components
│   ├── minimal/        # Public pages
│   └── dashboard/      # Admin dashboard
├── hooks/              # Custom React hooks
├── utils/              # Utilities & API
├── styles/             # Global styles
└── public/             # Static assets
```

---

## 🎨 Animation Components

### Available Effects

```tsx
import { ParticleField } from './components/effects/ParticleField';
import { TextReveal } from './components/effects/TextReveal';
import { MorphingBlob } from './components/effects/MorphingBlob';
import { MagneticHover } from './components/effects/MagneticHover';
import { ParallaxTilt } from './components/effects/ParallaxTilt';
import { AnimatedCounter } from './components/effects/AnimatedCounter';
import { WaveBackground } from './components/effects/WaveBackground';
import { fireConfetti } from './components/effects/ConfettiExplosion';
```

**Demo**: Visit `/animations` to see all effects in action.

See `docs/ANIMATION_GUIDE.md` for complete documentation.

---

## 🔐 Dashboard Access

**Login URL**: `/dashboard/login`

**Default Credentials**: Set up via API backend

**Features**:
- Manage case studies
- Manage testimonials  
- Manage mentorship sessions
- Real-time updates
- Image validation

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables

```bash
VITE_API_URL=https://srvr.amgad.design
```

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ Performance
- 🎯 **Core Web Vitals**: All green
- 📦 **Bundle Size**: ~200 KB gzipped (with code splitting)
- 🚀 **First Contentful Paint**: <1s
- ♿ **Accessibility**: WCAG 2.1 AA compliant

---

## 🔧 Configuration

### API Integration

API client configured in `utils/api.ts`:
- Base URL from environment variables
- JWT token management
- Error handling
- Request/response interceptors

### Routing

Routes configured in `App.tsx`:
- Public routes (portfolio pages)
- Protected routes (dashboard)
- 404 handling
- Scroll restoration

---

## 📚 Documentation

Comprehensive documentation in `/docs`:
- **ANIMATION_GUIDE.md** - Animation library reference
- **VPS_DEPLOYMENT.md** - VPS deployment guide
- **DASHBOARD_GUIDE.md** - Dashboard usage
- **API_INTEGRATION.md** - API documentation

---

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📝 License

© 2025 Amgad Design. All rights reserved.

This is a personal portfolio project. Code structure and components can be used as reference, but please don't copy the design or content directly.

---

## 🙏 Acknowledgments

- **Shadcn/UI** - Beautiful component library
- **Radix UI** - Accessible primitives
- **GSAP** - Professional animations
- **Three.js** - 3D graphics
- **Tailwind CSS** - Utility-first CSS

---

## 📞 Contact

- **Website**: [amgad.design](https://amgad.design)
- **Email**: [contact form](https://amgad.design/contact)
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

## 🚀 Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Update API URL in `.env`
- [ ] Run `npm run dev`
- [ ] Visit `http://localhost:5173`
- [ ] Build with `npm run build`
- [ ] Deploy to VPS or Vercel

---

**Built with ❤️ and lots of coffee ☕**
