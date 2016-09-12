import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TodoForm, NewTodoForm} from 'components';
import * as styles from '../../containers/Todos/Todos.scss';

const TodoButtons = (props) => {
    const {todo, hovering, isEditing, handleDelete}= props;
    return (
      <div className={styles.buttonCol}>
          { hovering[todo.id] ?
              <button
                  className="btn btn-link"
                  onClick={() => handleDelete(todo)}
                  disabled={isEditing}>
                  <span className="fa fa-trash-o fa-lg"/>
              </button> :
            <div />
          }
      </div>
  );
}

TodoButtons.propTypes = {
  todo: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  hovering: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default TodoButtons;
