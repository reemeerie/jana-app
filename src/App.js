import Navbar from './components/Navbar';
import Login from './components/Login';
import Notes from './components/Notes';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignUp from './components/SignUp';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
