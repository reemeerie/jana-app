import { useState } from "react"
import { addNote } from "../utils/notesHelpers"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { toastError, toastSuccess } from "../utils/toast"
import { getErrorMessage } from "../utils/getErrorMessage"
import "../styles/AddNote.css"

const initialNote = {
  title: "",
  content: "",
}

const noteLimits = {
  title: 100,
  content: 400,
}

export const AddNote = ({ onCreate }) => {
  const [token] = useLocalStorage("token")
  const [note, setNote] = useState(initialNote)
  const [saving, setSaving] = useState(false)
  const charsRemaining = noteLimits.content - note.content.length
  const noteEmpty = !note.title.trim() && !note.content.trim()

  const handleChange = (e) => {
    const { name, value } = e.target
    const limit = noteLimits[name]

    if (limit && value.length > limit) return

    setNote((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitNote = async () => {
    setSaving(true)
    try {
      const createdNote = await addNote(note, token)
      onCreate(createdNote) // actualizo estado de notas con la nueva
      setNote(initialNote) // reseteo el estado para agregar otra nota
      toastSuccess("Note created successfully")
    } catch (err) {
      console.log(err)
      toastError(`Could not create note: ${getErrorMessage(err)}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <section>
        <div className="note new">
          <div className="newNoteContent">
            <input
              className="editTitle"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Note title"
              value={note.title}
            />
            <textarea
              className="editContent"
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
            <small>{charsRemaining} Remaining</small>
            <button
              className="actionButton"
              onClick={submitNote}
              type="button"
              disabled={noteEmpty || saving}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
