import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import { Link } from 'react-router-dom'
import toastr from 'toastr'

class QuizResultsPage extends Component {
  constructor (props) {
    super(props)
    let solvedQuizId = this.props.match.params.id
    this.state = {
      id: solvedQuizId,
      quiz: {
        answers: [],
        dateSolved: '',
        questionds: [],
        quizId: '',
        solvedBy: ''
      },
      scoreResult: {
        correctCount: 0,
        score: 0,
        wrongAnswers: {},
        correctAnswers: {}
      },
      show: false,
      loading: true,
      error: ''
    }

    this.handleSolvedQuizFetching = this.handleSolvedQuizFetching.bind(this)
    quizStore.on(quizStore.eventTypes.SOLVED_QUIZ_ADDED, this.handleSolvedQuizFetching)
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.SOLVED_QUIZ_ADDED, this.handleSolvedQuizFetching)
  }

  handleSolvedQuizFetching (data) {
    if (!data.success) {
      this.setState({
        error: 'Problem with solved quiz fetching'
      })
    } else {
      toastr.success(data.message)
      console.log(data)
      this.setState({
        loading: false,
        quiz: data.quiz,
        scoreResult: data.scoreResult
      })
      this.props.history.push(`/quiz-learner/quiz/result/solved/${data.quiz._id}`)
    }
  }

  showWrongAnswers () {
    window.alert('im clicked')
    this.setState({
      show: true
    })
  }

  render () {
    const { quiz, scoreResult } = this.state
    if (this.state.loading) {
      return null
    }

    let wrongAnswers = ''
    if (this.state.show) {
      if (scoreResult.wrongAnswers.length > 0) {
        wrongAnswers = scoreResult.wrongAnswers.map((answer, index) => (
          <div key={index}>
            <h4 className='text-danger'>{answer.question}</h4>
            <div>Your answer : </div>
            <span>{answer.answer}</span>
            <div>Correct answer : </div>
            <span>{answer.correctAnswer}</span>
          </div>
        ))
      } else {
        wrongAnswers = <div>No wrong answers! </div>
      }
    }

    return (
      <div className='well container'>
        <div className='row'>
          <div className='text-center'>
            <h4>Congratulations! You completed the quiz!</h4>
            <div>
              Questions Count: {quiz.questions.length}
            </div>
            <div>
              Correct answers: {scoreResult.correctCount}
            </div>
            <div>
              Wrong answers: {scoreResult.wrongCount}
            </div>
            <p>
              Your score is: {scoreResult.score}
            </p>
          </div>
        </div>
        <hr />
        <div className='group-btn'>
          <input type='button' onClick={this.showWrongAnswers.bind(this)} className='btn btn-primary btn-md' value='Check your wrongs answers!' />
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Link to='/quiz-learner/quiz/all'>
            <input type='button' className='btn btn-warning btn-md' value='Practice more!' />
          </Link>
        </div>
        <hr />
        <div>{wrongAnswers}</div>
      </div>
    )
  }
}

export default QuizResultsPage
