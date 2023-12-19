import React, { useState } from 'react'
import './ListSection.css'

const ListSection = ({agencies,mapClass,handleMarker}) => {

  const [filterAgency, setFilterAgency]=useState(agencies)
  // const [inputValue, setInputValue]=useState('')

  const handleFilter=(e)=>{
    console.log(e.target.value)
    const filterData=agencies.filter((agency)=>{
      return agency.name.toLowerCase().includes(e.target.value) || agency.address.toLowerCase().includes(e.target.value)
    })
    
    setFilterAgency(filterData)
    
  }

  return (
    <div>
    <div className={mapClass ? "disable-section":"active-section"}>

    <input type="text" onChange={(e)=>handleFilter(e)} className='list-section-input' placeholder='Search For specific Agency Name'/>
    <ul>
    {   
        agencies  &&
        filterAgency.map((agency,idx)=>{
            return (
              <div className='request-card' key={idx}>
            <div className="body">
            <div className='agency-info'>
            <h3>{agency.name}</h3>
            <h3>{agency.email}</h3>
            <h5>{agency.address}</h5>
            <h5>{agency.description}</h5>
            <h5>{agency.type}</h5>
            <h4>{(agency.distance)/(1000)} km</h4>
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
