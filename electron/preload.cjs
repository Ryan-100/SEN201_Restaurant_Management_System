// electron/preload.cjs (CommonJS for Windows compatibility)
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  // Placeholder for future desktop-specific actions
});



