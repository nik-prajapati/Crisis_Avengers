import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  
} from "react-router-dom";
import Landingpg from "./pages/landingpg/Landingpg.js";
import GovtLogin from "./pages/govtLogin/GovtLogin.js";
import "./App.css";
import GovtSignUp from "./pages/govtSignup/GovtSignup.js";
import GovtLanding from "./pages/govtLanding/GovtLanding.js";




function App() {
  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<Outlet/>}/>
          <Route index element={<Landingpg />}/>
          <Route path="/govtLogin" element={<GovtLogin/>}/>
          <Route path="/rescueLogin" element={<GovtLogin/>}/>
          <Route path="/signUp" element={<GovtSignUp/>}/>
          <Route path="/govtlanding" element={<GovtLanding/>}/>
          

        </Routes>
      </Router>
    

      
      
    </>
  );
}

export default App;
