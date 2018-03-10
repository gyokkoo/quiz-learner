import React, { Component } from 'react'
import UnderDevelopment from './UnderDevelopment'

class AboutPage extends Component {
  render () {
    return (
      <div>
        <h2>This is about Page</h2>
        <div>The project is stil in development!</div>
        <div>Updates coming soon!</div>
        <UnderDevelopment />
      </div>
    )
  }
}

export default AboutPage
