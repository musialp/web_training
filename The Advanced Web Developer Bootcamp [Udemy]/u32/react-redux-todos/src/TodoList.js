import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { addTodo, removeTodo, getTodos } from './actionCreators';


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        this.props.getTodos();
    }

    handleAdd(todo) {
        this.props.addTodo(todo);
    }

    removeTodo(id) {
        this.props.removeTodo(id);
    }

    render() {
        let todos = this.props.todos.map((todo, index) => <Todo  removeTodo={this.removeTodo.bind(this, todo._id)} task={todo.task} key={todo._id} />);
        return (
            <div>
                <Route path="/todos/new" component={props => (
                    <NewTodoForm { ...props } addTodo={ this.handleAdd } />
                )}/>
                <Route exact path="/todos" component={() => <div>{todos}</div>} />
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        todos: reduxState.todos,
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         addTodo: function(task) {
//             dispatch({
//                 type: 'ADD_TODO',
//                 task
//             })
//         }
//     }
// }

export default connect(mapStateToProps, { addTodo, removeTodo, getTodos })(TodoList);
