// Map.js
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../request/mapstyle.css";

import axios from "axios";

let MAPQUEST_API_KEY = "nuGdfaEudQgh4rlkNX49JgnTKbGnBBVm";

const Map = ({ onLocationSelected, showMap, setFormData, formData }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [geocodedAdd, setGeoCodeAdd] = useState("");

  async function getAddress(latitude, longitude) {
    const uri = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${MAPQUEST_API_KEY}&location=${latitude},${longitude}`;

    try {
      const response = await axios.get(uri);
      const {
        street,
        adminArea6,
        adminArea5,
        adminArea4,
        adminArea3,
        adminArea2,
        adminArea1,
        postalCode,
      } = response.data.results[0].locations[0];
      let address = [
        street,
        adminArea6,
        adminArea5,
        adminArea4,
        adminArea3,
        adminArea2,
        adminArea1,
      ]
        .filter(
          (x) =>
            x !== undefined &&
            x !== null &&
            typeof x === "string" &&
            x.length > 0
        )
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .join(", ");
      address += `, PIN - ${postalCode}`;
      return address;
      console.log(address);
    } catch (e) {
      console.error(e);
    }
  }

  const handleMapClick = async (event) => {
    const { lat, lng } = event.latlng;

    // console.log({ lat, lng })
    let x = await getAddress(lat, lng);
    setFormData({ ...formData, address: x });
    // setAddressValue(await getAddress(lat,lng))
    setSelectedLocation({ lat, lng });
    onLocationSelected({ lat, lng });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  console.log(selectedLocation);
  return (
    <MapContainer
      center={[12, 80]}
      zoom={7}
      style={{ width: "600px", height: "600px" }}
    >
      <MapClickHandler />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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
