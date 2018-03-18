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

  addQuestion (question) {
    QuizData
      .addQuestion(question)
      .then(data => this.emit(this.eventTypes.QUESTION_ADDED, data))
  }

  addSolvedQuiz (quiz) {
    QuizData
      .addSolvedQuiz(quiz)
      .then(data => this.emit(this.eventTypes.SOLVED_QUIZ_ADDED, data))
  }

  getAllQuizzes () {
    QuizData
      .getAllQuizzes()
      .then(data => this.emit(this.eventTypes.QUIZZES_FETCHED, data))
  }

  getAllQuestions (id) {
    QuizData
      .getAllQuestions(id)
      .then(data => this.emit(this.eventTypes.QUESTIONS_FETCHED, data))
  }

  getQuizById (id) {
    QuizData
      .getQuizById(id)
      .then(data => this.emit(this.eventTypes.QUIZ_FETCHED, data))
  }

  getQuestionById (id) {
    QuizData
      .getQuestionById(id)
      .then(data => this.emit(this.eventTypes.QUESTION_FETCHED, data))
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
      case quizActions.types.GET_ALL_QUESTIONS: {
        this.getAllQuestions(action.quizId)
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
      case quizActions.types.GET_QUESTION_BY_ID: {
        this.getQuestionById(action.id)
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
  QUIZ_FETCHED: 'quiz_fetched',
  QUESTIONS_FETCHED: 'questions_fetched',
  SOLVED_QUIZ_ADDED: 'solved_quiz_added',
  QUESTION_FETCHED: 'question_fetched'
}

dispatcher.register(quizStore.handleAction.bind(quizStore))

export default quizStore
