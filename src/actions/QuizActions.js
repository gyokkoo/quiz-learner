import dispatcher from '../dispatcher'

const quizActions = {
  types: {
    ADD_QUIZ: 'ADD_QUIZ',
    ADD_QUESTION: 'ADD_QUESTION',
    GET_QUESTIONS: 'GET_QUESTIONS'
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
  getAllQuizzes () {
    dispatcher.dispatch({
      type: this.types.GET_ALL_QUIZZES
    })
  },
  getQuestions (quizId) {
    dispatcher.dispatch({
      type: this.types.GET_QUESTIONS,
      quizId
    })
  }
}

export default quizActions
