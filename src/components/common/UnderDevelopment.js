import React, { Component } from 'react'
import image from '../../data/images/work-in-progess.png'

class UnderDevelopment extends Component {
  render () {
    return (
      <div>
        <img className='work-image' src={image} alt='Work-in-progress' />
      </div>
    )
  }
}

export default UnderDevelopment
