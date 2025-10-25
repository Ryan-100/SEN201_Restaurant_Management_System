/*
 * InstallPrompt.jsx
 *
 * PWA install prompt component that shows when the app can be installed.
 * Handles the beforeinstallprompt event and provides user-friendly installation UI.
 *
 * Created by Ryan, 29 September 2025
 * Updated by Ryan, 20 October 2025
 */

import React, { useState, useEffect } from 'react';

/*
 * PWA install prompt component
 *
 * Returns: JSX element containing install prompt or null if not applicable
 */
const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDesktopEnv, setIsDesktopEnv] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Detect Electron/desktop environment for cross-platform install option
    try {
      // Basic detection: preload may expose window.desktop
      if (typeof window !== 'undefined' && window.desktop) {
        setIsDesktopEnv(true);
      }
      // User agents that block PWA installs (Safari/Firefox) will still see desktop option
    } catch {
      // no-op
    }

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if the app was previously installed
    const checkInstallation = () => {
      if (localStorage.getItem('pwa-installed') === 'true') {
        setIsInstalled(true);
      }
    };

    checkInstallation();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      localStorage.setItem('pwa-installed', 'true');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Desktop download is disabled for this submission (no external download links)
  const handleDesktopDownload = () => {};

  // Don't show if already installed or dismissed this session
  if (isInstalled || !showInstallPrompt || sessionStorage.getItem('pwa-prompt-dismissed') === 'true') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900">
            Install Restaurant App
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Install this app on your device for quick access and offline functionality.
          </p>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={handleInstallClick}
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Install
            </button>
            {/* Desktop download intentionally hidden for this submission */}
            <button
              onClick={handleDismiss}
              className="text-gray-500 px-3 py-1.5 rounded-md text-sm font-medium hover:text-gray-700 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
