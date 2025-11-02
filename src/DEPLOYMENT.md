# 🚀 Deployment Guide - amgad.design Portfolio

This guide will help you deploy your portfolio website to production.

## 📋 Prerequisites

- Node.js 18+ installed
- Access to your hosting server (Nginx, Apache, or static hosting)
- Production API backend running at `https://srvr.amgad.design/api`
- Domain configured: `amgad.design`

## 🏗️ Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The project uses environment variables for configuration. Three environment files are provided:

- `.env.development` - For local development
- `.env.production` - For production build
- `.env.example` - Template for reference

**Production Environment Variables:**

```env
VITE_API_BASE=https://srvr.amgad.design/api
VITE_APP_NAME=amgad.design
VITE_APP_URL=https://amgad.design
```

> ⚠️ **Important**: Never commit `.env` files to version control. Use `.env.example` as a template.

### 3. Build for Production

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Bundle React components
- Optimize and minify assets
- Generate static files in the `dist/` directory
- Create code-split chunks for better performance

### 4. Test Production Build Locally

```bash
npm run preview
```

This serves the production build locally at `http://localhost:4173` for testing.

## 🌐 Deployment Options

### Option 1: Static Hosting (Recommended)

Deploy to services like **Vercel**, **Netlify**, or **Cloudflare Pages**:

#### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and it will auto-detect Vite configuration

#### Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Add environment variables in Cloudflare dashboard

### Option 2: Traditional Server (Nginx)

#### Upload Files

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder to your server:
```bash
scp -r dist/* user@your-server:/var/www/amgad.design/
```

#### Nginx Configuration

Create/edit `/etc/nginx/sites-available/amgad.design`:

```nginx
# HTTP -> HTTPS redirect
server {
    listen 80;
    server_name amgad.design www.amgad.design;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name amgad.design www.amgad.design;

    # SSL Configuration (Let's Encrypt recommended)
    ssl_certificate /etc/letsencrypt/live/amgad.design/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/amgad.design/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Website root
    root /var/www/amgad.design;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - redirect all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Disable access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/amgad.design /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### SSL Certificate (Let's Encrypt)

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d amgad.design -d www.amgad.design
```

### Option 3: Apache

#### Apache .htaccess Configuration

Create `.htaccess` in your web root:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # HTTPS redirect
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # SPA routing
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType text/javascript "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType application/x-javascript "access plus 1 year"
</IfModule>
```

## 🔐 Security Checklist

### Before Going Live

- [ ] **Remove Demo Credentials** - Hide or remove demo login UI in production
- [ ] **Environment Variables** - Ensure production `.env` is not committed to Git
- [ ] **HTTPS Enabled** - SSL certificate installed and working
- [ ] **Security Headers** - X-Frame-Options, CSP, etc. configured
- [ ] **Backend Protection** - JWT authentication working on backend
- [ ] **CORS Configured** - Backend allows requests from your domain
- [ ] **Rate Limiting** - Backend API has rate limiting enabled
- [ ] **Error Messages** - Don't expose sensitive info in error messages
- [ ] **Admin Routes** - `/dashboard/*` protected by authentication
- [ ] **Input Validation** - Forms validate and sanitize user input

### Optional Security Enhancements

```nginx
# Add to Nginx for enhanced security
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://srvr.amgad.design;" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## 📈 Performance Optimization

### Already Implemented

✅ **Code Splitting** - React.lazy() for route-based code splitting
✅ **Image Optimization** - Lazy loading with ImageWithFallback component
✅ **Bundle Optimization** - Vite's automatic tree-shaking and minification
✅ **CSS Optimization** - Tailwind CSS with purging unused styles
✅ **Compression** - Gzip/Brotli configured in Nginx

### Additional Optimizations

1. **Enable Brotli Compression** (Nginx):

```nginx
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
```

2. **Add Service Worker** for PWA (Optional):

```bash
npm install vite-plugin-pwa
```

3. **Preload Critical Assets**:

Add to `index.html`:
```html
<link rel="preload" as="font" href="/fonts/your-font.woff2" type="font/woff2" crossorigin>
```

## 🔍 SEO Configuration

### Meta Tags

✅ Already configured in `index.html`:
- Open Graph tags
- Twitter Card tags
- Primary meta tags

### Additional SEO Files

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://amgad.design/sitemap.xml
```

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://amgad.design/</loc>
        <lastmod>2025-11-01</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://amgad.design/work</loc>
        <lastmod>2025-11-01</lastmod>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://amgad.design/about</loc>
        <lastmod>2025-11-01</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://amgad.design/mentorship</loc>
        <lastmod>2025-11-01</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://amgad.design/contact</loc>
        <lastmod>2025-11-01</lastmod>
        <priority>0.7</priority>
    </url>
</urlset>
```

## 📊 Analytics (Optional)

### Google Analytics 4

Add to `index.html` in `<head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible Analytics (Privacy-friendly)

```html
<script defer data-domain="amgad.design" src="https://plausible.io/js/script.js"></script>
```

## 🧪 Testing

### Pre-deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test with `npm run preview`
- [ ] Test all routes (/, /work, /about, /mentorship, /contact)
- [ ] Test dashboard login (/dashboard/login)
- [ ] Test contact form submission
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test loading states and error handling
- [ ] Verify API integration with production backend
- [ ] Check browser console for errors
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)

### Performance Testing

Run Lighthouse audit:
```bash
npm install -g lighthouse
lighthouse https://amgad.design --view
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 🐛 Troubleshooting

### Issue: 404 on Page Refresh

**Solution**: Configure server to redirect all routes to `index.html` (see Nginx/Apache config above)

### Issue: API Requests Failing

**Causes**:
1. CORS not configured on backend
2. Wrong API URL in environment variables
3. JWT token expired

**Solution**:
1. Check backend CORS configuration
2. Verify `VITE_API_BASE` in `.env.production`
3. Test API endpoints directly: `curl https://srvr.amgad.design/api/case-studies`

### Issue: Blank Page After Deploy

**Causes**:
1. Base path not configured correctly
2. JavaScript errors
3. Missing environment variables

**Solution**:
1. Check browser console for errors
2. Verify all environment variables are set
3. Test with `npm run preview` locally

### Issue: Styles Not Loading

**Causes**:
1. CSS not bundled correctly
2. Cache issues

**Solution**:
1. Clear browser cache
2. Check network tab for CSS file
3. Rebuild: `rm -rf dist node_modules && npm install && npm run build`

## 🔄 Continuous Deployment

### GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE: ${{ secrets.VITE_API_BASE }}
          VITE_APP_NAME: amgad.design
          VITE_APP_URL: https://amgad.design
      
      - name: Deploy to Server
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          SOURCE: "dist/"
          TARGET: "/var/www/amgad.design/"
```

Add secrets in GitHub repository settings:
- `SSH_PRIVATE_KEY` - Your SSH private key
- `REMOTE_HOST` - Your server IP/domain
- `REMOTE_USER` - SSH username
- `VITE_API_BASE` - API base URL

## 📝 Post-Deployment

### Verify Deployment

1. **Homepage**: https://amgad.design/
2. **Work Page**: https://amgad.design/work
3. **Dashboard**: https://amgad.design/dashboard/login
4. **API Health**: https://srvr.amgad.design/api/health

### Monitor Performance

- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor API response times
- Track error rates in browser console
- Set up alerts for downtime

### Maintenance

- **Regular Updates**: Keep dependencies updated monthly
- **Security Patches**: Apply immediately when available
- **Backups**: Regular backups of backend database
- **SSL Renewal**: Certbot auto-renews, but verify quarterly

## 🎉 Launch!

Your portfolio is now live at **https://amgad.design**

### Next Steps

1. Test thoroughly in production
2. Share with potential clients
3. Monitor analytics and performance
4. Gather feedback and iterate
5. Keep content updated through the dashboard

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review browser console errors
3. Test API endpoints directly
4. Check server logs: `sudo tail -f /var/log/nginx/error.log`

---

**Last Updated**: November 1, 2025
**Version**: 1.0.0
