# 🛠️ Setup Instructions

Complete setup guide for getting your portfolio running locally and deploying to production.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **npm** or **yarn** package manager
- ✅ **Git** for version control
- ✅ **Code editor** (VS Code recommended)
- ✅ **Backend API** running at `https://srvr.amgad.design/api`

## 🚀 Initial Setup

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd amgad-portfolio

# Install all dependencies
npm install
```

This will install:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Motion (Framer Motion)
- shadcn/ui components
- All other dependencies listed in package.json

### Step 2: Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.development
```

Edit `.env.development`:

```env
VITE_API_BASE=https://srvr.amgad.design/api
VITE_APP_NAME=amgad.design (Dev)
VITE_APP_URL=http://localhost:5173
```

### Step 3: Start Development Server

```bash
npm run dev
```

Your portfolio will be available at: **http://localhost:5173**

## 🎨 Development

### Available Scripts

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code for errors
npm run lint
```

### Project Structure

```
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── minimal/        # Minimal theme components
│   └── *.tsx           # Other reusable components
├── pages/              # Route pages
│   ├── minimal/        # Main pages (Home, Work, etc.)
│   └── dashboard/      # Dashboard pages
├── utils/              # Utilities
│   ├── api.ts         # API client
│   ├── dashboardApi.ts # Dashboard API
│   └── mockData.ts    # Mock data
├── styles/            # Styles
│   └── globals.css    # Global CSS + Tailwind
├── hooks/             # Custom hooks
├── public/            # Static assets
├── App.tsx            # Main app
├── main.tsx           # Entry point
└── index.html         # HTML template
```

## 🔌 API Integration

### Backend API

The portfolio connects to:
```
https://srvr.amgad.design/api
```

### Endpoints Used

- `GET /case-studies` - Get all projects
- `GET /case-studies/:slug` - Get single project
- `GET /testimonials` - Get all testimonials
- `GET /mentorship` - Get mentorship sessions
- `POST /contact` - Submit contact form
- `POST /users/login` - Dashboard authentication

### Mock Data Fallback

If the API is unavailable (development/offline), the app automatically uses mock data from `utils/mockData.ts`.

## 🎯 Dashboard Setup

### Access Dashboard

Navigate to: **http://localhost:5173/dashboard/login**

### Demo Credentials

```
Email: demo@amgad.design
Password: demo123
```

Demo mode uses local mock data and doesn't make API calls.

### Real Admin Access

Use your backend admin credentials to access the real API with full CRUD operations.

## 🎨 Customization

### 1. Update Content

Edit `utils/mockData.ts` to change mock data for development:

```typescript
export const mockCaseStudies: CaseStudy[] = [
  {
    title: "Your Project",
    slug: "your-project",
    // ... more fields
  }
];
```

### 2. Change Theme Colors

Edit `styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* Customize these colors */
}
```

### 3. Modify Components

Components are in `/components`:
- Navigation: `components/minimal/MinimalNav.tsx`
- Footer: `components/minimal/MinimalFooter.tsx`
- Cards: `components/ProjectCard.tsx`, etc.

### 4. Update Pages

Pages are in `/pages/minimal`:
- Homepage: `MinimalHome.tsx`
- Work: `MinimalWork.tsx`
- About: `MinimalAbout.tsx`
- Contact: `MinimalContact.tsx`
- Mentorship: `MinimalMentorship.tsx`

## 🧪 Testing

### Manual Testing

Test these features locally:

1. **Homepage** - All sections load
2. **Navigation** - All links work
3. **Projects** - Click through to case studies
4. **Contact Form** - Submit and see response
5. **Dashboard Login** - Both demo and real credentials
6. **CRUD Operations** - Create/Edit/Delete in dashboard
7. **Responsive** - Test on different screen sizes
8. **API Fallback** - Disconnect internet to test mock data

### Browser Testing

Test in multiple browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

### Performance Testing

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:5173 --view
```

## 🚀 Building for Production

### Create Production Build

```bash
npm run build
```

This generates optimized files in the `dist/` directory:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps (optional)

### Test Production Build

```bash
npm run preview
```

Access at: **http://localhost:4173**

### Build Size

Expected build size:
- Total: ~1.5 MB
- Gzipped: ~300-400 KB
- First load JS: ~150 KB

## 🌐 Deployment

### Quick Deploy Options

1. **Vercel (Recommended)**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm i -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Traditional Server**
   ```bash
   npm run build
   scp -r dist/* user@server:/var/www/amgad.design/
   ```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for fast deployment.

## 🔐 Security

### Before Going Live

1. **Environment Variables**
   - Never commit `.env` files to Git
   - Use production values in hosting platform

2. **Dashboard Access**
   - Use strong admin passwords
   - Consider hiding demo mode in production

3. **API Security**
   - Ensure backend has proper CORS configuration
   - Verify JWT authentication is working
   - Check rate limiting is enabled

4. **HTTPS**
   - SSL certificate must be installed
   - All API calls over HTTPS

## 📊 Development Tools

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Auto Rename Tag
- GitLens

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run build
```

### API Connection Issues

1. Check backend is running: `curl https://srvr.amgad.design/api/case-studies`
2. Check CORS is enabled on backend
3. Verify environment variable: `echo $VITE_API_BASE`
4. Clear browser cache and reload

### Build Errors

```bash
# Clean and rebuild
rm -rf dist
npm run build
```

## 📚 Learning Resources

### Documentation

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Motion Docs](https://motion.dev/)

### Component Library

- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## 🔄 Updating Dependencies

### Check for Updates

```bash
npm outdated
```

### Update All Dependencies

```bash
npm update
```

### Update Specific Package

```bash
npm install package-name@latest
```

## 💡 Tips & Best Practices

1. **Commit Often** - Use Git to track changes
2. **Test Thoroughly** - Test before deploying
3. **Keep Dependencies Updated** - Security patches
4. **Monitor Performance** - Use Lighthouse regularly
5. **Backup Data** - Regular backend database backups
6. **Use Environment Variables** - Never hardcode secrets
7. **Write Clean Code** - Follow TypeScript best practices
8. **Document Changes** - Comment complex logic

## 📞 Getting Help

If you encounter issues:

1. **Check Browser Console** - F12 Developer Tools
2. **Check Terminal Output** - Error messages
3. **Review Documentation** - This guide and [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Check API Status** - Test endpoints directly
5. **Search Issues** - Similar problems online

## ✅ Setup Complete!

You're now ready to:
- ✅ Develop locally
- ✅ Customize content
- ✅ Test features
- ✅ Build for production
- ✅ Deploy to hosting

Next steps:
1. Customize content in mock data
2. Connect to your backend API
3. Test all features thoroughly
4. Deploy to production
5. Monitor and maintain

---

**Happy coding! 🚀**

For deployment, see: [DEPLOYMENT.md](./DEPLOYMENT.md)
For quick deploy, see: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
