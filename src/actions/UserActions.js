import dispatcher from '../dispatcher'

const userActions = {
  types: {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    GET_USER_INFO: 'GET_USER_INFO'
  },
  register (user) {
    dispatcher.dispatch({
      type: this.types.REGISTER_USER,
      user
    })
  },
  login (user) {
    dispatcher.dispatch({
      type: this.types.LOGIN_USER,
      user
    })
  },
  getUserInfo (id) {
    dispatcher.dispatch({
      type: this.types.GET_USER_INFO,
      id
    })
  }
}

export default userActions
