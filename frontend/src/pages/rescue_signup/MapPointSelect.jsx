// Map.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import '../request/mapstyle.css'


const Map = ({ onLocationSelected,showMap}) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;

    console.log({ lat, lng })
    setSelectedLocation({ lat, lng });
    onLocationSelected({ lat, lng });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  
  return (
    <MapContainer center={[12,80]} zoom={7} style={{'width':'600px','height':'600px'}} >
    <MapClickHandler />
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {selectedLocation && (
    <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
      <Popup>
        <div>
          <p>Selected Location</p>
          <p>{selectedAddress}</p>
        </div>
      </Popup>
    </Marker>
  )}
</MapContainer>
  );
};

export default Map;
