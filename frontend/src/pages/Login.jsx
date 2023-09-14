import React, { useState } from "react";
import "../styles/Login.css";
import { useCookies } from "react-cookie";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";


const Login = ({setUser}) => {
  
  const navigate=useNavigate()
  const [_, setCookie] = useCookies(["token"]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
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
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      
      if (response.data.error === false) {
        // no need of this, we are using a httpOnly cookie
        // setCookie("token", response.data.token, { path: "/" });
        // console.log("Token stored in cookie:", response.data.token);
        setUser(response.data.user)
        navigate("/home")

      } else {
        console.error("Login error:", response.data.message);

      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className='outermain'>
      <div className='main'>
        <div className='left-container'></div>
        <div className='right-container'>
          <div className='right-container__box'>
            <div className='right-container-box'>
              <h2 className='right-container__h2'>Welcome to our community</h2>
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
              <label htmlFor='role' className='right-container__label'>
                Role
              </label>
              <input
                type='text'
                className='right-container__input'
                name='role'
                placeholder='Role'
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <br />
            <button className='btn' onClick={handleSubmit}>
              LOGIN
            </button>
            <p className='right-container__bottom-text'>
              Don't have an account? <a href='/signup'>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
