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

  getAllQuestions (id) {
    QuizData
      .getAllQuestions(id)
      .then(data => this.emit(this.eventTypes.QUESTIONS_LOADED, data))
  }

  getQuestionById (id) {
    QuizData
      .getQuestionById(id)
      .then(data => this.emit(this.eventTypes.QUESTION_LOADED, data))
  }

  editQuestion (id, question) {
    QuizData
      .editQuestion(id, question)
      .then(data => this.emit(this.eventTypes.QUESTION_EDITED, data))
  }

  deleteQuestion (id) {
    QuizData
      .deleteQuestion(id)
      .then(data => this.emit(this.eventTypes.QUESTION_DELETED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case questionActions.types.ADD_QUESTION: {
        this.addQuestion(action.question)
        break
      }
      case questionActions.types.GET_ALL_QUESTIONS: {
        this.getAllQuestions(action.quizId)
        break
      }
      case questionActions.types.GET_QUESTION_BY_ID: {
        this.getQuestionById(action.id)
        break
      }
      case questionActions.types.EDIT_QUESTION: {
        this.editQuestion(action.id, action.question)
        break
      }
      case questionActions.types.DELETE_QUESTION: {
        this.deleteQuestion(action.id)
        break
      }
      default:
        break
    }
  }
}

let questionStore = new QuestionStore()

questionStore.eventTypes = {
  QUESTION_ADDED: 'question_added',
  QUESTIONS_LOADED: 'questions_loaded',
  QUESTION_LOADED: 'question_loaded',
  QUESTION_EDITED: 'question_edited',
  QUESTION_DELETED: 'question_deleted'
}

dispatcher.register(questionStore.handleAction.bind(questionStore))

export default questionStore
