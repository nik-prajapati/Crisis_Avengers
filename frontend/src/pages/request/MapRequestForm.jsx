import React, { useState, useEffect } from 'react';
import './MapRequestForm.scss';

const MapRequestForm = () => {
  const [selectedResource, setSelectedResource] = useState('');
  const [addedResources, setAddedResources] = useState([]);
  // const [additionalSelectOptions, setAdditionalSelectOptions] = useState([]);
  const [subtypearray, setsubtypearray] = useState([]);
  const [subtype, handlesubtype] = useState('');

  const resourceOptions = {
    Food: ['Food packets', 'Bottled water', 'Ready-to-eat meals'],
    'Rescue tolls': ['Rescue personnel', 'Ropes', 'Ladders', 'Cutting tools'],
    Shelter: ['Tents', 'Beds'],
    Medical: ['First aid kits', 'Pain relievers', 'Ambulances', 'Medical personnel', 'Stretchers'],
  };

  const handletypeSelect = (e) => {
    setSelectedResource(e.target.value);
  };


  const handlesubtypechange = (e) => {
    const val = e.target.value;
    handlesubtype(val);
    console.log(subtype);
    setsubtypearray([...subtypearray, val]);
    // console.log(subtypearray);
  }

  const handleAddResource = () => {
    if (selectedResource.trim() !== '') {
      setAddedResources((prevResources) => [...prevResources, selectedResource]);
      setSelectedResource('');
    }
  };

  useEffect(() => {
    console.log('subtypearray:', subtypearray);
  }, [subtypearray]);


  return (
    <div className='req_form'>
      <h2>Filters</h2>
      <div className='input-section'>
        <div className='input-Title'>Select</div>
        <select name='type' onChange={handletypeSelect} value={selectedResource}>
          <option value=''>Select Resource</option>
          <option>Food</option>
          <option>Rescue tolls</option>
          <option>Shelter</option>
          <option>Medical</option>
        </select>
      </div>

      <div className='input-section'>
        <div className='input-Title'>Additional Select</div>
        <select
          name='additionalSelect'
          onChange={handlesubtypechange}
          value={subtype}
        >
          <option value=''>Select Additional Option</option>
          {selectedResource && Object.keys(resourceOptions).map((type) => (
            selectedResource === type && (
              <optgroup key={type} label={type}>
                {resourceOptions[type].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            )
          ))}
        </select>
      </div>

      <button className='submit_data' onClick={() =>alert('Please select from dropdown list')}>Add Resource</button>

      <div className='input-section'>
        <p>Selected Subtypes: {subtypearray.join(', ')}</p>
      </div>
      
    </div>
  );
};

export default MapRequestForm;
