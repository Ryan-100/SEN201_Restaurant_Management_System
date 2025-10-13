import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
            {children}
        </div>
    );
};

export default Card;

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
