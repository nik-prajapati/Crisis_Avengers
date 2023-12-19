// RegistrationForm.js
import React, { useState } from 'react';
import MapPointSelect from './MapPointSelect';

const FillLocationOption = ({showMap,setShowMap}) => {
  
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
        <MapPointSelect onLocationSelected={handleLocationSelected} />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default FillLocationOption;