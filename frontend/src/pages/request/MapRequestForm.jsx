import React, { useState, useEffect } from 'react';
import './MapRequestForm.scss';

const MapRequestForm = () => {
  const [disTypeValue, setDisTypeValue] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [addedResources, setAddedResources] = useState([]);
  const [additionalSelectOptions, setAdditionalSelectOptions] = useState([]);
  const [selectedAdditionalValue, setSelectedAdditionalValue] = useState('');

  const resourceOptions = {
    Food: ['Food packets', 'Bottled water', 'Ready-to-eat meals'],
    'Rescue tolls': ['Rescue personnel', 'Ropes', 'Ladders', 'Cutting tools'],
    Shelter: ['Tents', 'Beds'],
    Medical: ['First aid kits', 'Pain relievers', 'Ambulances', 'Medical personnel', 'Stretchers'],
  };

  const handleSelectChange = (e) => {
    setSelectedResource(e.target.value);
    setAdditionalSelectOptions([]); // Reset additional options when changing the resource
    setSelectedAdditionalValue('');
  };

  const handleAdditionalSelectChange = (e) => {
    setSelectedAdditionalValue(e.target.value);
  };

  const handleAddResource = () => {
    if (selectedResource.trim() !== '') {
      setAddedResources((prevResources) => [...prevResources, selectedResource]);
      setSelectedResource('');
      setAdditionalSelectOptions([]);
      setSelectedAdditionalValue('');
    }
  };

  const handleSearch = () => {
    // Handle the search logic here with the selected disaster type, resources, and additional select value
    console.log('Selected Disaster Type:', disTypeValue);
    console.log('Selected Resources:', addedResources);
    console.log('Selected Additional Value:', selectedAdditionalValue);
  };

  // Effect to update additional select options based on the selected resource
  useEffect(() => {
    // Simulating API call to get additional options based on selected resource
    // Replace this with your actual API call or logic
    const getAdditionalSelectOptions = (selectedResource) => {
      const options = resourceOptions[selectedResource];
      return options || [];
    };

    setAdditionalSelectOptions(getAdditionalSelectOptions(selectedResource));
  }, [selectedResource]);

  return (
    <div>
      <div className='input-section'>
        <div className='input-Title'>Select</div>
        <select name='type' onChange={handleSelectChange} value={selectedResource}>
          <option value=''>Select Resource</option>
          <option>Food</option>
          <option>Rescue tolls</option>
          <option>Shelter</option>
          <option>Medical</option>
        </select>
        <button onClick={handleAddResource}>Add Resource</button>
      </div>

      <div className='input-section'>
        <div className='input-Title'>Additional Select</div>
        <select
          name='additionalSelect'
          onChange={handleAdditionalSelectChange}
          value={selectedAdditionalValue}
        >
          <option value=''>Select Additional Option</option>
          {additionalSelectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {addedResources.length > 0 && (
        <div className='input-section'>
          <p>Selected Resources: {addedResources.join(', ')}</p>
        </div>
      )}

      <div className='input-section'>
        <input type='button' id='request-submit' value='Search' onClick={handleSearch} />
      </div>
    </div>
  );
};

export default MapRequestForm;
