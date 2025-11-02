# 🚀 GitHub & VPS Deployment Guide

Complete guide to pushing your portfolio to GitHub and deploying to VPS.

---

## 📋 Prerequisites

- [x] GitHub account
- [x] VPS with Ubuntu 20.04+
- [x] Domain name configured
- [x] Git installed locally
- [x] SSH access to VPS

---

## Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create new repository:
   - Name: `amgad-portfolio` (or your choice)
   - Description: "Professional portfolio built with React, TypeScript, and GSAP"
   - Visibility: Public or Private
   - **DO NOT** initialize with README (we have one)

### Step 2: Initialize Git Locally

```bash
# Navigate to project directory
cd /path/to/amgad-portfolio

# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Portfolio with dashboard and animations"
```

### Step 3: Connect to GitHub

```bash
# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/amgad-portfolio.git

# Or use SSH (recommended):
git remote add origin git@github.com:yourusername/amgad-portfolio.git

# Verify remote
git remote -v
```

### Step 4: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

### Step 5: Verify on GitHub

1. Visit your repository on GitHub
2. Check all files are present
3. Verify README.md displays correctly

---

## Part 2: Set Up VPS

### Step 1: Connect to VPS

```bash
ssh your-username@your-vps-ip
```

### Step 2: Install Required Software

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git

# Verify installations
node --version
npm --version
nginx -v
git --version
```

### Step 3: Configure Firewall

```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
sudo ufw status
```

### Step 4: Install SSL Certificate

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d amgad.design -d www.amgad.design

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)
```

### Step 5: Create Project Directory

```bash
# Create directory
sudo mkdir -p /var/www/portfolio

# Set ownership
sudo chown -R $USER:$USER /var/www/portfolio
```

### Step 6: Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/portfolio
```

**Paste this configuration:**

```nginx
server {
    listen 80;
    server_name amgad.design www.amgad.design;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name amgad.design www.amgad.design;

    # SSL Configuration (Certbot will add these)
    ssl_certificate /etc/letsencrypt/live/amgad.design/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/amgad.design/privkey.pem;

    root /var/www/portfolio;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing - send all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

**Save and exit** (Ctrl+X, Y, Enter)

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

## Part 3: Deploy from Local Machine

### Option A: Using deploy.sh Script

1. **Update deploy.sh** with your VPS details:

```bash
nano deploy.sh
```

Update these lines:
```bash
VPS_USER="your-actual-username"
VPS_HOST="your-vps-ip-or-domain"
VPS_PATH="/var/www/portfolio"
```

2. **Make executable**:

```bash
chmod +x deploy.sh
```

3. **Deploy**:

```bash
./deploy.sh
```

---

### Option B: Manual Deployment

```bash
# 1. Build locally
npm install
npm run build

# 2. Upload to VPS
rsync -avz --delete dist/ your-username@your-vps-ip:/var/www/portfolio/

# 3. Set permissions on VPS
ssh your-username@your-vps-ip "sudo chown -R www-data:www-data /var/www/portfolio && sudo chmod -R 755 /var/www/portfolio"

# 4. Reload Nginx
ssh your-username@your-vps-ip "sudo systemctl reload nginx"
```

---

## Part 4: Set Up GitHub Actions (Optional but Recommended)

This enables automatic deployment when you push to GitHub!

### Step 1: Generate SSH Key on VPS

```bash
# On your VPS
ssh-keygen -t ed25519 -C "github-actions"

# Display public key
cat ~/.ssh/id_ed25519.pub
```

Copy the public key and add it to `~/.ssh/authorized_keys` on your VPS.

### Step 2: Get Private Key

```bash
# Display private key
cat ~/.ssh/id_ed25519
```

Copy the entire private key (including BEGIN and END lines).

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these secrets:

| Name | Value |
|------|-------|
| `VPS_HOST` | Your VPS IP or domain |
| `VPS_USERNAME` | Your SSH username |
| `VPS_SSH_KEY` | Private key from Step 2 |
| `VITE_API_URL` | https://srvr.amgad.design |

### Step 4: Verify Workflow

The workflow file is already created at `.github/workflows/deploy.yml`.

**Test it:**
1. Make a small change to README.md
2. Commit and push:
```bash
git add .
git commit -m "Test auto-deployment"
git push
```
3. Go to GitHub → Actions tab
4. Watch the deployment run
5. Visit your site to verify

---

## Part 5: Verify Deployment

### Check Website

1. **Main site**: https://amgad.design
2. **Dashboard**: https://amgad.design/dashboard/login
3. **SSL**: Should show secure padlock
4. **Routes**: Test all navigation links

### Check Server

```bash
# SSH to VPS
ssh your-username@your-vps-ip

# Check Nginx status
sudo systemctl status nginx

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Check access logs
sudo tail -f /var/log/nginx/access.log

# Check disk usage
df -h

# Check file permissions
ls -la /var/www/portfolio/
```

---

## 🔄 Regular Deployment Workflow

### Method 1: Auto-Deploy (with GitHub Actions)

```bash
# Make changes
# ...edit files...

# Commit and push
git add .
git commit -m "Update: description of changes"
git push

# GitHub Actions automatically deploys!
# Check Actions tab for status
```

### Method 2: Manual Deploy

```bash
# Make changes
# ...edit files...

# Deploy
./deploy.sh

# Or manually:
npm run build
rsync -avz --delete dist/ user@vps:/var/www/portfolio/
```

---

## 🛠️ Maintenance

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all (careful!)
npm update

# Or update one by one:
npm install react@latest
```

### SSL Certificate Renewal

Certbot auto-renews. Verify:

```bash
sudo certbot renew --dry-run
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log

# Clear old logs
sudo truncate -s 0 /var/log/nginx/access.log
sudo truncate -s 0 /var/log/nginx/error.log
```

### Monitor Server

```bash
# Install htop
sudo apt install htop

# Monitor resources
htop

# Check disk space
df -h

# Check memory
free -h
```

---

## 🐛 Troubleshooting

### Issue: Can't Connect to VPS

```bash
# Check SSH is running
sudo systemctl status ssh

# Check firewall
sudo ufw status

# Try verbose SSH
ssh -v your-username@your-vps-ip
```

### Issue: Nginx Won't Start

```bash
# Check configuration
sudo nginx -t

# Check for port conflicts
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Check error logs
sudo journalctl -u nginx
```

### Issue: Site Shows 502 Error

```bash
# Check if files exist
ls -la /var/www/portfolio/

# Check permissions
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio

# Restart Nginx
sudo systemctl restart nginx
```

### Issue: GitHub Actions Failing

1. Check Actions tab for error message
2. Verify secrets are set correctly
3. Check VPS SSH access
4. Verify build completes locally

---

## 📊 Deployment Checklist

### Pre-Deployment

- [ ] All features tested locally
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] API endpoints working
- [ ] Images loading correctly
- [ ] Dashboard functional

### VPS Setup

- [ ] VPS running Ubuntu 20.04+
- [ ] Node.js 18+ installed
- [ ] Nginx installed
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Domain DNS configured

### Deployment

- [ ] Code pushed to GitHub
- [ ] Secrets configured (if using Actions)
- [ ] Nginx configuration uploaded
- [ ] First deployment successful
- [ ] All routes working
- [ ] SSL working
- [ ] Dashboard accessible

### Post-Deployment

- [ ] Test on multiple devices
- [ ] Check browser console for errors
- [ ] Verify API integration
- [ ] Test dashboard CRUD operations
- [ ] Check SEO (robots.txt, sitemap.xml)
- [ ] Monitor logs for errors
- [ ] Set up backups (optional)

---

## 🎯 Quick Commands Reference

```bash
# GitHub
git add .
git commit -m "message"
git push

# VPS Deploy
./deploy.sh

# VPS Connect
ssh user@vps-ip

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
sudo systemctl reload nginx

# View Logs
sudo tail -f /var/log/nginx/error.log

# SSL Renew
sudo certbot renew --dry-run
```

---

## 🎉 Success!

Your portfolio is now:
- ✅ Pushed to GitHub
- ✅ Deployed to VPS
- ✅ Running with SSL
- ✅ Auto-deploying (optional)
- ✅ Production-ready

**Next**: Monitor, maintain, and iterate!

---

## 📞 Support Resources

- **GitHub Docs**: https://docs.github.com
- **Nginx Docs**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **DigitalOcean Tutorials**: https://www.digitalocean.com/community/tutorials

---

**Built with ❤️ and deployed with confidence!** 🚀
