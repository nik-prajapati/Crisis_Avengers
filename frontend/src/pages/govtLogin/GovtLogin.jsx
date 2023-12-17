import React, { useState } from "react";
import "./GovtLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const GovtLogin = ({ setUser }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "0",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.error === true) {
        setLoginError(response.data.message);
        alert(response.data.message);
        window.location.reload(true);
        console.log("Login error", response.data.message);
      } else {
        navigate("/home");
        alert("Logged in Successfully");
        console.log("Logged in succesfully");
      }
    } catch (error) {
      if (error.response.status === 403) {
        alert("Wrong password");
        // window.location.reload(true);
      } else {
        alert('Login error: check console');
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className='outermainc'>
      <div className='main'>
        <div className='right-container'>
          <div className='right-container__box'>
            <div className='right-container-box'>
              <h2 className='right-container__h2'>LOGIN</h2>
              <p className='right-container__p'>
                Enter your email and password to sign in
              </p>
            </div>
            <div className='input-container'>
              <label htmlFor='email' className='right-container__label'>
                Email
              </label>
              <input
                type='text'
                className='right-container__input'
                name='email'
                placeholder='Your email address'
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor='password' className='right-container__label'>
                Password
              </label>
              <input
                type='password'
                className='right-container__input'
                name='password'
                placeholder='Your password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <br />
            <button className='btn' onClick={handleSubmit}>
              LOGIN
            </button>
            <p className='right-container__bottom-text'>
              Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovtLogin;