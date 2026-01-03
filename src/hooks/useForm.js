import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"

export const useForm = (initialForm, validateForm, url) => {
  const [token, setToken] = useLocalStorage("token", null)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [touched, setTouched] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validateForm(form))
    setError()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    /* Establezco todos los campos como touched */
    setTouched(touchAll(form))

    /* Valido nuevamente el formulario antes de enviar */
    const errs = validateForm(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setError("")
    setIsLoading(true)
    try {
      const res = await axios.post(url, form)
      setToken(res.data.data)
    } catch (err) {
      setError(err?.response?.data?.error ?? "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    /* Establezco todos los campos como touched */
    setTouched(touchAll(form))

    /* Valido nuevamente el formulario antes de enviar */
    const errs = validateForm(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setError("")
    setIsLoading(true)
    try {
      await axios.post(url, form)
      navigate("/login", { state: { justSignedUp: true } })
    } catch (err) {
      setError(err?.response?.data?.error ?? "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const touchAll = (obj) =>
    Object.fromEntries(Object.keys(obj).map((k) => [k, true]))

  return {
    handleChange,
    handleBlur,
    handleLogin,
    handleSignup,
    token,
    form,
    errors,
    error,
    isLoading,
    touched,
  }
}
