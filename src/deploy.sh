#!/bin/bash

# Production Deployment Script for VPS
# This script builds and deploys the portfolio to your VPS

set -e

echo "🚀 Starting deployment process..."

# Configuration - UPDATE THESE VALUES
VPS_USER="your-username"          # Your VPS SSH username
VPS_HOST="your-vps-ip"            # Your VPS IP or domain
VPS_PATH="/var/www/portfolio"     # Path on VPS

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if configuration is updated
if [ "$VPS_USER" = "your-username" ] || [ "$VPS_HOST" = "your-vps-ip" ]; then
    echo -e "${RED}❌ Error: Please update VPS configuration in deploy.sh${NC}"
    echo -e "${YELLOW}Edit the following variables:${NC}"
    echo "  VPS_USER=\"your-actual-username\""
    echo "  VPS_HOST=\"your-actual-ip-or-domain\""
    exit 1
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}🔨 Building production bundle...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Error: Build failed - dist/ directory not found${NC}"
    exit 1
fi

echo -e "${YELLOW}📤 Uploading to VPS...${NC}"
rsync -avz --delete --progress dist/ ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

echo -e "${YELLOW}🔐 Setting correct permissions...${NC}"
ssh ${VPS_USER}@${VPS_HOST} "sudo chown -R www-data:www-data ${VPS_PATH} && sudo chmod -R 755 ${VPS_PATH}"

echo -e "${YELLOW}🔄 Reloading Nginx...${NC}"
ssh ${VPS_USER}@${VPS_HOST} "sudo nginx -t && sudo systemctl reload nginx"

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Your site is live at: https://amgad.design${NC}"
echo ""
echo -e "${YELLOW}📊 Quick checks:${NC}"
echo "  - Test site: https://amgad.design"
echo "  - View logs: ssh ${VPS_USER}@${VPS_HOST} 'sudo tail -f /var/log/nginx/access.log'"
echo "  - Dashboard: https://amgad.design/dashboard/login"
