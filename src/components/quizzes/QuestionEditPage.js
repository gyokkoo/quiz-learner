import React, { Component } from 'react'
import questionStore from '../../stores/QuestionStore'
import questionActions from '../../actions/QuestionActions'
// import Auth from '../users/Auth'
// import { Link } from 'react-router-dom'
import toastr from 'toastr'
// import Question from './Question'

class QuestionEditPage extends Component {
  constructor (props) {
    super(props)
    let quizId = this.props.match.params.id
    this.state = {
      id: quizId,
      question: {
        question: '',
        answers: [],
        correctAnswers: [],
        quizId: '',
        questionNumber: 0
      },
      correctAnswers: [],
      loading: true,
      error: ''
    }

    this.handleQuestionLoaded = this.handleQuestionLoaded.bind(this)
    questionStore.on(questionStore.eventTypes.QUESTION_LOADED, this.handleQuestionLoaded)

    this.handleQuestionEdited = this.handleQuestionEdited.bind(this)
    questionStore.on(questionStore.eventTypes.QUESTION_EDITED, this.handleQuestionEdited)

    this.handleQuestionDeleted = this.handleQuestionDeleted.bind(this)
    questionStore.on(questionStore.eventTypes.QUESTION_DELETED, this.handleQuestionDeleted)
  }

  componentDidMount () {
    questionActions.getQuestionById(this.state.id)
  }

  componentWillUnmount () {
    questionStore.removeListener(questionStore.eventTypes.QUESTION_LOADED, this.handleQuestionLoaded)
    questionStore.removeListener(questionStore.eventTypes.QUESTION_EDITED, this.handleQuestionEdited)
    questionStore.removeListener(questionStore.eventTypes.QUESTION_DELETED, this.handleQuestionDeleted)
  }

  handleUserChange (event) {
    const target = event.target
    const field = target.name
    const value = target.value

    const question = this.state.question
    question[field] = value

    this.setState({
      question
    })
  }

  handleAnswerChange (event) {
    let answers = this.state.question.answers.slice()
    const changes = this.state.question
    console.log(answers)
    console.log(this.state.question.correctAnswers)
    for (let i in answers) {
      if (i === event.target.name) {
        answers[i] = event.target.value
        changes.answers = answers
        this.setState({question: changes})
        break
      }
    }
  }

  handleQuestionEdited (data) {
    if (!data.success) {
      this.setState({
        error: data.message
      })
    } else {
      toastr.success(data.message)
      this.props.push(`/quiz-learner/quiz/edit/${this.state.question.quizId}`)
    }
  }

  handleQuestionDeleted (data) {
    if (!data.success) {
      this.setState({
        error: data.message
      })
    } else {
      toastr.success(data.message)
      this.props.push(`/quiz-learner/quiz/edit/${this.state.question.quizId}`)
    }
  }

  handleQuestionLoaded (data) {
    console.log(data)
    if (!data.success) {
      this.setState({
        error: data.message
      })
    }
    this.setState({
      loading: false,
      question: data.questionData,
      correctAnswers: data.questionData.correctAnswers
    })
    toastr.success('Question loaded!')
  }

  handleEditClicked (e) {
    e.preventDefault()
    const question = this.state.question
    question.correctAnswers = this.state.correctAnswers
    this.setState({
      question
    })
    questionActions.editQuestion(this.state.id, this.state.question)
  }

  handleDeleteClicked (e) {
    e.preventDefault()
    questionActions.deleteQuestion(this.state.id)
  }

  selectCorrectAnswers (e) {
    e.preventDefault()
    const { correctAnswers } = this.state
    let clickedAnswer = e.target.innerHTML
    console.log(clickedAnswer)
    console.log(correctAnswers)
    let indexOfClickedAnswer = correctAnswers.indexOf(clickedAnswer)
    if (clickedAnswer && indexOfClickedAnswer === -1) {
      const nextState = [...correctAnswers, clickedAnswer]
      this.setState({ correctAnswers: nextState })
    } else if (clickedAnswer && indexOfClickedAnswer !== -1) {
      correctAnswers.splice(indexOfClickedAnswer, 1)
      this.setState({ correctAnswers: correctAnswers })
    }
  }

  render () {
    const { question } = this.state
    if (this.state.loading) {
      return <div>Loading</div>
    }

    let answers = question.answers.map((answer, index) => (
      <div key={index}>
        <input
          className='form-control chat-input'
          type='text' name={index}
          value={answer}
          onChange={this.handleAnswerChange.bind(this)} />
      </div>
    ))

    let correctAnswers = question.answers.map((answer, index) => {
      let isCorrect = false
      this.state.correctAnswers.forEach(correctAnswer => {
        if (answer === correctAnswer) {
          isCorrect = true
        }
      })
      return (<div key={index} className={isCorrect ? 'text-success' : 'text-danger'}>
        <div
          className='well'
          onClick={this.selectCorrectAnswers.bind(this)} >{answer}
        </div>
      </div>)
    })

    return (
      <div className='container'>
        <div className='col-md-offset-4 col-md-3'>
          <form className='question-form'>
            <h2>Edit Question</h2>
            <label>
              <div>Question:</div>
              <input
                className='form-control chat-input'
                type='textarea' name='question' rows='10' cols='50' required
                value={question.question}
                onChange={this.handleUserChange.bind(this)} />
            </label>
            <br />
            <div className='group-btn text-center'>
              {answers}
              <hr />
              Correct Answers (Click to select) :
              {correctAnswers}
            </div>
            <div className='group-btn text-center'>
              <hr />
              <input
                className='btn btn-primary btn-md'
                value='Edit'
                type='submit'
                onClick={this.handleEditClicked.bind(this)} />
              <span>&nbsp;&nbsp;&nbsp;</span>
              <input
                className='btn btn-danger btn-md'
                value='Delete'
                type='submit'
                onClick={this.handleDeleteClicked.bind(this)} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default QuestionEditPage
