import React from 'react'
import Input from '../common/forms/Input'

const LoginForm = (props) => (
  <form className='form-horizontal'>
    <fieldset>
      <legend>Login</legend>
      <div>{props.error}</div>
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
      <button type='submit' className='btn btn-primary' onClick={props.onSave}>Submit</button>
    </fieldset>
  </form>
)

export default LoginForm
