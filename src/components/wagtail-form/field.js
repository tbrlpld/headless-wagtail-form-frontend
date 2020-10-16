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
          id={props.id}
          required={props.required}
          placeholder={props.helpText}
        />
      )
      break
    case 'singleline':
      fieldElement = (
        <input
          type='text'
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.cleanName}
          id={props.id}
          required={props.required}
          placeholder={props.helpText}
        />
      )
      break
    case 'email':
      fieldElement = (
        <input
          type='email'
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.cleanName}
          id={props.id}
          required={props.required}
          placeholder={props.helpText}
        />
      )
      break
    case 'number':
      fieldElement = (
        <input
          type={props.cleanName === 'phone' ? 'tel' : 'number'}
          pattern={props.cleanName === 'phone' ? '[0-9]{3}-[0-9]{3}-[0-9]{4}' : null}
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.cleanName}
          id={props.id}
          required={props.required}
          placeholder={props.cleanName === 'phone' ? '123-456-7890' : props.helpText}
        />
      )
      break
    case 'url':
      fieldElement = (
        <input
          type='url'
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.cleanName}
          id={props.id}
          required={props.required}
          placeholder={props.cleanName === 'phone' ? '123-456-7890' : props.helpText}
        />
      )
      break
    case 'checkbox':
      fieldElement = (
        <input
          type='checkbox'
          ref={ref}
          defaultChecked={props.defaultValue === 'on'}
          name={props.cleanName}
          id={props.id}
          required={props.required}
        />
      )
      break
    case 'hidden':
      fieldElement = (
        <input
          type='hidden'
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.cleanName}
          id={props.id}
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
          id={props.id}
          required={props.required}
          placeholder={props.helpText}
        />
      )
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
