export default $form => typeof $form.reportValidity === 'function'
  ? $form.reportValidity() : $form.checkValidity()
