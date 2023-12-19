import React, { useState, useEffect } from "react";
import "./MapRequestForm.scss";
import axios from "axios";


const MapRequestForm = () => {
  const [agencies, setAgencies] = useState(null);
  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        `http://localhost:3000/getagencies?latitude=${latitude}&longitude=${longitude}&radius=30000000`,
        { withCredentials: true }
      );
    })();
  }, []);
  
  const [selectedResource, setSelectedResource] = useState("");
  const [addedResources, setAddedResources] = useState([]);
  const [subtypearray, setsubtypearray] = useState([]);
  const [subtype, handlesubtype] = useState("");
  const [dist, getdist] = useState(0);
  const [quantity, getquant] = useState(0);

  const resourceOptions = {
    Food: ["Food packets", "Bottled water", "Ready-to-eat meals"],
    "Rescue tolls": ["Rescue personnel", "Ropes", "Ladders", "Cutting tools"],
    Shelter: ["Tents", "Beds"],
    Medical: [
      "First aid kits",
      "Pain relievers",
      "Ambulances",
      "Medical personnel",
      "Stretchers",
    ],
  };

  const handletypeSelect = (e) => {
    setSelectedResource(e.target.value);
  };

  const handlesubtypechange = (e) => {
    const val = e.target.value;
    handlesubtype(val);
    console.log(subtype);
    setsubtypearray([...subtypearray, val]);
  };

  useEffect(() => {
    console.log("subtypearray:", subtypearray);
  }, [subtypearray]);

  return (
    <div className='req_form'>
      <h2>Filters</h2>
      <div className='req_form_box'>
        <h3>Your request</h3>
        <div className='input-section'>
          <div className='input-title'>
            <h4>Select resource</h4>
          </div>
          <select
            name='type'
            onChange={handletypeSelect}
            value={selectedResource}
          >
            <option value=''>Select Resource</option>
            <option>Food</option>
            <option>Rescue tolls</option>
            <option>Shelter</option>
            <option>Medical</option>
          </select>
        </div>

        <div className='input-section'>
          <select
            name='additionalSelect'
            onChange={handlesubtypechange}
            value={subtype}
          >
            <option value=''>Select Additional Option</option>
            {selectedResource &&
              Object.keys(resourceOptions).map(
                (type) =>
                  selectedResource === type && (
                    <optgroup key={type} label={type}>
                      {resourceOptions[type].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </optgroup>
                  )
              )}
          </select>
          <br />

          <div className='input-section'>
            Distance
            <input type='number' />
          </div>
          <div className='input-section'>
            Quantity
            <input type='number' />
          </div>
        </div>

        <button
          className='submit_data'
          onClick={() => alert("Please select from dropdown list")}
        >
          Add Resource
        </button>

        <div className='input-section'>
          <h4>Requested resources</h4>
          <p>{subtypearray.join("\n")}</p>
        </div>
      </div>
    </div>
  );
};

export default MapRequestForm;
