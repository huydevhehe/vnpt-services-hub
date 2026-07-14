#!/usr/bin/env bash
# Deploy script cho VNPT Nam Sai Gon (Next.js) tren port 3004.
# Cach dung: ./deploy.sh
set -e

PORT=3004
LOG_FILE="deploy.log"

echo "==> Stopping process on port $PORT (if any)"
fuser -k ${PORT}/tcp 2>/dev/null || true
sleep 1

echo "==> Pulling latest code"
git pull origin main

echo "==> Installing dependencies"
npm install

echo "==> Building"
npm run build

echo "==> Starting app on port $PORT"
nohup npm run start -- -p $PORT > "$LOG_FILE" 2>&1 &
disown

sleep 2
echo "==> Done. App running on port $PORT (log: $LOG_FILE)"
