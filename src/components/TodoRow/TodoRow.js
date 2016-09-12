import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TodoForm, NewTodoForm, TodoItem, TodoButtons} from 'components';
import * as styles from '../../containers/Todos/Todos.scss';

const TodoRow = (props) => {
    const {todo, editing, isEditing, hovering, handleSave,
      handleEditStart, handleEditStop, handleToggle, handleDelete,
      handleMouseOver, handleMouseLeave}= props;
    return (
      <tr key={todo.id}
        onMouseOver={() => handleMouseOver(todo.id)}
        onMouseLeave={() => handleMouseLeave(todo.id)}>
        <td className={styles.idCol}>
          <input type="checkbox" onClick={() => handleToggle(todo)}/>
        </td>
        { editing[todo.id] ?
          <td>
          <TodoForm
            formKey={String(todo.id)}
            key={String(todo.id)}
            initialValues={todo}
            editStop={() => handleEditStop(String(todo.id))}
            onSubmit={(todo) => handleSave(todo)}/>
            </td> :
          <td className={styles.textCol}>
          <TodoItem
            todo={todo}
            handleEditStart={() => handleEditStart(todo.id)}/>
          <TodoButtons
            todo={todo}
            isEditing={isEditing}
            hovering={hovering}
            handleDelete={() => handleDelete(todo)}/>
          </td>
        }
    </tr>
  );
}

TodoRow.propTypes = {
  todo: PropTypes.object.isRequired,
  editing: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  hovering: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleEditStart: PropTypes.func.isRequired,
  handleEditStop: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
}

export default TodoRow;
