import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TodoForm, NewTodoForm} from 'components';
import * as styles from '../../containers/Todos/Todos.scss';

const TodoButtons = (props) => {
    const {todo, editing, hovering, isEditing, handleDelete, editStop}= props;
    return (
      <td className={styles.buttonCol}>
          { hovering[todo.id] && !isEditing ?
              <button
                  className="btn btn-link"
                  onClick={() => handleDelete(todo)}
                  disabled={isEditing}>
                  <i className="fa fa-trash-o fa-lg"/>
              </button> :
            <div />
          }
          { editing[todo.id] && isEditing ?
            <button className="btn btn-link"
              type="button"
              onClick={() => editStop(editing.id)}>
              <i className="fa fa-times"/>
            </button> :
            <div />
          }
      </td>
  );
}

TodoButtons.propTypes = {
  todo: PropTypes.object.isRequired,
  editing: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  hovering: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editStop: PropTypes.func.isRequired,
}

export default TodoButtons;
