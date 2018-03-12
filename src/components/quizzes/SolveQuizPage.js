import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import UnderDevelopment from '../UnderDevelopment'
// import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'

class SolveQuizPage extends Component {
  constructor (props) {
    super(props)
    let quizId = this.props.match.params.id
    this.state = {
      id: quizId,
      questions: [],
      currentIndex: 0
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
    toastr.success('Questions loaded!')
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <h3>The Quiz with id {this.state.id} can be solved in this page!!</h3>
        <div>Coming soon!</div>
        <UnderDevelopment />
      </div>
    )
  }
}

export default SolveQuizPage
