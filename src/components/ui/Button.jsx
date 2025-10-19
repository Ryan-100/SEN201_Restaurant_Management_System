import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  className: PropTypes.string,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  className: PropTypes.string,
};

export default Button;
