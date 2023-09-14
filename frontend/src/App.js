import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Landingpage from "./pages/LandingPage";
import Map from "./pages/Map";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/home" element={<Landingpage user={user} />} />      
          <Route path="/request" element={<Map user={user} />} />      
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;