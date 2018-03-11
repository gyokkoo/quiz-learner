import Data from './Data'

const baseUrl = 'quiz'

class QuizData {
  static create (quiz) {
    return Data.post(`${baseUrl}/create`, quiz, true)
  }
}

export default QuizData
