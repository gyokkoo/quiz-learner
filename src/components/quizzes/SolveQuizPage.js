import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
// import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'

const initialState = {
  questions: [{
    question: '',
    answers: [],
    correctAnswers: []
  }],
  selectedAnswers: [],
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

  render () {
    const { questions, questionIndex } = this.state

    return (
      <div>
        <div>
          <Question
            question={questions[questionIndex].question}
            answers={questions[questionIndex].answers}
            correctAnswers={questions[questionIndex].correctAnswers} />
          <input type='button' className='btn btn-primary btn-md' value='Previous question' />
          <input type='button' className='btn btn-primary btn-md' value='Next question' />
          <br />
          <input type='button' className='btn btn-success btn-md' value='Finish' />
        </div>
      </div>
    )
  }
}

class Question extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedAnswers: []
    }
  }

  handleAnswerClicked (e) {
    const { selectedAnswers } = this.state
    let clickedAnswer = e.target.innerHTML
    let indexOfClickedAnswer = selectedAnswers.indexOf(clickedAnswer)
    if (clickedAnswer && indexOfClickedAnswer === -1) {
      const nextState = [...selectedAnswers, clickedAnswer]
      this.setState({ selectedAnswers: nextState })
    } else if (clickedAnswer && indexOfClickedAnswer !== -1) {
      selectedAnswers.splice(indexOfClickedAnswer, 1)
      this.setState({ selectedAnswers: selectedAnswers })
    }
  }

  render () {
    const {question, answers} = this.props

    return (
      <div>
        <h3>{question}</h3>
        <ListAnswers
          answers={answers}
          selected={this.state.selectedAnswers}
          onClicked={this.handleAnswerClicked.bind(this)} />
      </div>
    )
  }
}

const Answer = ({ isSelected, value, onClick }) => (
  <li onClick={onClick} className='list-group-item list-group-item'
    style={{ backgroundColor: isSelected ? 'lightblue' : 'white' }}>
    {value}
  </li>
)

const ListAnswers = ({ selected, answers, onClicked }) => (
  <ul>
    {
      answers.map((answer, i) => {
        let isSelected = selected.indexOf(answer) > -1
        return <Answer isSelected={isSelected} number={i + 1} key={i} value={answer} onClick={onClicked} />
      })
    }
  </ul>
)

export default SolveQuizPage
