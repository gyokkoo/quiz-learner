import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import userActions from '../actions/UserActions'

class UserStore extends EventEmitter {
  register (user) {
    // Register user
  }

  login (user) {
    // Login user
  }

  handleAction (action) {
    switch (action.type) {
      case userActions.types.REGISTER_USER: {
        this.register(action.user)
        break
      }
      case userActions.types.LOGIN_USER: {
        this.login(action.user)
        break
      }
      default:
        break
    }
  }
}

let userStore = new UserStore()

userStore.eventTypes = {
  USER_REGISTERED: 'user_registered',
  USER_LOGGED_IN: 'user_logged_in'
}

dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore
