import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
  state = {
    persons: [
      { name: 'Piotr', age: 26 },
      { name: 'Adam', age: 29 },
    ],
    otherState: 'some other value',
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 26 },
        { name: 'Adam', age: 29 },
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: event.target.value, age: 26 },
        { name: 'Adam', age: 29 },
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>React app</h1>
        <button style={style} onClick={() => this.switchNameHandler('Janusz')}>Switch name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          changed={this.nameChangedHandler}
        >
            Hobbies: football
        </Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          clickHandler={this.switchNameHandler.bind(this, 'Piotr')}
        >
          Hobbies: football
        </Person>
      </div>
    );
  }
}

export default App;
