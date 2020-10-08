import React from 'react'

export default class MultiFlavorForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      values: ['coconut']
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    // event.preventDefault()
    const clickedValue = event.target.value
    const selectedValues = this.state.values
    const valueIndex = selectedValues.indexOf(clickedValue)
    if (valueIndex === -1) {
      // Value not in array, add it
      selectedValues.push(clickedValue)
    } else {
      // Value already in array, remove it.
      selectedValues.splice(valueIndex, 1)
    }
    this.setState({ value: selectedValues })
  }

  handleSubmit (event) {
    event.preventDefault()
    alert('A flavors were submitted: ' + this.state.values)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='essay'>
          Flavor:
          <select value={this.state.values} onChange={this.handleChange} multiple>
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
