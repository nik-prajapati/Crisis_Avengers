import React from 'react'

const ListSection = ({agencies,mapClass}) => {
  return (
    <div>
    <div className={mapClass ? "disable-section":"active-section"}>
    <ul>
    {   
        agencies.length>0 &&
        agencies.map((agency,idx)=>{
            return <li >{agency._doc.name}</li>
        })
    }
    </ul>

    </div>
    
    </div>
  )
}

export default ListSection
