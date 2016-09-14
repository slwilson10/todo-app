import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as todoActions from 'redux/modules/todos';
import {isLoaded, load as loadTodos} from 'redux/modules/todos';
import {initializeWithKey} from 'redux-form';
import {NewTodoForm, TodoList} from 'components';
import {asyncConnect} from 'redux-async-connect';
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
    isEditing: state.todos.isEditing,
    hovering: state.todos.hovering

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
    hovering: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseLeave: PropTypes.func.isRequired,
    handleEditStart: PropTypes.func.isRequired,
    handleEditStop: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleDeleteAll: PropTypes.func.isRequired
  };

  render() {
    const {todos, error, editing, hovering, loading, load, handleSave,
      isEditing, handleMouseOver, handleMouseLeave, handleDelete, handleToggle, handleEditStop,
      handleEditStart, handleDeleteAll} = this.props;
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
        {todos && todos.length &&
            <TodoList
              todos={todos}
              editing={editing}
              isEditing={isEditing}
              hovering={hovering}
              handleSave={(todo) => handleSave(todo)}
              handleToggle={(todo) => handleToggle(todo)}
              handleEditStart={(todo) => handleEditStart(todo)}
              handleEditStop={(todo) => handleEditStop(todo)}
              handleDelete={(todo) => handleDelete(todo)}
              handleDeleteAll={(todos) => handleDeleteAll(todos)}
              handleMouseOver={(todo) => handleMouseOver(todo)}
              handleMouseLeave={(todo) => handleMouseLeave(todo)}/>
          }
      </div>
    );
  }
}
