import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import quizStore from '../../stores/QuizStore'
import quizActions from '../../actions/QuizActions'
import toastr from 'toastr'
import './AllQuizzesPage.css'

class AllQuizzesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quizzes: []
    }

    this.handleQuizzesFetching = this.handleQuizzesFetching.bind(this)
    quizStore.on(quizStore.eventTypes.QUIZZES_FETCHED, this.handleQuizzesFetching)
  }

  componentDidMount () {
    quizActions.getAllQuizzes()
  }

  componentWillUnmount () {
    quizStore.removeListener(quizStore.eventTypes.QUIZZES_FETCHED, this.handleQuizzesFetching)
  }

  handleQuizzesFetching (data) {
    console.log(data)

    // TODO: Validate!
    this.setState({
      quizzes: data.quizzes
    })
    toastr.success('Quizzes loaded!')
  }

  render () {
    let quizRows = this.state.quizzes.map(quiz =>
      <tr key={quiz._id}>
        <td>{quiz.name}</td>
        <td>{quiz.description ? quiz.description : 'No description' }</td>
        <td><Link to={`/quiz-learner/details/solve/${quiz._id}`}>Practice</Link></td>
      </tr>
    )

    return (
      <div className='text-center'>
        <h1>All quizzes in the database</h1>
        <div className='quiz-view'>
          <table className='quiz-table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quizRows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default AllQuizzesPage
