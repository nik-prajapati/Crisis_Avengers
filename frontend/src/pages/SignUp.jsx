import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useEffect } from 'react';

const SignUp = () => {
    const [loginError, setLoginError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        description: '',
        phonesNumbers: [],
        address: '',
        type: ''
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
        // try {
        //     const response = await axios.post('http://localhost:3000/signup', formData);
        //     if (response.data.error === false) {
        //        alert('SignUp successful');
        //       console.log('Signup successful');
        //     } else {
        //       setError(response.data.message);
        //     }
        //   } catch (error) {
            //    window.alert('Login Error: ' + error.message);
            //   window.location.reload(true);
            //     console.error('Error during signup:', error);
        //   }
    };

    const handleAddPhone = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            phonesNumbers: [...prevFormData.phonesNumbers, ''], // Add an empty string for a new phone number
        }));
    };

    const handleRemovePhone = (indexToRemove) => {
        const updatedPhones = formData.phonesNumbers.filter((_, index) => index !== indexToRemove);
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
        <div class="wrapper">
            <div class="company-info">
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
                        <select name="type" className='drop' value={formData.type} onChange={handleInputChange}>
                            <option value="">Select an option</option>
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
