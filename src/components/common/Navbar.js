import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render () {
    let navbarLinks =
      <ul className='nav navbar-nav center'>
        <li><Link to='/quiz-learner/users/register'>Register</Link></li>
        <li><Link to='/quiz-learner/users/login'>Login</Link></li>
      </ul>
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/quiz-learner/' className='navbar-brand'>Quiz Project</Link>
          </div>
          {navbarLinks}
        </div>
      </nav>
    )
  }
}

export default Navbar
