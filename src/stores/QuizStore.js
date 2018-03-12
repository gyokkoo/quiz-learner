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

  addQuestion (question) {
    console.log(question)
    QuizData.addQuestion(question).then(data => this.emit(this.eventTypes.QUESTION_ADDED, data))
  }

  getAllQuizzes () {
    QuizData.getAllQuizzes().then(data => this.emit(this.eventTypes.QUIZZES_FETCHED, data))
  }

  getQuestions (id) {
    QuizData.getQuestions(id).then(data => this.emit(this.eventTypes.QUESTIONS_FETCHED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case quizActions.types.ADD_QUIZ: {
        this.create(action.quiz)
        break
      }
      case quizActions.types.ADD_QUESTION: {
        this.addQuestion(action.question)
        break
      }
      case quizActions.types.GET_ALL_QUIZZES: {
        this.getAllQuizzes()
        break
      }
      case quizActions.types.GET_QUESTIONS: {
        this.getQuestions(action.quizId)
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
  QUESTION_ADDED: 'question_added',
  QUIZZES_FETCHED: 'quizzes_fetched',
  QUESTIONS_FETCHED: 'question_fetched'
}

dispatcher.register(quizStore.handleAction.bind(quizStore))
export default quizStore
