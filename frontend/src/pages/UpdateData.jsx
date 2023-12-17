import React, { useState } from 'react';
import './UpdateData.css';
import SideBar from './request/SideBar';
import MapPageHeader from './request/MapPageHeader';

const UpdateData = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <MapPageHeader/>
      <div className={isModalOpen?'page_blur':'page'}>
        <SideBar />
        <main>
          <div className="tab" style={{ overflowX: 'auto' }}>
            <table>
              <tr>
                <th>TYPE</th>
                <th>NAME</th>
                <th>QUANTITY</th>
                <th>UNITS</th>
                <th>STATUS</th>
              </tr>

              <tr>
                <td>Bed</td>
                <td>Bed</td>
                <td>Bed</td>
                <td>Bed</td>
                <td>
                  <button className="res" onClick={openModal}>
                    Update
                  </button>
                </td>
              </tr>
              <tr>
                <td>Bed</td>
                <td>Bed</td>
                <td>Bed</td>
                <td>Bed</td>
                <td>
                  <button className="res" onClick={openModal}>
                    <i className="bi bi-pencil"></i>Update
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </main>
      </div>


      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
    <span className="close-btn" onClick={closeModal}>&times;</span>
      <select >
        <option disabled selected>Select type</option>
        <option >Bed</option>
        <option >Medical</option>
        <option  >Food</option>
        <option >Boats</option>
      </select>



      <input type="text" className='modal_input' placeholder="Enter the name"/>

      <input  type="number" className='modal_input' id="quantity" name="quantity" placeholder="Quantity"/>

      <input  type="number"className='modal_input' id="units" name="units" placeholder="Units"/>
      <button className="submit_data">
                   Commit Changes
                  </button>
    </div>
  </div>
)}
    </div>
  );
};

export default UpdateData;