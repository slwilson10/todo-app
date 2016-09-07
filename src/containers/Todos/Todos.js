import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as todoActions from 'redux/modules/todos';
import {isLoaded, load as loadTodos} from 'redux/modules/todos';
import {initializeWithKey} from 'redux-form';
import { TodoForm, NewTodoForm } from 'components';
import { asyncConnect } from 'redux-async-connect';
import * as styles from './Todos.scss';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadTodos());
    }
  }
}])
@connect(
  state => ({
    todos: state.todos.data,
    editing: state.todos.editing,
    error: state.todos.error,
    loading: state.todos.loading,
    isEditing: state.todos.isEditing
  }),
  {...todoActions, initializeWithKey })
export default class Todos extends Component {
  static propTypes = {
    todos: PropTypes.array,
    error: PropTypes.string,
    load: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    isEditing: PropTypes.bool,
    editing: PropTypes.object.isRequired,
    editStart: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  };

  render() {
    const handleEdit = (todo) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(todo.id));
    };

    const {todos, error, editing, loading, load, isEditing, handleDelete, handleToggle} = this.props;
    let refreshClassName = 'fa fa-refresh';

    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div className={styles.todos + ' container'}>
        <Helmet title="Todos"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          {' '}
          {error}
        </div>}
        <table className={styles.table}>
          <tbody>
            <NewTodoForm />
          </tbody>
        </table>
        {todos && todos.length &&
        <table className="table table-striped">
          <tbody>
          {
            todos.map((todo) => editing[todo.id] ?
              <TodoForm
                formKey={String(todo.id)}
                key={String(todo.id)}
                initialValues={todo}/> :
              <tr key={todo.id}>
                <td className={styles.textCol}>
                  <span
                    className={todo.isCompleted ? styles.textCompleted : ''}
                    onClick={() => handleToggle(todo)}>
                    {todo.text}
                  </span>
                </td>
                <td className={styles.buttonCol}>
                  <button
                    className="btn btn-primary"
                    onClick={handleEdit(todo)}
                    disabled={isEditing}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo)}
                    disabled={isEditing}>
                    Delete
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}
