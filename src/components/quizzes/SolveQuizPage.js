import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import Question from './common/Question'
// import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'
import quizCache from '../../data/helpers/QuizCache'

const initialState = {
  questions: [{
    question: '',
    answers: [],
    correctAnswers: []
  }],
  questionIndex: 0,
  error: ''
}

class SolveQuizPage extends Component {
  constructor (props) {
    super(props)

    let quizId = this.props.match.params.id
    initialState.id = quizId

    this.state = initialState

    this.handleQuestionsFetching = this.handleQuestionsFetching.bind(this)
    quizStore.on(quizStore.eventTypes.QUESTIONS_FETCHED, this.handleQuestionsFetching)
  }

  componentDidMount () {
    quizActions.getAllQuestions(this.state.id)
    quizCache.clear()
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.QUESTIONS_FETCHED, this.handleQuestionsFetching)
  }

  handleQuestionsFetching (data) {
    console.log(data)
    // TODO: Validate!

    data.questions.selectedAnswers = []
    this.setState({
      questions: data.questions
    })
    toastr.success('Questions loaded!')
    console.log(this.state)
  }

  handlePreviousClicked (e) {
    const currentQuestion = this.state.questionIndex
    this.setState({
      questionIndex: currentQuestion - 1
    })
  }

  handleNextClicked (e) {
    const currentQuestion = this.state.questionIndex
    this.setState({
      questionIndex: currentQuestion + 1
    })
  }

  addSelectedAnswers (selectedAnswers) {
    let index = this.state.questionIndex
    let filteredAnswers = selectedAnswers
      .filter(answer => this.state.questions[index].answers.indexOf(answer) !== -1)
    quizCache.addAnswers(this.state.questions[index]._id, filteredAnswers)
  }

  handleFinishClicked (e) {
    console.log(quizCache.getAnswers())
    quizCache.clear()
  }

  render () {
    const { questions, questionIndex } = this.state

    if (questions[questionIndex] === undefined) {
      return <div>No questions to show</div>
    }

    let buttons = ''
    if (questionIndex === 0) {
      buttons =
        <input type='button' className='btn btn-primary btn-md'
          onClick={this.handleNextClicked.bind(this)} value='Next question' />
    } else if (questionIndex === questions.length - 1) {
      buttons =
        <input type='button' className='btn btn-primary btn-md'
          onClick={this.handlePreviousClicked.bind(this)} value='Previous question' />
    } else {
      buttons =
        <div>
          <input type='button' className='btn btn-primary btn-md'
            onClick={this.handlePreviousClicked.bind(this)} value='Previous question' />
          <input type='button' className='btn btn-primary btn-md'
            onClick={this.handleNextClicked.bind(this)} value='Next question' />
        </div>
    }
    return (
      <div>
        <div>
          <Question
            question={questions[questionIndex].question}
            answers={questions[questionIndex].answers}
            correctAnswers={questions[questionIndex].correctAnswers}
            addAnswers={this.addSelectedAnswers.bind(this)} />
          <div>
            {buttons}
          </div>
          <br />
          <input type='button' className='btn btn-success btn-md'
            onClick={this.handleFinishClicked.bind(this)} value='Finish' />
        </div>
      </div>
    )
  }
}

export default SolveQuizPage
