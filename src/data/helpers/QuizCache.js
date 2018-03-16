class QuizCache {
  static addAnswers (id, answers, number) {
    const obj = {}
    obj.id = id
    obj.answers = answers
    window.sessionStorage.setItem(number, JSON.stringify(obj))
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
