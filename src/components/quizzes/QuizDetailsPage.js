import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
// import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'

class QuizDetailsPage extends Component {
  constructor (props) {
    super(props)
    let quizId = this.props.match.params.id
    this.state = {
      id: quizId,
      quiz: {
      }
    }

    this.handleQuestionsFetching = this.handleQuestionsFetching.bind(this)
    quizStore.on(quizStore.eventTypes.QUESTIONS_FETCHED, this.handleQuestionsFetching)
  }

  componentDidMount () {
    quizActions.getQuestions(this.state.id)
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.QUESTIONS_FETCHED, this.handleQuestionsFetching)
  }

  handleQuestionsFetching (data) {
    console.log(data)
    // TODO: Validate!

    this.setState({
      questions: data.questions
    })
    toastr.success('Question loaded!')
  }

  render () {
    if (this.state.questions.length > 0) {
      console.log(this.state.questions)
    }
    return (
      <div>
        <h4>Quiz details:</h4>
      </div>
    )
  }
}

export default QuizDetailsPage
