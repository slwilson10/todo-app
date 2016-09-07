import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field} from 'redux-form';
import validate from './newTodoValidation';
import renderInput from '../Common/TextInput';
import * as todoActions from 'redux/modules/todos';
const styles = require('containers/Todos/Todos.scss');

@connect(
  state => ({
    saveError: state.todos.saveError
  }),
  dispatch => bindActionCreators(todoActions, dispatch)
)
@reduxForm({
  form: 'newTodoForm',
  validate
})
export default class TodoForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object
  };

  render() {
    const { handleSubmit, invalid, pristine, save, reset,
      submitting, saveError: { saveError }} = this.props;
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.textCol}>
          <Field name="text" component={renderInput} type="text"/>
        </td>
        <td className={styles.buttonCol}>
          <button className="btn btn-success"
                  onClick={handleSubmit((values) => {
                    return save(values)
                      .then(result => {
                        reset();
                        if (result && typeof result.error === 'object') {
                          return Promise.reject(result.error);
                        }
                      })
                    }
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
