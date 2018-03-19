import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import questionActions from '../actions/QuestionActions'
import QuizData from '../data/QuizData'

class QuestionStore extends EventEmitter {
  addQuestion (question) {
    QuizData
      .addQuestion(question)
      .then(data => this.emit(this.eventTypes.QUESTION_ADDED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case questionActions.types.ADD_QUESTION: {
        this.addQuestion(action.question)
        break
      }
      default:
        break
    }
  }
}

let questionStore = new QuestionStore()

questionStore.eventTypes = {
  QUESTION_ADDED: 'question_added'
}

dispatcher.register(questionStore.handleAction.bind(questionStore))

export default questionStore
