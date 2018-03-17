import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import userActions from '../actions/UserActions'
import UserData from '../data/UserData'

class UserStore extends EventEmitter {
  register (user) {
    UserData.register(user).then(data => this.emit(this.eventTypes.USER_REGISTERED, data))
  }

  login (user) {
    UserData.login(user).then(data => this.emit(this.eventTypes.USER_LOGGED_IN, data))
  }

  getUserInfo (id) {
    UserData.getUserInfo(id).then(data => this.emit(this.eventTypes.USER_DATA_FETCHED, data))
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
      case userActions.types.GET_USER_INFO: {
        this.getUserInfo(action.id)
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
  USER_LOGGED_IN: 'user_logged_in',
  USER_DATA_FETCHED: 'user_data_fetched'
}

dispatcher.register(userStore.handleAction.bind(userStore))
export default userStore
