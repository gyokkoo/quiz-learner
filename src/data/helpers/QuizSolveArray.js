const allAnswers = {}

module.export = {
  // TODO exports methods
  add: (answers, index) => {
    allAnswers[index] = answers
  },
  all: () => {
    return allAnswers
  }
}
