import React, { useState } from 'react';
import '../styles/Login.css';
import axios from {axios};

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('/api/signup', formData);
            if (response.data.error === false) {
              console.log('Signup successful');
            } else {
              setError(response.data.message);
            }
          } catch (error) {
            console.error('Error during signup:', error);
            setError('An error occurred during signup.');
          }
    };

    return (
        <div className="outermain">
            <div className="main">
                <div className="left-container">
                </div>
                <div className="right-container">
                    <div className="right-container__box">
                        <div className="right-container-box">
                            <h2 className="right-container__h2">Welcome to our Community</h2>
                            <p className="right-container__p">Enter your email and password to Sign Up</p>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email" className="right-container__label">Email</label>
                            <input
                                type="text"
                                className="right-container__input"
                                name="email"
                                placeholder="Your email address"
                                value={formData.email}
                                onChange={handleInputChange} 
                            />
                            <label htmlFor="password" className="right-container__label">Password</label>
                            <input
                                type="password"
                                className="right-container__input"
                                name="password"
                                placeholder="Your password"
                                value={formData.password}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <br/>
                        <br/>
                        <button className="btn" onClick={handleSubmit}>SIGN UP</button>
                        <p className="right-container__bottom-text">Already have an account? <a href='/login'>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
