import React, { Component } from 'react'
import FormHelpers from '../common/forms/FormHelpers'
import RegisterForm from './RegisterForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        age: 0,
        roles: []
      },
      error: ''
    }

    this.handleUserRegistration = this.handleUserRegistration.bind(this)
    userStore.on(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  handleUserChange (event) {
    const formChangeFunction = FormHelpers.handleFormChange.bind(this)
    formChangeFunction(event, 'user')
  }

  handleUserForm (event) {
    event.preventDefault()
    if (!this.validateUser()) {
      return
    }

    this.state.user.roles.push('User')
    userActions.register(this.state.user)
  }

  handleUserRegistration (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)
      this.setState({
        error: firstError
      })
    } else {
     // toastr.success(data.message)
      this.props.history.push('/quiz-learner/users/login')
    }
  }

  validateUser () {
    const user = this.state.user
    let formIsValid = true
    let error = ''
    if (user.password !== user.confirmPassword) {
      error = 'Password and confirmation password do not match.'
      formIsValid = false
    }

    if (error) {
      this.setState({
        error
      })
    }
    return formIsValid
  }

  render () {
    return (
      <div className='container body-content span=8 offset=2'>
        <div className='well well-lg'>
          <RegisterForm
            user={this.state.user}
            error={this.state.error}
            onChange={this.handleUserChange.bind(this)}
            onSave={this.handleUserForm.bind(this)} />
        </div>
      </div>
    )
  }
}

export default RegisterPage
