---
"wrangler": minor
---

Add YOLO Mode for automatic redeployment on file changes

Introduces `wrangler deploy --yolo` flag that watches for file changes and automatically redeploys Workers projects to Cloudflare's edge network, similar to AWS SAM's `sam sync --watch` feature.

Features:
- Automatic deployment on file save with 50ms debounce
- Condensed output mode (toggle with `--verbose`)
- Confirmation prompt (skip with double `--yolo`)
- Production environment warning
- Error handling that doesn't exit watch mode
- Graceful CTRL+C shutdown
- Compatible with all standard deploy flags
- Smart file watching that excludes build artifacts

Usage:
- `wrangler deploy --yolo` - Start watch mode with confirmation
- `wrangler deploy --yolo --yolo` - Skip confirmation prompt
- `wrangler deploy --yolo --verbose` - Show full deployment output
