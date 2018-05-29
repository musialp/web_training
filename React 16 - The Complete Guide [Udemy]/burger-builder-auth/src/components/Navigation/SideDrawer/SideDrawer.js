import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.css';

const SideDrawer = props => {
    const attachedClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ');
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;
