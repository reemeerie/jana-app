import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import NotesPage from "./pages/NotesPage"
import SignUpPage from "./pages/SignUpPage"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
