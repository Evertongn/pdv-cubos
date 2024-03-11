import React from 'react';

import "./styles.css"


const Botao = ({
    type,
    text,
    onClick,
    disabled,
}) => {
    return (
        <button className={disabled ? "btn-hidden" : "btn"}
            type={type}
            text={text}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Botao;