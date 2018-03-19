import React, { Component } from 'react'
import questionStore from '../../stores/QuestionStore'
import questionActions from '../../actions/QuestionActions'
import quizActions from '../../actions/QuizActions'
import Question from './Question'
import toastr from 'toastr'
import Auth from '../users/Auth'
import quizCache from '../../data/helpers/QuizCache'

const initialState = {
  questions: [{
    question: '',
    answers: [],
    correctAnswers: []
  }],
  questionIndex: 0,
  loading: true,
  error: ''
}

class SolveQuizPage extends Component {
  constructor (props) {
    super(props)

    let quizId = this.props.match.params.id
    initialState.id = quizId

    this.state = initialState

    this.handleQuestionsLoaded = this.handleQuestionsLoaded.bind(this)
    questionStore.on(questionStore.eventTypes.QUESTIONS_LOADED, this.handleQuestionsLoaded)
  }

  componentDidMount () {
    questionActions.getAllQuestions(this.state.id)
    quizCache.clear()
  }

  componentWillUnmount () {
    questionStore.removeListener(questionStore.eventTypes.QUESTIONS_LOADED, this.handleQuestionsLoaded)
  }

  handleQuestionsLoaded (data) {
    console.log(data)
    // TODO: Validate!

    data.questions.selectedAnswers = []
    this.setState({
      questions: data.questions,
      loading: false
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
    quizCache.addAnswers(this.state.questions[index]._id, filteredAnswers, index)
  }

  handleFinishClicked (e) {
    let allAnswers = quizCache.getAnswers()
    quizCache.clear()

    let questionIds = []
    let userAnswers = []
    for (let i in allAnswers) {
      let currentJson = JSON.parse(allAnswers[i])
      questionIds.push(currentJson.id)
      userAnswers.push(currentJson.answers)
    }
    let solvedQuizData = {
      quizId: this.state.id,
      userId: Auth.getUser().id,
      questions: questionIds,
      answers: userAnswers
    }

    quizActions.addSolvedQuiz(solvedQuizData)
    toastr.success('Quiz Finished!')
    this.props.history.push(`/quiz-learner/quiz/result/solved/undefined`)
  }

  render () {
    if (this.state.loading) {
      return <div className='text-info'>Loading...</div>
    }
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
        <div className='container'>
          <Question
            question={questions[questionIndex].question}
            answers={questions[questionIndex].answers}
            correctAnswers={questions[questionIndex].correctAnswers}
            addAnswers={this.addSelectedAnswers.bind(this)}
            allowClicking='true' />
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
