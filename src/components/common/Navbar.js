import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import userStore from '../../stores/UserStore'
import './Navbar.css'

class Navbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: Auth.getUser().name,
      navbarCollapsed: false
    }

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)
    this.onToggleNav = this.onToggleNav.bind(this)

    userStore.on(userStore.eventTypes.USER_LOGGED_IN, this.handleUserLoggedIn)
  }

  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }

  onToggleNav () {
    this.setState({
      navbarCollapsed: !this.state.navbarCollapsed
    })
  }

  render () {
    const { navbarCollapsed } = this.state
    let navbarLinks = ''
    if (Auth.isUserAuthenticated()) {
      navbarLinks =
        <div>
          <ul className='nav navbar-nav navbar-center'>
            <li><Link to='/quiz-learner/quiz/all'>All Quizzes</Link></li>
            <li><Link to='/quiz-learner/quiz/add'>Add Quiz</Link></li>
            <li><Link to='/quiz-learner/ranking'>Ranking</Link></li>
            <li><Link to='/quiz-learner/report'>Report Problem</Link></li>
            <li><Link to='/quiz-learner/about'>About</Link></li>
          </ul>
          <ul className='nav navbar-nav navbar-right'>
            <li><Link to='/quiz-learner/me'>{this.state.username}</Link></li>
            <li><Link to='/quiz-learner/users/logout'>Logout</Link></li>
          </ul>
        </div>
    } else {
      navbarLinks =
        <ul className='nav navbar-nav center'>
          <li><Link to='/quiz-learner/quiz/all'>All Quizzes</Link></li>
          <li><Link to='/quiz-learner/about'>About</Link></li>
          <li><Link to='/quiz-learner/users/register'>Register</Link></li>
          <li><Link to='/quiz-learner/users/login'>Login</Link></li>
        </ul>
    }

    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header pull-left'>
            <ul className='nav navbar-nav'>
              <li><Link to='/quiz-learner/' className='navbar-brand'>QuizLearner</Link></li>
            </ul>
            <button type='button' className='navbar-toggle collapsed' onClick={this.onToggleNav}>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
          </div>
          <div className={(navbarCollapsed ? 'collapse' : '') + ' navbar-collapse'}>
            {navbarLinks}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
