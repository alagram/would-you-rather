import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    displayAnswered: false
  }

  displayAnswered = () => {
    this.setState(() => ({
      displayAnswered:  true
    }))
  }

  displayUnanswered = () => {
    this.setState(() => ({
      displayAnswered: false
    }))
  }

  render() {
    const { displayAnswered } = this.state
    const { answered, unanswered } = this.props

    const list = displayAnswered === true
      ? answered
      : unanswered

    return (
      <div>
        <div className='dashboard-toggle'>
          <button
            style={{textDecoration: displayAnswered === false ? 'underline' : null}}
            onClick={this.displayUnanswered}>
            Unanswered
          </button>
          <span> | </span>
          <button
            style={{textDecoration: displayAnswered === true ? 'underline' : null}}
            onClick={this.displayAnswered}>
            Answered
          </button>
        </div>
        <ul>
          {list.map((question) => (
            <li key={question.id} className='option'>
              <Link to={`questions/${question.id}`}>
                <h4>Would You Rather</h4>
                  <p><strong>a.</strong> {question.optionOneText}</p>
                  <p><strong>b.</strong> {question.optionTwoText}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  const answers = users[authedUser].answers

  const answered = answers.map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp)

  const unanswered = Object.keys(questions)
    .filter((id) => !answers.includes(id))
    .map((id) => questions[id])
    .sort((a, b) => b.timestamp - a.timestamp)

  return {
    answered,
    unanswered,
  }
}

export default connect(mapStateToProps)(Dashboard)
