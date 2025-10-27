
/*
 * App.jsx
 *
 * Main application component that sets up routing and layout structure.
 * Handles navigation between different role-based views (Server, Manager, Cook, Test).
 *
 * Created by Ryan, 29 September 2025
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RoleSwitcher from './components/layout/RoleSwitcher';
import ServerView from './components/pages/server';
import ManagerView from './components/pages/manager';
import CookView from './components/pages/cook';
import InstallPrompt from './components/ui/InstallPrompt';

import './App.css';

/*
 * Main application component with routing and layout
 *
 * Returns: JSX element containing the complete application structure
 */
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <RoleSwitcher />
      <main className="flex-grow p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/server" replace />} />
          <Route path="/server" element={<ServerView />} />
          <Route path="/manager" element={<ManagerView />} />
          <Route path="/cook" element={<CookView />} />
        </Routes>
      </main>
      <InstallPrompt />
    </div>
  );
};

export default App;
