import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser }  from '../actions/authedUser'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class Login extends Component {
  state = {
    selectedValue: ''
  }

  handleValueChange = (e)  => {
    const selectedValue = e.value

    this.setState(() => ({
      selectedValue
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.dispatch(setAuthedUser(this.state.selectedValue))
  }

  render() {
    const { options } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Select
          style={{marginTop: 100}}
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          autoFocus
          name='selected-user'
          value={this.state.selectedValue}
          options={options}
          onChange={this.handleValueChange}
        />

        <button className='btn login-btn' type='submit'>
          Login
        </button>
      </form>

    )
  }
}

function mapStateToProps({ users }) {
  const options = Object.values(users).reduce((arr, user) => {
    const obj = {
      ['value']: `${user.id}`,
      ['label']: `${user.name}`,
    }

    arr.push(obj)

    return arr
  }, [])

  return {
    options
  }
}

export default connect(mapStateToProps)(Login)
