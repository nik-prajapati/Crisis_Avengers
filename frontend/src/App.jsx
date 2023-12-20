import React, { useEffect, useState } from "react";
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
import ReviewRequest from "./pages/review request/ReviewRequest";
import UpdateData from "./pages/resource/UpdateData";
import { createContext } from "react";
import AuthContext from "./context/AuthContext";
import reviewContext from "./context/ReviewRequestContext";
import Chat from "./pages/chat/Chat";
import { useCookies } from "react-cookie";
import socket from "./helpers/socket";
import SendAlert from "./pages/sendalert/SendAlert";
function App() {
  const [user, setUser] = useState(null);
  // console.log(user);
  const [reviewData, setReviewData] = useState([1, 2]);
  const [Cookies, setCookies, removeCookies] = useCookies(["apadarelief"]);

  useEffect(() => {
    if (user) socket.emit("join-room", user.id);
  }, [user]);

  useEffect(() => {
    if (Cookies) {
      setUser(Cookies["apadarelief"]);
    }
  }, []);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation ) {
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = `${latitude},${longitude}`;
            setInterval(() => {
              // console.log(latitude);
              // console.log("emitted")
              socket.emit("update-location", user.id, location);
            }, 10000000);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    };

    getCurrentLocation();
  }, []);



  // console.log(user);

  return (
    <BrowserRouter>
      <div className="App">
        <reviewContext.Provider value={{ reviewData, setReviewData }}>
          <Routes>
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route
              path="/govtlogin"
              element={<GovtLogin setUser={setUser} />}
            />
            <Route path="/rescue" element={<RescueLogin setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/" element={<Landingpage user={user} />} />
            <Route path="/home" element={<Landingpage user={user} />} />
            <Route path="/request" element={<MapPage user={user} />} />
            <Route path="/review" element={<ReviewRequest user={user} />} />
            <Route path="/resource" element={<UpdateData user={user} />} />
            <Route path="/alert" element={<SendAlert user={user} />} />
            <Route
              path="/chat-page"
              element={<Chat name={user ? user.agencyDetails.name : ""} />}
            />
          </Routes>
        </reviewContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
