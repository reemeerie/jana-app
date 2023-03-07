import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Note from './Note'
import '../styles/NotesList.css'
import AddNote from './AddNote'
import { Spinner } from 'react-bootstrap'

const NotesList = () => {
  const [notes, setNotes] = useState({})
  const token = JSON.parse(window.localStorage.getItem('token'))
  useEffect(() => {
    const getNotes = async () => {
      const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
      const res = await axios.get('https://jana-api.vercel.app/api/notesByUserid', config)
      setNotes(res.data.data)
    }
    getNotes() 
  }, [token])

  return (
    <>
    {notes.length > 1 ? <div className='notes'>
                          {notes.map((note, key) => {
                            return <Note note={note} key={key}/>
                          })}
                            <AddNote/>
                          </div>
                        : 
                        <div className='spinnerCont'>
                          <Spinner animation='border' role='status' variant='light'>
                            <span className='visually-hidden'></span>
                          </Spinner>
                        </div>
                        }
    </>
  )
}

export default NotesList