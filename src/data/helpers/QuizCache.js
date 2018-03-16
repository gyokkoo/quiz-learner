class QuizCache {
  static addAnswers (id, answers) {
    window.sessionStorage.setItem(id, JSON.stringify(answers))
  }

  static getAnswers () {
    const answersJson = Object.assign({}, window.sessionStorage)
    if (answersJson) {
      return answersJson
    }

    return {}
  }

  static clear () {
    window.sessionStorage.clear()
  }
}

export default QuizCache
