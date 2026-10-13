#!/usr/bin/env bash
# Quick verify + run script for the Havn tutorial app.
# Installs deps if missing, type-checks the source, then boots the Vite dev server.

set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "→ Installing dependencies…"
  npm install
fi

echo "→ Type-checking…"
npm run typecheck

echo "→ Starting dev server (Ctrl+C to stop)…"
npm run dev
