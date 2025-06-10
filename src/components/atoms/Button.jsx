import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className, onClick, type = 'button', disabled, ...motionProps }) => {
    return (
        <motion.button
            onClick={onClick}
            className={className}
            type={type}
            disabled={disabled}
            {...motionProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;