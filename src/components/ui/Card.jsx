/*
 * Card.jsx
 *
 * Reusable card component for displaying content in a styled container.
 * Provides consistent styling with shadow and padding.
 *
 * Created by Ryan, 29 September 2025
 */

import React from "react";
import PropTypes from "prop-types";

/*
 * Reusable card component with consistent styling
 *
 * Props:
 * children - React node, card content
 * className - string, additional CSS classes
 *
 * Returns: JSX element containing styled card container
 */
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
