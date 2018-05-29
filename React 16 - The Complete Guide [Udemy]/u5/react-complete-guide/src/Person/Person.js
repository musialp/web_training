import React from 'react';
import classes from './Person.css';

const Person = (props) => {
    return (
        <div className={classes.Person}>
            <p onClick={props.clickHandler}>I'm {props.name} and I am {props.age} years old!</p>
            <p onClick={props.clickHandler}>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}

export default Person;
