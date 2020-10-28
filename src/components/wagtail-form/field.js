import React, { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

import style from './field.module.css'

const FieldLabel = (props) => {
  return <label htmlFor={props.htmlFor} className={props.className}>{props.label}</label>
}

const DataList = ({ id, choices }) => {
  let datalist = null
  if (choices.length > 0) {
    const dataListOptions = choices.map(choice => {
      return (<option key={id + '-' + choice.name} value={choice.name}>{choice.name}</option>)
    })
    datalist = (
      <datalist id={id}>{dataListOptions}</datalist>
    )
  }
  return datalist
}

const TextAreaField = React.forwardRef((props, ref) => {
  return (
    <div className={style.fieldContainer}>
      <FieldLabel htmlFor={props.id} label={props.label} className={style.fieldLabel} />
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
  const datalistId = 'datalist-' + props.id
  const datalist = <DataList id={datalistId} choices={props.choices} />
  return (
    <div className={style.fieldContainer}>
      <FieldLabel htmlFor={props.id} label={props.label} className={style.fieldLabel} />
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

const HiddenField = React.forwardRef((props, ref) => {
  return (
    <div className={style.hiddenFieldContainer}>
      <input
        type='hidden'
        ref={ref}
        defaultValue={props.defaultValue}
        name={props.cleanName}
        id={props.id}
        required={props.required}
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
      <FieldLabel htmlFor={props.id} label={props.label} />
      <div className={style.checkboxHelpText}>{props.helpText}</div>
    </div>
  )
})

const MultiOptionField = React.forwardRef((props, ref) => {
  const choices = props.choices
  const defaultValue = props.defaultValue
  const choiceElements = choices.map(choice => {
    return (
      <div key={choice.name}>
        <input
          type={props.checkType}
          ref={choice.ref}
          defaultChecked={defaultValue.includes(choice.name)}
          name={props.cleanName}
          id={choice.slug}
          value={choice.name}
          required={props.checkType === 'radio' && props.required}
        />
        <FieldLabel htmlFor={choice.slug} label={choice.name} />
      </div>
    )
  })
  return (
    <div className={style.fieldContainer}>
      <fieldset defaultValue={defaultValue}>
        <legend>{props.label}</legend>
        <div className={style.helpText}>{props.helpText}</div>
        {choiceElements}
      </fieldset>
    </div>
  )
})

const DropDownField = React.forwardRef((props, ref) => {
  const choices = props.choices
  const choiceElements = choices.map(choice => {
    return (
      <option ref={choice.ref} key={choice.slug} value={choice.name}>{choice.name}</option>
    )
  })
  return (
    <div className={style.fieldContainer}>
      <FieldLabel htmlFor={props.cleanName} label={props.label} className={style.fieldLabel} />
      <select ref={ref} id={props.cleanName} name={props.cleanName} defaultValue={props.defaultValue} multiple={props.multiple}>
        <option key='placeholder-option' value='' disabled>{props.helpText}</option>
        {choiceElements}
      </select>
    </div>
  )
})

const DateTimeField = React.forwardRef((props, ref) => {
  const [startDate, setStartDate] = useState(null)
  return (
    <div className={style.fieldContainer}>
      <FieldLabel htmlFor={props.cleanName} label={props.label} className={style.fieldLabel} />
      <DatePicker
        ref={ref}
        selected={startDate}
        onChange={date => setStartDate(date)}
        placeholderText={props.helpText}
        required={props.required}
        showTimeSelect={!!props.timeSelect}
        timeIntervals={15}
        dateFormat={props.timeSelect ? 'Pp' : 'P'}
        timeFormat='p'
      />
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
  switch (props.fieldType) {
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
      fieldElement = <MultiOptionField ref={ref} checkType='checkbox' {...props} />
      break
    case 'radio':
      fieldElement = <MultiOptionField ref={ref} checkType='radio' {...props} />
      break
    case 'dropdown':
      fieldElement = <DropDownField ref={ref} {...props} />
      break
    case 'multiselect':
      fieldElement = <DropDownField ref={ref} multiple {...props} />
      break
    case 'date':
      fieldElement = <DateTimeField ref={ref} {...props} />
      console.log(fieldElement)
      break
    case 'datetime':
      fieldElement = <DateTimeField ref={ref} timeSelect {...props} />
      console.log(fieldElement)
      break
    case 'hidden':
      fieldElement = <HiddenField type='hidden' ref={ref} {...props} />
      break
    default:
      fieldElement = <GenericInputField type='text' ref={ref} {...props} />
  }

  return fieldElement
})
export default WagtailField
