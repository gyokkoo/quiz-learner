import dispatcher from '../dispatcher'

const quizActions = {
  types: {
    ADD_QUIZ: 'ADD_QUIZ',
    ADD_SOLVED_QUIZ: 'ADD_SOLVED_QUIZ',
    GET_ALL_QUIZZES: 'GET_ALL_QUIZZES',
    GET_QUIZ_BY_ID: 'GET_QUIZ_BY_ID'
  },
  create (quiz) {
    dispatcher.dispatch({
      type: this.types.ADD_QUIZ,
      quiz
    })
  },
  addSolvedQuiz (solvedQuiz) {
    dispatcher.dispatch({
      type: this.types.ADD_SOLVED_QUIZ,
      solvedQuiz
    })
  },
  getAllQuizzes () {
    dispatcher.dispatch({
      type: this.types.GET_ALL_QUIZZES
    })
  },
  getQuizById (quizId) {
    dispatcher.dispatch({
      type: this.types.GET_QUIZ_BY_ID,
      quizId
    })
  }
}

export default quizActions
