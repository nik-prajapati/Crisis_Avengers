import { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function App() {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);
  if (location.length !== 2) {
    return <></>;
  } else {
    return (
      <MapContainer
        id='map'
        center={location}
        zoom={20}
        // maxZoom={35}
        scrollWheelZoom={1}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={location}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      // <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3395962929785!2d72.81109917420278!3d19.13660655006904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b60f87225701%3A0x7d48b269066ed30a!2sMuntaha%20apartment%2C%20202%2C%20Mangal%20Nagar%2C%20Versova%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400061!5e0!3m2!1sen!2sin!4v1694510629975!5m2!1sen!2sin" width="600" height="450" style={{border: 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    );
  }
}

export default App;
