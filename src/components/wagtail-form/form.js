import React from 'react'

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

    this.getFields = this.getFields.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFields () {
    const fieldElements = this.fields.map(field => {
      return (
        <input
          key={field.id}
          defaultValue={field.defaultValue}
          name={field.cleanName}
          ref={field.ref}
        />
      )
    })
    return fieldElements
  }

  handleSubmit (event) {
    event.preventDefault()
    const fieldStrings = this.fields.map((field) => {
      return `\n${field.cleanName}: ${field.ref.current.value}`
    })
    alert(`Submitted\n${fieldStrings}`)
  }

  render () {
    const fields = this.getFields()
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
