#!/bin/bash
#
# Deploy script for wsw-mobile-pwa
# Handles: build → deploy to Netlify → commit → push
#
# Usage: ./scripts/deploy.sh [--prod] [--skip-push]
#
set -e

# Parse arguments
PROD_FLAG=""
SKIP_PUSH=false

for arg in "$@"; do
  case $arg in
    --prod)
      PROD_FLAG="--prod"
      shift
      ;;
    --skip-push)
      SKIP_PUSH=true
      shift
      ;;
  esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deploy process...${NC}"

# 1. Build
echo -e "${YELLOW}📦 Building...${NC}"
npm run build

# 2. Deploy to Netlify
echo -e "${YELLOW}🌐 Deploying to Netlify...${NC}"
if [ -n "$PROD_FLAG" ]; then
  netlify deploy --prod --dir=dist
else
  netlify deploy --dir=dist
fi

# 3. Generate commit message with timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
COMMIT_MSG="chore: deploy v${TIMESTAMP}"

# 4. Commit changes (handle "nothing to commit" gracefully)
echo -e "${YELLOW}📝 Committing changes...${NC}"

# Stage all changes
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
  git commit -m "$COMMIT_MSG"
  echo -e "${GREEN}✅ Committed: ${COMMIT_MSG}${NC}"
  
  # 5. Push to origin (current branch)
  if [ "$SKIP_PUSH" = false ]; then
    echo -e "${YELLOW}⬆️  Pushing to origin...${NC}"
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    git push origin "$CURRENT_BRANCH"
    echo -e "${GREEN}✅ Pushed to origin/${CURRENT_BRANCH}${NC}"
  else
    echo -e "${YELLOW}⚠️  Skipping push (--skip-push flag)${NC}"
  fi
fi

echo -e "${GREEN}🎉 Deploy complete!${NC}"
