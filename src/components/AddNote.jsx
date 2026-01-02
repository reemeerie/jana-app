import { useState } from "react"
import axios from "axios"
import "../styles/AddNote.css"

const AddNote = () => {
  const baseUrl = "https://jana-api.vercel.app/api/notes"
  const date = new Date()
  const token = JSON.parse(window.localStorage.getItem("token"))
  const contentLimit = 400
  const titleLimit = 100

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "title" && titleLimit - value.length >= 0) {
      setNote((prev) => {
        return { ...prev, [name]: value }
      })
    }
    if (name === "content" && contentLimit - value.length >= 0) {
      setNote((prev) => {
        return { ...prev, [name]: value }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let day = date.getDate()
    const month = date.getMonth() + 1
    let year = date.getFullYear()
    let actualDate = `${year}-${month}-${day}`
    note.date = actualDate

    try {
      await axios.post(baseUrl, note, config)
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="note new">
          <div className="newNoteContent">
            <input
              spellCheck="false"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Note title"
              value={note.title}
            />
            <textarea
              spellCheck="false"
              name="content"
              cols="30"
              rows="10"
              onChange={handleChange}
              placeholder="Note content"
              value={note.content}
            ></textarea>
          </div>
          <div className="noteFooter">
            <small>{contentLimit - note.content.length} Remaining</small>
            <button type="submit" className="save">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddNote
