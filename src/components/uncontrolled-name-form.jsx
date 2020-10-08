import React from 'react'

export default class UncontrolledNameForm extends React.Component {
  constructor (props) {
    super(props)
    this.input = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    alert('A name was submitted: ' + this.input.current.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'>
          Name:
          <input type='text' ref={this.input} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
