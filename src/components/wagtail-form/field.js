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

const DataList = ({ id, choices }) => {
  let datalist = null
  if (choices !== []) {
    const dataListOptions = choices.map(choice => {
      return (<option key={id + '-' + choice.name} value={choice.name}>{choice.name}</option>)
    })
    datalist = (
      <datalist id={id}>{dataListOptions}</datalist>
    )
  }
  return datalist
}

const GenericInputField = React.forwardRef((props, ref) => {
  const datalistId = props.id + '-datalist'
  const datalist = <DataList id={datalistId} choices={props.choices} />
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
        list={datalistId}
      />
      {datalist}
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
        <div className={style.helpText}>{props.helpText}</div>
        {choiceElements}
      </fieldset>
    </div>
  )
})

const DropDownField = React.forwardRef((props, ref) => {
  const choices = props.choices
  let defaultValue = ''
  const choiceElements = choices.map(choice => {
    if (choice.name === props.defaultValue) { defaultValue = choice.name }
    return (
      <option key={choice.slug} value={choice.name}>{choice.name}</option>
    )
  })
  return (
    <div className={style.fieldContainer}>
      <FieldLabel htmlFor={props.cleanName} label={props.label} fieldType={props.fieldType} className={style.fieldLabel} />
      <select ref={ref} id={props.cleanName} name={props.cleanName} value={defaultValue}>
        <option key='placeholder-option' value='' disabled>{props.helpText}</option>
        {choiceElements}
      </select>
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
    case 'dropdown':
      fieldElement = <DropDownField ref={ref} {...props} />
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
