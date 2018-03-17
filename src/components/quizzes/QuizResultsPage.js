import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
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
        wrongCount: 0,
        wrongIds: []
      },
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

  render () {
    const { quiz, scoreResult } = this.state
    if (this.state.loading) {
      return null
    }

    return (
      <div className='well container'>
        <div className='row'>
          <div className='text-center'>
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
        {/* <div className='group-btn'>
          <Link to={`/quiz-learner/quiz/details/solve/${this.state.id}`}>
            <input type='button' className='btn btn-primary btn-md' value='Start quiz!' />
          </Link>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Link to='/quiz-learner/quiz/all'>
            <input type='button' className='btn btn-warning btn-md' value='All Quizzes!' />
          </Link>
        </div> */}
      </div>
    )
  }
}

export default QuizResultsPage
