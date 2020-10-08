import React from 'react'

export default class MultiInputForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const target = event.target
    const value = (target.type === 'checkbox' ? target.checked : target.value)
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    alert(
      'Somebody is ' + (this.state.isGoing ? '' : 'not ') + 'going to the event! ' +
      '\nAnd they are bringing ' + this.state.numberOfGuests + ' guests.'
    )
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='isGoing'>
          Are you attending:
          <input name='isGoing' type='checkbox' value={this.state.isGoing} onChange={this.handleChange} />
        </label>
        <label htmlFor='numberOfGuests'>
          Number of guests:
          <input name='numberOfGuests' type='number' value={this.state.numberOfGuests} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
