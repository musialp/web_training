import React from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Cockpit.css';

const Cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = classes.button;

    if  (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    if(props.showPersons) {
        btnClass = [classes.button, classes.red].join(' ');
    }

    return (
        <Auxiliary>
            <h1 className={assignedClasses.join(' ')}>{props.appTitle}</h1>
            <button className={btnClass} onClick={props.clicked}>Toggle Persons</button>
            <button onClick={props.login}>Log in</button>
        </Auxiliary>
    );
}

export default Cockpit;
