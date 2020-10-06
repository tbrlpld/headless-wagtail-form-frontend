import React from 'react'

export default class EssayForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'Write an essay about your favorite DOM element.'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    alert('An essay was submitted: ' + this.state.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='essay'>
          Essay:
          <textarea type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
