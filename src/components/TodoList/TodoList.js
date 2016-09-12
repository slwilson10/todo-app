import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {TodoRow, NewTodoForm} from 'components';
import * as styles from '../../containers/Todos/Todos.scss';

const TodoList = (props) => {
    const {todos, editing, isEditing, hovering, handleSave,
      handleEditStart, handleEditStop, handleToggle, handleDelete,
      handleMouseOver, handleMouseLeave}= props;
    const openTodos = todos.filter((t) => !t.isCompleted);
    const completedTodos = todos.filter((t) => t.isCompleted);
    return (
      <table className="table table-striped">
        <tbody>
        { openTodos.map((todo) =>
          <TodoRow
            todo={todo}
            key={todo.id}
            editing={editing}
            isEditing={isEditing}
            hovering={hovering}
            handleSave={handleSave}
            handleEditStart={handleEditStart}
            handleEditStop={handleEditStop}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            handleMouseOver={handleMouseOver}
            handleMouseLeave={handleMouseLeave}/>
        )}
        <NewTodoForm onSubmit={(todo) => handleSave(todo)}/>
        { completedTodos.map((todo) =>
          <TodoRow
            todo={todo}
            key={todo.id}
            editing={todo}
            isEditing={isEditing}
            hovering={hovering}
            handleSave={handleSave}
            handleEditStart={handleEditStart}
            handleEditStop={handleEditStop}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleMouseOver={handleMouseOver}
            handleMouseLeave={handleMouseLeave}/>
        )}
      </tbody>
      </table>
    );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
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

export default TodoList;
