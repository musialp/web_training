import React, {Component} from 'react';
import './TodoForm.css';

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {inputValue: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleSubmit(e) {
        if(e.key === 'Enter') {
            this.props.addTodo(this.state.inputValue);
            this.setState({
                inputValue: ''
            })
        }
    }

    render() {
        return (
            <div className="form">
                <input id="todoInput" type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Insert your task here" onKeyPress={this.handleSubmit}/>
            </div>
        )
    }
}

export default TodoForm;
