import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import GovtLogin from "./pages/GovtLogin";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Map from "./pages/Map";
import RescueLogin from "./pages/RescueLogin";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LandingPage user={user} />} />
          <Route path='/signup' element={<SignUp setUser={setUser} />} />
          <Route path='/govt' element={<GovtLogin setUser={setUser} />} />
          <Route path='/rescue' element={<RescueLogin setUser={setUser} />} />
          <Route path='/dashboard' element={<Dashboard user={user} />} />
          {/* <Route path='/home' element={<Landingpage user={user} />} /> */}
          <Route path='/request' element={<Map user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
