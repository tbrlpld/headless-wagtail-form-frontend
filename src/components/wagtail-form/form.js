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

    this.fields = this.initializeFields(props.fields)

    this.getFieldElements = this.getFieldElements.bind(this)
    this.getPayload = this.getPayload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  initializeFields (wagtailFields) {
    const fields = []
    for (const wagtailField of wagtailFields) {
      const field = {}
      field.label = wagtailField.label
      field.cleanName = wagtailField.cleanName
      field.helpText = wagtailField.helpText
      field.required = wagtailField.required

      field.fieldType = wagtailField.fieldType.toLowerCase()

      const choicesRaw = wagtailField.choices.split(',')
      const choicesNonEmpty = choicesRaw.filter(choice => choice.trim() !== '')
      field.choices = choicesNonEmpty.map(choice => {
        const name = choice.trim()
        return {
          name: name,
          slug: slugify(field.cleanName.toLowerCase() + '-' + name.toLowerCase()),
          ref: React.createRef()
        }
      })

      const multiDefaultFields = ['checkboxes', 'multiselect']
      if (multiDefaultFields.includes(field.fieldType)) {
        const defaultValuesRaw = wagtailField.defaultValue.split(',')
        const defaultValuesCleaned = defaultValuesRaw.map(defaultValue => defaultValue.trim())
        field.defaultValue = defaultValuesCleaned.filter(defaultValue => defaultValue !== '')
      } else {
        field.defaultValue = wagtailField.defaultValue
      }

      field.ref = React.createRef()

      fields.push(field)
    }
    return fields
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
        const date = field.ref.current.props.selected
        if (date) {
          const year = date.getFullYear().toString()
          const month = (date.getMonth() + 1).toString().padStart(2, 0) // +1 because getMonth returns month 0-11 🤦‍♂️
          const day = date.getDate().toString().padStart(2, 0)
          value = `${year}-${month}-${day}`
          if (field.fieldType === 'datetime') {
            const hour = date.getHours().toString().padStart(2, 0)
            const minute = date.getMinutes().toString().padStart(2, 0)
            value = `${value} ${hour}:${minute}`
          }
        }
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
