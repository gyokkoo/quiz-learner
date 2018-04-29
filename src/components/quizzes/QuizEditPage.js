import React, { Component } from 'react'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
// import Auth from '../users/Auth'
import { Link } from 'react-router-dom'
import toastr from 'toastr'
import Question from '../questions/Question'

class QuizEditPage extends Component {
  constructor (props) {
    super(props)
    let quizId = this.props.match.params.id
    this.state = {
      id: quizId,
      creator: '',
      quiz: {
        name: '',
        description: ''
      },
      questions: [{
        question: '',
        answers: [],
        correctAnswers: []
      }],
      loading: true
    }

    this.handleQuizLoaded = this.handleQuizLoaded.bind(this)
    this.handleQuizDeleted = this.handleQuizDeleted.bind(this)
    
    quizStore.on(quizStore.eventTypes.QUIZ_LOADED, this.handleQuizLoaded)
    quizStore.on(quizStore.eventTypes.QUIZ_DELETED, this.handleQuizDeleted)
  }

  componentDidMount () {
    quizActions.getQuizById(this.state.id)
  }

  componentWillUnmount () {
    quizStore.removeListener(quizStore.eventTypes.QUIZ_LOADED, this.handleQuizLoaded)
  }

  deleteQuiz () {
    if (window.confirm('Are you sure you wish to delete the quiz with all questions?')) {
      quizStore.deleteQuiz(this.state.id)
    }
  }

  handleQuizDeleted (data) {
    console.log(data)
  }

  handleQuizLoaded (data) {
    console.log(data)

    // TODO: Validate the input data!

    this.setState({
      loading: false,
      creator: data.creator,
      quiz: data.quiz,
      questions: data.allQuestions
    })
    toastr.success('Quiz loaded!')
  }

  render () {
    if (this.state.loading) {
      return <div>Loading</div>
    }
    let result = this.state.questions.map((question, index) => (
      <div key={index}>
        <Question
          question={question.question}
          answers={question.answers}
          correct={question.correctAnswers}
          allowClicking={false} />
        <Link to={`/quiz-learner/question/edit/${question._id}`}>
          <input type='button' className='btn btn-info btn-md' value='Edit question!' />
        </Link>
        <hr />
      </div>
    ))
    console.log(this.state)
    return (
      <div className='container'>
        {result}
        <div>
          <input type='button' className='btn btn-danger btn-md' onClick={this.deleteQuiz.bind(this)} value='Delete the quiz!' />
          <div className='delete-button' onClick={this.deleteQuiz.bind(this)} />
          
        </div>
      </div>
    )
  }
}

export default QuizEditPage
