import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { NotesList } from "../components/NotesList"
import "../styles/Notes.css"

export const NotesPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  return (
    <>
      <div className="notesMain">
        <NotesList />
      </div>
    </>
  )
}
