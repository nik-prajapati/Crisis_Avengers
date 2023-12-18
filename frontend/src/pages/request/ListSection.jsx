import React from 'react'
import './ListSection.css'

const ListSection = ({agencies,mapClass,handleMarker}) => {
  return (
    <div>
    <div className={mapClass ? "disable-section":"active-section"}>
    <ul>
    {   
        agencies.length>0 &&
        agencies.map((agency,idx)=>{
            return (
              <div className='request-card'>
            <div className="body">
            <div className='agency-info'>
            <h3>{agency._doc.name}</h3>
            <h5>{agency._doc.type}</h5> 
            </div>
              {
                // <p>Distance: {distance} miles</p>
            }
            </div>
            <div>
            <button className="collaborate-btn" onClick={() => handleMarker(agency)} >Collaborate</button>
            </div>
          </div>
            
            )
        })
    }
    </ul>

    </div>
    
    </div>
  )
}

export default ListSection
