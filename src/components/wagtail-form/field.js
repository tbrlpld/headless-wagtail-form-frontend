import React from 'react'

import style from './field.module.css'

const FieldLabel = (props) => {
  const label = (props.label && props.fieldType.toLowerCase() !== 'hidden')
    ? (<label htmlFor={props.htmlFor} className={props.className}>{props.label}</label>)
    : null
  return label
}

const TextAreaField = React.forwardRef((props, ref) => {
  return (
    <div className={style.fieldContainer}>
      <FieldLabel htmlFor={props.id} label={props.label} fieldType={props.fieldType} className={style.fieldLabel} />
      <textarea
        ref={ref}
        defaultValue={props.defaultValue}
        name={props.cleanName}
        id={props.id}
        required={props.required}
        placeholder={props.helpText}
      />
    </div>
  )
})

const GenericInputField = React.forwardRef((props, ref) => {
  return (
    <div className={style.fieldContainer}>
      <FieldLabel htmlFor={props.id} label={props.label} fieldType={props.fieldType} className={style.fieldLabel} />
      <input
        type={props.type}
        ref={ref}
        defaultValue={props.defaultValue}
        name={props.cleanName}
        id={props.id}
        required={props.required}
        placeholder={props.helpText}
      />
    </div>
  )
})

const CheckboxField = React.forwardRef((props, ref) => {
  return (
    <div className={style.fieldContainer}>
      <input
        type='checkbox'
        ref={ref}
        defaultChecked={props.defaultValue === 'on'}
        name={props.cleanName}
        id={props.id}
        required={props.required}
      />
      <FieldLabel htmlFor={props.id} label={props.label} fieldType={props.fieldType} />
      <div className={style.checkboxHelpText}>{props.helpText}</div>
    </div>
  )
})

const MultiCheckboxField = React.forwardRef((props, ref) => {
  const choices = props.choices
  const defaults = props.defaultValue
  const choiceElements = choices.map(choice => {
    return (
      <div key={choice.name} className={style.multiCheckboxChoice}>
        <input
          type='checkbox'
          ref={choice.ref}
          defaultChecked={defaults.includes(choice.name)}
          name={props.cleanName}
          id={choice.slug}
          value={choice.name}
        />
        <FieldLabel htmlFor={choice.slug} label={choice.name} fieldType={props.fieldType} />
      </div>
    )
  })
  return (
    <div className={style.fieldContainer}>
      <fieldset>
        <legend>{props.label}</legend>
        <div className={style.checkboxHelpText}>{props.helpText}</div>
        {choiceElements}
      </fieldset>
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
    case 'checkboxes':
      fieldElement = <MultiCheckboxField ref={ref} {...props} />
      break
    case 'hidden':
      fieldElement = <GenericInputField type='hidden' ref={ref} {...props} />
      break
    default:
      fieldElement = <GenericInputField type='text' ref={ref} {...props} />
  }

  return fieldElement
})
export default WagtailField
