#!/bin/bash

# Deployment script for Amgad Design Portfolio
# Run this on your VPS after initial setup

echo "🚀 Starting deployment process..."

# Navigate to project directory
cd /var/www/amgad.design || exit

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies (only if package.json changed)
if git diff HEAD@{1} --name-only | grep -q "package.json"; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    # Set proper permissions
    echo "🔐 Setting proper permissions..."
    sudo chown -R www-data:www-data dist/
    sudo chmod -R 755 dist/
    
    # Reload Nginx
    echo "🔄 Reloading Nginx..."
    sudo systemctl reload nginx
    
    echo "✨ Deployment completed successfully!"
    echo "🌐 Visit: https://amgad.design"
else
    echo "❌ Build failed! Deployment aborted."
    exit 1
fi

# Display deployment summary
echo ""
echo "📊 Deployment Summary"
echo "===================="
echo "Date: $(date)"
echo "Commit: $(git rev-parse --short HEAD)"
echo "Branch: $(git branch --show-current)"
echo ""
