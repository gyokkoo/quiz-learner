import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import userStore from '../../stores/UserStore'
import { Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NavItem } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

class NavbarComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: Auth.getUser().name
    }

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

    userStore.on(userStore.eventTypes.USER_LOGGED_IN, this.handleUserLoggedIn)
  }

  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }

  render () {
    let navbarLinks = ''
    if (Auth.isUserAuthenticated()) {
        navbarLinks =
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/quiz-learner/quiz/all">
                <NavItem eventKey={1}>All Quizzes</NavItem>
              </LinkContainer>
              <LinkContainer to="/quiz-learner/quiz/create">
                <NavItem eventKey={2}>Create Quiz</NavItem>
              </LinkContainer>
              <LinkContainer to="/quiz-learner/about">
                <NavItem eventKey={3}>About</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/quiz-learner/me">
                <NavItem eventKey={4}>{this.state.username}</NavItem>
              </LinkContainer>
              <LinkContainer to="/quiz-learner/users/logout">
                <NavItem eventKey={5}>Logout</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
      } else {
        navbarLinks =
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/quiz-learner/quiz/all">
                <NavItem eventKey={1}>All Quizzes</NavItem>
              </LinkContainer>
              <LinkContainer to="/quiz-learner/about">
                <NavItem eventKey={3}>About</NavItem>
              </LinkContainer>
              <LinkContainer to="/quiz-learner/users/register">
                <NavItem eventKey={3}>Register</NavItem>
              </LinkContainer>
              <LinkContainer to="/quiz-learner/users/login">
                <NavItem eventKey={3}>Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
      }

    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/quiz-learner">QuizLearner</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {navbarLinks}
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
