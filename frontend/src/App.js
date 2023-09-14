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
// import Map from "./pages/Map";
import Landing from "./pages/Landing";

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/home" element={<Landing user={user} />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;