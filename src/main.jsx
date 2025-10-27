/*
 * main.jsx
 *
 * Application entry point that renders the React app with routing and context providers.
 * Also handles service worker registration for PWA functionality.
 *
 * Created by Ryan, 29 September 2025
 */

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import { AppProvider } from './contexts/AppContext.jsx';

// Disable SW in Electron (file:// origins) to avoid scope errors
const isElectron = typeof window !== 'undefined' && !!window.desktop;
if (!isElectron && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const Router = isElectron ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </StrictMode>,
);
