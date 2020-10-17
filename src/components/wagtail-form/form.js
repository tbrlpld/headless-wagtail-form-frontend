import React from 'react'

import WagtailField from './field'

import style from './form.module.css'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.title = props.title
    this.intro = props.intro
    this.thankYouText = props.thankYouText
    this.fields = props.fields
    this.fields.forEach((field, index) => {
      field.ref = React.createRef()
    })

    this.getFieldElements = this.getFieldElements.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFieldElements () {
    const fieldElements = this.fields.map(field => {
      return (
        <div key={field.id} className={style.fieldWrapper}>
          <WagtailField
            ref={field.ref}
            {...field}
          />
        </div>
      )
    })
    return fieldElements
  }

  handleSubmit (event) {
    event.preventDefault()
    const fieldStrings = this.fields.map((field) => {
      let value = field.ref.current.value
      if (field.fieldType.toLowerCase() === 'checkbox') {
        value = field.ref.current.checked
      } else if (field.fieldType.toLowerCase() === 'checkboxes') {
        value = field.ref.current.checked
      }
      return `\n${field.cleanName}: ${value}`
    })
    alert(`Submitted\n${fieldStrings}`)
  }

  render () {
    const fields = this.getFieldElements()
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{this.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: this.intro }} />
        {fields}
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
