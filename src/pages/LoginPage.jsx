import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import "../styles/Login.css"

const initialForm = {
  email: "",
  password: "",
}

const url = "https://jana-api.vercel.app/api/login"

const validateForm = (form) => {
  let errors = {}
  let regexPassword = /^(?=.*?[a-z]).{8,100}$/
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,150}$/

  if (!form.email.trim()) {
    errors.email = "Please enter an email"
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Please enter a valid email"
  }

  if (!form.password.trim()) {
    errors.password = "Please enter a password"
  } else if (!regexPassword.test(form.password.trim())) {
    errors.password = "Please enter a valid password"
  }

  return errors
}

const Login = () => {
  const { token, form, errors, handleChange, handleBlur, handleLogin, error } =
    useForm(initialForm, validateForm, url)

  useEffect(() => {
    if (token) {
      window.location.href = "/notes"
    }
  }, [token])

  return (
    <>
      <div className="loginContainer">
        <form onSubmit={handleLogin} className="formContent">
          <h2 className="welcome">Welcome back!</h2>
          <p className="subtitle">Login to continue</p>
          <div className="input-field">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              className="email"
              placeholder="Email"
              value={form.email}
            />
          </div>
          {errors.email ? <p className="error">{errors.email}</p> : <></>}
          <div className="input-field">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              className="password"
              placeholder="Password"
              value={form.password}
            />
          </div>
          {errors.password ? <p className="error">{errors.password}</p> : <></>}
          <div className="btnContainer">
            <button type="submit" className="button" value="Login">
              Login
            </button>
          </div>
          {error ? <p className="error">{error}</p> : <></>}
          <Link to="/signUp" className="create">
            Create new account
          </Link>
        </form>
      </div>
    </>
  )
}

export default Login
