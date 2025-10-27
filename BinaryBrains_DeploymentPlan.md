***BinaryBrains \- Restaurant Management System***  
**Software Deployment Plan**  
***Latest update: 2025-10-20***

**1\. System Requirements**

**1.1 Supported Operating Systems**  
The application will support the following environments:

- Windows: Windows 10 and above (64-bit)  
- macOS: The last two major versions of macOS (e.g., Sonoma 14 and Sequoia 15), supporting both Intel and Apple Silicon processors  
- Linux:   
  - SUSE Linux Enterprise / openSUSE Leap 15.x  
  - Ubuntu 20.04 and above (64-bit)

Linux: Ubuntu 20.04 and above (64-bit)  
Each platform will receive a platform-specific installer or executable package (.exe, .dmg, or .Applmage/.dev).

**1.2 Hardware Requirements**

| Component | Minimum Requirement | Recommended Requirement |
| :---- | :---- | ----- |
| Processor (CPU) | Dual-core 2.0 GHz | Quad-core 2.5 GHz or higher |
| Memory (RAM) | 4GB | 8GB or more |
| Storage | 300 MB free space for installation | 500 MB or more (plus additional space for local data/logs) |
| Display Resolution | 1280x720 pixels | 1920x1080 pixels |
| Network | Optional (required only for online updates or synchronization) | Stable broadband connection |
| Input Devices | Keyboard and mouse/trackpad | \- |

**1.3 Software Dependencies**  
All required dependencies are bundled within the Electron runtime. End users do not need to install Node.js, Chromium, or any external frameworks.  
The following dependencies apply during development and deployment:

- Package Manager: npm (Node  Package Manager) is required for installing project dependencies.  
- Development/deployment: Node.js (22+), npm, Git, Vite, Tailwind CSS, Electron Builder, electron-updater, optional code-signing (Windows) and Apple Developer ID \+ notarization (macOS)  
- Version Control: Git is for managing source code and collaboration.  
- Build Tools: Electron Builder is for generating platform-specific binaries.

The application operates in an offline-first mode since network access is required only for updates. The deployment process will include all necessary libraries and runtime environments, ensuring minimal setup for end users. The software will not require administrative privileges beyond standard installation permissions.

**2\. Deployment Strategy Summary**

- Desktop (Electron): Package the Vite/React app with Electron Builder into OS-specific installers; enable auto-updates via electron-updater using GitHub Releases as the provider.  
- Web/PWA (Vercel): Build SPA (npm run build) and deploy dist/ to Vercel with SPA rewrites to index.html. Existing service workers and manifest provide offline support.  
- Release channels: Stable (tagged releases) and optional beta (GitHub prereleases). Use SemVer for versioning.  
- Security: macOS signing \+ notarization required; Windows code signing recommended.  
- Distribution: GitHub Releases for desktop downloads, Vercel for web deployment, integrated install prompts for cross-platform user acquisition.

**3\. Installation Package Contents**

**3.1 Required source or compiled files**

- Desktop installers: Windows .exe, macOS .dmg, Linux .AppImage/.deb (include Electron runtime and application resources)  
- Web: dist/ (index.html, assets/, service worker, manifest)  
- Electron main process: electron/main.js (ES modules)   
- Electron preload: electron/preload.js (secure context bridge)

**3.2 Required third-party components**

- Bundled: Electron (Chromium \+ [Node.js](http://Node.js))  
- Built into app: React, React Router, Tailwind, vite-plugin-pwa/workbox  
- Packaging/updates: Electron Builder, electron-updater  
- Development tools: Vite 7.x, ESLint, PropTypes

**3.3 Required graphical assets, configuration and other non-program files**

- Icons in public/icons/ / (192x192, 512x512 SVG formats)  
- public/manifest.json (PWA manifest)  
- public/[sw.js](http://sw.js) (service worker)  
- public/notification.mp3 (audio notifications)  
- License and release notes/CHANGELOG  
- Electron packaging configuration (kept as configuration, not shipped to end users)  
- GitHub Actions workflow (.github/workflows/build.yml) 

**3.4 Documentation files to be provided**

- README (install/usage)  
- PWA\_SETUP (web/PWA specifics)  
- BinaryBrains\_CodingStandards.md (development standards)  
- This Software Deployment Plan  
- Release notes per version

**3.5 Development files and components that must be excluded**

- Tests, dev-only scripts, debug assets  
- Large sourcemaps (optional)  
- Secrets/keys (never committed)  
- Unused assets  
- node\_modules/ (rebuilt during packaging)  
- package-lock.json (regenerated)   
- dist/ (rebuilt for each deployment)

**4\. Additional Code Required for Deployment**

Electron scaffolding: main process and preload scripts (window creation, safe bridging)  
Electron Builder configuration (appId, productName, targets, icons, publish provider)  
NPM scripts for dev/build/publish  
CI workflows (GitHub Actions) for cross-platform build, signing, notarization, and publish to GitHub Releases  
Vercel configuration (SPA rewrites and caching headers)  
Install prompt integration: Desktop download button in web app   
ES modules conversion: Updated main.js and preload.js for ES module compatibility 

**5\. Deployment Tasks**

1. Add Electron (main/preload) and minimal secure preload bridge.  
2. Configure Electron Builder (targets, icons, appId/productName, publish=GitHub).  
3. Add npm scripts: electron dev, build, publish.  
4. Set up signing:

macOS: Developer ID cert and notarization credentials.  
Windows: standard code-signing certificate.

5. Build web assets: npm run build → dist/.  
6. Package installers for Windows/macOS/Linux.  
7. Tag release (SemVer) and publish artifacts to GitHub Releases (auto-update metadata included).  
8. Deploy web/PWA to Vercel (build dist/, SPA rewrites).  
9. Verify installers and core flows on each OS; verify offline mode (web and desktop).  
10. Test auto-update from previous version to current.  
11. Document release notes and keep the last two stable releases available.  
12. Define rollback steps (revert Vercel deployment; link prior installers).  
13. Update InstallPrompt.jsx with GitHub releases URL for desktop downloads.   
14. Configure GitHub Actions workflow for automated cross-platform builds.   
15. Test install prompts on web app (PWA and desktop download buttons).

**6\. Deployment Test Plan**

**Install/uninstall:**  
Windows 10/11 (.exe), macOS 14/15 (.dmg; notarization verified), Ubuntu 20.04+ (.AppImage/.deb)  
**App launch and navigation:**  
Role views (Server, Manager, Cook), routing, layout, notifications  
**Core flows:**  
Place/update/cancel orders; cook accept/ready; server serve items; deliver bill; manager revenue report  
**Offline/online:**  
Web/PWA works offline after first load (service worker cache)  
Desktop operates fully offline; updates only when online  
**Auto-update (desktop):**  
Install vX, publish vY on GitHub Releases, verify in-app update, restart, version bump  
**Performance:**  
Reasonable CPU/RAM at idle and under typical usage   
Bundle size \< 300KB gzipped Load time \< 3 seconds  
**Security:**  
Minimal preload exposure; no unexpected network calls; signed binaries verified  
HTTPS only for web deployment Context isolation enabled in Electron  
**Regression:**  
PWA installability, manifest/icons correctness, service worker updates, no critical console errors All role-based features working correctly Notification system functional (audio and visual) Local storage persistence across app restarts 

**User experience:**   
Install prompts appear correctly Desktop download redirects to GitHub releases Offline functionality maintains data integrity Role switching works seamlessly Menu management operations persist correctly  
