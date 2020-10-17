import React from 'react'

const TextAreaField = React.forwardRef((props, ref) => {
  return (
    <textarea
      ref={ref}
      defaultValue={props.defaultValue}
      name={props.cleanName}
      id={props.id}
      required={props.required}
      placeholder={props.helpText}
    />
  )
})

const GenericInputField = React.forwardRef((props, ref) => {
  return (
    <input
      type={props.type}
      ref={ref}
      defaultValue={props.defaultValue}
      name={props.cleanName}
      id={props.id}
      required={props.required}
      placeholder={props.helpText}
    />
  )
})

const CheckboxField = React.forwardRef((props, ref) => {
  return (
    <div>
      <input
        type='checkbox'
        ref={ref}
        defaultChecked={props.defaultValue === 'on'}
        name={props.cleanName}
        id={props.id}
        required={props.required}
      />
      <div>{props.helpText}</div>
    </div>
  )
})

const WagtailField = React.forwardRef((props, ref) => {
  // cleanName
  // fieldType
  // choices
  // defaultValue
  // helpText
  // required
  let fieldElement
  switch (props.fieldType.toLowerCase()) {
    case 'multiline':
      fieldElement = <TextAreaField ref={ref} {...props} />
      break
    case 'singleline':
      fieldElement = <GenericInputField type='text' ref={ref} {...props} />
      break
    case 'email':
      fieldElement = <GenericInputField type='email' ref={ref} {...props} />
      break
    case 'number':
      fieldElement = (
        <GenericInputField
          type={props.cleanName === 'phone' ? 'tel' : 'number'}
          ref={ref}
          {...props}
        />
      )
      break
    case 'url':
      fieldElement = <GenericInputField type='url' ref={ref} {...props} />
      break
    case 'checkbox':
      fieldElement = <CheckboxField ref={ref} {...props} />
      break
    case 'hidden':
      fieldElement = <GenericInputField type='hidden' ref={ref} {...props} />
      break
    default:
      fieldElement = <GenericInputField type='text' ref={ref} {...props} />
  }
  const label = (props.label && props.fieldType.toLowerCase() !== 'hidden')
    ? (<label htmlFor={props.id}>{props.label}</label>)
    : null
  return (
    <>
      {label}
      {fieldElement}
    </>
  )
})
export default WagtailField
