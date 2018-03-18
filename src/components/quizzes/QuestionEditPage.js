import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
// import Auth from '../users/Auth'
// import { Link } from 'react-router-dom'
import toastr from 'toastr'
import Question from './Question'

class QuizEditPage extends Component {
  constructor (props) {
    super(props)
    let quizId = this.props.match.params.id
    this.state = {
      id: quizId,
      creator: '',
      question: {
        question: '',
        answers: [],
        correctAnswers: []
      },
      loading: true
    }

    this.handleQuestionFetching = this.handleQuestionFetching.bind(this)
    quizStore.on(quizStore.eventTypes.QUIZ_FETCHED, this.handleQuestionFetching)
  }

  componentDidMount () {
    quizActions.getQuestionById(this.state.id)
  }

  componentWillUnmount () {
    quizStore.removeListener(quizStore.eventTypes.QUESTION_FETCHED, this.handleQuestionFetching)
  }

  handleQuestionFetching (data) {
    console.log(data)

    // TODO: Validate the input data!

    this.setState({
      loading: false,
      creator: data.creator,
      questions: data.allQuestions
    })
    toastr.success('Question loaded!')
  }

  handleSaveClicked () {
    window.alert('save question!')
  }

  render () {
    const { question } = this.state
    if (this.state.loading) {
      return <div>Loading</div>
    }
    console.log(this.state)
    return (
      <div className='container'>
        <Question
          question={question.question}
          answers={question.answers}
          correct={question.correctAnswers}
          allowClicking={false} />
        <input type='button' className='btn btn-primary btn-md'
          onClick={this.handleSaveClicked.bind(this)} value='Save Changes' />
      </div>
    )
  }
}

export default QuizEditPage
