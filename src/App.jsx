
import React from 'react';

import RoleSwitcher from './components/layout/RoleSwitcher';
import ServerView from './components/pages/server';
import ManagerView from './components/pages/manager';
import CookView from './components/pages/cook';

import { Role } from './data/role';

import './App.css'
import TestInterface from './components/pages/test';

const App = () => {
    const [currentRole, setCurrentRole] = React.useState(Role.Server);

    const renderView = () => {
        switch (currentRole) {
            case Role.Manager:
                return <ManagerView />;
            case Role.Server:
                return <ServerView />;
            case Role.Cook:
                return <CookView />;
            case Role.Test:
                return <TestInterface />;
            default:
                return <ServerView />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <RoleSwitcher currentRole={currentRole} onRoleChange={setCurrentRole} />
            <main className="flex-grow p-4 md:p-8">
                {renderView()}
            </main>
        </div>
    );
};

export default App;
