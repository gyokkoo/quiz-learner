import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import Auth from '../users/Auth'
import { Link } from 'react-router-dom'
import toastr from 'toastr'

class QuizDetailsPage extends Component {
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
      loading: true
    }

    this.handleQuizLoaded = this.handleQuizLoaded.bind(this)
    quizStore.on(quizStore.eventTypes.QUIZ_LOADED, this.handleQuizLoaded)
  }

  componentDidMount () {
    quizActions.getQuizById(this.state.id)
  }

  componentWillUnmount () {
    quizStore.removeListener(quizStore.eventTypes.QUIZ_LOADED, this.handleQuizLoaded)
  }

  handleQuizLoaded (data) {
    console.log(data)

    // TODO: Validate the input data!

    this.setState({
      loading: false,
      creator: data.creator,
      quiz: data.quiz
    })
    toastr.success('Quiz loaded!')
  }

  render () {
    const { creator, quiz } = this.state
    if (this.state.loading) {
      return null
    } else {
      console.log(this.state)
    }

    let editButton = ''
    console.log()
    if (this.state.creator === Auth.getUser().name || Auth.getUser().name === 'admin') {
      editButton =
        <Link to={`/quiz-learner/quiz/edit/${this.state.id}`}>
          <input type='button' className='btn btn-danger btn-md' value='Edit quiz!' />
        </Link>
    }

    let questionsCount = quiz.questions.length
    return (
      <div className='well container'>
        <div className='row'>
          <div className='text-center'>
            <h2>{quiz.name}</h2>
            <p>{quiz.description}</p>
            <div>
              Questions Count: {questionsCount}
            </div>
            <div>
              Added by: <em>{creator}</em>
            </div>
          </div>
        </div>
        <hr />
        <div className='group-btn'>
          {
            Auth.isUserAuthenticated()
            ? (<Link to={`/quiz-learner/quiz/details/solve/${this.state.id}`}>
              <input type='button' className='btn btn-primary btn-md' value='Start quiz!' />
            </Link>)
            : (<Link to={`/quiz-learner/users/login`}>
              <input type='button' className='btn btn-info btn-md' value='Login to start!' />
            </Link>)
          }
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Link to='/quiz-learner/quiz/all'>
            <input type='button' className='btn btn-warning btn-md' value='All Quizzes!' />
          </Link>
          <hr />
          {editButton}
        </div>
      </div>
    )
  }
}

export default QuizDetailsPage
