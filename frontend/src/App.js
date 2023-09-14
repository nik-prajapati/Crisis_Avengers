import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import GovtLogin from './pages/GovtLogin';
import Dashboard from './pages/Dashboard'
import UpdateData from './pages/UpdateData';
import RescueLogin from './pages/RescueLogin';
function App() {
  return (
    <Router>
    {/* <Navbar/> */}
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/rescuelogin" element={<RescueLogin/>} />
          <Route path="/govtlogin" element={<GovtLogin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/update" element={<UpdateData/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
