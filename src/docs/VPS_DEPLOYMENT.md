# 🚀 VPS Deployment Guide

Complete guide for deploying your portfolio to a VPS (Virtual Private Server).

---

## 📋 Prerequisites

- Ubuntu 20.04+ VPS
- Domain name (amgad.design)
- SSH access to VPS
- Root or sudo privileges

---

## 🔧 VPS Setup

### 1. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js

```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install Nginx

```bash
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify
sudo systemctl status nginx
```

### 4. Install SSL (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d amgad.design -d www.amgad.design

# Auto-renewal (should be automatic)
sudo certbot renew --dry-run
```

---

## 📦 Deploy Application

### Method 1: Automated Deploy Script

**On your local machine:**

```bash
# Make deploy script executable
chmod +x deploy.sh

# Deploy
./deploy.sh
```

The script will:
1. Build the project
2. Upload to VPS
3. Restart Nginx

---

### Method 2: Manual Deployment

**Step 1: Build Locally**

```bash
npm run build
```

**Step 2: Upload to VPS**

```bash
# Create directory on VPS
ssh user@your-vps "sudo mkdir -p /var/www/portfolio"
ssh user@your-vps "sudo chown -R $USER:$USER /var/www/portfolio"

# Upload build files
scp -r dist/* user@your-vps:/var/www/portfolio/
```

**Step 3: Configure Nginx**

```bash
# Copy nginx config to VPS
scp nginx.conf user@your-vps:/tmp/portfolio.conf

# On VPS:
ssh user@your-vps

# Move config to sites-available
sudo mv /tmp/portfolio.conf /etc/nginx/sites-available/portfolio

# Create symlink
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove default config
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔧 Nginx Configuration

Your `nginx.conf` is already configured. Here's what it does:

```nginx
server {
    listen 80;
    server_name amgad.design www.amgad.design;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name amgad.design www.amgad.design;

    # SSL Configuration (Certbot will add these)
    # ssl_certificate /etc/letsencrypt/live/amgad.design/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/amgad.design/privkey.pem;

    root /var/www/portfolio;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing
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
}
```

---

## 🔄 Continuous Deployment

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to VPS
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        source: "dist/*"
        target: "/var/www/portfolio"
        strip_components: 1
        
    - name: Reload Nginx
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        script: sudo systemctl reload nginx
```

**Setup Secrets in GitHub:**
- `VPS_HOST`: Your VPS IP or domain
- `VPS_USERNAME`: SSH username
- `VPS_SSH_KEY`: Private SSH key

---

### Option 2: Manual Deploy Script

Already provided in `deploy.sh`. Update these variables:

```bash
VPS_USER="your-username"
VPS_HOST="your-vps-ip"
VPS_PATH="/var/www/portfolio"
```

---

## 🔐 Security Hardening

### 1. Configure Firewall

```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw enable
```

### 2. Disable Root Login

```bash
sudo nano /etc/ssh/sshd_config

# Set:
PermitRootLogin no
PasswordAuthentication no

sudo systemctl restart ssh
```

### 3. Install Fail2Ban

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 4. Keep System Updated

```bash
# Enable automatic security updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## 📊 Monitoring

### Check Nginx Status

```bash
sudo systemctl status nginx
```

### View Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Check SSL Certificate

```bash
sudo certbot certificates
```

### Monitor Server Resources

```bash
# Install htop
sudo apt install -y htop

# Run htop
htop
```

---

## 🔄 Updates & Maintenance

### Update Portfolio

```bash
# Method 1: Automated
./deploy.sh

# Method 2: Manual
npm run build
scp -r dist/* user@vps:/var/www/portfolio/
ssh user@vps "sudo systemctl reload nginx"
```

### Renew SSL Certificate

```bash
# Manual renewal
sudo certbot renew

# Check auto-renewal
sudo systemctl status certbot.timer
```

### Nginx Maintenance

```bash
# Test config
sudo nginx -t

# Reload (graceful)
sudo systemctl reload nginx

# Restart (hard restart)
sudo systemctl restart nginx
```

---

## 🐛 Troubleshooting

### Issue: 502 Bad Gateway

**Solution**: Check if files exist
```bash
ls -la /var/www/portfolio/
```

### Issue: 404 on Routes

**Solution**: Ensure SPA routing is configured
```bash
# In nginx config:
location / {
    try_files $uri $uri/ /index.html;
}
```

### Issue: SSL Not Working

**Solution**: Check certificate
```bash
sudo certbot certificates
sudo nginx -t
```

### Issue: Permissions Error

**Solution**: Fix ownership
```bash
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
```

### Issue: Changes Not Appearing

**Solution**: Clear browser cache and Nginx cache
```bash
# Clear Nginx cache
sudo rm -rf /var/cache/nginx/*
sudo systemctl reload nginx

# Hard refresh browser: Ctrl+Shift+R
```

---

## 📈 Performance Optimization

### Enable HTTP/2

Already enabled in nginx.conf:
```nginx
listen 443 ssl http2;
```

### Enable Brotli Compression

```bash
sudo apt install -y nginx-module-brotli

# Add to nginx.conf:
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### Enable Caching

Already configured in nginx.conf:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🎯 Quick Deploy Checklist

- [ ] VPS set up with Ubuntu 20.04+
- [ ] Node.js 18+ installed
- [ ] Nginx installed and running
- [ ] SSL certificate obtained
- [ ] Domain DNS configured
- [ ] Build project locally
- [ ] Upload dist/ to VPS
- [ ] Configure Nginx
- [ ] Test site
- [ ] Set up monitoring
- [ ] Configure auto-deployment (optional)

---

## 📞 Support

If you encounter issues:

1. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
2. Test Nginx config: `sudo nginx -t`
3. Check file permissions: `ls -la /var/www/portfolio`
4. Verify SSL: `sudo certbot certificates`

---

## 🚀 Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] SSL certificate active
- [ ] Firewall configured
- [ ] Security headers enabled
- [ ] Gzip/Brotli compression enabled
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Auto-renewal for SSL configured
- [ ] 404/error pages working

---

**Your portfolio is now live! 🎉**

Visit: https://amgad.design
