import { useState } from "react"
import { dateParser } from "../utils/notesHelpers"
import { toastSuccess, toastError } from "../utils/toast"
import { getErrorMessage } from "../utils/getErrorMessage"
import "../styles/Note.css"

const noteLimits = {
  title: 100,
  content: 400,
}

export const Note = ({ note, onDelete, onEdit }) => {
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    title: note.title,
    content: note.content,
  })
  const charsRemaining = noteLimits.content - draft.content.length
  const noteEmpty = !draft.title.trim() && !draft.content.trim()
  const unchanged = draft.title === note.title && draft.content === note.content

  const handleChange = (e) => {
    const { name, value } = e.target
    const limit = noteLimits[name]

    if (limit && value.length > limit) return

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const startEdit = () => {
    setDraft({ title: note.title, content: note.content })
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setDraft({ title: note.title, content: note.content })
    setIsEditing(false)
  }

  const saveEdit = async () => {
    if (unchanged) {
      setIsEditing(false)
      return
    }
    setSaving(true)
    try {
      await onEdit(note.id, draft)
      toastSuccess("Note updated successfully")
      setIsEditing(false)
    } catch (err) {
      toastError(`Could not update note: ${getErrorMessage(err)}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="note">
      <div className="noteContent">
        {isEditing ? (
          <>
            <input
              className="editTitle"
              type="text"
              name="title"
              value={draft.title}
              onChange={handleChange}
              placeholder="Note title"
            />
            <textarea
              className="editContent"
              spellCheck="false"
              name="content"
              value={draft.content}
              cols="30"
              rows="10"
              onChange={handleChange}
              placeholder="Note content"
            />
          </>
        ) : (
          <>
            <span className="title">{note.title}</span>
            <p className="content">{note.content}</p>
          </>
        )}
      </div>
      <div className="noteFooter">
        <small>
          {isEditing ? `${charsRemaining} Remaining` : dateParser(note.date)}
        </small>
        <div className="noteButtonContainer">
          {isEditing ? (
            <>
              <button
                className="actionButton"
                type="button"
                onClick={cancelEdit}
                disabled={saving}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <button
                className="actionButton"
                type="button"
                onClick={saveEdit}
                disabled={saving || noteEmpty}
              >
                <i className="fa-solid fa-check"></i>
              </button>
            </>
          ) : (
            <>
              <button
                className="actionButton"
                onClick={startEdit}
                type="button"
              >
                <i className="fa-solid fa-pen"></i>
              </button>
              <button
                className="actionButton"
                onClick={() => onDelete(note.id)}
                type="button"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
