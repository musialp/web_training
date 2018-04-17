import React from 'react'
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({newGame}) => (
    <header>
        <h2><a className="logo">Memory Game</a></h2>
        <nav>
            <ul className="nav-ul">
                <li><a onClick={newGame}>New Game</a></li>
            </ul>
        </nav>
    </header>
)

Navbar.propTypes = {
    newGame: PropTypes.func.isRequired
};

export default Navbar;
