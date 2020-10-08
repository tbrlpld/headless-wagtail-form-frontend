import React from 'react'

export default class FlavorForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'coconut'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    alert('A flavor was submitted: ' + this.state.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='essay'>
          Flavor:
          <select defaultValue={this.state.value} onBlur={this.handleChange}>
            <option value='coconut'>Coconut</option>
            <option value='grapefruit'>Grapefruit</option>
            <option value='mango'>Mango</option>
            <option value='lime'>Lime</option>
          </select>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
