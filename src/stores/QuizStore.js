import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import quizActions from '../actions/QuizActions'

class QuizStore extends EventEmitter {
  add (quiz) {
    // TODO:
    // QuizDada.add(quiz).then(data => this.emit(this.eventTypes.QUIZ_ADDED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case quizActions.types.ADD_QUIZ: {
        this.add(action.quiz)
        break
      }
      default:
        window.allert('Invalid action type! ->' + action.type)
        break
    }
  }
}

let quizStore = new QuizStore()

quizStore.eventTypes = {
  QUIZ_ADDED: 'quiz_added'
}

dispatcher.register(quizStore.handleAction.bind(quizStore))
export default quizStore
