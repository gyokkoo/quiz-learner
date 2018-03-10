import { Component } from 'react'
import Auth from './Auth'
import toastr from 'toastr'

class LogoutPage extends Component {
  componentWillMount () {
    Auth.deauthenticateUser()
    Auth.removeUser()
    toastr.success('You have successfully logged out!')
    this.props.history.push('/quiz-learner/')
  }

  render () {
    return null
  }
}

export default LogoutPage
