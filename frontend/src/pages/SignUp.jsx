import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useEffect } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        description: '',
        phones: [],
        loaction: '',
        address: '',
    });

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
                    const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    setFormData({
                        ...formData,
                        location: location,
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported in this browser.');
        }
    };
    useEffect(() => {
        getCurrentLocation();
    }, []);


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

    const handlePhoneInputChange = (event, index) => {
        const newPhones = [...formData.phones];
        newPhones[index] = event.target.value;

        setFormData({
            ...formData,
            phones: newPhones,
        });
    };

    const removePhoneInput = (index) => {
        const newPhones = [...formData.phones];
        newPhones.splice(index, 1);

        setFormData({
            ...formData,
            phones: newPhones,
        });
    };
    const addPhoneInput = () => {
        setFormData({
            ...formData,
            phones: [...formData.phones, ''],
        });
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
                            <label htmlFor="name" className="right-container__label">Name :</label>
                            <input
                                type="text"
                                className="right-container__input"
                                name="name"
                                placeholder="Name of your organisation"
                                value={formData.name}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="email" className="right-container__label">Email id:</label>
                            <input
                                type="email"
                                className="right-container__input"
                                name="email"
                                placeholder="Email id"
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
                            <div className="input-container">
                            <label className="right-container__label">Phone Numbers:</label>
                            {formData.phones.map((phone, index) => (
                                <div key={index} className="phone-input">
                                    <input
                                        type="text"
                                        className="right-container__input"
                                        name={`phone-${index}`}
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => handlePhoneInputChange(e, index)}
                                    />
                                    <button type="button" onClick={() => removePhoneInput(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" onClick={addPhoneInput}>Add Phone Number</button>
                        </div>
                            <label htmlFor="address" className="right-container__label">Address:</label>
                            <input
                                type="text"
                                className="right-container__input box"
                                name="address"
                                placeholder="Describe your organisation"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="decription" className="right-container__label">Description:</label>
                            <input
                                type="text"
                                className="right-container__input box"
                                name="description"
                                placeholder="Describe your organisation"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <br />
                        <br />
                        <button className="btn" onClick={handleSubmit}>SIGN UP</button>
                        <p className="right-container__bottom-text">Already have an account? <a href='/login'>Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
