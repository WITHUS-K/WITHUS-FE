#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
OUT="${ROOT}/output"

# output 초기화
rm -rf "$OUT"
mkdir -p "$OUT"

# 레포 전체 복사 (output 제외)
rsync -a \
  --delete \
  --exclude '.git' \
  --exclude 'output' \
  "$ROOT/" "$OUT/"

echo "✅ Synced repository to $OUT"
