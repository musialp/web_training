import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

const Tile = (props) => {
    let style = {}
    if(props.showing) {
        style.backgroundColor = props.backgroundColor;
    }

    return (
        <div
            className="tile"
            style={style}
            onClick={props.handleTileClick}>
        </div>
    );
}

Tile.propTypes = {
    showing: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    handleTileClick: PropTypes.func.isRequired
};

export default Tile;
