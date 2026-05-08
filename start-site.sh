#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4173}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT_DIR"

echo "Starting FryCuisine static site..."
echo "Open: http://127.0.0.1:${PORT}/home.html"
echo "Press Ctrl+C to stop the server."

if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server "$PORT"
else
  echo "Error: Python is required to serve this static site." >&2
  exit 1
fi
