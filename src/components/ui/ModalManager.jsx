/*
 * ModalManager.jsx
 *
 * A reusable modal component that displays content in a centered overlay.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

import React from 'react';
import PropTypes from 'prop-types';

//Renders a modal overlay with content.
const ModalManager = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalManager;

ModalManager.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};