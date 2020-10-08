import React from 'react'

import style from './uncontrolled-name-form.modules.css'

export default class UncontrolledNameForm extends React.Component {
  constructor (props) {
    super(props)
    this.input = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    alert('A name was submitted: ' + this.input.current.value)
  }

  validateInput (event) {
    const target = event.target
    const value = this.input.current.value
    if (value.includes('Doe')) {
      target.classList.add(style.valid)
      target.classList.remove(style.invalid)
    } else {
      target.classList.remove(style.valid)
      target.classList.add(style.invalid)
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'>
          Name (include Doe):
          <input type='text' value='' ref={this.input} onChange={this.validateInput} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
