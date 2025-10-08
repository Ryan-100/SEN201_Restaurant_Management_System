/*
 * index.jsx
 *
 * The main view component for the Manager role. It serves as the container
 * for all manager-specific functionalities, such as menu and report management.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

import React from 'react';
import MenuManager from './MenuManager';

/**
 * Renders the main dashboard for the Manager.
 *
 * @returns {React.ReactElement} JSX for the Manager's view.
 */
const ManagerView = () => {
  return (
    <div>
      <MenuManager />
    </div>
  );
};

export default ManagerView;