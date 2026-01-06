import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

/* NotesPage helpers */

export const getNotes = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const { data } = await axios.get(`${baseurl}/notesByUserid`, config)

  return data.data
}

/* Note helpers */

export const deleteNote = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  await axios.delete(`${baseurl}/notes/${id}`, config)

  return
}

export const dateParser = (noteDate) => {
  const date = new Date(noteDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

/* AddNote helpers */

export const addNote = async (note, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const { data } = await axios.post(`${baseurl}/notes`, note, config)

  return data.data
}

/* EditNote helpers */

export const editNote = async (id, token, note) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const { data } = await axios.patch(`${baseurl}/notes/${id}`, note, config)

  return data.data
}