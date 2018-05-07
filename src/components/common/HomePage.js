import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import toastr from 'toastr'

class HomePage extends Component {

  constructor (props) {
    super(props)

    this.state = {
      threeMostRecent: [],
      totalQuizzes: 0,
      solvedQuizzes: 0,
      totalQuestions: 0,
      totalUsers: 0,
      loaded: false,
      error: ''
    }

    this.handleDataLoaded = this.handleDataLoaded.bind(this)
    quizStore.on(quizStore.eventTypes.MOST_RECENT_LOADED, this.handleDataLoaded)
  }

  componentDidMount () {
    quizActions.getMostRecent()
  }

  componentWillUnmount () {
    quizStore.removeListener(quizStore.eventTypes.MOST_RECENT_LOADED, this.handleDataLoaded)
  }

  handleDataLoaded (data) {
    if (!data.success) {
      this.setState({
        error: data.message
      })
    }

    console.log(data)
    this.setState({
      threeMostRecent: data.data.quizzes,
      totalQuizzes: data.data.totalQuizzes,
      totalQuestions: data.data.totalQuestions,
      totalSolvedQuizzes: data.data.totalSolvedQuizzes,
      totalUsers: data.data.totalUsers,
      loaded: true
    })
    toastr.success('Info loaded!')
  }

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }
    
    let quizRows = this.state.threeMostRecent.map(quiz => 
        <tr key={quiz._id}>
          <td>{quiz.name}</td>
          <td>{quiz.description ? quiz.description : 'No description' }</td>
          <td>{formatDate(new Date(quiz.dateCreated))}</td>
          <td><Link to={`/quiz-learner/quiz/details/${quiz._id}`}>&nbsp;&nbsp;Play</Link></td>
        </tr>
    )
    return (
      <div>
        <h2>Welcome to Quiz Learner!</h2>
        <h3><Link to='quiz-learner/quiz/all/'> Play quizzes </Link> and expand your knowledge!</h3>
        <h4>You have knowledge to share? Great! Then
          <Link to='/quiz-learner/quiz/create'> create quiz </Link> and share it to the world.</h4>
        <p className='well container'>
          <div>Quizzes info:</div>
          <div>Total quizzes: {this.state.totalQuizzes}</div>
          <div>Total users: {this.state.totalUsers}</div>
          <div>Total solved quizzes: {this.state.totalSolvedQuizzes}</div>
          <div>Total questions: {this.state.totalQuestions}</div>
        </p>
        <hr />
        <h4>Three most recent quizzes:</h4>
        <div className='row col-md-8 col-md-offset-2 custyle'>
          <table className='table table-striped custab'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody className='text-left'>
                {quizRows}
              </tbody>
            </table>
          </div>
      </div>
    )
  }
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export default HomePage
