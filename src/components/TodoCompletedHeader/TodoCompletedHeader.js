import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import * as styles from '../../containers/Todos/Todos.scss';

const TodoCompletedHeader = (props) => {
    const {todos, handleDeleteAll}= props;
    return (
      <tr>
        <td className={styles.idCol} />
        <td className={styles.textCol}>
          <h4>Completed Todos</h4>
        </td>
        <td className={styles.buttonCol}>
          <button
              className="btn btn-link"
              onClick={(todos) => handleDeleteAll(todos)}>
              <i className="fa fa-trash-o fa-lg"/>
          </button>
        </td>
      </tr>
  );
}

TodoCompletedHeader.propTypes = {
  todos: PropTypes.array.isRequired,
  handleDeleteAll: PropTypes.func.isRequired
}

export default TodoCompletedHeader;
