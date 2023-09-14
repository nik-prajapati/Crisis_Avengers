import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import Map from './pages/Map'
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/home" element={<Landing/>} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
