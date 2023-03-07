import React from 'react'
import '../styles/Note.css'
import axios from 'axios'

const Note = ({note}) => {
  const date = new Date(note.date)
  let day = date.getDate()
  const month = date.getMonth() + 1
  let year = date.getFullYear()
  let actualDate = `${day}-${month}-${year}`
  const token = JSON.parse(window.localStorage.getItem('token'))

  const handleDelete = () => {
    const url = `https://jana-api.vercel.app/api/notes/${note.id}` 
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }
    try {
      axios.delete(url, config)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='note'>
        <div className='noteContent'>
            <span className='title'>{note.title}</span>
            <p className='content'>{note.content}</p>
        </div>
        <div className='noteFooter'>
            <small>{actualDate}</small>
            <button className='delete' onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
        </div>
    </div>
  )
}

export default Note