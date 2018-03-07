import React from 'react'

const Input = (props) => {
  let type = props.type || 'text'

  return (
    <div className='form-group'>
      <label htmlFor={props.name} className='col-sm-4 control-label'>{props.placeholder}</label>
      <div className='col-sm-4'>
        <input
          type={type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className='form-control' />
      </div>
    </div>
  )
}

export default Input
