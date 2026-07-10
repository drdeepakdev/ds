#!/bin/bash
# Double-click this file in Finder to update the local copy of deepusoman.com
# from GitHub. Keep it inside the project folder (it updates the folder it lives in).
cd "$(dirname "$0")"
echo "Updating $(basename "$PWD") from GitHub..."
git pull --ff-only
echo ""
echo "Done. This folder now matches the latest version on GitHub."
read -n 1 -s -r -p "Press any key to close."
