# 🚀 Quick Start - Webpack Setup

## ⚡ 3-Step Setup

Your app has been migrated from Vite to Webpack. Here's how to get started:

---

## Step 1️⃣: Install Dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Expected output:**
```
added 1247 packages in 45s
```

---

## Step 2️⃣: Start Development Server

```bash
npm run dev
```

**Expected:**
- Browser opens automatically
- App loads at http://localhost:5173
- Hot reload works (edit files, see instant updates)

---

## Step 3️⃣: Build for Production

```bash
npm run build
```

**Expected:**
```
asset main.a1b2c3d4.js 512 KiB [emitted] [minimized]
asset vendors.e5f6g7h8.chunk.js 400 KiB [emitted] [minimized]
asset three.i9j0k1l2.chunk.js 150 KiB [emitted] [minimized]
webpack 5.94.0 compiled successfully in 12345 ms
```

---

## 🎯 What's Different?

### Commands Changed

| Old (Vite) | New (Webpack) |
|------------|---------------|
| `npm run dev` | `npm run dev` ✅ Same! |
| `npm run build` | `npm run build` ✅ Same! |
| `npm run preview` | `npm run preview` ✅ Same! |

**Everything works the same!** 🎉

### Behind the Scenes

- ✅ Vite → Webpack
- ✅ ESM → CommonJS bundling
- ✅ Native imports → Webpack loaders
- ✅ Better compatibility
- ✅ More stable builds

---

## 📦 What's Installed?

### Core
- `webpack` - Main bundler
- `webpack-cli` - Commands
- `webpack-dev-server` - Dev server with HMR

### Loaders
- `ts-loader` - TypeScript
- `css-loader` - CSS imports
- `style-loader` - CSS injection
- `postcss-loader` - Tailwind processing

### Plugins
- `html-webpack-plugin` - Generates index.html
- `copy-webpack-plugin` - Copies public files
- `react-refresh-webpack-plugin` - Fast Refresh (HMR)

---

## 🧪 Quick Test

### Test 1: Dev Server
```bash
npm run dev
```
✅ Opens browser → App loads → Works!

### Test 2: Hot Reload
1. Keep dev server running
2. Edit `pages/Home.tsx`
3. Save file
4. ✅ Browser updates instantly!

### Test 3: Production Build
```bash
npm run build
ls -lh dist/
```
✅ See optimized files in `dist/`

### Test 4: Preview Production
```bash
npm run preview
```
✅ Opens http://localhost:4173 → Works!

---

## 🎨 All Features Work!

### ✅ Development
- Hot Module Replacement (HMR)
- Fast rebuilds
- Source maps
- TypeScript support

### ✅ Production
- Minification
- Tree shaking
- Code splitting
- Asset optimization

### ✅ Your App
- All 7 pages
- 16 animation libraries
- Dashboard system
- API integration
- Everything!

---

## 🐛 Troubleshooting

### ❌ "Cannot find module 'webpack'"
```bash
rm -rf node_modules
npm install
```

### ❌ "Port 5173 already in use"
```bash
npx kill-port 5173
npm run dev
```

### ❌ Build fails
```bash
# Check TypeScript
npx tsc --noEmit

# Fix any errors, then
npm run build
```

---

## 📝 Key Files

### webpack.config.js
- Entry point: `main.tsx`
- Output: `dist/assets/`
- Dev server: Port 5173
- **Don't modify unless needed**

### package.json
- Scripts updated
- Dependencies updated
- **Ready to use**

### tsconfig.json
- Module resolution: `node`
- Webpack-compatible
- **Ready to use**

---

## 🚀 Deploy

### Option 1: Manual Deploy
```bash
npm run build
rsync -avz dist/ user@vps:/var/www/port-fe/dist/
```

### Option 2: Deploy Script
```bash
./deploy.sh
```

### Option 3: GitHub Actions
```bash
git add .
git commit -m "chore: Migrate to Webpack"
git push origin main
# Auto-deploys via GitHub Actions
```

---

## ✅ Success!

If you can run these commands without errors:

```bash
npm install  # ✅ Installs all dependencies
npm run dev  # ✅ Dev server starts
npm run build  # ✅ Production build succeeds
```

**You're ready to develop!** 🎉

---

## 📖 More Info

- **Detailed migration:** `WEBPACK_MIGRATION_COMPLETE.md`
- **Webpack config:** `webpack.config.js` (has comments)
- **Official docs:** https://webpack.js.org/

---

## 🎯 Summary

**What we did:**
- ✅ Removed Vite
- ✅ Added Webpack
- ✅ Updated configs
- ✅ Kept all features

**What you do:**
1. `npm install`
2. `npm run dev`
3. Start building! 🚀

---

**That's it! You're ready to go.** ✨

**Same great app. Better build system.** 💪
