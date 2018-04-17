import React, { Component } from 'react';

export default class newTodoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addTodo(this.state.task);
        event.target.reset();
        this.props.history.push('/todos');
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task">Task: </label>
                    <input type="text" name="task" id="task" onChange={this.handleChange}/>
                    <button>Add a Todo!</button>
            </form>
        )
    }
}
