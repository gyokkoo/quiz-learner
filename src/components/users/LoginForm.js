import React from 'react'
import { Link } from 'react-router-dom'

import Input from '../common/forms/Input'

const LoginForm = (props) => (
  <form className='form-horizontal'>
    <fieldset>
      <legend>Login</legend>
      <div className='text-danger'>{props.error}</div>
      <Input
        name='username'
        placeholder='Username'
        value={props.user.username}
        onChange={props.onChange} />
      <Input
        name='password'
        type='password'
        placeholder='Password'
        value={props.user.password}
        onChange={props.onChange} />
        <p>
          <span>New user? </span>
          <Link to='/quiz-learner/users/register'>Create new account!</Link>
        </p>
      <button type='submit' className='btn btn-primary' onClick={props.onSave}>Submit</button>
    </fieldset>
  </form>
)

export default LoginForm
