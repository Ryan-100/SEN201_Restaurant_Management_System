/*
 * Modal.jsx
 *
 * A reusable modal component that displays content in a centered overlay, styled with Tailwind CSS.
 *
 * Created by Grace (Shinn Thant Khin), 07 October 2025
 */

import React from 'react';

/**
 * Renders a modal overlay with content.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls whether the modal is visible.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @returns {React.ReactElement|null} JSX for the modal or null if not open.
 */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
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

export default Modal;