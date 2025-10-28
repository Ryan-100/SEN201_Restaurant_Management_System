/*
 * electron/main.js
 *
 * Electron main process entry. Creates the application window and
 * loads the Vite dev server in development or the built index.html
 * in production.
 *
 * Created by Ryan, 20 October 2025
 */

import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.ELECTRON_START_URL != null;

function createMainWindow() {
  // Use smaller window in dev mode to test responsive features
  // 600px width triggers mobile breakpoints (< 768px md breakpoint)
  const windowWidth = isDev ? 600 : 1200;
  const windowHeight = isDev ? 800 : 800;
  
  const mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    minWidth: 400,
    minHeight: 600,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  if (isDev) {
    const devServerUrl = process.env.ELECTRON_START_URL;
    mainWindow.loadURL(devServerUrl);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    const indexHtmlPath = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(indexHtmlPath);
  }
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


