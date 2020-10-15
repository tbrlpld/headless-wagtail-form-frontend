import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    this.title = props.title
    this.intro = props.intro
    this.thankYouText = props.thankYouText
    this.fields = props.fields

    this.getFields = this.getFields.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getFields () {
    const fieldElements = this.fields.map(item => <div key={item.id}>{item.cleanName}</div>)
    return fieldElements
  }

  handleSubmit () {
    alert('Submitted')
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
