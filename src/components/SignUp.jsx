import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import '../styles/SignUp.css'

const initialForm = {
  email: '',
  name: '',
  password: '',
  password2: ''
}

const url = 'https://jana-api.vercel.app/api/users'

const validateForm = (form) => {
  let errors = {}
  let regexPassword = /^(?=.*?[a-z]).{8,100}$/
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,150}$/
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/

  if (!form.email.trim()) {
    errors.email = "Please enter an email"
  } else if (!regexEmail.test(form.email.trim())){
    errors.email = "Please enter a valid email"
  }

  if (!form.name.trim()) {
    errors.name = "Please enter a name"
  } else if(!regexName.test(form.name.trim())) {
    errors.name = "Please enter a valid name"
  }

  if (!form.password.trim()) {
    errors.password = "Please enter a password"
  } else if (!regexPassword.test(form.password.trim())){
    errors.password = "Please enter a valid password"
  }

  if (!form.password2.trim()) {
    errors.password2 = "Please confirm your password"
  }
  
  return errors
}

const SignUp = () => {
  const { form, errors, handleChange, handleBlur, handleSignup } = useForm(initialForm, validateForm, url)

  return (
    <div className='loginContainer'>
        <form onSubmit={handleSignup} className='formContent2'>
            <h2 className='welcome'>Sign up to start</h2>
            <p className='subtitle'>Or Login to continue</p>
            <div className="input-field">
                <i className="fa-solid fa-envelope"></i>
              <input type="email" name='email' onChange={handleChange} onBlur={handleBlur} placeholder='Email' value={form.email}/>
            </div>
            {errors.email ? <p className='error'>{errors.email}</p> : <></>}
            <div className="input-field">
            <i className="fa-solid fa-user"></i>
              <input type="text" name='name' onChange={handleChange} onBlur={handleBlur} placeholder='Name' value={form.name}/>
            </div>
            {errors.name ? <p className='error'>{errors.name}</p> : <></>}
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input type="password" name='password' onChange={handleChange} onBlur={handleBlur} placeholder='Password' value={form.password}/>
            </div>
            {errors.password ? <p className='error'>{errors.password}</p> : <></>}
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input type="password" name='password2' onChange={handleChange} onBlur={handleBlur} placeholder='Repeat your password' value={form.password2}/>
            </div>
            {errors.password2 ? <p className='error'>{errors.password2}</p> : <></>}
            <div className='btnContainer'>
              <button type='submit' className='button' value='Sign up'>Sign Up</button>
            </div>
            <Link to='/' className='create'>Already a member? Login</Link>
        </form>
      </div>
  )
}

export default SignUp