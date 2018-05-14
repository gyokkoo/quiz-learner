import React, { Component } from 'react'
import NavbarComponent from './components/common/navbar/NavbarComponent'
import FooterComponent  from './components/common/footer/FooterComponent'
import Routes from './components/common/routes/Routes'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <NavbarComponent />
        <Routes />
        <FooterComponent />
      </div>
    )
  }
}

export default App
