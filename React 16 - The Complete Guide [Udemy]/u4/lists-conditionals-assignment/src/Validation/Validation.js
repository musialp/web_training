import React from 'react';

const Validation = ({length}) => {
    return length >= 5 ? <p>Text long enough</p> : <p>Text too short</p>
}

export default Validation;
