import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateData.css';
<<<<<<< HEAD:frontend/src/pages/UpdateData.jsx
import SideBar from './request/SideBar';
import MapPageHeader from './request/MapPageHeader';
import Loader from './Loader'; // Import your Loader component
=======
import SideBar from '../request/SideBar';
import MapPageHeader from '../request/MapPageHeader';
>>>>>>> a0a8a243f2b3d695568f4e1e3ffdc26c4da797a5:frontend/src/pages/resource/UpdateData.jsx

const UpdateData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    _id: '',
    type: '',
    name: '',
    quantity: 0,
    unit: ''
  });

  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loader state
  const commitChanges = async (id) => {
    try {
      console.log("Identity", id);
      const updatedFormData = {
        ...formData,
        _id: id
      };
      console.log(formData);
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/updateresources",
        updatedFormData,
        {
          withCredentials: true
        }
      );
      console.log(response);
      closeModal();
      setIsLoading(false); // Set loading to false when the operation is complete
    }
    catch (error) {
      console.log(error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const apiUrl = 'http://localhost:3000/getresources';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        console.log(response.data);
        const allObjectIds = response.data.resources.map(resource => resource._id);
        console.log("All Object IDs:", allObjectIds);

        setResources(response.data.resources);
        setIsLoading(false); // Set loading to false when the data is fetched
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  const openModal = (objectId) => {
    setIsModalOpen(true);
    setSelectedObjectId(objectId);
  };
  const addData = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <MapPageHeader />
      <div className={isModalOpen || isLoading ? 'page_blur' : 'page'}>
        <SideBar />
        <main>
          {isLoading && <Loader />} {/* Render loader when isLoading is true */}
          <div className="tab" style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>NAME</th>
                  <th>QUANTITY</th>
                  <th>UNITS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {resources.map(resource => (
                  <tr key={resource._id}>
                    <td>{resource.type}</td>
                    <td>{resource.name}</td>
                    <td>{resource.quantity}</td>
                    <td>{resource.unit}</td>
                    <td>
                      <button
                        className="res"
                        onClick={() => openModal(resource._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      className="res"
                      onClick={() => addData()}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option disabled defaultValue>Select type</option>
              <option>Bed</option>
              <option>Medical</option>
              <option>Food</option>
              <option>Boats</option>
            </select>

            <input
              type="text"
              name="name"
              className='modal_input'
              placeholder="Enter the name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              className='modal_input'
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className='modal_input'
              id="unit"
              name="unit"
              placeholder="Units"
              value={formData.unit}
              onChange={handleInputChange}
            />
            <button
              className="submit_data"
              onClick={() => commitChanges(selectedObjectId)}
            >
              Commit Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateData;