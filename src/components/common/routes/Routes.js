import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../../HomePage'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route path='/quiz-learner' exact component={HomePage} />
    {/* <Route path='/pets-system-app/users/register' component={RegisterPage} /> */}
    {/* // <Route path='/pets-system-app/users/login' component={LoginPage} /> */}
  </Switch>
)

export default Routes
