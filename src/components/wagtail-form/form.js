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

    this.fields = props.fields
    this.fields.forEach((field) => {
      field.ref = React.createRef()
      field.choices = field.choices.split(',')
      field.choices = field.choices.filter(choice => choice !== '')
      field.choices = field.choices.map(choice => {
        return {
          name: choice,
          slug: slugify(field.cleanName.toLowerCase() + '-' + choice.toLowerCase()),
          ref: React.createRef()
        }
      })
      console.log(field.choices)
      if (field.fieldType === 'checkboxes') {
        field.defaultValue = field.defaultValue.split(',').map(defaultValue => defaultValue.trim())
      }
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
      if (field.fieldType.toLowerCase() === 'checkbox') {
        value = field.ref.current.checked
      } else if (field.fieldType.toLowerCase() === 'checkboxes') {
        value = []
        field.choices.forEach(choice => {
          if (choice.ref.current.checked) {
            value.push(choice.name)
          }
        })
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
