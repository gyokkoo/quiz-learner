import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
// import Auth from '../users/Auth'
// import { Link } from 'react-router-dom'
import toastr from 'toastr'

class QuizEditPage extends Component {
  constructor (props) {
    super(props)
    let quizId = this.props.match.params.id
    this.state = {
      id: quizId,
      creator: '',
      quiz: {
        name: '',
        description: '',
        questions: []
      },
      questions: [{
        question: '',
        answers: [],
        correctAnswers: []
      }],
      loading: true
    }

    this.handleQuizFetching = this.handleQuizFetching.bind(this)
    quizStore.on(quizStore.eventTypes.QUIZ_FETCHED, this.handleQuizFetching)
  }

  componentDidMount () {
    quizActions.getQuizById(this.state.id)
  }

  componentWillUnmount () {
    quizStore.removeListener(quizStore.eventTypes.QUIZ_FETCHED, this.handleQuizFetching)
  }

  handleQuizFetching (data) {
    console.log(data)

    // TODO: Validate the input data!

    this.setState({
      loading: false,
      creator: data.creator,
      quiz: data.quiz,
      questions: data.allQuestions
    })
    toastr.success('Quiz loaded!')
  }

  render () {
    // const { creator, quiz } = this.state
    if (this.state.loading) {
      return null
    }

    console.log(this.state)
    return (
      <div>Hello from edit Page!</div>
    )
  }
}

export default QuizEditPage
