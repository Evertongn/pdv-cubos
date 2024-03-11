import React from 'react';
import "./input.css"

const Input = ({
    name,
    placeholder,
    onChange,
    type
}) => {
    return (
        <input className='InputCustomizado'
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
        />
    );
}

export default Input;