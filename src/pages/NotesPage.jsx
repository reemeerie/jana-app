import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { Note } from "../components/Note"
import { AddNote } from "../components/AddNote"
import { Spinner } from "../components/Spinner"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { deleteNote, editNote, getNotes } from "../utils/notesHelpers"
import { toastSuccess, toastError } from "../utils/toast"
import { getErrorMessage } from "../utils/getErrorMessage"
import "../styles/NotesPage.css"

export const NotesPage = () => {
  const [token] = useLocalStorage("token")
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleCreate = (createdNote) => {
    setNotes((prev) => [...prev, createdNote])
  }

  const handleDelete = async (id) => {
    try {
      await deleteNote(id, token)
      setNotes((prev) => prev.filter((note) => note.id !== id))
      toastSuccess("Note deleted successfully")
    } catch (err) {
      toastError(`Could not delete note: ${getErrorMessage(err)}`)
    }
  }

  const handleEdit = async (id, note) => {
    const updatedNote = await editNote(id, token, note)
    setNotes((prev) => prev.map((n) => (n.id === id ? updatedNote : n)))
  }

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const fetchedNotes = await getNotes(token)
      setNotes(fetchedNotes)
    } catch (err) {
      setError(`Error fetching notes: ${getErrorMessage(err)}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/")
      return /* return implicito para no ejecutar fetch */
    }
    fetchNotes()
  }, [token, navigate])

  return (
    <>
      <Header />
      <div className="notesMain">
        {loading ? (
          <Spinner size={50} color="#ccab0a" />
        ) : (
          <div className={`notes ${notes.length == 0 ? "empty" : "multi"}`}>
            {notes.map((note) => (
              <Note
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
            {!error && <AddNote onCreate={handleCreate} />}
          </div>
        )}
        {error && <div className="fetchError">{error}</div>}
      </div>
    </>
  )
}
