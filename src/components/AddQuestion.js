import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  }

  handleInputChange = (e) => {
    const { value, name } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.dispatch(handleAddQuestion(this.state))
  }

  render() {
    const { optionOneText, optionTwoText } = this.state
    return (
      <form className='add-form' onSubmit={this.handleSubmit}>
        <h1 style={{marginBottom: 25}}>Would You Rather</h1>

        <label className='label' htmlFor='optionOneText'>Option One</label>
        <input
          value={optionOneText}
          onChange={this.handleInputChange}
          name='optionOneText'
          className='input'
          id='optionOneText'
          type='text'
        />

        <label className='label' htmlFor='optionTwoText'>Option Two</label>
        <input
          value={optionTwoText}
          onChange={this.handleInputChange}
          name='optionTwoText'
          className='input'
          id='optionTwoText'
          type='text'
        />

        <button className='btn' type='submit' disabled={!(optionOneText && optionTwoText)}>
          Add Question
        </button>
      </form>
    )
  }
}

export default connect()(AddQuestion)
