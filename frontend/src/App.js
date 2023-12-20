import React from 'react';
import './styles/Globals.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Logs from './pages/Logs';
import Export from './pages/Export';
import Import from './pages/Import';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Logs" element={<Logs />}></Route>
          <Route path="/Export" element={<Export />}></Route>
          <Route path="/Import" element={<Import />}></Route>
          {/* <Route path="/sample-programs" element={<SamplePrograms />}></Route>
          <Route path="/your-logs" element={<YourLogs />}></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
