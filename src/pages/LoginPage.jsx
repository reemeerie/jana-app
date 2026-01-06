import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { useNavigate } from "react-router-dom"
import { validateLogin } from "../utils/userValidations"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import "../styles/LoginPage.css"

const initialForm = {
  email: "",
  password: "",
}

const baseurl = import.meta.env.VITE_API_URL

export const LoginPage = () => {
  const navigate = useNavigate()
  const {
    token,
    form,
    errors,
    handleChange,
    handleBlur,
    handleLogin,
    error,
    touched,
    isLoading,
  } = useForm(initialForm, validateLogin, `${baseurl}/login`)

  useEffect(() => {
    if (token) navigate("/notes")
  }, [token, navigate])

  return (
    <>
      <section className="loginContainer">
        <form onSubmit={handleLogin} className="formContent">
          <h2 className="welcome">Welcome back!</h2>
          <p className="subtitle">Log in to continue</p>
          <InputField
            icon="fa-solid fa-envelope"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <InputField
            icon="fa-solid fa-lock"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          <Button label="Log in" loading={isLoading} />
          {error && <p className="error apiError">{error}</p>}
          <Link to="/signUp" className="createAccount">
            Create new account
          </Link>
        </form>
      </section>
    </>
  )
}
