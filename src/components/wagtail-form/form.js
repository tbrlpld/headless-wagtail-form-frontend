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
        <WagtailField
          key={field.id}
          ref={field.ref}
          {...field}
        />
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
      }
      return `\n${field.cleanName}: ${value}`
    })
    alert(`Submitted\n${fieldStrings}`)
  }

  render () {
    const fields = this.getFieldElements()
    return (
      <form onSubmit={this.handleSubmit} className={style.form}>
        <h3>{this.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: this.intro }} />
        {fields}
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
