import React, { Component } from 'react';
import Validation from './Validation/Validation';
import Char from './Char/Char';
import './App.css';

class App extends Component {
  state = {
    inputValue: '',
  }

  handleChange = (event) => {
    this.setState( {
      inputValue: event.target.value,
    })
  }

  handleClick = (index) => {
    let inputValue = this.state.inputValue.split('');
    inputValue.splice(index, 1);
    inputValue = inputValue.join('');
    this.setState({
      inputValue,
    })
  }

  render() {
    const chars = this.state.inputValue.split('').map((char, index) => {
      return <Char letter={char} handleClick={this.handleClick.bind(this, index)} key={index} />
    })

    return (
      <div className="App">
        <input type="text" onChange={this.handleChange} value={this.state.inputValue}/>
        <p>{this.state.inputValue.length}</p>
        <Validation length={this.state.inputValue.lenght} />
        {chars}
      </div>
    );
  }
}

export default App;
