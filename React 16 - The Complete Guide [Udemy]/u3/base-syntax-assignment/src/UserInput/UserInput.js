import React from 'react';

const UserInput = (props) => {
    const style = {
        border: '2px solid red',
    };
    return (
        <input onChange={props.handleInputChange} value={props.username} style={style} type="text"/>
    );
}

export default UserInput;
