# Progressive Web App (PWA) Setup

Your Restaurant Management System includes optional PWA capabilities for web testing and development.

## 🚀 PWA Features Implemented

### ✅ Core PWA Components
- **Web App Manifest** (`/public/manifest.json`) - Defines app metadata and installation behavior
- **Service Worker** (`/public/sw.js`) - Enables offline functionality and caching
- **PWA Icons** - Restaurant-themed icons in multiple sizes (72x72 to 512x512)
- **Install Prompt** - User-friendly installation prompt component

### ✅ Cross-Platform Support (web context)
- **Windows/macOS/Linux** - Installable via Chromium-based browsers; behavior varies by browser

### ✅ Offline Functionality
- **Service Worker Caching** - Caches app resources for faster loads
- **Offline-First Strategy** - Works when network is unavailable after first load

## 📱 Installation Instructions (web testing)
- Open in a supported browser and use the standard browser install option (if available).

## 🔧 Technical Implementation
- `public/manifest.json`, `public/sw.js`, `public/icons/`
- `src/components/ui/InstallPrompt.jsx` (install UI)
- `src/main.jsx` (service worker registration)
- `vite.config.js` (PWA plugin)

## 🔍 Notes
- PWA is optional and not part of the desktop installer deliverable for this competency.
- Do not instruct end users to install via the browser; provide desktop installers instead.
