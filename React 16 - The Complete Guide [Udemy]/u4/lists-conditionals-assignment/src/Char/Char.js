import React from 'react';
import './Char.css';

const Char = ({letter, handleClick}) => {
    return (
        <div className="Char" onClick={handleClick}>
            {letter}
        </div>
    )
}

export default Char;
