# ⚡ Quick Reference Card

## 🎯 Essential Commands

### Local Development
```bash
npm install       # Install dependencies
npm run dev       # Start dev server (localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
```

### Git & Deploy
```bash
# Initial push
git init
git add .
git commit -m "Production ready"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Updates
git add .
git commit -m "Update: description"
git push

# On VPS
./deploy.sh
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env.production` | Production environment config |
| `nginx.conf` | Server configuration |
| `deploy.sh` | Automated deployment |
| `vite.config.ts` | Build configuration |
| `.gitignore` | Git exclusions |

## 📚 Documentation Quick Find

| Need to... | Open this file |
|------------|----------------|
| Deploy now | `DEPLOY_QUICK_START.md` ⭐ |
| Understand everything | `PRODUCTION_READY_SUMMARY.md` |
| Troubleshoot | `BUILD_DEPLOY.md` |
| Verify before deploy | `PRE_DEPLOYMENT_CHECKLIST.md` |
| Quick start | `START_DEPLOYMENT.md` |

## 🌐 Important URLs

| Service | URL |
|---------|-----|
| Website | https://amgad.design |
| Dashboard | https://amgad.design/dashboard/login |
| Backend API | https://srvr.amgad.design |

## 🔐 Dashboard Access

**Demo Credentials** (for testing):
- Username: `demo`
- Password: `demo123`

## 📞 Contact Info (Updated)

- **Email**: amgedhassan@outlook.com
- **LinkedIn**: [Profile](https://www.linkedin.com/in/amgad-hassan-243248145/)
- **Behance**: [Portfolio](https://www.behance.net/amgedhassan)
- **Upwork**: [Profile](https://www.upwork.com/freelancers/~0147b1394d722077f1)

## ⚙️ Environment Variables

```env
VITE_API_BASE_URL=https://srvr.amgad.design
VITE_DEV_MODE=false
```

## 🚀 Deployment Steps (Ultra Quick)

1. **Test**: `npm run build && npm run preview`
2. **Push**: `git push origin main`
3. **VPS**: Follow `DEPLOY_QUICK_START.md`
4. **Deploy**: `./deploy.sh`

## 🔧 VPS Requirements

- Node.js 18+
- Nginx
- 1GB+ RAM
- Ubuntu 20.04+

## ✅ Pre-Deploy Checklist

- [ ] Local build works
- [ ] GitHub repo created
- [ ] DNS pointed to VPS
- [ ] SSH access to VPS
- [ ] Read deployment docs

## 🐛 Quick Troubleshooting

**Build fails?**
```bash
rm -rf node_modules dist && npm install && npm run build
```

**Nginx issues?**
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

**Need to rollback?**
```bash
git log --oneline
git reset --hard COMMIT_HASH
npm run build
```

## 📊 Expected Results

- Build size: ~500KB-1MB (gzipped)
- Load time: < 2 seconds
- Lighthouse: 90+ score

## 🎯 After Deployment

1. Visit https://amgad.design
2. Test all pages
3. Try dashboard login
4. Check mobile responsive
5. Verify SSL certificate

## 📝 Project Stats

- **Version**: 1.0.0
- **Status**: Production Ready ✅
- **Last Updated**: Nov 2, 2025
- **Deploy Time**: ~30 minutes

## 🎉 Ready?

**Open `DEPLOY_QUICK_START.md` now!**

---

*Keep this file handy for quick reference*
