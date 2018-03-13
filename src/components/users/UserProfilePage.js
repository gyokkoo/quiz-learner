import React, { Component } from 'react'
import defaultAvatar from '../../data/images/default-avatar.png'
import Auth from './Auth'

class UserProfilePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: Auth.getUser().id
    }
  }

  render () {
    return (
      <div>
        <img className='work-image' src={defaultAvatar} alt='avatar' />
        <div>
          Added quizzes: ... (Coming soon!)
        </div>
        <div>
          Solved quizzes: ... (Coming soon!)
        </div>
        <div>
          User id: {this.state.id}
        </div>
      </div>
    )
  }
}

export default UserProfilePage
