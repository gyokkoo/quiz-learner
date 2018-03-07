import Data from './Data'

const baseUrl = 'auth'

class UserData {
  static register (user) {
    return Data.post(`${baseUrl}/register`, user)
  }

  static login (user) {
    return Data.post(`${baseUrl}/login`, user)
  }
}

export default UserData
