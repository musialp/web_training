import React, {Component} from 'react'
import Tile from './Tile'
import './Board.css'

const CardState = {
    HIDDEN: 0,
    SHOWING: 1,
    MATCHING: 2
  }

class Board extends Component {
    render() {
        const {handleTileClick} = this.props;
        const tiles = this.props.cards.map((card) => (
            <Tile   key={card.id}
                    id={card.id}
                    cardState={card.cardState}
                    backgroundColor={card.backgroundColor}
                    handleTileClick={() => handleTileClick(card.id)}
                    showing={card.cardState !== CardState.HIDDEN} />
        ))
        return (
            <div className="board">
                {tiles}
            </div>
        )
    }
}

export default Board
