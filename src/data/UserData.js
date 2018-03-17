import Data from './Data'

const baseUrl = 'auth'

class UserData {
  static register (user) {
    return Data.post(`${baseUrl}/register`, user)
  }

  static login (user) {
    return Data.post(`${baseUrl}/login`, user)
  }

  static getUserInfo (id) {
    return Data.get(`${baseUrl}/getUserById/${id}`)
  }
}

export default UserData
