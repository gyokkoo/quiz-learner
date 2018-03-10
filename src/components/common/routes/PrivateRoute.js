import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../../users/Auth'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
      Auth.isUserAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/quiz-learner/users/login',
          state: { from: props.location }
        }} />
      )
    )
  } />
)

export default PrivateRoute
