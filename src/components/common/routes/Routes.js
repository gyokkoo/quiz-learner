import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import HomePage from '../../HomePage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import UserProfilePage from '../../users/UserProfilePage'
import AboutPage from '../../AboutPage'
import AllQuizzesPage from '../../quizzes/AllQuizzesPage'
import CreateQuizPage from '../../quizzes/CreateQuizPage'
import AddQuestionsPage from '../../quizzes/AddQuestionsPage'
import SolveQuizPage from '../../quizzes/SolveQuizPage'
import QuizDetailsPage from '../../quizzes/QuizDetailsPage'
import QuizResultsPage from '../../quizzes/QuizResultsPage'
import QuizEditPage from '../../quizzes/QuizEditPage'
import QuestionEditPage from '../../quizzes/QuestionEditPage'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route path='/quiz-learner' exact component={HomePage} />
    <Route path='/quiz-learner/about' component={AboutPage} />
    <Route path='/quiz-learner/users/register' component={RegisterPage} />
    <Route path='/quiz-learner/users/login' component={LoginPage} />
    <Route path='/quiz-learner/quiz/all' component={AllQuizzesPage} />
    <PrivateRoute path='/quiz-learner/quiz/create' component={CreateQuizPage} />
    <PrivateRoute path='/quiz-learner/quiz/add/:id' component={AddQuestionsPage} />
    <PrivateRoute path='/quiz-learner/quiz/details/solve/:id' component={SolveQuizPage} />
    <PrivateRoute path='/quiz-learner/quiz/result/solved/:id' component={QuizResultsPage} />
    <PrivateRoute path='/quiz-learner/quiz/edit/:id' component={QuizEditPage} />
    <PrivateRoute path='/quiz-learner/question/edit/:id' component={QuestionEditPage} />
    <PrivateRoute path='/quiz-learner/quiz/details/:id' component={QuizDetailsPage} />
    <PrivateRoute path='/quiz-learner/users/logout' component={LogoutPage} />
    <PrivateRoute path='/quiz-learner/me' component={UserProfilePage} />
  </Switch>
)

export default Routes
