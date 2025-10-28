***BinaryBrains \- Restaurant Management System***  
**Software Deployment Plan**  
***Latest update: 2025-10-20***

**1\. System Requirements**

**1.1 Supported Operating Systems**  
The application supports the following environments for this competency submission:

- Windows: Windows 10 and above (64-bit)  
- macOS: The last two major versions (e.g., Sonoma 14 and Sequoia 15), Intel and Apple Silicon  
- Linux: SUSE Linux Enterprise / openSUSE Leap 15.x  

Each platform will receive a platform-specific installer package (.exe, .dmg, or .rpm).

**1.2 Hardware Profile (validated)**

- No special hardware required; validated on standard lab desktops.  
- Tested baseline: dual‑core 2.3 GHz CPU, 8 GB RAM, SSD storage.  
- Observed usage: ~150–300 MB RAM at idle; ~400–600 MB under typical flows.  
- Display: 1280×720 or higher recommended.

**1.3 Software Dependencies**  
End users: none. All runtime components are bundled with the installer (Electron, Chromium, compiled assets).  

Deployment infrastructure (for developers/builds only):

- Node.js and npm  
- Git  
- Vite and Tailwind CSS (build-time)  
- Electron Builder (packaging)  
- Optional: code signing (Windows) and Apple Developer ID + notarization (macOS)

**2\. Deployment Strategy Summary**

- Desktop (Electron): Package the Vite/React app with Electron Builder into OS-specific installers.  
- Scope for this competency: desktop installers only (no auto-update).  
- Security: macOS signing + notarization recommended; Windows code signing recommended.  
- Distribution: provide installers via LMS or instructor-approved channel (no public GitHub distribution).

**3\. Installation Package Contents**

**3.1 Installer contents**

- Desktop installers: Windows .exe, macOS .dmg, Linux .rpm (include Electron runtime and application resources)  
- Electron main process: electron/main.js (ES modules)   
- Electron preload: electron/preload.js (secure context bridge)

**3.2 Third-party components included in the installer**

- Bundled: Electron (Chromium \+ [Node.js](http://Node.js))  
- Built into app: React, React Router, Tailwind, vite-plugin-pwa/workbox  

**3.3 Required graphical assets, configuration and other non-program files**

- Icons in public/icons/ (192x192, 512x512 SVG)  
- public/manifest.json (PWA manifest)  
- public/[sw.js](http://sw.js) (service worker)  
- public/notification.mp3 (audio notifications)  
- License and release notes/CHANGELOG  

**3.4 Documentation provided with the submission**

- README (install/usage)  
- PWA\_SETUP (web/PWA specifics)  
- BinaryBrains\_CodingStandards.md (development standards)  
- This Software Deployment Plan  
- Release notes per version

**3.5 Development files and components that must be excluded from the installer**

- Tests, dev-only scripts, debug assets  
- Large sourcemaps (optional)  
- Secrets/keys (never committed)  
- Unused assets  
- node\_modules/ (rebuilt during packaging)  
- package-lock.json (regenerated)   
- dist/ (rebuilt for each deployment)

**4\. Additional Code Required for Deployment**

Electron scaffolding: main process and preload scripts (window creation, safe bridging)  
Electron Builder configuration (appId, productName, targets, icons,   
NPM scripts for dev/build  
ES modules conversion: Updated main.js and preload.js for ES module compatibility 

**5\. Deployment Tasks**

1. Add Electron (main/preload) and minimal secure preload bridge.  
2. Configure Electron Builder (targets, icons, appId/productName, .  
3. Add npm scripts: electron dev, build, publish.  
4. Set up signing:

macOS: Developer ID cert and notarization credentials.  
Windows: standard code-signing certificate.

5. Build web assets: npm run build → dist/.  
6. Package installers for Windows/macOS/Linux.  

**6\. Deployment Test Plan**

**Install/uninstall:**  
Windows 10/11 (.exe), macOS 14/15 (.dmg; notarization verified), openSUSE Leap 15.x (.rpm)  
**App launch and navigation:**  
Role views (Server, Manager, Cook), routing, layout, notifications  
**Core flows:**  
Place/update/cancel orders; cook accept/ready; server serve items; deliver bill; manager revenue report  
**Offline/online:**  
Desktop operates fully offline; updates only when online  
Reasonable CPU/RAM at idle and under typical usage   
Bundle size \< 300KB gzipped Load time \< 3 seconds  
**Security:**  
Minimal preload exposure; no unexpected network calls; signed binaries verified  
Context isolation enabled in Electron  
**Regression:**  

