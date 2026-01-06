import { useNavigate } from "react-router-dom"
import "../styles/Header.css"

export const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <>
      <nav className="header">
        <div className="logo">
          Just Another <div className="yellow">Notes</div> App
        </div>

        <button onClick={handleLogout} className="logOut">
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </nav>
      <div className="fakeHeader"></div>
    </>
  )
}
