import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Landingpg from "./pages/landingpg/Landingpg.js";
// import GovtLogin from "./pages/govtLogin/GovtLogin.js";
// import "./App.css";
// import GovtSignUp from "./pages/govtSignup/GovtSignup.js";
import GovtLanding from "./pages/govtLanding/GovtLanding.js";

import SignUp from './pages/SignUp';
import RescueLogin from './pages/RescueLogin';
import GovtLogin from './pages/GovtLogin';
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<Outlet/>}/>
          <Route index element={<Landingpg />}/>
          <Route path="/govtLogin" element={<GovtLogin/>}/>
          <Route path="/rescueLogin" element={<RescueLogin/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/govtlanding" element={<GovtLanding/>}/>
          <Route path="/abc" element={<Dashboard/>}/>


        </Routes>
      </Router>
    

      
      
    </>
  );
}

export default App;
