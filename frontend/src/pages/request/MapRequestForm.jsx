import React from 'react'
import './MapRequestForm.scss'
const MapRequestForm = () => {
  return (
    <div className='MapRequestForm-container'> 
    <div className='input-section'>
    <div className='input-Title'> Type Of Disaster</div>
    <input type="text" id='type-of-disaster'/>
    </div>

    <div className='input-section'>
    <div className='input-Title'> Location</div>
    <input type="text" id='Location'/>
    </div>

    <div className='input-section'>
    <div className='input-Title'> Type Of Agency</div>
    <input type="text" id='Type-Of-Agency'/>
    </div>

    <div className='input-section'>
    <input type="button" id='request-submit' value='Search'/>
    </div>

    
    </div>

  )
}

export default MapRequestForm
