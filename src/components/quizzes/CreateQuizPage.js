import React, { Component } from 'react'
// import QuizForm from './QuizForm'
import FormHelpers from '../common/forms/FormHelpers'
import Auth from '../users/Auth'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import toastr from 'toastr'

class CreateQuizPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quiz: {
        title: '',
        description: '',
        userId: Auth.getUser().id
      },
      quizCreated: false,
      error: ''
    }

    this.handleQuizCreation = this.handleQuizCreation.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleQuizForm = this.handleQuizForm.bind(this)
    quizStore.on(quizStore.eventTypes.QUIZ_ADDED, this.handleQuizCreation)
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.QUIZ_ADDED, this.handleQuizCreation)
  }

  handleFormChange (event) {
    const formChangeFunction = FormHelpers.handleFormChange.bind(this)
    formChangeFunction(event, 'quiz')
  }

  handleQuizForm (event) {
    event.preventDefault()

    // TODO: validate form data

    quizActions.create(this.state.quiz)
  }

  handleQuizCreation (data) {
    console.log(data)
    if (!data.success) {
      this.setState({
        error: FormHelpers.getFirstError(data)
      })
    } else {
      toastr.success(data.message)
      this.props.history.push(`/quiz-learner/quiz/add/${data.quiz._id}`)
    }
  }

  render () {
    return (
      <div>
        <div className='col-md-offset-4 col-md-3'>
          <div>{this.state.error}</div>
          <form className='quiz-form'>
            <h2>Create Quiz</h2>
            <label>
              <div>Title:</div>
              <input
                className='form-control input-sm chat-input'
                type='text' name='title' size='50' required
                onChange={this.handleFormChange} />
            </label>
            <br />
            <label>
              <div>Description:</div>
              <textarea
                className='form-control input-sm chat-input'
                name='description' rows='10' cols='50'
                onChange={this.handleFormChange} />
            </label>
            <br />
            <span className='group-btn'>
              <input
                className='btn btn-primary btn-md'
                value='Create Quiz'
                type='submit'
                onClick={this.handleQuizForm} />
            </span>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateQuizPage
