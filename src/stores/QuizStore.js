import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import quizActions from '../actions/QuizActions'
import QuizData from '../data/QuizData'

class QuizStore extends EventEmitter {
  create (quiz) {
    QuizData
      .create(quiz)
      .then(data => this.emit(this.eventTypes.QUIZ_ADDED, data))
  }

  addSolvedQuiz (quiz) {
    QuizData
      .addSolvedQuiz(quiz)
      .then(data => this.emit(this.eventTypes.SOLVED_QUIZ_ADDED, data))
  }

  getAllQuizzes () {
    QuizData
      .getAllQuizzes()
      .then(data => this.emit(this.eventTypes.QUIZZES_LOADED, data))
  }

  getQuizById (id) {
    QuizData
      .getQuizById(id)
      .then(data => this.emit(this.eventTypes.QUIZ_LOADED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case quizActions.types.ADD_QUIZ: {
        this.create(action.quiz)
        break
      }
      case quizActions.types.GET_ALL_QUIZZES: {
        this.getAllQuizzes()
        break
      }
      case quizActions.types.GET_QUIZ_BY_ID: {
        this.getQuizById(action.quizId)
        break
      }
      case quizActions.types.ADD_SOLVED_QUIZ: {
        this.addSolvedQuiz(action.solvedQuiz)
        break
      }
      default:
        break
    }
  }
}

let quizStore = new QuizStore()

quizStore.eventTypes = {
  QUIZ_ADDED: 'quiz_added',
  QUIZZES_LOADED: 'quizzes_loaded',
  QUIZ_LOADED: 'quiz_loaded',
  SOLVED_QUIZ_ADDED: 'solved_quiz_added'
}

dispatcher.register(quizStore.handleAction.bind(quizStore))

export default quizStore
