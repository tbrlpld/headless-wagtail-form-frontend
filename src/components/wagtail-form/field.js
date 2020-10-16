import React from 'react'

const Field = React.forwardRef((props, ref) => {
  // cleanName
  // fieldType
  // choices
  // defaultValue
  // helpText
  // required
  return (
    <>
      <label htmlFor={props.cleanName}>{props.label}</label>
      <input
        ref={ref}
        defaultValue={props.defaultValue}
        name={props.cleanName}
        required={props.required}
        placeholder={props.helpText}
      />
    </>
  )
})
export default Field
