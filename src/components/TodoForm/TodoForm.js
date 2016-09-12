import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field} from 'redux-form';
import validate from './todoValidation';
import renderInput from '../Common/TextInput';
import * as todoActions from 'redux/modules/todos';
import * as styles from '../../containers/Todos/Todos.scss';

const TodoForm = (props) => {
  const { editStop, formKey, handleSubmit, invalid,
    pristine, onSubmit, submitting } = props;
  return (
        <form onSubmit={handleSubmit((values) => {
                  return onSubmit(values)
                    .then(result => {
                      reset();
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  }
                )}>
          <Field name="text" component={renderInput} type="text"/>
          <button className="btn btn-link"
            type="button"
            onClick={() => editStop(formKey)}
            disabled={submitting}>
            <i className="fa fa-times"/>
          </button>
        </form>
  );
}

TodoForm.propTypes = {
  editStop: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  formKey: PropTypes.string.isRequired
}

export default reduxForm({
  form: 'todoForm',
  validate
})(TodoForm)
