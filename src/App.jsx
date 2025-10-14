
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RoleSwitcher from './components/layout/RoleSwitcher';
import ServerView from './components/pages/server';
import ManagerView from './components/pages/manager';
import CookView from './components/pages/cook';
import TestInterface from './components/pages/test';

import './App.css'

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
                    <Route path="/test" element={<TestInterface />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
