import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import validate from './newTodoValidation';
import renderInput from '../Common/TextInput';
import * as styles from '../../containers/Todos/Todos.scss';

const NewTodoForm = (props) => {
    const {handleSubmit, onSubmit, invalid, pristine, reset,
      submitting}= props;
    return (
      <tr>
      <td>
        <form onSubmit={handleSubmit((values) => {
            return onSubmit(values)
              .then(result => {
                reset();
                if (result && typeof result.error === 'object') {
                  return Promise.reject(result.error);
                }
              })
        })}>
          <Field name="text" component={renderInput} type="text"/>
        </form>
      </td>
    </tr>
    );
}

NewTodoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'newTodoForm',
  validate
})(NewTodoForm)
