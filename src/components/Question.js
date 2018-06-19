import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    return (
      <div className='question-container'>
        {JSON.stringify(this.props)}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, { match }) {
  const { id } = match.params
  const question = questions[id]

  if (!question) {
    return {
      question: null
    }
  }

  const vote = ['optionOneVotes', 'optionTwoVotes'].reduce((vote, option) => {
    if (vote !== null) {
      return vote
    }

    return question[option].includes(authedUser)
      ? option
      : vote
  }, null)

  return {
    question,
    vote,
    authedUser,
    authorAvatar: users[question.author].avatarURL,
  }
}

export default connect(mapStateToProps)(Question)
