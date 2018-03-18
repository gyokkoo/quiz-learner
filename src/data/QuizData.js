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
    return Data.get(`${baseUrl}/getAllQuizzes`)
  }

  static getAllQuestions (id) {
    return Data.get(`${baseUrl}/getQuestions/${id}`)
  }

  static getQuizById (id) {
    return Data.get(`${baseUrl}/getQuizById/${id}`)
  }

  static addSolvedQuiz (solvedQuiz) {
    return Data.post(`${baseUrl}/addSolvedQuiz`, solvedQuiz, true)
  }

  static getQuestionById (id) {
    return Data.get(`${baseUrl}/getQuestionById/${id}`)
  }
}

export default QuizData
