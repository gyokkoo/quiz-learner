import React, { Component } from 'react'
import UnderDevelopment from './UnderDevelopment'

class AboutPage extends Component {
  render () {
    return (
      <div className='container'>
        <h4>Quiz Learner is open-source project for creating, solving and editing quizzes</h4>
        <div>
          Source code:
          <ul className='list-unstyled'>
            <li>
              Front-end: &nbsp;
              <a href='https://github.com/Nezhdetov/quiz-learner' rel='noopener noreferrer' target='_blank'>
                Quiz-Learner
              </a>
            </li>
            <li>
              Back-end: &nbsp;
              <a href='https://github.com/Nezhdetov/quiz-learner-api' rel='noopener noreferrer' target='_blank'>
                Quiz-Learner-Api
              </a>
            </li>
          </ul>
        </div>
        <UnderDevelopment />
        <p>
          If you find bugs or have ideas for improvmements, please contact me:
          <br />
          <mark>gyokan.nezhdetov@gmail.com</mark>
        </p>
      </div>
    )
  }
}

export default AboutPage
