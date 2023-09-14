import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useEffect } from 'react';
import axios  from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        description: '',
        phones: [],
        address: '',
        type: ''
    });
    const [error, setError] = useState('');

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

    const handleAddPhone = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            phones: [...prevFormData.phones, ''], // Add an empty string for a new phone number
        }));
    };

    const handleRemovePhone = (indexToRemove) => {
        const updatedPhones = formData.phones.filter((_, index) => index !== indexToRemove);
        setFormData({
            ...formData,
            phones: updatedPhones,
        });
    };

    const handlePhoneChange = (e, index) => {
        const updatedPhones = [...formData.phones];
        updatedPhones[index] = e.target.value;
        setFormData({
            ...formData,
            phones: updatedPhones,
        });
    };
    return (
        <div class="wrapper animated bounceInLeft">
            <div class="company-info">
                <h3></h3>
                <ul>
                </ul>
            </div>
            <div className="contact">
                <h1 className='head'>Register and Connect with Our Community</h1>
                <br />
                <form>
                    <p>
                        <label>Name </label>
                        <input type="text" name="name"
                            placeholder='Name of your organisation'
                            value={formData.name}
                            onChange={handleInputChange} />
                    </p>
                    <p>
                        <label>Email</label>
                        <input type="email" name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Enter your email id'
                        />
                    </p>
                    <p>
                        <label>Password :</label>
                        <input type="text" name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='Set a strong password' />
                    </p>

                    <p>
                        <label>Address :</label>
                        <input type="text" name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder='Enter your postal address'
                        />
                    </p>

                    <p>
                        <label>Select your Category:</label>
                        <select name="type" className='drop'>
                            <option value="">Select an option</option>
                            <option value={formData.type}>Canada</option>
                            <option value={formData.type}>United Kingdom</option>
                            <option value={formData.type}>Australia</option>
                        </select>
                    </p>
                    <p>
                        <label>Enter phone number:</label>
                        {formData.phones.map((phone, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name={`phone${index}`}
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(e, index)}
                                    placeholder="Enter a phone number"
                                />
                                <button onClick={() => handleRemovePhone(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddPhone}>Add Phone</button>
                    </p>

                    <p class="full">
                        <label>Description</label>
                        <textarea name="description" rows="5"
                            placeholder='Decscribe your organisation in less than 50 words'
                            value={formData.description}
                            onChange={handleInputChange}></textarea>
                    </p>
                    <p class="full">
                        <button onClick={handleSubmit}>Submit</button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
