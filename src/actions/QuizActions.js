import dispatcher from '../dispatcher'

const quizActions = {
  types: {
    ADD_QUIZ: 'ADD_QUIZ',
    ADD_QUESTION: 'ADD_QUESTION',
    ADD_SOLVED_QUIZ: 'ADD_SOLVED_QUIZ',
    GET_ALL_QUIZZES: 'GET_ALL_QUIZZES',
    GET_ALL_QUESTIONS: 'GET_ALL_QUESTIONS',
    GET_QUIZ_BY_ID: 'GET_QUIZ_BY_ID',
    GET_QUESTION_BY_ID: 'GET_QUESTION_BY_ID'
  },
  create (quiz) {
    dispatcher.dispatch({
      type: this.types.ADD_QUIZ,
      quiz
    })
  },
  addQuestion (question) {
    dispatcher.dispatch({
      type: this.types.ADD_QUESTION,
      question
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
  getAllQuestions (quizId) {
    dispatcher.dispatch({
      type: this.types.GET_ALL_QUESTIONS,
      quizId
    })
  },
  getQuizById (quizId) {
    dispatcher.dispatch({
      type: this.types.GET_QUIZ_BY_ID,
      quizId
    })
  },
  getQuestionById (id) {
    dispatcher.dispatch({
      type: this.types.GET_QUESTION_BY_ID,
      id
    })
  }
}

export default quizActions
