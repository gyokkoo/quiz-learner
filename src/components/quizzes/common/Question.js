import React, { Component } from 'react'

class Question extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedAnswers: []
    }
  }

  handleAnswerClicked (e) {
    const { selectedAnswers } = this.state
    let clickedAnswer = e.target.innerHTML
    let indexOfClickedAnswer = selectedAnswers.indexOf(clickedAnswer)
    if (clickedAnswer && indexOfClickedAnswer === -1) {
      const nextState = [...selectedAnswers, clickedAnswer]
      this.setState({ selectedAnswers: nextState }, () => {
        this.props.addAnswers(this.state.selectedAnswers)
      })
    } else if (clickedAnswer && indexOfClickedAnswer !== -1) {
      selectedAnswers.splice(indexOfClickedAnswer, 1)
      this.setState({ selectedAnswers: selectedAnswers }, () => {
        this.props.addAnswers(this.state.selectedAnswers)
      })
    }
  }

  render () {
    const {question, answers} = this.props

    return (
      <div>
        <h3>{question}</h3>
        <ListAnswers
          answers={answers}
          selected={this.state.selectedAnswers}
          onClicked={this.handleAnswerClicked.bind(this)} />
      </div>
    )
  }
}

const Answer = ({ isSelected, value, onClick }) => (
  <li onClick={onClick} className='list-group-item list-group-item'
    style={{ backgroundColor: isSelected ? 'lightblue' : 'white' }}>
    {value}
  </li>
)

const ListAnswers = ({ selected, answers, onClicked }) => (
  <ul>
    {
      answers.map((answer, i) => {
        let isSelected = selected.indexOf(answer) > -1
        return <Answer isSelected={isSelected} number={i + 1} key={i} value={answer} onClick={onClicked} />
      })
    }
  </ul>
)

export default Question
