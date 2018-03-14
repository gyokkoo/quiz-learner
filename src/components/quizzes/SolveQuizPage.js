import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
// import FormHelpers from '../common/forms/FormHelpers'
import toastr from 'toastr'

const initialState = {
  questions: [{
    question: '',
    answers: [],
    correctAnswers: [],
    number: 0
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

  handleAnswerClicked (e) {
    const { questions, questionIndex, selectedAnswers } = this.state
    let clickedAnswer = e.target.innerHTML
    if (questions[questionIndex]) {
      let indexOfClickedAnswer = selectedAnswers.indexOf(clickedAnswer)
      if (clickedAnswer && indexOfClickedAnswer === -1) {
        const nextState = [...selectedAnswers, clickedAnswer]
        this.setState({ selectedAnswers: nextState })
      } else if (clickedAnswer && indexOfClickedAnswer !== -1) {
        selectedAnswers.splice(indexOfClickedAnswer, 1)
        this.setState({ selectedAnswers: selectedAnswers })
      }
    }
  }

  render () {
    const { questions, questionIndex, selectedAnswers } = this.state
    let result = ''
    if (questions.length > 0) {
      if (questions[questionIndex].question) {
        result =
          <div>
            <h3>{questions[questionIndex].question}</h3>
            <ListAnswers selected={selectedAnswers} answers={questions[questionIndex].answers} onClicked={this.handleAnswerClicked.bind(this)} />
          </div>
      }
    } else if (questions.length === questionIndex) {
      result = 'The test is done!'
    } else {
      result = 'Loading the test...'
    }
    return (
      <div>
        <div>
          {result}
        </div>
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
