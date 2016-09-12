import React from 'react';
import * as styles from '../../containers/Todos/Todos.scss';

const renderInput = field =>
  <div className={styles.textCol}>
    <input
      {...field.input}
      type={field.type}
      placeholder="Add Todo"/>
    {field.meta.error &&
      field.meta.touched &&
     <span className="error">{field.meta.error}</span>}
  </div>
export default renderInput;
