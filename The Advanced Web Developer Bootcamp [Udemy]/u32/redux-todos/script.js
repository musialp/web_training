// We neeed a reducer (rootReducer)
// We need some redux store and initialState
// We need some way of changing the state

const initialState = {
    todos: [],
    id: 0
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_TODO':
            var newState = {... state };
            newState.id++;
            return {
                ...newState,
                todos: [...newState.todos, {task: action.task, id:newState.id}]
            };
            //add a todo
        case 'REMOVE_TODO':
            //remove a todo
            let todos = state.todos.filter(todo => todo.id !== +action.id);
            return {...state, todos};
        default:
            return state;
    }
}

const store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

$(document).ready(function() {
    $('ul').on('click', 'button', function(event) {
        store.dispatch({
            type: "REMOVE_TODO",
            id: $(event.target).attr('id')
        });
        $(event.target).parent().remove();
    })

    $('form').on('submit', function(event) {
        event.preventDefault();
        let newTask = $('#task').val();
        store.dispatch({
            type: "ADD_TODO",
            task: newTask
        })
        let currentState = store.getState();
        let $newLi = $('<li>', { text: newTask });
        let $newButton = $('<button>', { text: 'X', id: currentState.id });
        $newLi.append($newButton);
        $('#todos').append($newLi);
        $('form').trigger('reset');
    })
});
