import React from 'react';
import './TodoItem.css'

const TodoItem = ({name, completed, onDelete, onToggle}) => (
    <li className="task">
        <span   onClick={onToggle}
                style = {{textDecoration: completed ? 'line-through' : 'none'}}>
            {name}
        </span>
        <span className="delete" onClick={onDelete}> X </span>
    </li>
);

export default TodoItem;
