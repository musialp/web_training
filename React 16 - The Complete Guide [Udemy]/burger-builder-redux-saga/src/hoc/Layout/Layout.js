import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }))
    }

    render() {
        return (
            <Fragment>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    sideDrawerToggle={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);
