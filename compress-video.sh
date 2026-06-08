#!/usr/bin/env bash
#
# Compress a video for web embedding on the portfolio.
# Produces a small, browser-friendly H.264 MP4 with:
#   - faststart (starts playing before fully downloaded)
#   - yuv420p pixel format (plays everywhere, incl. Safari/iOS)
#   - width capped at 1920px (downscales 4K sources, leaves smaller ones alone)
#
# Usage:
#   ./compress-video.sh input.mov                 # -> input-web.mp4 (CRF 23)
#   ./compress-video.sh input.mov out.mp4         # custom output name
#   ./compress-video.sh input.mov out.mp4 26      # higher CRF = smaller file
#
# CRF guide: 20 = higher quality/larger · 23 = great default · 26-28 = smaller.
#
# Requires ffmpeg:  brew install ffmpeg

set -euo pipefail

if [ $# -lt 1 ]; then
  grep '^#' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi

IN="$1"
OUT="${2:-${IN%.*}-web.mp4}"
CRF="${3:-23}"

ffmpeg -i "$IN" \
  -c:v libx264 -crf "$CRF" -preset slow -pix_fmt yuv420p \
  -vf "scale='min(1920,iw)':-2" \
  -movflags +faststart \
  -c:a aac -b:a 128k \
  -y "$OUT"

echo ""
echo "Done. Web-ready file:"
ls -lh "$OUT" | awk '{print "  " $5 "  " $9}'
echo "Embed with:  <video src=\"$OUT\" controls preload=\"metadata\" playsinline></video>"
