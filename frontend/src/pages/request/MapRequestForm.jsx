import React, { useState } from 'react'
import './MapRequestForm.scss'





const MapRequestForm = () => {
    
    const disasterTypes = ["Earthquakes","Hurricanes, Typhoons, and Cyclones","Floods","Tornadoes","Wildfires","Industrial Accidents","Technological Hazards","Transportation Accidents","Environmental Pollution","Volcanic Eruptions","Landslides","Pandemics","Epidemics","Extreme Weather Events","Conflicts and Wars","Refugee Crises","Asteroid Impact","Financial Crises","Social Unrest"
      ];

    const [disType,setDisType]=useState(disasterTypes)
    const [disTypeValue,setDisTypeValue]=useState("")

    // console.log(disTypeValue)
    const filterChoice=(e,arr,func)=>{

        const val=e.target.value;
        // console.log(val)
    
        const newValues = arr.filter((item) => {
           return item.toLowerCase().includes(val.toLowerCase())
          });
          
          // console.log(newValues);
        func(newValues)

    }

    const filterDisasterType=(e)=>{
    setDisTypeValue(e.target.value)
    filterChoice(e,disasterTypes,setDisType)
    }


  return (
    <div className='MapRequestForm-container'> 
    <div className='input-section'>
    <div className='input-Title'> Type Of Disaster</div>
    <input type="text" id='type-of-disaster' onChange={(e)=>filterDisasterType(e)} value={disTypeValue} />

    {
        <ul name="" id="" className={'disType-options'}>
        {
            disType.map((item,idx)=>{
                return <li 
                value={item} key={idx} onClick={(e)=>{
                console.log(item)
                setDisTypeValue(item)
                
                }}

                >{item}</li>
            })
        }
        </ul>
    }

    </div>
    
    
        <div className='input-section'>
    <div className='input-Title'> Location</div>
    <input type="text" id='Location'/>
    </div>

    <div className='input-section'>
    <div className='input-Title'> Type Of Agency</div>
    <input type="text" id='Type-Of-Agency'/>
    </div>

    <div className='input-section '>
    <input type="button" id='request-submit' value='Search'/>
    </div>

    
    </div>

  )
}

export default MapRequestForm
