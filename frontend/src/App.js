import React from 'react';
import './styles/Globals.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Logs from './pages/Logs';
import Export from './pages/Export';
import Import from './pages/Import';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Logs" element={<Logs />}></Route>
          <Route path="/Export" element={<Export />}></Route>
          <Route path="/Import" element={<Import />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
