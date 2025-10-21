/*
 * electron/preload.js
 *
 * Electron preload script. Safely exposes limited APIs to the renderer
 * process if needed. Currently minimal and standards-compliant.
 *
 * Created by Ryan, 20 October 2025
 */

import { contextBridge } from 'electron';

// Expose a minimal API surface for future use
contextBridge.exposeInMainWorld('desktop', {
  // Placeholder for future desktop-specific actions
});


