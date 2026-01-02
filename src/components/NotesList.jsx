import { useEffect, useState } from "react"
import axios from "axios"
import Note from "./Note"
import "../styles/NotesList.css"
import AddNote from "./AddNote"
import { Spinner } from "react-bootstrap"

const NotesList = () => {
  const [notes, setNotes] = useState({})
  const [loading, setLoading] = useState(true)

  const token = JSON.parse(window.localStorage.getItem("token"))
  useEffect(() => {
    const getNotes = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      try {
        const res = await axios.get(
          "https://jana-api.vercel.app/api/notesByUserid",
          config
        )
        setNotes(res.data.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getNotes()
  }, [token])

  return (
    <>
      {!loading ? (
        <div className="notes">
          {notes.map((note, key) => {
            return <Note note={note} key={key} />
          })}
          <AddNote />
        </div>
      ) : (
        <div className="spinnerCont">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      )}
    </>
  )
}

export default NotesList
