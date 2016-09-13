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
          <input type="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleToggle(todo)}/>
        </td>
        { editing[todo.id] ?
          <td className={styles.textCol}>
          <TodoForm
            formKey={String(todo.id)}
            key={String(todo.id)}
            initialValues={todo}
            onSubmit={(todo) => handleSave(todo)}/>
          </td>:
          <td className={styles.textCol}>
          <TodoItem
            todo={todo}
            isEditing={isEditing}
            handleEditStart={() => handleEditStart(todo.id)}/>
          </td>
        }
        <TodoButtons
          todo={todo}
          isEditing={isEditing}
          editing={editing}
          hovering={hovering}
          handleDelete={() => handleDelete(todo)}
          editStop={() => handleEditStop(String(todo.id))}/>
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
