import React, { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import '../styles/Navbar.css'

const Navbar = () => {
  const [token] = useLocalStorage('token', null)
   
  useEffect(() => {

  }, [token])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.location.href = '/'
  }
  
  return (
    <>
    <nav className={!token ? "loginNavbar": 'navbarr'}>
      <div className={!token ? "navLoginContainer": 'navContainer'}>
        <div className='brand'>Just Another <p className='yell'>Notes</p> App</div>
      </div>
      {token ?
      <div className='logOutContainer'>
        <button onClick={handleLogout} className='logOut'><i className="fa-solid fa-right-from-bracket"></i></button>
      </div>
      : <></>}
    </nav>
    <div className='fakeNav'></div>
    </>
  )
}

export default Navbar