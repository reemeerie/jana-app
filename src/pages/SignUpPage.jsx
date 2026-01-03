import { Link } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { validateSignUp } from "../utils/validations"
import { Button } from "../components/Button"
import { InputField } from "../components/InputField"
import "../styles/Login.css"

const initialForm = {
  email: "",
  name: "",
  password: "",
  password2: "",
}

const baseurl = import.meta.env.VITE_API_URL

export const SignUpPage = () => {
  const {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSignup,
    error,
    touched,
    isLoading,
  } = useForm(initialForm, validateSignUp, `${baseurl}/users`)

  return (
    <div className="loginContainer">
      <form onSubmit={handleSignup} className="formContent">
        <h2 className="welcome">Sign up to start</h2>
        <p className="subtitle">Or log in to continue</p>
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
          icon="fa-solid fa-user"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
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
        <InputField
          icon="fa-solid fa-lock"
          type="password"
          name="password2"
          placeholder="Repeat your password"
          value={form.password2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password2}
          touched={touched.password2}
        />
        <Button label="Login" loading={isLoading} />
        {error && <p className="error apiError">{error}</p>}
        <Link to="/" className="createAccount">
          Already a member? Log in
        </Link>
      </form>
    </div>
  )
}
