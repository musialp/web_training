import React, { Component } from 'react';
import Navbar from './Navbar';
import Board from './Board';
import './MemoryGame.css';

const CardState = {
  HIDDEN: 0,
  SHOWING: 1,
  MATCHING: 2
}

function shuffle(array) {
  var currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

class MemoryGame extends Component {
  constructor(props) {
    super(props);

    let cards = [
      {id: 0, cardState: CardState.HIDDEN, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDDEN, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDDEN, backgroundColor: 'navy'},
      {id: 3, cardState: CardState.HIDDEN, backgroundColor: 'navy'},
      {id: 4, cardState: CardState.HIDDEN, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDDEN, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDDEN, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDDEN, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDDEN, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDDEN, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDDEN, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDDEN, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDDEN, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDDEN, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDDEN, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDDEN, backgroundColor: 'lightskyblue'},
    ];

    this.state = {
      cards: shuffle(cards),
      noClick: false
    };
    this.handleTileClick = this.handleTileClick.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  newGame() {
    let cards = this.state.cards.map(card => ({
      ...card,
      cardState: CardState.HIDDEN
    }));
    cards = shuffle(cards);
    this.setState({cards});
  }

  handleTileClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(card => {
        if(idsToChange.includes(card.id)) {
          return {
            ...card,
            cardState: newCardState
          };
        }
        return card;
      });
    }

    const foundCard = this.state.cards.find(card => card.id === id);

    if (this.state.noClick || foundCard.cardState !== CardState.HIDDEN) {
      return;
    }

    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter(card => card.cardState === CardState.SHOWING)

    const ids = showingCards.map(card => card.id);

    if(showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING);
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDDEN);
      noClick = true;
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          this.setState({cards: hidingCards, noClick: false});
        }, 1300);
      });
      return;
    }
    this.setState({cards, noClick});
}

  render() {
    return (
      <div className="App">
        <Navbar newGame={this.newGame}/>
        <Board handleTileClick={this.handleTileClick} cards={this.state.cards}/>
      </div>
    );
  }
}

export default MemoryGame;
