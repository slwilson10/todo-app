import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field} from 'redux-form';
import validate from './todoValidation';
import renderInput from '../Common/TextInput';
import * as todoActions from 'redux/modules/todos';

@connect(
  state => ({
    saveError: state.todos.saveError
  }),
  dispatch => bindActionCreators(todoActions, dispatch)
)
@reduxForm({
  form: 'todoForm',
  validate
})
export default class TodoForm extends Component {
  static propTypes = {
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired
  };

  render() {
    const { editStop, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }} = this.props;
    const styles = require('containers/Todos/Todos.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.textCol}>
          <Field name="text" component={renderInput} type="text"/>
        </td>
        <td className={styles.buttonCol}>
          <button className="btn btn-default"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit((values) => {
                    return save(values)
                      .then(result => {
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
