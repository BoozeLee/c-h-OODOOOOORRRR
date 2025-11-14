#!/bin/bash

echo "🚀 Pushing Amphetamemes to GitHub..."
echo ""

# Navigate to workspace
cd /home/runner/workspace || cd .

# Configure git if needed
git config user.name "Kiliaan Vanvoorden" 2>/dev/null
git config user.email "kiliaan@bakerstreet221b.store" 2>/dev/null

# Remove any locks
rm -f .git/index.lock 2>/dev/null

# Set up remote if not exists
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Bakery-street-project/c-h-OODOOOOORRRR.git

# Ensure we're on main branch
git branch -M main 2>/dev/null || git checkout -b main

# Stage all files
echo "📦 Staging files..."
git add .

# Create commit
echo "💾 Creating commit..."
git commit -m "Initial release: Amphetamemes - Self-Evolving AI Template System

- AutomationCodex integration with mathematical optimization
- Psychedelic template marketplace
- AI-powered trend research and generation
- PostgreSQL database with Drizzle ORM
- Payment system ready (Stripe)
- Complete legal protection (LICENSE, COPYRIGHT, PATENT)

Copyright © 2025 Kiliaan Walter Vanvoorden" || echo "Already committed"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
echo ""
echo "When prompted for password, use your GitHub Personal Access Token"
echo "(Get it from: https://github.com/settings/tokens)"
echo ""

git push -u origin main

echo ""
echo "✅ Done! Check: https://github.com/Bakery-street-project/c-h-OODOOOOORRRR"
