import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import quizActions from '../actions/QuizActions'
import QuizData from '../data/QuizData'

class QuizStore extends EventEmitter {
  create (quiz) {
    // TODO:
    console.log(quiz)
    QuizData.create(quiz).then(data => this.emit(this.eventTypes.QUIZ_ADDED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case quizActions.types.ADD_QUIZ: {
        this.create(action.quiz)
        break
      }
      default:
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
