import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Notes.css"
import NotesList from "../components/NotesList"

const Notes = () => {
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

export default Notes
