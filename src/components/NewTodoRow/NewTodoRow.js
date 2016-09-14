import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {NewTodoForm} from 'components';
import * as styles from '../../containers/Todos/Todos.scss';

const NewTodoRow = (props) => {
    const {handleSave}= props;
    return (
      <tr>
        <td className={styles.idCol}>
          <div className="fa fa-plus-square-o fa-lg" />
        </td>
        <td className={styles.textCol}>
            <NewTodoForm onSubmit={(todo) => handleSave(todo)}/>
        </td>
        <td className={styles.buttonCol} />
      </tr>
  );
}

NewTodoRow.propTypes = {
  handleSave: PropTypes.func.isRequired
}

export default NewTodoRow;
