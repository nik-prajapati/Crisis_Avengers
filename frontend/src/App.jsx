import React, { useState } from "react";
import {
  // BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import SignUp from "./pages/rescue_signup/SignUp";
import GovtLogin from "./pages/govtLogin/GovtLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import Landingpage from "./pages/home/LandingPage";
import Map from "./pages/request/Map";
import RescueLogin from "./pages/rescueLogin/RescueLogin";
import MapPage from "./pages/request/MapPage";
import ReviewRequest from './pages/review request/ReviewRequest'
import { createContext } from "react";
import AuthContext from "./context/AuthContext";
import reviewContext from "./context/ReviewRequestContext";

function App() {
  const [user, setUser] = useState(null);
  console.log(user)
  const [reviewData,setReviewData]=useState([1,2])


  return (
    
    <BrowserRouter>
      <div className="App">
      <reviewContext.Provider value={{reviewData,setReviewData}}>
        <Routes>
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          <Route path="/govtlogin" element={<GovtLogin setUser={setUser} />} />
          <Route path="/rescue" element={<RescueLogin setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/" element={<Landingpage user={user} />} />
          <Route path="/home" element={<Landingpage user={user} />} />
          <Route path="/request" element={<MapPage user={user} />} />
          <Route path="/review" element={<ReviewRequest user={user} />} />

        </Routes>
        </reviewContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;