import React, { Component } from 'react'
import Navbar from './components/common/Navbar'
import Routes from './components/common/routes/Routes'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default App
