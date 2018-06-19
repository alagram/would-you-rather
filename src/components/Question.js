import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPercentage } from '../utils/helpers'
import { handleAddAnswer } from '../actions/answers'

class Question extends Component {
  handleAnswer = (answer) => {
    const { question, authedUser } = this.props
    this.answered = true


    this.props.dispatch(handleAddAnswer({
      authedUser,
      answer,
      qid: question.id,
    }))
  }

  render() {
    if (this.props.question === null) {
        return <p>Something went wrong. This question does not exist.</p>
    }

    const { question, vote, authorAvatar } = this.props

    const totalVotes = ['optionOne', 'optionTwo']
      .reduce((total, option) => total + question[`${option}Votes`].length, 0)

    return (
      <div className='question-container'>
        <h1 className='question'>Would You Rather</h1>
        <div className='question-author'>
          <img src={authorAvatar} alt="Author's avatar" />
        </div>

        <ul>
          {
            ['optionOne', 'optionTwo'].map((option) => {
              const voteCount = question[`${option}Votes`].length

              return (
                <li
                  onClick={() => {
                    if (vote === null && !this.answered) {
                      this.handleAnswer(option)
                    }
                  }}
                  key={option}
                  className={`option ${vote === option ? 'chosen' : ''}`}>
                  {vote === null
                    ? question[`${option}Text`]
                    : <div className='result'>
                        <span>{question[`${option}Text`]}</span>
                        <span>{getPercentage(voteCount, totalVotes)}% ({voteCount})</span>
                      </div>}
                </li>
              )
            })
          }
        </ul>
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

  const vote = ['optionOne', 'optionTwo'].reduce((vote, option) => {
    if (vote !== null) {
      return vote
    }

    return question[`${option}Votes`].includes(authedUser)
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
