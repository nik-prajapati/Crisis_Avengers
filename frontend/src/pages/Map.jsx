// <div className="type-resource">
//         <select onChange={(e) => setType(options[e.target.value])}>
//           <option value="">---select The type of agency----</option>
//           {
//             keys.map((value, idx) => (
//               <option value={value} key={idx}>{value}</option>
//             ))
//           }
//         </select>

//         {
//           type &&
//           <select onChange={(e) => { if (e.target.value !== '') setResource(e.target.value) }}>
//             <option value="">---select The type of Request----</option>
//             {
//               type.map((value, idx) => (
//                 <option value={value} key={idx}>{value}</option>
//               ))
//             }

//           </select>
//         }

//       </div>


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import '../styles/mapstyle.css'
import { Icon } from "leaflet";
import icon from '../image/location-pin.png'
import MarkerClusterGroup from 'react-leaflet-cluster'
import gpsIcon from '../image/gps.png'
import { useEffect, useState } from "react";
import axios from 'axios'
import Request from "./Request";

const duser = {
  duser: "Ram Shirke",
  geocode: [19.10295695, 72.83745021706365],
  address: "vile parle west mumbai 400056",
  popup: "Current locations"
}

const markers = [
  {
    name: "Fire Station",
    geocode: [19.1867193, 72.8485884],
    popup: "Fire station malad",
    type: "fire"
  },
  {
    name: "Fire Station colaba",
    geocode: [18.915091, 72.8259691],
    popup: "Fire Station colaba",
    type: "medical"
  },
  {
    name: "Fire Station",
    geocode: [19.04, 72.875],
    popup: "medical",
    type: "NGO"
  }
]


const customIcon = new Icon({
  iconUrl: icon,
  iconSize: [38, 38]
})

const duserCustomIcon = new Icon({
  iconUrl: gpsIcon,
  iconSize: [30, 30]
})


const options = {
  medical: ['ambulance', 'doctors', 'volunteers',],
  fire: ['volunteers', 'vehicles', 'tanker'],
  NGO: ['volunteers']

}

function Map({user}) {
  // console.log(user)
  const [agencies,setAgencies]=useState([]);
  useEffect( ()=>{
    const fetchData=async ()=>{
      const resp= await axios.get(`http://localhost:3000/getagencies?latitude=19&longitude=72&radius=300`)
      const d=resp.data.agencies
      setAgencies(d)
      
    }
    
    fetchData()
  },[])

  const [type, setType] = useState(null)
  const [marker, setMarker] = useState({})
  const [requestBody,setRequestBody]=useState(null);
  const keys = Object.keys(options)


  const handleTypeInput = (e) => {
    if (e.target.value !== '')
      setType(options[e.target.value])
  }


  const handleMarker = (agency) => {

    const markerData={
      id:agency._doc._id,
      name:agency._doc.name,
      address:agency._doc.address,
      description:agency._doc.description
    }

    // console.log(markerData)
    setMarker(markerData)
  }


  const handleRequest = () => {

    if(user && marker)
    {  const requestBody = {
        reqAgency: marker,
        reqduser: user
      }
      setRequestBody(requestBody)
    }
  }


  return (
    <div>

      <MapContainer center={duser.geocode} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {
            agencies.map((agency, idx) => (

              <Marker position={[Number(agency._doc.location.latitude),Number(agency._doc.location.longitude)]} key={idx} icon={customIcon}>
                <Popup>
                  <div>
                    <h3>{agency._doc.name}</h3>
                    <h4>{agency._doc.address}</h4>
                    <h4>{agency._doc.description}</h4>
                    <h4>{agency._doc.type}</h4>
                    <button onClick={() => handleMarker(agency)}>Select</button>
                  </div>
                </Popup>
              </Marker>
            ))
          }

        </MarkerClusterGroup>

      </MapContainer>

      <button onClick={() => handleRequest()} className="body-submit-btn">Send Request</button>
      {
        if(requestBody) 
      {
        return <Request user={user} payload={requestBody}/>
      }
    
      }
    </div>
  )

}

export default Map;