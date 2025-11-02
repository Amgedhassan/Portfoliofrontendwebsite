# 📁 Project Structure

Complete overview of the project structure and organization.

---

## 🗂️ Root Directory

```
amgad-portfolio/
├── .github/              # GitHub Actions workflows
├── components/           # React components
├── docs/                 # Documentation
├── hooks/                # Custom React hooks
├── pages/                # Page components
├── public/               # Static assets
├── styles/               # Global styles
├── utils/                # Utility functions
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── deploy.sh             # VPS deployment script
├── index.html            # HTML entry point
├── main.tsx              # React entry point
├── App.tsx               # Main app component
├── nginx.conf            # Nginx configuration
├── package.json          # Dependencies
├── README.md             # Project documentation
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel configuration
└── vite.config.ts        # Vite configuration
```

---

## 📦 Components Directory

```
components/
├── effects/              # Animation components
│   ├── AnimatedCounter.tsx
│   ├── ConfettiExplosion.tsx
│   ├── MagneticHover.tsx
│   ├── MorphingBlob.tsx
│   ├── ParallaxTilt.tsx
│   ├── ParticleField.tsx
│   ├── SmoothScroll.tsx
│   ├── TextReveal.tsx
│   └── WaveBackground.tsx
│
├── figma/                # Figma integration
│   └── ImageWithFallback.tsx
│
├── minimal/              # Minimal theme components
│   ├── MinimalFooter.tsx
│   └── MinimalNav.tsx
│
├── ui/                   # Shadcn UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── ... (45 components)
│
└── [other components]    # Shared components
    ├── DashboardLayout.tsx
    ├── EmptyState.tsx
    ├── ErrorBoundary.tsx
    ├── LoadingSpinner.tsx
    ├── ProjectCard.tsx
    ├── TestimonialCard.tsx
    ├── MentorshipCard.tsx
    └── ...
```

---

## 📄 Pages Directory

```
pages/
├── minimal/              # Public portfolio pages
│   ├── MinimalHome.tsx
│   ├── MinimalWork.tsx
│   ├── MinimalCaseStudy.tsx
│   ├── MinimalAbout.tsx
│   ├── MinimalMentorship.tsx
│   └── MinimalContact.tsx
│
├── dashboard/            # Admin dashboard pages
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Projects.tsx
│   ├── ProjectForm.tsx
│   ├── Testimonials.tsx
│   ├── TestimonialForm.tsx
│   ├── MentorshipSessions.tsx
│   └── MentorshipForm.tsx
│
├── AnimationShowcase.tsx # Demo page (hidden)
└── NotFound.tsx          # 404 page
```

---

## 🔧 Utils Directory

```
utils/
├── api.ts                # API client configuration
├── dashboardApi.ts       # Dashboard API methods
├── emptyStateHelpers.ts  # Empty state utilities
└── mockData.ts           # Mock data for development
```

---

## 🪝 Hooks Directory

```
hooks/
├── useApi.ts             # API integration hook
└── useAutoAnimate.ts     # Auto-animate hook
```

---

## 🎨 Styles Directory

```
styles/
└── globals.css           # Global styles & Tailwind imports
```

---

## 📚 Docs Directory

```
docs/
├── ANIMATION_GUIDE.md    # Animation components guide
├── DASHBOARD_GUIDE.md    # Dashboard usage guide
├── PROJECT_STRUCTURE.md  # This file
└── VPS_DEPLOYMENT.md     # VPS deployment guide
```

---

## 🔐 Configuration Files

### `.env.example`
Environment variables template. Copy to `.env` and update.

### `package.json`
Project dependencies and scripts.

### `tsconfig.json`
TypeScript configuration.

### `tailwind.config.ts`
Tailwind CSS configuration.

### `vite.config.ts`
Vite build tool configuration.

### `nginx.conf`
Nginx server configuration for VPS.

### `vercel.json`
Vercel deployment configuration.

---

## 🚀 Entry Points

### `index.html`
HTML template with:
- Meta tags
- Title
- Root div
- Script tag for main.tsx

### `main.tsx`
React entry point:
- Imports React
- Imports global styles
- Renders App component
- Mounts to #root

### `App.tsx`
Main application component:
- Router setup
- Route definitions
- Error boundary
- Layout components

---

## 🎯 Key Directories Explained

### `/components`
Reusable React components used across the application.

**Subdirectories**:
- `effects/` - Animation and visual effects
- `figma/` - Figma integration utilities
- `minimal/` - Minimal theme navigation/footer
- `ui/` - Shadcn UI component library

### `/pages`
Page-level components that represent routes.

**Subdirectories**:
- `minimal/` - Public portfolio pages
- `dashboard/` - Admin dashboard pages

### `/utils`
Helper functions and utilities.

**Files**:
- `api.ts` - HTTP client configuration
- `dashboardApi.ts` - Dashboard API methods
- `emptyStateHelpers.ts` - Empty state helpers
- `mockData.ts` - Development mock data

### `/hooks`
Custom React hooks for shared logic.

### `/docs`
Project documentation in Markdown.

### `/public`
Static assets served as-is:
- `favicon.svg` - Site favicon
- `robots.txt` - SEO robots file
- `sitemap.xml` - SEO sitemap

---

## 📝 File Naming Conventions

### Components
- PascalCase: `ProjectCard.tsx`
- One component per file
- Export as default or named export

### Utilities
- camelCase: `api.ts`
- Export functions directly

### Hooks
- Prefix with `use`: `useApi.ts`
- Follow React hooks rules

### Pages
- PascalCase: `MinimalHome.tsx`
- Match route names when possible

### Styles
- kebab-case for CSS: `globals.css`
- Component styles inline with Tailwind

---

## 🔄 Data Flow

```
User Request
    ↓
App.tsx (Router)
    ↓
Page Component (e.g., MinimalWork)
    ↓
useApi Hook
    ↓
API Client (utils/api.ts)
    ↓
Backend API (srvr.amgad.design)
    ↓
Response
    ↓
Component State
    ↓
UI Render
```

---

## 🎨 Styling Architecture

### Global Styles
`styles/globals.css` contains:
- Tailwind imports
- CSS variables
- Base typography
- Custom utility classes

### Component Styles
- Inline with Tailwind classes
- No separate CSS files
- Utility-first approach

### Theme
- Colors in CSS variables
- Dark mode ready (if needed)
- Consistent spacing scale

---

## 🔒 Protected Routes

Routes in `App.tsx` wrapped with `<ProtectedRoute>`:
- `/dashboard`
- `/dashboard/projects`
- `/dashboard/testimonials`
- `/dashboard/mentorship`

**Authentication**:
- JWT token in localStorage
- Redirect to login if not authenticated
- Dashboard API calls include token

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
Default styles for mobile, then override with breakpoints.

---

## 🎯 Code Organization Best Practices

### Components
- Keep components small and focused
- Extract reusable logic to hooks
- Use TypeScript interfaces for props
- Export types separately

### Utilities
- Pure functions when possible
- Well-documented with JSDoc
- Type-safe with TypeScript
- Unit testable

### Hooks
- Follow React hooks rules
- Single responsibility
- Reusable across components
- Type-safe

---

## 📊 Build Output

### Development
```
npm run dev
→ Vite dev server
→ Hot module reload
→ Source maps
```

### Production
```
npm run build
→ dist/
  ├── index.html
  ├── assets/
  │   ├── [hash].js
  │   ├── [hash].css
  │   └── [images]
  └── ...
```

**Optimizations**:
- Code splitting
- Tree shaking
- Minification
- Asset hashing
- Gzip compression

---

## 🔧 Scripts

```json
{
  "dev": "vite",                    // Start dev server
  "build": "tsc && vite build",     // Build for production
  "preview": "vite preview",        // Preview production build
  "lint": "eslint . --ext ts,tsx"   // Lint code
}
```

---

## 📦 Dependencies Categories

### Core
- react, react-dom, react-router-dom

### Build Tools
- vite, typescript, eslint

### Styling
- tailwindcss, postcss, autoprefixer

### UI Components
- @radix-ui/*, shadcn components

### Animation
- gsap, three, react-spring, motion

### Forms
- react-hook-form, zod

### Utilities
- date-fns, clsx, tailwind-merge

---

**This structure is optimized for:**
- ✅ Maintainability
- ✅ Scalability
- ✅ Performance
- ✅ Developer experience
- ✅ Production deployment
