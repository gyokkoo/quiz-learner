import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import HomePage from '../../HomePage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import AboutPage from '../../AboutPage'
import AllQuizzesPage from '../../quizzes/AllQuizzesPage'
import CreateQuizPage from '../../quizzes/CreateQuizPage'
import AddQuestionsPage from '../../quizzes/AddQuestionsPage'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route path='/quiz-learner' exact component={HomePage} />
    <Route path='/quiz-learner/about' component={AboutPage} />
    <Route path='/quiz-learner/users/register' component={RegisterPage} />
    <Route path='/quiz-learner/users/login' component={LoginPage} />
    <Route path='/quiz-learner/quiz/all' component={AllQuizzesPage} />
    <PrivateRoute path='/quiz-learner/quiz/create' component={CreateQuizPage} />
    <PrivateRoute path='/quiz-learner/quiz/details/:id' component={AddQuestionsPage} />
    <PrivateRoute path='/quiz-learner/users/logout' component={LogoutPage} />
  </Switch>
)

export default Routes
