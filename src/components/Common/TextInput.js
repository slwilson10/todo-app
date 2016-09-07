import React from 'react';

const renderInput = field =>
  <div>
    <input
      className="form-control"
      {...field.input}
      type={field.type}/>
    {field.meta.error &&
      field.meta.touched &&
     <span className="error">{field.meta.error}</span>}
  </div>
export default renderInput;
