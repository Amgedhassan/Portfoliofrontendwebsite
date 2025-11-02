#!/bin/bash

# Cleanup script - Remove unnecessary documentation and organize project
# Run this before pushing to GitHub

echo "🧹 Cleaning up project for GitHub..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Create docs directory if it doesn't exist
mkdir -p docs

# Move important docs to /docs if they're in root
echo -e "${YELLOW}📁 Organizing documentation...${NC}"

# Keep these in docs/
mv -f ANIMATION_LIBRARIES.md docs/ 2>/dev/null || true
mv -f ANIMATION_SETUP_COMPLETE.md docs/ 2>/dev/null || true
mv -f EFFECTS_QUICK_REFERENCE.md docs/ 2>/dev/null || true
mv -f EFFECTS_VISUAL_GUIDE.md docs/ 2>/dev/null || true
mv -f INSTALLATION_GUIDE.md docs/ 2>/dev/null || true

# Remove redundant documentation files
echo -e "${YELLOW}🗑️  Removing redundant files...${NC}"

rm -f ALL_SYSTEMS_READY.md
rm -f BUILD_DEPLOY.md
rm -f DASHBOARD_SUMMARY.md
rm -f DEPLOYMENT.md
rm -f DEPLOY_QUICK_START.md
rm -f DOCUMENTATION_INDEX.md
rm -f EMPTY_STATE_GUIDE.md
rm -f FRAMEWORK_MIGRATION_GUIDE.md
rm -f GOING_LIVE_CHECKLIST.md
rm -f IMAGE_HANDLING_SUMMARY.md
rm -f PRE_DEPLOYMENT_CHECKLIST.md
rm -f PRODUCTION_DEPLOYMENT_FINAL.md
rm -f PRODUCTION_READY_SUMMARY.md
rm -f QUICK_DEPLOY.md
rm -f QUICK_REFERENCE.md
rm -f QUICK_START.md
rm -f README_DEPLOYMENT.md
rm -f README_PRODUCTION.md
rm -f SETUP.md
rm -f START_DEPLOYMENT.md
rm -f START_HERE.md

# Remove component-specific docs that are now consolidated
rm -f components/EMPTY_STATE_USAGE.md
rm -f components/EmptyStateExamples.tsx

# Remove dashboard README (info is now in docs/DASHBOARD_GUIDE.md)
rm -f pages/dashboard/README.md

# Remove guidelines (if they exist from old setup)
rm -rf guidelines/

# Create a docs index
cat > docs/README.md << 'EOF'
# 📚 Documentation

Complete documentation for the Amgad Design Portfolio.

---

## 📖 Quick Start

1. **[GitHub & VPS Deployment](../GITHUB_DEPLOY_GUIDE.md)** - Push to GitHub and deploy to VPS
2. **[Project Structure](PROJECT_STRUCTURE.md)** - Understanding the codebase
3. **[Dashboard Guide](DASHBOARD_GUIDE.md)** - Using the admin dashboard

---

## 🎨 Animation System

- **[Animation Guide](ANIMATION_GUIDE.md)** - Using animation components
- **[Animation Libraries](ANIMATION_LIBRARIES.md)** - Complete API reference
- **[Effects Quick Reference](EFFECTS_QUICK_REFERENCE.md)** - Cheat sheet
- **[Effects Visual Guide](EFFECTS_VISUAL_GUIDE.md)** - Visual examples
- **[Installation Guide](INSTALLATION_GUIDE.md)** - Installing animation libraries
- **[Setup Complete](ANIMATION_SETUP_COMPLETE.md)** - What's been installed

---

## 🚀 Deployment

- **[VPS Deployment](VPS_DEPLOYMENT.md)** - Detailed VPS setup
- **[GitHub Actions](../.github/workflows/deploy.yml)** - Auto-deployment workflow

---

## 📁 Project Organization

```
/
├── components/          # React components
├── pages/              # Page components
├── hooks/              # Custom hooks
├── utils/              # Utilities
├── docs/               # This directory
└── ...
```

---

## 🔗 External Resources

- **Main README**: [../README.md](../README.md)
- **GitHub Deploy Guide**: [../GITHUB_DEPLOY_GUIDE.md](../GITHUB_DEPLOY_GUIDE.md)
- **API Documentation**: See your backend API docs

---

## 📞 Need Help?

Check the relevant guide above or review the main README.

EOF

echo -e "${GREEN}✅ Cleanup complete!${NC}"
echo ""
echo -e "${YELLOW}📊 Remaining documentation:${NC}"
echo "  Root:"
echo "    - README.md (main documentation)"
echo "    - GITHUB_DEPLOY_GUIDE.md (deployment guide)"
echo "  Docs folder:"
ls -1 docs/
echo ""
echo -e "${GREEN}✅ Project is ready for GitHub!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review .gitignore"
echo "  2. Update deploy.sh with your VPS details"
echo "  3. Run: git add ."
echo "  4. Run: git commit -m 'Initial commit'"
echo "  5. Run: git push origin main"
