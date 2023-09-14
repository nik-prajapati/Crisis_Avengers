import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: '1',
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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.error === true) {
        console.log("Login error", response.data.message);
      } else {
        console.log("Logged in succesfully");
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
              Don't have an account? <a href='/signup'>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
