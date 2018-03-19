import dispatcher from '../dispatcher'

const questionActions = {
  types: {
    ADD_QUESTION: 'ADD_QUESTION'
  },
  addQuestion (question) {
    dispatcher.dispatch({
      type: this.types.ADD_QUESTION,
      question
    })
  }
}

export default questionActions
