import React from 'react'

const Field = React.forwardRef((props, ref) => {
  // cleanName
  // fieldType
  // choices
  // defaultValue
  // helpText
  // required
  let fieldElement
  switch (props.fieldType.toLowerCase()) {
    case 'multiline':
      fieldElement = (
        <textarea
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.cleanName}
          required={props.required}
          placeholder={props.helpText}
        />
      )
      break
    default:
      fieldElement = (
        <input
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.cleanName}
          required={props.required}
          placeholder={props.helpText}
        />
      )
  }
  return (
    <>
      <label htmlFor={props.cleanName}>{props.label}</label>
      {fieldElement}
    </>
  )
})
export default Field
