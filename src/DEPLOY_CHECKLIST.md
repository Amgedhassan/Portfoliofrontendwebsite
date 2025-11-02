# ✅ Deployment Checklist

Complete checklist for deploying your portfolio to GitHub and VPS.

---

## 📋 Pre-Deployment

### Local Setup
- [x] Project built successfully
- [x] All dependencies installed
- [x] Tests passing (if any)
- [x] No console errors
- [x] Environment variables configured

### Code Review
- [ ] Remove console.logs
- [ ] Remove commented code
- [ ] Fix TypeScript errors
- [ ] Update API URLs
- [ ] Remove demo/test data

### Documentation
- [x] README.md updated
- [x] .env.example created
- [x] LICENSE added
- [x] CONTRIBUTING.md added
- [x] Docs organized

---

## 🧹 Cleanup

### Step 1: Run Cleanup Script

```bash
chmod +x cleanup.sh
./cleanup.sh
```

This will:
- Remove redundant documentation
- Organize docs into /docs folder
- Clean up unnecessary files

### Step 2: Manual Cleanup

Check for any personal/sensitive data:

```bash
# Search for TODOs
grep -r "TODO" .

# Search for test data
grep -r "test@example.com" .

# Search for localhost URLs
grep -r "localhost" . --exclude-dir=node_modules
```

---

## 📦 GitHub Preparation

### Step 1: Review .gitignore

Ensure `.gitignore` excludes:
- [ ] node_modules/
- [ ] dist/
- [ ] .env (but not .env.example)
- [ ] IDE files (.vscode, .idea)

### Step 2: Update Configuration

**deploy.sh**:
```bash
VPS_USER="your-actual-username"
VPS_HOST="your-vps-ip"
```

**README.md**:
- [ ] Update GitHub username
- [ ] Update live site URL
- [ ] Update contact info

---

## 🚀 GitHub Deployment

### Step 1: Initialize Git

```bash
git init
git add .
git commit -m "Initial commit: Professional portfolio with dashboard"
```

### Step 2: Create GitHub Repo

1. Go to https://github.com/new
2. Name: `amgad-portfolio`
3. Description: "Professional portfolio built with React, TypeScript, and GSAP"
4. Visibility: Choose Public or Private
5. **Don't** initialize with README

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/yourusername/amgad-portfolio.git
git branch -M main
git push -u origin main
```

### Step 4: Verify on GitHub

- [ ] All files uploaded
- [ ] README displays correctly
- [ ] .gitignore working (no node_modules)

---

## 🖥️ VPS Deployment

### Step 1: VPS Prerequisites

```bash
ssh user@your-vps-ip

# Check/install Node.js 18+
node --version

# Check/install Nginx
nginx -v

# Check/install Git
git --version
```

If missing, see `docs/VPS_DEPLOYMENT.md` for installation.

### Step 2: SSL Certificate

```bash
sudo certbot --nginx -d amgad.design -d www.amgad.design
```

### Step 3: Configure Nginx

```bash
# Upload nginx.conf to VPS
scp nginx.conf user@vps:/tmp/

# On VPS:
sudo mv /tmp/nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Deploy Application

**Option A: Automated**
```bash
# Update deploy.sh first!
chmod +x deploy.sh
./deploy.sh
```

**Option B: Manual**
```bash
npm run build
rsync -avz --delete dist/ user@vps:/var/www/portfolio/
ssh user@vps "sudo chown -R www-data:www-data /var/www/portfolio"
ssh user@vps "sudo systemctl reload nginx"
```

---

## 🔄 GitHub Actions Setup (Optional)

### Step 1: Generate SSH Key on VPS

```bash
ssh user@vps
ssh-keygen -t ed25519 -C "github-actions"
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/id_ed25519  # Copy this private key
```

### Step 2: Add Secrets to GitHub

Go to: GitHub Repo → Settings → Secrets → Actions

Add these secrets:
- `VPS_HOST` = your-vps-ip
- `VPS_USERNAME` = your-ssh-username
- `VPS_SSH_KEY` = private key from above
- `VITE_API_URL` = https://srvr.amgad.design

### Step 3: Test Auto-Deploy

```bash
# Make a change
echo "# Test" >> README.md

# Commit and push
git add .
git commit -m "Test auto-deployment"
git push

# Check GitHub Actions tab
```

---

## ✅ Post-Deployment Verification

### Website Checks

- [ ] Main site loads: https://amgad.design
- [ ] SSL working (padlock icon)
- [ ] All pages accessible
- [ ] Navigation working
- [ ] Images loading
- [ ] Animations working
- [ ] Responsive on mobile
- [ ] Dashboard login: /dashboard/login

### Technical Checks

```bash
# On VPS
ssh user@vps

# Check Nginx
sudo systemctl status nginx

# Check files
ls -la /var/www/portfolio/

# Check logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Browser Tests

- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (iOS)

### Performance

- [ ] Lighthouse score 90+
- [ ] Page load < 2s
- [ ] No console errors
- [ ] SEO checks pass

---

## 🔒 Security Checks

### VPS Security

- [ ] Firewall enabled (ufw)
- [ ] SSH key-based authentication
- [ ] Root login disabled
- [ ] SSL certificate active
- [ ] Auto-updates enabled

### Application Security

- [ ] No API keys in client code
- [ ] Environment variables secure
- [ ] CORS configured properly
- [ ] Security headers enabled
- [ ] No sensitive data exposed

---

## 📊 Monitoring Setup

### Server Monitoring

```bash
# Install monitoring tools
sudo apt install htop

# Check resources
htop
df -h
free -h
```

### Log Rotation

```bash
# Nginx logs should auto-rotate
# Verify:
ls -la /var/log/nginx/
```

### Uptime Monitoring

Consider setting up:
- UptimeRobot (free)
- Pingdom
- StatusCake

---

## 🎯 Final Checklist

### GitHub
- [ ] Code pushed
- [ ] README complete
- [ ] Secrets configured (if using Actions)
- [ ] Repository description set
- [ ] Topics added (react, typescript, portfolio)

### VPS
- [ ] Nginx running
- [ ] SSL active
- [ ] Files deployed
- [ ] Permissions correct
- [ ] Logs clean

### Website
- [ ] All pages working
- [ ] Dashboard functional
- [ ] API connected
- [ ] Images loading
- [ ] No errors

### Documentation
- [ ] README accurate
- [ ] Deployment docs complete
- [ ] Environment variables documented
- [ ] Contact info updated

---

## 🎉 You're Live!

Your portfolio is now:
- ✅ On GitHub
- ✅ Deployed to VPS
- ✅ SSL secured
- ✅ Production-ready

---

## 📈 Next Steps

### Immediate
1. Test all functionality
2. Monitor logs for errors
3. Share with colleagues for feedback
4. Update portfolio content

### Soon
1. Set up analytics (Google Analytics)
2. Set up error tracking (Sentry)
3. Create backup strategy
4. Plan content updates

### Ongoing
1. Monitor server resources
2. Update dependencies regularly
3. Add new projects to portfolio
4. Collect testimonials
5. Iterate based on feedback

---

## 📞 Support

If issues arise:

1. **Check logs**: `sudo tail -f /var/log/nginx/error.log`
2. **Test config**: `sudo nginx -t`
3. **Verify files**: `ls -la /var/www/portfolio/`
4. **Check permissions**: Ensure www-data owns files
5. **Review docs**: See `/docs` for detailed guides

---

## 🔄 Regular Maintenance

### Weekly
- Check error logs
- Monitor server resources
- Test critical paths

### Monthly
- Update dependencies
- Review analytics
- Add new content
- Backup data

### Quarterly
- Security audit
- Performance review
- Update portfolio work
- Refresh testimonials

---

**Congratulations! Your portfolio is live!** 🚀

Visit: https://amgad.design

---

*Last updated: 2025-11-02*
