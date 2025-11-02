# 🎨 Amgad Ahmed - Professional Portfolio

> A modern, high-converting portfolio website for product designer Amgad Ahmed, built with React, TypeScript, and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

## ✨ Features

### 🎯 Conversion-Optimized Design
- **Swiss Minimalist + Bento Grid** aesthetic
- **Data-driven UX** with clear CTAs
- **Social proof** with testimonials and metrics
- **Lead generation** focused homepage
- **Responsive design** for all devices

### 🚀 Technical Excellence
- ⚡ **Lightning-fast** Vite + React build
- 🎨 **Tailwind CSS** for styling
- 📱 **Fully responsive** design
- ♿ **Accessible** (WCAG 2.1)
- 🔍 **SEO optimized** with meta tags
- 📊 **Analytics ready** (GA4/Plausible)
- 🎭 **Smooth animations** with Motion (Framer Motion)

### 📊 Content Management
- **Full-featured Dashboard** at `/dashboard`
- **CRUD operations** for:
  - Case Studies/Projects
  - Testimonials
  - Mentorship Sessions
- **JWT Authentication** with demo mode
- **Live API integration** with automatic mock data fallback
- **Real-time updates** without page refresh

### 🎨 Design System
- **shadcn/ui** components
- **Lucide React** icons
- **Custom components**:
  - HolographicCard
  - GlitchText
  - CustomCursor
  - ScrollReveal
  - PageTransition

## 🏗️ Tech Stack

### Core
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool
- **React Router 6.27** - Routing

### Styling
- **Tailwind CSS 4.0** - Utility-first CSS
- **Motion 11.15** - Animations
- **shadcn/ui** - Component library

### State & Data
- **React Hooks** - State management
- **Fetch API** - HTTP requests
- **JWT** - Authentication

### Development
- **ESLint** - Code linting
- **TypeScript** - Static typing
- **Vite HMR** - Hot Module Replacement

## 📁 Project Structure

```
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── minimal/        # Minimal theme components
│   └── figma/          # Figma-specific components
├── pages/              # Route pages
│   ├── dashboard/      # Admin dashboard pages
│   └── minimal/        # Minimal theme pages
├── utils/              # Utility functions
│   ├── api.ts         # API client with fallback
│   ├── dashboardApi.ts # Dashboard-specific API
│   └── mockData.ts    # Mock data for development
├── styles/            # Global styles
│   └── globals.css    # Tailwind + custom CSS
├── hooks/             # Custom React hooks
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.html         # HTML template
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/amgad-portfolio.git
cd amgad-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Setup

Create `.env.development`:

```env
VITE_API_BASE=https://srvr.amgad.design/api
VITE_APP_NAME=amgad.design (Dev)
VITE_APP_URL=http://localhost:5173
```

## 🌐 API Integration

### Production API

The site connects to a live backend API at:
```
https://srvr.amgad.design/api
```

### Automatic Fallback

In development or if the API is unavailable, the app automatically falls back to mock data without breaking the UI.

### API Endpoints

- `GET /case-studies` - List all case studies
- `GET /case-studies/:slug` - Get single case study
- `GET /testimonials` - List all testimonials
- `GET /mentorship` - List mentorship sessions
- `POST /contact` - Submit contact form
- `POST /users/login` - Dashboard login

### Dashboard Authentication

**Demo Access:**
- Email: `demo@amgad.design`
- Password: `demo123`

**Real Access:**
- Use your backend admin credentials
- JWT token stored in localStorage

## 📊 Dashboard Features

Access the dashboard at `/dashboard/login`

### Project Management
- ✅ Create/Edit/Delete case studies
- ✅ Upload cover images and case study images
- ✅ Add key metrics and tags
- ✅ Set featured projects
- ✅ Manage project links (prototype, video)

### Testimonial Management
- ✅ Create/Edit/Delete testimonials
- ✅ Add client details and ratings
- ✅ Set testimonial type
- ✅ Feature testimonials on homepage

### Mentorship Sessions
- ✅ Create/Edit/Delete sessions
- ✅ Set pricing and offers
- ✅ Manage booking links
- ✅ Add session testimonials

## 🎨 Customization

### Theme Colors

Edit `styles/globals.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more variables */
}
```

### Components

All components are in `/components` and can be modified:

- **Navigation** - `/components/minimal/MinimalNav.tsx`
- **Footer** - `/components/minimal/MinimalFooter.tsx`
- **Hero** - `/pages/minimal/MinimalHome.tsx`

### Content

Update mock data in `/utils/mockData.ts` for development/demo purposes.

## 🔐 Security

### Built-in Security Features

✅ **JWT Authentication** - Secure dashboard access
✅ **Protected Routes** - Client-side route protection
✅ **HTTPS Required** - Secure data transmission
✅ **Input Validation** - Form validation with error handling
✅ **XSS Prevention** - React's built-in protection
✅ **Environment Variables** - Secure API configuration

### Best Practices

- Never commit `.env` files
- Use strong passwords for admin accounts
- Keep dependencies updated
- Regular security audits
- Monitor for suspicious activity

## 📈 Performance

### Lighthouse Scores (Target)

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Optimizations Implemented

✅ Code splitting with React.lazy()
✅ Image lazy loading
✅ Minified CSS/JS
✅ Tree-shaking
✅ Gzip compression
✅ Browser caching
✅ Preload critical assets

## 🔍 SEO

### Meta Tags

All pages include:
- Title tags
- Description tags
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Sitemap

Generate a sitemap at `public/sitemap.xml`

### Robots.txt

Configure at `public/robots.txt`

## 📱 Browser Support

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ iOS Safari (last 2 versions)
- ✅ Android Chrome (last 2 versions)

## 🚢 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive deployment instructions.

### Quick Deploy

```bash
# Build
npm run build

# Preview
npm run preview

# Deploy dist/ folder to your host
```

### Deployment Options

1. **Vercel** (Recommended)
2. **Netlify**
3. **Cloudflare Pages**
4. **Traditional Server** (Nginx/Apache)

## 🧪 Testing

### Manual Testing Checklist

- [ ] All routes load correctly
- [ ] Dashboard login works
- [ ] CRUD operations functional
- [ ] Forms submit successfully
- [ ] API fallback works
- [ ] Mobile responsive
- [ ] Animations smooth
- [ ] Images load correctly
- [ ] Links work
- [ ] SEO tags present

### Performance Testing

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://amgad.design --view
```

## 🤝 Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions:

1. Open an issue
2. Describe the problem/suggestion
3. Include screenshots if applicable

## 📄 License

Copyright © 2025 Amgad Ahmed. All rights reserved.

This is a personal portfolio project. The code structure and components can be used as reference, but please don't copy the content or design directly.

## 📞 Contact

**Amgad Ahmed**
- Website: [amgad.design](https://amgad.design)
- Email: hello@amgad.design
- LinkedIn: [linkedin.com/in/amgadahmed](https://linkedin.com/in/amgadahmed)

## 🙏 Acknowledgments

- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Lucide** - Icon library
- **Vite** - Build tool
- **React** - UI library

## 📊 Project Stats

- **Lines of Code**: ~15,000+
- **Components**: 50+
- **Routes**: 15+
- **API Endpoints**: 10+
- **Build Size**: ~300KB (gzipped)
- **Load Time**: <2s (First Contentful Paint)

## 🗺️ Roadmap

### Phase 1 - Launch ✅
- [x] Core pages (Home, Work, About, Contact)
- [x] Dashboard with CRUD operations
- [x] API integration
- [x] Responsive design
- [x] SEO optimization

### Phase 2 - Enhancements
- [ ] Blog section
- [ ] Case study templates
- [ ] Image optimization service
- [ ] PWA support
- [ ] Multi-language support

### Phase 3 - Advanced
- [ ] A/B testing
- [ ] Analytics dashboard
- [ ] CMS integration
- [ ] Email marketing integration

---

**Built with ❤️ by Amgad Ahmed**

Last Updated: November 1, 2025
Version: 1.0.0
