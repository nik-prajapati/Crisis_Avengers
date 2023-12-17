import React, { useState } from "react";
import "./SignUp.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apadalogo from '../../image/aapdalogo.jpg'
import rescueimg from "../../image/Rsignup.png";
import apadalogo from "../../image/aapdalogo.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    description: "",
    phonesNumbers: [],
    address: "",
    type: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          setFormData({
            ...formData,
            location: location,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      console.log(response)
      if (response.data.error === false) {
        alert("SignUp successful");
        console.log("Signup successful");
        navigate("/");
      } else {
        setError(response.data.message);

        setTimeout(()=>{
          setError(null)
        },3000)
      }
    } catch (error) {
      window.alert("Login Error: " + error.message);
      window.location.reload(true);
      console.error("Error during signup:", error);
    }
  };

  const handleAddPhone = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phonesNumbers: [...prevFormData.phonesNumbers, ""], // Add an empty string for a new phone number
    }));
  };

  const handleRemovePhone = (indexToRemove) => {
    const updatedPhones = formData.phonesNumbers.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({
      ...formData,
      phonesNumbers: updatedPhones,
    });
  };

  const handlePhoneChange = (e, index) => {
    const updatedPhones = [...formData.phonesNumbers];
    updatedPhones[index] = e.target.value;
    setFormData({
      ...formData,
      phonesNumbers: updatedPhones,
    });
  };
  return (
    <div className="main-box">
      <div className="left">
      <div className="left-head">
          <div className="glass-container">
            <div className="left-glass">
              <img
                src={apadalogo}
                style={{ width: "50px", height: "40px" }}
              ></img>
            </div>
            <p>
              <strong>apadaRelief</strong>
            </p>
          </div>

          <div className="tagline">ONE NETWORK,COUNTLESS HEROES</div>

          <div className="glass-container2">
            <div className="left-glass"></div>
            <p>
              <strong>
                Register and Connect with our community
              </strong>
            </p>
          </div>
        </div>

      </div>

      <div className="right">
        <div className="contact">
          <form>
            <div className="right-box">
              <p>
                <label>Name </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name of your organisation"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email id"
                />
              </p>
              <p>
                <label>Password </label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Set a strong password"
                />
              </p>

              <p>
                <label>Address </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your postal address"
                />
              </p>
            </div>

            <div className="mid">
              <p>
                <label>Select your Category:</label>
                <select
                  name="type"
                  className="drop"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="NDRF">NDRF</option>
                  <option value="SDRF">SDRF</option>
                  <option value="NGO">NGO</option>
                </select>
              </p>
              <p>
                <label>Enter phone number:</label>
                {formData.phonesNumbers.map((phone, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name={`phone${index}`}
                      value={phone}
                      onChange={(e) => handlePhoneChange(e, index)}
                      placeholder="Enter a phone number"
                    />
                    <button className="removebtn" onClick={() => handleRemovePhone(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button className="addbtn" type="button" onClick={handleAddPhone}>
                  Add Contact No.
                </button>
              </p>
            </div>

            <p class="full">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                placeholder="Decscribe your organisation in less than 50 words"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </p>
            <p>
              <button className="registerbtn" onClick={handleSubmit}>REGISTER</button>
            </p>
          </form>
        </div>
      </div>
      {
        error && <div>{error}</div>
      }
    </div>
  );
};

export default SignUp;
