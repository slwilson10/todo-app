const validate = values => {
const errors = {}
if (!values.text) {
  errors.text = 'Required'
} else if (values.text.length > 15) {
  errors.text = 'Must be 15 characters or less'
}
return errors
}

export default validate;
