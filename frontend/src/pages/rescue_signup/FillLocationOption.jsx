// RegistrationForm.js
import React, { useState } from 'react';
import MapPointSelect from './MapPointSelect';

const FillLocationOption = ({showMap,setShowMap,setFormData,formData}) => {
  
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send registration data (name, id, selectedLocation) to the server
    console.log(selectedLocation );
  };

  return (
    <div>
    
    <div style={showMap ? {'display':'block'}:{'display':'none'}} className='map-for-location-choice'>
    <button onClick={e=>{
        
            // e.preventDefault
            console.log("called")
            console.log(showMap)
            setShowMap(false)
        
    
    }}>Cancel</button>
      <form onSubmit={()=>handleSubmit()}>
        <MapPointSelect onLocationSelected={handleLocationSelected} formData={formData} setFormData={setFormData}/>
        <br />
        
      </form>
    </div>
    </div>
  );
};

export default FillLocationOption;
