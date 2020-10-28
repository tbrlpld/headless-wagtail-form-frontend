import React from 'react'
import slugify from 'slugify'

import WagtailField from './field'

import style from './form.module.css'

export default class Form extends React.Component {
  constructor (props) {
    super(props)

    this.title = props.title
    this.intro = props.intro
    this.thankYouText = props.thankYouText

    this.multiDefaultFields = ['checkboxes', 'multiselect']
    this.fields = props.fields
    this.fields.forEach((field) => {
      field.ref = React.createRef()
      field.fieldType = field.fieldType.toLowerCase()
      field.choices = field.choices.split(',')
      field.choices = field.choices.filter(choice => choice !== '')
      field.choices = field.choices.map(choice => {
        const name = choice.trim()
        return {
          name: name,
          slug: slugify(field.cleanName.toLowerCase() + '-' + name.toLowerCase()),
          ref: React.createRef()
        }
      })
      if (this.multiDefaultFields.includes(field.fieldType)) {
        field.defaultValue = field.defaultValue.split(',')
        field.defaultValue = field.defaultValue.map(defaultValue => defaultValue.trim())
        field.defaultValue = field.defaultValue.filter(defaultValue => defaultValue !== '')
      }
      console.log(field.defaultValue)
    })

    this.getFieldElements = this.getFieldElements.bind(this)
    this.getPayload = this.getPayload.bind(this)
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

  getPayload () {
    const payload = {}
    this.fields.forEach((field) => {
      let value = null
      if (field.fieldType === 'checkbox') {
        value = field.ref.current.checked
      } else if (field.fieldType === 'checkboxes') {
        value = []
        field.choices.forEach(choice => {
          if (choice.ref.current.checked) {
            value.push(choice.name)
          }
        })
      } else if (field.fieldType === 'radio') {
        field.choices.forEach(choice => {
          if (choice.ref.current.checked) {
            value = choice.name
          }
        })
      } else if (field.fieldType === 'multiselect') {
        value = []
        field.choices.forEach(choice => {
          if (choice.ref.current.selected) {
            value.push(choice.name)
          }
        })
      } else if (field.fieldType === 'date' || field.fieldType === 'datetime') {
        console.log(field)
        value = field.ref.current.props.selected
      } else {
        value = field.ref.current.value
      }
      payload[field.cleanName] = value
    })
    return payload
  }

  handleSubmit (event) {
    event.preventDefault()
    const payload = this.getPayload()
    alert('Submitted\n\n' + JSON.stringify(payload, null, 4))
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
