import dispatcher from '../dispatcher'

const quizActions = {
  types: {
    ADD_QUIZ: 'ADD_QUIZ',
    ADD_QUESTION: 'ADD_QUESTION'
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
  }
}

export default quizActions
