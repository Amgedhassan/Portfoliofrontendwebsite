# Amgad Hassan - Portfolio Website

An ultra-modern, minimal portfolio website for Product Designer Amgad Hassan, featuring smooth animations, wow effects, and seamless integration with a live backend API.

## 🎨 Features

- **Modern Design**: Minimal, sophisticated design with professional typography and clean layouts
- **Smooth Animations**: Built with Motion (Framer Motion) for fluid page transitions and scroll animations
- **Wow Effects**: 
  - Custom cursor (desktop)
  - Scroll progress indicator
  - Magnetic buttons
  - Scroll reveal animations
  - Parallax effects
- **Responsive**: Fully responsive design that works beautifully on all devices
- **Live Backend**: Connected to live API at https://srvr.amgad.design
- **SEO Ready**: Semantic HTML and proper meta structure
- **Fast Performance**: Optimized images and code splitting

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📁 Project Structure

```
├── App.tsx                 # Main app with routing
├── components/
│   ├── Navigation.tsx      # Header navigation
│   ├── Footer.tsx          # Footer component
│   ├── ProjectCard.tsx     # Case study card
│   ├── TestimonialCard.tsx # Testimonial card
│   ├── MentorshipCard.tsx  # Mentorship session card
│   ├── ScrollReveal.tsx    # Scroll animation wrapper
│   ├── MagneticButton.tsx  # Magnetic hover effect
│   ├── CustomCursor.tsx    # Custom cursor (desktop)
│   ├── ScrollProgress.tsx  # Scroll progress bar
│   ├── ScrollToTop.tsx     # Auto scroll to top on route change
│   └── LoadingSpinner.tsx  # Loading component
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── Work.tsx            # All projects
│   ├── CaseStudyDetail.tsx # Individual project
│   ├── About.tsx           # About page
│   ├── Mentorship.tsx      # Mentorship offerings
│   ├── Contact.tsx         # Contact page
│   └── NotFound.tsx        # 404 page
├── utils/
│   └── api.ts              # API utilities and types
├── hooks/
│   └── useApi.ts           # Custom React hook for API calls
└── styles/
    └── globals.css         # Global styles and theme
```

## 🎯 Pages

1. **Home** (`/`)
   - Hero section with animated intro
   - Featured work
   - About preview
   - Testimonials
   - Call-to-action sections

2. **Work** (`/work`)
   - All case studies
   - Filter by tags
   - Project cards with hover effects

3. **Case Study Detail** (`/work/:slug`)
   - Full project details
   - Problem statement
   - Role description
   - Key metrics
   - Links to prototype/video

4. **About** (`/about`)
   - Professional background
   - Experience timeline
   - Skills & expertise
   - Education & certifications

5. **Mentorship** (`/mentorship`)
   - Available sessions
   - Benefits of mentorship
   - Testimonials from mentees
   - Booking links

6. **Contact** (`/contact`)
   - Contact form
   - Direct contact information
   - Social links

## 🔌 API Integration

The portfolio connects to a live backend API with the following endpoints:

- `GET /api/case-studies` - Fetch all case studies
- `GET /api/case-studies/:slug` - Fetch single case study
- `GET /api/testimonials` - Fetch all testimonials
- `GET /api/mentorship` - Fetch mentorship sessions

All endpoints support `?featured=true` query parameter for featured content.

## 🎨 Design System

The design uses a consistent color system defined in `globals.css`:

- **Primary**: Deep dark (#030213)
- **Background**: Clean white (#ffffff)
- **Accent**: Subtle gray (#e9ebef)
- **Muted**: Medium gray for secondary text

Typography follows a hierarchical scale with proper line heights and weights for optimal readability.

## ✨ Animations & Effects

1. **Custom Cursor**: Desktop-only magnetic cursor that responds to interactive elements
2. **Scroll Progress**: Visual indicator at top of page showing scroll position
3. **Scroll Reveal**: Elements fade and slide in as you scroll
4. **Magnetic Buttons**: Buttons that respond to mouse proximity
5. **Smooth Transitions**: All interactions have fluid, natural animations
6. **Page Transitions**: Smooth navigation between pages

## 🚀 Performance

- Lazy loading for images
- Code splitting by route
- Optimized bundle size
- Efficient re-renders with React hooks
- Smooth 60fps animations

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 768px (tablet) and 1024px (desktop)
- Touch-optimized for mobile devices
- Adaptive navigation menu

## 🎯 Goals

This portfolio is designed to:
- Showcase Amgad's design expertise
- Demonstrate attention to detail
- Impress potential clients
- Land freelance projects and gigs
- Establish credibility in the design community

## 📄 License

© 2025 Amgad Hassan. All rights reserved.

---

Built with passion and attention to detail 🎨
