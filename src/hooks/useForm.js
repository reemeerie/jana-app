import { useLocalStorage } from "./useLocalStorage"
import { useState } from "react"
import axios from "axios"

export const useForm = (initialForm, validateForm, url) => {
    const [token, setToken] = useLocalStorage('token', null)
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const handleBlur = (e) => {
        handleChange(e)
        setErrors(validateForm(form))
    }
    
    const handleLogin = async (e) => {
        e.preventDefault()
        if (Object.keys(errors).length === 0) {
            try {
                const res = await axios.post(url, form)
                setToken(res.data.token)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        if (Object.keys(errors).length === 0) {
            try {
                const res = await axios.post(url, form)
                console.log(res.data.data)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return { form, errors, handleChange, handleBlur, handleLogin, token, handleSignup}
}