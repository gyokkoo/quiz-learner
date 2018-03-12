import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'

// TODO : Refactor code below
const Answers = ({ number, value, onClick }) => (
  <li onClick={onClick} className='list-group-item list-group-item-warning'>{value}</li>
)

const AnswersCorrect = ({ number, value, onClick }) => (
  <li onClick={onClick} className='list-group-item list-group-item-success'>{value}</li>
)

const List = ({ items, onItemClick }) => (
  <ul>
    {
      items.map((item, i) => <Answers number={i + 1} key={i} value={item} onClick={onItemClick} />)
    }
  </ul>
)

const ListCorrect = ({ items, onItemClick }) => (
  <ul>
    {
      items.map((item, i) => <AnswersCorrect number={i + 1} key={i} value={item} onClick={onItemClick} />)
    }
  </ul>
)

const initialState = {
  quizId: '',
  question: '',
  inputValue: '',
  answers: [],
  correctAnswers: [],
  questionNumber: 1,
  error: ''
}

class AddQuestionsPage extends Component {
  constructor (props) {
    super(props)
    let id = this.props.match.params.id
    initialState.quizId = id

    this.state = initialState

    this.handleQuestionCreation = this.handleQuestionCreation.bind(this)
    quizStore.on(quizStore.eventTypes.QUESTION_ADDED, this.handleQuestionCreation)
  }

  componentDidMount () {
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.QUESTION_ADDED, this.handleQuestionCreation)
  }

  handleQuestionChange (event) {
    event.preventDefault()
    const value = event.target.value
    this.setState({ question: value })
  }

  onClick (e) {
    e.preventDefault()
    const { inputValue, answers } = this.state
    if (inputValue) {
      const nextState = [...answers, inputValue]
      this.setState({ answers: nextState, inputValue: '' })
    }
  }

  onChange (e) { this.setState({ inputValue: e.target.value }) }

  handleItemClick (e) {
    let clickedAnswer = e.target.innerHTML
    const { correctAnswers } = this.state
    if (clickedAnswer && correctAnswers.indexOf(clickedAnswer) === -1) {
      const nextState = [...correctAnswers, clickedAnswer]
      this.setState({ correctAnswers: nextState })
    }
    console.log(this.state.correctAnswers)
  }

  handleCorrectAnswerClick (e) {
    let correctAnswers = this.state.correctAnswers
    let index = correctAnswers.indexOf(e.target.value)
    correctAnswers.splice(index, 1)
    this.setState({ correctAnswers })
  }

  handleQuestionCreation (data) {
    console.log(data)
    if (!data.success) {
      this.setState({
        error: FormHelpers.getFirstError(data)
      })
    } else {
      toastr.success(data.message)
      initialState.questionNumber += 1
      this.setState(initialState)
    }
  }

  handleQuestionAddition (event) {
    event.preventDefault()

    // TODO: validate!
    let question = {
      quizId: this.state.quizId,
      questionName: this.state.question,
      questionNumber: this.state.questionNumber,
      answers: this.state.answers,
      correctAnswers: this.state.correctAnswers
    }
    quizActions.addQuestion(question)
  }

  handleQuizFinish (event) {
    event.preventDefault()
    toastr.success('You finished the quiz creation!')
    this.props.history.push(`/quiz-learner/quiz/all`)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-offset-4 col-md-3'>
            <form className='question-form'>
              <h2>Question {this.state.questionNumber}:</h2>
              <label>
                <input
                  className='form-control input-sm chat-input'
                  type='text' value={this.state.question} name='question' size='50' required
                  onChange={this.handleQuestionChange.bind(this)} />
              </label>
              <br />
              <div>
                Answer:
                <input type='text' value={this.state.inputValue} onChange={this.onChange.bind(this)} />
                <button className='btn btn-primary btn-md' onClick={this.onClick.bind(this)}>Add</button>
                <List items={this.state.answers} onItemClick={this.handleItemClick.bind(this)} />
              </div>
              <div>
                Correct Answers (Click on the answer to select):
                <ListCorrect items={this.state.correctAnswers} onItemClick={this.handleCorrectAnswerClick.bind(this)} />
              </div>
              <hr />
              <div className='group-btn text-center'>
                <input
                  className='btn btn-primary btn-md'
                  value='Submit Question with Answers'
                  type='submit'
                  onClick={this.handleQuestionAddition.bind(this)} />
              </div>
              <hr />
              <span className='group-btn'>
                <input
                  className='btn btn-danger btn-md'
                  value='Finish Quiz!'
                  type='submit'
                  onClick={this.handleQuizFinish.bind(this)} />
              </span>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddQuestionsPage
