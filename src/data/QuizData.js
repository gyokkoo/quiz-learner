import Data from './Data'

const baseUrl = 'quiz'

class QuizData {
  static create (quiz) {
    return Data.post(`${baseUrl}/create`, quiz, true)
  }

  static addQuestion (question) {
    return Data.post(`${baseUrl}/addQuestion`, question, true)
  }

  static getAllQuizzes () {
    return Data.get(`${baseUrl}/getAllQuizzes`, true)
  }

  static getAllQuestions (id) {
    return Data.get(`${baseUrl}/getQuestions/${id}`, true)
  }

  static getQuizById (id) {
    return Data.get(`${baseUrl}/getQuizById/${id}`, true)
  }
}

export default QuizData
