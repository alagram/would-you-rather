import React, { Component } from 'react'

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    console.log('Todo', this.state)
  }

  render() {
    const { optionOne, optionTwo } = this.state
    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h1 style={{marginBottom: 25}}>Would You Rather</h1>

        <label className='label' htmlFor='optionOne'>Option One</label>
        <input
          value={optionOne}
          onChange={this.handleInputChange}
          name='optionOne'
          className='input'
          id='optionOne'
          type='text'
        />

        <label className='label' htmlFor='optionTwo'>Option Two</label>
        <input
          value={optionTwo}
          onChange={this.handleInputChange}
          name='optionTwo'
          className='input'
          id='optionTwo'
          type='text'
        />

        <button className='btn' type='submit' disabled={!(optionOne && optionTwo)}>
          Add Question
        </button>
      </form>
    )
  }
}

export default AddQuestion
