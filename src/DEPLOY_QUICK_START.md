# 🚀 Quick Start: Deploy to GitHub & VPS

## Step 1: Push to GitHub (5 minutes)

```bash
# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Production ready portfolio - Amgad Hassan Design"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git branch -M main
git push -u origin main
```

## Step 2: Setup VPS (10 minutes)

### Install Node.js
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

## Step 3: Clone & Build (5 minutes)

```bash
# Create directory
sudo mkdir -p /var/www/amgad.design

# Set ownership
sudo chown -R $USER:$USER /var/www/amgad.design

# Clone repository
cd /var/www/
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git amgad.design

# Navigate to project
cd amgad.design

# Install dependencies
npm install

# Build
npm run build
```

## Step 4: Configure Nginx (3 minutes)

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/amgad.design

# Enable site
sudo ln -s /etc/nginx/sites-available/amgad.design /etc/nginx/sites-enabled/

# Remove default
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 5: Setup SSL (5 minutes)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d amgad.design -d www.amgad.design

# Follow the prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)
```

## Step 6: Final Setup (2 minutes)

```bash
# Set permissions
sudo chown -R www-data:www-data /var/www/amgad.design/dist
sudo chmod -R 755 /var/www/amgad.design/dist

# Make deploy script executable
chmod +x /var/www/amgad.design/deploy.sh

# Restart Nginx
sudo systemctl restart nginx
```

## ✅ Verify Deployment

1. Visit: https://amgad.design
2. Test all pages
3. Try dashboard: https://amgad.design/dashboard/login
   - Demo login: `demo` / `demo123`

## 🔄 Future Updates

After making changes and pushing to GitHub:

```bash
# SSH into VPS
ssh user@your-vps-ip

# Run deploy script
cd /var/www/amgad.design
./deploy.sh
```

That's it! Your portfolio is live! 🎉

## 📞 Need Help?

- Check `BUILD_DEPLOY.md` for detailed instructions
- Review `PRE_DEPLOYMENT_CHECKLIST.md` for complete checklist
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

---

**Total Time: ~30 minutes**

Your professional portfolio will be live at https://amgad.design! 🚀
