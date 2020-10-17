import React from 'react'

const MultiLineField = React.forwardRef((props, ref) => {
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

const GenericField = React.forwardRef((props, ref) => {
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
      fieldElement = <MultiLineField ref={ref} {...props} />
      break
    case 'singleline':
      fieldElement = <GenericField type='text' ref={ref} {...props} />
      break
    case 'email':
      fieldElement = <GenericField type='email' ref={ref} {...props} />
      break
    case 'number':
      fieldElement = (
        <GenericField
          type={props.cleanName === 'phone' ? 'tel' : 'number'}
          ref={ref}
          {...props}
        />
      )
      break
    case 'url':
      fieldElement = <GenericField type='url' ref={ref} {...props} />
      break
    case 'checkbox':
      fieldElement = <CheckboxField ref={ref} {...props} />
      break
    case 'hidden':
      fieldElement = <GenericField type='hidden' ref={ref} {...props} />
      break
    default:
      fieldElement = <GenericField type='text' ref={ref} {...props} />
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
export default Field
