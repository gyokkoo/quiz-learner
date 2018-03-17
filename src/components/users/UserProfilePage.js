import React, { Component } from 'react'
import defaultAvatar from '../../data/images/default-avatar.png'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import Auth from './Auth'

class UserProfilePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: Auth.getUser().id,
      userData: {
      },
      loaded: false
    }

    this.handleUserInformationFetched = this.handleUserInformationFetched.bind(this)
    userStore.on(userStore.eventTypes.USER_DATA_FETCHED, this.handleUserInformationFetched)
  }

  componentWillUnmount () {
    userStore.removeListener(userStore.eventTypes.USER_DATA_FETCHED, this.handleUserInformationFetched)
  }

  componentDidMount () {
    userActions.getUserInfo(this.state.id)
  }

  handleUserInformationFetched (data) {
    console.log(data)
    if (!data.success) {
    } else {
      this.setState({
        userData: data.userData,
        loaded: true
      })
    }
  }

  render () {
    if (!this.state.loaded) {
      return null
    }

    let roles = this.state.userData.roles.map((role, index) => (
      <span key={index}>
        {role}
      </span>
    ))
    return (
      <div>
        <div className='container profile-container'>
          <div className='profile-img'>
            <img className='work-image' src={defaultAvatar} alt='avatar' />
          </div>
          <div className='profile-info clearfix'>
            <h2><strong>{this.state.userData.fullName}</strong></h2>
            <span className='load'>Roles:</span> {roles}
          </div>
          <div>
            Solved quizzes:
            <em> Will be added in the next version!</em>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfilePage
