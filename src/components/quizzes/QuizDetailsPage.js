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

    this.handleQuizFetching = this.handleQuizFetching.bind(this)
    quizStore.on(quizStore.eventTypes.QUIZ_FETCHED, this.handleQuizFetching)
  }

  componentDidMount () {
    quizActions.getQuizById(this.state.id)
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.QUIZ_FETCHED, this.handleQuizFetching)
  }

  handleQuizFetching (data) {
    console.log(data)
    // TODO: Validate!

    this.setState({
      quiz: data.quiz
    })
    toastr.success('Quiz loaded!')
  }

  render () {
    return (
      <div>
        <h4>Quiz details:</h4>
      </div>
    )
  }
}

export default QuizDetailsPage
