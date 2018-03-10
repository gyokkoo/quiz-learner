import React from 'react'
import Input from '../common/forms/Input'

const RegisterForm = (props) => (
  <form className='form-horizontal'>
    <fieldset>
      <legend>Register</legend>
      <div className='text-danger'>{props.error}</div>
      <Input
        name='username'
        placeholder='Username'
        value={props.user.username}
        onChange={props.onChange} />
      <Input
        name='firstName'
        placeholder='First Name'
        value={props.user.firstName}
        onChange={props.onChange} />
      <Input
        name='lastName'
        placeholder='Last Name'
        value={props.user.lastName}
        onChange={props.onChange} />
      <Input
        name='password'
        type='password'
        placeholder='Password'
        value={props.user.password}
        onChange={props.onChange} />
      <Input
        name='confirmPassword'
        type='password'
        placeholder='Confirm Password'
        value={props.user.confirmPassword}
        onChange={props.onChange} />
      <Input
        name='age'
        type='number'
        placeholder='Age'
        value={props.user.age}
        onChange={props.onChange} />
      <button type='submit' className='btn btn-primary' onClick={props.onSave}>Submit</button>
    </fieldset>
  </form>
)

export default RegisterForm
