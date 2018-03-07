import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../../HomePage'
import RegisterPage from '../../users/RegisterPage'
const Routes = () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route path='/quiz-learner' exact component={HomePage} />
    <Route path='/quiz-learner/users/register' component={RegisterPage} />
    {/* // <Route path='/quiz-learner/users/login' component={LoginPage} /> */}
  </Switch>
)

export default Routes
