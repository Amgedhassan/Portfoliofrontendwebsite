# Build & Deployment Guide for VPS

## 📋 Prerequisites

- Node.js 18+ installed on your VPS
- Nginx installed and configured
- PM2 (optional, for process management)
- Git installed
- SSL certificate (Let's Encrypt recommended)

## 🚀 Quick Deploy Steps

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Production ready portfolio"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

### 2. Clone on VPS

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Navigate to web directory
cd /var/www/

# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git amgad.design

# Navigate to project
cd amgad.design
```

### 3. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Or use yarn
yarn install

# Or use pnpm
pnpm install
```

### 4. Configure Environment

```bash
# Copy environment file
cp .env.example .env.production

# Edit if needed (already configured for production)
nano .env.production
```

### 5. Build for Production

```bash
# Build the project
npm run build

# This creates a 'dist' folder with optimized production files
```

### 6. Configure Nginx

```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/amgad.design

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/amgad.design /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 7. Set Up SSL (Let's Encrypt)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d amgad.design -d www.amgad.design

# Auto-renewal is set up automatically
```

### 8. Set Proper Permissions

```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/amgad.design/dist

# Set permissions
sudo chmod -R 755 /var/www/amgad.design/dist
```

## 🔄 Update Deployment (After Code Changes)

```bash
# SSH into VPS
ssh user@your-vps-ip

# Navigate to project
cd /var/www/amgad.design

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Reload nginx (if needed)
sudo systemctl reload nginx
```

## 📊 Verify Deployment

1. **Check Build Output**
   ```bash
   ls -la dist/
   ```

2. **Test Nginx Configuration**
   ```bash
   sudo nginx -t
   ```

3. **Check Nginx Status**
   ```bash
   sudo systemctl status nginx
   ```

4. **View Nginx Logs**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

5. **Visit Your Website**
   - https://amgad.design
   - Test all pages and features
   - Check dashboard at https://amgad.design/dashboard/login

## 🔐 Dashboard Access

- **URL**: https://amgad.design/dashboard/login
- **Demo Credentials** (for testing):
  - Username: `demo`
  - Password: `demo123`
- **Production**: Replace with your actual credentials managed through the backend API

## 🛠 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Nginx 404 Errors
- Check that `root` path in nginx.conf points to correct dist folder
- Verify file permissions
- Ensure `try_files` directive is correct for SPA routing

### API Connection Issues
- Verify `VITE_API_BASE_URL` in .env.production
- Check CORS settings on backend server
- Verify SSL certificates are valid

### Permission Denied
```bash
sudo chown -R $USER:$USER /var/www/amgad.design
```

## 📝 Environment Variables

| Variable | Production Value | Description |
|----------|-----------------|-------------|
| `VITE_API_BASE_URL` | `https://srvr.amgad.design` | Backend API endpoint |
| `VITE_DEV_MODE` | `false` | Disables dev mode indicator |

## 🎯 Performance Optimization

The build is already optimized with:
- ✅ Code splitting (React, UI, Radix vendors separated)
- ✅ Minification (Terser)
- ✅ Tree shaking
- ✅ Gzip compression (via Nginx)
- ✅ Asset caching (1 year for static assets)
- ✅ No source maps in production

## 📱 Testing Checklist

After deployment, test:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Case study pages display properly
- [ ] Contact form functions
- [ ] Dashboard login works
- [ ] Dashboard CRUD operations work
- [ ] Responsive design on mobile
- [ ] SSL certificate is valid
- [ ] Page load speed is optimal
- [ ] All images load correctly
- [ ] No console errors

## 🔄 Continuous Deployment (Optional)

Set up a deployment script:

```bash
# Create deploy.sh
#!/bin/bash
cd /var/www/amgad.design
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
echo "Deployment completed successfully!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run deployments:
```bash
./deploy.sh
```

## 📞 Support

- **Backend API**: https://srvr.amgad.design
- **GitHub Issues**: Create issues in your repository
- **Documentation**: See other .md files in project root

---

**Note**: Update `YOUR_USERNAME` and `YOUR_REPO` with your actual GitHub details before running commands.
