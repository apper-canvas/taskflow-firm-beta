import React from 'react';
import Input from '@/components/atoms/Input';

const FormField = ({ label, id, type = 'text', className, children, ...inputProps }) => {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            {children || <Input id={id} type={type} {...inputProps} />}
        </div>
    );
};

export default FormField;