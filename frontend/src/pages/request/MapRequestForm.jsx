import React, { useState, useEffect } from "react";
import "./MapRequestForm.scss";
import axios from "axios";

const MapRequestForm = ({
  subtypearray,
  setsubtypearray,
  agencies,
  filteredAgencies,
  setFilteredAgencies,
}) => {
  const [selectedResource, setSelectedResource] = useState("");
  const [subtype, handlesubtype] = useState("");
  const [quantity, getquant] = useState(0);

  const resourceOptions = {
    Food: ["Food packets", "Bottled water", "Ready-to-eat meals"],
    "Rescue tools": ["Rescue personnel", "Ropes", "Ladders", "Cutting tools"],
    Shelter: ["Tents", "Beds"],
    Medical: [
      "First aid kits",
      "Pain relievers",
      "Ambulances",
      "Medical personnel",
      "Stretchers",
    ],
  };

  useEffect(() => {
    console.log("subtypearray:", subtypearray);
  }, [subtypearray]);

  return (
    <div className="req_form">
      <h2>Your Request</h2>
      <div className="req_form_box">
        <div className="input-section">
          <div className="input-title">
            <h4>Select resource type</h4>
          </div>
          <select
            name='type'
            onChange={(e) => {
              setSelectedResource(e.target.value);
              console.log(e.target.value);
            }}
            value={selectedResource}
          >
            <option value="">Select Resource</option>
            <option value="Food">Food</option>
            <option value="Rescue tools">Rescue tools</option>
            <option value="Shelter">Shelter</option>
            <option value="Medical">Medical</option>
          </select>
        </div>

        <div className="input-section">
          <h4>Select resource Subtype:</h4>
          <select
            name="additionalSelect"
            onChange={(e) => handlesubtype(e.target.value)}
            value={subtype}
          >
            {selectedResource &&
              resourceOptions[selectedResource].map((val, idx) => {
                return (
                  <option value={val} key={idx}>
                    {val}
                  </option>
                );
              })}
          </select>
          <br />

          <div
            className="input-section"
            value={quantity}
            onChange={(e) => getquant(e.target.value)}
          >
            Quantity
            <input type="number" style={{ height: '35px' }} />
          </div>
        </div>
        <br />
        <button
          className="submit_data"
          onClick={() => {
            if (selectedResource === "" || subtype === "" || quantity === 0) {
              alert("Please enter a valid request");
            } else {
              setsubtypearray([
                ...subtypearray,
                {
                  type: selectedResource,
                  name: subtype,
                  qty: quantity,
                },
              ]);
            }
            setSelectedResource("");
            handlesubtype("");
            getquant(0);
          }}
        >
          Add Resource
        </button>

        {/* <div className='input-section'>
          <h4>Requested resources</h4>
          <p>{subtypearray && subtypearray.map((arr)=>{
            return <div style={{'display':'flex','justifyContent':'space-around'}}>
              <p>{arr.type}</p>
              <p>{arr.name}</p>
              <p>{arr.qty}</p>

            </div>
          })}</p>
        </div> */}

        <div className="input-section">
          <h4 className="resource-title" style={{marginTop:'20px',marginBottom:'-15px'}}>Requested resources</h4>
          <table style={{borderRadius:'20px'}}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Subtype</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {subtypearray &&
                subtypearray.map((arr, index) => (
                  <tr key={index}>
                    <td>{arr.type}</td>
                    <td>{arr.name}</td>
                    <td>{arr.qty}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MapRequestForm;
