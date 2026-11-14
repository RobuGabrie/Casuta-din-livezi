#!/bin/bash
# Screenshots pages of the running site at the two Figma widths (390 and 1440),
# for comparing with docs/design/screens/. Needs the site running, e.g. `npm run dev`.
#
#   scripts/screenshots.sh [base-url] [path ...]
#   scripts/screenshots.sh http://localhost:3000 /ro /ro/cazare
#
# Output: .screenshots/<page>-mobil.png and <page>-desktop.png (not committed).
set -euo pipefail
base="${1:-http://localhost:3000}"
shift || true
paths=("$@")
[ ${#paths[@]} -eq 0 ] && paths=("/ro/styleguide")
out="$(dirname "$0")/../.screenshots"
mkdir -p "$out"
for p in "${paths[@]}"; do
  name=$(echo "$p" | sed -e 's|^/||' -e 's|/|-|g'); name=${name:-acasa}
  npx -y playwright@latest screenshot --full-page --wait-for-timeout=3000 \
    --viewport-size=390,844 "$base$p" "$out/$name-mobil.png" >/dev/null
  npx -y playwright@latest screenshot --full-page --wait-for-timeout=3000 \
    --viewport-size=1440,900 "$base$p" "$out/$name-desktop.png" >/dev/null
  echo "$out/$name-mobil.png  $out/$name-desktop.png"
done
