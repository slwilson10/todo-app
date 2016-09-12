import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TodoForm, NewTodoForm} from 'components';
import * as styles from '../../containers/Todos/Todos.scss';

const TodoItem = (props) => {
    const {todo, handleEditStart}= props;
    return (
            <span
              className={todo.isCompleted ? styles.textCompleted : ''}
              onClick={() => handleEditStart(todo.id)}>
              {todo.text}
            </span>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  handleEditStart: PropTypes.func.isRequired
}

export default TodoItem;
