/*
 * RoleSwitcher.jsx
 *
 * Navigation component that allows users to switch between different role-based views
 * (Manager, Server, Cook, Test) in the restaurant management system.
 *
 * Created by Ryan, 29 September 2025
 */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Role } from "../../data/role";
import useLocalStorage from "../../hooks/useLocalStorage";

/*
 * Role switcher navigation component with responsive design
 *
 * Returns: JSX element containing role-based navigation buttons
 */
const RoleSwitcher = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [, setLastRole] = useLocalStorage('lastSelectedRole', '/server');
    const roles = [Role.Manager, Role.Server, Role.Cook];

    const roleConfig = {
        [Role.Manager]: { bgColor: 'bg-blue-600', hoverBgColor: 'hover:bg-blue-700', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', path: '/manager' },
        [Role.Server]: { bgColor: 'bg-green-600', hoverBgColor: 'hover:bg-green-700', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', path: '/server' },
        [Role.Cook]: { bgColor: 'bg-yellow-600', hoverBgColor: 'hover:bg-yellow-700', icon: 'M13 10V3L4 14h7v7l9-11h-7z', path: '/cook' },
    };

    const handleRoleClick = (path) => {
        setLastRole(path);
        setMenuOpen(false);
    };

    const handleMobileMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    // Get current active role
    const activeRole = roles.find(role => roleConfig[role].path === location.pathname);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      {/* Desktop and Mobile Header */}
      <div className="px-4 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <div className="flex items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider">Restaurant POS</h1>
        </div>

        {/* Desktop Role Switcher */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm font-medium mr-2">SWITCH ROLE:</span>
          {roles.map((role) => {
            const { bgColor, hoverBgColor, icon, path } = roleConfig[role];
            const isActive = location.pathname === path;
            return (
              <Link
                key={role}
                to={path}
                onClick={() => handleRoleClick(path)}
                className={`flex items-center px-4 py-2 rounded-md font-semibold transition-all duration-300 transform ${isActive ? `${bgColor} scale-105 shadow-md` : `bg-gray-700 ${hoverBgColor} hover:scale-105`}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d={icon} clipRule="evenodd" />
                </svg>
                <span className="hidden lg:inline">{role}</span>
                <span className="lg:hidden">{role.charAt(0)}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Current Role Display */}
        {activeRole && (
          <div className="md:hidden flex items-center">
            <span className="text-xs font-medium text-gray-300 mr-2">Current:</span>
            <span className={`px-3 py-1 rounded-md text-xs font-semibold ${roleConfig[activeRole].bgColor}`}>
              {activeRole}
            </span>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-4 pb-4 space-y-2">
          <div className="text-xs font-medium text-gray-300 mb-2">SELECT ROLE:</div>
          {roles.map((role) => {
            const { bgColor, hoverBgColor, icon, path } = roleConfig[role];
            const isActive = location.pathname === path;
            return (
              <Link
                key={role}
                to={path}
                onClick={() => handleRoleClick(path)}
                className={`flex items-center w-full px-4 py-3 rounded-md font-semibold transition-all duration-300 ${
                  isActive 
                    ? `${bgColor} shadow-md` 
                    : `bg-gray-700 ${hoverBgColor}`
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d={icon} clipRule="evenodd" />
                </svg>
                {role}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default RoleSwitcher;
