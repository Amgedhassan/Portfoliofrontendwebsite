# ✈️ Pre-Flight Checklist

**Run this checklist before pushing to GitHub and deploying to VPS.**

---

## 📋 Configuration Review

### Step 1: Update deploy.sh

```bash
nano deploy.sh
```

**Required Changes:**
- [ ] `VPS_USER="your-username"` → Change to your actual SSH username
- [ ] `VPS_HOST="your-vps-ip"` → Change to your VPS IP or domain
- [ ] `VPS_PATH="/var/www/portfolio"` → Verify path is correct

### Step 2: Create .env

```bash
cp .env.example .env
nano .env
```

**Required Values:**
- [ ] `VITE_API_URL=https://srvr.amgad.design` → Verify API URL

### Step 3: Update README.md

```bash
nano README.md
```

**Update These:**
- [ ] Line 6: GitHub clone URL with your username
- [ ] Line 240: GitHub profile link
- [ ] Line 237: Your contact email/form link
- [ ] Any other personal information

---

## 🧹 Code Cleanup

### Remove Debug Code

```bash
# Search for console.logs
grep -r "console.log" . --exclude-dir=node_modules

# Search for debugger statements
grep -r "debugger" . --exclude-dir=node_modules

# Search for TODO comments
grep -r "TODO" . --exclude-dir=node_modules
```

**Action Items:**
- [ ] Remove or comment out console.logs
- [ ] Remove debugger statements
- [ ] Resolve or document TODOs

### Check for Test Data

```bash
# Search for test emails
grep -r "test@example.com" . --exclude-dir=node_modules

# Search for localhost URLs
grep -r "localhost" . --exclude-dir=node_modules --exclude="*.md"

# Search for dummy data
grep -r "dummy" . --exclude-dir=node_modules
```

**Action Items:**
- [ ] Remove test/dummy data
- [ ] Verify API URLs point to production
- [ ] Check no hardcoded credentials

---

## 🗂️ File Organization

### Run Cleanup Script (Optional)

```bash
chmod +x cleanup.sh
./cleanup.sh
```

This will:
- [x] Remove redundant markdown files
- [x] Move animation docs to /docs folder
- [x] Create /docs/README.md index
- [x] Clean up unnecessary files

### Verify .gitignore

```bash
cat .gitignore
```

**Must Include:**
- [x] `node_modules/`
- [x] `/dist`
- [x] `.env` (but NOT .env.example)
- [x] `.DS_Store`
- [x] Editor folders (.vscode, .idea)

---

## 🔐 Security Check

### No Sensitive Data in Code

```bash
# Check for API keys
grep -ri "api.key" . --exclude-dir=node_modules

# Check for passwords
grep -ri "password.*=" . --exclude-dir=node_modules --exclude-dir=dist

# Check for secrets
grep -ri "secret.*=" . --exclude-dir=node_modules --exclude-dir=dist
```

**Verify:**
- [ ] No API keys in client code
- [ ] No passwords hardcoded
- [ ] No JWT secrets exposed
- [ ] Environment variables properly used

### Check .env

```bash
cat .env 2>/dev/null || echo ".env not found - Good!"
cat .env.example
```

**Verify:**
- [ ] `.env` exists locally (for development)
- [ ] `.env` is in .gitignore ✅
- [ ] `.env.example` has template values ✅
- [ ] No real secrets in .env.example ✅

---

## 🏗️ Build Test

### Test Local Build

```bash
# Clean previous builds
rm -rf dist/

# Install dependencies
npm install

# Run build
npm run build

# Check build output
ls -la dist/
```

**Verify:**
- [ ] Build completes without errors
- [ ] `dist/` folder created
- [ ] `dist/index.html` exists
- [ ] `dist/assets/` has JS and CSS files
- [ ] No TypeScript errors
- [ ] No ESLint errors

### Test Built Site

```bash
# Preview production build
npm run preview
```

**Test in Browser:**
- [ ] Visit http://localhost:4173
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Images load
- [ ] Animations work
- [ ] Dashboard accessible
- [ ] No console errors

---

## 🔧 VPS Prerequisites

### VPS Software Check

```bash
ssh your-username@your-vps-ip

# Check Node.js
node --version
# Should be 18+

# Check Nginx
nginx -v
# Should be installed

# Check SSL
sudo certbot certificates
# Should have certificate for your domain

# Check directory
ls -la /var/www/portfolio/
# Should exist or create it
```

**Required:**
- [ ] Node.js 18+ installed
- [ ] Nginx installed and running
- [ ] SSL certificate obtained
- [ ] Deploy directory exists
- [ ] Firewall configured (ports 80, 443)

### Domain Configuration

```bash
# Test DNS
nslookup amgad.design
dig amgad.design

# Should point to your VPS IP
```

**Verify:**
- [ ] Domain points to VPS IP
- [ ] www subdomain configured
- [ ] DNS propagated (may take 24-48 hours)

---

## 📦 GitHub Preparation

### Repository Ready

**On GitHub:**
- [ ] Created new repository
- [ ] Repository name set (e.g., `amgad-portfolio`)
- [ ] Description added
- [ ] Visibility chosen (Public/Private)
- [ ] NOT initialized with README (we have one)

**Copy Repository URL:**
```
https://github.com/yourusername/amgad-portfolio.git
```

### Git Configuration

```bash
# Check git is initialized
git status

# If not initialized:
git init

# Check git config
git config user.name
git config user.email

# If not set:
git config user.name "Your Name"
git config user.email "your@email.com"
```

**Verify:**
- [ ] Git initialized
- [ ] User name configured
- [ ] User email configured

---

## 🧪 Final Tests

### Functionality Test

```bash
npm run dev
```

**Test All Pages:**
- [ ] Home page loads
- [ ] Work page loads
- [ ] Case study details work
- [ ] About page loads
- [ ] Mentorship page loads
- [ ] Contact page loads
- [ ] Dashboard login accessible
- [ ] 404 page shows for invalid routes

### Dashboard Test (if you have credentials)

- [ ] Login works
- [ ] Dashboard overview loads
- [ ] Projects list loads
- [ ] Can add/edit project (test only)
- [ ] Testimonials list loads
- [ ] Mentorship sessions load
- [ ] Logout works

### Responsive Test

**Test on:**
- [ ] Desktop (Chrome)
- [ ] Desktop (Firefox)
- [ ] Mobile (Chrome DevTools)
- [ ] Tablet (iPad simulation)

---

## 📝 Documentation Review

### Essential Docs Present

```bash
ls -la *.md
ls -la docs/*.md
```

**Required Files:**
- [x] README.md
- [x] LICENSE
- [x] CONTRIBUTING.md
- [x] START_HERE.md
- [x] GITHUB_DEPLOY_GUIDE.md
- [x] DEPLOY_CHECKLIST.md
- [x] .gitignore
- [x] .env.example

### Update Personal Info

**In README.md:**
- [ ] GitHub username updated
- [ ] Live site URL correct
- [ ] Contact information updated

**In package.json:**
- [ ] Name field set
- [ ] Author field updated (optional)

---

## ✅ Final Checklist

### Before Git Commit

- [ ] `deploy.sh` updated with VPS details
- [ ] `.env.example` created and configured
- [ ] `.env` exists locally but in .gitignore
- [ ] README.md personal info updated
- [ ] Console.logs removed
- [ ] Test data removed
- [ ] Build completes successfully
- [ ] Site tested locally
- [ ] No TypeScript errors
- [ ] No ESLint warnings (critical ones)

### VPS Ready

- [ ] VPS accessible via SSH
- [ ] Node.js 18+ installed
- [ ] Nginx installed
- [ ] SSL certificate obtained
- [ ] Domain DNS configured
- [ ] Firewall configured

### Documentation Ready

- [ ] All markdown files reviewed
- [ ] Personal information updated
- [ ] Instructions tested
- [ ] Scripts executable (chmod +x)

---

## 🚀 Ready to Deploy?

If all items above are checked ✅, you're ready!

### Next Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: Professional portfolio"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to VPS:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Verify Deployment:**
   - Visit https://amgad.design
   - Check SSL works
   - Test all pages
   - Login to dashboard

---

## 🐛 Common Issues

### Build Fails

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Git Push Fails

**Solution:**
```bash
# Check remote
git remote -v

# Update remote if needed
git remote set-url origin <correct-url>

# Try again
git push -u origin main
```

### VPS Deploy Fails

**Solution:**
```bash
# Test SSH connection
ssh your-username@your-vps-ip

# Check deploy.sh configuration
cat deploy.sh | grep VPS_

# Verify paths on VPS
ssh your-username@your-vps-ip "ls -la /var/www/"
```

---

## 📊 Deployment Timeline

Expected time for each step:

| Step | Time | Status |
|------|------|--------|
| Pre-flight checklist | 10 min | ⏳ In progress |
| Push to GitHub | 2 min | ⏸️ Waiting |
| VPS deployment | 5 min | ⏸️ Waiting |
| Verification | 3 min | ⏸️ Waiting |
| **Total** | **~20 min** | |

---

## 🎯 Success Criteria

After deployment, verify:

✅ Site loads at https://amgad.design  
✅ SSL certificate active (padlock)  
✅ All pages accessible  
✅ Navigation working  
✅ Dashboard accessible  
✅ No console errors  
✅ Responsive on mobile  
✅ Images loading  
✅ Animations working  

---

## 🎉 You're Clear for Takeoff!

Once all items are checked, proceed with deployment!

**Next:** Follow [START_HERE.md](START_HERE.md) or [GITHUB_DEPLOY_GUIDE.md](GITHUB_DEPLOY_GUIDE.md)

---

*Checklist version: 1.0.0*  
*Last updated: November 2, 2025*
