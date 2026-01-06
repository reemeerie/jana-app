export const validateLogin = (form) => {
  const email = form.email.trim() ?? ""
  const password = form.password ?? ""
  const errors = {}
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const regexPassword = /^.{5,100}$/

  if (!email) errors.email = "Please enter an email"
  else if (!regexEmail.test(email)) errors.email = "Please enter a valid email"

  if (!password) errors.password = "Please enter a password"
  else if (!regexPassword.test(password))
    errors.password = "Password must be between 5 and 100 characters"

  return errors
}

export const validateSignUp = (form) => {
  const email = form.email.trim() ?? ""
  const name = form.name.trim() ?? ""
  const password = form.password ?? ""
  const password2 = form.password2 ?? ""
  const errors = {}
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) errors.email = "Please enter an email"
  else if (!regexEmail.test(email)) errors.email = "Please enter a valid email"

  if (!name) errors.name = "Please enter a name"

  if (!password) errors.password = "Please enter a password"
  else if (password.length < 5 || password.length > 100) {
    errors.password = "Password must be between 5 and 100 characters"
  } else if (!hasUppercase(password)) {
    errors.password = "Password must include at least 1 uppercase letter"
  } else if (countDigits(password) < 2) {
    errors.password = "Password must include at least 2 numbers"
  }

  if (!password2) errors.password2 = "Please confirm your password"
  else if (password && password2 !== password) {
    errors.password2 = "Passwords do not match"
  }

  return errors
}

const hasUppercase = (s) => /[A-Z]/.test(s)
const countDigits = (s) => (s.match(/\d/g) || []).length
