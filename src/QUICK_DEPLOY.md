# ⚡ Quick Deploy Guide

This is a streamlined deployment guide to get your portfolio live ASAP.

## 🚀 One-Command Deploy (Vercel - Recommended)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
vercel
```

That's it! Follow the prompts and Vercel will auto-detect everything.

### 3. Add Environment Variable
In Vercel dashboard:
- Go to Settings → Environment Variables
- Add: `VITE_API_BASE` = `https://srvr.amgad.design/api`
- Redeploy

---

## 🌐 Alternative: Netlify

### 1. Install Netlify CLI
```bash
npm i -g netlify-cli
```

### 2. Build & Deploy
```bash
npm run build
netlify deploy --prod --dir=dist
```

### 3. Configure
In Netlify dashboard:
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variable: `VITE_API_BASE`

---

## 🖥️ Traditional Server (VPS/Dedicated)

### Quick Steps

1. **Build locally:**
```bash
npm run build
```

2. **Upload to server:**
```bash
scp -r dist/* user@your-server:/var/www/amgad.design/
```

3. **Nginx config** (`/etc/nginx/sites-available/amgad.design`):
```nginx
server {
    listen 80;
    server_name amgad.design www.amgad.design;
    root /var/www/amgad.design;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. **Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/amgad.design /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Get SSL (Let's Encrypt):**
```bash
sudo certbot --nginx -d amgad.design -d www.amgad.design
```

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- [ ] `npm run build` completes without errors
- [ ] `npm run preview` works locally
- [ ] Environment variables are set
- [ ] API backend is accessible at `https://srvr.amgad.design/api`
- [ ] Domain DNS points to your server
- [ ] SSL certificate is ready (or will be auto-generated)

---

## 🧪 Test After Deploy

1. **Homepage:** https://amgad.design/
2. **Work:** https://amgad.design/work
3. **Dashboard:** https://amgad.design/dashboard/login
4. **Mobile:** Test on phone
5. **Performance:** Run Lighthouse audit

---

## 🔥 Common Issues & Fixes

### "404 on page refresh"
**Fix:** Server needs to redirect all routes to index.html
- Vercel/Netlify: Handled automatically
- Nginx: Add `try_files $uri $uri/ /index.html;`

### "API not working"
**Fix:** Check CORS on backend
- Backend must allow your domain: `amgad.design`
- Test API directly: `curl https://srvr.amgad.design/api/case-studies`

### "Blank page"
**Fix:** Check browser console for errors
- Usually missing environment variables
- Rebuild after adding env vars

---

## 📞 Need Help?

1. Check browser console (F12)
2. Check server logs: `sudo tail -f /var/log/nginx/error.log`
3. Test API: `curl https://srvr.amgad.design/api/case-studies`
4. Review full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎉 You're Live!

Once deployed:
1. Test thoroughly
2. Share with clients
3. Monitor performance
4. Update content via dashboard

**Your portfolio is now at: https://amgad.design** 🚀
