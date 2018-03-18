import Auth from '../components/users/Auth'

// const baseUrl = 'http://localhost:8080/'
const baseUrl = 'https://quiz-learner.herokuapp.com/'
const getOptions = () => ({
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const handleJsonResponse = (res) => {
  if (res) {
    return res.json()
  }

  return res
}

const applyAuthorizationHeader = (options, authenticated) => {
  if (authenticated) {
    options.headers.Authorization = `bearer ${Auth.getToken()}`
  }
}

class Data {
  static get (url, authenticated) {
    let options = getOptions()
    options.method = 'GET'
    applyAuthorizationHeader(options, authenticated)

    return window
      .fetch(`${baseUrl}${url}`, options)
      .then(handleJsonResponse)
  }

  static post (url, data, authenticated) {
    let options = getOptions()
    options.method = 'POST'
    options.body = JSON.stringify(data)

    applyAuthorizationHeader(options, authenticated)

    return window
      .fetch(`${baseUrl}${url}`, options)
      .then(handleJsonResponse)
  }

  static put (url, data, authenticated) {
    let options = getOptions()
    options.method = 'PUT'
    options.body = JSON.stringify(data)

    applyAuthorizationHeader(options, authenticated)

    return window
      .fetch(`${baseUrl}${url}`, options)
      .then(handleJsonResponse)
  }

  static delete (url, authenticated) {
    let options = getOptions()
    options.method = 'DELETE'

    applyAuthorizationHeader(options, authenticated)

    return window
      .fetch(`${baseUrl}${url}`, options)
      .then(handleJsonResponse)
  }
}

export default Data
