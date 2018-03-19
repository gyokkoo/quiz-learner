import dispatcher from '../dispatcher'

const questionActions = {
  types: {
    ADD_QUESTION: 'ADD_QUESTION',
    GET_ALL_QUESTIONS: 'GET_ALL_QUESTIONS',
    GET_QUESTION_BY_ID: 'GET_QUESTION_BY_ID',
    EDIT_QUESTION: 'EDIT_QUESTION',
    DELETE_QUESTION: 'DELETE_QUESTION'
  },
  addQuestion (question) {
    dispatcher.dispatch({
      type: this.types.ADD_QUESTION,
      question
    })
  },
  getAllQuestions (quizId) {
    dispatcher.dispatch({
      type: this.types.GET_ALL_QUESTIONS,
      quizId
    })
  },
  getQuestionById (id) {
    dispatcher.dispatch({
      type: this.types.GET_QUESTION_BY_ID,
      id
    })
  },
  editQuestion (id, question) {
    dispatcher.dispatch({
      type: this.types.EDIT_QUESTION,
      id,
      question
    })
  },
  deleteQuestion (id) {
    dispatcher.dispatch({
      type: this.types.DELETE_QUESTION,
      id
    })
  }
}

export default questionActions
