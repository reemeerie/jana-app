import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { LoginPage } from "./pages/LoginPage"
import { NotesPage } from "./pages/NotesPage"
import { SignUpPage } from "./pages/SignUpPage"
import "./App.css"

function App() {
  return (
    <>
      <Router>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#0f172a",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "14px",
            },
          }}
        />
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
